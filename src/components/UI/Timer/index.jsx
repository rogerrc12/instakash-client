import React, { useEffect, useState } from "react";
import moment from "moment-timezone";

const Timer = (props) => {
  const [countdown, setCountdown] = useState({ minutes: 0, seconds: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      const { timeTillDate, onFinish } = props;
      const now = moment();
      const then = moment(timeTillDate, "DD/MM/YYYY HH:mm");

      const countdown = moment(then - now);

      const minutes = countdown.format("mm");
      const seconds = countdown.format("ss");

      if (minutes === "00" && seconds === "00") {
        setCountdown({ minutes, seconds });
        clearInterval(interval);
        onFinish();
      } else {
        setCountdown({ minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [props]);

  return <span>{`${countdown.minutes}:${countdown.seconds}`}</span>;
};

export default Timer;
