import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { GameState, Question } from "./GameStateType";
import { Box, CircularProgress } from "@mui/material";

interface GameContext {
  gameState: GameState; // Define a more specific type if possible
  updateState: () => void;
  getActiveQuestion: () => Question | null;
  setActiveQuestion: (question: Question | null) => void;
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
    });
};

const GameContext = createContext<GameContext | null>(null);

const GameProvider = ({ children }: { children: React.ReactNode }) => {
  const [gameState, setGameState] = useState<GameState>(null);
  const [initialLoad, setInitialLoad] = useState(true);

  const updateState = () => {
    getServerState().then((newState) => {
      console.log("Fetched Game State:", newState);
      if (newState) {
        setGameState(newState);
        setInitialLoad(false);
      }
    });
  };

  const setState = async (newState: GameState) => {
    await setServerState(newState);
    updateState();
  };

  const getActiveQuestion = () => {
    return gameState?.currentQuestion || null;
  };

  const setActiveQuestion = async (question: Question | null) => {
    const newState = { ...gameState, currentQuestion: question };
    await setState(newState);
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
        updateState,
        getActiveQuestion,
        setActiveQuestion,
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
