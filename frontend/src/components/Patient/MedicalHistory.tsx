import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  Chip,
  Divider,
} from '@mui/material';
import { Patient } from '../../types/patient';

interface MedicalHistoryProps {
  patient: Patient;
}

const MedicalHistory: React.FC<MedicalHistoryProps> = ({ patient }) => {

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Медицинская история
        </Typography>

        <Grid container spacing={3}>
          {/* Основная информация */}
          <Grid item xs={12} md={6}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" gutterBottom color="primary">
                Основная информация
              </Typography>
              <Box sx={{ pl: 2 }}>
                <Typography variant="body2" paragraph>
                  <strong>Возраст:</strong> {patient.age} лет
                </Typography>
                <Typography variant="body2" paragraph>
                  <strong>Пол:</strong> {patient.gender === 'male' ? 'Мужской' :
                    patient.gender === 'female' ? 'Женский' : 'Другой'}
                </Typography>
                {patient.weight && (
                  <Typography variant="body2" paragraph>
                    <strong>Вес:</strong> {patient.weight} кг
                  </Typography>
                )}
                {patient.height && (
                  <Typography variant="body2" paragraph>
                    <strong>Рост:</strong> {patient.height} см
                  </Typography>
                )}
                {patient.weight && patient.height && (
                  <Typography variant="body2" paragraph>
                    <strong>ИМТ:</strong> {(patient.weight / ((patient.height / 100) ** 2)).toFixed(1)}
                  </Typography>
                )}
              </Box>
            </Box>

            {/* Диагноз */}
            {patient.diagnosis && (
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" gutterBottom color="primary">
                  Диагноз
                </Typography>
                <Box sx={{ pl: 2 }}>
                  <Typography variant="body2">
                    {patient.diagnosis}
                  </Typography>
                </Box>
              </Box>
            )}

            {/* Сопутствующие заболевания */}
            {patient.comorbidities && patient.comorbidities.length > 0 && (
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" gutterBottom color="primary">
                  Сопутствующие заболевания
                </Typography>
                <Box sx={{ pl: 2 }}>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {patient.comorbidities.map((comorbidity, index) => (
                      <Chip key={index} label={comorbidity} size="small" />
                    ))}
                  </Box>
                </Box>
              </Box>
            )}
          </Grid>

          {/* Факторы риска и образ жизни */}
          <Grid item xs={12} md={6}>
            {/* Образ жизни */}
            {patient.lifestyle_factors && (
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" gutterBottom color="primary">
                  Образ жизни
                </Typography>
                <Box sx={{ pl: 2 }}>
                  <Typography variant="body2" paragraph>
                    <strong>Курение:</strong> {
                      patient.lifestyle_factors.smoking.status === 'never' ? 'Никогда не курил' :
                        patient.lifestyle_factors.smoking.status === 'former' ? 'Бывший курильщик' :
                          'Курит сейчас'
                    }
                    {patient.lifestyle_factors.smoking.pack_years &&
                      ` (${patient.lifestyle_factors.smoking.pack_years} пачко-лет)`
                    }
                  </Typography>
                  <Typography variant="body2" paragraph>
                    <strong>Алкоголь:</strong> {
                      patient.lifestyle_factors.alcohol.status === 'never' ? 'Не употребляет' :
                        patient.lifestyle_factors.alcohol.status === 'occasional' ? 'Редко' :
                          'Регулярно'
                    }
                    {patient.lifestyle_factors.alcohol.units_per_week &&
                      ` (${patient.lifestyle_factors.alcohol.units_per_week} единиц/неделя)`
                    }
                  </Typography>
                  <Typography variant="body2" paragraph>
                    <strong>Физическая активность:</strong> {
                      patient.lifestyle_factors.physical_activity.level === 'sedentary' ? 'Малоподвижный' :
                        patient.lifestyle_factors.physical_activity.level === 'light' ? 'Легкая' :
                          patient.lifestyle_factors.physical_activity.level === 'moderate' ? 'Умеренная' :
                            'Высокая'
                    }
                    {patient.lifestyle_factors.physical_activity.hours_per_week &&
                      ` (${patient.lifestyle_factors.physical_activity.hours_per_week} часов/неделя)`
                    }
                  </Typography>
                </Box>
              </Box>
            )}

            {/* Факторы риска */}
            {patient.risk_factors && (
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" gutterBottom color="primary">
                  Факторы риска
                </Typography>
                <Box sx={{ pl: 2 }}>
                  {patient.risk_factors.previous_bleeding.has_bleeding && (
                    <Chip
                      label="Предыдущие кровотечения"
                      color="warning"
                      size="small"
                      sx={{ mr: 1, mb: 1 }}
                    />
                  )}
                  {patient.risk_factors.falls.has_falls && (
                    <Chip
                      label="Склонность к падениям"
                      color="warning"
                      size="small"
                      sx={{ mr: 1, mb: 1 }}
                    />
                  )}
                  {patient.risk_factors.surgeries.recent_surgery && (
                    <Chip
                      label="Недавние операции"
                      color="warning"
                      size="small"
                      sx={{ mr: 1, mb: 1 }}
                    />
                  )}
                </Box>
              </Box>
            )}

            {/* Социальные факторы */}
            {patient.social_factors && (
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" gutterBottom color="primary">
                  Социальные факторы
                </Typography>
                <Box sx={{ pl: 2 }}>
                  <Typography variant="body2" paragraph>
                    <strong>Соблюдение режима:</strong> {
                      patient.social_factors.compliance.level === 'excellent' ? 'Отличное' :
                        patient.social_factors.compliance.level === 'good' ? 'Хорошее' :
                          patient.social_factors.compliance.level === 'fair' ? 'Удовлетворительное' :
                            'Плохое'
                    }
                  </Typography>
                  {patient.social_factors.compliance.notes && (
                    <Typography variant="body2" paragraph>
                      <strong>Примечания:</strong> {patient.social_factors.compliance.notes}
                    </Typography>
                  )}
                </Box>
              </Box>
            )}
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        {/* Текущие медикаменты */}
        {patient.current_medications && patient.current_medications.length > 0 && (
          <Box>
            <Typography variant="subtitle1" gutterBottom color="primary">
              Текущие медикаменты
            </Typography>
            <Box sx={{ pl: 2 }}>
              {patient.current_medications.map((medication, index) => (
                <Box key={index} sx={{ mb: 2, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
                  <Typography variant="body1" fontWeight="medium">
                    {medication.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {medication.dosage} | {medication.frequency} | {medication.duration}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        )}

        {/* Аллергии */}
        {patient.allergies && patient.allergies.length > 0 && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle1" gutterBottom color="primary">
              Аллергии
            </Typography>
            <Box sx={{ pl: 2 }}>
              {patient.allergies.map((allergy, index) => (
                <Box key={index} sx={{ mb: 1 }}>
                  <Typography variant="body2" fontWeight="medium">
                    {allergy.allergen}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Реакция: {allergy.reaction}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default MedicalHistory;
