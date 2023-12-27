import rookW from "../../img/chess/whiteRook.png";
import horseW from "../../img/chess/whiteHorse.png";
import bishopW from "../../img/chess/whiteBishop.png";
import queenW from "../../img/chess/whiteQueen.png";
import kingW from "../../img/chess/whiteKing.png";
import pawnW from "../../img/chess/whitePawn.png";

import rookB from "../../img/chess/blackRook.png";
import horseB from "../../img/chess/blackHorse.png";
import bishopB from "../../img/chess/blackBishop.png";
import queenB from "../../img/chess/blackQueen.png";
import kingB from "../../img/chess/blackKing.png";
import pawnB from "../../img/chess/blackPawn.png";

import clearCellSrc from "../../img/chess/clearCell.png";

import getNameFigureByLink from "../../utils/chessUtils/getNameFigureByLink";
import getAttackCells from "./board/getAttackCells";
import getPossibleMoves from "./board/getPossibleMoves";
import getColorByFigure from "../../utils/chessUtils/getColorByFigure";
import getReverseColor from "../../utils/chessUtils/getReverseColor";

class _ChessController {
  getCellClass = (x, y) => {
    let CellClass = "borderCell ";

    if (y % 2 === 0) {
      if (x % 2 === 0) {
        CellClass += "white";
      } else {
        CellClass += "black";
      }
    } else {
      if (x % 2 === 0) {
        CellClass += "black";
      } else {
        CellClass += "white";
      }
    }

    return CellClass;
  };

  getCellText = (x, y, color) => {
    const object = {
      black: { 1: "a", 2: "b", 3: "c", 4: "d", 5: "e", 6: "f", 7: "g", 8: "h" },
      white: { 1: "h", 2: "g", 3: "f", 4: "e", 5: "d", 6: "c", 7: "b", 8: "a" },
    };
    let text = "";

    if (color === "white") {
      if (y === 8) {
        text = object[color][x];
      }
      if (x === 1) {
        text += y;
      }
    } else {
      if (y === 1) {
        text = object["white"][x];
      }
      if (x === 8) {
        text += y;
      }
    }

    return text;
  };

  clearBoardForNewPossibleMoves(cellsFigures) {
    localStorage.removeItem("activeFigure");
    localStorage.removeItem("activeFigureCell");
    localStorage.removeItem("castlingCells");
    const activeFigureCell = document.querySelector(".activeFigure");
    activeFigureCell?.classList.remove("activeFigure");
    activeFigureCell?.parentElement?.classList.remove("z-index1");

    for (const cellsFigure of cellsFigures) {
      cellsFigure.classList.remove("possibleMove");
    }
  }

  getColorByLetter = (letter) => {
    switch (letter) {
      case "w":
        return "white";
      case "b":
        return "black";
    }
  };

  getShahMode = (color, cellsFigures) => {
    let shahMode;
    let scoreAttack = 0;
    const kingPosition = this.getKingPosition(color, cellsFigures);

    const attackCells = getAttackCells(color, -1); // нужен только color

    for (const attackCell of attackCells) {
      if (attackCell === kingPosition) {
        scoreAttack++;
      }
    }

    if (scoreAttack === 0) {
      shahMode = "noShah";
    } else if (scoreAttack === 1) {
      shahMode = "shah";
    } else {
      shahMode = "dblShah";
    }

    return shahMode;
  };

  getKingPosition(color, cellsFigures) {
    for (let index = 0; index < cellsFigures.length; index++) {
      const figure = getNameFigureByLink(cellsFigures[index].src);

      if (figure === "whiteKing.png" && color === "white") return index;
      if (figure === "blackKing.png" && color === "black") return index;
    }
  }

  newFocusFigure(cellsFigures, figurePosition) {
    this.clearBoardForNewPossibleMoves(cellsFigures);

    localStorage.setItem("activeFigureCell", figurePosition);
    cellsFigures[figurePosition].classList.add("activeFigure");
    cellsFigures[figurePosition].parentElement?.classList.add("z-index1");
  }

