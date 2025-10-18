from sqlalchemy import Column, Integer, String, DateTime, Text, ForeignKey, Float, Boolean
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.db.database import Base

class Prescription(Base):
    __tablename__ = "prescriptions"
    
    id = Column(Integer, primary_key=True, index=True)
    patient_id = Column(Integer, ForeignKey("patients.id"), nullable=False)
    doctor_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    
    # Рекомендации
    recommended_medications = Column(Text, nullable=True)  # JSON string
    dosage = Column(Text, nullable=True)  # JSON string
    duration = Column(String, nullable=True)
    instructions = Column(Text, nullable=True)
    
    # AI-рекомендации
    ai_recommendations = Column(Text, nullable=True)  # JSON string
    justification = Column(Text, nullable=True)  # Обоснование выбора
    alternative_options = Column(Text, nullable=True)  # JSON string
    warnings = Column(Text, nullable=True)  # JSON string
    monitoring_plan = Column(Text, nullable=True)  # JSON string
    
    # Обратная связь
    patient_feedback = Column(Text, nullable=True)
    doctor_notes = Column(Text, nullable=True)
    
    # Статус
    status = Column(String, default="draft")  # draft, active, completed, cancelled
    is_ai_generated = Column(Boolean, default=True)
    
    # Метаданные
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Связи
    patient = relationship("Patient", back_populates="prescriptions")
    doctor = relationship("User")
    
    def __repr__(self):
        return f"<Prescription(id={self.id}, patient_id={self.patient_id})>"
