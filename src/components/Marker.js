import { FaMapMarkerAlt } from 'react-icons/fa';
import '../styles/Marker.css';

const Marker = ({ x, y }) => {
  return (
    <div className="marker" data-testid="marker-div" style={{ left: x - 25, top: y - 50 }}>
      <FaMapMarkerAlt size={50} color={'rgb(0,255,0,0.75)'} />
    </div>
  );
};

export default Marker;
