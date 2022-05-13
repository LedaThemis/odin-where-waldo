const convertPositionToPercentage = (x, y, width, height) => {
  const percentageX = Math.round((x / width) * 100 * 100) / 100;
  const percentageY = Math.round((y / height) * 100 * 100) / 100;

  return { percentageX, percentageY };
};

export { convertPositionToPercentage };
