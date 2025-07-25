import { createContext, useContext, useState } from "react";
import axios from "axios";
import GameState from "./GameStateType";

interface GameContext {
  gameState: GameState; // Define a more specific type if possible
  updateState: () => void;
}

const getState: GameState = () => {
  const res = axios
    .get("/api/host/game-state", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((response) => {
      return response.data.gameState;
    })
    .catch((error) => {
      console.log("Error fetching game state:", error);
    });
  return null;
};

const GameContext = createContext<GameContext | null>(null);

const GameProvider = ({ children }: { children: React.ReactNode }) => {
  const [gameState, setGameState] = useState<GameState>(getState());

  const updateState = () => {
    const newState = getState();
    if (newState) {
      setGameState(newState);
    }
  };

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

export { GameProvider, useGameContext };
