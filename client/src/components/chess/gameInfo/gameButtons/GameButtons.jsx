/* eslint-disable react/prop-types */
import ButtonReturnMove from "./ButtonReturnMove";
import ButtonBraw from "./ButtonBraw";
import ButtonGiveUp from "./ButtonGiveUp";
import { useState, useEffect } from "react";
import OpponentIsProposal from "./OpponentIsProposal";
import { Container, Row, Col } from "react-bootstrap";

const GameButtons = ({
  socket,
  setPosition,
  colorPlayer,
  historyPositions,
  setHistoryPositions,
}) => {
  const [brawInfo, setBrawInfo] = useState({ isBraw: false, sender: "" });
  const [returnMoveInfo, setReturnMoveInfo] = useState({
    isReturnMove: false,
    sender: "",
  });
  const [waitingRequestInfo, setWaitingRequestInfo] = useState({
    isRequest: false,
    request: "",
  });

  // кидает табличку (принять/отказ)
  useEffect(() => {
    socket.on("C-get-braw", (brawInfo) => {
      setBrawInfo(brawInfo);
    });

    socket.on("C-get-returnMove", (returnMoveInfo) => {
      setReturnMoveInfo(returnMoveInfo);
    });

    socket.on("C-get-waitingRequest", (waitingRequestInfo) => {
      setWaitingRequestInfo(waitingRequestInfo);
    });
  }, []);

  return (
    <Container className="allGameButtons">
      <Row className="gameButtons">
        <Col className="col-4">
          <ButtonReturnMove
            socket={socket}
            colorPlayer={colorPlayer}
            returnMoveInfo={returnMoveInfo}
            setReturnMoveInfo={setReturnMoveInfo}
            setWaitingRequestInfo={setWaitingRequestInfo}
          />
        </Col>
        <Col className="col-4">
          <ButtonBraw
            socket={socket}
            brawInfo={brawInfo}
            setBrawInfo={setBrawInfo}
            setWaitingRequestInfo={setWaitingRequestInfo}
          />
        </Col>
        <Col className="col-4">
          <ButtonGiveUp />
        </Col>
      </Row>

      <OpponentIsProposal
        socket={socket}
        setPosition={setPosition}
        brawInfo={brawInfo}
        setBrawInfo={setBrawInfo}
        returnMoveInfo={returnMoveInfo}
        setReturnMoveInfo={setReturnMoveInfo}
        historyPositions={historyPositions}
        setHistoryPositions={setHistoryPositions}
        waitingRequestInfo={waitingRequestInfo}
        setWaitingRequestInfo={setWaitingRequestInfo}
      />
    </Container>
  );
};

export default GameButtons;
