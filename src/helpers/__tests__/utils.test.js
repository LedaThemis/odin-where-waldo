import {
  checkIfWon,
  handleWin,
  submitSelection,
  getHumanReadableTime,
  getAvailableOptions,
  getCoordinates,
  startTimer,
  exportedForTesting,
} from '../utils';

const {
  markSelectionCorrect,
  displayStatus,
  getSelection,
  checkSelection,
  convertPositionToPercentage,
  getBorderCoordinates,
  getProps,
  withinRange,
  getCorrectBorderPositions,
  getOption,
} = exportedForTesting;

describe('checkIfWon', () => {
  it('should return true if availableSelections is empty', () => {
    expect(checkIfWon([])).toBe(true);
  });

  it('should return false if availableSelections is not empty', () => {
    expect(checkIfWon(['not', 'empty'])).toBe(false);
  });
});

describe('handleWin', () => {
  it('should call setIsPopupActive with false (hide Popup)', () => {
    const setIsPopupActiveMock = jest.fn();

    handleWin(
      setIsPopupActiveMock,
      () => {},
      () => {}
    );

    expect(setIsPopupActiveMock).toHaveBeenCalledWith(false);
  });

  it('should call setIsWon with true', () => {
    const setIsWonMock = jest.fn();

    handleWin(
      () => {},
      setIsWonMock,
      () => {}
    );

    expect(setIsWonMock).toHaveBeenCalledWith(true);
  });

  it('should call setShowOverlay with true (shows overlay)', () => {
    const setShowOverlayMock = jest.fn();

    handleWin(
      () => {},
      () => {},
      setShowOverlayMock
    );

    expect(setShowOverlayMock).toHaveBeenCalledWith(true);
  });
});

describe('getHumanReadableTime', () => {
  it('should display correct padding', () => {
    expect(getHumanReadableTime(0)).toBe('00:00:00');
  });

  it('should display 100 hours correctly', () => {
    expect(getHumanReadableTime(360000)).toBe('100:00:00');
  });
});

describe('getAvailableOptions', () => {
  it('should return option elements depending on provided argument', () => {
    const options = [
      { name: '1', id: '1' },
      { name: '2', id: '2' },
    ];

    expect(getAvailableOptions(options)[0]).toMatchObject({ type: 'option' });
    expect(getAvailableOptions(options)[1]).toMatchObject({ type: 'option' });
  });
});

describe('getCoordinates', () => {
  it('should return correct relative coordinates', () => {
    const event = {
      target: {
        getBoundingClientRect: () => ({ left: 5, top: 5, width: 20, height: 10 }),
      },
      clientX: 15,
      clientY: 10,
      pageX: 25,
      pageY: 20,
    };
    expect(getCoordinates(event)).toMatchObject({ percentageX: 50, percentageY: 50, mouseX: 25, mouseY: 20 });
  });
});

describe('startTimer', () => {
  it('should call setSeconds every second', async () => {
    const setSeconds = jest.fn();
    jest.useFakeTimers();
    startTimer(setSeconds);

    jest.advanceTimersByTime(2000);

    expect(setSeconds).toHaveBeenCalledTimes(2);
    expect(setSeconds).toHaveBeenCalledWith(expect.any(Function));
  });
});

describe('getSelection', () => {
  it('should return undefined if selection does not exist', () => {
    const result = getSelection([{ id: 0 }, { id: 1 }], 2);

    expect(result).toBeUndefined();
  });

  it('should return correct selection if exists', () => {
    const correctSelection = { id: 1 };
    const result = getSelection([{ id: 0 }, correctSelection], correctSelection.id);

    expect(result).toMatchObject(correctSelection);
  });
});

describe('checkSelection', () => {
  it('should return true if provided coordinates is within correct range', () => {
    const positionsData = [
      { id: 1, x: 0, y: 0, width: 5, height: 5 },
      { id: 'props', imageWidth: 10, imageHeight: 10 },
    ];
    const currentSelection = 1;
    const currentCoordinates = { x: 50, y: 50 };

    const result = checkSelection(positionsData, currentSelection, currentCoordinates);

    expect(result).toBe(true);
  });
  it('should return false if provided coordinates is not within correct range', () => {
    const positionsData = [
      { id: 1, x: 0, y: 0, width: 6, height: 6 },
      { id: 'props', imageWidth: 30, imageHeight: 30 },
    ];
    const currentSelection = 1;
    const currentCoordinates = { x: 50, y: 50 };

    const result = checkSelection(positionsData, currentSelection, currentCoordinates);

    expect(result).toBe(false);
  });
});

describe('convertPositionToPercentage', () => {
  const result = convertPositionToPercentage(10, 20, 22.5, 45);

  it('returns correct number of positions', () => {
    expect(Object.keys(result).length).toBe(2);
  });
  it('returns given position as percentage with 2 decimals precision', () => {
    expect(result).toMatchObject({ percentageX: 44.44, percentageY: 44.44 });
  });
});

describe('getBorderCoordinates', () => {
  it('should return correct values', () => {
    expect(getBorderCoordinates(5, 7, 10, 13)).toMatchObject({ x1: 5, y1: 7, x2: 15, y2: 20 });
  });
});

describe('getProps', () => {
  it('should return props of provided positions data', () => {
    const props = { id: 'props', imageHeight: 10, imageWidth: 12 };
    expect(getProps([{ id: 1, name: '1' }, props])).toMatchObject(props);
  });
});

describe('withinRange', () => {
  it('should return false if outside range', () => {
    expect(withinRange(1, 5, 7)).toBe(false);
  });
  it('should return true if inside range', () => {
    expect(withinRange(1, 5, 2)).toBe(true);
  });

  it('should be inclusive', () => {
    expect(withinRange(1, 5, 1)).toBe(true);
    expect(withinRange(1, 5, 5)).toBe(true);
  });
});

describe('getCorrectBorderPositions', () => {
  it('should return correct values', () => {
    const selection = { x: 5, y: 5, width: 20, height: 20 };
    const positionsData = [{ id: 'props', imageHeight: 100, imageWidth: 100 }];

    expect(getCorrectBorderPositions(positionsData, selection)).toMatchObject({
      percentageX1: 5,
      percentageX2: 25,
      percentageY1: 5,
      percentageY2: 25,
    });
  });
});

describe('getOption', () => {
  it('should return option with correct key, value, innerText', () => {
    const name = 'optionName';
    const value = 'optionValue';

    expect(getOption(name, value)).toMatchObject({
      type: 'option',
      key: `${value}-key`,
      props: { value: value, children: name },
    });
  });
});
