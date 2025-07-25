import {useState, useEffect, useContext} from 'react';
import {Box, Typography, Button, AppBar, Toolbar, Container} from '@mui/material';
import {socket} from '../../socket';
import {ConnectionContext} from "./ConnectionContext";


function Home() {
  const {currentPlayer, isBuzzed, lockedOut, handleBuzz, updateStatus, logout} = useContext(ConnectionContext);

  // Refresh the status when the component mounts
  useEffect(() => {
    if (!currentPlayer) return;
    updateStatus();
  }, []);

  const handleLogout = (event) => {
    event.preventDefault();
    logout();
  };

  return (
    <Container>
      <Box
        sx={{
          minHeight: '100vh',
          backgroundColor: 'background.default',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: 4,
          p: 4,
        }}
      >
        <AppBar>
          <Toolbar>
            <Button color="inherit" variant="contained" onClick={(e) => handleLogout(e)}>Logout</Button>
            <Typography
              variant="h3"
              color="secondary"
              sx={{
                fontWeight: 'bold',
                textTransform: 'uppercase',
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)'
              }}
            >
              {currentPlayer}
            </Typography>
          </Toolbar>
        </AppBar>


        <Button
          variant="contained"
          color={isBuzzed ? 'success' : 'secondary'}
          onClick={handleBuzz}
          disabled={lockedOut || isBuzzed}
          sx={{
            width: '240px',
            height: '200px',
            fontSize: '2rem',
            fontWeight: 'bold',
            borderRadius: '12px',
            boxShadow: '0px 4px 12px rgba(0,0,0,0.4)',
            '&:disabled': {
              backgroundColor: lockedOut ? '#880000' : '#007E33',
              color: '#fff',
            },
          }}
        >
          {lockedOut ? 'Locked Out' : isBuzzed ? 'Already Buzzed!' : 'Buzz'}
        </Button>
      </Box>
    </Container>
  );
}

export default Home;
