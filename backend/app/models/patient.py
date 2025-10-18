from sqlalchemy import Column, Integer, String, DateTime, Text, ForeignKey, Float
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.db.database import Base

class Patient(Base):
    __tablename__ = "patients"
    
    id = Column(Integer, primary_key=True, index=True)
    doctor_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    
    # Личная информация
    full_name = Column(String, nullable=False)
    age = Column(Integer, nullable=False)
    gender = Column(String, nullable=False)  # 'male', 'female', 'other'
    weight = Column(Float, nullable=True)
    height = Column(Float, nullable=True)
    
    # Контактные данные
    phone = Column(String, nullable=True)
    email = Column(String, nullable=True)
    
    # Клинические данные
    diagnosis = Column(Text, nullable=True)
    comorbidities = Column(Text, nullable=True)  # JSON string
    
    # Лабораторные показатели
    lab_results = Column(Text, nullable=True)  # JSON string
    
    # Текущая терапия
    current_medications = Column(Text, nullable=True)  # JSON string
    allergies = Column(Text, nullable=True)  # JSON string
    previous_anticoagulants = Column(Text, nullable=True)  # JSON string
    
    # Дополнительные факторы
    lifestyle_factors = Column(Text, nullable=True)  # JSON string (smoking, alcohol, physical_activity)
    risk_factors = Column(Text, nullable=True)  # JSON string (bleeding, falls, surgeries)
    social_factors = Column(Text, nullable=True)  # JSON string (compliance, support)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Связи
    doctor = relationship("User", back_populates="patients")
    prescriptions = relationship("Prescription", back_populates="patient")
    
    def __repr__(self):
        return f"<Patient(id={self.id}, name='{self.full_name}')>"
