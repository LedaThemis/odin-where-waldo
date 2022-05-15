const submitSelection = (
  positionsData,
  currentSelection,
  setCurrentSelection,
  setCorrectSelections,
  setAvailableSelections,
  currentCoordinates,
  mouseCoordinates,
  setStatusText,
  setIsPopupActive,
  setIsDisplayingStatus
) => {
  if (currentSelection !== '' && checkSelection(positionsData, currentSelection, currentCoordinates)) {
    const selection = getSelection(positionsData, currentSelection);
    markSelectionCorrect(
      currentSelection,
      mouseCoordinates.x,
      mouseCoordinates.y,
      setCorrectSelections,
      setAvailableSelections
    );
    setCurrentSelection('');
    setStatusText(`Correct! You found ${selection.name}!`);
    displayStatus(1500, setIsDisplayingStatus);

    setIsPopupActive(false);
  } else {
    setStatusText('Wrong!');
    displayStatus(1500, setIsDisplayingStatus);
  }
};

const checkIfWon = (availableSelections) => {
  return availableSelections.length === 0;
};

const handleWin = (setIsPopupActive, setIsWon, setShowOverlay) => {
  setIsPopupActive(false);
  setIsWon(true);
  setShowOverlay(true);
};

const getSelection = (positionsData, id) => {
  return positionsData.find((selection) => selection.id === id);
};

const checkSelection = (positionsData, currentSelection, currentCoordinates) => {
  const selection = getSelection(positionsData, currentSelection);
  const currentPercentageX = currentCoordinates.x;
  const currentPercentageY = currentCoordinates.y;

  const { percentageX1, percentageX2, percentageY1, percentageY2 } = getCorrectBorderPositions(
    positionsData,
    selection
  );

  return (
    withinRange(percentageX1, percentageX2, currentPercentageX) &&
    withinRange(percentageY1, percentageY2, currentPercentageY)
  );
};

const getHumanReadableTime = (secondsArg) => {
  const hours = Math.floor(secondsArg / 3600);
  const minutes = Math.floor(secondsArg / 60) % 60;
  const seconds = secondsArg % 60;

  return [hours, minutes, seconds].map((v) => (v < 10 ? '0' + v : v)).join(':');
};

const getAvailableOptions = (options) => {
  return options.map((option) => getOption(option.name, option.id));
};

const getCoordinates = (e) => {
  const rect = e.target.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const width = rect.width;
  const height = rect.height;

  const { percentageX, percentageY } = convertPositionToPercentage(x, y, width, height);

  return { percentageX, percentageY, mouseX: Math.round(e.pageX), mouseY: Math.round(e.pageY) };
};

const startTimer = (setSeconds) => {
  return setInterval(() => {
    setSeconds((prevSeconds) => prevSeconds + 1);
  }, 1000);
};

// Helper helpers
const markSelectionCorrect = (correctSelection, mouseX, mouseY, setCorrectSelections, setAvailableSelections) => {
  setCorrectSelections((prevCorrectSelections) =>
    prevCorrectSelections.concat({ mouseX, mouseY, id: correctSelection })
  );
  setAvailableSelections((prevAvailableSelections) =>
    prevAvailableSelections.filter((selection) => selection.id !== correctSelection)
  );
};

const displayStatus = (ms, setIsDisplayingStatus) => {
  setIsDisplayingStatus(true);
  setTimeout(() => {
    setIsDisplayingStatus(false);
  }, ms);
};

const convertPositionToPercentage = (x, y, width, height) => {
  const percentageX = Math.round((x / width) * 100 * 100) / 100;
  const percentageY = Math.round((y / height) * 100 * 100) / 100;

  return { percentageX, percentageY };
};

const getBorderCoordinates = (x, y, width, height) => {
  return { x1: x, x2: x + width, y1: y, y2: y + height };
};

const getProps = (positionsData) => {
  return positionsData.find((e) => e.id === 'props');
};

const withinRange = (start, end, value) => value >= start && value <= end;

const getCorrectBorderPositions = (positionsData, selection) => {
  const { imageWidth, imageHeight } = getProps(positionsData);
  const { x, y, width, height } = selection;
  const { x1, x2, y1, y2 } = getBorderCoordinates(x, y, width, height);
  const leftBorder = convertPositionToPercentage(x1, y1, imageWidth, imageHeight);
  const rightBorder = convertPositionToPercentage(x2, y2, imageWidth, imageHeight);
  const percentageX1 = leftBorder.percentageX;
  const percentageY1 = leftBorder.percentageY;
  const percentageX2 = rightBorder.percentageX;
  const percentageY2 = rightBorder.percentageY;

  return { percentageX1, percentageX2, percentageY1, percentageY2 };
};

const getOption = (name, value) => {
  return (
    <option key={`${value}-key`} value={value}>
      {name}
    </option>
  );
};

export {
  checkIfWon,
  handleWin,
  submitSelection,
  getHumanReadableTime,
  getAvailableOptions,
  getCoordinates,
  startTimer,
};

export const exportedForTesting = {
  markSelectionCorrect,
  displayStatus,
  getSelection,
  checkSelection,
  convertPositionToPercentage,
  getBorderCoordinates,
  getProps,
  withinRange,
  getCorrectBorderPositions,
  getOption,
};
