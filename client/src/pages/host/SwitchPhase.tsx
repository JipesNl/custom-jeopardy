import { useGameContext } from "./GameContext";
import { Button } from "@mui/material";
import React from "react";

export const SwitchPhase = () => {
  const { isCurrentPhaseComplete, nextPhase, setActiveQuestion, gameState } =
    useGameContext();

  if (!isCurrentPhaseComplete()) {
    return null; // Don't render anything if the phase is not complete
  }

  return (
    <Button
      variant="contained"
      color="primary"
      onClick={async () => {
        await nextPhase();
      }}
      sx={{ margin: "16px" }}
    >
      Next Board
    </Button>
  );
};
