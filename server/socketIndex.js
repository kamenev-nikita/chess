import { Server } from "socket.io";
import socketsRooms from "./sockets/Rooms.js";

const socketStart = () => {
  const io = new Server(3000, {
    cors: {
      origin: "*",
    },
  });

  let createdRoomId;

  io.on("connection", (socket) => {
    socketsRooms(socket);
    socket.emit("hello", "socket Hello");
  });

  io.listen(3001, () => {
    console.log("сервер стартовал на 3001 порту");
  });
};

export default socketStart;
