from datetime import datetime, timedelta
from typing import List, Dict, Any
import random

# Mock users data
MOCK_USERS = [
    {
        "id": 1,
        "email": "doctor1@medai.com",
        "full_name": "Иванов Иван Иванович",
        "specialty": "Терапевт",
        "workplace": "Городская поликлиника №1",
        "is_active": True,
        "created_at": datetime.now() - timedelta(days=30),
    },
    {
        "id": 2,
        "email": "doctor2@medai.com", 
        "full_name": "Петрова Анна Сергеевна",
        "specialty": "Кардиолог",
        "workplace": "Городская поликлиника №2",
        "is_active": True,
        "created_at": datetime.now() - timedelta(days=25),
    },
    {
        "id": 3,
        "email": "doctor3@medai.com",
        "full_name": "Сидоров Петр Александрович", 
        "specialty": "Невролог",
        "workplace": "Городская поликлиника №3",
        "is_active": True,
        "created_at": datetime.now() - timedelta(days=20),
    }
]

# Mock patients data
MOCK_PATIENTS = [
    {
        "id": 1,
        "full_name": "Козлов Алексей Владимирович",
        "date_of_birth": "1985-03-15",
        "gender": "male",
        "phone": "+7 (495) 123-45-67",
        "email": "kozlov@email.com",
        "address": "г. Москва, ул. Тверская, д. 10, кв. 25",
        "insurance_number": "1234567890123456",
        "height": 175,
        "weight": 75,
        "blood_type": "A+",
        "allergies": ["Пенициллин", "Аспирин"],
        "chronic_conditions": ["Гипертония"],
        "emergency_contact": "Козлова Мария Ивановна, +7 (495) 987-65-43",
        "created_at": datetime.now() - timedelta(days=15),
        "updated_at": datetime.now() - timedelta(days=2),
    },
    {
        "id": 2,
        "full_name": "Морозова Елена Дмитриевна",
        "date_of_birth": "1978-07-22",
        "gender": "female", 
        "phone": "+7 (495) 234-56-78",
        "email": "morozova@email.com",
        "address": "г. Москва, ул. Арбат, д. 5, кв. 12",
        "insurance_number": "2345678901234567",
        "height": 165,
        "weight": 62,
        "blood_type": "B+",
        "allergies": ["Кодеин"],
        "chronic_conditions": ["Диабет 2 типа"],
        "emergency_contact": "Морозов Дмитрий Петрович, +7 (495) 876-54-32",
        "created_at": datetime.now() - timedelta(days=12),
        "updated_at": datetime.now() - timedelta(days=1),
    },
    {
        "id": 3,
        "full_name": "Волков Сергей Николаевич",
        "date_of_birth": "1992-11-08",
        "gender": "male",
        "phone": "+7 (495) 345-67-89", 
        "email": "volkov@email.com",
        "address": "г. Москва, ул. Ленинский проспект, д. 15, кв. 8",
        "insurance_number": "3456789012345678",
        "height": 180,
        "weight": 85,
        "blood_type": "O+",
        "allergies": [],
        "chronic_conditions": [],
        "emergency_contact": "Волкова Ольга Сергеевна, +7 (495) 765-43-21",
        "created_at": datetime.now() - timedelta(days=8),
        "updated_at": datetime.now() - timedelta(hours=12),
    }
]

