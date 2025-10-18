import React from 'react';
import {
    Box,
    Typography,
    Grid,
    Card,
    CardContent,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
} from '@mui/material';
import {
    LocalHospital,
    Psychology,
    Speed,
    Security,
    CheckCircle,
    TrendingUp,
    Assignment,
    Analytics,
} from '@mui/icons-material';

const ServiceFeatures: React.FC = () => {
    const features = [
        {
            icon: <LocalHospital sx={{ fontSize: 32, color: '#1976d2' }} />,
            title: 'ИИ-рекомендации',
            description: 'Персонализированные рекомендации медикаментов на основе клинических данных',
        },
        {
            icon: <Psychology sx={{ fontSize: 32, color: '#1976d2' }} />,
            title: 'Умный анализ',
            description: 'Анализ взаимодействий препаратов и противопоказаний',
        },
        {
            icon: <Speed sx={{ fontSize: 32, color: '#1976d2' }} />,
            title: 'Быстрое назначение',
            description: 'Создание назначений за несколько минут',
        },
        {
            icon: <Security sx={{ fontSize: 32, color: '#1976d2' }} />,
            title: 'Безопасность',
            description: 'Защита данных и соответствие медицинским стандартам',
        },
    ];

    const benefits = [
        'Снижение времени на анализ медицинских данных на 60%',
        'Повышение точности диагностики и назначений на 40%',
        'Автоматизация рутинных процессов и документооборота',
        'Соблюдение медицинских протоколов и стандартов',
        'Интеграция с существующими медицинскими системами',
        'Безопасное хранение и обработка персональных данных',
    ];

    return (
        <Box sx={{ py: 8 }}>
            <Typography
                variant="h2"
                component="h2"
                sx={{
                    fontFamily: 'CeraPro, Roboto, Arial, sans-serif',
                    fontWeight: 700,
                    color: '#2c2c2c',
                    textAlign: 'center',
                    mb: 6,
                }}
            >
                Возможности сервиса
            </Typography>

            <Grid container spacing={4} sx={{ mb: 8 }}>
                {features.map((feature, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                        <Card
                            sx={{
                                height: '100%',
                                textAlign: 'center',
                                p: 3,
                                border: '1px solid #e0e0e0',
                                borderRadius: 2,
                                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                                transition: 'all 0.2s ease',
                                '&:hover': {
                                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                                    transform: 'translateY(-2px)',
                                },
                            }}
                        >
                            <CardContent sx={{ p: 0 }}>
                                <Box sx={{ mb: 2 }}>
                                    {feature.icon}
                                </Box>
                                <Typography
                                    variant="h6"
                                    component="h3"
                                    sx={{
                                        fontFamily: 'CeraPro, Roboto, Arial, sans-serif',
                                        fontWeight: 700,
                                        color: '#2c2c2c',
                                        mb: 1,
                                    }}
                                >
                                    {feature.title}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: '#666666',
                                        lineHeight: 1.6,
                                    }}
                                >
                                    {feature.description}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Grid container spacing={6} alignItems="center">
                <Grid item xs={12} md={6}>
                    <Typography
                        variant="h3"
                        component="h3"
                        sx={{
                            fontFamily: 'CeraPro, Roboto, Arial, sans-serif',
                            fontWeight: 700,
                            color: '#2c2c2c',
                            mb: 3,
                        }}
                    >
                        Преимущества для врачей
                    </Typography>
                    <Typography
                        variant="h6"
                        sx={{
                            color: '#666666',
                            mb: 4,
                            lineHeight: 1.6,
                        }}
                    >
                        MedAI помогает врачам принимать более точные и обоснованные решения
                    </Typography>
                    <List sx={{ pl: 0 }}>
                        {benefits.map((benefit, index) => (
                            <ListItem key={index} sx={{ px: 0, py: 1 }}>
                                <ListItemIcon sx={{ minWidth: 40 }}>
                                    <CheckCircle sx={{ color: '#1976d2' }} />
                                </ListItemIcon>
                                <ListItemText
                                    primary={benefit}
                                    primaryTypographyProps={{
                                        sx: { color: '#2c2c2c', lineHeight: 1.6 }
                                    }}
                                />
                            </ListItem>
                        ))}
                    </List>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box
                        sx={{
                            backgroundColor: '#f5f5f5',
                            borderRadius: 2,
                            p: 4,
                            textAlign: 'center',
                        }}
                    >
                        <TrendingUp sx={{ fontSize: 64, color: '#1976d2', mb: 2 }} />
                        <Typography
                            variant="h4"
                            component="h4"
                            sx={{
                                fontFamily: 'CeraPro, Roboto, Arial, sans-serif',
                                fontWeight: 700,
                                color: '#2c2c2c',
                                mb: 2,
                            }}
                        >
                            Статистика эффективности
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                color: '#666666',
                                mb: 3,
                                lineHeight: 1.6,
                            }}
                        >
                            Более 500 врачей уже используют MedAI для улучшения качества медицинской помощи
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4, flexWrap: 'wrap' }}>
                            <Box sx={{ textAlign: 'center' }}>
                                <Typography
                                    variant="h3"
                                    sx={{
                                        fontFamily: 'CeraPro, Roboto, Arial, sans-serif',
                                        fontWeight: 700,
                                        color: '#1976d2',
                                    }}
                                >
                                    95%
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#666666' }}>
                                    Точность рекомендаций
                                </Typography>
                            </Box>
                            <Box sx={{ textAlign: 'center' }}>
                                <Typography
                                    variant="h3"
                                    sx={{
                                        fontFamily: 'CeraPro, Roboto, Arial, sans-serif',
                                        fontWeight: 700,
                                        color: '#1976d2',
                                    }}
                                >
                                    60%
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#666666' }}>
                                    Экономия времени
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default ServiceFeatures;
