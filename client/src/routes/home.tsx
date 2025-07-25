import { PlayerContext, PlayerProvider } from "../pages/client/PlayerContext";
import {useContext} from "react";
import Buzzer from "../pages/client/Buzzer";
import Login from "../pages/client/Login";

const getPlayerID = () => {
  const playerID = sessionStorage.getItem('playerID');
  return playerID ? JSON.parse(playerID) : null;
}

function Home() {
  return (
    <PlayerProvider>
      <Page />
    </PlayerProvider>
  );
}

function Page() {
  const { currentPlayer } = useContext(PlayerContext);
  return (
    <>
    { currentPlayer ? <Buzzer /> : <Login /> }
    </>
  )
}

export default Home;
