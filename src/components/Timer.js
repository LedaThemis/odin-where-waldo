import { useEffect, useRef } from 'react';
import '../styles/Timer.css';

import { getHumanReadableTime, startTimer } from '../helpers/utils';

const Timer = ({ seconds, setSeconds, isStarted }) => {
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isStarted) {
      intervalRef.current = startTimer(setSeconds);
    }

    return () => clearInterval(intervalRef.current);
  }, [isStarted]);

  return (
    <div id="timer">
      <p id="timer--text">{getHumanReadableTime(seconds)}</p>
    </div>
  );
};

export default Timer;