# Mock medications data
MOCK_MEDICATIONS = [
    {
        "id": 1,
        "name": "Аспирин",
        "generic_name": "Ацетилсалициловая кислота",
        "drug_class": "НПВС",
        "mechanism_of_action": "Ингибирует циклооксигеназу",
        "available_dosages": ["100 мг", "500 мг"],
        "indications": ["Боль", "Воспаление", "Лихорадка"],
        "contraindications": ["Язвенная болезнь", "Гемофилия"],
        "side_effects": ["Тошнота", "Изжога", "Кровотечения"],
        "drug_interactions": [
            {"medication": "Варфарин", "severity": "высокий", "description": "Усиление антикоагулянтного эффекта", "management": "Контроль МНО"},
            {"medication": "Метотрексат", "severity": "средний", "description": "Усиление токсичности", "management": "Снижение дозы"}
        ],
        "monitoring_parameters": [
            {"parameter": "ЖКТ", "frequency": "ежедневно", "normal_range": "отсутствие симптомов", "critical_values": "кровотечение"},
            {"parameter": "Кровотечения", "frequency": "при появлении", "normal_range": "отсутствие", "critical_values": "массивное кровотечение"}
        ],
        "therapeutic_range": {"min": 0, "max": 100},
        "is_active": True,
        "created_at": datetime.now() - timedelta(days=20),
        "updated_at": datetime.now() - timedelta(days=20),
    },
    {
        "id": 2,
        "name": "Метформин",
        "generic_name": "Метформин гидрохлорид",
        "drug_class": "Бигуаниды",
        "mechanism_of_action": "Снижает продукцию глюкозы в печени",
        "available_dosages": ["500 мг", "850 мг", "1000 мг"],
        "indications": ["Сахарный диабет 2 типа"],
        "contraindications": ["Почечная недостаточность", "Печеночная недостаточность"],
        "side_effects": ["Тошнота", "Диарея", "Металлический привкус"],
        "drug_interactions": [
            {"medication": "Алкоголь", "severity": "высокий", "description": "Риск лактоацидоза", "management": "Избегать употребления"},
            {"medication": "Йодсодержащие контрасты", "severity": "высокий", "description": "Риск острой почечной недостаточности", "management": "Отмена за 48 часов"}
        ],
        "monitoring_parameters": [
            {"parameter": "Креатинин", "frequency": "ежемесячно", "normal_range": "60-120 мкмоль/л", "critical_values": ">150 мкмоль/л"},
            {"parameter": "Глюкоза", "frequency": "ежедневно", "normal_range": "4-7 ммоль/л", "critical_values": "<3 или >15 ммоль/л"}
        ],
        "therapeutic_range": {"min": 0, "max": 2000},
        "is_active": True,
        "created_at": datetime.now() - timedelta(days=18),
        "updated_at": datetime.now() - timedelta(days=18),
    },
    {
        "id": 3,
        "name": "Амлодипин",
        "generic_name": "Амлодипин безилат",
        "drug_class": "Блокаторы кальциевых каналов",
        "mechanism_of_action": "Блокирует кальциевые каналы L-типа",
        "available_dosages": ["2.5 мг", "5 мг", "10 мг"],
        "indications": ["Гипертония", "Стенокардия"],
        "contraindications": ["Шок", "Стеноз аорты"],
        "side_effects": ["Отеки ног", "Головокружение", "Покраснение лица"],
        "drug_interactions": [
            {"medication": "Грейпфрут", "severity": "средний", "description": "Усиление эффекта", "management": "Избегать употребления"},
            {"medication": "Симвастатин", "severity": "высокий", "description": "Риск миопатии", "management": "Контроль КФК"}
        ],
        "monitoring_parameters": [
            {"parameter": "АД", "frequency": "ежедневно", "normal_range": "120/80 мм рт.ст.", "critical_values": ">180/110 мм рт.ст."},
            {"parameter": "ЧСС", "frequency": "ежедневно", "normal_range": "60-100 уд/мин", "critical_values": "<50 или >120 уд/мин"}
        ],
        "therapeutic_range": {"min": 0, "max": 10},
        "is_active": True,
        "created_at": datetime.now() - timedelta(days=16),
        "updated_at": datetime.now() - timedelta(days=16),
    }
]

