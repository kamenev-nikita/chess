/* eslint-disable react/prop-types */
import "./waitingOpponent.css";

const WaitingOpponent = ({ APIRoomsController, setIsWaitingOpponent }) => {
  const clickHandler = () => {
    APIRoomsController.dellRoom();
    setIsWaitingOpponent(false);
  };

  return (
    <>
      <div className="my-modal">
        <div className="waitingOpponent">
          <p>ожидание соперника...</p>
          <button className="button" onClick={clickHandler}>
            отмена
          </button>
        </div>
      </div>
      <div className="my-loading">
        <div className="main-point">
          <div className="disk"></div>
          <div className="disk"></div>
          <div className="disk"></div>
          <div className="disk"></div>
        </div>
      </div>
    </>
  );
};

export default WaitingOpponent;
