import React from "react";
import { useGameContext } from "../pages/host/GameContext";
import { Box, Container } from "@mui/material";
import GameCard from "./GameCard";

const GameBoard = ({
  selectedBoard = "board1",
}: {
  selectedBoard: "board1" | "board2";
}) => {
  const { gameState } = useGameContext();
  const categories = gameState?.phase[selectedBoard]?.categories || [];

  const onQuestionClick = (categoryName: string, questionValue: number) => {
    console.log(`Question clicked: ${categoryName} - $${questionValue}`);

    const question = categories
      .find((category) => category.name === categoryName)
      .questions.find((q) => q.value === questionValue);

    // Implement showing of question dialog.
  };

  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{
        height: "100%",
        display: "flex",
        overflow: "hidden",
        px: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flex: 1,
          height: "100%",
          width: "100%",
          gap: 2,
        }}
      >
        {categories.map((category) => (
          <Box
            key={category.name}
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            {/* Category Name */}
            <GameCard isHeader>{category.name}</GameCard>

            {/* Questions */}
            {category.questions.map((question, index) => (
              <GameCard
                key={category.name + index}
                available={question.available}
                onClick={() => {
                  if (question.available) {
                    // handle question click here if needed
                    onQuestionClick(category.name, question.value);
                  }
                }}
              >
                {question.value === -1 ? "???" : "$" + question.value}
              </GameCard>
            ))}
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default GameBoard;
