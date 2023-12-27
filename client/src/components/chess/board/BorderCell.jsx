/* eslint-disable react/prop-types */

import getNameFigureByLink from "../../../utils/chessUtils/getNameFigureByLink";
import { ChessController } from "../chessController";
import getPossibleMoves from "./getPossibleMoves";
import { AuthContext } from "../../../context";
import { useContext } from "react";
import getColorByFigure from "../../../utils/chessUtils/getColorByFigure";

const BorderCell = ({
  color,
  designationFigure,
  x,
  y,
  setPosition,
  position,
}) => {
  const clickHandler = (e) => {
    if (isMat) return false; // проверка что игра вообще идет
    // проверка что очередь хода этого игрока

    const movePlayer = ChessController.getColorByLetter(position.split("/")[8]);
    if (movePlayer !== color) return false;

    // основная функция
    const activeFigure = getNameFigureByLink(figure);
    const figureColor = getColorByFigure(activeFigure);
    const cellsFigures = document.querySelectorAll(".figure");
    const targetCell = (y - 1) * 8 + x - 1;
    const isShah = ChessController.getShahMode(color, cellsFigures);

    if (e.target.classList.contains("activeFigure")) {
      ChessController.clearBoardForNewPossibleMoves(cellsFigures);
    } else if (
      activeFigure &&
      cellsFigures[targetCell].classList.contains("possibleMove")
    ) {
      ChessController.move(
        color,
        socket,
        targetCell,
        cellsFigures,
        setPosition,
        setIsMat
      );
      localStorage.removeItem("activeFigure");
    } else {
      const isPossibleMove = ChessController.getIsPossibleMove(
        color,
        figureColor,
        cellsFigures,
        targetCell
      );
      if (!isPossibleMove) return false;

      // getPossibleMoves
      const possibleMoves = getPossibleMoves(
        color,
        x,
        y,
        figure,
        targetCell,
        isShah
      );

      if (possibleMoves.length > 0) {
        localStorage.setItem("activeFigure", activeFigure);
      }

      switch (isShah) {
        case "noShah":
          ChessController.showPossibleMoves(possibleMoves, cellsFigures);
          break;
        case "shah":
          if (
            activeFigure === "whiteKing.png" ||
            activeFigure === "blackKing.png"
          ) {
            ChessController.showPossibleMoves(possibleMoves, cellsFigures);
          } else {
            const newPossibleMoves =
              ChessController.getSaveMoves(possibleMoves);

            ChessController.showPossibleMoves(newPossibleMoves, cellsFigures);
          }
          break;
        case "dblShah":
          if (
            activeFigure === "whiteKing.png" ||
            activeFigure === "blackKing.png"
          ) {
            ChessController.showPossibleMoves(possibleMoves, cellsFigures);
          }
          break;
      }
    }
  };

  const { isMat, setIsMat, socket } = useContext(AuthContext);
  const classesCell = ChessController.getCellClass(x, y);
  const figure = ChessController.getFigureSrc(designationFigure);

  return (
    <td
      className={color === "black" ? classesCell : classesCell + " rotate-180"}
      onClick={(e) => clickHandler(e)}
    >
      <span className="cellInfo">
        {ChessController.getCellText(x, y, color)}
      </span>
      <img src={figure} className="figure"></img>
    </td>
  );
};

export default BorderCell;
