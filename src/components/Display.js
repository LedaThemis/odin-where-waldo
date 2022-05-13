import { convertPositionToPercentage } from '../helpers/utils';
import '../styles/Display.css';

const Display = ({ imageObject, setCurrentCoordinates }) => {
  const getCoordinates = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const width = rect.width;
    const height = rect.height;

    const { percentageX, percentageY } = convertPositionToPercentage(x, y, width, height);

    return { percentageX, percentageY };
  };

  const handleImageClick = (e) => {
    const { percentageX, percentageY } = getCoordinates(e);
    setCurrentCoordinates({ x: percentageX, y: percentageY });
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
