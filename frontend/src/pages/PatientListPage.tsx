import React, { useState } from 'react';
import {
  Container,
  Typography,
  Button,
  Box,
  Card,
  CardContent,
  Grid,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  CircularProgress,
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  Person,
  Phone,
  Email,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { patientApi } from '../services/api';
import { Patient, PatientCreate } from '../types/patient';
import Header from '../components/Layout/Header';

const PatientListPage: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);
  const [formData, setFormData] = useState<PatientCreate>({
    full_name: '',
    age: 0,
    gender: '',
    weight: undefined,
    height: undefined,
    phone: '',
    email: '',
    diagnosis: '',
    comorbidities: [],
    lab_results: {},
    current_medications: [],
    allergies: [],
    previous_anticoagulants: [],
  });

  const { data: patients = [], isLoading, error } = useQuery({
    queryKey: ['patients'],
    queryFn: patientApi.getPatients
  });

  const createMutation = useMutation({
    mutationFn: patientApi.createPatient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['patients'] });
      setOpen(false);
      setFormData({
        full_name: '',
        age: 0,
        gender: '',
        weight: undefined,
        height: undefined,
        phone: '',
        email: '',
        diagnosis: '',
        comorbidities: [],
        lab_results: {},
        current_medications: [],
        allergies: [],
        previous_anticoagulants: [],
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<PatientCreate> }) =>
      patientApi.updatePatient(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['patients'] });
      setOpen(false);
      setEditingPatient(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: patientApi.deletePatient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['patients'] });
    },
  });

  const handleOpen = () => {
    setEditingPatient(null);
    setFormData({
      full_name: '',
      age: 0,
      gender: '',
      weight: undefined,
      height: undefined,
      phone: '',
      email: '',
      diagnosis: '',
      comorbidities: [],
      lab_results: {},
      current_medications: [],
      allergies: [],
      previous_anticoagulants: [],
    });
    setOpen(true);
  };

  const handleEdit = (patient: Patient) => {
    setEditingPatient(patient);
    setFormData({
      full_name: patient.full_name,
      age: patient.age,
      gender: patient.gender,
      weight: patient.weight,
      height: patient.height,
      phone: patient.phone || '',
      email: patient.email || '',
      diagnosis: patient.diagnosis || '',
      comorbidities: patient.comorbidities || [],
      lab_results: patient.lab_results || {},
      current_medications: patient.current_medications || [],
      allergies: patient.allergies || [],
      previous_anticoagulants: patient.previous_anticoagulants || [],
    });
    setOpen(true);
  };

  const handleSubmit = () => {
    if (editingPatient) {
      updateMutation.mutate({ id: editingPatient.id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Вы уверены, что хотите удалить этого пациента?')) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Header />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h4" component="h1">
            Мои пациенты
          </Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={handleOpen}
          >
            Добавить пациента
          </Button>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            Ошибка загрузки пациентов
          </Alert>
        )}

        <Grid container spacing={3}>
          {patients.map((patient) => (
            <Grid item xs={12} sm={6} md={4} key={patient.id}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Typography variant="h6" component="h3">
                      {patient.full_name}
                    </Typography>
                    <Box>
                      <IconButton
                        size="small"
                        onClick={() => handleEdit(patient)}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleDelete(patient.id)}
                        color="error"
                      >
                        <Delete />
                      </IconButton>
                    </Box>
                  </Box>

                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Возраст: {patient.age} лет, {patient.gender === 'male' ? 'Мужской' : 'Женский'}
                  </Typography>

                  {patient.phone && (
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Phone sx={{ fontSize: 16, mr: 1 }} />
                      <Typography variant="body2">{patient.phone}</Typography>
                    </Box>
                  )}

                  {patient.email && (
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Email sx={{ fontSize: 16, mr: 1 }} />
                      <Typography variant="body2">{patient.email}</Typography>
                    </Box>
                  )}

                  {patient.diagnosis && (
                    <Typography variant="body2" color="text.secondary">
                      Диагноз: {patient.diagnosis}
                    </Typography>
                  )}
                </CardContent>
                <Box sx={{ p: 2, pt: 0 }}>
                  <Button
                    size="small"
                    variant="outlined"
                    fullWidth
                    onClick={() => navigate(`/patients/${patient.id}`)}
                  >
                    Подробнее
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>

        {patients.length === 0 && (
          <Box textAlign="center" sx={{ mt: 4 }}>
            <Person sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" color="text.secondary">
              У вас пока нет пациентов
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Добавьте первого пациента для начала работы
            </Typography>
            <Button variant="contained" onClick={handleOpen}>
              Добавить пациента
            </Button>
          </Box>
        )}

        {/* Add/Edit Dialog */}
        <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
          <DialogTitle>
            {editingPatient ? 'Редактировать пациента' : 'Добавить пациента'}
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="ФИО"
                  value={formData.full_name}
                  onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  fullWidth
                  label="Возраст"
                  type="number"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) || 0 })}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  fullWidth
                  label="Пол"
                  select
                  SelectProps={{ native: true }}
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                >
                  <option value="">Выберите пол</option>
                  <option value="male">Мужской</option>
                  <option value="female">Женский</option>
                  <option value="other">Другой</option>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Телефон"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Диагноз"
                  multiline
                  rows={3}
                  value={formData.diagnosis}
                  onChange={(e) => setFormData({ ...formData, diagnosis: e.target.value })}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Отмена</Button>
            <Button
              onClick={handleSubmit}
              variant="contained"
              disabled={createMutation.isPending || updateMutation.isPending}
            >
              {createMutation.isPending || updateMutation.isPending ? (
                <CircularProgress size={24} />
              ) : (
                editingPatient ? 'Сохранить' : 'Добавить'
              )}
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default PatientListPage;
