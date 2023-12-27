/* eslint-disable react/prop-types */

import { useContext } from "react";
import { AuthContext } from "../../../context";
import { useGetSendMove } from "../../../hooks/chessHooks/useGetSendMove";
import { useSeeFirstBlackMove } from "../../../hooks/chessHooks/useSeeFirstBlackMove";
import { useSeeMoveHistory } from "../../../hooks/chessHooks/useSeeMoveHistory";
import { useSetCastling } from "../../../hooks/chessHooks/useSetCastling";
import useUpdatingRoom from "../../../hooks/chessHooks/useUpdatingRoom";
import BorderRow from "./BorderRow";
// import "../chess.css";
import "./gameBoard.css";

const GameBoard = ({ setPosition, position }) => {
  const {
    socket,
    isFirstBlackMove,
    setIsFirstBlackMove,
    historyPositions,
    setHistoryPositions,
  } = useContext(AuthContext);
  const color = localStorage.getItem("color");

  useSetCastling(); // не только ракеровка (переименовать)
  useGetSendMove(socket, setPosition, position);
  useUpdatingRoom(socket, position);
  useSeeMoveHistory(historyPositions, setHistoryPositions, position);
  useSeeFirstBlackMove(
    historyPositions,
    isFirstBlackMove,
    setIsFirstBlackMove,
    color
  );

  // история ходов

  const positionParse = position.split("/");
  const cutPawnCellIndex = position[9];
  localStorage.setItem("cutPawnCellIndexAttack", cutPawnCellIndex);
  positionParse.length = 8; // rows

  return (
    <table className={color === "black" ? "gameBoard" : "gameBoard rotate-180"}>
      <tbody>
        {positionParse.map((row, index) => {
          return (
            <BorderRow
              key={index}
              color={color}
              row={row}
              y={++index}
              setPosition={setPosition}
              position={position}
            />
          );
        })}
      </tbody>
    </table>
  );
};

export default GameBoard;
