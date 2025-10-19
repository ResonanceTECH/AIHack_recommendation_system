import { Patient } from '../types/patient';
import { Prescription } from '../types/prescription';

// Моковые данные для пациентов
export const mockPatients: Patient[] = [
  {
    id: 1,
    doctor_id: 1,
    full_name: 'Иванов Иван Иванович',
    age: 65,
    gender: 'male',
    weight: 75,
    height: 175,
    phone: '+7 (999) 123-45-67',
    email: 'ivanov@example.com',
    diagnosis: 'Фибрилляция предсердий',
    comorbidities: ['Гипертония', 'Сахарный диабет 2 типа'],
    lab_results: {
      'МНО': 2.1,
      'АЧТВ': 35.2,
      'Креатинин': 95.5
    },
    current_medications: [
      { name: 'Варфарин', dosage: '5мг', frequency: '1 раз в день', duration: '6 месяцев' },
      { name: 'Метформин', dosage: '500мг', frequency: '2 раза в день', duration: 'постоянно' }
    ],
    allergies: [{ allergen: 'Пенициллин', reaction: 'Кожная сыпь' }],
    previous_anticoagulants: [{ medication: 'Варфарин', dosage: '5мг', reason_for_discontinuation: 'Переход на новую схему' }],
    created_at: '2025-10-18T10:30:00Z',
    updated_at: '2025-10-19T14:20:00Z'
  },
  {
    id: 2,
    doctor_id: 1,
    full_name: 'Петрова Анна Сергеевна',
    age: 58,
    gender: 'female',
    weight: 68,
    height: 162,
    phone: '+7 (999) 234-56-78',
    email: 'petrova@example.com',
    diagnosis: 'Тромбоз глубоких вен',
    comorbidities: ['Варикозная болезнь'],
    lab_results: {
      'МНО': 2.8,
      'D-димер': 850.0
    },
    current_medications: [
      { name: 'Ривароксабан', dosage: '20мг', frequency: '1 раз в день', duration: '3 месяца' }
    ],
    allergies: [],
    previous_anticoagulants: [],
    created_at: '2025-10-18T09:15:00Z',
    updated_at: '2025-10-19T11:45:00Z'
  },
  {
    id: 3,
    doctor_id: 1,
    full_name: 'Сидоров Петр Николаевич',
    age: 72,
    gender: 'male',
    weight: 82,
    height: 180,
    phone: '+7 (999) 345-67-89',
    email: 'sidorov@example.com',
    diagnosis: 'Ишемическая болезнь сердца',
    comorbidities: ['Гипертония', 'Атеросклероз'],
    lab_results: {
      'МНО': 1.9,
      'Холестерин': 6.2
    },
    current_medications: [
      { name: 'Аспирин', dosage: '100мг', frequency: '1 раз в день', duration: 'постоянно' },
      { name: 'Аторвастатин', dosage: '20мг', frequency: '1 раз в день', duration: 'постоянно' }
    ],
    allergies: [{ allergen: 'Аспирин', reaction: 'Желудочное кровотечение' }],
    previous_anticoagulants: [{ medication: 'Клопидогрел', dosage: '75мг', reason_for_discontinuation: 'Замена на аспирин' }],
    created_at: '2025-10-18T16:30:00Z',
    updated_at: '2025-10-19T13:15:00Z'
  },
  {
    id: 4,
    doctor_id: 1,
    full_name: 'Козлова Мария Александровна',
    age: 45,
    gender: 'female',
    weight: 62,
    height: 168,
    phone: '+7 (999) 456-78-90',
    email: 'kozlova@example.com',
    diagnosis: 'Фибрилляция предсердий',
    comorbidities: ['Гипертония', 'Ожирение'],
    lab_results: {
      'МНО': 2.3,
      'АЧТВ': 28.5
    },
    current_medications: [
      { name: 'Апиксабан', dosage: '5мг', frequency: '2 раза в день', duration: 'постоянно' }
    ],
    allergies: [{ allergen: 'Сульфаниламиды', reaction: 'Кожная сыпь' }],
    previous_anticoagulants: [],
    created_at: '2025-10-17T14:20:00Z',
    updated_at: '2025-10-19T09:30:00Z'
  },
  {
    id: 5,
    doctor_id: 1,
    full_name: 'Морозов Владимир Сергеевич',
    age: 78,
    gender: 'male',
    weight: 70,
    height: 172,
    phone: '+7 (999) 567-89-01',
    email: 'morozov@example.com',
    diagnosis: 'Тромбоэмболия легочной артерии',
    comorbidities: ['ХОБЛ', 'Хроническая сердечная недостаточность'],
    lab_results: {
      'МНО': 2.5,
      'D-димер': 1200.0
    },
    current_medications: [
      { name: 'Ривароксабан', dosage: '15мг', frequency: '2 раза в день', duration: '3 недели' }
    ],
    allergies: [],
    previous_anticoagulants: [{ medication: 'Варфарин', dosage: '3мг', reason_for_discontinuation: 'Нестабильное МНО' }],
    created_at: '2025-10-16T11:45:00Z',
    updated_at: '2025-10-19T16:20:00Z'
  },
  {
    id: 6,
    doctor_id: 1,
    full_name: 'Волкова Елена Петровна',
    age: 52,
    gender: 'female',
    weight: 58,
    height: 165,
    phone: '+7 (999) 678-90-12',
    email: 'volkova@example.com',
    diagnosis: 'Тромбоз глубоких вен',
    comorbidities: ['Варикозная болезнь', 'Гипотиреоз'],
    lab_results: {
      'МНО': 2.0,
      'D-димер': 650.0
    },
    current_medications: [
      { name: 'Апиксабан', dosage: '2.5мг', frequency: '2 раза в день', duration: '6 месяцев' }
    ],
    allergies: [{ allergen: 'Йод', reaction: 'Кожная сыпь' }],
    previous_anticoagulants: [],
    created_at: '2025-10-15T08:30:00Z',
    updated_at: '2025-10-19T12:15:00Z'
  },
  {
    id: 7,
    doctor_id: 1,
    full_name: 'Новиков Андрей Михайлович',
    age: 35,
    gender: 'male',
    weight: 85,
    height: 185,
    phone: '+7 (999) 789-01-23',
    email: 'novikov@example.com',
    diagnosis: 'Фибрилляция предсердий',
    comorbidities: ['Гипертония'],
    lab_results: {
      'МНО': 2.2,
      'АЧТВ': 32.1
    },
    current_medications: [
      { name: 'Дабигатран', dosage: '150мг', frequency: '2 раза в день', duration: 'постоянно' }
    ],
    allergies: [],
    previous_anticoagulants: [],
    created_at: '2025-10-14T16:45:00Z',
    updated_at: '2025-10-19T10:30:00Z'
  },
  {
    id: 8,
    doctor_id: 1,
    full_name: 'Соколова Татьяна Владимировна',
    age: 68,
    gender: 'female',
    weight: 72,
    height: 160,
    phone: '+7 (999) 890-12-34',
    email: 'sokolova@example.com',
    diagnosis: 'Ишемическая болезнь сердца',
    comorbidities: ['Сахарный диабет 2 типа', 'Гипертония', 'Ожирение'],
    lab_results: {
      'МНО': 1.8,
      'Холестерин': 7.8
    },
    current_medications: [
      { name: 'Варфарин', dosage: '3мг', frequency: '1 раз в день', duration: 'постоянно' },
      { name: 'Метформин', dosage: '1000мг', frequency: '2 раза в день', duration: 'постоянно' }
    ],
    allergies: [{ allergen: 'Пенициллин', reaction: 'Анафилаксия' }],
    previous_anticoagulants: [{ medication: 'Клопидогрел', dosage: '75мг', reason_for_discontinuation: 'Побочные эффекты' }],
    created_at: '2025-10-13T13:20:00Z',
    updated_at: '2025-10-19T14:45:00Z'
  }
];

