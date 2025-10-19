import React from 'react';
import { Container, Box } from '@mui/material';
import Header from '../components/Layout/Header';
import AIRecommendationExamples from '../components/AI/AIRecommendationExamples';

const AIExamplesPage: React.FC = () => {
    return (
        <Box>
            <Header />
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <AIRecommendationExamples />
            </Container>
        </Box>
    );
};

export default AIExamplesPage;
