from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from datetime import datetime

class PatientBase(BaseModel):
    full_name: str
    age: int
    gender: str
    weight: Optional[float] = None
    height: Optional[float] = None
    phone: Optional[str] = None
    email: Optional[str] = None
    diagnosis: Optional[str] = None
    comorbidities: Optional[List[str]] = None
    lab_results: Optional[Dict[str, Any]] = None
    current_medications: Optional[List[Dict[str, Any]]] = None
    allergies: Optional[List[Dict[str, Any]]] = None
    previous_anticoagulants: Optional[List[Dict[str, Any]]] = None

class PatientCreate(PatientBase):
    pass

class PatientUpdate(BaseModel):
    full_name: Optional[str] = None
    age: Optional[int] = None
    gender: Optional[str] = None
    weight: Optional[float] = None
    height: Optional[float] = None
    phone: Optional[str] = None
    email: Optional[str] = None
    diagnosis: Optional[str] = None
    comorbidities: Optional[List[str]] = None
    lab_results: Optional[Dict[str, Any]] = None
    current_medications: Optional[List[Dict[str, Any]]] = None
    allergies: Optional[List[Dict[str, Any]]] = None
    previous_anticoagulants: Optional[List[Dict[str, Any]]] = None

class Patient(PatientBase):
    id: int
    doctor_id: int
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True
