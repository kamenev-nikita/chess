import getColorByFigure from "../../../utils/chessUtils/getColorByFigure";
import getNameFigureByLink from "../../../utils/chessUtils/getNameFigureByLink";
import getAttackCells from "./getAttackCells";

const getPossibleMoves = (color, x, y, figure, figurePosition) => {
  const possibleMoves = [];
  const cells = document.querySelectorAll(".borderCell");
  const figuresCells = document.querySelectorAll(".figure");
  figure = getNameFigureByLink(figure);

  let attackCells;
  let resultCells;

  switch (figure) {
    case "whitePawn.png":
      getPawnMoves(possibleMoves, color, x, y, figuresCells);
      break;
    case "blackPawn.png":
      getPawnMoves(possibleMoves, color, x, y, figuresCells);
      break;
    case "whiteRook.png":
      getRookMoves(possibleMoves, color, x, y, figurePosition);
      break;
    case "blackRook.png":
      getRookMoves(possibleMoves, color, x, y, figurePosition);
      break;
    case "whiteBishop.png":
      getBishopMoves(possibleMoves, color, x, y, figurePosition);
      break;
    case "blackBishop.png":
      getBishopMoves(possibleMoves, color, x, y, figurePosition);
      break;
    case "whiteHorse.png":
      getHorseMoves(possibleMoves, color, x, y, figuresCells);
      break;
    case "blackHorse.png":
      getHorseMoves(possibleMoves, color, x, y, figuresCells);
      break;
    case "whiteQueen.png":
      getQueenMoves(possibleMoves, color, x, y, figurePosition);
      break;
    case "blackQueen.png":
      getQueenMoves(possibleMoves, color, x, y, figurePosition);
      break;
    case "whiteKing.png":
      getKingMoves(possibleMoves, color, x, y, figuresCells);
      attackCells = getAttackCells(color, figurePosition);
      resultCells = deleteCellsUnderAttack(possibleMoves, attackCells);

      for (const attackCell of attackCells) {
        cells[attackCell].classList.add("attackCell");
      }

      localStorage.setItem("possibleMoves", JSON.stringify(resultCells));
      // return resultCells;
      break;

    case "blackKing.png":
      getKingMoves(possibleMoves, color, x, y, figuresCells);
      attackCells = getAttackCells(color, figurePosition);
      resultCells = deleteCellsUnderAttack(possibleMoves, attackCells);

      for (const attackCell of attackCells) {
        cells[attackCell].classList.add("attackCell");
      }

      localStorage.setItem("possibleMoves", JSON.stringify(resultCells));
      return resultCells;
  }

  localStorage.setItem("possibleMoves", JSON.stringify(possibleMoves));
  return possibleMoves;
};

export default getPossibleMoves;

const deleteFigurePositionCell = (possibleMoves, figurePosition) => {
  for (let index = 0; index < possibleMoves.length; index++) {
    if (possibleMoves[index] === figurePosition) {
      possibleMoves.splice(index, 1);
      index--;
    }
  }
};

const getModeCell = (cellsFigures, cellIndex, color) => {
  // определяет добавлять клетку для хода или нет
  const figureCell = getNameFigureByLink(cellsFigures[cellIndex].src);
  const figureCellColor = getColorByFigure(figureCell);

  if (color === "white") {
    switch (figureCellColor) {
      case "none":
        return "continue";
      case "white":
        return "stopNow";
      case "black":
        return "stopNext";
    }
  } else {
    switch (figureCellColor) {
      case "none":
        return "continue";
      case "white":
        return "stopNext";
      case "black":
        return "stopNow";
    }
  }
};

const realizeModeCell = (possibleMoves, checkingCell, isMode, index) => {
  // в зависимости от мода добавляет клетку в мод или нет
  switch (isMode) {
    case "continue":
      possibleMoves.push(checkingCell);
      break;
    case "stopNow":
      index = 12;
      break;
    case "stopNext":
      possibleMoves.push(checkingCell);
      index = 12;
      break;
  }
  return index;
};

