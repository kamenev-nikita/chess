import { useEffect } from "react";

export const useSeeFirstBlackMove = (
  historyPositions,
  isFirstBlackMove,
  setIsFirstBlackMove,
  color
) => {
  useEffect(() => {
    if (
      isFirstBlackMove === false &&
      historyPositions.length === 3 &&
      color === "white"
    ) {
      setIsFirstBlackMove(true);
    }
    if (
      isFirstBlackMove === false &&
      historyPositions.length === 4 &&
      color === "black"
    ) {
      setIsFirstBlackMove(true);
    }
  }, [historyPositions]);
};
