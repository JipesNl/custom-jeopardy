import React from "react";
import { Box, Button, Container, IconButton } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { logOut } from "./auth";
import { useGameContext } from "./GameContext";
import PlayerList from "../../components/PlayerList";
import QuestionDisplay from "../../components/QuestionDisplay";
import GameBoard from "../../components/GameBoard";
import Leaderboard from "./Leaderboard";
import { SwitchPhase } from "./SwitchPhase";

const BoardPage = () => {
  const {
    getActiveQuestion,
    resetBuzzedPlayer,
    isCurrentPhaseComplete,
    gameState,
  } = useGameContext();

  function GameView() {
    let content: React.ReactNode;

    if (isCurrentPhaseComplete()) {
      content = <SwitchPhase />;
    } else if (gameState.currentPhase === "final") {
      content = <QuestionDisplay />;
    } else if (gameState.currentPhase === "leaderboard") {
      content = <Leaderboard />;
    } else if (getActiveQuestion() !== null) {
      content = <QuestionDisplay />;
    } else {
      content = (
        <Box sx={{ flex: 1, px: 2, pb: 2 }}>
          <GameBoard selectedBoard={gameState.currentPhase} />
        </Box>
      );
    }

    return content;
  }

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
              zIndex: 10,
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
        {GameView()}
      </Box>
      {/* FOOTER: contains players and a button */}
      <Box
        sx={{
          backgroundColor: "primary.main",
          width: "100%",
          height: "15%",
          minHeight: "50px",
          position: "fixed",
          bottom: 0,
          left: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 2,
        }}
      >
        <PlayerList />
        <Button
          variant="contained"
          color="secondary"
          sx={{
            height: "40px",
            alignSelf: "center",
          }}
          onClick={() => {
            resetBuzzedPlayer();
          }}
        >
          Action
        </Button>
      </Box>
    </Container>
  );
};

export default BoardPage;
