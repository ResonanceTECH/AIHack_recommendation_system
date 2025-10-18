import React, { useState } from 'react';
import {
  Container,
  Paper,
  Box,
  TextField,
  Button,
  Typography,
  Link,
  Alert,
  CircularProgress,
  FormControlLabel,
  Checkbox,
  Grid,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { RegisterData } from '../types/auth';

const schema = yup.object({
  email: yup
    .string()
    .email('Введите корректный email')
    .required('Email обязателен'),
  password: yup
    .string()
    .min(6, 'Пароль должен содержать минимум 6 символов')
    .required('Пароль обязателен'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Пароли не совпадают')
    .required('Подтверждение пароля обязательно'),
  full_name: yup.string().required('ФИО обязательно'),
  specialty: yup.string().required('Специальность обязательна'),
  workplace: yup.string().required('Место работы обязательно'),
  medical_license: yup.string().required('Номер лицензии обязателен'),
  phone: yup.string().required('Телефон обязателен'),
  agreeToTerms: yup
    .boolean()
    .oneOf([true], 'Необходимо согласие с условиями'),
});

interface RegisterFormData extends RegisterData {
  confirmPassword: string;
  agreeToTerms: boolean;
}

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { register: registerUser } = useAuth();
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(schema) as any,
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setLoading(true);
      setError('');
      const { confirmPassword, agreeToTerms, ...registerData } = data;
      await registerUser(registerData);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Ошибка регистрации');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="md">
      <Box
        sx={{
          marginTop: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper elevation={3} sx={{ padding: 4, width: '100%' }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h4" gutterBottom>
              Регистрация врача
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center">
              Создайте аккаунт для доступа к системе рекомендаций медикаментов
            </Typography>

            {error && (
              <Alert severity="error" sx={{ width: '100%', mt: 2 }}>
                {error}
              </Alert>
            )}

            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              sx={{ mt: 3, width: '100%' }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    {...register('email')}
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    autoComplete="email"
                    error={!!errors.email}
                    helperText={errors.email?.message}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    {...register('password')}
                    required
                    fullWidth
                    name="password"
                    label="Пароль"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    error={!!errors.password}
                    helperText={errors.password?.message}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    {...register('confirmPassword')}
                    required
                    fullWidth
                    name="confirmPassword"
                    label="Подтверждение пароля"
                    type="password"
                    id="confirmPassword"
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword?.message}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    {...register('full_name')}
                    required
                    fullWidth
                    id="full_name"
                    label="ФИО"
                    name="full_name"
                    autoComplete="name"
                    error={!!errors.full_name}
                    helperText={errors.full_name?.message}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    {...register('specialty')}
                    required
                    fullWidth
                    id="specialty"
                    label="Специальность"
                    name="specialty"
                    error={!!errors.specialty}
                    helperText={errors.specialty?.message}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    {...register('workplace')}
                    required
                    fullWidth
                    id="workplace"
                    label="Место работы"
                    name="workplace"
                    error={!!errors.workplace}
                    helperText={errors.workplace?.message}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    {...register('medical_license')}
                    required
                    fullWidth
                    id="medical_license"
                    label="Номер медицинской лицензии"
                    name="medical_license"
                    error={!!errors.medical_license}
                    helperText={errors.medical_license?.message}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    {...register('phone')}
                    required
                    fullWidth
                    id="phone"
                    label="Телефон"
                    name="phone"
                    autoComplete="tel"
                    error={!!errors.phone}
                    helperText={errors.phone?.message}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        {...register('agreeToTerms')}
                        color="primary"
                      />
                    }
                    label="Я согласен с условиями использования и политикой конфиденциальности"
                  />
                  {errors.agreeToTerms && (
                    <Typography variant="caption" color="error">
                      {errors.agreeToTerms.message}
                    </Typography>
                  )}
                </Grid>
              </Grid>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : 'Зарегистрироваться'}
              </Button>
              <Box textAlign="center">
                <Link component={RouterLink} to="/login" variant="body2">
                  Уже есть аккаунт? Войти
                </Link>
              </Box>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default RegisterPage;
