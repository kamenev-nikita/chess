const getColorByFigure = (figure) => {
  const color = {
    "blackPawn.png": "black",
    "blackKing.png": "black",
    "blackRook.png": "black",
    "blackHorse.png": "black",
    "blackBishop.png": "black",
    "blackQueen.png": "black",

    "whitePawn.png": "white",
    "whiteKing.png": "white",
    "whiteRook.png": "white",
    "whiteHorse.png": "white",
    "whiteBishop.png": "white",
    "whiteQueen.png": "white",

    "clearCell.png": "none",
  };

  return color[figure];
};

export default getColorByFigure;