// Примеры ИИ-рекомендаций
export const aiRecommendationExamples = [
  {
    id: 1,
    title: "Пациент с ФП и умеренным нарушением функции почек",
    patientData: {
      age: 78,
      gender: "male",
      diagnosis: "Фибрилляция предсердий (неклапанная)",
      sgf: 42,
      currentMedications: ["Амлодипин 5 мг/сут"],
      allergies: [],
      previousAnticoagulants: []
    },
    recommendation: {
      medication: "Апиксабан",
      dosage: "2,5 мг",
      frequency: "два раза в день",
      duration: "постоянно",
      instructions: "Принимать в одно и то же время",
      evidenceLevel: "A",
      justification: "Для пациента с фибрилляцией предсердий и ХБП С3а стадии (СКФ = 42 мл/мин) рекомендуется апиксабан 2,5 мг два раза в день. Апиксабан имеет двойной путь экскреции (печеночный и почечный) и является предпочтительным выбором при умеренном снижении функции почек по сравнению с дабигатраном, который преимущественно выводится почками. Дозировка 2,5 мг соответствует инструкции для пациентов с двумя из трех критериев: возраст ≥80 лет, масса тела ≤60 кг, креатинин ≥1.5 мг/дл.",
      contraindications: ["Активное кровотечение", "Тяжелая печеночная недостаточность"],
      drugInteractions: [],
      sideEffects: ["Кровотечения", "Тошнота"]
    }
  },
  {
    id: 2,
    title: "Пациент с высоким риском лекарственного взаимодействия",
    patientData: {
      age: 65,
      gender: "female",
      diagnosis: "Тромбоз глубоких вен",
      sgf: 78,
      currentMedications: ["Амиодарон 200 мг/сут"],
      allergies: [],
      previousAnticoagulants: []
    },
    recommendation: {
      medication: "Ривароксабан",
      dosage: "15 мг → 20 мг",
      frequency: "2 раза в день → 1 раз в день",
      duration: "3 недели → постоянно",
      instructions: "Принимать во время еды",
      evidenceLevel: "A",
      justification: "Для лечения ТГВ у данного пациента рекомендован ривароксабан 15 мг 2 раза в день в первые 3 недели, с последующим переходом на 20 мг 1 раз в день.",
      contraindications: ["Активное кровотечение"],
      drugInteractions: ["Амиодарон - умеренный ингибитор P-гликопротеина"],
      sideEffects: ["Кровотечения", "Тошнота"],
      warnings: ["ВНИМАНИЕ: Потенциальное лекарственное взаимодействие. Амиодарон является умеренным ингибитором P-гликопротеина и может повышать концентрацию ривароксабана и апиксабана в крови. Хотя коррекция дозы для НОАК при совместном применении с амиодароном обычно не требуется, необходим тщательный мониторинг признаков кровотечения. Рассмотрите возможность выбора препарата с более низким потенциалом взаимодействия или усиление контроля."]
    }
  },
  {
    id: 3,
    title: "Пациент с непереносимостью в анамнезе",
    patientData: {
      age: 70,
      gender: "male",
      diagnosis: "Фибрилляция предсердий",
      sgf: 95,
      currentMedications: [],
      allergies: [],
      previousAnticoagulants: ["Дабигатран 150 мг 2 раза в день - диспепсия"]
    },
    recommendation: {
      medication: "Апиксабан или Ривароксабан",
      dosage: "5 мг или 20 мг",
      frequency: "2 раза в день или 1 раз в день",
      duration: "постоянно",
      instructions: "Апиксабан - в одно время, Ривароксабан - во время еды",
      evidenceLevel: "A",
      justification: "У пациента в анамнезе — непереносимость дабигатрана (диспепсия), что является известным побочным эффектом данной лекарственной формы. Рекомендуется назначение одного из факторов Xa ингибиторов, не ассоциированных с частой диспепсией.",
      contraindications: ["Активное кровотечение"],
      drugInteractions: [],
      sideEffects: ["Кровотечения"],
      alternatives: [
        {
          medication: "Апиксабан (Эликвис)",
          dosage: "5 мг",
          frequency: "2 раза в день",
          reason: "Стандартная доза при ФП для пациента без факторов снижения дозы"
        },
        {
          medication: "Ривароксабан (Ксарелто)",
          dosage: "20 мг",
          frequency: "1 раз в день",
          reason: "Для улучшения переносимости"
        }
      ]
    }
  }
];

