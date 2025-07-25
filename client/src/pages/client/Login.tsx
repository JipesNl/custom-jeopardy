import { useContext, useState } from "react";
import { ConnectionContext } from "./ConnectionContext";
import Card from "@mui/material/Card";
import { Button, TextField, Typography, Box, Alert } from "@mui/material";
import { socket } from "../../socket";

const Login = () => {
  const { currentPlayer, login, logout } = useContext(ConnectionContext);
  const [playerName, setPlayerName] = useState(null);
  const [error, setError] = useState("");

  const handleLogin = () => {
    socket.connect();
    socket.emit("join-player", playerName, (response) => {
      if (response.success) {
        console.log("Successfully logged in as:", playerName);
        login(playerName);
      } else {
        setError(response.message || "Login failed");
      }
    });
  };

  const handleTextFieldChange = (event) => {
    event.preventDefault();
    setPlayerName(event.target.value);
  };

  return (
    <Box
      sx={{
        justifyContent: "center",
        display: "flex",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Card sx={{ width: 300, padding: 2 }}>
        <Typography
          variant="h4"
          align="center"
          sx={{ marginTop: 1, fontFamily: "Korinna" }}
        >
          Enter Name
        </Typography>
        <Box
          sx={{
            justifyContent: "center",
            display: "flex",
            alignItems: "center",
          }}
        >
          <TextField
            id="input-name"
            sx={{
              marginTop: 3,
              width: "90%",
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
            error={playerName === ""}
            helperText={playerName === "" ? "Field cannot be empty" : ""}
            onChange={(e) => handleTextFieldChange(e)}
          />
        </Box>
        <Box
          sx={{
            justifyContent: "center",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Button
            variant="contained"
            sx={{ marginTop: 3, fontFamily: "Korinna", fontSize: 15 }}
            onClick={(event) => handleLogin()}
          >
            Submit
          </Button>
        </Box>
        {error ? (
          <Box
            sx={{
              justifyContent: "center",
              display: "flex",
              alignItems: "center",
              marginTop: 2,
              width: "100%",
            }}
          >
            <Alert severity="error" sx={{ width: "90%" }}>
              {error}
            </Alert>
          </Box>
        ) : (
          <></>
        )}
      </Card>
    </Box>
  );
};

export default Login;
