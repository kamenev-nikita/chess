import axios from "axios";
import { handlerError } from "../utils/handlerError";

class _APIUsersController {
  createUser(newUser, setServerError, setIsRegistration) {
    axios
      .post("http://localhost:5000/user", { ...newUser })
      .then((res) => {
        setServerError(res.data.message);
        if (
          res.data.message !== "Пользователь с такой почтой уже существует!"
        ) {
          setTimeout(() => {
            setIsRegistration(false);
            setServerError('Нажмите "войти"');
          }, 1000);
        }
      })
      .catch((err) => handlerError(err));
  }

  loginUser(data, setServerError, setAuth) {
    axios
      .get("http://localhost:5000/user/" + data.mail + "/" + data.password)
      .then(function (user) {
        if (user.data.message) {
          setServerError(user.data.message);
        } else {
          localStorage.setItem("user", JSON.stringify(user.data));
          setAuth(true);
        }
      })
      .catch((err) => handlerError(err));
  }
}

export const APIUsersController = new _APIUsersController();
