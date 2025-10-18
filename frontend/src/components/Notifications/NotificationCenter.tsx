import React, { useState } from 'react';
import {
    Box,
    IconButton,
    Badge,
    Menu,
    Typography,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Divider,
    Chip,
    Button,
} from '@mui/material';
import {
    Notifications,
    NotificationsActive,
    CheckCircle,
    Warning,
    Error,
    Info,
    MarkEmailRead,
} from '@mui/icons-material';

interface Notification {
    id: string;
    type: 'info' | 'success' | 'warning' | 'error';
    title: string;
    message: string;
    timestamp: Date;
    read: boolean;
    action?: {
        label: string;
        onClick: () => void;
    };
}

interface NotificationCenterProps {
    notifications?: Notification[];
    onMarkAsRead?: (id: string) => void;
    onMarkAllAsRead?: () => void;
    onClearAll?: () => void;
}

const NotificationCenter: React.FC<NotificationCenterProps> = ({
    notifications = [],
    onMarkAsRead = () => { },
    onMarkAllAsRead = () => { },
    onClearAll = () => { },
}) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const unreadCount = notifications.filter(n => !n.read).length;

    const getNotificationIcon = (type: string) => {
        switch (type) {
            case 'success':
                return <CheckCircle color="success" />;
            case 'warning':
                return <Warning color="warning" />;
            case 'error':
                return <Error color="error" />;
            default:
                return <Info color="info" />;
        }
    };

    const getNotificationColor = (type: string) => {
        switch (type) {
            case 'success':
                return 'success';
            case 'warning':
                return 'warning';
            case 'error':
                return 'error';
            default:
                return 'info';
        }
    };

    const formatTimestamp = (timestamp: Date) => {
        const now = new Date();
        const diff = now.getTime() - timestamp.getTime();
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);

        if (minutes < 1) return 'Только что';
        if (minutes < 60) return `${minutes} мин назад`;
        if (hours < 24) return `${hours} ч назад`;
        return `${days} дн назад`;
    };

    return (
        <Box>
            <IconButton
                color="inherit"
                onClick={handleClick}
                aria-label="уведомления"
            >
                <Badge badgeContent={unreadCount} color="error">
                    {unreadCount > 0 ? <NotificationsActive /> : <Notifications />}
                </Badge>
            </IconButton>

            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    sx: { width: 400, maxHeight: 600 }
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="h6">Уведомления</Typography>
                        {unreadCount > 0 && (
                            <Chip
                                label={unreadCount}
                                color="error"
                                size="small"
                            />
                        )}
                    </Box>
                    {notifications.length > 0 && (
                        <Box sx={{ mt: 1, display: 'flex', gap: 1 }}>
                            <Button
                                size="small"
                                startIcon={<MarkEmailRead />}
                                onClick={() => {
                                    onMarkAllAsRead();
                                    handleClose();
                                }}
                            >
                                Прочитать все
                            </Button>
                            <Button
                                size="small"
                                color="error"
                                onClick={() => {
                                    onClearAll();
                                    handleClose();
                                }}
                            >
                                Очистить
                            </Button>
                        </Box>
                    )}
                </Box>

                {notifications.length === 0 ? (
                    <Box sx={{ p: 3, textAlign: 'center' }}>
                        <Notifications sx={{ fontSize: 48, color: 'text.secondary', mb: 1 }} />
                        <Typography variant="body2" color="text.secondary">
                            Нет уведомлений
                        </Typography>
                    </Box>
                ) : (
                    <List sx={{ p: 0, maxHeight: 400, overflow: 'auto' }}>
                        {notifications.map((notification, index) => (
                            <React.Fragment key={notification.id}>
                                <ListItem
                                    sx={{
                                        bgcolor: notification.read ? 'transparent' : 'action.hover',
                                        cursor: 'pointer',
                                        '&:hover': {
                                            bgcolor: 'action.selected',
                                        },
                                    }}
                                    onClick={() => {
                                        if (!notification.read) {
                                            onMarkAsRead(notification.id);
                                        }
                                        if (notification.action) {
                                            notification.action.onClick();
                                        }
                                        handleClose();
                                    }}
                                >
                                    <ListItemIcon>
                                        {getNotificationIcon(notification.type)}
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <Typography
                                                    variant="body2"
                                                    fontWeight={notification.read ? 'normal' : 'bold'}
                                                >
                                                    {notification.title}
                                                </Typography>
                                                {!notification.read && (
                                                    <Box
                                                        sx={{
                                                            width: 8,
                                                            height: 8,
                                                            borderRadius: '50%',
                                                            bgcolor: `${getNotificationColor(notification.type)}.main`,
                                                        }}
                                                    />
                                                )}
                                            </Box>
                                        }
                                        secondary={
                                            <Box>
                                                <Typography
                                                    variant="body2"
                                                    color="text.secondary"
                                                    sx={{ mb: 0.5 }}
                                                >
                                                    {notification.message}
                                                </Typography>
                                                <Typography variant="caption" color="text.secondary">
                                                    {formatTimestamp(notification.timestamp)}
                                                </Typography>
                                            </Box>
                                        }
                                    />
                                </ListItem>
                                {index < notifications.length - 1 && <Divider />}
                            </React.Fragment>
                        ))}
                    </List>
                )}
            </Menu>
        </Box>
    );
};

export default NotificationCenter;
