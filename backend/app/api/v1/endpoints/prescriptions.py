from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.db.database import get_db
from app.models.user import User
from app.models.prescription import Prescription
from app.schemas.prescription import Prescription as PrescriptionSchema, PrescriptionCreate, PrescriptionUpdate
from app.api.v1.endpoints.auth import get_current_user
from app.mock_data import MOCK_PRESCRIPTIONS, get_mock_prescription_by_id, generate_mock_id
from app.core.config import settings
from datetime import datetime

router = APIRouter()

@router.post("/", response_model=PrescriptionSchema)
def create_prescription(
    prescription: PrescriptionCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if settings.MOCK_MODE:
        # В режиме моков создаем назначение в моковых данных
        new_prescription = {
            "id": generate_mock_id(),
            "doctor_id": current_user.id,
            **prescription.dict(),
            "created_at": datetime.now(),
            "updated_at": datetime.now(),
        }
        MOCK_PRESCRIPTIONS.append(new_prescription)
        return PrescriptionSchema(**new_prescription)
    
    # Обычная логика для работы с БД
    db_prescription = Prescription(
        doctor_id=current_user.id,
        **prescription.dict()
    )
    db.add(db_prescription)
    db.commit()
    db.refresh(db_prescription)
    return db_prescription

@router.get("/", response_model=List[PrescriptionSchema])
def read_prescriptions(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if settings.MOCK_MODE:
        # В режиме моков возвращаем все назначения
        prescriptions = MOCK_PRESCRIPTIONS[skip:skip + limit]
        return [PrescriptionSchema(**prescription) for prescription in prescriptions]
    
    # Обычная логика для работы с БД
    prescriptions = db.query(Prescription).filter(
        Prescription.doctor_id == current_user.id
    ).offset(skip).limit(limit).all()
    return prescriptions

@router.get("/{prescription_id}", response_model=PrescriptionSchema)
def read_prescription(
    prescription_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if settings.MOCK_MODE:
        # В режиме моков ищем назначение в моковых данных
        prescription_data = get_mock_prescription_by_id(prescription_id)
        if prescription_data is None:
            raise HTTPException(status_code=404, detail="Назначение не найдено")
        return PrescriptionSchema(**prescription_data)
    
    # Обычная логика для работы с БД
    prescription = db.query(Prescription).filter(
        Prescription.id == prescription_id,
        Prescription.doctor_id == current_user.id
    ).first()
    if prescription is None:
        raise HTTPException(status_code=404, detail="Назначение не найдено")
    return prescription

@router.put("/{prescription_id}", response_model=PrescriptionSchema)
def update_prescription(
    prescription_id: int,
    prescription: PrescriptionUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if settings.MOCK_MODE:
        # В режиме моков обновляем назначение в моковых данных
        prescription_data = get_mock_prescription_by_id(prescription_id)
        if prescription_data is None:
            raise HTTPException(status_code=404, detail="Назначение не найдено")
        
        update_data = prescription.dict(exclude_unset=True)
        for field, value in update_data.items():
            prescription_data[field] = value
        prescription_data["updated_at"] = datetime.now()
        
        return PrescriptionSchema(**prescription_data)
    
    # Обычная логика для работы с БД
    db_prescription = db.query(Prescription).filter(
        Prescription.id == prescription_id,
        Prescription.doctor_id == current_user.id
    ).first()
    if db_prescription is None:
        raise HTTPException(status_code=404, detail="Назначение не найдено")
    
    update_data = prescription.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_prescription, field, value)
    
    db.commit()
    db.refresh(db_prescription)
    return db_prescription

@router.delete("/{prescription_id}")
def delete_prescription(
    prescription_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if settings.MOCK_MODE:
        # В режиме моков удаляем назначение из моковых данных
        prescription_data = get_mock_prescription_by_id(prescription_id)
        if prescription_data is None:
            raise HTTPException(status_code=404, detail="Назначение не найдено")
        
        MOCK_PRESCRIPTIONS.remove(prescription_data)
        return {"message": "Назначение удалено"}
    
    # Обычная логика для работы с БД
    prescription = db.query(Prescription).filter(
        Prescription.id == prescription_id,
        Prescription.doctor_id == current_user.id
    ).first()
    if prescription is None:
        raise HTTPException(status_code=404, detail="Назначение не найдено")
    
    db.delete(prescription)
    db.commit()
    return {"message": "Назначение удалено"}
