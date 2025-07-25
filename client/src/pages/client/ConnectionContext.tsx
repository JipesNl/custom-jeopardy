import { createContext, useEffect, useState } from "react";
import { socket } from "../../socket";

/**
 * @typedef {Object} PlayerContextType
 * @property {string | null} currentPlayer - The name of the currently logged-in player.
 * @property {boolean} isBuzzed - Whether the current player has buzzed.
 * @property {boolean} lockedOut - Whether the current player is locked out from buzzing.
 * @property {() => void} handleBuzz - Function to handle the player's buzz action.
 * @property {() => void} [updateStatus] - Function to update the player's buzz status.
 * @property {(player: string) => void} login - Function to log in a player.
 * @property {() => void} logout - Function to log out the current player.
 */
interface PlayerContextType {
  currentPlayer: string | null;
  isBuzzed: boolean;
  lockedOut: boolean;
  handleBuzz: () => void;
  updateStatus?: () => void;
  login: (player: string) => void;
  logout: () => void;
}

/** @type {React.Context<PlayerContextType | null>} */
const ConnectionContext = createContext(null);

/**
 * Retrieves the initial player state from sessionStorage.
 * @returns {string | null} The current player name or null if not found.
 */
const getInitialPlayerState = () => {
  const currentPlayer = sessionStorage.getItem("currentPlayer");
  return currentPlayer ? JSON.parse(currentPlayer) : null;
};

/**
 * Provides connection-related state and logic to its children.
 * @param {{ children: React.ReactNode }} props - The children components to wrap with the provider.
 * @returns {JSX.Element} The provider component.
 */
const ConnectionProvider = ({ children }) => {
  const [currentPlayer, setCurrentPlayer] = useState(getInitialPlayerState());
  const [isBuzzed, setIsBuzzed] = useState(false);
  const [lockedOut, setLockedOut] = useState(false);

  /**
   * Updates the player's buzz status by emitting a `buzz-status` event to the server.
   */
  function updateStatus() {
    if (!currentPlayer) return;
    socket.emit("buzz-status", currentPlayer, (response) => {
      console.log("Buzz status:", response);
      if (response.buzzedPlayers.includes(currentPlayer)) {
        setIsBuzzed(true);
        setLockedOut(false);
      } else {
        setIsBuzzed(false);
        setLockedOut(response.lockedOut);
      }
    });
  }

  /**
   * Handles the socket connection event.
   */
  function onConnect() {
    socket.emit("join-player", currentPlayer, (response) => {
      if (response.success) {
        console.log("Connected as:", currentPlayer);
      } else {
        console.error("Connection failed:", response.message);
        logout();
      }
    });

    socket.on("error", (message) => {
      console.error("Error:", message);
    });
  }

  /**
   * Handles the `buzzed` event when another player buzzes.
   * @param {string} playerName - The name of the player who buzzed.
   */
  function onBuzzed(playerName) {
    console.log(`Buzzed by: ${playerName}`);
    if (playerName === currentPlayer) {
      setIsBuzzed(true);
    } else {
      setIsBuzzed(false);
      setLockedOut(true);
    }
  }

  /**
   * Handles the `buzz-reset` event to reset the buzz state.
   */
  function onBuzzReset() {
    setIsBuzzed(false);
    setLockedOut(false);
  }

  /**
   * Handles the `buzz-next` event to unlock the player for the next buzz.
   */
  function onBuzzNext() {
    setLockedOut(false);
  }

  /**
   * Handles the socket disconnection event.
   */
  function onDisconnect() {
    console.log("Disconnected from server");
  }

  useEffect(() => {
    sessionStorage.setItem("currentPlayer", JSON.stringify(currentPlayer));

    if (!currentPlayer) return;

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("buzzed", onBuzzed);
    socket.on("buzz-reset", onBuzzReset);
    socket.on("buzz-next", onBuzzNext);

    // Clean up the event listeners on component unmount
    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("buzzed", onBuzzed);
      socket.off("buzz-reset", onBuzzReset);
      socket.off("buzz-next", onBuzzNext);
    };
  }, [currentPlayer]);

  /**
   * Logs in a player by setting the current player state.
   * @param {string} player - The name of the player to log in.
   */
  const login = (player) => {
    setCurrentPlayer(player);
  };

  /**
   * Logs out the current player and disconnects the socket.
   */
  const logout = () => {
    setCurrentPlayer(null);
    socket.disconnect();
  };

  /**
   * Handles the player's buzz action by emitting a `buzz` event.
   */
  const handleBuzz = () => {
    if (!lockedOut && !isBuzzed && currentPlayer) {
      socket.emit("buzz", currentPlayer);
    }
  };

  return (
    <ConnectionContext.Provider
      value={{
        currentPlayer,
        isBuzzed,
        lockedOut,
        handleBuzz,
        updateStatus,
        login,
        logout,
      }}
    >
      {children}
    </ConnectionContext.Provider>
  );
};

export { ConnectionContext, ConnectionProvider };
