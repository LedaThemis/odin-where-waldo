import { useState } from 'react';

import '../styles/Name.css';

const NamePopup = ({ handleNameSubmit }) => {
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
        <button id="name--popup--leaderboard--button" className="button">
          Leaderboard
        </button>
      </div>
    </div>
  );
};

export default NamePopup;