  parsePosition(position) {
    const rowsPosition = position.split("/");
    let positionParse = "";
    const parse = {
      2: "11",
      3: "111",
      4: "1111",
      5: "11111",
      6: "111111",
      7: "1111111",
      8: "11111111",
    };

    for (const rowPosition of rowsPosition) {
      const cellsPosition = rowPosition.split("");
      let rowPositionParse = "";

      for (const cellPosition of cellsPosition) {
        if (
          cellPosition === "2" ||
          cellPosition === "3" ||
          cellPosition === "4" ||
          cellPosition === "5" ||
          cellPosition === "6" ||
          cellPosition === "7" ||
          cellPosition === "8"
        ) {
          rowPositionParse += parse[cellPosition];
        } else {
          rowPositionParse += cellPosition;
        }
      }
      positionParse += rowPositionParse + "/";
    }

    return positionParse;
  }

  stringifyPosition(cellsFigures, color) {
    const stringify = {
      "": "1",
      void: "1",
      "clearCell.png": "1",
      "whiteRook.png": "r",
      "whiteHorse.png": "n",
      "whiteBishop.png": "b",
      "whiteQueen.png": "q",
      "whiteKing.png": "k",
      "whitePawn.png": "p",

      "blackRook.png": "R",
      "blackHorse.png": "N",
      "blackBishop.png": "B",
      "blackQueen.png": "Q",
      "blackKing.png": "K",
      "blackPawn.png": "P",
    };
    let newPosition = "";

    if (color === "white") {
      let index = 7;
      for (const cellsFigure of cellsFigures) {
        const figureName = String(cellsFigure.src.split("/").slice(-1));

        newPosition += stringify[figureName];
        if (index === 0) {
          newPosition += "/";
          index = 8;
        }
        index--;
      }

      newPosition += "b";
      if (localStorage.getItem("cutPawnCellIndex")) {
        newPosition += "/" + localStorage.getItem("cutPawnCellIndex");
      } else {
        newPosition += "/" + "-1";
      }

      return newPosition;
    } else {
      let index = 1;

      for (const cellsFigure of cellsFigures) {
        const figureName = String(cellsFigure.src.split("/").slice(-1));

        newPosition += stringify[figureName];
        if (index === 8) {
          // newPosition = "/" + newPosition;
          newPosition += "/";
          index = 0;
        }
        index++;
      }

      let reversePosition = newPosition;
      reversePosition = reversePosition + "w";
      if (localStorage.getItem("cutPawnCellIndex")) {
        reversePosition += "/" + localStorage.getItem("cutPawnCellIndex");
      } else {
        reversePosition += "/" + "-1";
      }

      return reversePosition;
    }
  }

  transformNewPosition(position) {
    const parsePosition = position.split("/");
    let transformedPosition = "";

    // 0-7 строки, остальное данные позиции
    for (let y = 0; y <= parsePosition.length - 1; y++) {
      let newRow = "";
      if (y === 0) {
        // превращение черных пешек в ферзей
        for (let designationFigure of parsePosition[y]) {
          if (designationFigure === "P") {
            newRow += "Q";
          } else {
            newRow += designationFigure;
          }
        }
      } else if (y === 7) {
        // превращение белых пешек в ферзей
        for (let designationFigure of parsePosition[y]) {
          if (designationFigure === "p") {
            newRow += "q";
          } else {
            newRow += designationFigure;
          }
        }
      } else {
        newRow += parsePosition[y];
      }

      if (y === parsePosition.length - 1) {
        transformedPosition += newRow;
      } else {
        transformedPosition += newRow + "/";
      }
    }

    return transformedPosition;
  }

