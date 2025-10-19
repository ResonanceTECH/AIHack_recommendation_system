import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, LoginCredentials, RegisterData } from '../types/auth';

interface AuthContextType {
  user: User | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

// Генерируем простой токен для демонстрации
const generateToken = () => {
  return 'demo_token_' + Math.random().toString(36).substr(2, 9);
};

// Создаем демо пользователя
const createDemoUser = (data: RegisterData): User => {
  return {
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
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Создаем демо пользователя если его нет
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
    if (existingUsers.length === 0) {
      const demoUser: User = {
        id: 1,
        email: 'doctor1@medai.com',
        full_name: 'Доктор Иванов Иван Иванович',
        specialty: 'Терапевт',
        workplace: 'Городская больница №1',
        medical_license: 'МЛ-123456',
        phone: '+7 (999) 123-45-67',
        is_active: true,
        is_verified: true,
        created_at: new Date().toISOString(),
      };
      localStorage.setItem('users', JSON.stringify([demoUser]));
    }

    // Проверяем localStorage на наличие пользователя
    const savedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (savedUser && token) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
      } catch (error) {
        // Если данные повреждены, очищаем localStorage
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  }, []);

  const login = async (credentials: LoginCredentials) => {
    // Симуляция задержки сети
    await new Promise(resolve => setTimeout(resolve, 500));

    // Проверяем существующих пользователей в localStorage
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const existingUser = existingUsers.find((u: User) => u.email === credentials.email);

    if (existingUser) {
      // Пользователь найден, создаем токен и входим
      const token = generateToken();
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(existingUser));
      setUser(existingUser);
    } else {
      // Пользователь не найден
      throw new Error('Пользователь с таким email не найден');
    }
  };

  const register = async (data: RegisterData) => {
    // Симуляция задержки сети
    await new Promise(resolve => setTimeout(resolve, 800));

    // Проверяем, не существует ли уже пользователь с таким email
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const existingUser = existingUsers.find((u: User) => u.email === data.email);

    if (existingUser) {
      throw new Error('Пользователь с таким email уже существует');
    }

    // Создаем нового пользователя
    const newUser = createDemoUser(data);
    const updatedUsers = [...existingUsers, newUser];
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    // Автоматически входим после регистрации
    const token = generateToken();
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(newUser));
    setUser(newUser);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));

      // Обновляем данные в списке пользователей
      const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
      const updatedUsers = existingUsers.map((u: User) =>
        u.id === user.id ? updatedUser : u
      );
      localStorage.setItem('users', JSON.stringify(updatedUsers));
    }
  };

  const value = {
    user,
    login,
    register,
    logout,
    updateUser,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
