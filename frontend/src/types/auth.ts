export interface User {
  id: number;
  email: string;
  full_name?: string;
  specialty?: string;
  workplace?: string;
  medical_license?: string;
  phone?: string;
  is_active: boolean;
  is_verified: boolean;
  created_at: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  full_name?: string;
  specialty?: string;
  workplace?: string;
  medical_license?: string;
  phone?: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
}