  getFigureSrc(cellPosition) {
    switch (cellPosition) {
      case "1":
        return clearCellSrc;
      case "r":
        return rookW;
      case "n":
        return horseW;
      case "b":
        return bishopW;
      case "q":
        return queenW;
      case "k":
        return kingW;
      case "p":
        return pawnW;

      case "R":
        return rookB;
      case "N":
        return horseB;
      case "B":
        return bishopB;
      case "Q":
        return queenB;
      case "K":
        return kingB;
      case "P":
        return pawnB;
    }
  }

  focusFigure(e, color, movePlayer, figure) {
    if (color === movePlayer) {
      const focus = () => {
        const cells = document.querySelectorAll(".borderCell img");
        for (const cell of cells) {
          cell.classList.remove("activeFigure");
        }
        e.target.classList.add("activeFigure");
        localStorage.setItem("activeFigure", figure);
      };

      const clearPossibleMoves = () => {
        const possibleMovesCells = document.querySelectorAll(".possibleMove");

        for (const cell of possibleMovesCells) {
          cell.classList.remove("possibleMove");
        }
      };

      if (!e.target.classList.contains("activeFigure")) {
        const targetSrc = String(e.target.src.split("/").slice(-1));
        // clearPossibleMoves();

        // if (targetSrc !== String(clearCellSrc.split("/").slice(-1))) {
        if (color === "white") {
          if (
            targetSrc === String(rookW.split("/").slice(-1)) ||
            targetSrc === String(horseW.split("/").slice(-1)) ||
            targetSrc === String(bishopW.split("/").slice(-1)) ||
            targetSrc === String(queenW.split("/").slice(-1)) ||
            targetSrc === String(kingW.split("/").slice(-1)) ||
            targetSrc === String(pawnW.split("/").slice(-1))
          ) {
            focus();
          }
        } else {
          if (
            targetSrc === String(rookB.split("/").slice(-1)) ||
            targetSrc === String(horseB.split("/").slice(-1)) ||
            targetSrc === String(bishopB.split("/").slice(-1)) ||
            targetSrc === String(queenB.split("/").slice(-1)) ||
            targetSrc === String(kingB.split("/").slice(-1)) ||
            targetSrc === String(pawnB.split("/").slice(-1))
          ) {
            focus();
          }
        }
        // }
      } else {
        clearPossibleMoves();
        e.target.classList.remove("activeFigure");
        localStorage.removeItem("activeFigure");
      }
    }
  }

  checkCutPawn(activeFigure, cellsFigures) {
    if (localStorage.getItem("isTakeOnPass") === "true") {
      if (
        activeFigure === "whitePawn.png" ||
        activeFigure === "blackPawn.png"
      ) {
        cellsFigures[
          Number(localStorage.getItem("cutPawnCellIndexAttack")) + 8
        ].src = clearCellSrc;
      }
    }
  }

  showPossibleMoves(possibleMoves, cellsFigures) {
    for (const possibleMove of possibleMoves) {
      for (let index = 0; index < cellsFigures.length; index++) {
        if (index === possibleMove) {
          cellsFigures[index].classList.add("possibleMove");
        }
      }
    }
  }

