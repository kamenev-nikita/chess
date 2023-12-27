/* eslint-disable react/prop-types */
import { SlActionUndo } from "react-icons/sl";

const ButtonReturnMove = ({
  socket,
  colorPlayer,
  returnMoveInfo,
  setReturnMoveInfo,
  setWaitingRequestInfo,
}) => {
  const clickHandler = () => {
    const userMail = JSON.parse(localStorage.getItem("user")).mail;

    if (returnMoveInfo.isReturnMove) {
      socket.emit("S-get-returnMove", {
        ...returnMoveInfo,
        color: colorPlayer,
      });
      setWaitingRequestInfo({ isRequest: true, request: "ожидайте ответа..." });
    } else {
      setReturnMoveInfo({
        ...returnMoveInfo,
        isReturnMove: true,
        sender: userMail,
      });
    }
  };

  return (
    <div className="buttonReturnMove">
      {returnMoveInfo.isReturnMove ? (
        <>
          <SlActionUndo
            title="отменить"
            className="button gameButton active"
            onClick={() => clickHandler()}
          />
        </>
      ) : (
        <SlActionUndo
          title="Попросить вернуть ход"
          className="button gameButton"
          onClick={() => clickHandler()}
        />
      )}
    </div>
  );
};

export default ButtonReturnMove;
