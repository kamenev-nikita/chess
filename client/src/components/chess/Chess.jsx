import GameBoard from "./board/GameBoard";
import GameInfo from "./gameInfo/GameInfo";
import { useState } from "react";
import Chat from "./chat/Chat";
import { Container } from "react-bootstrap";
import "./chess.css";

const Chess = () => {
  const [position, setPosition] = useState(
    "rnbkqbnr/pppppppp/11111111/11111111/11111111/11111111/PPPPPPPP/RNBKQBNR/w/-1/z"
    // "11111111/11111111/11111111/111R1111/1111r111/11111111/11111111/11111111/w/-1/z"
  );

  return (
    <Container className="chess">
      <Chat />
      <div className="gameBoardAndInfo">
        <GameBoard setPosition={setPosition} position={position} />
        <GameInfo position={position} setPosition={setPosition} />
      </div>
    </Container>
  );
};

export default Chess;
