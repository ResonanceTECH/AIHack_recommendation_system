import React from 'react';
import {
    Card,
    CardContent,
    Typography,
    Box,
    LinearProgress,
    Chip,
    Grid,
} from '@mui/material';
import {
    CheckCircle,
    Warning,
    Error,
    Info,
    CalendarToday,
    TrendingUp,
} from '@mui/icons-material';

interface ComplianceData {
    overall: number;
    lastWeek: number;
    lastMonth: number;
    missedDoses: number;
    adherenceLevel: 'excellent' | 'good' | 'fair' | 'poor';
    lastCheck: string;
    notes: string[];
}

interface ComplianceTrackerProps {
    complianceData: ComplianceData;
    onUpdateCompliance: (data: Partial<ComplianceData>) => void;
}

const ComplianceTracker: React.FC<ComplianceTrackerProps> = ({
    complianceData,
}) => {
    const getAdherenceColor = (level: string) => {
        switch (level) {
            case 'excellent':
                return 'success';
            case 'good':
                return 'primary';
            case 'fair':
                return 'warning';
            case 'poor':
                return 'error';
            default:
                return 'default';
        }
    };

    const getAdherenceIcon = (level: string) => {
        switch (level) {
            case 'excellent':
                return <CheckCircle />;
            case 'good':
                return <CheckCircle />;
            case 'fair':
                return <Warning />;
            case 'poor':
                return <Error />;
            default:
                return <Info />;
        }
    };

    const getProgressColor = (percentage: number) => {
        if (percentage >= 90) return 'success';
        if (percentage >= 70) return 'primary';
        if (percentage >= 50) return 'warning';
        return 'error';
    };

    return (
        <Card>
            <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Typography variant="h6">
                        Соблюдение режима лечения
                    </Typography>
                    <Chip
                        icon={getAdherenceIcon(complianceData.adherenceLevel)}
                        label={complianceData.adherenceLevel.toUpperCase()}
                        color={getAdherenceColor(complianceData.adherenceLevel) as any}
                        size="small"
                    />
                </Box>

                <Grid container spacing={3}>
                    {/* Общий показатель соблюдения */}
                    <Grid item xs={12} md={6}>
                        <Box sx={{ mb: 3 }}>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                Общее соблюдение режима
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Box sx={{ flexGrow: 1 }}>
                                    <LinearProgress
                                        variant="determinate"
                                        value={complianceData.overall}
                                        color={getProgressColor(complianceData.overall) as any}
                                        sx={{ height: 8, borderRadius: 4 }}
                                    />
                                </Box>
                                <Typography variant="h6" fontWeight="bold">
                                    {complianceData.overall}%
                                </Typography>
                            </Box>
                        </Box>

                        {/* Показатели за периоды */}
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
                                    <Typography variant="h6" color="primary">
                                        {complianceData.lastWeek}%
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        За неделю
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={6}>
                                <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
                                    <Typography variant="h6" color="primary">
                                        {complianceData.lastMonth}%
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        За месяц
                                    </Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>

                    {/* Статистика пропусков */}
                    <Grid item xs={12} md={6}>
                        <Box sx={{ mb: 3 }}>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                Пропущенные дозы
                            </Typography>
                            <Typography variant="h4" color="error" gutterBottom>
                                {complianceData.missedDoses}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                за последний месяц
                            </Typography>
                        </Box>

                        {/* Последняя проверка */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                            <CalendarToday sx={{ fontSize: 16, color: 'text.secondary' }} />
                            <Typography variant="body2" color="text.secondary">
                                Последняя проверка: {new Date(complianceData.lastCheck).toLocaleDateString('ru-RU')}
                            </Typography>
                        </Box>

                        {/* Тренд */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <TrendingUp sx={{ fontSize: 16, color: 'success.main' }} />
                            <Typography variant="body2" color="success.main">
                                Улучшение на 5% за неделю
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>

                {/* Заметки о соблюдении */}
                {complianceData.notes.length > 0 && (
                    <Box sx={{ mt: 3 }}>
                        <Typography variant="subtitle2" gutterBottom>
                            Заметки о соблюдении режима:
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                            {complianceData.notes.map((note, index) => (
                                <Chip
                                    key={index}
                                    label={note}
                                    size="small"
                                    variant="outlined"
                                    color="primary"
                                />
                            ))}
                        </Box>
                    </Box>
                )}
            </CardContent>
        </Card>
    );
};

export default ComplianceTracker;
