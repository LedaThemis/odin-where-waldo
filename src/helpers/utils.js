const convertPositionToPercentage = (x, y, width, height) => {
  const percentageX = Math.round((x / width) * 100 * 100) / 100;
  const percentageY = Math.round((y / height) * 100 * 100) / 100;

  return { percentageX, percentageY };
};

const compareStrings = (a, b) => {
  return a < b ? -1 : a > b ? -1 : 0;
};

export { convertPositionToPercentage, compareStrings };