  move(color, socket, figurePosition, cellsFigures, setPosition, setIsMat) {
    const parseFigureName = {
      "whitePawn.png": pawnW,
      "whiteRook.png": rookW,
      "whiteHorse.png": horseW,
      "whiteBishop.png": bishopW,
      "whiteQueen.png": queenW,
      "whiteKing.png": kingW,
      "blackPawn.png": pawnB,
      "blackRook.png": rookB,
      "blackHorse.png": horseB,
      "blackBishop.png": bishopB,
      "blackQueen.png": queenB,
      "blackKing.png": kingB,
    };
    const activeFigure = localStorage.getItem("activeFigure");

    if (localStorage.getItem("color") === color) {
      // визуальный ход
      const figureSell = Number(localStorage.getItem("activeFigureCell"));
      const takeOnPassCell = Number(
        localStorage.getItem("cutPawnCellIndexAttack")
      );

      // взятие на проходе
      if (figurePosition === takeOnPassCell) {
        if (activeFigure === "whitePawn.png") {
          cellsFigures[takeOnPassCell - 8].src = clearCellSrc;
          cellsFigures[figurePosition].src = parseFigureName[activeFigure];
          cellsFigures[figureSell].src = clearCellSrc;
        } else if (activeFigure === "blackPawn.png") {
          cellsFigures[takeOnPassCell + 8].src = clearCellSrc;
          cellsFigures[figurePosition].src = parseFigureName[activeFigure];
          cellsFigures[figureSell].src = clearCellSrc;
        }
      } else if (
        this.getIsCastling(activeFigure, figurePosition, cellsFigures)
      ) {
        // ракировка
        // выполняется в getIsCastling

        this.clearBoardForNewPossibleMoves(cellsFigures);

        // изменение позиции в коде (исходя из изменений в визуализации доски)

        const _newPosition = this.stringifyPosition(cellsFigures, color);
        const _transformedNewPosition = this.transformNewPosition(_newPosition);

        setPosition(_transformedNewPosition);
      } else {
        // обычный ход
        cellsFigures[figurePosition].src = parseFigureName[activeFigure];
        cellsFigures[figureSell].src = clearCellSrc;
      }

      this.clearBoardForNewPossibleMoves(cellsFigures);

      // изменение позиции в коде (исходя из изменений в визуализации доски)

      const newPosition = this.stringifyPosition(cellsFigures, color);
      const transformedNewPosition = this.transformNewPosition(newPosition);

      setPosition(transformedNewPosition);

      // проверка на мат
      const isMat = this.checkMat(color, cellsFigures);
      // реализация конца партии
      if (isMat) {
        setIsMat(true);
        socket.emit("S-get-resultGame", { winner: color });
      }
    }
  }

  checkMat(color, cellsFigures) {
    // проверка есть ли шах
    const shahMode = this.getShahMode(getReverseColor(color), cellsFigures);

    if (shahMode === "noShah") return false;

    // поиск возможных ходов у короля
    const [x, y] = this.getOpponentKingPosition(color, cellsFigures);
    const figurePosition = (y - 1) * 8 + x - 1;
    const possibleKingMoves = this.getOpponentKingPossibleMoves(
      color,
      x,
      y,
      figurePosition
    );
    const attacksCells = [];
    console.log(possibleKingMoves);

    if (possibleKingMoves.length !== 0) return false;

    // поиск возможной защиты от мата
    for (let index = 0; index < cellsFigures.length; index++) {
      const cellFigure = cellsFigures[index];
      let attacksCellsFigure = [];
      const figure = getNameFigureByLink(cellFigure.src);
      const [x, y] = this.getXYByPosition(index);

      // если фигура является вражеской
      if (getColorByFigure(figure) === getReverseColor(color)) {
        attacksCellsFigure = getPossibleMoves(
          getReverseColor(color),
          x,
          y,
          figure,
          index
        );
      }

      attacksCells.push(...attacksCellsFigure);
    }
    const saveMoves = this.getSaveMoves(attacksCells);
    if (saveMoves.length !== 0) return false;

    return true;
  }

  getSaveMoves(possibleMoves) {
    const saveCells = JSON.parse(localStorage.getItem("saveCells"));
    const newPossibleMoves = [];

    for (const possibleMove of possibleMoves) {
      for (const saveCell of saveCells) {
        if (possibleMove === saveCell) {
          newPossibleMoves.push(possibleMove);
        }
      }
    }

    return newPossibleMoves;
  }

  getOpponentKingPosition(color, cellsFigures) {
    for (let index = 0; index < cellsFigures.length; index++) {
      const cellFigure = getNameFigureByLink(cellsFigures[index].src);

      if (color === "white" && cellFigure === "blackKing.png") {
        return this.getXYByPosition(index);
      }
      if (color === "black" && cellFigure === "whiteKing.png") {
        return this.getXYByPosition(index);
      }
    }
  }