# Mock prescriptions data
MOCK_PRESCRIPTIONS = [
    {
        "id": 1,
        "patient_id": 1,
        "doctor_id": 1,
        "diagnosis": "Гипертоническая болезнь 2 степени",
        "recommended_medications": [
            {
                "id": 1,
                "name": "Амлодипин",
                "dosage": "5 мг",
                "frequency": "1 раз в день",
                "duration": "30 дней",
                "evidence_level": "A",
                "justification": "Препарат первой линии для лечения гипертонии"
            }
        ],
        "notes": "Контроль АД через 2 недели",
        "status": "active",
        "created_at": datetime.now() - timedelta(days=5),
        "updated_at": datetime.now() - timedelta(days=1),
    },
    {
        "id": 2,
        "patient_id": 2,
        "doctor_id": 2,
        "diagnosis": "Сахарный диабет 2 типа",
        "recommended_medications": [
            {
                "id": 2,
                "name": "Метформин",
                "dosage": "500 мг",
                "frequency": "2 раза в день",
                "duration": "90 дней",
                "evidence_level": "A",
                "justification": "Препарат первой линии для лечения диабета 2 типа"
            }
        ],
        "notes": "Контроль глюкозы через месяц",
        "status": "active",
        "created_at": datetime.now() - timedelta(days=3),
        "updated_at": datetime.now() - timedelta(hours=6),
    },
    {
        "id": 3,
        "patient_id": 3,
        "doctor_id": 1,
        "diagnosis": "Острая респираторная вирусная инфекция",
        "recommended_medications": [
            {
                "id": 1,
                "name": "Аспирин",
                "dosage": "500 мг",
                "frequency": "3 раза в день",
                "duration": "7 дней",
                "evidence_level": "B",
                "justification": "Для снижения температуры и воспаления"
            }
        ],
        "notes": "Постельный режим, обильное питье",
        "status": "completed",
        "created_at": datetime.now() - timedelta(days=10),
        "updated_at": datetime.now() - timedelta(days=3),
    }
]

# Mock control visits data
MOCK_CONTROL_VISITS = [
    {
        "id": 1,
        "patient_id": 1,
        "type": "routine",
        "scheduled_date": datetime.now() + timedelta(days=7),
        "status": "scheduled",
        "notes": "Контроль АД после начала лечения",
        "created_at": datetime.now() - timedelta(days=5),
    },
    {
        "id": 2,
        "patient_id": 2,
        "type": "follow_up",
        "scheduled_date": datetime.now() + timedelta(days=14),
        "status": "scheduled", 
        "notes": "Контроль глюкозы и HbA1c",
        "created_at": datetime.now() - timedelta(days=3),
    }
]

# Mock side effects data
MOCK_SIDE_EFFECTS = [
    {
        "id": 1,
        "patient_id": 1,
        "medication_name": "Амлодипин",
        "description": "Отеки в области лодыжек",
        "severity": "mild",
        "status": "monitoring",
        "reported_date": datetime.now() - timedelta(days=2),
        "created_at": datetime.now() - timedelta(days=2),
    },
    {
        "id": 2,
        "patient_id": 2,
        "medication_name": "Метформин",
        "description": "Легкая тошнота по утрам",
        "severity": "mild",
        "status": "resolved",
        "reported_date": datetime.now() - timedelta(days=5),
        "created_at": datetime.now() - timedelta(days=5),
    }
]

# Helper functions
def get_mock_user_by_id(user_id: int) -> Dict[str, Any]:
    """Get mock user by ID"""
    for user in MOCK_USERS:
        if user["id"] == user_id:
            return user
    return None

def get_mock_patient_by_id(patient_id: int) -> Dict[str, Any]:
    """Get mock patient by ID"""
    for patient in MOCK_PATIENTS:
        if patient["id"] == patient_id:
            return patient
    return None

def get_mock_medication_by_id(medication_id: int) -> Dict[str, Any]:
    """Get mock medication by ID"""
    for medication in MOCK_MEDICATIONS:
        if medication["id"] == medication_id:
            return medication
    return None

def get_mock_prescription_by_id(prescription_id: int) -> Dict[str, Any]:
    """Get mock prescription by ID"""
    for prescription in MOCK_PRESCRIPTIONS:
        if prescription["id"] == prescription_id:
            return prescription
    return None

def get_mock_prescriptions_by_patient(patient_id: int) -> List[Dict[str, Any]]:
    """Get mock prescriptions by patient ID"""
    return [p for p in MOCK_PRESCRIPTIONS if p["patient_id"] == patient_id]

def get_mock_control_visits_by_patient(patient_id: int) -> List[Dict[str, Any]]:
    """Get mock control visits by patient ID"""
    return [v for v in MOCK_CONTROL_VISITS if v["patient_id"] == patient_id]

def get_mock_side_effects_by_patient(patient_id: int) -> List[Dict[str, Any]]:
    """Get mock side effects by patient ID"""
    return [s for s in MOCK_SIDE_EFFECTS if s["patient_id"] == patient_id]

def generate_mock_id() -> int:
    """Generate a new mock ID"""
    return random.randint(1000, 9999)
