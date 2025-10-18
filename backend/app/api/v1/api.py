from fastapi import APIRouter
from app.api.v1.endpoints import auth, patients, prescriptions, medications

api_router = APIRouter()

api_router.include_router(auth.router, prefix="/auth", tags=["authentication"])
api_router.include_router(patients.router, prefix="/patients", tags=["patients"])
api_router.include_router(prescriptions.router, prefix="/prescriptions", tags=["prescriptions"])
api_router.include_router(medications.router, prefix="/medications", tags=["medications"])
