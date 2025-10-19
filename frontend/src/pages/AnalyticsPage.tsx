import React from 'react';
import { Container, Box, CircularProgress, Alert } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { patientApi, prescriptionApi } from '../services/api';
import Header from '../components/Layout/Header';
import BackButton from '../components/UI/BackButton';
import PatientAnalytics from '../components/Analytics/PatientAnalytics';

const AnalyticsPage: React.FC = () => {
    const { data: patients = [], isLoading: patientsLoading, error: patientsError } = useQuery({
        queryKey: ['patients'],
        queryFn: patientApi.getPatients
    });

    const { data: prescriptions = [], isLoading: prescriptionsLoading, error: prescriptionsError } = useQuery({
        queryKey: ['prescriptions'],
        queryFn: prescriptionApi.getPrescriptions
    });

    const isLoading = patientsLoading || prescriptionsLoading;
    const error = patientsError || prescriptionsError;

    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box>
                <Header />
                <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                    <Alert severity="error">
                        Ошибка загрузки данных для аналитики
                    </Alert>
                </Container>
            </Box>
        );
    }

    return (
        <Box>
            <Header />
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <BackButton
                    onClick={() => window.history.back()}
                    text="Назад"
                />
                <PatientAnalytics patients={patients} prescriptions={prescriptions} />
            </Container>
        </Box>
    );
};

export default AnalyticsPage;
