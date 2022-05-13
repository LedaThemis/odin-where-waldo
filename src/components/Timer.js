import { useEffect, useRef } from 'react';
import '../styles/Timer.css';

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

  const stopTimer = () => {
    clearInterval(intervalRef.current);
  };

  const getHumanReadableTime = (seconds) => {
    return new Date(seconds * 1000).toISOString().substr(11, 8);
  };

  return (
    <div id="timer">
      <p id="timer--text">{getHumanReadableTime(seconds)}</p>
    </div>
  );
};

export default Timer;