const deleteCellsUnderAttack = (possibleMoves, attackCells) => {
  const scoreAttacksCells = {};
  const resultCells = [];

  for (const possibleMove of possibleMoves) {
    scoreAttacksCells[possibleMove] = 0;
  }

  for (const attackCell of attackCells) {
    if (scoreAttacksCells[attackCell] === 0) {
      scoreAttacksCells[attackCell] = scoreAttacksCells[attackCell] + 1;
    }
  }

  for (const scoreAttacksCell in scoreAttacksCells) {
    const attack = scoreAttacksCells[scoreAttacksCell];

    if (attack === 0) {
      resultCells.push(Number(scoreAttacksCell));
    }
  }

  return resultCells;
};

const checkEmptyCell = (cell, figuresCells, color) => {
  const figure = getNameFigureByLink(figuresCells[cell].src);
  const figureColor = getColorByFigure(figure);

  if (color === "white" && figureColor !== "white") return true;
  if (color === "black" && figureColor !== "black") return true;
  return false;
};

const checkVoidCell = (cell, figuresCells) => {
  return (
    getColorByFigure(getNameFigureByLink(figuresCells[cell].src)) === "none"
  );
};

const checkOpponentFigureCell = (cell, figuresCells, color) => {
  const figure = getNameFigureByLink(figuresCells[cell].src);
  const figureColor = getColorByFigure(figure);

  if (color === "white" && figureColor === "black") return true;
  if (color === "black" && figureColor === "white") return true;
  return false;
};

const getResultConditionsShortCastling = (color) => {
  if (color === "white") {
    if (localStorage.getItem("castlingOO") === "false") return false;

    const cellsFigure = document.querySelectorAll(".figure");
    if (getNameFigureByLink(cellsFigure[0].src) !== "whiteRook.png")
      return false;
    if (getNameFigureByLink(cellsFigure[1].src) !== "clearCell.png")
      return false;
    if (getNameFigureByLink(cellsFigure[2].src) !== "clearCell.png")
      return false;
    if (getNameFigureByLink(cellsFigure[3].src) !== "whiteKing.png")
      return false;

    const attackCells = getAttackCells(color);
    for (const attackCell of attackCells) {
      if (attackCell === 1 || attackCell === 2 || attackCell === 3)
        return false;
    }

    return true;
  } else {
    if (localStorage.getItem("castlingOO") === "false") return false;

    const cellsFigure = document.querySelectorAll(".figure");
    if (getNameFigureByLink(cellsFigure[56].src) !== "blackRook.png")
      return false;
    if (getNameFigureByLink(cellsFigure[57].src) !== "clearCell.png")
      return false;
    if (getNameFigureByLink(cellsFigure[58].src) !== "clearCell.png")
      return false;
    if (getNameFigureByLink(cellsFigure[59].src) !== "blackKing.png")
      return false;

    const attackCells = getAttackCells(color);
    for (const attackCell of attackCells) {
      if (attackCell === 57 || attackCell === 58 || attackCell === 59)
        return false;
    }

    return true;
  }
};

