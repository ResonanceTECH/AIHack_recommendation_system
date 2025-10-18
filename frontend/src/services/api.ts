import axios from 'axios';
import { User, LoginCredentials, RegisterData, AuthResponse } from '../types/auth';
import { Patient, PatientCreate, PatientUpdate } from '../types/patient';
import { Prescription, PrescriptionCreate, PrescriptionUpdate } from '../types/prescription';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Добавляем токен к каждому запросу
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Обрабатываем ошибки авторизации
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const formData = new FormData();
    formData.append('username', credentials.email);
    formData.append('password', credentials.password);
    
    const response = await api.post('/auth/login', formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    return response.data;
  },

  register: async (data: RegisterData): Promise<User> => {
    const response = await api.post('/auth/register', data);
    return response.data;
  },

  getCurrentUser: async (): Promise<User> => {
    const response = await api.get('/auth/me');
    return response.data;
  },
};

export const patientApi = {
  getPatients: async (): Promise<Patient[]> => {
    const response = await api.get('/patients');
    return response.data;
  },

  getPatient: async (id: number): Promise<Patient> => {
    const response = await api.get(`/patients/${id}`);
    return response.data;
  },

  createPatient: async (data: PatientCreate): Promise<Patient> => {
    const response = await api.post('/patients', data);
    return response.data;
  },

  updatePatient: async (id: number, data: PatientUpdate): Promise<Patient> => {
    const response = await api.put(`/patients/${id}`, data);
    return response.data;
  },

  deletePatient: async (id: number): Promise<void> => {
    await api.delete(`/patients/${id}`);
  },
};

export const prescriptionApi = {
  getPrescriptions: async (): Promise<Prescription[]> => {
    const response = await api.get('/prescriptions');
    return response.data;
  },

  getPrescription: async (id: number): Promise<Prescription> => {
    const response = await api.get(`/prescriptions/${id}`);
    return response.data;
  },

  createPrescription: async (data: PrescriptionCreate): Promise<Prescription> => {
    const response = await api.post('/prescriptions', data);
    return response.data;
  },

  updatePrescription: async (id: number, data: PrescriptionUpdate): Promise<Prescription> => {
    const response = await api.put(`/prescriptions/${id}`, data);
    return response.data;
  },

  deletePrescription: async (id: number): Promise<void> => {
    await api.delete(`/prescriptions/${id}`);
  },
};
