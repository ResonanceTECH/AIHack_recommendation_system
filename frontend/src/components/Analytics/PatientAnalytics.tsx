import React, { useMemo } from 'react';
import {
    Grid,
    Card,
    CardContent,
    Typography,
    Box,
    List,
    ListItem,
    ListItemText,
    Chip,
    LinearProgress,
} from '@mui/material';
import {
    People,
    TrendingUp,
    LocalHospital,
    Warning,
    CheckCircle,
    Assessment,
} from '@mui/icons-material';
import { Patient } from '../../types/patient';
import { Prescription } from '../../types/prescription';

interface PatientAnalyticsProps {
    patients: Patient[];
    prescriptions: Prescription[];
}

const PatientAnalytics: React.FC<PatientAnalyticsProps> = ({ patients, prescriptions }) => {
    const analytics = useMemo(() => {
        // Статистика по возрасту
        const ageGroups = {
            '18-30': patients.filter(p => p.age >= 18 && p.age <= 30).length,
            '31-50': patients.filter(p => p.age >= 31 && p.age <= 50).length,
            '51-70': patients.filter(p => p.age >= 51 && p.age <= 70).length,
            '71+': patients.filter(p => p.age >= 71).length,
        };

        // Статистика по полу
        const genderStats = {
            male: patients.filter(p => p.gender === 'male').length,
            female: patients.filter(p => p.gender === 'female').length,
            other: patients.filter(p => p.gender === 'other').length,
        };

        // Топ диагнозов
        const diagnosisCounts = patients.reduce((acc, patient) => {
            if (patient.diagnosis) {
                acc[patient.diagnosis] = (acc[patient.diagnosis] || 0) + 1;
            }
            return acc;
        }, {} as Record<string, number>);

        const topDiagnoses = Object.entries(diagnosisCounts)
            .sort(([, a], [, b]) => (b as number) - (a as number))
            .slice(0, 5);

        // Статистика по сопутствующим заболеваниям
        const comorbidityCounts = patients.reduce((acc, patient) => {
            if (patient.comorbidities) {
                patient.comorbidities.forEach((comorbidity: string) => {
                    acc[comorbidity] = (acc[comorbidity] || 0) + 1;
                });
            }
            return acc;
        }, {} as Record<string, number>);

        const topComorbidities = Object.entries(comorbidityCounts)
            .sort(([, a], [, b]) => (b as number) - (a as number))
            .slice(0, 5);

        // Статистика по рецептам
        const prescriptionStats = {
            total: prescriptions.length,
            active: prescriptions.filter(p => p.status === 'active').length,
            completed: prescriptions.filter(p => p.status === 'completed').length,
            cancelled: prescriptions.filter(p => p.status === 'cancelled').length,
            draft: prescriptions.filter(p => p.status === 'draft').length,
        };

        // Топ препаратов
        const medicationCounts = prescriptions.reduce((acc, prescription) => {
            if (prescription.recommended_medications) {
                prescription.recommended_medications?.forEach((med: any) => {
                    acc[med.name] = (acc[med.name] || 0) + 1;
                });
            }
            return acc;
        }, {} as Record<string, number>);

        const topMedications = Object.entries(medicationCounts)
            .sort(([, a], [, b]) => (b as number) - (a as number))
            .slice(0, 5);

        // Статистика по аллергиям
        const allergyCounts = patients.reduce((acc, patient) => {
            if (patient.allergies) {
                patient.allergies?.forEach((allergy: any) => {
                    acc[allergy.allergen] = (acc[allergy.allergen] || 0) + 1;
                });
            }
            return acc;
        }, {} as Record<string, number>);

        const topAllergies = Object.entries(allergyCounts)
            .sort(([, a], [, b]) => (b as number) - (a as number))
            .slice(0, 5);

        // Средний возраст
        const averageAge = patients.length > 0
            ? Math.round(patients.reduce((sum, p) => sum + p.age, 0) / patients.length)
            : 0;

        // Процент пациентов с аллергиями
        const patientsWithAllergies = patients.filter(p => p.allergies && p.allergies.length > 0).length;
        const allergyPercentage = patients.length > 0
            ? Math.round((patientsWithAllergies / patients.length) * 100)
            : 0;

        return {
            ageGroups,
            genderStats,
            topDiagnoses,
            topComorbidities,
            prescriptionStats,
            topMedications,
            topAllergies,
            averageAge,
            allergyPercentage,
            totalPatients: patients.length,
        };
    }, [patients, prescriptions]);

    const StatCard = ({ title, value, icon, color = 'primary', subtitle }: {
        title: string;
        value: string | number;
        icon: React.ReactNode;
        color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
        subtitle?: string;
    }) => (
        <Card>
            <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Box sx={{ color: `${color}.main`, mr: 2 }}>
                        {icon}
                    </Box>
                    <Typography variant="h6" component="div">
                        {title}
                    </Typography>
                </Box>
                <Typography variant="h4" component="div" color={`${color}.main`} sx={{ fontWeight: 'bold' }}>
                    {value}
                </Typography>
                {subtitle && (
                    <Typography variant="body2" color="text.secondary">
                        {subtitle}
                    </Typography>
                )}
            </CardContent>
        </Card>
    );

    return (
        <Box>
            <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Assessment color="primary" />
                Аналитика по пациентам
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                Статистика и аналитика по базе пациентов и назначений
            </Typography>

            {/* Основные показатели */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard
                        title="Всего пациентов"
                        value={analytics.totalPatients}
                        icon={<People />}
                        color="primary"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard
                        title="Средний возраст"
                        value={`${analytics.averageAge} лет`}
                        icon={<TrendingUp />}
                        color="secondary"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard
                        title="С аллергиями"
                        value={`${analytics.allergyPercentage}%`}
                        icon={<Warning />}
                        color="warning"
                        subtitle={`${patients.filter(p => p.allergies && p.allergies.length > 0).length} пациентов`}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard
                        title="Активных назначений"
                        value={analytics.prescriptionStats.active}
                        icon={<CheckCircle />}
                        color="success"
                        subtitle={`из ${analytics.prescriptionStats.total} всего`}
                    />
                </Grid>
            </Grid>

            <Grid container spacing={3}>
                {/* Распределение по возрасту */}
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <TrendingUp color="primary" />
                                Распределение по возрасту
                            </Typography>
                            {Object.entries(analytics.ageGroups).map(([group, count]) => {
                                const percentage = analytics.totalPatients > 0
                                    ? Math.round((count / analytics.totalPatients) * 100)
                                    : 0;
                                return (
                                    <Box key={group} sx={{ mb: 2 }}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                            <Typography variant="body2">{group} лет</Typography>
                                            <Typography variant="body2" fontWeight="bold">
                                                {count} ({percentage}%)
                                            </Typography>
                                        </Box>
                                        <LinearProgress
                                            variant="determinate"
                                            value={percentage}
                                            sx={{ height: 8, borderRadius: 4 }}
                                        />
                                    </Box>
                                );
                            })}
                        </CardContent>
                    </Card>
                </Grid>

                {/* Распределение по полу */}
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <People color="primary" />
                                Распределение по полу
                            </Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <Chip label="Мужчины" color="primary" />
                                    <Typography variant="h6">{analytics.genderStats.male}</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <Chip label="Женщины" color="secondary" />
                                    <Typography variant="h6">{analytics.genderStats.female}</Typography>
                                </Box>
                                {analytics.genderStats.other > 0 && (
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <Chip label="Другой" color="default" />
                                        <Typography variant="h6">{analytics.genderStats.other}</Typography>
                                    </Box>
                                )}
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Топ диагнозов */}
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <LocalHospital color="primary" />
                                Топ диагнозов
                            </Typography>
                            <List dense>
                                {analytics.topDiagnoses.map(([diagnosis, count], index) => (
                                    <ListItem key={diagnosis} sx={{ px: 0 }}>
                                        <ListItemText
                                            primary={
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    <Chip label={index + 1} size="small" color="primary" />
                                                    <Typography variant="body2" sx={{ flexGrow: 1 }}>
                                                        {diagnosis}
                                                    </Typography>
                                                    <Typography variant="body2" fontWeight="bold">
                                                        {count as number}
                                                    </Typography>
                                                </Box>
                                            }
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Топ сопутствующих заболеваний */}
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Warning color="primary" />
                                Сопутствующие заболевания
                            </Typography>
                            <List dense>
                                {analytics.topComorbidities.map(([comorbidity, count], index) => (
                                    <ListItem key={comorbidity} sx={{ px: 0 }}>
                                        <ListItemText
                                            primary={
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    <Chip label={index + 1} size="small" color="warning" />
                                                    <Typography variant="body2" sx={{ flexGrow: 1 }}>
                                                        {comorbidity}
                                                    </Typography>
                                                    <Typography variant="body2" fontWeight="bold">
                                                        {count as number}
                                                    </Typography>
                                                </Box>
                                            }
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Статистика назначений */}
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <CheckCircle color="primary" />
                                Статистика назначений
                            </Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Typography variant="body2">Активные</Typography>
                                    <Chip label={analytics.prescriptionStats.active} color="success" />
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Typography variant="body2">Завершенные</Typography>
                                    <Chip label={analytics.prescriptionStats.completed} color="primary" />
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Typography variant="body2">Черновики</Typography>
                                    <Chip label={analytics.prescriptionStats.draft} color="default" />
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Typography variant="body2">Отмененные</Typography>
                                    <Chip label={analytics.prescriptionStats.cancelled} color="error" />
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Топ препаратов */}
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <LocalHospital color="primary" />
                                Топ препаратов
                            </Typography>
                            <List dense>
                                {analytics.topMedications.map(([medication, count], index) => (
                                    <ListItem key={medication} sx={{ px: 0 }}>
                                        <ListItemText
                                            primary={
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    <Chip label={index + 1} size="small" color="success" />
                                                    <Typography variant="body2" sx={{ flexGrow: 1 }}>
                                                        {medication}
                                                    </Typography>
                                                    <Typography variant="body2" fontWeight="bold">
                                                        {count as number}
                                                    </Typography>
                                                </Box>
                                            }
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default PatientAnalytics;
