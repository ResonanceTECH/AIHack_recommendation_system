import React, { useState } from 'react';
import {
    Card,
    CardContent,
    Typography,
    Box,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Grid,
    Chip,
    IconButton,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    Divider,
} from '@mui/material';
import {
    Add,
    CalendarToday,
    Edit,
    Delete,
    CheckCircle,
    Schedule,
    Warning,
    LocalHospital,
} from '@mui/icons-material';

interface ControlVisit {
    id: string;
    date: string;
    type: 'routine' | 'urgent' | 'follow_up' | 'emergency';
    doctor: string;
    purpose: string;
    findings: string;
    recommendations: string;
    nextVisit?: string;
    status: 'scheduled' | 'completed' | 'cancelled' | 'rescheduled';
}

interface ControlVisitsProps {
    visits: ControlVisit[];
    onAddVisit: (visit: Omit<ControlVisit, 'id'>) => void;
    onUpdateVisit: (id: string, visit: Partial<ControlVisit>) => void;
    onDeleteVisit: (id: string) => void;
}

const ControlVisits: React.FC<ControlVisitsProps> = ({
    visits,
    onAddVisit,
    onUpdateVisit,
    onDeleteVisit,
}) => {
    const [open, setOpen] = useState(false);
    const [editingVisit, setEditingVisit] = useState<ControlVisit | null>(null);
    const [formData, setFormData] = useState({
        date: new Date().toISOString().split('T')[0],
        type: 'routine' as 'routine' | 'urgent' | 'follow_up' | 'emergency',
        doctor: '',
        purpose: '',
        findings: '',
        recommendations: '',
        nextVisit: '',
        status: 'scheduled' as 'scheduled' | 'completed' | 'cancelled' | 'rescheduled',
    });

    const handleOpen = () => {
        setEditingVisit(null);
        setFormData({
            date: new Date().toISOString().split('T')[0],
            type: 'routine',
            doctor: '',
            purpose: '',
            findings: '',
            recommendations: '',
            nextVisit: '',
            status: 'scheduled',
        });
        setOpen(true);
    };

    const handleEdit = (visit: ControlVisit) => {
        setEditingVisit(visit);
        setFormData({
            date: visit.date,
            type: visit.type,
            doctor: visit.doctor,
            purpose: visit.purpose,
            findings: visit.findings,
            recommendations: visit.recommendations,
            nextVisit: visit.nextVisit || '',
            status: visit.status,
        });
        setOpen(true);
    };

    const handleSubmit = () => {
        if (editingVisit) {
            onUpdateVisit(editingVisit.id, formData);
        } else {
            onAddVisit(formData);
        }
        setOpen(false);
    };


    const getTypeLabel = (type: string) => {
        switch (type) {
            case 'routine':
                return 'Плановый';
            case 'urgent':
                return 'Срочный';
            case 'follow_up':
                return 'Контрольный';
            case 'emergency':
                return 'Экстренный';
            default:
                return type;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'scheduled':
                return 'info';
            case 'completed':
                return 'success';
            case 'cancelled':
                return 'error';
            case 'rescheduled':
                return 'warning';
            default:
                return 'default';
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'scheduled':
                return 'Запланирован';
            case 'completed':
                return 'Завершен';
            case 'cancelled':
                return 'Отменен';
            case 'rescheduled':
                return 'Перенесен';
            default:
                return status;
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'scheduled':
                return <Schedule />;
            case 'completed':
                return <CheckCircle />;
            case 'cancelled':
                return <Warning />;
            case 'rescheduled':
                return <Schedule />;
            default:
                return <CalendarToday />;
        }
    };

    const upcomingVisits = visits
        .filter(v => v.status === 'scheduled' && new Date(v.date) >= new Date())
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    const completedVisits = visits
        .filter(v => v.status === 'completed')
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return (
        <Card>
            <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Typography variant="h6">
                        Контрольные визиты
                    </Typography>
                    <Button
                        variant="contained"
                        startIcon={<Add />}
                        onClick={handleOpen}
                        size="small"
                    >
                        Запланировать визит
                    </Button>
                </Box>

                {/* Предстоящие визиты */}
                {upcomingVisits.length > 0 && (
                    <Box sx={{ mb: 3 }}>
                        <Typography variant="subtitle1" gutterBottom color="primary">
                            Предстоящие визиты ({upcomingVisits.length})
                        </Typography>
                        <List>
                            {upcomingVisits.map((visit, index) => (
                                <React.Fragment key={visit.id}>
                                    <ListItem sx={{ bgcolor: 'primary.50', borderRadius: 2, mb: 1 }}>
                                        <ListItemText
                                            primary={
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                                    <CalendarToday sx={{ fontSize: 16 }} />
                                                    <Typography variant="body1" fontWeight="medium">
                                                        {new Date(visit.date).toLocaleDateString('ru-RU', {
                                                            weekday: 'long',
                                                            year: 'numeric',
                                                            month: 'long',
                                                            day: 'numeric',
                                                        })}
                                                    </Typography>
                                                    <Chip
                                                        icon={getStatusIcon(visit.status)}
                                                        label={getStatusLabel(visit.status)}
                                                        color={getStatusColor(visit.status) as any}
                                                        size="small"
                                                    />
                                                </Box>
                                            }
                                            secondary={
                                                <Box>
                                                    <Typography variant="body2" color="text.secondary">
                                                        <strong>Тип:</strong> {getTypeLabel(visit.type)} |
                                                        <strong> Врач:</strong> {visit.doctor}
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        <strong>Цель:</strong> {visit.purpose}
                                                    </Typography>
                                                </Box>
                                            }
                                        />
                                        <ListItemSecondaryAction>
                                            <IconButton size="small" onClick={() => handleEdit(visit)}>
                                                <Edit />
                                            </IconButton>
                                            <IconButton size="small" onClick={() => onDeleteVisit(visit.id)}>
                                                <Delete />
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                    {index < upcomingVisits.length - 1 && <Divider />}
                                </React.Fragment>
                            ))}
                        </List>
                    </Box>
                )}

                {/* Завершенные визиты */}
                {completedVisits.length > 0 && (
                    <Box>
                        <Typography variant="subtitle1" gutterBottom color="success">
                            Завершенные визиты ({completedVisits.length})
                        </Typography>
                        <List>
                            {completedVisits.slice(0, 5).map((visit, index) => (
                                <React.Fragment key={visit.id}>
                                    <ListItem sx={{ bgcolor: 'success.50', borderRadius: 2, mb: 1 }}>
                                        <ListItemText
                                            primary={
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                                    <CalendarToday sx={{ fontSize: 16 }} />
                                                    <Typography variant="body1" fontWeight="medium">
                                                        {new Date(visit.date).toLocaleDateString('ru-RU')}
                                                    </Typography>
                                                    <Chip
                                                        icon={getStatusIcon(visit.status)}
                                                        label={getStatusLabel(visit.status)}
                                                        color={getStatusColor(visit.status) as any}
                                                        size="small"
                                                    />
                                                </Box>
                                            }
                                            secondary={
                                                <Box>
                                                    <Typography variant="body2" color="text.secondary">
                                                        <strong>Тип:</strong> {getTypeLabel(visit.type)} |
                                                        <strong> Врач:</strong> {visit.doctor}
                                                    </Typography>
                                                    {visit.findings && (
                                                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                                            <strong>Результаты:</strong> {visit.findings}
                                                        </Typography>
                                                    )}
                                                    {visit.recommendations && (
                                                        <Typography variant="body2" color="text.secondary">
                                                            <strong>Рекомендации:</strong> {visit.recommendations}
                                                        </Typography>
                                                    )}
                                                </Box>
                                            }
                                        />
                                        <ListItemSecondaryAction>
                                            <IconButton size="small" onClick={() => handleEdit(visit)}>
                                                <Edit />
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                    {index < Math.min(completedVisits.length, 5) - 1 && <Divider />}
                                </React.Fragment>
                            ))}
                        </List>
                        {completedVisits.length > 5 && (
                            <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ mt: 2 }}>
                                Показано 5 из {completedVisits.length} завершенных визитов
                            </Typography>
                        )}
                    </Box>
                )}

                {visits.length === 0 && (
                    <Box textAlign="center" sx={{ py: 4 }}>
                        <LocalHospital sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                        <Typography variant="body1" color="text.secondary">
                            Контрольные визиты не запланированы
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                            Запланируйте визит для мониторинга состояния пациента
                        </Typography>
                        <Button variant="outlined" onClick={handleOpen}>
                            Запланировать визит
                        </Button>
                    </Box>
                )}

                {/* Диалог добавления/редактирования */}
                <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
                    <DialogTitle>
                        {editingVisit ? 'Редактировать визит' : 'Запланировать визит'}
                    </DialogTitle>
                    <DialogContent>
                        <Grid container spacing={2} sx={{ mt: 1 }}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Дата визита"
                                    type="date"
                                    value={formData.date}
                                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                    InputLabelProps={{ shrink: true }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <InputLabel>Тип визита</InputLabel>
                                    <Select
                                        value={formData.type}
                                        onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                                    >
                                        <MenuItem value="routine">Плановый</MenuItem>
                                        <MenuItem value="urgent">Срочный</MenuItem>
                                        <MenuItem value="follow_up">Контрольный</MenuItem>
                                        <MenuItem value="emergency">Экстренный</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Врач"
                                    value={formData.doctor}
                                    onChange={(e) => setFormData({ ...formData, doctor: e.target.value })}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <InputLabel>Статус</InputLabel>
                                    <Select
                                        value={formData.status}
                                        onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                                    >
                                        <MenuItem value="scheduled">Запланирован</MenuItem>
                                        <MenuItem value="completed">Завершен</MenuItem>
                                        <MenuItem value="cancelled">Отменен</MenuItem>
                                        <MenuItem value="rescheduled">Перенесен</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Цель визита"
                                    multiline
                                    rows={2}
                                    value={formData.purpose}
                                    onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Результаты осмотра"
                                    multiline
                                    rows={3}
                                    value={formData.findings}
                                    onChange={(e) => setFormData({ ...formData, findings: e.target.value })}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Рекомендации"
                                    multiline
                                    rows={3}
                                    value={formData.recommendations}
                                    onChange={(e) => setFormData({ ...formData, recommendations: e.target.value })}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Следующий визит"
                                    type="date"
                                    value={formData.nextVisit}
                                    onChange={(e) => setFormData({ ...formData, nextVisit: e.target.value })}
                                    InputLabelProps={{ shrink: true }}
                                />
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpen(false)}>Отмена</Button>
                        <Button onClick={handleSubmit} variant="contained">
                            {editingVisit ? 'Сохранить' : 'Запланировать'}
                        </Button>
                    </DialogActions>
                </Dialog>
            </CardContent>
        </Card>
    );
};

export default ControlVisits;
