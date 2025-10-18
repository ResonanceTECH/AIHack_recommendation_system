from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from app.db.database import get_db
from app.models.medication import Medication
from app.schemas.medication import Medication as MedicationSchema, MedicationSearchResult
from app.mock_data import MOCK_MEDICATIONS, get_mock_medication_by_id
from app.core.config import settings

router = APIRouter()

@router.get("/search", response_model=List[MedicationSearchResult])
def search_medications(
    q: str = Query(..., description="Search query"),
    limit: int = Query(10, le=50),
    db: Session = Depends(get_db)
):
    """Поиск лекарственных препаратов по названию"""
    if settings.MOCK_MODE:
        # В режиме моков ищем в моковых данных
        results = []
        for med in MOCK_MEDICATIONS:
            if q.lower() in med["name"].lower():
                results.append(MedicationSearchResult(
                    id=med["id"],
                    name=med["name"],
                    generic_name=med["name"],  # В моках используем name как generic_name
                    drug_class="Лекарственный препарат",
                    available_dosages=[med["strength"]]
                ))
                if len(results) >= limit:
                    break
        return results
    
    # Обычная логика для работы с БД
    medications = db.query(Medication).filter(
        Medication.name.ilike(f"%{q}%")
    ).limit(limit).all()
    
    return [
        MedicationSearchResult(
            id=med.id,
            name=med.name,
            generic_name=med.generic_name,
            drug_class=med.drug_class,
            available_dosages=med.available_dosages
        )
        for med in medications
    ]

@router.get("/", response_model=List[MedicationSchema])
def get_medications(
    skip: int = 0,
    limit: int = 100,
    drug_class: Optional[str] = None,
    db: Session = Depends(get_db)
):
    """Получить список лекарственных препаратов"""
    if settings.MOCK_MODE:
        # В режиме моков возвращаем моковые данные
        medications = MOCK_MEDICATIONS[skip:skip + limit]
        return [MedicationSchema(**med) for med in medications]
    
    # Обычная логика для работы с БД
    query = db.query(Medication).filter(Medication.is_active == True)
    
    if drug_class:
        query = query.filter(Medication.drug_class == drug_class)
    
    medications = query.offset(skip).limit(limit).all()
    return medications

@router.get("/{medication_id}", response_model=MedicationSchema)
def get_medication(
    medication_id: int,
    db: Session = Depends(get_db)
):
    """Получить информацию о конкретном препарате"""
    if settings.MOCK_MODE:
        # В режиме моков ищем в моковых данных
        medication_data = get_mock_medication_by_id(medication_id)
        if medication_data is None:
            raise HTTPException(status_code=404, detail="Препарат не найден")
        return MedicationSchema(**medication_data)
    
    # Обычная логика для работы с БД
    medication = db.query(Medication).filter(Medication.id == medication_id).first()
    if medication is None:
        raise HTTPException(status_code=404, detail="Препарат не найден")
    return medication

@router.get("/classes/", response_model=List[str])
def get_drug_classes(db: Session = Depends(get_db)):
    """Получить список классов препаратов"""
    if settings.MOCK_MODE:
        # В режиме моков возвращаем фиксированные классы
        return ["Антигипертензивные", "Гипогликемические", "Противовоспалительные", "Антибиотики"]
    
    # Обычная логика для работы с БД
    classes = db.query(Medication.drug_class).filter(
        Medication.drug_class.isnot(None),
        Medication.is_active == True
    ).distinct().all()
    return [cls[0] for cls in classes if cls[0]]
