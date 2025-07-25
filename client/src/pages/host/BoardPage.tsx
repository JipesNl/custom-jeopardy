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
      <Box
        sx={{
          width: "100%",
          height: "85vh",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <Box sx={{ p: 2 }}>
          <IconButton
            onClick={(e) => {
              e.preventDefault();
              logOut();
            }}
            sx={{
              position: "fixed",
              top: 16,
              left: 16,
              zIndex: 10, // ensure it floats above other content
              backgroundColor: "secondary.main",
              color: "primary.contrastText",
              width: 48,
              height: 48,
              borderRadius: "50%",
              boxShadow: 3,
              "&:hover": {
                backgroundColor: "secondary.dark",
              },
            }}
          >
            <LogoutIcon />
          </IconButton>
        </Box>
        <Box sx={{ flex: 1, px: 2, pb: 2 }}>
          <GameBoard />
        </Box>
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
