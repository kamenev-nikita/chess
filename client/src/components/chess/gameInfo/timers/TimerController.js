class _TimerController {
  getTimeByTimer = (timer) => {
    const [_minutes, addTime] = timer.split("+");
    const [seconds, minutes, hours] = this.getSecMinHoursByMinutes(_minutes);
    const timers = {
      white: [seconds, minutes, hours],
      black: [seconds, minutes, hours],
      addTime: addTime,
    };

    return timers;
  };

  getSecMinHoursByMinutes = (mins) => {
    let minsNum;

    if (mins === "1/4") {
      return [15, 0, 0];
    } else if (mins === "1/2") {
      return [30, 0, 0];
    } else {
      minsNum = Number(mins);
    }

    if (minsNum >= 1 && minsNum <= 59) {
      return [0, minsNum, 0];
    } else {
      let hours = 0;

      while (minsNum >= 60) {
        minsNum = minsNum - 60;
        hours++;
      }

      return [0, minsNum, hours];
    }
  };

  subtractTimeFromTimer = (setTimer, timers, colorMove, setIsMat, socket) => {
    const [seconds, minutes, hours] = timers[colorMove];
    const reverseColor = { white: "black", black: "white" };

    const _setTimer = (timer) => {
      if (colorMove === "white") {
        setTimer({ ...timers, white: timer });
      } else {
        setTimer({ ...timers, black: timer });
      }
    };

    if (seconds === 0) {
      if (minutes === 0) {
        if (hours === 0 && minutes === 0 && seconds === 0) {
          setIsMat(true);
          socket.emit("S-get-resultGame", { winner: reverseColor[colorMove] });
        } else {
          _setTimer([59, 59, hours - 1]);
        }
      } else {
        _setTimer([59, minutes - 1, hours]);
      }
    } else {
      _setTimer([seconds - 1, minutes, hours]);
    }
  };

  addTime = (color, setTimer, timers) => {
    const _setTimer = (timer) => {
      if (color === "white") {
        setTimer({ ...timers, white: timer });
      } else {
        setTimer({ ...timers, black: timer });
      }
    };

    const addTime = Number(timers.addTime);
    const [seconds, minutes, hours] = timers[color];

    const newSeconds = seconds + addTime;

    if (newSeconds >= 60) {
      if (minutes + 1 >= 60) {
        _setTimer([newSeconds - 60, 0, hours + 1]);
      } else {
        _setTimer([newSeconds - 60, minutes + 1, hours]);
      }
    } else {
      _setTimer([newSeconds, minutes, hours]);
    }
  };

  getCorrectTime = (timer) => {
    let [seconds, minutes, hours] = timer;

    seconds = String(seconds);
    minutes = String(minutes);
    hours = String(hours);

    if (seconds.length === 1) {
      seconds = "0" + seconds;
    }
    if (minutes.length === 1) {
      minutes = "0" + minutes;
    }
    if (hours.length === 1) {
      hours = "0" + hours;
    }

    return [seconds, minutes, hours];
  };
}

export default new _TimerController();
