import {createContext, useEffect, useState} from "react";

interface PlayerContextType {
  currentPlayer: string | null; // Adjust type as needed
  login: (player: string) => void;
  logout: () => void;
}

const PlayerContext = createContext<PlayerContextType | null>(null);

const getInitialState = () => {
  const currentPlayer = sessionStorage.getItem('currentPlayer');
  return currentPlayer ? JSON.parse(currentPlayer) : null;
};

const PlayerProvider = ({children}) => {
  const [currentPlayer, setCurrentPlayer] = useState(getInitialState());

  useEffect(() => {
    sessionStorage.setItem('currentPlayer', JSON.stringify(currentPlayer));
  }, [currentPlayer]);

  const login = (player: string) => {
    setCurrentPlayer(player);
  };

  const logout = () => {
    setCurrentPlayer(null);
  }

  return (
    <PlayerContext.Provider
      value={{
        currentPlayer,
        login,
        logout
      }}>
      {children}
    </PlayerContext.Provider>
  )
}

export { PlayerContext, PlayerProvider }