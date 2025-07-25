import React from "react";
import { useGameContext } from "../pages/host/GameContext";
import { Box, Container, Grid } from "@mui/material";
import GameCard from "./GameCard";

const GameBoard = () => {
  const { gameState } = useGameContext();
  const numberOfCategories = gameState?.categories?.length || 0;
  console.log(gameState);
  return (
    <Container>
      TEST
      <Box
        sx={{
          border: "solid black 10px",
          borderRadius: "10px",
        }}
      >
        <Grid container spacing={2}>
          <GameCard
            category="AMQ but not really AMQ"
            question={{
              value: 1000,
              question: "what is this?",
              answer: "no clue",
              available: true,
            }}
          />
        </Grid>
      </Box>
    </Container>
  );
};

export default GameBoard;
