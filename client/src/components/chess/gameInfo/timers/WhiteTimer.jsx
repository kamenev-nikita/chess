/* eslint-disable react/prop-types */
import TimerController from "./TimerController";

const WhiteTimer = ({ timer }) => {
  let [seconds, minutes, hours] = TimerController.getCorrectTime(timer);

  return (
    <div className="whiteTimer timer">
      <span className="hours">{hours}</span>
      <span>:</span>
      <span className="minutes">{minutes}</span>
      <span>:</span>
      <span className="seconds">{seconds}</span>
    </div>
  );
};

export default WhiteTimer;
