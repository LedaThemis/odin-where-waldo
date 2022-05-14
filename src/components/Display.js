import { handleImageClick } from '../helpers/handlers';
import '../styles/Display.css';

const Display = ({
  imageObject,
  setCurrentCoordinates,
  setMouseCoordinates,
  setIsPopupActive,
  isStarted,
  setIsStarted,
}) => {
  return (
    <div id="image--display">
      <div id="image--container">
        <img
          onClick={(e) =>
            handleImageClick(e, isStarted, setIsStarted, setCurrentCoordinates, setMouseCoordinates, setIsPopupActive)
          }
          id="where--waldo--image"
          src={imageObject}
          alt="spot waldo"
        />
      </div>
    </div>
  );
};

export default Display;