const getResultConditionsLongCastling = (color) => {
  if (color === "white") {
    if (localStorage.getItem("castlingOOO") === "false") return false;

    const cellsFigure = document.querySelectorAll(".figure");
    if (getNameFigureByLink(cellsFigure[7].src) !== "whiteRook.png")
      return false;
    if (getNameFigureByLink(cellsFigure[6].src) !== "clearCell.png")
      return false;
    if (getNameFigureByLink(cellsFigure[5].src) !== "clearCell.png")
      return false;
    if (getNameFigureByLink(cellsFigure[4].src) !== "clearCell.png")
      return false;
    if (getNameFigureByLink(cellsFigure[3].src) !== "whiteKing.png")
      return false;

    const attackCells = getAttackCells(color);
    for (const attackCell of attackCells) {
      if (
        attackCell === 3 ||
        attackCell === 4 ||
        attackCell === 5 ||
        attackCell === 6
      )
        return false;
    }

    return true;
  } else {
    if (localStorage.getItem("castlingOOO") === "false") return false;

    const cellsFigure = document.querySelectorAll(".figure");
    if (getNameFigureByLink(cellsFigure[63].src) !== "blackRook.png")
      return false;
    if (getNameFigureByLink(cellsFigure[62].src) !== "clearCell.png")
      return false;
    if (getNameFigureByLink(cellsFigure[61].src) !== "clearCell.png")
      return false;
    if (getNameFigureByLink(cellsFigure[60].src) !== "clearCell.png")
      return false;
    if (getNameFigureByLink(cellsFigure[59].src) !== "blackKing.png")
      return false;

    const attackCells = getAttackCells(color);
    for (const attackCell of attackCells) {
      if (
        attackCell === 59 ||
        attackCell === 60 ||
        attackCell === 61 ||
        attackCell === 62
      )
        return false;
    }

    return true;
  }
};

const addCastlingCell = (castlingCell, possibleMoves) => {
  let castlingCells = localStorage.getItem("castlingCells");

  // добавить еще одину ракеровку
  if (castlingCells) {
    castlingCells += "/" + castlingCell;
    localStorage.setItem("castlingCells", castlingCells);
    possibleMoves.push(castlingCell);
  } else {
    // добавить первую ракеровку
    localStorage.setItem("castlingCells", castlingCell);
    possibleMoves.push(castlingCell);
  }
};

const getPawnMoves = (possibleMoves, color, x, y, figuresCells) => {
  const figurePosition = (y - 1) * 8 + x - 1;
  let checkingCell;

  if (color === "white") {
    //forward
    checkingCell = figurePosition + 8;
    if (checkVoidCell(checkingCell, figuresCells)) {
      possibleMoves.push(checkingCell);
    }
    if (y === 2 && checkVoidCell(checkingCell, figuresCells)) {
      checkingCell = figurePosition + 16;
      if (checkVoidCell(checkingCell, figuresCells)) {
        possibleMoves.push(checkingCell);
      }

      // взятие на проходе (можно рубить эту пешку)
      localStorage.setItem("cutPawnCellIndex", figurePosition + 8);
    }

    // рубка (атака)

    checkingCell = figurePosition + 7;
    if (x >= 2 && checkOpponentFigureCell(checkingCell, figuresCells, color)) {
      possibleMoves.push(checkingCell);
    }

    checkingCell = figurePosition + 9;
    if (x <= 7 && checkOpponentFigureCell(checkingCell, figuresCells, color)) {
      possibleMoves.push(checkingCell);
    }

    // взятие на проходе (рубка)
    const takeOnPassCell = Number(
      localStorage.getItem("cutPawnCellIndexAttack")
    );

    if (takeOnPassCell !== -1) {
      if (
        figurePosition + 7 === takeOnPassCell ||
        figurePosition + 9 === takeOnPassCell
      ) {
        possibleMoves.push(takeOnPassCell);
      }
    }

    // attackCells
  } else {
    //forward
    checkingCell = figurePosition - 8;
    if (checkVoidCell(checkingCell, figuresCells)) {
      possibleMoves.push(checkingCell);
    }
    if (y === 7 && checkVoidCell(checkingCell, figuresCells)) {
      checkingCell = figurePosition - 16;
      if (checkVoidCell(checkingCell, figuresCells)) {
        possibleMoves.push(checkingCell);
      }

      // взятие на проходе (можно рубить эту пешку)
      localStorage.setItem("cutPawnCellIndex", figurePosition - 8);
    }

    // рубка

    checkingCell = figurePosition - 7;
    if (x <= 7 && checkOpponentFigureCell(checkingCell, figuresCells, color)) {
      possibleMoves.push(checkingCell);
    }

    checkingCell = figurePosition - 9;
    if (x >= 2 && checkOpponentFigureCell(checkingCell, figuresCells, color)) {
      possibleMoves.push(checkingCell);
    }

    // взятие на проходе (рубка)
    const takeOnPassCell = Number(
      localStorage.getItem("cutPawnCellIndexAttack")
    );

    if (takeOnPassCell !== -1) {
      if (
        figurePosition - 7 === takeOnPassCell ||
        figurePosition - 9 === takeOnPassCell
      ) {
        possibleMoves.push(takeOnPassCell);
      }
    }
  }
};

