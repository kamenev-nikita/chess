import Room from "../models/Room.js";

const socketsRooms = (socket) => {
  let createdRoom = {};

  socket.on("create-room", (room) => {
    createdRoom = room;
    socket.join(room._id);
    console.log("создатель подключился в комнату: " + room._id);
  });

  socket.on("connect-room", (room) => {
    createdRoom = room;
    console.log("соперник подключился в комнату: " + room._id);
    socket.join(room._id);
    socket.emit("get-connect-room", room);
    socket.in(room._id).emit("get-connect-room", "/room/:" + room._id);
  });

  socket.on("send-move", (position) => {
    socket.emit("get-move", position);
    socket.broadcast.emit("get-move", position);
  });

  socket.on("set-timers", (timers) => {
    socket.emit("get-timers", timers);
    socket.broadcast.emit("get-timers", timers);
  });

  socket.on("S-get-update-room", (room) => {
    socket.emit("C-get-update-room", room);
    socket.broadcast.emit("C-get-update-room", room);
  });

  socket.on("S-get-resultGame", (resultGame) => {
    socket.emit("C-get-resultGame", resultGame);
    socket.broadcast.emit("C-get-resultGame", resultGame);
  });

  // chat

  socket.on("S-get-message", (newMessages) => {
    socket.broadcast.emit("C-get-message", newMessages);
  });

  // gameButtons

  socket.on("S-get-braw", (brawInfo) => {
    socket.broadcast.emit("C-get-braw", brawInfo);
  });

  socket.on("S-get-returnMove", (returnMoveInfo) => {
    socket.emit("C-get-returnMove", returnMoveInfo);
    socket.broadcast.emit("C-get-returnMove", returnMoveInfo);
  });

  socket.on("S-get-waitingRequest", (waitingRequestInfo) => {
    socket.broadcast.emit("C-get-waitingRequest", waitingRequestInfo);
  });

  socket.on("disconnect", () => {
    console.log(createdRoom);
    Room.deleteOne({ _id: createdRoom._id }).then((data) => {
      console.log(data);
    });
  });
};

export default socketsRooms;
