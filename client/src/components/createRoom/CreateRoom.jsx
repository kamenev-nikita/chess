import { useContext, useState } from "react";
import { AuthContext } from "../../context";
import { useNavigate } from "react-router-dom";
import { APIRoomsController } from "../../API/room";
import WaitingOpponent from "./WaitingOpponent";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const CreateRoom = () => {
  const navigate = useNavigate();
  const { socket } = useContext(AuthContext);
  const [defaultValues, setDefaultValues] = useState({
    color: "white",
    rating: "yes",
    time: "1+0",
  });
  const [isWaitingOpponent, setIsWaitingOpponent] = useState(false);
  const selects = [
    {
      valueName: "color",
      name: "цвет",
      startLabel: 0,
      options: [
        { text: "белый", value: "white" },
        { text: "черный", value: "black" },
      ],
    },
    {
      valueName: "rating",
      name: "рейтинговая",
      startLabel: 2,
      options: [
        { text: "нет", value: "yes" },
        { text: "да", value: "no" },
      ],
    },
  ];
  const timers = ["1+0", "2+1", "3+0", "3+2"];

  const handlerSubmit = () => {
    APIRoomsController.createRoom(defaultValues, socket);
    setIsWaitingOpponent(true);

    socket.on("C-get-update-room", (room) => {
      localStorage.setItem("room", JSON.stringify(room));
    });

    socket.on("get-connect-room", (navLink) => {
      setTimeout(() => {
        navigate(navLink);
      }, 500);
    });
  };

  const changeValue = (e, valueName, value) => {
    setDefaultValues({
      ...defaultValues,
      [valueName]: value,
    });
  };

  return (
    <Container style={{ maxWidth: "400px" }}>
      {isWaitingOpponent && (
        <WaitingOpponent
          APIRoomsController={APIRoomsController}
          setIsWaitingOpponent={setIsWaitingOpponent}
        />
      )}

      {selects.map((select) => (
        <Row key={`inline-${select.name}`} className="mb-3">
          <>
            <Col>{select.name}: </Col>
            {select.options.map((option, index) => {
              return (
                <Col key={index}>
                  {index === 0 ? (
                    <Form.Check
                      inline
                      label={option.text}
                      name={select.name}
                      type="radio"
                      id={`inline-${select.startLabel + index}-1`}
                      onClick={(e) =>
                        changeValue(e, select.valueName, option.value)
                      }
                      defaultChecked
                    />
                  ) : (
                    <Form.Check
                      inline
                      label={option.text}
                      name={select.name}
                      type="radio"
                      id={`inline-${select.startLabel + index}-1`}
                      onClick={(e) =>
                        changeValue(e, select.valueName, option.value)
                      }
                    />
                  )}
                </Col>
              );
            })}
          </>
        </Row>
      ))}

      <Form.Select
        aria-label="Default select example"
        onChange={(e) => {
          setDefaultValues({
            ...defaultValues,
            time: e.target.value,
          });
        }}
      >
        {timers.map((timer, index) => {
          return (
            <option key={index} value={timer}>
              {timer}
            </option>
          );
        })}
      </Form.Select>

      <Row>
        <Col></Col>
        <Col className="col-4">
          <Button
            type="button"
            className="row-centered"
            onClick={handlerSubmit}
            style={{ margin: "10px auto" }}
          >
            создать
          </Button>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
};

export default CreateRoom;