// Моковые данные для рецептов
export const mockPrescriptions: Prescription[] = [
  {
    id: 1,
    patient_id: 1,
    doctor_id: 1,
    recommended_medications: [
      {
        id: 1,
        name: 'Варфарин',
        dosage: '5мг',
        frequency: '1 раз в день',
        duration: '6 месяцев',
        instructions: 'Принимать в одно и то же время, контролировать МНО еженедельно',
        evidence_level: 'A',
        justification: 'Рекомендуется для профилактики тромбоэмболии при фибрилляции предсердий',
        contraindications: ['Беременность', 'Активное кровотечение'],
        side_effects: ['Кровотечения', 'Кожные реакции']
      }
    ],
    dosage: { 'Варфарин': '5мг' },
    duration: '6 месяцев',
    instructions: 'Принимать в одно и то же время, контролировать МНО еженедельно',
    ai_recommendations: [
      {
        medication: 'Варфарин',
        dosage: '5мг',
        frequency: '1 раз в день',
        duration: '6 месяцев',
        instructions: 'Принимать в одно и то же время',
        evidence_level: 'A',
        clinical_studies: ['WARFARIN vs NOAC study'],
        contraindications: ['Беременность'],
        drug_interactions: ['Аспирин', 'НПВС'],
        side_effects: ['Кровотечения']
      }
    ],
    justification: 'Пациент с фибрилляцией предсердий, высокий риск тромбоэмболии',
    status: 'active',
    is_ai_generated: true,
    created_at: '2025-10-18T10:30:00Z',
    updated_at: '2025-10-19T14:20:00Z'
  },
  {
    id: 2,
    patient_id: 2,
    doctor_id: 1,
    recommended_medications: [
      {
        id: 2,
        name: 'Ривароксабан',
        dosage: '20мг',
        frequency: '1 раз в день',
        duration: '3 месяца',
        instructions: 'Принимать во время еды',
        evidence_level: 'A',
        justification: 'Эффективен при тромбозе глубоких вен',
        contraindications: ['Активное кровотечение'],
        side_effects: ['Кровотечения', 'Тошнота']
      }
    ],
    dosage: { 'Ривароксабан': '20мг' },
    duration: '3 месяца',
    instructions: 'Принимать во время еды',
    status: 'active',
    is_ai_generated: false,
    created_at: '2025-10-18T09:15:00Z',
    updated_at: '2025-10-19T11:45:00Z'
  },
  {
    id: 3,
    patient_id: 1,
    doctor_id: 1,
    recommended_medications: [
      {
        id: 3,
        name: 'Метформин',
        dosage: '500мг',
        frequency: '2 раза в день',
        duration: 'постоянно',
        instructions: 'Принимать во время еды',
        evidence_level: 'A',
        justification: 'Базовая терапия сахарного диабета 2 типа',
        contraindications: ['Почечная недостаточность'],
        side_effects: ['Тошнота', 'Диарея']
      }
    ],
    dosage: { 'Метформин': '500мг' },
    duration: 'постоянно',
    instructions: 'Принимать во время еды',
    status: 'active',
    is_ai_generated: false,
    created_at: '2025-10-18T08:00:00Z',
    updated_at: '2025-10-19T08:00:00Z'
  },
  {
    id: 4,
    patient_id: 4,
    doctor_id: 1,
    recommended_medications: [
      {
        id: 4,
        name: 'Апиксабан',
        dosage: '5мг',
        frequency: '2 раза в день',
        duration: 'постоянно',
        instructions: 'Принимать в одно и то же время',
        evidence_level: 'A',
        justification: 'Стандартная доза для пациентов с ФП',
        contraindications: ['Активное кровотечение'],
        side_effects: ['Кровотечения']
      }
    ],
    dosage: { 'Апиксабан': '5мг' },
    duration: 'постоянно',
    instructions: 'Принимать в одно и то же время',
    status: 'active',
    is_ai_generated: true,
    created_at: '2025-10-17T14:20:00Z',
    updated_at: '2025-10-19T09:30:00Z'
  },
  {
    id: 5,
    patient_id: 5,
    doctor_id: 1,
    recommended_medications: [
      {
        id: 5,
        name: 'Ривароксабан',
        dosage: '15мг',
        frequency: '2 раза в день',
        duration: '3 недели',
        instructions: 'Принимать во время еды',
        evidence_level: 'A',
        justification: 'Лечение ТЭЛА с переходом дозировки',
        contraindications: ['Активное кровотечение'],
        side_effects: ['Кровотечения', 'Тошнота']
      }
    ],
    dosage: { 'Ривароксабан': '15мг' },
    duration: '3 недели',
    instructions: 'Принимать во время еды',
    status: 'active',
    is_ai_generated: false,
    created_at: '2025-10-16T11:45:00Z',
    updated_at: '2025-10-19T16:20:00Z'
  },
  {
    id: 6,
    patient_id: 6,
    doctor_id: 1,
    recommended_medications: [
      {
        id: 6,
        name: 'Апиксабан',
        dosage: '2.5мг',
        frequency: '2 раза в день',
        duration: '6 месяцев',
        instructions: 'Принимать в одно и то же время',
        evidence_level: 'A',
        justification: 'Сниженная доза для пациентов с факторами риска',
        contraindications: ['Активное кровотечение'],
        side_effects: ['Кровотечения']
      }
    ],
    dosage: { 'Апиксабан': '2.5мг' },
    duration: '6 месяцев',
    instructions: 'Принимать в одно и то же время',
    status: 'active',
    is_ai_generated: true,
    created_at: '2025-10-15T08:30:00Z',
    updated_at: '2025-10-19T12:15:00Z'
  },
  {
    id: 7,
    patient_id: 7,
    doctor_id: 1,
    recommended_medications: [
      {
        id: 7,
        name: 'Дабигатран',
        dosage: '150мг',
        frequency: '2 раза в день',
        duration: 'постоянно',
        instructions: 'Принимать во время еды',
        evidence_level: 'A',
        justification: 'Стандартная доза для молодых пациентов с ФП',
        contraindications: ['Активное кровотечение'],
        side_effects: ['Диспепсия', 'Кровотечения']
      }
    ],
    dosage: { 'Дабигатран': '150мг' },
    duration: 'постоянно',
    instructions: 'Принимать во время еды',
    status: 'completed',
    is_ai_generated: false,
    created_at: '2025-10-14T16:45:00Z',
    updated_at: '2025-10-19T10:30:00Z'
  },
  {
    id: 8,
    patient_id: 8,
    doctor_id: 1,
    recommended_medications: [
      {
        id: 8,
        name: 'Варфарин',
        dosage: '3мг',
        frequency: '1 раз в день',
        duration: 'постоянно',
        instructions: 'Принимать в одно и то же время, контролировать МНО',
        evidence_level: 'A',
        justification: 'Сниженная доза для пациентов с множественными факторами риска',
        contraindications: ['Активное кровотечение', 'Беременность'],
        side_effects: ['Кровотечения', 'Кожные реакции']
      }
    ],
    dosage: { 'Варфарин': '3мг' },
    duration: 'постоянно',
    instructions: 'Принимать в одно и то же время, контролировать МНО',
    status: 'draft',
    is_ai_generated: true,
    created_at: '2025-10-13T13:20:00Z',
    updated_at: '2025-10-19T14:45:00Z'
  }
];

// Функции для работы с localStorage
export const getStoredPatients = (): Patient[] => {
  const stored = localStorage.getItem('patients');
  return stored ? JSON.parse(stored) : mockPatients;
};

export const setStoredPatients = (patients: Patient[]) => {
  localStorage.setItem('patients', JSON.stringify(patients));
};

export const getStoredPrescriptions = (): Prescription[] => {
  const stored = localStorage.getItem('prescriptions');
  return stored ? JSON.parse(stored) : mockPrescriptions;
};

export const setStoredPrescriptions = (prescriptions: Prescription[]) => {
  localStorage.setItem('prescriptions', JSON.stringify(prescriptions));
};

// Инициализация данных при первом запуске
export const initializeMockData = () => {
  // Очищаем старые данные и загружаем новые с актуальными датами
  localStorage.removeItem('patients');
  localStorage.removeItem('prescriptions');
  setStoredPatients(mockPatients);
  setStoredPrescriptions(mockPrescriptions);
};
