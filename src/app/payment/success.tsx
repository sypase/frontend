'use client';

import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#90caf9',
        },
        background: {
            default: '#121212',
            paper: '#1d1d1d',
        },
        text: {
            primary: '#ffffff',
            secondary: '#b0bec5',
        },
    },
});

const PaymentSuccess: React.FC = () => {
    return (
        <ThemeProvider theme={darkTheme}>
            <Container style={{ textAlign: 'center', padding: '2rem' }}>
                <Typography variant="h4" gutterBottom>
                    Payment Successful!
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Thank you for your purchase. Your transaction has been completed successfully.
                </Typography>
                <Button variant="contained" color="primary" href="/">
                    Go to Homepage
                </Button>
            </Container>
        </ThemeProvider>
    );
};

export default PaymentSuccess;