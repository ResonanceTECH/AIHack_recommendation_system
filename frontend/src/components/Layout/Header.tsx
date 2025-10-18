import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  AccountCircle,
  ExitToApp,
  Dashboard,
  People,
  Assignment,
  Settings,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import NotificationCenter from '../Notifications/NotificationCenter';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  // Моковые уведомления
  const [notifications, setNotifications] = React.useState([
    {
      id: '1',
      type: 'info' as const,
      title: 'Новое назначение',
      message: 'Создано новое назначение для пациента Иванов И.И.',
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 минут назад
      read: false,
    },
    {
      id: '2',
      type: 'warning' as const,
      title: 'Требуется контроль МНО',
      message: 'Пациенту Петров П.П. необходимо проверить МНО',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 часа назад
      read: false,
    },
    {
      id: '3',
      type: 'success' as const,
      title: 'Назначение завершено',
      message: 'Курс лечения для Сидоров С.С. успешно завершен',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 день назад
      read: true,
    },
  ]);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    handleClose();
  };

  const handleMarkAsRead = (id: string) => {
    setNotifications(notifications.map(n =>
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const handleClearAll = () => {
    setNotifications([]);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, cursor: 'pointer' }}
          onClick={() => navigate('/')}
        >
          MedAI
        </Typography>

        {user && (
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              color="inherit"
              startIcon={<Dashboard />}
              onClick={() => navigate('/dashboard')}
            >
              Главная
            </Button>
            <Button
              color="inherit"
              startIcon={<People />}
              onClick={() => navigate('/patients')}
            >
              Пациенты
            </Button>
            <Button
              color="inherit"
              startIcon={<Assignment />}
              onClick={() => navigate('/prescriptions')}
            >
              Назначения
            </Button>

            <NotificationCenter
              notifications={notifications}
              onMarkAsRead={handleMarkAsRead}
              onMarkAllAsRead={handleMarkAllAsRead}
              onClearAll={handleClearAll}
            />

            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={() => { navigate('/settings'); handleClose(); }}>
                <Settings sx={{ mr: 1 }} />
                Настройки
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <ExitToApp sx={{ mr: 1 }} />
                Выйти
              </MenuItem>
            </Menu>
          </Box>
        )}

        {!user && (
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button color="inherit" onClick={() => navigate('/login')}>
              Вход
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => navigate('/register')}
            >
              Регистрация
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
