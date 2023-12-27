import User from "../models/User.js";
import bcrypt from "bcrypt";
import handlerError from "../utils/handlerError.js";

class _UserController {
  async registration(req, res) {
    User.findOne({ mail: req.body.mail })
      .then(async (userFind) => {
        if (!userFind) {
          const salt = await bcrypt.genSalt(8);
          const hashPassword = await bcrypt.hash(req.body.password, salt);
          const newUser = new User({ ...req.body, password: hashPassword });
          newUser.save();
          res
            .status(200)
            .json({ message: "вы зарегистрировались", data: newUser });
        } else {
          res
            .status(200)
            .send({ message: "Пользователь с такой почтой уже существует!" });
        }
      })
      .catch((err) => {
        handlerError(res, "неизвесная ошибка ", err);
      });
  }

  async authUser(req, res) {
    User.findOne({ mail: req.params.mail })
      .then(async (user) => {
        const isCurrentPassword = await bcrypt.compare(
          req.params.password,
          user.password
        );

        if (isCurrentPassword) {
          res.status(200).json(user);
        } else {
          res.status(200).json({ message: "неверный пароль" });
        }
      })
      .catch((err) => {
        handlerError(res, "пользователь с такой почтой не найден", err);
      });
  }
}

export const UserController = new _UserController();
