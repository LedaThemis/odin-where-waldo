import { useState } from 'react';

import '../styles/Name.css';

const Name = ({ handleNameSubmit, setIsLeaderboardPopupShown }) => {
  const [currentInput, setCurrentInput] = useState('');
  return (
    <div id="name--popup">
      <label htmlFor="name--popup--input" id="name--popup--label">
        Please Enter your name:
      </label>
      <input
        id="name--popup--input"
        type="text"
        name="name"
        onChange={(e) => setCurrentInput(e.target.value)}
        value={currentInput}
      ></input>
      <div id="name--popup--buttons">
        <button id="name--popup--button" className="button" onClick={() => handleNameSubmit(currentInput)}>
          Submit
        </button>
        <button
          id="name--popup--leaderboard--button"
          className="button"
          onClick={() => setIsLeaderboardPopupShown(true)}
        >
          Leaderboard
        </button>
      </div>
    </div>
  );
};

export default Name;
