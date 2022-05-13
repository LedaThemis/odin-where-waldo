import '../styles/WonDisplay.css';

import { getHumanReadableTime } from '../helpers/utils';

const WonDisplay = ({ seconds }) => {
  return (
    <div id="won--display">
      <h1 id="won--display--text">You won, with a time of {getHumanReadableTime(seconds)}!</h1>
      <button id="won--display--button" onClick={() => window.location.reload()}>
        Refresh Page
      </button>
    </div>
  );
};

export default WonDisplay;
