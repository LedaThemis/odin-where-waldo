import { useState } from 'react';

import '../styles/NamePopup.css';

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
      <button id="name--popup--button" data-testid="name-popup-button" onClick={() => handleNameSubmit(currentInput)}>
        Submit
      </button>
    </div>
  );
};

export default NamePopup;
