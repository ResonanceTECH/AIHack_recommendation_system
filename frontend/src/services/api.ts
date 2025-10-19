import { User, LoginCredentials, RegisterData, AuthResponse } from '../types/auth';
import { Patient, PatientUpdate } from '../types/patient';
import { Prescription, PrescriptionUpdate } from '../types/prescription';
import {
  getStoredPatients,
  setStoredPatients,
  getStoredPrescriptions,
  setStoredPrescriptions,
  initializeMockData
} from './mockData';

// Инициализируем моковые данные при импорте
initializeMockData();

// Симуляция задержки сети
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    await delay(500);
    // Проверяем существующих пользователей в localStorage
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const existingUser = existingUsers.find((u: User) => u.email === credentials.email);

    if (existingUser) {
      const token = 'demo_token_' + Math.random().toString(36).substr(2, 9);
      return { access_token: token, token_type: 'bearer' };
    } else {
      throw new Error('Пользователь с таким email не найден');
    }
  },

  register: async (data: RegisterData): Promise<User> => {
    await delay(800);
    // Проверяем, не существует ли уже пользователь с таким email
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const existingUser = existingUsers.find((u: User) => u.email === data.email);

    if (existingUser) {
      throw new Error('Пользователь с таким email уже существует');
    }

    // Создаем нового пользователя
    const newUser: User = {
      id: Date.now(),
      email: data.email,
      full_name: data.full_name || '',
      specialty: data.specialty || '',
      workplace: data.workplace || '',
      medical_license: data.medical_license || '',
      phone: data.phone || '',
      is_active: true,
      is_verified: true,
      created_at: new Date().toISOString(),
    };

    const updatedUsers = [...existingUsers, newUser];
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    return newUser;
  },

  getCurrentUser: async (): Promise<User> => {
    await delay(300);
    const user = localStorage.getItem('user');
    if (user) {
      return JSON.parse(user);
    }
    throw new Error('Пользователь не авторизован');
  },
};

export const patientApi = {
  getPatients: async (): Promise<Patient[]> => {
    await delay(300);
    return getStoredPatients();
  },

  getPatient: async (id: number): Promise<Patient> => {
    await delay(200);
    const patients = getStoredPatients();
    const patient = patients.find(p => p.id === id);
    if (!patient) {
      throw new Error('Пациент не найден');
    }
    return patient;
  },

  createPatient: async (data: any): Promise<Patient> => {
    await delay(500);
    const patients = getStoredPatients();
    const newPatient: Patient = {
      id: Date.now(),
      doctor_id: 1, // Используем ID текущего пользователя
      ...data,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    const updatedPatients = [...patients, newPatient];
    setStoredPatients(updatedPatients);
    return newPatient;
  },

  updatePatient: async (id: number, data: PatientUpdate): Promise<Patient> => {
    await delay(400);
    const patients = getStoredPatients();
    const patientIndex = patients.findIndex(p => p.id === id);
    if (patientIndex === -1) {
      throw new Error('Пациент не найден');
    }
    const updatedPatient = {
      ...patients[patientIndex],
      ...data,
      updated_at: new Date().toISOString(),
    };
    patients[patientIndex] = updatedPatient;
    setStoredPatients(patients);
    return updatedPatient;
  },

  deletePatient: async (id: number): Promise<void> => {
    await delay(300);
    const patients = getStoredPatients();
    const filteredPatients = patients.filter(p => p.id !== id);
    setStoredPatients(filteredPatients);
  },
};

export const prescriptionApi = {
  getPrescriptions: async (): Promise<Prescription[]> => {
    await delay(300);
    return getStoredPrescriptions();
  },

  getPrescription: async (id: number): Promise<Prescription> => {
    await delay(200);
    const prescriptions = getStoredPrescriptions();
    const prescription = prescriptions.find(p => p.id === id);
    if (!prescription) {
      throw new Error('Рецепт не найден');
    }
    return prescription;
  },

  createPrescription: async (data: any): Promise<Prescription> => {
    await delay(500);
    const prescriptions = getStoredPrescriptions();
    const newPrescription: Prescription = {
      id: Date.now(),
      doctor_id: 1, // Используем ID текущего пользователя
      status: 'active',
      is_ai_generated: false,
      ...data,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    const updatedPrescriptions = [...prescriptions, newPrescription];
    setStoredPrescriptions(updatedPrescriptions);
    return newPrescription;
  },

  updatePrescription: async (id: number, data: PrescriptionUpdate): Promise<Prescription> => {
    await delay(400);
    const prescriptions = getStoredPrescriptions();
    const prescriptionIndex = prescriptions.findIndex(p => p.id === id);
    if (prescriptionIndex === -1) {
      throw new Error('Рецепт не найден');
    }
    const updatedPrescription = {
      ...prescriptions[prescriptionIndex],
      ...data,
      updated_at: new Date().toISOString(),
    };
    prescriptions[prescriptionIndex] = updatedPrescription;
    setStoredPrescriptions(prescriptions);
    return updatedPrescription;
  },

  deletePrescription: async (id: number): Promise<void> => {
    await delay(300);
    const prescriptions = getStoredPrescriptions();
    const filteredPrescriptions = prescriptions.filter(p => p.id !== id);
    setStoredPrescriptions(filteredPrescriptions);
  },
};
