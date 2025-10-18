from sqlalchemy import Column, Integer, String, Text, Float, Boolean
from sqlalchemy.sql import func
from app.db.database import Base

class Medication(Base):
    __tablename__ = "medications"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False, index=True)
    generic_name = Column(String, nullable=True)
    drug_class = Column(String, nullable=True)
    mechanism_of_action = Column(Text, nullable=True)
    
    # Дозировки
    available_dosages = Column(Text, nullable=True)  # JSON string
    
    # Показания и противопоказания
    indications = Column(Text, nullable=True)  # JSON string
    contraindications = Column(Text, nullable=True)  # JSON string
    side_effects = Column(Text, nullable=True)  # JSON string
    
    # Взаимодействия
    drug_interactions = Column(Text, nullable=True)  # JSON string
    
    # Мониторинг
    monitoring_parameters = Column(Text, nullable=True)  # JSON string
    therapeutic_range = Column(Text, nullable=True)  # JSON string
    
    # Метаданные
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    def __repr__(self):
        return f"<Medication(id={self.id}, name='{self.name}')>"