const getRookMoves = (possibleMoves, color, x, y, figurePosition) => {
  const cellsFigures = document.querySelectorAll(".figure");

  // left
  for (let index = x + 1; index >= 1 && index <= 8; index++) {
    const checkingCell = (y - 1) * 8 + index - 1;
    if (figurePosition !== checkingCell) {
      const isMode = getModeCell(cellsFigures, checkingCell, color);
      index = realizeModeCell(possibleMoves, checkingCell, isMode, index);
    }
  }

  // right

  for (let index = x - 1; index >= 1 && index <= 8; index--) {
    const checkingCell = (y - 1) * 8 + index - 1;

    if (figurePosition !== checkingCell) {
      const isMode = getModeCell(cellsFigures, checkingCell, color);
      index = realizeModeCell(possibleMoves, checkingCell, isMode, index);
    }
  }

  // forward
  for (let index = y; index >= 1 && index <= 8; index++) {
    const checkingCell = (index - 1) * 8 + x - 1;
    if (figurePosition !== checkingCell) {
      const isMode = getModeCell(cellsFigures, checkingCell, color);
      index = realizeModeCell(possibleMoves, checkingCell, isMode, index);
    }
  }

  // back
  for (let index = y; index >= 1 && index <= 8; index--) {
    const checkingCell = (index - 1) * 8 + x - 1;
    if (figurePosition !== checkingCell) {
      const isMode = getModeCell(cellsFigures, checkingCell, color);
      index = realizeModeCell(possibleMoves, checkingCell, isMode, index);
    }
  }

  console.log(possibleMoves);

  deleteFigurePositionCell(possibleMoves, figurePosition);
};

const getHorseMoves = (possibleMoves, color, x, y, figuresCells) => {
  const figurePosition = (y - 1) * 8 + x - 1;

  let checkingCell = figurePosition + 15;
  if (x >= 2 && y <= 6 && checkEmptyCell(checkingCell, figuresCells, color)) {
    possibleMoves.push(checkingCell);
  }
  checkingCell = figurePosition + 17;
  if (x <= 7 && y <= 6 && checkEmptyCell(checkingCell, figuresCells, color)) {
    possibleMoves.push(checkingCell);
  }
  checkingCell = figurePosition - 17;
  if (x >= 2 && y >= 3 && checkEmptyCell(checkingCell, figuresCells, color)) {
    possibleMoves.push(checkingCell);
  }
  checkingCell = figurePosition - 15;
  if (x <= 7 && y >= 3 && checkEmptyCell(checkingCell, figuresCells, color)) {
    possibleMoves.push(checkingCell);
  }

  checkingCell = figurePosition - 6;
  if (x <= 6 && y >= 2 && checkEmptyCell(checkingCell, figuresCells, color)) {
    possibleMoves.push(checkingCell);
  }
  checkingCell = figurePosition - 10;
  if (x >= 3 && y >= 2 && checkEmptyCell(checkingCell, figuresCells, color)) {
    possibleMoves.push(checkingCell);
  }
  checkingCell = figurePosition + 10;
  if (x <= 6 && y <= 7 && checkEmptyCell(checkingCell, figuresCells, color)) {
    possibleMoves.push(checkingCell);
  }
  checkingCell = figurePosition + 6;
  if (x >= 3 && y <= 7 && checkEmptyCell(checkingCell, figuresCells, color)) {
    possibleMoves.push(checkingCell);
  }
};

