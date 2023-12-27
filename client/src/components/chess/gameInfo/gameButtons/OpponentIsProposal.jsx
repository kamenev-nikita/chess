/* eslint-disable react/prop-types */
import { BsCheckLg } from "react-icons/bs";
import { BsXLg } from "react-icons/bs";

const OpponentIsProposal = ({
  socket,
  setPosition,
  brawInfo,
  setBrawInfo,
  returnMoveInfo,
  setReturnMoveInfo,
  historyPositions,
  setHistoryPositions,
  waitingRequestInfo,
  setWaitingRequestInfo,
}) => {
  const userMail = JSON.parse(localStorage.getItem("user")).mail;
  const isShowBraw = brawInfo.sender !== userMail && brawInfo.sender !== "";
  const isShowReturnMove =
    returnMoveInfo.sender !== userMail && returnMoveInfo.sender !== "";

  const isShowRequestBraw =
    waitingRequestInfo.isRequest &&
    brawInfo.sender === userMail &&
    brawInfo.sender !== "";
  const isShowRequestReturnMove =
    waitingRequestInfo.isRequest &&
    returnMoveInfo.sender === userMail &&
    returnMoveInfo.sender !== "";

  const acceptBrawHandler = () => {
    socket.emit("S-get-resultGame", { winner: "braw" });
  };

  const rejectBrawHandler = () => {
    setBrawInfo({ isBraw: false, sender: "" });
    setWaitingRequestInfo({ isRequest: false, request: "" });

    socket.emit("S-get-braw", { isBraw: false, sender: "" });
    socket.emit("S-get-waitingRequest", { isRequest: false, request: "" });
  };

  const acceptReturnMoveHandler = () => {
    const movesInHistory = historyPositions.length;

    // возврат хода
    if (movesInHistory <= 3) {
      setPosition(historyPositions[0]);
      setHistoryPositions([historyPositions[0]]);
    } else {
      if (returnMoveInfo.color === "white") {
        if (movesInHistory % 2 === 1) {
          const newMovesHistory = historyPositions.slice(
            0,
            historyPositions.length - 2
          );

          setPosition(newMovesHistory.pop());
          setHistoryPositions(newMovesHistory);
        } else {
          const newMovesHistory = historyPositions.slice(
            0,
            historyPositions.length - 1
          );

          setPosition(newMovesHistory.pop());
          setHistoryPositions(newMovesHistory);
        }
      } else {
        if (movesInHistory % 2 === 0) {
          const newMovesHistory = historyPositions.slice(
            0,
            historyPositions.length - 2
          );

          setPosition(newMovesHistory.pop());
          setHistoryPositions(newMovesHistory);
        } else {
          const newMovesHistory = historyPositions.slice(
            0,
            historyPositions.length - 1
          );

          setPosition(newMovesHistory.pop());
          setHistoryPositions(newMovesHistory);
        }
      }
    }

    setReturnMoveInfo({ isReturnMove: false, sender: "" });
    setWaitingRequestInfo({ isRequest: false, request: "" });

    socket.emit("S-get-returnMove", { isReturnMove: false, sender: "" });
    socket.emit("S-get-waitingRequest", { isRequest: false, request: "" });
  };

  const rejectReturnMoveHandler = () => {
    setReturnMoveInfo({ isReturnMove: false, sender: "" });
    setWaitingRequestInfo({ isRequest: false, request: "" });

    socket.emit("S-get-returnMove", { isReturnMove: false, sender: "" });
    socket.emit("S-get-waitingRequest", { isRequest: false, request: "" });
  };

  return (
    <div className="opponentIsProposal">
      {isShowBraw && (
        <>
          <BsCheckLg
            onClick={() => acceptBrawHandler()}
            className="acceptButton"
          />
          <p style={{ textAlign: "center" }}>Соперник предлагает ничью</p>
          <BsXLg onClick={() => rejectBrawHandler()} className="rejectButton" />
        </>
      )}

      {isShowReturnMove && (
        <>
          <BsCheckLg
            onClick={() => acceptReturnMoveHandler()}
            className="acceptButton"
          />
          <p style={{ textAlign: "center" }}>Соперник просит вернуть ход</p>
          <BsXLg
            onClick={() => rejectReturnMoveHandler()}
            className="rejectButton"
          />
        </>
      )}

      {isShowRequestBraw && <>{waitingRequestInfo.request}</>}
      {isShowRequestReturnMove && <>{waitingRequestInfo.request}</>}
    </div>
  );
};

export default OpponentIsProposal;
