import express from "express";
import { UserController } from "../controllers/UserController.js";

const userRoute = express.Router();

userRoute.post("/user/", async (req, res) => {
  UserController.registration(req, res);
});

userRoute.get("/user/:mail/:password", async (req, res) => {
  UserController.authUser(req, res);
});

export default userRoute;
