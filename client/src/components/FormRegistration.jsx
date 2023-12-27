import { useForm } from "react-hook-form";
import { useState, useContext } from "react";
import { AuthContext } from "../context";
import { APIUsersController } from "../API/users";
import { Form } from "react-bootstrap";
import Container from "react-bootstrap/esm/Container";
// import Button from "react-bootstrap/esm/Button";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";

const Reg = () => {
  const { setAuth } = useContext(AuthContext);
  const [repeatPasswordError, setRepeatPasswordError] = useState("");
  const [isRegistration, setIsRegistration] = useState(false);
  const [serverError, setServerError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const EMAIL_REGEXP =
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
  const PASSWORD_REGEXP = /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}/g;

  const onSubmit = (data) => {
    if (isRegistration) {
      //запрос на создание юзера

      if (data.password === data.repeatPassword) {
        APIUsersController.createUser(data, setServerError, setIsRegistration);
      } else {
        setRepeatPasswordError("пароли не совпадают");
      }
    } else {
      // авторизация
      APIUsersController.loginUser(data, setServerError, setAuth);
    }
  };

  return (
    <Container style={{ marginTop: "15%", marginBottom: "5%" }}>
      <Form className="mw-25 text-center" onSubmit={handleSubmit(onSubmit)}>
        <Form.Group
          className="mb-3"
          controlId="formGroupEmail"
          style={{ maxWidth: "400px", margin: "0px auto" }}
        >
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="mail"
            {...register("mail", {
              required: "некоректный mail",
              pattern: EMAIL_REGEXP,
            })}
          />
        </Form.Group>
        {errors.mail && <p>{errors.mail?.message}</p>}

        {isRegistration && (
          <>
            <Form.Group
              className="mb-3"
              controlId="formGroupEmail"
              style={{ maxWidth: "400px", margin: "0px auto" }}
            >
              <Form.Label>Nickname</Form.Label>
              <Form.Control
                type="text"
                placeholder="nickname"
                {...register("nickname", {
                  required: "4-20 символов",
                  minLength: { value: 4, message: "минимум 4 символа" },
                  maxLength: { value: 20, message: "максимум 20 символов" },
                })}
              />
            </Form.Group>
            {errors.nickname && <p>{errors.nickname?.message}</p>}
          </>
        )}

        <Form.Group
          className="mb-3"
          controlId="formGroupPassword"
          style={{ maxWidth: "400px", margin: "0px auto" }}
        >
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="password"
            {...register("password", {
              required: "6-32 символов(используйте a-z A-Z 0-9) ",
              pattern: {
                value: PASSWORD_REGEXP,
                message: "6-32 символов(используйте a-z A-Z 0-9) ",
              },
              minLength: { value: 6, message: "минимум 6 символов" },
              maxLength: { value: 32, message: "минимум 32 символа" },
            })}
          />
        </Form.Group>
        {errors.password && <p>{errors.password?.message}</p>}

        {isRegistration && (
          <>
            <Form.Group
              className="mb-3"
              controlId="formGroupPassword"
              style={{ maxWidth: "400px", margin: "0px auto" }}
            >
              <Form.Label>Repeat password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Repeat password"
                {...register("repeatPassword", {
                  required: "6-32 символов(используйте a-z A-Z 0-9) ",
                  pattern: {
                    value: PASSWORD_REGEXP,
                    message: "6-32 символов(используйте a-z A-Z 0-9) ",
                  },
                  minLength: { value: 6, message: "минимум 6 символов" },
                  maxLength: { value: 32, message: "минимум 32 символа" },
                })}
              />
            </Form.Group>
            {errors.repeatPassword && <p>{errors.repeatPassword?.message}</p>}
            {repeatPasswordError !== "" && <p>{repeatPasswordError}</p>}
            {serverError !== "" && <p>{serverError}</p>}
          </>
        )}

        <div className="buttons">
          {isRegistration ? (
            <Row>
              <Col></Col>
              <Col></Col>
              <Col className="col-lg-2">
                <button className="button" type="submit">
                  зарегистрироваться
                </button>
              </Col>
              <Col>
                <a onClick={() => setIsRegistration(!isRegistration)}>войти</a>
              </Col>
              <Col></Col>
              <Col></Col>
            </Row>
          ) : (
            <Row>
              <Col></Col>
              <Col></Col>
              <Col className="col-lg-2">
                <button className="button" type="submit">
                  войти
                </button>
              </Col>
              <Col>
                <a onClick={() => setIsRegistration(!isRegistration)}>
                  зарегистрироваться
                </a>
              </Col>
              <Col></Col>
              <Col></Col>
            </Row>
          )}
        </div>
      </Form>
    </Container>
  );
};

export default Reg;
