import '../styles/Display.css';

const Display = ({ imageObject, setCurrentCoordinates }) => {
  const getCoordinates = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const width = rect.width;
    const height = rect.height;

    // Multiplying by 100 to get percentage, and the other for 2 decimal points
    const percentageX = Math.round((x / width) * 100 * 100) / 100;
    const percentageY = Math.round((y / height) * 100 * 100) / 100;

    console.log(`X ${Math.round(x)}, Y ${Math.round(y)}`);
    console.log(`Width ${Math.round(width)}, Height ${Math.round(height)}`);
    console.log(`%X ${percentageX}, %Y ${percentageY}`);
  };

  return (
    <div id="image--display">
      <div id="image--container">
        <img onClick={getCoordinates} id="where--waldo--image" src={imageObject} alt="spot waldo" />
      </div>
    </div>
  );
};

export default Display;
