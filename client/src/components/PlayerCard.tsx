import React from "react";
import { Box, IconButton, Typography } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { useGameContext } from "../pages/host/GameContext";

interface PlayerCardProps {
  name: string;
  bank: number;
  isBlurred: boolean;
}

const PlayerCard: React.FC<PlayerCardProps> = ({ name }) => {
  const {
    getActiveQuestion,
    setActiveQuestion,
    setActiveQuestionCompleted,
    gameState,
    players,
    buzzedPlayer,
    resetBuzzedPlayer,
    nextBuzzedPlayer,
    updatePlayer,
  } = useGameContext();
  const activeQuestion = getActiveQuestion();

  const player = gameState?.players.find((p) => p.name === name);
  const bank = player.bank || 0;
  const isBlurred = !players.includes(name);

  const onPlayerCorrect = () => {
    player.bank += activeQuestion?.value || 0;
    updatePlayer(player).then(() => {
      console.log(`Updated player ${name} bank to ${player.bank}`);
    });
    resetBuzzedPlayer();
    setActiveQuestionCompleted().then(() => {
      console.log(`Set active question completed`);
      setActiveQuestion(null);
    });
  };

  const onPlayerWrong = () => {
    player.bank -= activeQuestion?.value || 0;
    updatePlayer(player).then(() => {
      console.log(`Updated player ${name} bank to ${player.bank}`);
    });
    nextBuzzedPlayer();
  };

  return (
    <Box
      sx={{
        p: 2,
        m: 1,
        borderRadius: 2,
        backgroundColor: buzzedPlayer === name ? "red" : "secondary.main",
        color: "primary.contrastText",
        boxShadow: 3,
        textAlign: "center",
        width: "120px",
        opacity: isBlurred ? 0.5 : 1,
        filter: isBlurred ? "blur(2px)" : "none",
        transition: "opacity 0.3s, filter 0.3s",
        position: "relative",
        "&:hover .action-buttons": {
          display: activeQuestion ? "flex" : "none",
        },
      }}
    >
      <Typography variant="h6" noWrap>
        {name}
      </Typography>
      <Typography variant="body2">Bank: ${bank}</Typography>

      {/* Action buttons (only visible on hover if activeQuestion is true) */}
      <Box
        className="action-buttons"
        sx={{
          display: "none",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          gap: 1,
        }}
      >
        <IconButton
          sx={{
            backgroundColor: "success.main",
            color: "white",
            "&:hover": { backgroundColor: "success.dark" },
          }}
          onClick={onPlayerCorrect}
        >
          <CheckIcon />
        </IconButton>
        <IconButton
          sx={{
            backgroundColor: "error.main",
            color: "white",
            "&:hover": { backgroundColor: "error.dark" },
          }}
          onClick={onPlayerWrong}
        >
          <CloseIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default PlayerCard;
