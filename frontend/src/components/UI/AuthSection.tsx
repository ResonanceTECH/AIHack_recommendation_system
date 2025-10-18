import React from 'react';
import {
  Box,
  Typography,
  Button,
  Link,
} from '@mui/material';
import {
  Login,
  ArrowForward,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const AuthSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        backgroundColor: '#1976d2',
        borderRadius: 2,
        p: 4,
        mb: 6,
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          right: 0,
          width: '200px',
          height: '100%',
          background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
          borderRadius: '0 8px 8px 0',
        },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ flex: 1, pr: 4 }}>
          <Typography
            variant="h4"
            component="h2"
            sx={{
              fontFamily: 'CeraPro, Roboto, Arial, sans-serif',
              fontWeight: 700,
              color: '#ffffff',
              mb: 2,
            }}
          >
            Авторизация
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: '#ffffff',
              opacity: 0.9,
              mb: 2,
              lineHeight: 1.6,
            }}
          >
            Войдите в систему для доступа к персонализированным рекомендациям медикаментов
            и управлению пациентами
          </Typography>
          <Link
            href="#"
            onClick={(e) => {
              e.preventDefault();
              navigate('/register');
            }}
            sx={{
              color: '#ffffff',
              textDecoration: 'underline',
              fontSize: '0.875rem',
              fontWeight: 500,
              '&:hover': {
                color: '#e3f2fd',
                textDecoration: 'underline',
              },
            }}
          >
            Как зарегистрироваться и получить доступ к системе
          </Link>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              borderRadius: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Login sx={{ color: '#ffffff', fontSize: 20 }} />
          </Box>
          <Button
            variant="outlined"
            onClick={() => navigate('/login')}
            endIcon={<ArrowForward />}
            sx={{
              backgroundColor: '#ffffff',
              color: '#1976d2',
              borderColor: '#ffffff',
              px: 3,
              py: 1.5,
              fontSize: '0.875rem',
              fontWeight: 600,
              textTransform: 'none',
              borderRadius: 1,
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              '&:hover': {
                backgroundColor: '#f5f5f5',
                borderColor: '#ffffff',
                transform: 'translateY(-1px)',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
              },
            }}
          >
            Войти в систему
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AuthSection;
