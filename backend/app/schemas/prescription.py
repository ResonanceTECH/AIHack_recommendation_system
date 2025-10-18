from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from datetime import datetime

class PrescriptionBase(BaseModel):
    recommended_medications: Optional[List[Dict[str, Any]]] = None
    dosage: Optional[Dict[str, Any]] = None
    duration: Optional[str] = None
    instructions: Optional[str] = None

class PrescriptionCreate(PrescriptionBase):
    patient_id: int

class PrescriptionUpdate(BaseModel):
    recommended_medications: Optional[List[Dict[str, Any]]] = None
    dosage: Optional[Dict[str, Any]] = None
    duration: Optional[str] = None
    instructions: Optional[str] = None
    status: Optional[str] = None

class Prescription(PrescriptionBase):
    id: int
    patient_id: int
    doctor_id: int
    status: str
    is_ai_generated: bool
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True
