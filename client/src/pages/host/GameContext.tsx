import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { GameState } from "./GameStateType";

interface GameContext {
  gameState: GameState; // Define a more specific type if possible
  updateState: () => void;
}

const getState: Promise<GameState> = async () => {
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

const GameContext = createContext<GameContext | null>(null);

const GameProvider = ({ children }: { children: React.ReactNode }) => {
  const [gameState, setGameState] = useState<GameState>(null);

  const updateState = () => {
    getState().then((newState) => {
      console.log("Fetched Game State:", newState);
      if (newState) {
        setGameState(newState);
      }
    });
  };
  useEffect(() => {
    updateState();
  }, []);

  return (
    <GameContext.Provider value={{ gameState, updateState }}>
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

export { GameProvider, useGameContext, getState };
