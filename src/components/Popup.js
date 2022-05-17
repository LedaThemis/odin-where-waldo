import { AiOutlineCloseCircle } from 'react-icons/ai';

import '../styles/Popup.css';

const Popup = ({ Component, styles, withCloseButton, closePopup }) => {
  return (
    <div className="popup" style={styles}>
      {withCloseButton && (
        <button className="close--popup--button" onClick={closePopup}>
          <AiOutlineCloseCircle size={'1.5rem'} />
        </button>
      )}
      {Component}
    </div>
  );
};

export default Popup;
