import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Button,
  Tabs,
  Tab,
  Paper,
} from '@mui/material';
import {
  Edit,
  Assignment,
  Person,
  LocalHospital,
  Assessment,
  CheckCircle,
  Warning,
  CalendarToday,
} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { patientApi, prescriptionApi } from '../services/api';
import Header from '../components/Layout/Header';
import BackButton from '../components/UI/BackButton';
import MedicalHistory from '../components/Patient/MedicalHistory';
import ActivePrescriptions from '../components/Patient/ActivePrescriptions';
import PrescriptionHistory from '../components/Patient/PrescriptionHistory';
import MonitoringChart from '../components/Patient/MonitoringChart';
import ComplianceTracker from '../components/Patient/ComplianceTracker';
import SideEffectsTracker from '../components/Patient/SideEffectsTracker';
import ControlVisits from '../components/Patient/ControlVisits';

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
      id={`patient-tabpanel-${index}`}
      aria-labelledby={`patient-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const PatientDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);

  // Моковые данные для новых компонентов
  const [complianceData, setComplianceData] = useState({
    overall: 85,
    lastWeek: 90,
    lastMonth: 82,
    missedDoses: 3,
    adherenceLevel: 'good' as const,
    lastCheck: new Date().toISOString(),
    notes: ['Хорошее соблюдение режима', 'Редкие пропуски'],
  });

  const [sideEffects, setSideEffects] = useState([
    {
      id: '1',
      medication: 'Варфарин',
      effect: 'Легкая тошнота',
      severity: 'mild' as const,
      date: '2024-01-15',
      duration: '2 дня',
      status: 'resolved' as const,
      notes: 'Прошла самостоятельно',
    },
    {
      id: '2',
      medication: 'Варфарин',
      effect: 'Кровоточивость десен',
      severity: 'moderate' as const,
      date: '2024-01-20',
      duration: '1 неделя',
      status: 'monitoring' as const,
      notes: 'Требует наблюдения',
    },
  ]);

  const [controlVisits, setControlVisits] = useState([
    {
      id: '1',
      date: '2024-02-15',
      type: 'routine' as const,
      doctor: 'Иванов И.И.',
      purpose: 'Контроль МНО',
      findings: 'МНО в норме, самочувствие хорошее',
      recommendations: 'Продолжить текущую дозировку',
      nextVisit: '2024-03-15',
      status: 'scheduled' as const,
    },
    {
      id: '2',
      date: '2024-01-15',
      type: 'follow_up' as const,
      doctor: 'Петров П.П.',
      purpose: 'Контрольный осмотр',
      findings: 'Состояние стабильное',
      recommendations: 'Продолжить лечение',
      status: 'completed' as const,
    },
  ]);

  const { data: patient, isLoading, error } = useQuery({
    queryKey: ['patient', id],
    queryFn: () => patientApi.getPatient(parseInt(id!)),
    enabled: !!id,
  });

  const { data: prescriptions = [] } = useQuery({
    queryKey: ['prescriptions', id],
    queryFn: () => prescriptionApi.getPrescriptions(),
    enabled: !!id,
  });

  // Фильтруем назначения для данного пациента
  const patientPrescriptions = prescriptions.filter(p => p.patient_id === parseInt(id!));
  const activePrescriptions = patientPrescriptions.filter(p => p.status === 'active');

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleViewPrescription = (prescriptionId: number) => {
    navigate(`/prescriptions/${prescriptionId}`);
  };

  const handleEditPrescription = (prescriptionId: number) => {
    navigate(`/prescriptions/${prescriptionId}/edit`);
  };

  // Обработчики для новых компонентов
  const handleUpdateCompliance = (data: any) => {
    setComplianceData({ ...complianceData, ...data });
  };

  const handleAddSideEffect = (sideEffect: any) => {
    const newSideEffect = { ...sideEffect, id: Date.now().toString() };
    setSideEffects([...sideEffects, newSideEffect]);
  };

  const handleUpdateSideEffect = (id: string, data: any) => {
    setSideEffects(sideEffects.map(e => e.id === id ? { ...e, ...data } : e));
  };

  const handleDeleteSideEffect = (id: string) => {
    setSideEffects(sideEffects.filter(e => e.id !== id));
  };

  const handleAddVisit = (visit: any) => {
    const newVisit = { ...visit, id: Date.now().toString() };
    setControlVisits([...controlVisits, newVisit]);
  };

  const handleUpdateVisit = (id: string, data: any) => {
    setControlVisits(controlVisits.map(v => v.id === id ? { ...v, ...data } : v));
  };

  const handleDeleteVisit = (id: string) => {
    setControlVisits(controlVisits.filter(v => v.id !== id));
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Typography>Загрузка...</Typography>
      </Box>
    );
  }

  if (error || !patient) {
    return (
      <Box>
        <Header />
        <Container maxWidth="lg" sx={{ mt: 4 }}>
          <Typography variant="h6" color="error">
            Пациент не найден
          </Typography>
        </Container>
      </Box>
    );
  }

  // Моковые данные для мониторинга (в реальном приложении будут загружаться с сервера)
  const monitoringData = {
    inr: [
      { date: '2024-01-01', value: 2.1, normal_min: 2.0, normal_max: 3.0 },
      { date: '2024-01-08', value: 2.3, normal_min: 2.0, normal_max: 3.0 },
      { date: '2024-01-15', value: 2.8, normal_min: 2.0, normal_max: 3.0 },
      { date: '2024-01-22', value: 2.5, normal_min: 2.0, normal_max: 3.0 },
    ],
    creatinine: [
      { date: '2024-01-01', value: 85, normal_min: 60, normal_max: 120 },
      { date: '2024-01-08', value: 88, normal_min: 60, normal_max: 120 },
      { date: '2024-01-15', value: 92, normal_min: 60, normal_max: 120 },
      { date: '2024-01-22', value: 89, normal_min: 60, normal_max: 120 },
    ],
  };

  return (
    <Box>
      <Header />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <BackButton
          onClick={() => navigate('/patients')}
          text="Назад к списку пациентов"
        />
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <Typography variant="h4" component="h1">
            {patient.full_name}
          </Typography>
          <Box sx={{ ml: 'auto', display: 'flex', gap: 1 }}>
            <Button
              variant="contained"
              startIcon={<Assignment />}
              onClick={() => navigate(`/prescriptions/new?patientId=${patient.id}`)}
            >
              Новое назначение
            </Button>
            <Button
              variant="outlined"
              startIcon={<Edit />}
              onClick={() => navigate(`/patients/${patient.id}/edit`)}
            >
              Редактировать
            </Button>
          </Box>
        </Box>

        {/* Краткая информация */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h4" color="primary">
                  {patient.age}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  лет
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h4" color="primary">
                  {activePrescriptions.length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  активных назначений
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h4" color="primary">
                  {patientPrescriptions.length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  всего назначений
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h4" color="primary">
                  {patient.gender === 'male' ? 'М' : 'Ж'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  пол
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Вкладки */}
        <Paper sx={{ width: '100%' }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            aria-label="patient tabs"
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab
              icon={<Person />}
              label="Общая информация"
              id="patient-tab-0"
              aria-controls="patient-tabpanel-0"
            />
            <Tab
              icon={<LocalHospital />}
              label="Медицинская история"
              id="patient-tab-1"
              aria-controls="patient-tabpanel-1"
            />
            <Tab
              icon={<Assignment />}
              label="Текущие назначения"
              id="patient-tab-2"
              aria-controls="patient-tabpanel-2"
            />
            <Tab
              icon={<Assignment />}
              label="История назначений"
              id="patient-tab-3"
              aria-controls="patient-tabpanel-3"
            />
            <Tab
              icon={<Assessment />}
              label="Мониторинг"
              id="patient-tab-4"
              aria-controls="patient-tabpanel-4"
            />
            <Tab
              icon={<CheckCircle />}
              label="Соблюдение режима"
              id="patient-tab-5"
              aria-controls="patient-tabpanel-5"
            />
            <Tab
              icon={<Warning />}
              label="Побочные эффекты"
              id="patient-tab-6"
              aria-controls="patient-tabpanel-6"
            />
            <Tab
              icon={<CalendarToday />}
              label="Контрольные визиты"
              id="patient-tab-7"
              aria-controls="patient-tabpanel-7"
            />
          </Tabs>

          {/* Общая информация */}
          <TabPanel value={tabValue} index={0}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Личная информация
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">
                          Возраст
                        </Typography>
                        <Typography variant="body1">
                          {patient.age} лет
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">
                          Пол
                        </Typography>
                        <Typography variant="body1">
                          {patient.gender === 'male' ? 'Мужской' :
                            patient.gender === 'female' ? 'Женский' : 'Другой'}
                        </Typography>
                      </Grid>
                      {patient.weight && (
                        <Grid item xs={6}>
                          <Typography variant="body2" color="text.secondary">
                            Вес
                          </Typography>
                          <Typography variant="body1">
                            {patient.weight} кг
                          </Typography>
                        </Grid>
                      )}
                      {patient.height && (
                        <Grid item xs={6}>
                          <Typography variant="body2" color="text.secondary">
                            Рост
                          </Typography>
                          <Typography variant="body1">
                            {patient.height} см
                          </Typography>
                        </Grid>
                      )}
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Контактная информация
                    </Typography>
                    {patient.phone && (
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" color="text.secondary">
                          Телефон
                        </Typography>
                        <Typography variant="body1">
                          {patient.phone}
                        </Typography>
                      </Box>
                    )}
                    {patient.email && (
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Email
                        </Typography>
                        <Typography variant="body1">
                          {patient.email}
                        </Typography>
                      </Box>
                    )}
                  </CardContent>
                </Card>
              </Grid>

              {patient.diagnosis && (
                <Grid item xs={12}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Диагноз
                      </Typography>
                      <Typography variant="body1">
                        {patient.diagnosis}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              )}
            </Grid>
          </TabPanel>

          {/* Медицинская история */}
          <TabPanel value={tabValue} index={1}>
            <MedicalHistory patient={patient} />
          </TabPanel>

          {/* Текущие назначения */}
          <TabPanel value={tabValue} index={2}>
            <ActivePrescriptions
              prescriptions={activePrescriptions}
              onViewDetails={handleViewPrescription}
              onEdit={handleEditPrescription}
            />
          </TabPanel>

          {/* История назначений */}
          <TabPanel value={tabValue} index={3}>
            <PrescriptionHistory
              prescriptions={patientPrescriptions}
              onViewDetails={handleViewPrescription}
              onEdit={handleEditPrescription}
            />
          </TabPanel>

          {/* Мониторинг */}
          <TabPanel value={tabValue} index={4}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <MonitoringChart
                  title="МНО (INR)"
                  data={monitoringData.inr}
                  parameter="МНО"
                  unit=""
                  normalRange={{ min: 2.0, max: 3.0 }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <MonitoringChart
                  title="Креатинин"
                  data={monitoringData.creatinine}
                  parameter="Креатинин"
                  unit="мкмоль/л"
                  normalRange={{ min: 60, max: 120 }}
                />
              </Grid>
            </Grid>
          </TabPanel>

          {/* Соблюдение режима */}
          <TabPanel value={tabValue} index={5}>
            <ComplianceTracker
              complianceData={complianceData}
              onUpdateCompliance={handleUpdateCompliance}
            />
          </TabPanel>

          {/* Побочные эффекты */}
          <TabPanel value={tabValue} index={6}>
            <SideEffectsTracker
              sideEffects={sideEffects}
              onAddSideEffect={handleAddSideEffect}
              onUpdateSideEffect={handleUpdateSideEffect}
              onDeleteSideEffect={handleDeleteSideEffect}
            />
          </TabPanel>

          {/* Контрольные визиты */}
          <TabPanel value={tabValue} index={7}>
            <ControlVisits
              visits={controlVisits}
              onAddVisit={handleAddVisit}
              onUpdateVisit={handleUpdateVisit}
              onDeleteVisit={handleDeleteVisit}
            />
          </TabPanel>
        </Paper>
      </Container>
    </Box>
  );
};

export default PatientDetailPage;