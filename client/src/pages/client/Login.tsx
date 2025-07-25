import { useContext, useState } from 'react';
import { PlayerContext } from "./PlayerContext";
import Card from '@mui/material/Card';
import { Button, TextField, Typography, Box } from "@mui/material";

const Login = () => {
  const { currentPlayer, login, logout } = useContext(PlayerContext);
  const [playerName, setPlayerName] = useState(null);

  const handleTextFieldChange = (event) => {
    event.preventDefault();
    setPlayerName(event.target.value);
  }

  const submitHandler = (event) => {
    event.preventDefault();
    if (playerName) {
      login(playerName);
    }
  }

  return (
    <Box sx={{ justifyContent: 'center', display: 'flex', alignItems: 'center', height: '100vh' }}>
      <Card sx={{ width: 300, padding: 2 }}>
        <Typography variant="h4" align="center" sx={{ marginTop: 1, fontFamily: "Korinna" }}>
          Enter Name
        </Typography>
        <Box sx={{ justifyContent: 'center', display: 'flex', alignItems: 'center' }}>
          <TextField
            id="input-name"
            sx={{
              marginTop: 3,
              fontFamily: "Korinna",
              "& .MuiInputBase-input": {
                fontFamily: "Korinna",
              },
              "& .MuiInputLabel-root": {
                fontFamily: "Korinna",
              },
            }}
            label="Name"
            variant="filled"
            required
            error={playerName === ''}
            helperText={playerName === '' ? 'Field cannot be empty' : ''}
            onChange={(e) => handleTextFieldChange(e)}
          />
        </Box>
        <Box sx={{ justifyContent: 'center', display: 'flex', alignItems: 'center' }}>
          <Button
            variant="contained"
            sx={{ marginTop: 3, fontFamily: "Korinna", fontSize: 15 }}
            onClick={(e) => submitHandler(e)}
          >
            Submit
          </Button>
        </Box>
      </Card>
    </Box>
  )
}

export default Login;