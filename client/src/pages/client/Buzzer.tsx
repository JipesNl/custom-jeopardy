import {useState, useEffect, useContext} from 'react';
import {Box, Typography, Button, AppBar, Toolbar, Container} from '@mui/material';
import {socket} from '../../socket';
import {PlayerContext} from "./PlayerContext";

const getPlayerID = () => {
  const playerID = sessionStorage.getItem('playerID');
  return playerID ? JSON.parse(playerID) : null;
}

function Home() {
  const [isBuzzed, setIsBuzzed] = useState(false);
  const [lockedOut, setLockedOut] = useState(false);
  const [playerID, setPlayerID] = useState(getPlayerID());
  const {currentPlayer, logout} = useContext(PlayerContext);

  useEffect(() => {
    sessionStorage.setItem('playerID', JSON.stringify(playerID));
  }, [playerID]);

  useEffect(() => {
    socket.connect();

    function onConnect() {
      socket.emit('join', 'player', playerName);
    }

    function onDisconnect() {

    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    // Clean up the event listeners on component unmount
    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    }
  }, []);

  // Hardcoded player name
  const playerName = currentPlayer || 'Player ' + (playerID || 1);

  const handleBuzz = () => {
    if (!lockedOut && !isBuzzed) {
      setIsBuzzed(true);
      socket.emit('buzz', playerName);
    }
  };

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
              {playerName}
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
            height: '100px',
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
          {lockedOut ? 'Locked Out' : isBuzzed ? 'Buzzed!' : 'Buzz'}
        </Button>
      </Box>
    </Container>
  );
}

export default Home;
