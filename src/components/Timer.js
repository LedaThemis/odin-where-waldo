import { useEffect, useRef } from 'react';
import '../styles/Timer.css';

import { getHumanReadableTime } from '../helpers/utils';

const Timer = ({ seconds, setSeconds, isStarted }) => {
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isStarted) {
      intervalRef.current = startTimer();
    }

    return () => clearInterval(intervalRef.current);
  }, [isStarted]);
  const startTimer = () => {
    return setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds + 1);
    }, 1000);
  };

  return (
    <div id="timer">
      <p id="timer--text">{getHumanReadableTime(seconds)}</p>
    </div>
  );
};

export default Timer;
