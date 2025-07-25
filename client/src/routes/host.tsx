import React from "react";
import BoardPage from "../pages/host/BoardPage";
import { GameProvider } from "../pages/host/GameContext";

const Host = () => {
  return (
    <GameProvider>
      <BoardPage />
    </GameProvider>
  );
};

export default Host;
