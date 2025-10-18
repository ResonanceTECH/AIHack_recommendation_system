import React, { useState } from 'react';
import {
    Container,
    Typography,
    Box,
    Card,
    CardContent,
    Grid,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
    Chip,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Alert,
    CircularProgress,
} from '@mui/material';
import {
    Search,
    FilterList,
    Visibility,
    Edit,
    Delete,
    Add,
    Assignment,
    Refresh,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { prescriptionApi, patientApi } from '../services/api';
import { Prescription } from '../types/prescription';
import { Patient } from '../types/patient';
import Header from '../components/Layout/Header';

const PrescriptionListPage: React.FC = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [patientFilter, setPatientFilter] = useState('all');
    const [sortBy, setSortBy] = useState('date');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
    const [selectedPrescription, setSelectedPrescription] = useState<Prescription | null>(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [prescriptionToDelete, setPrescriptionToDelete] = useState<number | null>(null);

    const { data: prescriptions = [], isLoading, error } = useQuery(
        'prescriptions',
        prescriptionApi.getPrescriptions
    );

    const { data: patients = [] } = useQuery(
        'patients',
        patientApi.getPatients
    );

    const deleteMutation = useMutation(prescriptionApi.deletePrescription, {
        onSuccess: () => {
            queryClient.invalidateQueries('prescriptions');
            setDeleteDialogOpen(false);
            setPrescriptionToDelete(null);
        },
    });

    // Фильтрация и сортировка
    const filteredPrescriptions = prescriptions
        .filter((prescription) => {
            const matchesSearch =
                prescription.recommended_medications?.some(med =>
                    med.medication.toLowerCase().includes(searchTerm.toLowerCase())
                ) ||
                prescription.instructions?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                patients.find(p => p.id === prescription.patient_id)?.full_name
                    .toLowerCase().includes(searchTerm.toLowerCase());

            const matchesStatus = statusFilter === 'all' || prescription.status === statusFilter;
            const matchesPatient = patientFilter === 'all' || prescription.patient_id.toString() === patientFilter;

            return matchesSearch && matchesStatus && matchesPatient;
        })
        .sort((a, b) => {
            let comparison = 0;

            switch (sortBy) {
                case 'date':
                    comparison = new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
                    break;
                case 'medication':
                    const medA = a.recommended_medications?.[0]?.medication || '';
                    const medB = b.recommended_medications?.[0]?.medication || '';
                    comparison = medA.localeCompare(medB);
                    break;
                case 'patient':
                    const patientA = patients.find(p => p.id === a.patient_id)?.full_name || '';
                    const patientB = patients.find(p => p.id === b.patient_id)?.full_name || '';
                    comparison = patientA.localeCompare(patientB);
                    break;
                case 'status':
                    comparison = a.status.localeCompare(b.status);
                    break;
                default:
                    comparison = 0;
            }

            return sortOrder === 'asc' ? comparison : -comparison;
        });

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active':
                return 'success';
            case 'completed':
                return 'primary';
            case 'cancelled':
                return 'error';
            case 'draft':
                return 'default';
            default:
                return 'default';
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'active':
                return 'Активное';
            case 'completed':
                return 'Завершенное';
            case 'cancelled':
                return 'Отмененное';
            case 'draft':
                return 'Черновик';
            default:
                return status;
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('ru-RU', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    const handleDelete = (id: number) => {
        setPrescriptionToDelete(id);
        setDeleteDialogOpen(true);
    };

    const confirmDelete = () => {
        if (prescriptionToDelete) {
            deleteMutation.mutate(prescriptionToDelete);
        }
    };

    const handleViewDetails = (prescription: Prescription) => {
        setSelectedPrescription(prescription);
    };

    const handleEdit = (id: number) => {
        navigate(`/prescriptions/${id}/edit`);
    };

    const handleDuplicate = (prescription: Prescription) => {
        // Создаем копию назначения
        navigate(`/prescriptions/new?duplicate=${prescription.id}`);
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
                        История назначений
                    </Typography>
                    <Button
                        variant="contained"
                        startIcon={<Add />}
                        onClick={() => navigate('/prescriptions/new')}
                    >
                        Новое назначение
                    </Button>
                </Box>

                {/* Фильтры и поиск */}
                <Card sx={{ mb: 3 }}>
                    <CardContent>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    fullWidth
                                    placeholder="Поиск по пациенту, препарату или инструкции..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    InputProps={{
                                        startAdornment: (
                                            <Search sx={{ mr: 1, color: 'text.secondary' }} />
                                        ),
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={2}>
                                <FormControl fullWidth>
                                    <InputLabel>Статус</InputLabel>
                                    <Select
                                        value={statusFilter}
                                        onChange={(e) => setStatusFilter(e.target.value)}
                                    >
                                        <MenuItem value="all">Все</MenuItem>
                                        <MenuItem value="active">Активные</MenuItem>
                                        <MenuItem value="completed">Завершенные</MenuItem>
                                        <MenuItem value="cancelled">Отмененные</MenuItem>
                                        <MenuItem value="draft">Черновики</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={2}>
                                <FormControl fullWidth>
                                    <InputLabel>Пациент</InputLabel>
                                    <Select
                                        value={patientFilter}
                                        onChange={(e) => setPatientFilter(e.target.value)}
                                    >
                                        <MenuItem value="all">Все</MenuItem>
                                        {patients.map((patient) => (
                                            <MenuItem key={patient.id} value={patient.id.toString()}>
                                                {patient.full_name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={2}>
                                <FormControl fullWidth>
                                    <InputLabel>Сортировка</InputLabel>
                                    <Select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                    >
                                        <MenuItem value="date">По дате</MenuItem>
                                        <MenuItem value="medication">По препарату</MenuItem>
                                        <MenuItem value="patient">По пациенту</MenuItem>
                                        <MenuItem value="status">По статусу</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={2}>
                                <FormControl fullWidth>
                                    <InputLabel>Порядок</InputLabel>
                                    <Select
                                        value={sortOrder}
                                        onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
                                    >
                                        <MenuItem value="desc">По убыванию</MenuItem>
                                        <MenuItem value="asc">По возрастанию</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>

                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        Ошибка загрузки назначений
                    </Alert>
                )}

                {/* Таблица назначений */}
                <Card>
                    <CardContent>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Дата</TableCell>
                                        <TableCell>Пациент</TableCell>
                                        <TableCell>Препарат</TableCell>
                                        <TableCell>Дозировка</TableCell>
                                        <TableCell>Статус</TableCell>
                                        <TableCell>Действия</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {filteredPrescriptions.map((prescription) => {
                                        const patient = patients.find(p => p.id === prescription.patient_id);
                                        return (
                                            <TableRow key={prescription.id} hover>
                                                <TableCell>
                                                    {formatDate(prescription.created_at)}
                                                </TableCell>
                                                <TableCell>
                                                    <Typography variant="body2" fontWeight="medium">
                                                        {patient?.full_name || 'Неизвестно'}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography variant="body2" fontWeight="medium">
                                                        {prescription.recommended_medications?.[0]?.medication || 'Не указано'}
                                                    </Typography>
                                                    {prescription.is_ai_generated && (
                                                        <Chip
                                                            label="AI"
                                                            size="small"
                                                            color="primary"
                                                            sx={{ ml: 1 }}
                                                        />
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    <Typography variant="body2">
                                                        {prescription.recommended_medications?.[0]?.dosage || 'Не указано'}
                                                    </Typography>
                                                    <Typography variant="caption" color="text.secondary">
                                                        {prescription.recommended_medications?.[0]?.frequency || ''}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Chip
                                                        label={getStatusLabel(prescription.status)}
                                                        color={getStatusColor(prescription.status) as any}
                                                        size="small"
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <IconButton
                                                        size="small"
                                                        onClick={() => handleViewDetails(prescription)}
                                                        title="Просмотр"
                                                    >
                                                        <Visibility />
                                                    </IconButton>
                                                    <IconButton
                                                        size="small"
                                                        onClick={() => handleEdit(prescription.id)}
                                                        title="Редактировать"
                                                    >
                                                        <Edit />
                                                    </IconButton>
                                                    <IconButton
                                                        size="small"
                                                        onClick={() => handleDuplicate(prescription)}
                                                        title="Дублировать"
                                                    >
                                                        <Assignment />
                                                    </IconButton>
                                                    <IconButton
                                                        size="small"
                                                        onClick={() => handleDelete(prescription.id)}
                                                        title="Удалить"
                                                        color="error"
                                                    >
                                                        <Delete />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>

                        {filteredPrescriptions.length === 0 && (
                            <Box textAlign="center" sx={{ py: 4 }}>
                                <Assignment sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                                <Typography variant="h6" color="text.secondary">
                                    Назначения не найдены
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                    Попробуйте изменить фильтры или создать новое назначение
                                </Typography>
                                <Button
                                    variant="contained"
                                    onClick={() => navigate('/prescriptions/new')}
                                >
                                    Создать назначение
                                </Button>
                            </Box>
                        )}
                    </CardContent>
                </Card>

                {/* Диалог просмотра назначения */}
                <Dialog
                    open={!!selectedPrescription}
                    onClose={() => setSelectedPrescription(null)}
                    maxWidth="md"
                    fullWidth
                >
                    {selectedPrescription && (
                        <>
                            <DialogTitle>
                                Назначение от {formatDate(selectedPrescription.created_at)}
                            </DialogTitle>
                            <DialogContent>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Typography variant="h6" gutterBottom>
                                            Рекомендуемые препараты
                                        </Typography>
                                        {selectedPrescription.recommended_medications?.map((med, index) => (
                                            <Card key={index} sx={{ mb: 2 }}>
                                                <CardContent>
                                                    <Typography variant="h6">
                                                        {med.medication}
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        Дозировка: {med.dosage} | Кратность: {med.frequency} | Длительность: {med.duration}
                                                    </Typography>
                                                    <Typography variant="body2" sx={{ mt: 1 }}>
                                                        {med.instructions}
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </Grid>

                                    {selectedPrescription.instructions && (
                                        <Grid item xs={12}>
                                            <Typography variant="h6" gutterBottom>
                                                Дополнительные инструкции
                                            </Typography>
                                            <Typography variant="body2">
                                                {selectedPrescription.instructions}
                                            </Typography>
                                        </Grid>
                                    )}

                                    {selectedPrescription.warnings && selectedPrescription.warnings.length > 0 && (
                                        <Grid item xs={12}>
                                            <Typography variant="h6" gutterBottom color="warning">
                                                Предупреждения
                                            </Typography>
                                            {selectedPrescription.warnings.map((warning, index) => (
                                                <Chip
                                                    key={index}
                                                    label={warning.message}
                                                    color="warning"
                                                    sx={{ mr: 1, mb: 1 }}
                                                />
                                            ))}
                                        </Grid>
                                    )}
                                </Grid>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => setSelectedPrescription(null)}>
                                    Закрыть
                                </Button>
                                <Button
                                    variant="contained"
                                    onClick={() => {
                                        setSelectedPrescription(null);
                                        handleEdit(selectedPrescription.id);
                                    }}
                                >
                                    Редактировать
                                </Button>
                            </DialogActions>
                        </>
                    )}
                </Dialog>

                {/* Диалог подтверждения удаления */}
                <Dialog
                    open={deleteDialogOpen}
                    onClose={() => setDeleteDialogOpen(false)}
                >
                    <DialogTitle>Подтверждение удаления</DialogTitle>
                    <DialogContent>
                        <Typography>
                            Вы уверены, что хотите удалить это назначение? Это действие нельзя отменить.
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setDeleteDialogOpen(false)}>
                            Отмена
                        </Button>
                        <Button
                            onClick={confirmDelete}
                            color="error"
                            variant="contained"
                            disabled={deleteMutation.isLoading}
                        >
                            {deleteMutation.isLoading ? <CircularProgress size={24} /> : 'Удалить'}
                        </Button>
                    </DialogActions>
                </Dialog>
            </Container>
        </Box>
    );
};

export default PrescriptionListPage;
