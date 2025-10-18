import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Button,
  Grid,
  Divider,
} from '@mui/material';
import {
  Assignment,
  Warning,
  CheckCircle,
  Schedule,
} from '@mui/icons-material';
import { Prescription } from '../../types/prescription';

interface ActivePrescriptionsProps {
  prescriptions: Prescription[];
  onViewDetails: (id: number) => void;
  onEdit: (id: number) => void;
}

const ActivePrescriptions: React.FC<ActivePrescriptionsProps> = ({
  prescriptions,
  onViewDetails,
  onEdit,
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'completed':
        return 'primary';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle />;
      case 'completed':
        return <Schedule />;
      case 'cancelled':
        return <Warning />;
      default:
        return <Assignment />;
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Текущие назначения
        </Typography>
        
        {prescriptions.length === 0 ? (
          <Box textAlign="center" sx={{ py: 4 }}>
            <Assignment sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
            <Typography variant="body1" color="text.secondary">
              Нет активных назначений
            </Typography>
          </Box>
        ) : (
          <Box>
            {prescriptions.map((prescription) => (
              <Box key={prescription.id} sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" gutterBottom>
                      {prescription.recommended_medications?.[0]?.medication || 'Назначение'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {prescription.recommended_medications?.[0]?.dosage} | 
                      {prescription.recommended_medications?.[0]?.frequency} | 
                      {prescription.duration}
                    </Typography>
                    <Typography variant="body2" paragraph>
                      {prescription.instructions}
                    </Typography>
                  </Box>
                  <Box sx={{ ml: 2 }}>
                    <Chip
                      icon={getStatusIcon(prescription.status)}
                      label={prescription.status}
                      color={getStatusColor(prescription.status) as any}
                      size="small"
                    />
                  </Box>
                </Box>
                
                {prescription.warnings && prescription.warnings.length > 0 && (
                  <Box sx={{ mb: 1 }}>
                    {prescription.warnings.map((warning, index) => (
                      <Chip
                        key={index}
                        label={warning.message}
                        color="warning"
                        size="small"
                        sx={{ mr: 1, mb: 1 }}
                      />
                    ))}
                  </Box>
                )}
                
                <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => onViewDetails(prescription.id)}
                  >
                    Подробнее
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => onEdit(prescription.id)}
                  >
                    Редактировать
                  </Button>
                </Box>
                
                <Divider sx={{ mt: 2 }} />
              </Box>
            ))}
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default ActivePrescriptions;
