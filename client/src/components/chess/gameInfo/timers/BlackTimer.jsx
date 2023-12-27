/* eslint-disable react/prop-types */
import TimerController from "./TimerController";

const BlackTimer = ({ timer }) => {
  let [seconds, minutes, hours] = TimerController.getCorrectTime(timer);

  return (
    <div className="blackTimer timer">
      <span className="hours">{hours}</span>
      <span>:</span>
      <span className="minutes">{minutes}</span>
      <span>:</span>
      <span className="seconds">{seconds}</span>
    </div>
  );
};

export default BlackTimer;
