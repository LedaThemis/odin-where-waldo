import { getCoordinates } from './utils';

const handleImageClick = (e, isStarted, setIsStarted, setCurrentCoordinates, setMouseCoordinates, setIsPopupActive) => {
  const { percentageX, percentageY, mouseX, mouseY } = getCoordinates(e);
  setCurrentCoordinates({ x: percentageX, y: percentageY });
  setMouseCoordinates({ x: mouseX, y: mouseY });
  setIsPopupActive(true);

  if (!isStarted) {
    // start game on first click
    setIsStarted(true);
  }
};

export { handleImageClick };