const getBishopMoves = (possibleMoves, color, x, y, figurePosition) => {
  const cellsFigures = document.querySelectorAll(".figure");

  for (
    let x_index = x + 1, y_index = y + 1;
    x_index >= 1 && x_index <= 8 && y_index >= 1 && y_index <= 8;
    x_index++, y_index++
  ) {
    // top-left
    const checkingCell = (y_index - 1) * 8 + x_index - 1;
    if (figurePosition !== checkingCell) {
      const isMode = getModeCell(cellsFigures, checkingCell, color);
      x_index = realizeModeCell(possibleMoves, checkingCell, isMode, x_index);
    }
  }

  for (
    let x_index = x, y_index = y;
    x_index >= 1 && x_index <= 8 && y_index >= 1 && y_index <= 8;
    x_index--, y_index++
  ) {
    // top-right
    const checkingCell = (y_index - 1) * 8 + x_index - 1;
    if (figurePosition !== checkingCell) {
      const isMode = getModeCell(cellsFigures, checkingCell, color);
      y_index = realizeModeCell(possibleMoves, checkingCell, isMode, y_index);
    }
  }

  for (
    let x_index = x - 1, y_index = y - 1;
    x_index >= 1 && x_index <= 8 && y_index >= 1 && y_index <= 8;
    x_index--, y_index--
  ) {
    // bottom-right
    const checkingCell = (y_index - 1) * 8 + x_index - 1;
    if (figurePosition !== checkingCell) {
      const isMode = getModeCell(cellsFigures, checkingCell, color);
      x_index = realizeModeCell(possibleMoves, checkingCell, isMode, x_index);
    }
  }

  for (
    let x_index = x, y_index = y;
    x_index >= 1 && x_index <= 8 && y_index >= 1 && y_index <= 8;
    x_index++, y_index--
  ) {
    // bottom-left

    const checkingCell = (y_index - 1) * 8 + x_index - 1;
    if (figurePosition !== checkingCell) {
      const isMode = getModeCell(cellsFigures, checkingCell, color);
      y_index = realizeModeCell(possibleMoves, checkingCell, isMode, y_index);
    }
  }

  deleteFigurePositionCell(possibleMoves, figurePosition);
};

const getQueenMoves = (possibleMoves, color, x, y, figurePosition) => {
  const cellsFigures = document.querySelectorAll(".figure");

  for (let index = x + 1; index >= 1 && index <= 8; index++) {
    const checkingCell = (y - 1) * 8 + index - 1;
    if (figurePosition !== checkingCell) {
      const isMode = getModeCell(cellsFigures, checkingCell, color);
      index = realizeModeCell(possibleMoves, checkingCell, isMode, index);
    }
  }

  // right
  for (let index = x - 1; index >= 1 && index <= 8; index--) {
    const checkingCell = (y - 1) * 8 + index - 1;
    if (figurePosition !== checkingCell) {
      const isMode = getModeCell(cellsFigures, checkingCell, color);
      index = realizeModeCell(possibleMoves, checkingCell, isMode, index);
    }
  }

  // forward
  for (let index = y; index >= 1 && index <= 8; index++) {
    const checkingCell = (index - 1) * 8 + x - 1;
    if (figurePosition !== checkingCell) {
      const isMode = getModeCell(cellsFigures, checkingCell, color);
      index = realizeModeCell(possibleMoves, checkingCell, isMode, index);
    }
  }

  // back
  for (let index = y; index >= 1 && index <= 8; index--) {
    const checkingCell = (index - 1) * 8 + x - 1;
    if (figurePosition !== checkingCell) {
      const isMode = getModeCell(cellsFigures, checkingCell, color);
      index = realizeModeCell(possibleMoves, checkingCell, isMode, index);
    }
  }

  for (
    let x_index = x + 1, y_index = y + 1;
    x_index >= 1 && x_index <= 8 && y_index >= 1 && y_index <= 8;
    x_index++, y_index++
  ) {
    // top-left
    const checkingCell = (y_index - 1) * 8 + x_index - 1;
    if (figurePosition !== checkingCell) {
      const isMode = getModeCell(cellsFigures, checkingCell, color);
      x_index = realizeModeCell(possibleMoves, checkingCell, isMode, x_index);
    }
  }

  for (
    let x_index = x, y_index = y;
    x_index >= 1 && x_index <= 8 && y_index >= 1 && y_index <= 8;
    x_index--, y_index++
  ) {
    // top-right
    const checkingCell = (y_index - 1) * 8 + x_index - 1;
    if (figurePosition !== checkingCell) {
      const isMode = getModeCell(cellsFigures, checkingCell, color);
      y_index = realizeModeCell(possibleMoves, checkingCell, isMode, y_index);
    }
  }

  for (
    let x_index = x - 1, y_index = y - 1;
    x_index >= 1 && x_index <= 8 && y_index >= 1 && y_index <= 8;
    x_index--, y_index--
  ) {
    // bottom-right
    const checkingCell = (y_index - 1) * 8 + x_index - 1;
    if (figurePosition !== checkingCell) {
      const isMode = getModeCell(cellsFigures, checkingCell, color);
      x_index = realizeModeCell(possibleMoves, checkingCell, isMode, x_index);
    }
  }

  for (
    let x_index = x, y_index = y;
    x_index >= 1 && x_index <= 8 && y_index >= 1 && y_index <= 8;
    x_index++, y_index--
  ) {
    // bottom-left

    const checkingCell = (y_index - 1) * 8 + x_index - 1;
    if (figurePosition !== checkingCell) {
      const isMode = getModeCell(cellsFigures, checkingCell, color);
      y_index = realizeModeCell(possibleMoves, checkingCell, isMode, y_index);
    }
  }

  deleteFigurePositionCell(possibleMoves, figurePosition);
};

