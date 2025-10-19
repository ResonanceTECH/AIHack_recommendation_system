import React, { useState } from 'react';
import {
    Card,
    CardContent,
    Typography,
    Box,
    Chip,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Grid,
    Alert,
    List,
    ListItem,
    ListItemText,
    Divider,
} from '@mui/material';
import {
    ExpandMore,
    Psychology,
} from '@mui/icons-material';
import { aiRecommendationExamples } from '../../services/mockData';

const AIRecommendationExamples: React.FC = () => {
    const [expandedExample, setExpandedExample] = useState<number | false>(false);

    const handleChange = (panel: number) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpandedExample(isExpanded ? panel : false);
    };

    const getGenderLabel = (gender: string) => {
        return gender === 'male' ? 'Мужчина' : 'Женщина';
    };

    const getEvidenceLevelColor = (level: string) => {
        switch (level) {
            case 'A': return 'success';
            case 'B': return 'primary';
            case 'C': return 'warning';
            case 'D': return 'error';
            default: return 'default';
        }
    };

    return (
        <Box>
            <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Psychology color="primary" />
                Примеры ИИ-рекомендаций
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Реальные сценарии рекомендаций системы на основе клинических данных пациентов
            </Typography>

            {aiRecommendationExamples.map((example) => (
                <Accordion
                    key={example.id}
                    expanded={expandedExample === example.id}
                    onChange={handleChange(example.id)}
                    sx={{ mb: 2 }}
                >
                    <AccordionSummary expandIcon={<ExpandMore />}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                            <Typography variant="h6" sx={{ flexGrow: 1 }}>
                                {example.title}
                            </Typography>
                            <Chip
                                label={`Уровень доказательности: ${example.recommendation.evidenceLevel}`}
                                color={getEvidenceLevelColor(example.recommendation.evidenceLevel) as any}
                                size="small"
                            />
                        </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container spacing={3}>
                            {/* Данные пациента */}
                            <Grid item xs={12} md={6}>
                                <Card variant="outlined">
                                    <CardContent>
                                        <Typography variant="h6" gutterBottom color="primary">
                                            Данные пациента
                                        </Typography>
                                        <List dense>
                                            <ListItem>
                                                <ListItemText
                                                    primary="Возраст и пол"
                                                    secondary={`${example.patientData.age} лет, ${getGenderLabel(example.patientData.gender)}`}
                                                />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemText
                                                    primary="Диагноз"
                                                    secondary={example.patientData.diagnosis}
                                                />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemText
                                                    primary="СКФ"
                                                    secondary={`${example.patientData.sgf} мл/мин/1.73м²`}
                                                />
                                            </ListItem>
                                            {example.patientData.currentMedications.length > 0 && (
                                                <ListItem>
                                                    <ListItemText
                                                        primary="Текущая терапия"
                                                        secondary={example.patientData.currentMedications.join(', ')}
                                                    />
                                                </ListItem>
                                            )}
                                            {example.patientData.previousAnticoagulants.length > 0 && (
                                                <ListItem>
                                                    <ListItemText
                                                        primary="Предыдущие антикоагулянты"
                                                        secondary={example.patientData.previousAnticoagulants.join(', ')}
                                                    />
                                                </ListItem>
                                            )}
                                        </List>
                                    </CardContent>
                                </Card>
                            </Grid>

                            {/* Рекомендация ИИ */}
                            <Grid item xs={12} md={6}>
                                <Card variant="outlined" sx={{ borderColor: 'primary.main' }}>
                                    <CardContent>
                                        <Typography variant="h6" gutterBottom color="primary">
                                            <Psychology sx={{ mr: 1, verticalAlign: 'middle' }} />
                                            Рекомендация ИИ
                                        </Typography>

                                        <Box sx={{ mb: 2 }}>
                                            <Typography variant="h6" color="primary">
                                                {example.recommendation.medication}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {example.recommendation.dosage} • {example.recommendation.frequency}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {example.recommendation.instructions}
                                            </Typography>
                                        </Box>

                                        <Typography variant="body2" sx={{ mb: 2 }}>
                                            {example.recommendation.justification}
                                        </Typography>

                                        {example.recommendation.warnings && (
                                            <Alert severity="warning" sx={{ mb: 2 }}>
                                                {example.recommendation.warnings}
                                            </Alert>
                                        )}

                                        <Divider sx={{ my: 2 }} />

                                        <Grid container spacing={1}>
                                            {example.recommendation.contraindications.length > 0 && (
                                                <Grid item xs={12}>
                                                    <Typography variant="subtitle2" color="error" gutterBottom>
                                                        Противопоказания:
                                                    </Typography>
                                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                        {example.recommendation.contraindications.map((contra, index) => (
                                                            <Chip key={index} label={contra} size="small" color="error" variant="outlined" />
                                                        ))}
                                                    </Box>
                                                </Grid>
                                            )}

                                            {example.recommendation.drugInteractions.length > 0 && (
                                                <Grid item xs={12}>
                                                    <Typography variant="subtitle2" color="warning.main" gutterBottom>
                                                        Лекарственные взаимодействия:
                                                    </Typography>
                                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                        {example.recommendation.drugInteractions.map((interaction, index) => (
                                                            <Chip key={index} label={interaction} size="small" color="warning" variant="outlined" />
                                                        ))}
                                                    </Box>
                                                </Grid>
                                            )}

                                            {example.recommendation.sideEffects.length > 0 && (
                                                <Grid item xs={12}>
                                                    <Typography variant="subtitle2" color="info.main" gutterBottom>
                                                        Побочные эффекты:
                                                    </Typography>
                                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                        {example.recommendation.sideEffects.map((effect, index) => (
                                                            <Chip key={index} label={effect} size="small" color="info" variant="outlined" />
                                                        ))}
                                                    </Box>
                                                </Grid>
                                            )}

                                            {example.recommendation.alternatives && (
                                                <Grid item xs={12}>
                                                    <Typography variant="subtitle2" color="primary" gutterBottom>
                                                        Альтернативные варианты:
                                                    </Typography>
                                                    {example.recommendation.alternatives.map((alt, index) => (
                                                        <Box key={index} sx={{ mb: 1, p: 1, bgcolor: 'grey.50', borderRadius: 1 }}>
                                                            <Typography variant="body2" fontWeight="medium">
                                                                {alt.medication}
                                                            </Typography>
                                                            <Typography variant="caption" color="text.secondary">
                                                                {alt.dosage} • {alt.frequency} • {alt.reason}
                                                            </Typography>
                                                        </Box>
                                                    ))}
                                                </Grid>
                                            )}
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    </AccordionDetails>
                </Accordion>
            ))}
        </Box>
    );
};

export default AIRecommendationExamples;
