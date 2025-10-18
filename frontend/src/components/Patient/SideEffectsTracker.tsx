import React, { useState } from 'react';
import {
    Card,
    CardContent,
    Typography,
    Box,
    Chip,
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
    IconButton,
} from '@mui/material';
import {
    Add,
    Warning,
    Error,
    Info,
    Edit,
    Delete,
    LocalHospital,
} from '@mui/icons-material';

interface SideEffect {
    id: string;
    medication: string;
    effect: string;
    severity: 'mild' | 'moderate' | 'severe';
    date: string;
    duration: string;
    status: 'active' | 'resolved' | 'monitoring';
    notes: string;
}

interface SideEffectsTrackerProps {
    sideEffects: SideEffect[];
    onAddSideEffect: (sideEffect: Omit<SideEffect, 'id'>) => void;
    onUpdateSideEffect: (id: string, sideEffect: Partial<SideEffect>) => void;
    onDeleteSideEffect: (id: string) => void;
}

const SideEffectsTracker: React.FC<SideEffectsTrackerProps> = ({
    sideEffects,
    onAddSideEffect,
    onUpdateSideEffect,
    onDeleteSideEffect,
}) => {
    const [open, setOpen] = useState(false);
    const [editingEffect, setEditingEffect] = useState<SideEffect | null>(null);
    const [formData, setFormData] = useState({
        medication: '',
        effect: '',
        severity: 'mild' as 'mild' | 'moderate' | 'severe',
        date: new Date().toISOString().split('T')[0],
        duration: '',
        status: 'active' as 'active' | 'monitoring' | 'resolved',
        notes: '',
    });

    const handleOpen = () => {
        setEditingEffect(null);
        setFormData({
            medication: '',
            effect: '',
            severity: 'mild',
            date: new Date().toISOString().split('T')[0],
            duration: '',
            status: 'active',
            notes: '',
        });
        setOpen(true);
    };

    const handleEdit = (sideEffect: SideEffect) => {
        setEditingEffect(sideEffect);
        setFormData({
            medication: sideEffect.medication,
            effect: sideEffect.effect,
            severity: sideEffect.severity,
            date: sideEffect.date,
            duration: sideEffect.duration,
            status: sideEffect.status,
            notes: sideEffect.notes,
        });
        setOpen(true);
    };

    const handleSubmit = () => {
        if (editingEffect) {
            onUpdateSideEffect(editingEffect.id, formData);
        } else {
            onAddSideEffect(formData);
        }
        setOpen(false);
    };

    const getSeverityColor = (severity: string) => {
        switch (severity) {
            case 'mild':
                return 'info';
            case 'moderate':
                return 'warning';
            case 'severe':
                return 'error';
            default:
                return 'default';
        }
    };

    const getSeverityIcon = (severity: string) => {
        switch (severity) {
            case 'mild':
                return <Info />;
            case 'moderate':
                return <Warning />;
            case 'severe':
                return <Error />;
            default:
                return <Info />;
        }
    };


    const activeSideEffects = sideEffects.filter(e => e.status === 'active');
    const resolvedSideEffects = sideEffects.filter(e => e.status === 'resolved');

    return (
        <Card>
            <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Typography variant="h6">
                        Побочные эффекты
                    </Typography>
                    <Button
                        variant="contained"
                        startIcon={<Add />}
                        onClick={handleOpen}
                        size="small"
                    >
                        Добавить
                    </Button>
                </Box>

                {/* Активные побочные эффекты */}
                {activeSideEffects.length > 0 && (
                    <Box sx={{ mb: 3 }}>
                        <Typography variant="subtitle1" gutterBottom color="error">
                            Активные побочные эффекты ({activeSideEffects.length})
                        </Typography>
                        {activeSideEffects.map((sideEffect) => (
                            <Box key={sideEffect.id} sx={{ mb: 2, p: 2, bgcolor: 'error.50', borderRadius: 2 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                                    <Box>
                                        <Typography variant="body1" fontWeight="medium">
                                            {sideEffect.medication}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {sideEffect.effect}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', gap: 1 }}>
                                        <Chip
                                            icon={getSeverityIcon(sideEffect.severity)}
                                            label={sideEffect.severity}
                                            color={getSeverityColor(sideEffect.severity) as any}
                                            size="small"
                                        />
                                        <IconButton size="small" onClick={() => handleEdit(sideEffect)}>
                                            <Edit />
                                        </IconButton>
                                        <IconButton size="small" onClick={() => onDeleteSideEffect(sideEffect.id)}>
                                            <Delete />
                                        </IconButton>
                                    </Box>
                                </Box>
                                <Typography variant="caption" color="text.secondary">
                                    Начало: {new Date(sideEffect.date).toLocaleDateString('ru-RU')} |
                                    Длительность: {sideEffect.duration}
                                </Typography>
                                {sideEffect.notes && (
                                    <Typography variant="body2" sx={{ mt: 1 }}>
                                        {sideEffect.notes}
                                    </Typography>
                                )}
                            </Box>
                        ))}
                    </Box>
                )}

                {/* Решенные побочные эффекты */}
                {resolvedSideEffects.length > 0 && (
                    <Box>
                        <Typography variant="subtitle1" gutterBottom color="success">
                            Решенные побочные эффекты ({resolvedSideEffects.length})
                        </Typography>
                        {resolvedSideEffects.map((sideEffect) => (
                            <Box key={sideEffect.id} sx={{ mb: 2, p: 2, bgcolor: 'success.50', borderRadius: 2 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                                    <Box>
                                        <Typography variant="body1" fontWeight="medium">
                                            {sideEffect.medication}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {sideEffect.effect}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', gap: 1 }}>
                                        <Chip
                                            icon={getSeverityIcon(sideEffect.severity)}
                                            label={sideEffect.severity}
                                            color={getSeverityColor(sideEffect.severity) as any}
                                            size="small"
                                        />
                                        <Chip
                                            label="Решено"
                                            color="success"
                                            size="small"
                                        />
                                    </Box>
                                </Box>
                                <Typography variant="caption" color="text.secondary">
                                    Начало: {new Date(sideEffect.date).toLocaleDateString('ru-RU')} |
                                    Длительность: {sideEffect.duration}
                                </Typography>
                                {sideEffect.notes && (
                                    <Typography variant="body2" sx={{ mt: 1 }}>
                                        {sideEffect.notes}
                                    </Typography>
                                )}
                            </Box>
                        ))}
                    </Box>
                )}

                {sideEffects.length === 0 && (
                    <Box textAlign="center" sx={{ py: 4 }}>
                        <LocalHospital sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                        <Typography variant="body1" color="text.secondary">
                            Побочные эффекты не зарегистрированы
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                            Добавьте информацию о побочных эффектах, если они возникают
                        </Typography>
                        <Button variant="outlined" onClick={handleOpen}>
                            Добавить побочный эффект
                        </Button>
                    </Box>
                )}

                {/* Диалог добавления/редактирования */}
                <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
                    <DialogTitle>
                        {editingEffect ? 'Редактировать побочный эффект' : 'Добавить побочный эффект'}
                    </DialogTitle>
                    <DialogContent>
                        <Grid container spacing={2} sx={{ mt: 1 }}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Препарат"
                                    value={formData.medication}
                                    onChange={(e) => setFormData({ ...formData, medication: e.target.value })}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <InputLabel>Серьезность</InputLabel>
                                    <Select
                                        value={formData.severity}
                                        onChange={(e) => setFormData({ ...formData, severity: e.target.value as any })}
                                    >
                                        <MenuItem value="mild">Легкая</MenuItem>
                                        <MenuItem value="moderate">Умеренная</MenuItem>
                                        <MenuItem value="severe">Тяжелая</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Описание побочного эффекта"
                                    multiline
                                    rows={2}
                                    value={formData.effect}
                                    onChange={(e) => setFormData({ ...formData, effect: e.target.value })}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Дата начала"
                                    type="date"
                                    value={formData.date}
                                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                    InputLabelProps={{ shrink: true }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Длительность"
                                    value={formData.duration}
                                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                                    placeholder="например: 3 дня"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <InputLabel>Статус</InputLabel>
                                    <Select
                                        value={formData.status}
                                        onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                                    >
                                        <MenuItem value="active">Активный</MenuItem>
                                        <MenuItem value="monitoring">Наблюдение</MenuItem>
                                        <MenuItem value="resolved">Решен</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Дополнительные заметки"
                                    multiline
                                    rows={3}
                                    value={formData.notes}
                                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                />
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpen(false)}>Отмена</Button>
                        <Button onClick={handleSubmit} variant="contained">
                            {editingEffect ? 'Сохранить' : 'Добавить'}
                        </Button>
                    </DialogActions>
                </Dialog>
            </CardContent>
        </Card>
    );
};

export default SideEffectsTracker;