const getKingMoves = (possibleMoves, color, x, y, figuresCells) => {
  const figurePosition = (y - 1) * 8 + x - 1;

  let checkingCell = figurePosition + 8;
  if (y <= 7 && checkEmptyCell(checkingCell, figuresCells, color)) {
    possibleMoves.push(checkingCell);
  }
  checkingCell = figurePosition + 7;
  if (x >= 2 && y <= 7 && checkEmptyCell(checkingCell, figuresCells, color)) {
    possibleMoves.push(checkingCell);
  }
  checkingCell = figurePosition - 1;
  if (x >= 2 && checkEmptyCell(checkingCell, figuresCells, color)) {
    possibleMoves.push(checkingCell);
  }
  checkingCell = figurePosition - 9;
  if (x >= 2 && y >= 2 && checkEmptyCell(checkingCell, figuresCells, color)) {
    possibleMoves.push(checkingCell);
  }
  checkingCell = figurePosition - 8;
  if (y >= 2 && checkEmptyCell(checkingCell, figuresCells, color)) {
    possibleMoves.push(checkingCell);
  }
  checkingCell = figurePosition - 7;
  if (x <= 7 && y >= 2 && checkEmptyCell(checkingCell, figuresCells, color)) {
    possibleMoves.push(checkingCell);
  }
  checkingCell = figurePosition + 1;
  if (x <= 7 && checkEmptyCell(checkingCell, figuresCells, color)) {
    possibleMoves.push(checkingCell);
  }
  checkingCell = figurePosition + 9;
  if (x <= 7 && y <= 7 && checkEmptyCell(checkingCell, figuresCells, color)) {
    possibleMoves.push(checkingCell);
  }

  // ракеровка
  if (color === "white") {
    if (getResultConditionsShortCastling(color)) {
      const castlingCell = 1;
      addCastlingCell(castlingCell, possibleMoves);
    }
    if (getResultConditionsLongCastling(color)) {
      const castlingCell = 5;
      addCastlingCell(castlingCell, possibleMoves);
    }
  } else {
    if (getResultConditionsShortCastling(color)) {
      const castlingCell = 57;
      addCastlingCell(castlingCell, possibleMoves);
    }
    if (getResultConditionsLongCastling(color)) {
      const castlingCell = 61;
      addCastlingCell(castlingCell, possibleMoves);
    }
  }
};
