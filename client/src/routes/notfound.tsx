import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: 'background.default',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: 4,
      }}
    >
      <Container maxWidth="sm">
        <Typography variant="h1" color="secondary" gutterBottom>
          404
        </Typography>
        <Typography variant="h4" color="text.primary" gutterBottom>
          Page Not Found
        </Typography>
        <Typography variant="body1" color="text.secondary" mb={4}>
          Looks like you’re lost in the game board. Try heading back home.
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          onClick={() => navigate('/')}
          sx={{
            fontWeight: 'bold',
            fontSize: '1rem',
            boxShadow: '0 4px 10px rgba(0,0,0,0.4)',
            '&:hover': {
              backgroundColor: '#e6b800',
            },
          }}
        >
          Back to Home
        </Button>
      </Container>
    </Box>
  );
}

export default NotFound;
