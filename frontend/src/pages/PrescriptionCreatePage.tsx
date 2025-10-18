import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Paper,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Card,
  CardContent,
  Alert,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import {
  ArrowBack,
  Save,
  Add,
  Delete,
} from '@mui/icons-material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { patientApi } from '../services/api';
import { Medication, Allergy, PreviousAnticoagulant } from '../types/patient';
import Header from '../components/Layout/Header';

const steps = [
  'Основные данные пациента',
  'Клинические данные',
  'Лабораторные показатели',
  'Текущая терапия',
  'Дополнительные факторы',
  'AI-рекомендации',
];

const PrescriptionCreatePage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [activeStep, setActiveStep] = useState(0);
  const [selectedPatientId] = useState<number | null>(
    searchParams.get('patientId') ? parseInt(searchParams.get('patientId')!) : null
  );

  // Форма данных
  const [formData, setFormData] = useState({
    patientId: selectedPatientId,
    diagnosis: '',
    comorbidities: [] as string[],
    labResults: {} as Record<string, any>,
    currentMedications: [] as Medication[],
    allergies: [] as Allergy[],
    previousAnticoagulants: [] as PreviousAnticoagulant[],
    lifestyleFactors: {
      smoking: { status: 'never' as const, pack_years: 0 },
      alcohol: { status: 'never' as const, units_per_week: 0 },
      physical_activity: { level: 'sedentary' as const, hours_per_week: 0 },
    },
    riskFactors: {
      previous_bleeding: { has_bleeding: false, episodes: [] },
      falls: { has_falls: false, frequency: 'rare' as const },
      surgeries: { recent_surgery: false, surgeries: [] },
    },
    socialFactors: {
      compliance: { level: 'good' as const, notes: '' },
      support: { family_support: false, caregiver: false, social_services: false },
    },
    recommendations: [] as any[],
  });

  const [newComorbidity, setNewComorbidity] = useState('');
  const [newMedication, setNewMedication] = useState<Partial<Medication>>({});
  const [newAllergy, setNewAllergy] = useState<Partial<Allergy>>({});
  const [newAnticoagulant, setNewAnticoagulant] = useState<Partial<PreviousAnticoagulant>>({});

  const { data: patients = [] } = useQuery({
    queryKey: ['patients'],
    queryFn: patientApi.getPatients
  });

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };


  const addComorbidity = () => {
    if (newComorbidity.trim()) {
      setFormData({
        ...formData,
        comorbidities: [...formData.comorbidities, newComorbidity.trim()],
      });
      setNewComorbidity('');
    }
  };

  const removeComorbidity = (index: number) => {
    setFormData({
      ...formData,
      comorbidities: formData.comorbidities.filter((_, i) => i !== index),
    });
  };

  const addMedication = () => {
    if (newMedication.name && newMedication.dosage && newMedication.frequency && newMedication.duration) {
      setFormData({
        ...formData,
        currentMedications: [...formData.currentMedications, newMedication as Medication],
      });
      setNewMedication({});
    }
  };

  const removeMedication = (index: number) => {
    setFormData({
      ...formData,
      currentMedications: formData.currentMedications.filter((_, i) => i !== index),
    });
  };

  const addAllergy = () => {
    if (newAllergy.allergen && newAllergy.reaction) {
      setFormData({
        ...formData,
        allergies: [...formData.allergies, newAllergy as Allergy],
      });
      setNewAllergy({});
    }
  };

  const removeAllergy = (index: number) => {
    setFormData({
      ...formData,
      allergies: formData.allergies.filter((_, i) => i !== index),
    });
  };

  const addAnticoagulant = () => {
    if (newAnticoagulant.medication && newAnticoagulant.dosage && newAnticoagulant.reason_for_discontinuation) {
      setFormData({
        ...formData,
        previousAnticoagulants: [...formData.previousAnticoagulants, newAnticoagulant as PreviousAnticoagulant],
      });
      setNewAnticoagulant({});
    }
  };

  const removeAnticoagulant = (index: number) => {
    setFormData({
      ...formData,
      previousAnticoagulants: formData.previousAnticoagulants.filter((_, i) => i !== index),
    });
  };

  const generateRecommendations = () => {
    // Здесь будет логика генерации рекомендаций с помощью ИИ
    const mockRecommendations = [
      {
        medication: 'Варфарин',
        dosage: '5 мг',
        frequency: '1 раз в день',
        duration: '3 месяца',
        instructions: 'Принимать в одно и то же время, контролировать МНО',
      },
    ];
    setFormData({
      ...formData,
      recommendations: mockRecommendations,
    });
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Выберите пациента
            </Typography>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Пациент</InputLabel>
              <Select
                value={formData.patientId || ''}
                onChange={(e) => setFormData({ ...formData, patientId: e.target.value as number })}
              >
                {patients.map((patient) => (
                  <MenuItem key={patient.id} value={patient.id}>
                    {patient.full_name} (Возраст: {patient.age})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        );

      case 1:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Клинические данные
            </Typography>
            <TextField
              fullWidth
              label="Диагноз"
              multiline
              rows={3}
              value={formData.diagnosis}
              onChange={(e) => setFormData({ ...formData, diagnosis: e.target.value })}
              sx={{ mb: 2 }}
            />
            <Typography variant="subtitle1" gutterBottom>
              Сопутствующие заболевания
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
              <TextField
                label="Добавить заболевание"
                value={newComorbidity}
                onChange={(e) => setNewComorbidity(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addComorbidity()}
              />
              <Button variant="outlined" onClick={addComorbidity}>
                <Add />
              </Button>
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {formData.comorbidities.map((comorbidity, index) => (
                <Chip
                  key={index}
                  label={comorbidity}
                  onDelete={() => removeComorbidity(index)}
                />
              ))}
            </Box>
          </Box>
        );

      case 2:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Лабораторные показатели
            </Typography>
            <Alert severity="info">
              Здесь будут поля для ввода лабораторных показателей
            </Alert>
          </Box>
        );

      case 3:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Текущая терапия
            </Typography>

            {/* Текущие медикаменты */}
            <Typography variant="subtitle1" gutterBottom>
              Принимаемые препараты
            </Typography>
            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid item xs={12} sm={3}>
                <TextField
                  fullWidth
                  label="Название"
                  value={newMedication.name || ''}
                  onChange={(e) => setNewMedication({ ...newMedication, name: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  fullWidth
                  label="Дозировка"
                  value={newMedication.dosage || ''}
                  onChange={(e) => setNewMedication({ ...newMedication, dosage: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  fullWidth
                  label="Кратность"
                  value={newMedication.frequency || ''}
                  onChange={(e) => setNewMedication({ ...newMedication, frequency: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  fullWidth
                  label="Длительность"
                  value={newMedication.duration || ''}
                  onChange={(e) => setNewMedication({ ...newMedication, duration: e.target.value })}
                />
              </Grid>
            </Grid>
            <Button variant="outlined" onClick={addMedication} sx={{ mb: 2 }}>
              <Add /> Добавить медикамент
            </Button>

            {formData.currentMedications.map((medication, index) => (
              <Card key={index} sx={{ mb: 1 }}>
                <CardContent sx={{ py: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box>
                      <Typography variant="body1" fontWeight="medium">
                        {medication.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {medication.dosage} | {medication.frequency} | {medication.duration}
                      </Typography>
                    </Box>
                    <Button
                      size="small"
                      color="error"
                      onClick={() => removeMedication(index)}
                    >
                      <Delete />
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            ))}

            {/* Аллергии */}
            <Typography variant="subtitle1" gutterBottom sx={{ mt: 3 }}>
              Аллергии
            </Typography>
            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Аллерген"
                  value={newAllergy.allergen || ''}
                  onChange={(e) => setNewAllergy({ ...newAllergy, allergen: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Реакция"
                  value={newAllergy.reaction || ''}
                  onChange={(e) => setNewAllergy({ ...newAllergy, reaction: e.target.value })}
                />
              </Grid>
            </Grid>
            <Button variant="outlined" onClick={addAllergy} sx={{ mb: 2 }}>
              <Add /> Добавить аллергию
            </Button>

            {formData.allergies.map((allergy, index) => (
              <Card key={index} sx={{ mb: 1 }}>
                <CardContent sx={{ py: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box>
                      <Typography variant="body1" fontWeight="medium">
                        {allergy.allergen}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {allergy.reaction}
                      </Typography>
                    </Box>
                    <Button
                      size="small"
                      color="error"
                      onClick={() => removeAllergy(index)}
                    >
                      <Delete />
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            ))}

            {/* Предыдущие антикоагулянты */}
            <Typography variant="subtitle1" gutterBottom sx={{ mt: 3 }}>
              Предыдущие назначения антикоагулянтов
            </Typography>
            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Препарат"
                  value={newAnticoagulant.medication || ''}
                  onChange={(e) => setNewAnticoagulant({ ...newAnticoagulant, medication: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Дозировка"
                  value={newAnticoagulant.dosage || ''}
                  onChange={(e) => setNewAnticoagulant({ ...newAnticoagulant, dosage: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Причина отмены"
                  value={newAnticoagulant.reason_for_discontinuation || ''}
                  onChange={(e) => setNewAnticoagulant({ ...newAnticoagulant, reason_for_discontinuation: e.target.value })}
                />
              </Grid>
            </Grid>
            <Button variant="outlined" onClick={addAnticoagulant} sx={{ mb: 2 }}>
              <Add /> Добавить антикоагулянт
            </Button>

            {formData.previousAnticoagulants.map((anticoagulant, index) => (
              <Card key={index} sx={{ mb: 1 }}>
                <CardContent sx={{ py: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box>
                      <Typography variant="body1" fontWeight="medium">
                        {anticoagulant.medication}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {anticoagulant.dosage} | {anticoagulant.reason_for_discontinuation}
                      </Typography>
                    </Box>
                    <Button
                      size="small"
                      color="error"
                      onClick={() => removeAnticoagulant(index)}
                    >
                      <Delete />
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        );

      case 4:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Дополнительные факторы
            </Typography>

            {/* Образ жизни */}
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Образ жизни
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <FormControl fullWidth>
                      <InputLabel>Курение</InputLabel>
                      <Select
                        value={formData.lifestyleFactors.smoking.status}
                        onChange={(e) => setFormData({
                          ...formData,
                          lifestyleFactors: {
                            ...formData.lifestyleFactors,
                            smoking: { ...formData.lifestyleFactors.smoking, status: e.target.value as any }
                          }
                        })}
                      >
                        <MenuItem value="never">Никогда не курил</MenuItem>
                        <MenuItem value="former">Бывший курильщик</MenuItem>
                        <MenuItem value="current">Курит сейчас</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <FormControl fullWidth>
                      <InputLabel>Алкоголь</InputLabel>
                      <Select
                        value={formData.lifestyleFactors.alcohol.status}
                        onChange={(e) => setFormData({
                          ...formData,
                          lifestyleFactors: {
                            ...formData.lifestyleFactors,
                            alcohol: { ...formData.lifestyleFactors.alcohol, status: e.target.value as any }
                          }
                        })}
                      >
                        <MenuItem value="never">Не употребляет</MenuItem>
                        <MenuItem value="occasional">Редко</MenuItem>
                        <MenuItem value="regular">Регулярно</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <FormControl fullWidth>
                      <InputLabel>Физическая активность</InputLabel>
                      <Select
                        value={formData.lifestyleFactors.physical_activity.level}
                        onChange={(e) => setFormData({
                          ...formData,
                          lifestyleFactors: {
                            ...formData.lifestyleFactors,
                            physical_activity: { ...formData.lifestyleFactors.physical_activity, level: e.target.value as any }
                          }
                        })}
                      >
                        <MenuItem value="sedentary">Малоподвижный</MenuItem>
                        <MenuItem value="light">Легкая</MenuItem>
                        <MenuItem value="moderate">Умеренная</MenuItem>
                        <MenuItem value="high">Высокая</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            {/* Риски */}
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Факторы риска
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formData.riskFactors.previous_bleeding.has_bleeding}
                          onChange={(e) => setFormData({
                            ...formData,
                            riskFactors: {
                              ...formData.riskFactors,
                              previous_bleeding: { ...formData.riskFactors.previous_bleeding, has_bleeding: e.target.checked }
                            }
                          })}
                        />
                      }
                      label="Предыдущие кровотечения"
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formData.riskFactors.falls.has_falls}
                          onChange={(e) => setFormData({
                            ...formData,
                            riskFactors: {
                              ...formData.riskFactors,
                              falls: { ...formData.riskFactors.falls, has_falls: e.target.checked }
                            }
                          })}
                        />
                      }
                      label="Склонность к падениям"
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formData.riskFactors.surgeries.recent_surgery}
                          onChange={(e) => setFormData({
                            ...formData,
                            riskFactors: {
                              ...formData.riskFactors,
                              surgeries: { ...formData.riskFactors.surgeries, recent_surgery: e.target.checked }
                            }
                          })}
                        />
                      }
                      label="Недавние операции"
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            {/* Социальные факторы */}
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Социальные факторы
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <FormControl fullWidth>
                      <InputLabel>Соблюдение режима</InputLabel>
                      <Select
                        value={formData.socialFactors.compliance.level}
                        onChange={(e) => setFormData({
                          ...formData,
                          socialFactors: {
                            ...formData.socialFactors,
                            compliance: { ...formData.socialFactors.compliance, level: e.target.value as any }
                          }
                        })}
                      >
                        <MenuItem value="excellent">Отличное</MenuItem>
                        <MenuItem value="good">Хорошее</MenuItem>
                        <MenuItem value="fair">Удовлетворительное</MenuItem>
                        <MenuItem value="poor">Плохое</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={8}>
                    <TextField
                      fullWidth
                      label="Поддержка семьи"
                      multiline
                      rows={2}
                      value={formData.socialFactors.compliance.notes}
                      onChange={(e) => setFormData({
                        ...formData,
                        socialFactors: {
                          ...formData.socialFactors,
                          compliance: { ...formData.socialFactors.compliance, notes: e.target.value }
                        }
                      })}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Box>
        );

      case 5:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              AI-рекомендации
            </Typography>
            <Button
              variant="contained"
              onClick={generateRecommendations}
              sx={{ mb: 2 }}
            >
              Сгенерировать рекомендации
            </Button>

            {formData.recommendations.map((recommendation, index) => (
              <Card key={index} sx={{ mb: 2 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {recommendation.medication}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    Дозировка: {recommendation.dosage} |
                    Кратность: {recommendation.frequency} |
                    Длительность: {recommendation.duration}
                  </Typography>
                  <Typography variant="body2">
                    {recommendation.instructions}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        );

      default:
        return 'Неизвестный шаг';
    }
  };

  return (
    <Box>
      <Header />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <Button
            startIcon={<ArrowBack />}
            onClick={() => navigate('/dashboard')}
            sx={{ mr: 2 }}
          >
            Назад
          </Button>
          <Typography variant="h4" component="h1">
            Создание назначения
          </Typography>
        </Box>

        <Paper sx={{ p: 3 }}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <Box sx={{ mt: 4 }}>
            {renderStepContent(activeStep)}
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Назад
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            {activeStep === steps.length - 1 ? (
              <Button
                variant="contained"
                startIcon={<Save />}
                onClick={() => {
                  // Здесь будет сохранение назначения
                  alert('Назначение сохранено!');
                  navigate('/prescriptions');
                }}
              >
                Сохранить назначение
              </Button>
            ) : (
              <Button variant="contained" onClick={handleNext}>
                Далее
              </Button>
            )}
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default PrescriptionCreatePage;
