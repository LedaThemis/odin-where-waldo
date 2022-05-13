import Display from './components/Display';
import Header from './components/Header';
import whereWaldoImage from './assets/where-waldo-1.jpeg';
import { useEffect, useState } from 'react';

import { fetchPositionsFromDB } from './helpers/db';
import { checkSelection, getSelection } from './helpers/utils';

import SelectionPopup from './components/SelectionPopup';
import Marker from './components/Marker';

const App = () => {
  const [currentCoordinates, setCurrentCoordinates] = useState({ x: 0, y: 0 });
  const [mouseCoordinates, setMouseCoordinates] = useState({ x: 0, y: 0 });
  const [isPopupActive, setIsPopupActive] = useState(true);

  const [positionsData, setPositionsData] = useState([]);
  const [availableSelections, setAvailableSelections] = useState([]);
  const [currentSelection, setCurrentSelection] = useState('');
  const [correctSelections, setCorrectSelections] = useState([]);

  useEffect(() => {
    (async () => {
      const fetchedPositions = await fetchPositionsFromDB('1');
      setPositionsData(fetchedPositions.sort((a, b) => a.name - b.name));
      setAvailableSelections(fetchedPositions.filter((pos) => pos.id !== 'props'));
    })();
  }, []);

  const markSelectionCorrect = (correctSelection, mouseX, mouseY) => {
    setCorrectSelections(correctSelections.concat({ mouseX, mouseY, id: correctSelection }));
    setAvailableSelections(availableSelections.filter((selection) => selection.id !== correctSelection));
  };

  const submitSelection = () => {
    if (checkSelection(positionsData, currentSelection, currentCoordinates)) {
      const selection = getSelection(positionsData, currentSelection);

      markSelectionCorrect(currentSelection, mouseCoordinates.x, mouseCoordinates.y);
      console.log(`Correct! You found ${selection.name}!`);
    } else {
      console.log('Wrong!');
    }
  };

  return (
    <div className="App">
      <Header />
      {isPopupActive && (
        <SelectionPopup
          x={mouseCoordinates.x}
          y={mouseCoordinates.y}
          availableSelections={availableSelections}
          currentSelection={currentSelection}
          setCurrentSelection={setCurrentSelection}
          submitSelection={submitSelection}
        />
      )}
      {isPopupActive && <Marker x={mouseCoordinates.x} y={mouseCoordinates.y} />}
      {correctSelections.map(({ id, mouseX, mouseY }) => (
        <Marker key={id} x={mouseX} y={mouseY} />
      ))}
      <Display
        imageObject={whereWaldoImage}
        setCurrentCoordinates={setCurrentCoordinates}
        setMouseCoordinates={setMouseCoordinates}
      />
    </div>
  );
};

export default App;
