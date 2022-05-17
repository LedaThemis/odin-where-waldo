import '../styles/Popup.css';

const Popup = ({ Component, styles }) => {
  return (
    <div className="popup" style={styles}>
      {Component}
    </div>
  );
};

export default Popup;
