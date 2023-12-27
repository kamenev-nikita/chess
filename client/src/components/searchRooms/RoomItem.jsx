/* eslint-disable react/prop-types */

import { useContext } from "react";
import { AuthContext } from "../../context";
import { useNavigate } from "react-router-dom";
import { APIRoomsController } from "../../API/room";

const RoomItem = ({ room }) => {
  const { socket } = useContext(AuthContext);
  const navigate = useNavigate();
  const { black, white, rating, timer } = room;

  const connectRoom = () => {
    APIRoomsController.connectRoom(room, socket);

    socket.on("C-get-update-room", (room) => {
      localStorage.setItem("room", JSON.stringify(room));
    });
    socket.emit("connect-room", room);
    socket.on("get-connect-room", (room) => {
      console.log(room._id);
    });

    setTimeout(() => {
      navigate("/room/:" + room._id);
    }, 500);
  };

  return (
    <tr className="roomItem" onClick={connectRoom}>
      {white && <td>{white.nickname}</td>}
      {black && <td>{black.nickname}</td>}

      <td>{timer}</td>

      <td>{rating}</td>

      {white && <td>white</td>}
      {black && <td>black</td>}
    </tr>
  );
};

export default RoomItem;
