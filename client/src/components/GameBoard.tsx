import React, { useEffect } from "react";
import { useGameContext } from "../pages/host/GameContext";
import { Box, Container } from "@mui/material";

const GameBoard = ({
  selectedBoard = "board1",
}: {
  selectedBoard: "board1" | "board2";
}) => {
  const { gameState } = useGameContext();
  let numberOfCategories = 0;

  useEffect(() => {
    try {
      numberOfCategories = Object.keys(
        gameState?.phase[selectedBoard].categories || {},
      ).length;
    } catch (error) {
      console.log(error);
    }
  }, [gameState]);

  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{
        height: "100%",
        // width: "100%",
        display: "flex",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          gap: 2,
          width: "100%",
          height: "100%",
          overflow: "hidden",
        }}
      >
        {gameState?.phase[selectedBoard].categories.map((category) => (
          <Box
            key={category.name}
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "stretch",
              overflow: "hidden",
              gap: 2,
            }}
          >
            <Box
              sx={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 1,
                backgroundColor: "background.paper",
                fontSize: "min(2vw, 2vh)", // scales to fit both width and height
                textAlign: "center",
                fontWeight: "bold",
                textTransform: "uppercase",
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
              }}
            >
              {category.name}
            </Box>

            {category.questions.map((question) => (
              <Box
                key={"" + category.name + question.value}
                sx={{
                  flex: 1,
                  width: "100%",
                  backgroundColor: question.available
                    ? "background.paper"
                    : "#ccc",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "clamp(1rem, 10vw, 5rem)",
                  fontWeight: "bold",
                  color: question.available ? "secondary.main" : "#666",
                  cursor: question.available ? "pointer" : "not-allowed",
                  maxHeight: "100%", // Prevents the question box from exceeding its container
                  overflow: "hidden", // Ensures no content spills out
                }}
                onClick={() => {
                  if (question.available) {
                    // Handle question selection logic here
                    console.log(
                      `Selected question: ${category.name} - $${question.value}`,
                    );
                  }
                }}
              >
                {question.value === -1 ? "???" : "$" + question.value}
              </Box>
            ))}
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default GameBoard;
