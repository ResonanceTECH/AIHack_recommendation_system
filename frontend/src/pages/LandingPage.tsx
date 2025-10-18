import React from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
} from '@mui/material';
import {
  LocalHospital,
  People,
  Assignment,
  Analytics,
  ArrowForward,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Layout/Header';
import InfoCard from '../components/UI/InfoCard';
import AuthSection from '../components/UI/AuthSection';
import ServiceFeatures from '../components/UI/ServiceFeatures';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const mainFeatures = [
    {
      icon: <LocalHospital sx={{ fontSize: 28 }} />,
      title: '1. ИИ-рекомендации медикаментов',
      description: 'Получайте персонализированные рекомендации медикаментов на основе клинических данных пациента, анализа взаимодействий препаратов и противопоказаний.',
      linkText: 'Как получить рекомендации',
      onLinkClick: () => navigate('/features/recommendations'),
    },
    {
      icon: <People sx={{ fontSize: 28 }} />,
      title: '2. Управление пациентами',
      description: 'Централизованная база данных пациентов с полной медицинской историей, включая аллергии, противопоказания и предыдущие назначения.',
      linkText: 'Перейти к пациентам',
      onLinkClick: () => navigate('/patients'),
    },
  ];

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#ffffff' }}>
      <Header />

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        {/* Main Heading */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            variant="h1"
            component="h1"
            gutterBottom
            sx={{
              fontFamily: 'CeraPro, Roboto, Arial, sans-serif',
              fontWeight: 700,
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              lineHeight: 1.2,
              color: '#2c2c2c',
              mb: 3,
            }}
          >
            Запись к врачу с рекомендациями медикаментов
          </Typography>
          <Typography
            variant="h5"
            component="p"
            sx={{
              color: '#2c2c2c',
              maxWidth: '800px',
              mx: 'auto',
              lineHeight: 1.6,
              fontWeight: 400,
            }}
          >
            Для получения персонализированных рекомендаций медикаментов вам потребуются:
          </Typography>
        </Box>

        {/* Main Features Cards */}
        <Grid container spacing={4} sx={{ mb: 8 }}>
          {mainFeatures.map((feature, index) => (
            <Grid item xs={12} md={6} key={index}>
              <InfoCard
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                linkText={feature.linkText}
                onLinkClick={feature.onLinkClick}
              />
            </Grid>
          ))}
        </Grid>

        {/* Auth Section */}
        <AuthSection />

        {/* Service Features */}
        <ServiceFeatures />

        {/* CTA Section */}
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography
            variant="h2"
            component="h2"
            gutterBottom
            sx={{
              fontFamily: 'CeraPro, Roboto, Arial, sans-serif',
              fontWeight: 700,
              color: '#2c2c2c',
              mb: 3,
            }}
          >
            Готовы начать?
          </Typography>
          <Typography
            variant="h6"
            sx={{
              mb: 4,
              color: '#666666',
              maxWidth: '600px',
              mx: 'auto',
              lineHeight: 1.6,
            }}
          >
            Присоединяйтесь к врачам, которые уже используют MedAI для улучшения качества медицинской помощи
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/register')}
            endIcon={<ArrowForward />}
            sx={{
              px: 6,
              py: 2,
              fontSize: '1.125rem',
              fontWeight: 600,
              '&:hover': {
                transform: 'translateY(-2px)',
              },
            }}
          >
            Начать работу
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default LandingPage;