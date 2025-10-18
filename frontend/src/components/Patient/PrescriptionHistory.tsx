import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
} from '@mui/material';
import {
  Search,
  Visibility,
  Edit,
  Assignment,
} from '@mui/icons-material';
import { Prescription } from '../../types/prescription';

interface PrescriptionHistoryProps {
  prescriptions: Prescription[];
  onViewDetails: (id: number) => void;
  onEdit: (id: number) => void;
}

const PrescriptionHistory: React.FC<PrescriptionHistoryProps> = ({
  prescriptions,
  onViewDetails,
  onEdit,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  const filteredPrescriptions = prescriptions
    .filter((prescription) => {
      const matchesSearch = prescription.recommended_medications?.some(med =>
        med.name.toLowerCase().includes(searchTerm.toLowerCase())
      ) || prescription.instructions?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = statusFilter === 'all' || prescription.status === statusFilter;

      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        case 'medication':
          const medA = a.recommended_medications?.[0]?.name || '';
          const medB = b.recommended_medications?.[0]?.name || '';
          return medA.localeCompare(medB);
        case 'status':
          return a.status.localeCompare(b.status);
        default:
          return 0;
      }
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6">
            История назначений ({filteredPrescriptions.length})
          </Typography>
        </Box>

        {/* Фильтры и поиск */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              placeholder="Поиск по препарату или инструкции..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
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
          <Grid item xs={12} sm={3}>
            <FormControl fullWidth>
              <InputLabel>Сортировка</InputLabel>
              <Select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <MenuItem value="date">По дате</MenuItem>
                <MenuItem value="medication">По препарату</MenuItem>
                <MenuItem value="status">По статусу</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {/* Таблица назначений */}
        <TableContainer component={Paper} variant="outlined">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Дата</TableCell>
                <TableCell>Препарат</TableCell>
                <TableCell>Дозировка</TableCell>
                <TableCell>Статус</TableCell>
                <TableCell>Действия</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredPrescriptions.map((prescription) => (
                <TableRow key={prescription.id} hover>
                  <TableCell>
                    {formatDate(prescription.created_at)}
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" fontWeight="medium">
                      {prescription.recommended_medications?.[0]?.name || 'Не указано'}
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
                      label={prescription.status}
                      color={getStatusColor(prescription.status) as any}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton
                      size="small"
                      onClick={() => onViewDetails(prescription.id)}
                      title="Просмотр"
                    >
                      <Visibility />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => onEdit(prescription.id)}
                      title="Редактировать"
                    >
                      <Edit />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {filteredPrescriptions.length === 0 && (
          <Box textAlign="center" sx={{ py: 4 }}>
            <Assignment sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
            <Typography variant="body1" color="text.secondary">
              Назначения не найдены
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default PrescriptionHistory;
