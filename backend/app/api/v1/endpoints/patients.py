from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.db.database import get_db
from app.models.user import User
from app.models.patient import Patient
from app.schemas.patient import Patient as PatientSchema, PatientCreate, PatientUpdate
from app.api.v1.endpoints.auth import get_current_user

router = APIRouter()

@router.post("/", response_model=PatientSchema)
def create_patient(
    patient: PatientCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    db_patient = Patient(
        doctor_id=current_user.id,
        **patient.dict()
    )
    db.add(db_patient)
    db.commit()
    db.refresh(db_patient)
    return db_patient

@router.get("/", response_model=List[PatientSchema])
def read_patients(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    patients = db.query(Patient).filter(Patient.doctor_id == current_user.id).offset(skip).limit(limit).all()
    return patients

@router.get("/{patient_id}", response_model=PatientSchema)
def read_patient(
    patient_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    patient = db.query(Patient).filter(
        Patient.id == patient_id,
        Patient.doctor_id == current_user.id
    ).first()
    if patient is None:
        raise HTTPException(status_code=404, detail="Пациент не найден")
    return patient

@router.put("/{patient_id}", response_model=PatientSchema)
def update_patient(
    patient_id: int,
    patient: PatientUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    db_patient = db.query(Patient).filter(
        Patient.id == patient_id,
        Patient.doctor_id == current_user.id
    ).first()
    if db_patient is None:
        raise HTTPException(status_code=404, detail="Пациент не найден")
    
    update_data = patient.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_patient, field, value)
    
    db.commit()
    db.refresh(db_patient)
    return db_patient

@router.delete("/{patient_id}")
def delete_patient(
    patient_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    patient = db.query(Patient).filter(
        Patient.id == patient_id,
        Patient.doctor_id == current_user.id
    ).first()
    if patient is None:
        raise HTTPException(status_code=404, detail="Пациент не найден")
    
    db.delete(patient)
    db.commit()
    return {"message": "Пациент удален"}
