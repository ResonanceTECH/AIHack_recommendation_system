import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
} from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface MonitoringData {
  date: string;
  value: number;
  normal_min: number;
  normal_max: number;
}

interface MonitoringChartProps {
  title: string;
  data: MonitoringData[];
  parameter: string;
  unit: string;
  normalRange: { min: number; max: number };
}

const MonitoringChart: React.FC<MonitoringChartProps> = ({
  title,
  data,
  parameter,
  unit,
  normalRange,
}) => {
  const latestValue = data[data.length - 1]?.value;
  const isInRange = latestValue >= normalRange.min && latestValue <= normalRange.max;

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">{title}</Typography>
          <Chip
            label={isInRange ? 'В норме' : 'Отклонение'}
            color={isInRange ? 'success' : 'warning'}
            size="small"
          />
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="h4" color={isInRange ? 'success.main' : 'warning.main'}>
            {latestValue} {unit}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Норма: {normalRange.min} - {normalRange.max} {unit}
          </Typography>
        </Box>

        <Box sx={{ height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip
                formatter={(value: number) => [`${value} ${unit}`, parameter]}
                labelFormatter={(date) => `Дата: ${date}`}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#1976d2"
                strokeWidth={2}
                dot={{ r: 4 }}
                name={parameter}
              />
              <Line
                type="monotone"
                dataKey="normal_min"
                stroke="#4caf50"
                strokeDasharray="5 5"
                name="Нижняя граница нормы"
              />
              <Line
                type="monotone"
                dataKey="normal_max"
                stroke="#4caf50"
                strokeDasharray="5 5"
                name="Верхняя граница нормы"
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
};

export default MonitoringChart;
