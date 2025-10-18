from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.models.user import User
from app.schemas.user import UserCreate, User, Token
from app.core.security import verify_password, get_password_hash, create_access_token
from datetime import timedelta, datetime
from app.core.config import settings
from app.mock_data import MOCK_USERS, get_mock_user_by_id, generate_mock_id
import jwt
from jwt import PyJWTError

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

@router.post("/register", response_model=User)
def register(user: UserCreate, db: Session = Depends(get_db)):
    # В режиме моков проверяем существование пользователя в моковых данных
    if settings.MOCK_MODE:
        for mock_user in MOCK_USERS:
            if mock_user["email"] == user.email:
                raise HTTPException(
                    status_code=400,
                    detail="Пользователь с таким email уже зарегистрирован"
                )
        
        # Создаем нового пользователя в моковых данных
        new_user = {
            "id": generate_mock_id(),
            "email": user.email,
            "full_name": user.full_name,
            "specialty": user.specialty,
            "workplace": user.workplace,
            "is_active": True,
            "is_verified": True,
            "created_at": datetime.now(),
        }
        MOCK_USERS.append(new_user)
        return User(**new_user)
    
    # Обычная логика для работы с БД
    db_user = db.query(User).filter(User.email == user.email).first()
    if db_user:
        raise HTTPException(
            status_code=400,
            detail="Пользователь с таким email уже зарегистрирован"
        )
    
    hashed_password = get_password_hash(user.password)
    db_user = User(
        email=user.email,
        hashed_password=hashed_password,
        full_name=user.full_name,
        specialty=user.specialty,
        workplace=user.workplace,
        medical_license=user.medical_license,
        phone=user.phone
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@router.post("/login", response_model=Token)
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    if settings.MOCK_MODE:
        # В режиме моков проверяем пользователя в моковых данных
        user = None
        for mock_user in MOCK_USERS:
            if mock_user["email"] == form_data.username:
                user = mock_user
                break
        
        if not user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Неверный email или пароль",
                headers={"WWW-Authenticate": "Bearer"},
            )
        
        # В моковом режиме принимаем любой пароль
        access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = create_access_token(
            subject=user["id"], expires_delta=access_token_expires
        )
        return {"access_token": access_token, "token_type": "bearer"}
    
    # Обычная логика для работы с БД
    user = db.query(User).filter(User.email == form_data.username).first()
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Неверный email или пароль",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        subject=user.id, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        user_id: int = int(payload.get("sub"))
        if user_id is None:
            raise credentials_exception
    except (PyJWTError, ValueError, TypeError):
        raise credentials_exception
    
    if settings.MOCK_MODE:
        # В режиме моков ищем пользователя в моковых данных
        user_data = get_mock_user_by_id(user_id)
        if user_data is None:
            raise credentials_exception
        return User(**user_data)
    
    # Обычная логика для работы с БД
    user = db.query(User).filter(User.id == user_id).first()
    if user is None:
        raise credentials_exception
    return user

@router.get("/me", response_model=User)
def read_users_me(current_user: User = Depends(get_current_user)):
    return current_user
