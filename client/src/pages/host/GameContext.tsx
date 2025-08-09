import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { GameState, Player, Question } from "./GameStateType";
import { Box, CircularProgress } from "@mui/material";
import { socket } from "../../socket";

interface GameContext {
  gameState: GameState; // Define a more specific type if possible
  players: string[];
  buzzedPlayer: string | null;
  resetBuzzedPlayer: () => void;
  nextBuzzedPlayer: () => void;
  updateState: () => void;
  getActiveQuestion: () => Question | null;
  setActiveQuestion: (
    question: {
      board: string;
      categoryName: string;
      questionValue: number;
    } | null,
  ) => void;
  setActiveQuestionCompleted: () => Promise<void>;
  updatePlayer: (newPlayer: Player) => Promise<void>;
}

const getServerState = async () => {
  const response = await axios
    .get("/api/host/game-state", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .catch((error) => {
      console.error("Error fetching game state:", error);
      if (error.response.status === 401) {
        localStorage.removeItem("token");
        window.location.reload(); // Redirect to login or home page
      }
      return null;
    });
  return response.data.gameState as GameState;
};

const setServerState = async (newState: GameState) => {
  await axios
    .post("/api/host/game-state", newState, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .catch((error) => {
      console.error("Error setting game state:", error);
      if (error.response.status === 401) {
        localStorage.removeItem("token");
        window.location.reload(); // Redirect to login or home page
      }
    });
};

const getServerPlayers = async () => {
  const response = await axios
    .get("/api/host/players", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .catch((error) => {
      console.error("Error fetching players:", error);
      if (error.response.status === 401) {
        localStorage.removeItem("token");
        window.location.reload(); // Redirect to login or home page
      }
      return null;
    });
  return response.data.players as string[];
};

const GameContext = createContext<GameContext | null>(null);

const GameProvider = ({ children }: { children: React.ReactNode }) => {
  const [gameState, setGameState] = useState<GameState>(null);
  const [initialLoad, setInitialLoad] = useState(true);
  const [players, setPlayers] = useState<string[]>([]);
  const [buzzedPlayer, setBuzzedPlayer] = useState<string | null>(null);

  const updateState = () => {
    getServerState().then((newState) => {
      console.log("Fetched Game State:", newState);
      if (newState) {
        setGameState(newState);
        setInitialLoad(false);
      }
    });
  };

  const updatePlayers = () => {
    getServerPlayers().then((newPlayers) => {
      console.log("Fetched Players:", newPlayers);
      if (newPlayers) {
        setPlayers(newPlayers);
      }
    });
  };

  const onPlayerJoined = () => {
    console.log("Player joined event received");
    updatePlayers();
    updateState();
  };

  const onBuzzedPlayer = (playerName: string) => {
    console.log("Buzzed player:", playerName);
    setBuzzedPlayer(playerName);
  };

  useEffect(() => {
    socket.on("player-changed", onPlayerJoined);
    socket.on("buzzed", onBuzzedPlayer);

    return () => {
      socket.off("player-changed", onPlayerJoined);
      socket.off("buzzed", onBuzzedPlayer);
    };
  }, []);

  const setState = async (newState: GameState) => {
    await setServerState(newState);
    updateState();
  };

  const getActiveQuestion = () => {
    if (!gameState || !gameState.currentQuestion) {
      return null;
    }

    const { currentQuestion } = gameState;

    if (currentQuestion.board === "final") {
      return gameState.phase.final;
    }

    const { board, categoryName, questionValue } = currentQuestion;
    const category = gameState.phase[board]?.categories.find(
      (cat) => cat.name === categoryName,
    );
    if (!category) {
      return null;
    }
    const question = category.questions.find(
      (q) => q.value === questionValue && q.available,
    );
    if (!question) {
      return null;
    }
    return question;
  };

  const setActiveQuestion = async (
    path: { board: string; categoryName: string; questionValue: number } | null,
  ) => {
    const newState = { ...gameState, currentQuestion: path };
    await setState(newState);
  };

  const updatePlayer = async (newPlayer: Player) => {
    const newPlayers = gameState.players.map((player) =>
      player.name === newPlayer.name ? newPlayer : player,
    );
    const newGameState = {
      ...gameState,
      newPlayers,
    };
    await setState(newGameState);
  };

  const setActiveQuestionCompleted = async () => {
    if (!gameState || !gameState.currentQuestion) return;

    const { currentQuestion } = gameState;

    const updatedGameState = { ...gameState };

    if (currentQuestion.board === "final") {
      // Handle the final question
      updatedGameState.phase.final.available = false;
    } else {
      // Handle regular questions
      const { board, categoryName, questionValue } = currentQuestion;
      const category = updatedGameState.phase[board]?.categories.find(
        (cat) => cat.name === categoryName,
      );

      if (category) {
        const question = category.questions.find(
          (q) => q.value === questionValue,
        );
        if (question) {
          question.available = false;
        }
      }
    }

    // Update the game state
    await setState(updatedGameState);
  };

  const resetBuzzedPlayer = () => {
    console.log("Resetting buzzed player");
    setBuzzedPlayer(null);
    socket.emit("reset-buzz");
  };

  const nextBuzzedPlayer = () => {
    console.log("Moving to next buzzed player");
    setBuzzedPlayer(null);
    socket.emit("buzz-next");
  };

  useEffect(() => {
    updateState();
  }, []);

  if (initialLoad) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh", // Full viewport height
          width: "100vw", // Full viewport width
        }}
      >
        <CircularProgress size="lg" color="primary" />
      </Box>
    );
  }

  return (
    <GameContext.Provider
      value={{
        gameState,
        players,
        buzzedPlayer,
        resetBuzzedPlayer,
        nextBuzzedPlayer,
        updateState,
        getActiveQuestion,
        setActiveQuestion,
        setActiveQuestionCompleted,
        updatePlayer,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

const useGameContext = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGameContext must be used within a GameProvider");
  }
  return context;
};

export { GameProvider, useGameContext, getServerState };
