import { useEffect } from "react";

const useUpdatingRoom = (socket, position) => {
  useEffect(() => {
    const room = JSON.parse(localStorage.getItem("room"));

    socket.emit("S-get-update-room", room);
  }, [position]);
};

export default useUpdatingRoom;
