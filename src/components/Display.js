import { getCoordinates } from '../helpers/utils';
import '../styles/Display.css';

const Display = ({
  imageObject,
  setCurrentCoordinates,
  setMouseCoordinates,
  setIsPopupActive,
  isStarted,
  setIsStarted,
}) => {
  const handleImageClick = (e) => {
    const { percentageX, percentageY, mouseX, mouseY } = getCoordinates(e);
    setCurrentCoordinates({ x: percentageX, y: percentageY });
    setMouseCoordinates({ x: mouseX, y: mouseY });
    setIsPopupActive(true);

    if (!isStarted) {
      // start game on first click
      setIsStarted(true);
    }
  };

  return (
    <div id="image--display">
      <div id="image--container">
        <img onClick={handleImageClick} id="where--waldo--image" src={imageObject} alt="spot waldo" />
      </div>
    </div>
  );
};

export default Display;
