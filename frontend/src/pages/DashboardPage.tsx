import React from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Box,
  Paper,
} from '@mui/material';
import {
  Add,
  People,
  Assignment,
  TrendingUp,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/Layout/Header';

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const quickActions = [
    {
      title: 'Новое назначение',
      description: 'Создать новое назначение для пациента',
      icon: <Add sx={{ fontSize: 40, color: 'primary.main' }} />,
      action: () => navigate('/prescriptions/new'),
      color: 'primary',
    },
    {
      title: 'Мои пациенты',
      description: 'Просмотр и управление пациентами',
      icon: <People sx={{ fontSize: 40, color: 'secondary.main' }} />,
      action: () => navigate('/patients'),
      color: 'secondary',
    },
    {
      title: 'История назначений',
      description: 'Просмотр всех назначений',
      icon: <Assignment sx={{ fontSize: 40, color: 'success.main' }} />,
      action: () => navigate('/prescriptions'),
      color: 'success',
    },
  ];

  const stats = [
    { label: 'Всего пациентов', value: '0', icon: <People /> },
    { label: 'Назначений за месяц', value: '0', icon: <Assignment /> },
    { label: 'Активных назначений', value: '0', icon: <TrendingUp /> },
  ];

  return (
    <Box>
      <Header />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Добро пожаловать, {user?.full_name || 'Доктор'}!
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Система рекомендаций медикаментов MedAI
          </Typography>
        </Box>

        {/* Quick Actions */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            Быстрые действия
          </Typography>
          <Grid container spacing={3}>
            {quickActions.map((action, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    cursor: 'pointer',
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                    },
                  }}
                  onClick={action.action}
                >
                  <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                    <Box sx={{ mb: 2 }}>{action.icon}</Box>
                    <Typography variant="h6" component="h3" gutterBottom>
                      {action.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {action.description}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ justifyContent: 'center' }}>
                    <Button
                      size="small"
                      color={action.color as any}
                      onClick={action.action}
                    >
                      Перейти
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Statistics */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            Статистика
          </Typography>
          <Grid container spacing={3}>
            {stats.map((stat, index) => (
              <Grid item xs={12} sm={4} key={index}>
                <Paper
                  sx={{
                    p: 3,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                  }}
                >
                  <Box
                    sx={{
                      p: 1,
                      borderRadius: 1,
                      bgcolor: 'primary.light',
                      color: 'primary.contrastText',
                    }}
                  >
                    {stat.icon}
                  </Box>
                  <Box>
                    <Typography variant="h4" component="div">
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {stat.label}
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Recent Activity */}
        <Box>
          <Typography variant="h5" component="h2" gutterBottom>
            Последняя активность
          </Typography>
          <Paper sx={{ p: 3 }}>
            <Typography variant="body1" color="text.secondary">
              У вас пока нет активности. Создайте первое назначение для пациента!
            </Typography>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
};

export default DashboardPage;
