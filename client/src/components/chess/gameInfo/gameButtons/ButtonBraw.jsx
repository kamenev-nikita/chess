/* eslint-disable react/prop-types */

const ButtonBraw = ({
  socket,
  brawInfo,
  setBrawInfo,
  setWaitingRequestInfo,
}) => {
  const userMail = JSON.parse(localStorage.getItem("user")).mail;

  const clickHandler = () => {
    if (brawInfo.isBraw) {
      socket.emit("S-get-braw", brawInfo);
      setWaitingRequestInfo({ isRequest: true, request: "ожидайте ответа..." });
    } else {
      setBrawInfo({ isBraw: true, sender: userMail });
    }
  };

  return (
    <div className="buttonBraw">
      {brawInfo.isBraw ? (
        <>
          <button
            title="Предложить ничью"
            className="button gameButton active"
            onClick={() => clickHandler()}
          >
            1/2
          </button>
        </>
      ) : (
        <button
          title="Предложить ничью"
          className="button gameButton"
          onClick={() => clickHandler()}
        >
          1/2
        </button>
      )}
    </div>
  );
};

export default ButtonBraw;
