import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  AppBar,
  Toolbar,
} from '@mui/material';
import {
  MedicalServices,
  Psychology,
  Speed,
  Security,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Layout/Header';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <MedicalServices sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'ИИ-рекомендации',
      description: 'Получайте персонализированные рекомендации медикаментов на основе клинических данных пациента',
    },
    {
      icon: <Psychology sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Умный анализ',
      description: 'Анализ взаимодействий препаратов, противопоказаний и побочных эффектов',
    },
    {
      icon: <Speed sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Быстрое назначение',
      description: 'Создавайте назначения за несколько минут с помощью интуитивного интерфейса',
    },
    {
      icon: <Security sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Безопасность',
      description: 'Все данные защищены и соответствуют требованиям медицинской конфиденциальности',
    },
  ];

  return (
    <Box>
      <Header />
      
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
          color: 'white',
          py: 10,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h2" component="h1" gutterBottom>
                MedAI
              </Typography>
              <Typography variant="h4" component="h2" gutterBottom>
                Система рекомендаций медикаментов для врачей
              </Typography>
              <Typography variant="h6" paragraph>
                Используйте искусственный интеллект для принятия обоснованных решений
                о назначении медикаментов вашим пациентам
              </Typography>
              <Box sx={{ mt: 4 }}>
                <Button
                  variant="contained"
                  size="large"
                  color="secondary"
                  onClick={() => navigate('/register')}
                  sx={{ mr: 2, mb: 2 }}
                >
                  Начать работу
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  color="inherit"
                  onClick={() => navigate('/login')}
                  sx={{ mb: 2 }}
                >
                  Войти
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 400,
                }}
              >
                <MedicalServices sx={{ fontSize: 200, opacity: 0.3 }} />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography
          variant="h3"
          component="h2"
          textAlign="center"
          gutterBottom
          sx={{ mb: 6 }}
        >
          Возможности системы
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  textAlign: 'center',
                  p: 2,
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                  <Typography variant="h6" component="h3" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)',
          py: 8,
        }}
      >
        <Container maxWidth="md">
          <Box textAlign="center">
            <Typography variant="h4" component="h2" gutterBottom>
              Готовы начать?
            </Typography>
            <Typography variant="h6" paragraph>
              Зарегистрируйтесь и получите доступ к системе рекомендаций медикаментов
            </Typography>
            <Button
              variant="contained"
              size="large"
              color="primary"
              onClick={() => navigate('/register')}
            >
              Зарегистрироваться
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage;
