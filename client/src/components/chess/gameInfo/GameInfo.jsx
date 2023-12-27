/* eslint-disable react/prop-types */
import GameButtons from "./gameButtons/GameButtons";
import BlackTimer from "./timers/BlackTimer";
import WhiteTimer from "./timers/WhiteTimer";
import { useContext, useEffect, useState } from "react";
import FinishGame from "./finishGame/FinishGame";
import { AuthContext } from "../../../context";
import TimerController from "./timers/TimerController";
import { useTimerUpdate } from "../../../hooks/chessHooks/useTimerUpdate";
import "./gameInfo.css";

const GameInfo = ({ position, setPosition }) => {
  const { isMat, setIsMat } = useContext(AuthContext);
  const { socket, historyPositions, setHistoryPositions } =
    useContext(AuthContext);
  const room = JSON.parse(localStorage.getItem("room"));
  const [timers, setTimer] = useState(
    TimerController.getTimeByTimer(room.timer)
  );
  const [isUpdateTimer, setIsUpdateTimer] = useState(true);
  const [winner, setWinner] = useState("");

  const colorMove = position.split("/")[8];
  const colorPlayer = localStorage.getItem("color");

  useTimerUpdate(
    historyPositions,
    setIsUpdateTimer,
    isUpdateTimer,
    TimerController,
    setTimer,
    timers,
    colorMove,
    isMat,
    setIsMat,
    socket
  );

  // слушает конец игры (мат ничья сдаться)
  useEffect(() => {
    socket.on("C-get-resultGame", (resultGame) => {
      setIsMat(true);
      setWinner(resultGame.winner);
    });
  }, []);

  return (
    <div className="gameInfo">
      {colorPlayer === "white" ? (
        <>
          <BlackTimer timer={timers.black} />
          {isMat ? (
            <FinishGame winner={winner} />
          ) : (
            <GameButtons
              socket={socket}
              setPosition={setPosition}
              colorPlayer={colorPlayer}
              historyPositions={historyPositions}
              setHistoryPositions={setHistoryPositions}
            />
          )}
          <WhiteTimer timer={timers.white} />
        </>
      ) : (
        <>
          <WhiteTimer timer={timers.white} />
          {isMat ? (
            <FinishGame winner={winner} />
          ) : (
            <GameButtons
              socket={socket}
              setPosition={setPosition}
              colorPlayer={colorPlayer}
              historyPositions={historyPositions}
              setHistoryPositions={setHistoryPositions}
            />
          )}
          <BlackTimer timer={timers.black} />
        </>
      )}
    </div>
  );
};

export default GameInfo;
