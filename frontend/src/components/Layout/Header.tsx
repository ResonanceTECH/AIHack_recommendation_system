import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Divider,
} from '@mui/material';
import {
  AccountCircle,
  ChevronRight,
  Dashboard,
  People,
  Assignment,
  Analytics,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import NotificationCenter from '../Notifications/NotificationCenter';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleClose();
    navigate('/login');
  };

  const navigationItems = [
    { label: 'Главная', path: '/', icon: <Dashboard /> },
    { label: 'Пациенты', path: '/patients', icon: <People /> },
    { label: 'Назначения', path: '/prescriptions', icon: <Assignment /> },
    { label: 'Аналитика', path: '/analytics', icon: <Analytics /> },
  ];

  return (
    <AppBar position="static" elevation={0} sx={{ backgroundColor: '#ffffff' }}>
      <Toolbar sx={{ minHeight: '64px', px: { xs: 2, md: 4 } }}>
        {/* Логотип с подчеркиванием */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            mr: 4,
          }}
          onClick={() => navigate('/')}
        >
          <Typography
            variant="h5"
            component="div"
            sx={{
              fontFamily: 'CeraPro, Roboto, Arial, sans-serif',
              fontWeight: 700,
              color: '#2c2c2c',
              position: 'relative',
            }}
          >
            MedAI
            <Box
              sx={{
                position: 'absolute',
                bottom: -2,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '60%',
                height: '2px',
                backgroundColor: '#1976d2',
              }}
            />
          </Typography>
        </Box>

        {/* Навигационное меню */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
          {navigationItems.map((item) => (
            <Button
              key={item.path}
              onClick={() => navigate(item.path)}
              startIcon={item.icon}
              sx={{
                color: location.pathname === item.path ? '#1976d2' : '#2c2c2c',
                textTransform: 'none',
                fontWeight: location.pathname === item.path ? 600 : 400,
                px: 2,
                py: 1,
                borderRadius: 1,
                '&:hover': {
                  backgroundColor: '#f5f5f5',
                },
                borderBottom: location.pathname === item.path ? '2px solid #1976d2' : 'none',
              }}
            >
              {item.label}
            </Button>
          ))}
        </Box>

        {/* Правая часть с уведомлениями и пользователем */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 'auto' }}>
          <NotificationCenter
            notifications={[]}
            onMarkAsRead={() => { }}
            onMarkAllAsRead={() => { }}
            onClearAll={() => { }}
          />

          {user ? (
            <>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                sx={{
                  color: '#2c2c2c',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  px: 2,
                  py: 1,
                  borderRadius: 1,
                  '&:hover': {
                    backgroundColor: '#f5f5f5',
                  },
                }}
              >
                <Avatar sx={{ width: 24, height: 24, fontSize: '0.875rem' }}>
                  {user.full_name?.charAt(0) || 'U'}
                </Avatar>
                <Typography variant="body2" sx={{ color: '#2c2c2c' }}>
                  {user.full_name || 'Пользователь'}
                </Typography>
                <ChevronRight sx={{ fontSize: 16 }} />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                PaperProps={{
                  sx: {
                    mt: 1,
                    minWidth: 200,
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                    border: '1px solid #e0e0e0',
                  },
                }}
              >
                <MenuItem onClick={() => { navigate('/profile'); handleClose(); }}>
                  Профиль
                </MenuItem>
                <MenuItem onClick={() => { navigate('/settings'); handleClose(); }}>
                  Настройки
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleLogout} sx={{ color: '#dc004e' }}>
                  Выйти
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Button
              onClick={() => navigate('/login')}
              startIcon={<AccountCircle />}
              endIcon={<ChevronRight />}
              sx={{
                color: '#2c2c2c',
                textTransform: 'none',
                px: 2,
                py: 1,
                borderRadius: 1,
                '&:hover': {
                  backgroundColor: '#f5f5f5',
                },
              }}
            >
              Войти
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;