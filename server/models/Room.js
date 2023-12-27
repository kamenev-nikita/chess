import { Schema, model } from "mongoose";

const roomSchema = new Schema({
  white: {
    mail: String,
    nickname: String,
    password: String,
    timer: String,
  },
  black: {
    mail: String,
    nickname: String,
    password: String,
    timer: String,
  },
  rating: String,
  timer: String,
  color: String,
  show: Boolean,
});

const Room = new model("Room", roomSchema);
export default Room;
