import axios from "axios";
import { handlerError } from "../utils/handlerError";

class _APIRoomsController {
  createRoom(defaultValues, socket) {
    axios
      .post("http://localhost:5000/room", {
        ...defaultValues,
        creator: JSON.parse(localStorage.getItem("user")),
      })
      .then((data) => {
        const room = data.data.data;

        socket.emit("create-room", room); // сохранение комнаты в socket server

        localStorage.setItem("room", JSON.stringify(room));
        localStorage.setItem("roomId", room._id);
        localStorage.setItem("color", defaultValues.color);
      })
      .catch((err) => handlerError(err));
  }

  connectRoom(room, socket) {
    axios
      .post("http://localhost:5000/room/" + room._id + "/" + room.color, {
        opponent: JSON.parse(localStorage.getItem("user")),
      })
      .then((data) => {
        localStorage.setItem("room", JSON.stringify(data.data.room));
        localStorage.setItem("color", data.data.color);
        localStorage.setItem("roomId", data.data._id);
        console.log("успешкое подключение в комнату");
        socket.emit("S-get-update-room", data.data.room);
      })
      .catch((err) => handlerError(err));
  }

  getRooms(setRooms) {
    axios
      .get("http://localhost:5000/rooms")
      .then((data) => {
        setRooms(data.data);
      })
      .catch((err) => {
        console.log("ошибка: " + err);
      });
  }

  dellRoom() {
    const roomId = localStorage.getItem("roomId");

    axios.delete("http://localhost:5000/room/" + roomId);
  }
}

export const APIRoomsController = new _APIRoomsController();
