import { useEffect } from "react";

export const useSeeMoveHistory = (
  historyPositions,
  setHistoryPositions,
  position
) => {

  useEffect(() => {
    setHistoryPositions([...historyPositions, position]);
  }, [position]);
};
