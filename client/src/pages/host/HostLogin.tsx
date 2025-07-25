import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import { isLoggedIn, logIn } from "./auth";

const HostLogin = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const response = logIn(password);
    response.then((res) => {
      if (res === 401) {
        setError("Invalid password. Please try again.");
      } else if (res === 0) {
        setError("");
        navigate("/host");
      } else {
        setError("An unexpected error occurred. Please try again later.");
      }
    });
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  if (isLoggedIn()) {
    // If already logged in, redirect to the host page
    navigate("/host");
  }

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
          Host Login
        </Typography>
        <Box
          sx={{
            justifyContent: "center",
            display: "flex",
            alignItems: "center",
          }}
        >
          <TextField
            id="input-password"
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
            label="Password"
            type="password"
            variant="filled"
            required
            error={password === ""}
            helperText={password === "" ? "Field cannot be empty" : ""}
            onChange={handlePasswordChange}
            onKeyDown={(event) => {
              if (event.key == "Enter") {
                event.preventDefault();
                handleLogin();
              }
            }}
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
            onClick={handleLogin}
          >
            Submit
          </Button>
        </Box>
        {error && (
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
        )}
      </Card>
    </Box>
  );
};

export default HostLogin;
