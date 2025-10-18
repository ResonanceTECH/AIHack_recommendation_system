from sqlalchemy import Column, Integer, String, Boolean, DateTime, Text
from sqlalchemy.sql import func
from app.db.database import Base

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)
    is_verified = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Дополнительные поля для врачей
    full_name = Column(String, nullable=True)
    specialty = Column(String, nullable=True)
    workplace = Column(String, nullable=True)
    medical_license = Column(String, nullable=True)
    phone = Column(String, nullable=True)
    
    def __repr__(self):
        return f"<User(id={self.id}, email='{self.email}')>"
