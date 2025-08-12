import React from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { useGameContext } from "./GameContext";

const Leaderboard = () => {
  const { gameState } = useGameContext();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "primary.light",
        p: 4,
      }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        Leaderboard
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: "100%",
          maxWidth: "400px",
        }}
      >
        {gameState.players
          .sort((a, b) => b.bank - a.bank) // Sort players by bank in descending order
          .map((player, index) => (
            <Card
              key={player.name}
              sx={{
                backgroundColor: index === 0 ? "gold" : "secondary.main",
                color: "primary.contrastText",
                boxShadow: 3,
                borderRadius: 2,
                p: 2,
              }}
            >
              <CardContent>
                <Typography
                  variant="h5"
                  align="center"
                  sx={{ fontWeight: "bold" }}
                >
                  {player.name}
                </Typography>
                <Typography
                  variant="h6"
                  align="center"
                  sx={{ mt: 1, fontStyle: "italic" }}
                >
                  ${player.bank} points
                </Typography>
                {index === 0 && (
                  <Typography
                    variant="body2"
                    align="center"
                    sx={{ mt: 1, fontWeight: "bold" }}
                  >
                    🏆 Winner!
                  </Typography>
                )}
              </CardContent>
            </Card>
          ))}
      </Box>
    </Box>
  );
};

export default Leaderboard;
