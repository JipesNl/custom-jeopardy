import {
  ConnectionContext,
  ConnectionProvider,
} from "../pages/client/ConnectionContext";
import { useContext } from "react";
import Buzzer from "../pages/client/Buzzer";
import Login from "../pages/client/Login";

const getPlayerID = () => {
  const playerID = sessionStorage.getItem("playerID");
  return playerID ? JSON.parse(playerID) : null;
};

function Home() {
  return (
    <ConnectionProvider>
      <Page />
    </ConnectionProvider>
  );
}

function Page() {
  const { currentPlayer } = useContext(ConnectionContext);
  return <>{currentPlayer ? <Buzzer /> : <Login />}</>;
}

export default Home;
