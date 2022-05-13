import '../styles/Status.css';

const Status = ({ text }) => {
  return (
    <div id="status">
      <h3 id="status--text">{text}</h3>
    </div>
  );
};

export default Status;
