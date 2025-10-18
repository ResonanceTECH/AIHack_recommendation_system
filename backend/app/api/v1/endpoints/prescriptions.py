from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.db.database import get_db
from app.models.user import User
from app.models.prescription import Prescription
from app.schemas.prescription import Prescription as PrescriptionSchema, PrescriptionCreate, PrescriptionUpdate
from app.api.v1.endpoints.auth import get_current_user

router = APIRouter()

@router.post("/", response_model=PrescriptionSchema)
def create_prescription(
    prescription: PrescriptionCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
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
    prescription = db.query(Prescription).filter(
        Prescription.id == prescription_id,
        Prescription.doctor_id == current_user.id
    ).first()
    if prescription is None:
        raise HTTPException(status_code=404, detail="Назначение не найдено")
    
    db.delete(prescription)
    db.commit()
    return {"message": "Назначение удалено"}
