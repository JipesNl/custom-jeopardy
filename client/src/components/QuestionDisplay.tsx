import { Box, Button, Container, Paper, Typography } from "@mui/material";
import { useGameContext } from "../pages/host/GameContext";
import { useState } from "react";

const QuestionDisplay = () => {
  const { getActiveQuestion } = useGameContext();
  const [showAnswer, setShowAnswer] = useState(false);
  const question = getActiveQuestion();

  if (!question) {
    return (
      <Container sx={{ textAlign: "center", mt: 10 }}>
        <Typography variant="h4" color="text.secondary">
          Waiting for a question...
        </Typography>
      </Container>
    );
  }

  return (
    <Container
      maxWidth="md"
      sx={{
        mt: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={4}
        sx={{
          backgroundColor: "background.paper",
          padding: 4,
          borderRadius: 3,
          textAlign: "center",
          width: "100%",
          height: "70vh", // Fixed height to ensure it fits within the viewport
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h4"
          color="secondary"
          gutterBottom
          sx={{ fontWeight: "bold", flexShrink: 0 }}
        >
          ${question.value}
        </Typography>

        <Box
          sx={{
            mt: 3,
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "left",
            overflow: "hidden", // Prevent overflow
            transform: "scale(1)", // Default scale
            width: "100%",
            height: "100%",
          }}
          dangerouslySetInnerHTML={{
            __html: showAnswer ? question.answer : question.question,
          }}
        />
        {!showAnswer && (
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 3 }}
            onClick={() => setShowAnswer(true)}
          >
            Show Answer
          </Button>
        )}
      </Paper>
    </Container>
  );
};

export default QuestionDisplay;
