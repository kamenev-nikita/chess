import express from "express";
import { RoomController } from "../controllers/RoomController.js";

const roomsRouter = express.Router();

roomsRouter.post("/room/:id/:color", (req, res) => {
  RoomController.joinOpponent(req, res);
});

roomsRouter.post("/room/", (req, res) => {
  RoomController.createRoom(req, res);
});

roomsRouter.get("/rooms/", (req, res) => {
  RoomController.getRooms(req, res);
});

roomsRouter.delete("/room/:id", (req, res) => {
  RoomController.deleteRoom(req, res);
});

export default roomsRouter;
