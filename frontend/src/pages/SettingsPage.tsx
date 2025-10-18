import React, { useState } from 'react';
import {
    Container,
    Typography,
    Box,
    Card,
    CardContent,
    Tabs,
    Tab,
    Paper,
    Grid,
    TextField,
    Button,
    Switch,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Divider,
    Alert,
    Snackbar,
} from '@mui/material';
import {
    Person,
    Notifications,
    Settings,
    Security,
    Save,
    Edit,
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/Layout/Header';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`settings-tabpanel-${index}`}
            aria-labelledby={`settings-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

const SettingsPage: React.FC = () => {
    const { user, updateUser } = useAuth();
    const [tabValue, setTabValue] = useState(0);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    // Личная информация
    const [personalInfo, setPersonalInfo] = useState({
        full_name: user?.full_name || '',
        specialty: user?.specialty || '',
        workplace: user?.workplace || '',
        phone: user?.phone || '',
        email: user?.email || '',
    });

    // Настройки уведомлений
    const [notificationSettings, setNotificationSettings] = useState({
        emailNotifications: true,
        pushNotifications: true,
        appointmentReminders: true,
        prescriptionUpdates: true,
        systemAlerts: true,
        marketingEmails: false,
    });

    // Настройки системы
    const [systemSettings, setSystemSettings] = useState({
        language: 'ru',
        timezone: 'Europe/Moscow',
        dateFormat: 'DD.MM.YYYY',
        timeFormat: '24h',
        theme: 'light',
    });

    // Безопасность
    const [securitySettings, setSecuritySettings] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
        twoFactorAuth: false,
        sessionTimeout: 30,
    });

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    const handleSavePersonalInfo = () => {
        // Здесь будет API вызов для обновления профиля
        updateUser(personalInfo);
        setSnackbarMessage('Личная информация сохранена');
        setSnackbarOpen(true);
    };

    const handleSaveNotificationSettings = () => {
        // Здесь будет API вызов для сохранения настроек уведомлений
        setSnackbarMessage('Настройки уведомлений сохранены');
        setSnackbarOpen(true);
    };

    const handleSaveSystemSettings = () => {
        // Здесь будет API вызов для сохранения системных настроек
        setSnackbarMessage('Системные настройки сохранены');
        setSnackbarOpen(true);
    };

    const handleChangePassword = () => {
        if (securitySettings.newPassword !== securitySettings.confirmPassword) {
            setSnackbarMessage('Пароли не совпадают');
            setSnackbarOpen(true);
            return;
        }
        if (securitySettings.newPassword.length < 6) {
            setSnackbarMessage('Пароль должен содержать минимум 6 символов');
            setSnackbarOpen(true);
            return;
        }
        // Здесь будет API вызов для смены пароля
        setSnackbarMessage('Пароль успешно изменен');
        setSnackbarOpen(true);
        setSecuritySettings({
            ...securitySettings,
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
        });
    };

    return (
        <Box>
            <Header />
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Настройки профиля
                </Typography>

                <Paper sx={{ width: '100%' }}>
                    <Tabs
                        value={tabValue}
                        onChange={handleTabChange}
                        aria-label="settings tabs"
                        variant="scrollable"
                        scrollButtons="auto"
                    >
                        <Tab
                            icon={<Person />}
                            label="Личная информация"
                            id="settings-tab-0"
                            aria-controls="settings-tabpanel-0"
                        />
                        <Tab
                            icon={<Notifications />}
                            label="Уведомления"
                            id="settings-tab-1"
                            aria-controls="settings-tabpanel-1"
                        />
                        <Tab
                            icon={<Settings />}
                            label="Система"
                            id="settings-tab-2"
                            aria-controls="settings-tabpanel-2"
                        />
                        <Tab
                            icon={<Security />}
                            label="Безопасность"
                            id="settings-tab-3"
                            aria-controls="settings-tabpanel-3"
                        />
                    </Tabs>

                    {/* Личная информация */}
                    <TabPanel value={tabValue} index={0}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    Личная информация
                                </Typography>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="ФИО"
                                            value={personalInfo.full_name}
                                            onChange={(e) => setPersonalInfo({ ...personalInfo, full_name: e.target.value })}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Специальность"
                                            value={personalInfo.specialty}
                                            onChange={(e) => setPersonalInfo({ ...personalInfo, specialty: e.target.value })}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Место работы"
                                            value={personalInfo.workplace}
                                            onChange={(e) => setPersonalInfo({ ...personalInfo, workplace: e.target.value })}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Телефон"
                                            value={personalInfo.phone}
                                            onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Email"
                                            type="email"
                                            value={personalInfo.email}
                                            onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                                        />
                                    </Grid>
                                </Grid>
                                <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                                    <Button
                                        variant="contained"
                                        startIcon={<Save />}
                                        onClick={handleSavePersonalInfo}
                                    >
                                        Сохранить
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        startIcon={<Edit />}
                                        onClick={() => {
                                            setPersonalInfo({
                                                full_name: user?.full_name || '',
                                                specialty: user?.specialty || '',
                                                workplace: user?.workplace || '',
                                                phone: user?.phone || '',
                                                email: user?.email || '',
                                            });
                                        }}
                                    >
                                        Сбросить
                                    </Button>
                                </Box>
                            </CardContent>
                        </Card>
                    </TabPanel>

                    {/* Настройки уведомлений */}
                    <TabPanel value={tabValue} index={1}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    Настройки уведомлений
                                </Typography>
                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <Box>
                                                <Typography variant="body1">Email-уведомления</Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    Получать уведомления на email
                                                </Typography>
                                            </Box>
                                            <Switch
                                                checked={notificationSettings.emailNotifications}
                                                onChange={(e) => setNotificationSettings({
                                                    ...notificationSettings,
                                                    emailNotifications: e.target.checked
                                                })}
                                            />
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <Box>
                                                <Typography variant="body1">Push-уведомления</Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    Получать push-уведомления в браузере
                                                </Typography>
                                            </Box>
                                            <Switch
                                                checked={notificationSettings.pushNotifications}
                                                onChange={(e) => setNotificationSettings({
                                                    ...notificationSettings,
                                                    pushNotifications: e.target.checked
                                                })}
                                            />
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Divider />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant="subtitle1" gutterBottom>
                                            Типы уведомлений
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <Box>
                                                <Typography variant="body1">Напоминания о визитах</Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    Уведомления о предстоящих визитах пациентов
                                                </Typography>
                                            </Box>
                                            <Switch
                                                checked={notificationSettings.appointmentReminders}
                                                onChange={(e) => setNotificationSettings({
                                                    ...notificationSettings,
                                                    appointmentReminders: e.target.checked
                                                })}
                                            />
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <Box>
                                                <Typography variant="body1">Обновления назначений</Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    Уведомления об изменениях в назначениях
                                                </Typography>
                                            </Box>
                                            <Switch
                                                checked={notificationSettings.prescriptionUpdates}
                                                onChange={(e) => setNotificationSettings({
                                                    ...notificationSettings,
                                                    prescriptionUpdates: e.target.checked
                                                })}
                                            />
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <Box>
                                                <Typography variant="body1">Системные уведомления</Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    Важные системные сообщения и обновления
                                                </Typography>
                                            </Box>
                                            <Switch
                                                checked={notificationSettings.systemAlerts}
                                                onChange={(e) => setNotificationSettings({
                                                    ...notificationSettings,
                                                    systemAlerts: e.target.checked
                                                })}
                                            />
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <Box>
                                                <Typography variant="body1">Маркетинговые рассылки</Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    Новости о продукте и специальных предложениях
                                                </Typography>
                                            </Box>
                                            <Switch
                                                checked={notificationSettings.marketingEmails}
                                                onChange={(e) => setNotificationSettings({
                                                    ...notificationSettings,
                                                    marketingEmails: e.target.checked
                                                })}
                                            />
                                        </Box>
                                    </Grid>
                                </Grid>
                                <Box sx={{ mt: 3 }}>
                                    <Button
                                        variant="contained"
                                        startIcon={<Save />}
                                        onClick={handleSaveNotificationSettings}
                                    >
                                        Сохранить настройки
                                    </Button>
                                </Box>
                            </CardContent>
                        </Card>
                    </TabPanel>

                    {/* Настройки системы */}
                    <TabPanel value={tabValue} index={2}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    Системные настройки
                                </Typography>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth>
                                            <InputLabel>Язык интерфейса</InputLabel>
                                            <Select
                                                value={systemSettings.language}
                                                onChange={(e) => setSystemSettings({ ...systemSettings, language: e.target.value })}
                                            >
                                                <MenuItem value="ru">Русский</MenuItem>
                                                <MenuItem value="en">English</MenuItem>
                                                <MenuItem value="de">Deutsch</MenuItem>
                                                <MenuItem value="fr">Français</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth>
                                            <InputLabel>Часовой пояс</InputLabel>
                                            <Select
                                                value={systemSettings.timezone}
                                                onChange={(e) => setSystemSettings({ ...systemSettings, timezone: e.target.value })}
                                            >
                                                <MenuItem value="Europe/Moscow">Москва (UTC+3)</MenuItem>
                                                <MenuItem value="Europe/London">Лондон (UTC+0)</MenuItem>
                                                <MenuItem value="America/New_York">Нью-Йорк (UTC-5)</MenuItem>
                                                <MenuItem value="Asia/Tokyo">Токио (UTC+9)</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth>
                                            <InputLabel>Формат даты</InputLabel>
                                            <Select
                                                value={systemSettings.dateFormat}
                                                onChange={(e) => setSystemSettings({ ...systemSettings, dateFormat: e.target.value })}
                                            >
                                                <MenuItem value="DD.MM.YYYY">ДД.ММ.ГГГГ</MenuItem>
                                                <MenuItem value="MM/DD/YYYY">ММ/ДД/ГГГГ</MenuItem>
                                                <MenuItem value="YYYY-MM-DD">ГГГГ-ММ-ДД</MenuItem>
                                                <MenuItem value="DD/MM/YYYY">ДД/ММ/ГГГГ</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth>
                                            <InputLabel>Формат времени</InputLabel>
                                            <Select
                                                value={systemSettings.timeFormat}
                                                onChange={(e) => setSystemSettings({ ...systemSettings, timeFormat: e.target.value })}
                                            >
                                                <MenuItem value="24h">24-часовой</MenuItem>
                                                <MenuItem value="12h">12-часовой (AM/PM)</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth>
                                            <InputLabel>Тема оформления</InputLabel>
                                            <Select
                                                value={systemSettings.theme}
                                                onChange={(e) => setSystemSettings({ ...systemSettings, theme: e.target.value })}
                                            >
                                                <MenuItem value="light">Светлая</MenuItem>
                                                <MenuItem value="dark">Темная</MenuItem>
                                                <MenuItem value="auto">Автоматически</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                                <Box sx={{ mt: 3 }}>
                                    <Button
                                        variant="contained"
                                        startIcon={<Save />}
                                        onClick={handleSaveSystemSettings}
                                    >
                                        Сохранить настройки
                                    </Button>
                                </Box>
                            </CardContent>
                        </Card>
                    </TabPanel>

                    {/* Безопасность */}
                    <TabPanel value={tabValue} index={3}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    Безопасность
                                </Typography>
                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <Typography variant="subtitle1" gutterBottom>
                                            Смена пароля
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Текущий пароль"
                                            type="password"
                                            value={securitySettings.currentPassword}
                                            onChange={(e) => setSecuritySettings({ ...securitySettings, currentPassword: e.target.value })}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Новый пароль"
                                            type="password"
                                            value={securitySettings.newPassword}
                                            onChange={(e) => setSecuritySettings({ ...securitySettings, newPassword: e.target.value })}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Подтверждение пароля"
                                            type="password"
                                            value={securitySettings.confirmPassword}
                                            onChange={(e) => setSecuritySettings({ ...securitySettings, confirmPassword: e.target.value })}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Divider sx={{ my: 2 }} />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant="subtitle1" gutterBottom>
                                            Дополнительная безопасность
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <Box>
                                                <Typography variant="body1">Двухфакторная аутентификация</Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    Дополнительная защита аккаунта с помощью SMS или приложения
                                                </Typography>
                                            </Box>
                                            <Switch
                                                checked={securitySettings.twoFactorAuth}
                                                onChange={(e) => setSecuritySettings({ ...securitySettings, twoFactorAuth: e.target.checked })}
                                            />
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth>
                                            <InputLabel>Таймаут сессии (минуты)</InputLabel>
                                            <Select
                                                value={securitySettings.sessionTimeout}
                                                onChange={(e) => setSecuritySettings({ ...securitySettings, sessionTimeout: e.target.value as number })}
                                            >
                                                <MenuItem value={15}>15 минут</MenuItem>
                                                <MenuItem value={30}>30 минут</MenuItem>
                                                <MenuItem value={60}>1 час</MenuItem>
                                                <MenuItem value={120}>2 часа</MenuItem>
                                                <MenuItem value={480}>8 часов</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                                <Box sx={{ mt: 3 }}>
                                    <Button
                                        variant="contained"
                                        startIcon={<Security />}
                                        onClick={handleChangePassword}
                                    >
                                        Изменить пароль
                                    </Button>
                                </Box>
                            </CardContent>
                        </Card>
                    </TabPanel>
                </Paper>

                <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={6000}
                    onClose={() => setSnackbarOpen(false)}
                    message={snackbarMessage}
                />
            </Container>
        </Box>
    );
};

export default SettingsPage;
