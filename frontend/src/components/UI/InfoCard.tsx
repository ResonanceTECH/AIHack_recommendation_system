import React from 'react';
import {
  Card,
  CardContent,
  Box,
  Typography,
  Link,
} from '@mui/material';

interface InfoCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  linkText?: string;
  linkHref?: string;
  onLinkClick?: () => void;
}

const InfoCard: React.FC<InfoCardProps> = ({
  icon,
  title,
  description,
  linkText,
  linkHref,
  onLinkClick,
}) => {
  return (
    <Card
      sx={{
        borderRadius: 2,
        border: 'none',
        boxShadow: 'none',
        backgroundColor: '#ffffff',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
          transform: 'translateY(-1px)',
        },
      }}
    >
      <CardContent sx={{ p: 4, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Иконка в синем квадрате */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
            mb: 3,
          }}
        >
          <Box
            sx={{
              width: 48,
              height: 48,
              backgroundColor: '#1976d2',
              borderRadius: 1.5,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mr: 3,
              color: '#ffffff',
              flexShrink: 0,
            }}
          >
            {icon}
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="h5"
              component="h3"
              sx={{
                fontFamily: 'CeraPro, Roboto, Arial, sans-serif',
                fontWeight: 700,
                color: '#2c2c2c',
                fontSize: '1.25rem',
                mb: 2,
                lineHeight: 1.3,
              }}
            >
              {title}
            </Typography>
          </Box>
        </Box>

        {/* Описание */}
        <Typography
          variant="body1"
          sx={{
            color: '#2c2c2c',
            lineHeight: 1.6,
            mb: 3,
            flexGrow: 1,
            fontSize: '1rem',
          }}
        >
          {description}
        </Typography>

        {/* Ссылка */}
        {linkText && (
          <Box sx={{ mt: 'auto' }}>
            {linkHref ? (
              <Link
                href={linkHref}
                sx={{
                  color: '#1976d2',
                  textDecoration: 'underline',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  '&:hover': {
                    color: '#1565c0',
                    textDecoration: 'underline',
                  },
                }}
              >
                {linkText}
              </Link>
            ) : (
              <Link
                component="button"
                onClick={onLinkClick}
                sx={{
                  color: '#1976d2',
                  textDecoration: 'underline',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  border: 'none',
                  background: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  '&:hover': {
                    color: '#1565c0',
                    textDecoration: 'underline',
                  },
                }}
              >
                {linkText}
              </Link>
            )}
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default InfoCard;
