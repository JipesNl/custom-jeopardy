import React from "react";
import { Box, Button, Container, IconButton } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { logOut } from "./auth";
import GameBoard from "../../components/GameBoard";
import { useGameContext } from "./GameContext";
import QuestionDisplay from "../../components/QuestionDisplay";

const BoardPage = () => {
  const { getActiveQuestion, setActiveQuestion } = useGameContext();
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
        {getActiveQuestion() !== null ? (
          <QuestionDisplay />
        ) : (
          <Box sx={{ flex: 1, px: 2, pb: 2 }}>
            <GameBoard selectedBoard="board1" />
          </Box>
        )}
      </Box>
      {/* FOOTER: contains players etc. */}
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
        <Button
          variant="contained"
          onClick={() => {
            setActiveQuestion({
              value: 100,
              question: `<p>Watch the following video and answer the question:</p>
<video width="100%" controls>
  <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>
`,
              answer: "Sample Answer",
              available: true,
            });
          }}
        >
          Set state
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            setActiveQuestion(null);
          }}
        >
          Set null
        </Button>
      </Box>
    </Container>
  );
};

export default BoardPage;
