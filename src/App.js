import { useEffect, useState } from 'react';

import './styles/App.css';

import Display from './components/Display';
import Header from './components/Header';
import Status from './components/Status';
import SelectionPopup from './components/SelectionPopup';
import Marker from './components/Marker';
import Timer from './components/Timer';
import Overlay from './components/Overlay';
import WonDisplay from './components/WonDisplay';

import whereWaldoImage from './assets/where-waldo-1.jpeg';

import { fetchPositionsFromDB } from './helpers/db';
import { checkIfWon, handleWin, submitSelection } from './helpers/utils';

const App = () => {
  const [currentCoordinates, setCurrentCoordinates] = useState({ x: 0, y: 0 });
  const [mouseCoordinates, setMouseCoordinates] = useState({ x: 0, y: 0 });
  const [isPopupActive, setIsPopupActive] = useState(false);

  const [positionsData, setPositionsData] = useState([]);
  const [availableSelections, setAvailableSelections] = useState([]);
  const [currentSelection, setCurrentSelection] = useState('');
  const [correctSelections, setCorrectSelections] = useState([]);

  const [isDisplayingStatus, setIsDisplayingStatus] = useState(false);
  const [statusText, setStatusText] = useState('');

  const [seconds, setSeconds] = useState(0);

  const [isStarted, setIsStarted] = useState(false);
  const [isWon, setIsWon] = useState(false);

  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    (async () => {
      const fetchedPositions = await fetchPositionsFromDB('1');
      setPositionsData(fetchedPositions.sort((a, b) => a.name - b.name));
      setAvailableSelections(fetchedPositions.filter((pos) => pos.id !== 'props'));
    })();
  }, []);

  useEffect(() => {
    if (positionsData.length === 0) return;
    if (checkIfWon(availableSelections)) {
      handleWin(setIsPopupActive, setIsWon, setShowOverlay);
    }
  }, [availableSelections]);

  return (
    <div className="App">
      {isDisplayingStatus && <Status text={statusText} />}
      {isWon && <WonDisplay seconds={seconds} />}
      {showOverlay && <Overlay />}

      <div id="header-with-timer">
        <Header isStarted={isStarted} />
        {!isWon && <Timer seconds={seconds} setSeconds={setSeconds} isStarted={isStarted} />}
      </div>

      {isPopupActive && (
        <SelectionPopup
          x={mouseCoordinates.x}
          y={mouseCoordinates.y}
          availableSelections={availableSelections}
          currentSelection={currentSelection}
          setCurrentSelection={setCurrentSelection}
          submitSelection={() =>
            submitSelection(
              positionsData,
              currentSelection,
              setCurrentCoordinates,
              setCorrectSelections,
              setAvailableSelections,
              currentCoordinates,
              mouseCoordinates,
              setStatusText,
              setIsPopupActive,
              setIsDisplayingStatus
            )
          }
        />
      )}

      {isPopupActive && <Marker x={mouseCoordinates.x} y={mouseCoordinates.y} />}

      {!isWon && correctSelections.map(({ id, mouseX, mouseY }) => <Marker key={id} x={mouseX} y={mouseY} />)}

      <Display
        imageObject={whereWaldoImage}
        setCurrentCoordinates={setCurrentCoordinates}
        setMouseCoordinates={setMouseCoordinates}
        setIsPopupActive={setIsPopupActive}
        isStarted={isStarted}
        setIsStarted={setIsStarted}
      />
    </div>
  );
};

export default App;
