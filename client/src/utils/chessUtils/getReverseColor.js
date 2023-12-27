const getReverseColor = (color) => {
  const reverseColor = {
    white: "black",
    black: "white",
  };

  return reverseColor[color];
};

export default getReverseColor;
