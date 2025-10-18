from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from datetime import datetime

class DrugInteraction(BaseModel):
    medication: str
    severity: str
    description: str
    management: str

class MonitoringParameter(BaseModel):
    parameter: str
    frequency: str
    normal_range: str
    critical_values: str

class TherapeuticRange(BaseModel):
    parameter: str
    min_value: float
    max_value: float
    unit: str

class MedicationBase(BaseModel):
    name: str
    generic_name: Optional[str] = None
    drug_class: Optional[str] = None
    mechanism_of_action: Optional[str] = None
    available_dosages: Optional[List[str]] = None
    indications: Optional[List[str]] = None
    contraindications: Optional[List[str]] = None
    side_effects: Optional[List[str]] = None
    drug_interactions: Optional[List[Dict[str, Any]]] = None
    monitoring_parameters: Optional[List[Dict[str, Any]]] = None
    therapeutic_range: Optional[Dict[str, Any]] = None

class MedicationCreate(MedicationBase):
    pass

class MedicationUpdate(BaseModel):
    name: Optional[str] = None
    generic_name: Optional[str] = None
    drug_class: Optional[str] = None
    mechanism_of_action: Optional[str] = None
    available_dosages: Optional[List[str]] = None
    indications: Optional[List[str]] = None
    contraindications: Optional[List[str]] = None
    side_effects: Optional[List[str]] = None
    drug_interactions: Optional[List[Dict[str, Any]]] = None
    monitoring_parameters: Optional[List[Dict[str, Any]]] = None
    therapeutic_range: Optional[Dict[str, Any]] = None
    is_active: Optional[bool] = None

class Medication(MedicationBase):
    id: int
    is_active: bool
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True

class MedicationSearchResult(BaseModel):
    id: int
    name: str
    generic_name: Optional[str] = None
    drug_class: Optional[str] = None
    available_dosages: Optional[List[str]] = None
