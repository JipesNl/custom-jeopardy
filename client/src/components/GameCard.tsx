import { Question } from "../pages/host/GameStateType";
import { Paper } from "@mui/material";

const GameCard = ({
  category,
  question,
}: {
  category: string;
  question: Question;
}) => {
  return (
    <Paper
      sx={{
        padding: "5px",
        paddingX: "10px",
        borderRadius: "5px",
      }}
    >
      Test
    </Paper>
  );
};

export default GameCard;
