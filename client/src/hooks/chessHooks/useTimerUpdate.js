import { useEffect } from "react";

export const useTimerUpdate = (
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
) => {
  // старт таймера
  useEffect(() => {
    if (historyPositions.length === 3) {
      setIsUpdateTimer(!isUpdateTimer);
    }
  }, [historyPositions]);

  // убирает время
  useEffect(() => {
    const getFullColor = { w: "white", b: "black" };

    if (historyPositions.length >= 3) {
      TimerController.subtractTimeFromTimer(
        setTimer,
        timers,
        getFullColor[colorMove],
        setIsMat,
        socket
      );

      // запустить новый таймаут
      setTimeout(() => {
        if (isMat) return false;
        setIsUpdateTimer(!isUpdateTimer);
      }, 1000);
    }
  }, [isUpdateTimer]);

  // добавляет время
  useEffect(() => {
    if (historyPositions.length >= 3) {
      if (historyPositions.length % 2 === 1) {
        TimerController.addTime("black", setTimer, timers);
      } else {
        TimerController.addTime("white", setTimer, timers);
      }
    }
  }, [historyPositions]);
};
