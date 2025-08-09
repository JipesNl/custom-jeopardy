import React from "react";
import { Box } from "@mui/material";
import PlayerCard from "./PlayerCard";
import { useGameContext } from "../pages/host/GameContext";

const PlayerList: React.FC = () => {
  const { gameState, players } = useGameContext();

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        p: 1,
        mb: 0,
      }}
    >
      {gameState?.players.map((player) => (
        <PlayerCard key={player.name} name={player.name} />
      ))}
    </Box>
  );
};

export default PlayerList;
