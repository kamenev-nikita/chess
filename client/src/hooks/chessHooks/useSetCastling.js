import { useEffect } from "react";

export const useSetCastling = () => {
  useEffect(() => {
    const room = JSON.parse(localStorage.getItem("room"));
    const [minutes, addTime] = room.timer.split("+");
    const timers = { white: minutes, black: minutes, addTime: addTime };
    room.timers = timers;

    localStorage.setItem("room", JSON.stringify(room));
    localStorage.setItem("castlingOO", "true");
    localStorage.setItem("castlingOOO", "true");
    // localStorage.setItem("isFirstBlackMove", "false");
  }, []);
};
