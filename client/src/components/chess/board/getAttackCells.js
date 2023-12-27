import getColorByFigure from "../../../utils/chessUtils/getColorByFigure";
import getNameFigureByLink from "../../../utils/chessUtils/getNameFigureByLink";

const getAttackCells = (color) => {
  const addSaveCells = (checkingCell, attackLine) => {
    const figure = getNameFigureByLink(figuresCells[checkingCell].src);

    if (
      (figure === "whiteKing.png" && color === "white") ||
      (figure === "blackKing.png" && color === "black")
    ) {
      saveCells.push(...attackLine);
    }
  };

  const allAttackCells = [];
  const saveCells = [];
  const figuresCells = document.querySelectorAll(".figure");

  let x = 1;
  let y = 1;

  for (let index = 0; index < figuresCells.length; index++) {
    const figureCell = figuresCells[index];

    const figurePosition = (y - 1) * 8 + x - 1;
    const figure = getNameFigureByLink(figureCell.src);

    if (getColorByFigure(figure) !== color) {
      switch (figure) {
        case "whitePawn.png":
          getPawnAttacks(allAttackCells, color, x, y, figurePosition);
          break;
        case "blackPawn.png":
          getPawnAttacks(allAttackCells, color, x, y, figurePosition);
          break;
        case "whiteRook.png":
          getRookAttacks(
            allAttackCells,
            color,
            x,
            y,
            figurePosition,
            addSaveCells
          );
          break;
        case "blackRook.png":
          getRookAttacks(
            allAttackCells,
            color,
            x,
            y,
            figurePosition,
            addSaveCells
          );
          break;
        case "whiteBishop.png":
          getBishopAttacks(
            allAttackCells,
            color,
            x,
            y,
            figurePosition,
            addSaveCells
          );
          break;
        case "blackBishop.png":
          getBishopAttacks(
            allAttackCells,
            color,
            x,
            y,
            figurePosition,
            addSaveCells
          );
          break;
        case "whiteHorse.png":
          getHorseAttacks(allAttackCells, x, y);
          break;
        case "blackHorse.png":
          getHorseAttacks(allAttackCells, x, y);
          break;
        case "whiteQueen.png":
          getQueenAttacks(
            allAttackCells,
            color,
            x,
            y,
            figurePosition,
            addSaveCells
          );
          break;
        case "blackQueen.png":
          getQueenAttacks(
            allAttackCells,
            color,
            x,
            y,
            figurePosition,
            addSaveCells
          );
          break;
        case "whiteKing.png":
          getKingAttacks(allAttackCells, x, y);
          break;
        case "blackKing.png":
          getKingAttacks(allAttackCells, x, y);
          break;
      }
    }

    // nextXY
    if (++x > 8) {
      y++;
      x = 1;
    }
  }

  localStorage.setItem("saveCells", JSON.stringify(saveCells));
  const noRepeatAttackCells = [...new Set(allAttackCells)];
  const result = [];

  for (const attackCell of noRepeatAttackCells) {
    if (attackCell <= 63) {
      result.push(attackCell);
    }
  }

  return result;
};

export default getAttackCells;

const deleteFigurePositionCell = (allAttackCells, figurePosition) => {
  for (let index = 0; index < allAttackCells.length; index++) {
    if (allAttackCells[index] === figurePosition) {
      allAttackCells.splice(index, 1);
      index--;
    }
  }
};

