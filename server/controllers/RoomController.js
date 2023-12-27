import Room from "../models/Room.js";
import handlerError from "../utils/handlerError.js";

class _RoomController {
  joinOpponent(req, res) {
    let opponentColor = "white";

    if (req.params.color === "white") {
      opponentColor = "black";
    }

    Room.findOneAndUpdate(
      { _id: req.params.id },
      { show: false, [opponentColor]: { ...req.body.opponent } },
      { new: true }
    )
      .then((room) => {
        res.status(200).json({
          message: "соперник успешно зашел в комнату",
          room: room,
          color: opponentColor,
        });
      })
      .catch((err) =>
        handlerError(res, "ошибка подлючения соперника в комнату", err)
      );
  }

  createRoom(req, res) {
    const { color, rating, time, creator } = req.body;
    let opponentColor = "white";
    if (color === "white") {
      opponentColor = "black";
    }

    const newRoom = new Room({
      [color]: { ...creator, timer: time },
      [opponentColor]: null,
      rating: rating,
      timer: time,
      color: color,
      show: true,
    });
    newRoom.save();
    res.status(200).json({ message: "комната создана", data: newRoom });
  }

  getRooms(req, res) {
    Room.find({ show: true })
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => handlerError(res, "ошибка получения комнат", err));
  }

  deleteRoom(req, res) {
    Room.deleteOne({ _id: req.params.id })
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => handlerError(res, "ошибка получения комнат", err));
  }
}

export const RoomController = new _RoomController();
