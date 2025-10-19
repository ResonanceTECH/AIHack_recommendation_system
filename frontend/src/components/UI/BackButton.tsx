import React from 'react';
import { Button, Box } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

interface BackButtonProps {
    onClick?: () => void;
    text?: string;
    sx?: any;
}

const BackButton: React.FC<BackButtonProps> = ({
    onClick,
    text = 'Назад',
    sx = {}
}) => {
    const navigate = useNavigate();

    const handleClick = () => {
        if (onClick) {
            onClick();
        } else {
            navigate(-1); // Возврат на предыдущую страницу
        }
    };

    return (
        <Box sx={{ mb: 2, ...sx }}>
            <Button
                variant="outlined"
                startIcon={<ArrowBack />}
                onClick={handleClick}
                sx={{
                    textTransform: 'none',
                    fontWeight: 500,
                }}
            >
                {text}
            </Button>
        </Box>
    );
};

export default BackButton;
