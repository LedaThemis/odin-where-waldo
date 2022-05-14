import '../styles/SelectionPopup.css';
import { getAvailableOptions } from '../helpers/utils';

const SelectionPopup = ({ x, y, availableSelections, currentSelection, setCurrentSelection, submitSelection }) => {
  return (
    <div id="selection--popup" data-testid="selection--popup--div" style={{ top: y, left: x }}>
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
