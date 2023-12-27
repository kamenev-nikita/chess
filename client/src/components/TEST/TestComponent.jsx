import "./Test.css";
import { useState } from "react";

const Test = () => {
  const [isShow, setIsShow] = useState(false);

  return (
    <>
      {/* <div className="my-modal">
        <div className="waitingOpponent">
          <p>ожидание соперника...</p>
          <button className="button">отмена</button>
        </div>
      </div> */}

      <button onClick={() => setIsShow(!isShow)}>click</button>

      {isShow && (
        <div className="my-loading">
          <div className="main-point">
            <div className="disk"></div>
            <div className="disk"></div>
            <div className="disk"></div>
            <div className="disk"></div>
          </div>
        </div>
      )}
    </>
  );
};

export default Test;
