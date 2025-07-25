import React from "react";
import { Box, Button, Container, IconButton } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { logOut } from "./auth";
import { useGameContext } from "./GameContext";
import GameBoard from "../../components/GameBoard";

const BoardPage = () => {
  const { gameState, updateState } = useGameContext();
  const handleGetState = (event) => {
    event.preventDefault();
    console.log(gameState);
    // console.log("Updated Game State:", gameState);
  };

  return (
    <Container>
      <IconButton
        onClick={(e) => {
          e.preventDefault();
          logOut();
        }}
        sx={{
          position: "fixed",
          top: 16, // Add some spacing from the top
          left: 16, // Add some spacing from the left
          backgroundColor: "secondary.main", // Use the secondary color
          color: "primary.contrastText", // Ensure the icon is visible
          width: 48, // Set width for the circular shape
          height: 48, // Set height for the circular shape
          borderRadius: "50%", // Make it a circle
          "&:hover": {
            backgroundColor: "secondary.dark", // Darken the color on hover
          },
        }}
      >
        <LogoutIcon color="primary" />
      </IconButton>
      <Box
        sx={{
          width: "100%",
          maxHeight: "85vh", // Ensure it does not exceed 60%
          minHeight: "50px", // Optional: Set a minimum height
          position: "fixed",
          top: 0,
          left: 0,
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          overflow: "hidden", // Prevent content from overflowing
        }}
      >
        <GameBoard />
      </Box>
      <Box
        sx={{
          backgroundColor: "primary.main",
          width: "100%",
          height: "15%",
          minHeight: "50px",
          position: "fixed",
          bottom: 0,
          left: 0,
        }}
      >
        <Button variant="contained" onClick={handleGetState}>
          Get State
        </Button>
      </Box>
    </Container>
  );
};

export default BoardPage;
