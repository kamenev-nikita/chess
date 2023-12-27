import { Schema, model } from "mongoose";

const userSchema = new Schema({
  mail: String,
  nickname: String,
  password: String,
});

const User = new model("User", userSchema);
export default User;
