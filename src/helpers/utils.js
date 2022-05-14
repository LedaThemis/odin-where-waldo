const convertPositionToPercentage = (x, y, width, height) => {
  const percentageX = Math.round((x / width) * 100 * 100) / 100;
  const percentageY = Math.round((y / height) * 100 * 100) / 100;

  return { percentageX, percentageY };
};

const getBorderCoordinates = (x, y, width, height) => {
  return { x1: x, x2: x + width, y1: y, y2: y + height };
};

const getSelection = (positionsData, id) => {
  return positionsData.find((selection) => selection.id === id);
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

const getHumanReadableTime = (seconds) => {
  return new Date(seconds * 1000).toISOString().substr(11, 8);
};

const getOption = (name, value) => {
  return (
    <option key={`${value}-key`} value={value}>
      {name}
    </option>
  );
};
const getAvailableOptions = (options) => {
  return options.map((option) => getOption(option.name, option.id));
};

export { convertPositionToPercentage, getSelection, checkSelection, getHumanReadableTime, getAvailableOptions };