  getXYByPosition = (position) => {
    let x = 1;
    let y = 1;

    while (position > 0) {
      if (x === 8) {
        y++;
        x = 0;
      }
      x++;
      position--;
    }

    return [x, y];
  };

  getOpponentKingPossibleMoves(color, x, y, figurePosition) {
    if (color === "white") {
      return getPossibleMoves("black", x, y, "blackKing.png", figurePosition);
    } else {
      return getPossibleMoves("white", x, y, "whiteKing.png", figurePosition);
    }
  }

  boardConversion() {
    // преобразует доску в соответствующий вид (превращает пешки в ферзей и т.п.)
    const cellsFigures = document.querySelectorAll(".figure");

    for (let index = 0; index <= 7; index++) {
      const figure = getNameFigureByLink(cellsFigures[index].src);
      if (figure === "whitePawn.png") {
        cellsFigures[index].src = queenW;
      } else if (figure === "blackPawn.png") {
        cellsFigures[index].src = queenB;
      }
    }
  }

  getIsCastling(activeFigure, figurePosition, cellsFigures) {
    const castlingCells = localStorage.getItem("castlingCells");

    if (!castlingCells) return false;
    if (activeFigure === "whiteKing.png") {
      if (
        figurePosition === 1 &&
        (castlingCells === "1" || castlingCells === "1/5")
      ) {
        cellsFigures[1].src = kingW;
        cellsFigures[2].src = rookW;
        cellsFigures[0].src = clearCellSrc;
        cellsFigures[3].src = clearCellSrc;
        return true;
      }
      if (
        figurePosition === 5 &&
        (castlingCells === "5" || castlingCells === "1/5")
      ) {
        cellsFigures[5].src = kingW;
        cellsFigures[4].src = rookW;
        cellsFigures[3].src = clearCellSrc;
        cellsFigures[7].src = clearCellSrc;
        return true;
      }
    } else if (activeFigure === "blackKing.png") {
      if (
        figurePosition === 57 &&
        (castlingCells === "57" || castlingCells === "57/61")
      ) {
        cellsFigures[57].src = kingB;
        cellsFigures[58].src = rookB;
        cellsFigures[59].src = clearCellSrc;
        cellsFigures[56].src = clearCellSrc;
        return true;
      }
      if (
        figurePosition === 61 &&
        (castlingCells === "61" || castlingCells === "57/61")
      ) {
        cellsFigures[61].src = kingB;
        cellsFigures[60].src = rookB;
        cellsFigures[59].src = clearCellSrc;
        cellsFigures[63].src = clearCellSrc;
        return true;
      }
    }

    return false;
  }

  checkShahIfGoThisFigure(cellsFigures, targetCell, color) {
    const savedFigure = cellsFigures[targetCell].src;
    cellsFigures[targetCell].src = clearCellSrc;

    const shahMode = ChessController.getShahMode(color, cellsFigures);
    cellsFigures[targetCell].src = savedFigure;

    if (
      shahMode !== "noShah" &&
      color ===
        getColorByFigure(getNameFigureByLink(cellsFigures[targetCell].src))
    ) {
      return false;
    }
    return true;
  }

  getIsPossibleMove(color, figureColor, cellsFigures, targetCell) {
    // если фигура не твоя то нельзя ей ходить
    if (color !== figureColor) return false;

    ChessController.newFocusFigure(cellsFigures, targetCell);

    // проверить будет ли шах если сходить это фигурой
    const isCheckShahIfGoThisFigure = ChessController.checkShahIfGoThisFigure(
      cellsFigures,
      targetCell,
      color
    );
    if (!isCheckShahIfGoThisFigure) return false;

    return true;
  }
}

export const ChessController = new _ChessController();
