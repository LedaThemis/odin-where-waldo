import '../styles/SelectionPopup.css';

const SelectionPopup = ({ x, y, availableSelections, currentSelection, setCurrentSelection, submitSelection }) => {
  const getOption = (name, value) => {
    return (
      <option key={`${value}-key`} value={value}>
        {name}
      </option>
    );
  };
  const getAvailableOptions = (options) => {
    return options.map((option) => getOption(option.name, option.id));
  };

  return (
    <div id="selection--popup" style={{ top: y, left: x }}>
      <p id="selection--popup--title">Select what you found</p>
      <select
        id="selection--popup--select"
        defaultValue={currentSelection}
        onChange={(e) => setCurrentSelection(e.target.value)}
      >
        <option value={''}></option>
        {getAvailableOptions(availableSelections)}
      </select>
      <button id="selection--popup--submit" type="button" onClick={submitSelection}>
        Submit
      </button>
    </div>
  );
};

export default SelectionPopup;
