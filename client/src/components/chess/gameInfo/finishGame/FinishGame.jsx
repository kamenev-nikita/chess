/* eslint-disable react/prop-types */
import "./finishGame.css";

const FinishGame = ({ winner }) => {
  let scoreWhite = "";
  let scoreBlack = "";

  switch (winner) {
    case "braw":
      scoreWhite = "1/2";
      scoreBlack = "1/2";
      break;

    case "white":
      scoreWhite = "1";
      scoreBlack = "0";
      break;

    case "black":
      scoreWhite = "0";
      scoreBlack = "1";
      break;
  }

  return (
    <div className="finishGame">
      <p>
        результат: <span className="whiteResultGame">{scoreWhite}</span> -{" "}
        <span className="blackResultGame">{scoreBlack}</span>{" "}
      </p>
    </div>
  );
};

export default FinishGame;