const getModeCell = (cellsFigures, cellIndex, color) => {
  // определяет добавлять клетку для хода или нет
  const figureCell = getNameFigureByLink(cellsFigures[cellIndex].src);
  const figureCellColor = getColorByFigure(figureCell);

  if (color === "white") {
    if (figureCell === "whiteKing.png") return "continue";
    switch (figureCellColor) {
      case undefined:
        return "continue";
      case "white":
        return "stopNow";
      case "black":
        return "stopNext";
    }
  } else {
    if (figureCell === "blackKing.png") return "continue";
    switch (figureCellColor) {
      case undefined:
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

const checkingCellAndAddSaveCells = (x, y, addSaveCells, saveCells) => {
  const checkingCell = (y - 1) * 8 + x - 1;
  addSaveCells(checkingCell, saveCells);
  saveCells.push(checkingCell);

  return checkingCell;
};

const getPawnAttacks = (allAttackCells, color, x, y, figurePosition) => {
  if (color === "black") {
    if (x >= 2) {
      allAttackCells.push(figurePosition + 7);
    }
    if (x <= 7) {
      allAttackCells.push(figurePosition + 9);
    }
  } else {
    if (x <= 7) {
      allAttackCells.push(figurePosition - 7);
    }
    if (x >= 2) {
      allAttackCells.push(figurePosition - 9);
    }
  }
};

const getRookAttacks = (
  allAttackCells,
  color,
  x,
  y,
  figurePosition,
  addSaveCells
) => {
  const cellsFigures = document.querySelectorAll(".figure");
  let saveCells = [figurePosition];
  let attackCells = [];

  // left
  for (let index = x + 1; index >= 1 && index <= 8; index++) {
    const checkingCell = checkingCellAndAddSaveCells(
      index,
      y,
      addSaveCells,
      saveCells
    );

    if (figurePosition !== checkingCell) {
      const isMode = getModeCell(cellsFigures, checkingCell, color);
      index = realizeModeCell(saveCells, checkingCell, isMode, index);
    }
  }
  attackCells.push(...saveCells);

  // right
  saveCells = [figurePosition];
  for (let index = x - 1; index >= 1 && index <= 8; index--) {
    const checkingCell = checkingCellAndAddSaveCells(
      index,
      y,
      addSaveCells,
      saveCells
    );

    if (figurePosition !== checkingCell) {
      const isMode = getModeCell(cellsFigures, checkingCell, color);
      index = realizeModeCell(saveCells, checkingCell, isMode, index);
    }
  }
  attackCells.push(...saveCells);

  // forward
  saveCells = [figurePosition];
  for (let index = y; index >= 1 && index <= 8; index++) {
    const checkingCell = checkingCellAndAddSaveCells(
      x,
      index,
      addSaveCells,
      saveCells
    );

    if (figurePosition !== checkingCell) {
      const isMode = getModeCell(cellsFigures, checkingCell, color);
      index = realizeModeCell(saveCells, checkingCell, isMode, index);
    }
  }
  attackCells.push(...saveCells);

  // back
  saveCells = [figurePosition];
  for (let index = y; index >= 1 && index <= 8; index--) {
    const checkingCell = checkingCellAndAddSaveCells(
      x,
      index,
      addSaveCells,
      saveCells
    );

    if (figurePosition !== checkingCell) {
      const isMode = getModeCell(cellsFigures, checkingCell, color);
      index = realizeModeCell(saveCells, checkingCell, isMode, index);
    }
  }
  attackCells.push(...saveCells);

  deleteFigurePositionCell(attackCells, figurePosition);

  allAttackCells.push(...attackCells);
};

const getHorseAttacks = (allAttackCells, x, y) => {
  // (y - 1) * 8 + x - 1 - figurePosition
  if (x >= 2 && y <= 6) {
    allAttackCells.push((y - 1 + 2) * 8 + x - 1 - 1);
  }
  if (x <= 7 && y <= 6) {
    allAttackCells.push((y - 1 + 2) * 8 + x - 1 + 1);
  }
  if (x >= 2 && y >= 3) {
    allAttackCells.push((y - 1 - 2) * 8 + x - 1 - 1);
  }
  if (x <= 7 && y >= 3) {
    allAttackCells.push((y - 1 - 2) * 8 + x - 1 + 1);
  }

  if (x <= 6 && y >= 2) {
    allAttackCells.push((y - 1 - 1) * 8 + x - 1 + 2);
  }
  if (x >= 3 && y >= 2) {
    allAttackCells.push((y - 1 - 1) * 8 + x - 1 - 2);
  }
  if (x <= 6 && y <= 7) {
    allAttackCells.push(y * 8 + x - 1 + 2);
  }
  if (x >= 3 && y <= 7) {
    allAttackCells.push(y * 8 + x - 1 - 2);
  }
};

const getBishopAttacks = (
  allAttackCells,
  color,
  x,
  y,
  figurePosition,
  addSaveCells
) => {
  const cellsFigures = document.querySelectorAll(".figure");
  let saveCells = [figurePosition];
  let attackCells = [];

  for (
    let x_index = x + 1, y_index = y + 1;
    x_index >= 1 && x_index <= 8 && y_index >= 1 && y_index <= 8;
    x_index++, y_index++
  ) {
    // top-left
    const checkingCell = checkingCellAndAddSaveCells(
      x_index,
      y_index,
      addSaveCells,
      saveCells
    );

    if (figurePosition !== checkingCell) {
      const isMode = getModeCell(cellsFigures, checkingCell, color);
      x_index = realizeModeCell(saveCells, checkingCell, isMode, x_index);
    }
  }
  attackCells.push(...saveCells);

  saveCells = [figurePosition];
  for (
    let x_index = x, y_index = y;
    x_index >= 1 && x_index <= 8 && y_index >= 1 && y_index <= 8;
    x_index--, y_index++
  ) {
    // top-right
    const checkingCell = checkingCellAndAddSaveCells(
      x_index,
      y_index,
      addSaveCells,
      saveCells
    );

    if (figurePosition !== checkingCell) {
      const isMode = getModeCell(cellsFigures, checkingCell, color);
      y_index = realizeModeCell(saveCells, checkingCell, isMode, y_index);
    }
  }
  attackCells.push(...saveCells);

  saveCells = [figurePosition];
  for (
    let x_index = x - 1, y_index = y - 1;
    x_index >= 1 && x_index <= 8 && y_index >= 1 && y_index <= 8;
    x_index--, y_index--
  ) {
    // bottom-right
    const checkingCell = checkingCellAndAddSaveCells(
      x_index,
      y_index,
      addSaveCells,
      saveCells
    );

    if (figurePosition !== checkingCell) {
      const isMode = getModeCell(cellsFigures, checkingCell, color);
      x_index = realizeModeCell(saveCells, checkingCell, isMode, x_index);
    }
  }
  attackCells.push(...saveCells);

  saveCells = [figurePosition];
  for (
    let x_index = x, y_index = y;
    x_index >= 1 && x_index <= 8 && y_index >= 1 && y_index <= 8;
    x_index++, y_index--
  ) {
    // bottom-left
    const checkingCell = checkingCellAndAddSaveCells(
      x_index,
      y_index,
      addSaveCells,
      saveCells
    );

    if (figurePosition !== checkingCell) {
      const isMode = getModeCell(cellsFigures, checkingCell, color);
      y_index = realizeModeCell(saveCells, checkingCell, isMode, y_index);
    }
  }
  attackCells.push(...saveCells);

  deleteFigurePositionCell(attackCells, figurePosition);
  allAttackCells.push(...attackCells);
};

const getQueenAttacks = (
  allAttackCells,
  color,
  x,
  y,
  figurePosition,
  addSaveCells
) => {
  const cellsFigures = document.querySelectorAll(".figure");
  let saveCells = [figurePosition];
  let attackCells = [];

  for (let index = x + 1; index >= 1 && index <= 8; index++) {
    const checkingCell = checkingCellAndAddSaveCells(
      index,
      y,
      addSaveCells,
      saveCells
    );

    if (figurePosition !== checkingCell) {
      const isMode = getModeCell(cellsFigures, checkingCell, color);
      index = realizeModeCell(saveCells, checkingCell, isMode, index);
    }
  }
  attackCells.push(...saveCells);

  // right
  saveCells = [figurePosition];
  for (let index = x - 1; index >= 1 && index <= 8; index--) {
    const checkingCell = checkingCellAndAddSaveCells(
      index,
      y,
      addSaveCells,
      saveCells
    );
    if (figurePosition !== checkingCell) {
      const isMode = getModeCell(cellsFigures, checkingCell, color);
      index = realizeModeCell(saveCells, checkingCell, isMode, index);
    }
  }
  attackCells.push(...saveCells);

  // forward
  saveCells = [figurePosition];
  for (let index = y; index >= 1 && index <= 8; index++) {
    const checkingCell = checkingCellAndAddSaveCells(
      x,
      index,
      addSaveCells,
      saveCells
    );

    if (figurePosition !== checkingCell) {
      const isMode = getModeCell(cellsFigures, checkingCell, color);
      index = realizeModeCell(saveCells, checkingCell, isMode, index);
    }
  }
  attackCells.push(...saveCells);

  // back
  saveCells = [figurePosition];
  for (let index = y; index >= 1 && index <= 8; index--) {
    const checkingCell = checkingCellAndAddSaveCells(
      x,
      index,
      addSaveCells,
      saveCells
    );

    if (figurePosition !== checkingCell) {
      const isMode = getModeCell(cellsFigures, checkingCell, color);
      index = realizeModeCell(saveCells, checkingCell, isMode, index);
    }
  }
  attackCells.push(...saveCells);

  // top-left
  saveCells = [figurePosition];
  for (
    let x_index = x + 1, y_index = y + 1;
    x_index >= 1 && x_index <= 8 && y_index >= 1 && y_index <= 8;
    x_index++, y_index++
  ) {
    const checkingCell = checkingCellAndAddSaveCells(
      x_index,
      y_index,
      addSaveCells,
      saveCells
    );
    if (figurePosition !== checkingCell) {
      const isMode = getModeCell(cellsFigures, checkingCell, color);
      x_index = realizeModeCell(saveCells, checkingCell, isMode, x_index);
    }
  }
  attackCells.push(...saveCells);

  // top-right
  saveCells = [figurePosition];
  for (
    let x_index = x, y_index = y;
    x_index >= 1 && x_index <= 8 && y_index >= 1 && y_index <= 8;
    x_index--, y_index++
  ) {
    const checkingCell = checkingCellAndAddSaveCells(
      x_index,
      y_index,
      addSaveCells,
      saveCells
    );
    if (figurePosition !== checkingCell) {
      const isMode = getModeCell(cellsFigures, checkingCell, color);
      y_index = realizeModeCell(saveCells, checkingCell, isMode, y_index);
    }
  }
  attackCells.push(...saveCells);

  // bottom-right
  saveCells = [figurePosition];
  for (
    let x_index = x - 1, y_index = y - 1;
    x_index >= 1 && x_index <= 8 && y_index >= 1 && y_index <= 8;
    x_index--, y_index--
  ) {
    const checkingCell = checkingCellAndAddSaveCells(
      x_index,
      y_index,
      addSaveCells,
      saveCells
    );
    if (figurePosition !== checkingCell) {
      const isMode = getModeCell(cellsFigures, checkingCell, color);
      x_index = realizeModeCell(saveCells, checkingCell, isMode, x_index);
    }
  }
  attackCells.push(...saveCells);

  // bottom-left
  saveCells = [figurePosition];
  for (
    let x_index = x, y_index = y;
    x_index >= 1 && x_index <= 8 && y_index >= 1 && y_index <= 8;
    x_index++, y_index--
  ) {
    const checkingCell = checkingCellAndAddSaveCells(
      x_index,
      y_index,
      addSaveCells,
      saveCells
    );

    if (figurePosition !== checkingCell) {
      const isMode = getModeCell(cellsFigures, checkingCell, color);
      y_index = realizeModeCell(saveCells, checkingCell, isMode, y_index);
    }
  }
  attackCells.push(...saveCells);

  deleteFigurePositionCell(attackCells, figurePosition);
  allAttackCells.push(...attackCells);
};

const getKingAttacks = (allAttackCells, x, y) => {
  // (y - 1) * 8 + x - 1 - figurePosition;
  if (y <= 7) {
    allAttackCells.push((y - 1 + 1) * 8 + x - 1);
  }
  if (x >= 2 && y <= 7) {
    allAttackCells.push((y - 1 + 1) * 8 + x - 1 - 1);
  }
  if (x >= 2) {
    allAttackCells.push((y - 1) * 8 + x - 1 - 1);
  }
  if (x >= 2 && y >= 2) {
    allAttackCells.push((y - 1 - 1) * 8 + x - 1 - 1);
  }
  if (y >= 2) {
    allAttackCells.push((y - 1 - 1) * 8 + x - 1);
  }
  if (x <= 7 && y >= 2) {
    allAttackCells.push((y - 1 - 1) * 8 + x);
  }
  if (x <= 7) {
    allAttackCells.push((y - 1) * 8 + x);
  }
  if (x <= 7 && y <= 7) {
    allAttackCells.push(y * 8 + x);
  }
};
