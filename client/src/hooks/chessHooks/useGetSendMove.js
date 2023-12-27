import { useEffect } from "react";

export const useGetSendMove = (socket, setPosition, position) => {
  useEffect(() => {
    socket.on("get-move", (position) => {
      setPosition(position);
    });
  }, []);

  useEffect(() => {
    socket.emit("send-move", position);
  }, [position]);
};

// setPosition(position); вызывается все больше раз (нужна отвязка события)
