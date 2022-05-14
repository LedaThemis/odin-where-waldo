import {
  convertPositionToPercentage,
  getSelection,
  checkSelection,
  getHumanReadableTime,
  getAvailableOptions,
  getCoordinates,
  startTimer,
} from '../utils';

describe('test convertPositionToPercentage', () => {
  const result = convertPositionToPercentage(10, 20, 22.5, 45);

  it('returns correct number of positions', () => {
    expect(Object.keys(result).length).toBe(2);
  });
  it('returns given position as percentage with 2 decimals precision', () => {
    expect(result).toMatchObject({ percentageX: 44.44, percentageY: 44.44 });
  });
});

describe('test getSelection', () => {
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

describe('test checkSelection', () => {
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

describe('test getHumanReadableTime', () => {
  it('should display correct padding', () => {
    expect(getHumanReadableTime(0)).toBe('00:00:00');
  });

  it('should display 100 hours correctly', () => {
    expect(getHumanReadableTime(360000)).toBe('100:00:00');
  });
});

describe('test getAvailableOptions', () => {
  it('should return option elements depending on provided argument', () => {
    const options = [
      { name: '1', id: '1' },
      { name: '2', id: '2' },
    ];

    expect(getAvailableOptions(options)[0]).toMatchObject({ type: 'option' });
    expect(getAvailableOptions(options)[1]).toMatchObject({ type: 'option' });
  });
});

describe('test getCoordinates', () => {
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

describe('test startTimer', () => {
  it('should call setSeconds every second', async () => {
    const setSeconds = jest.fn();
    jest.useFakeTimers();
    startTimer(setSeconds);

    jest.advanceTimersByTime(2000);

    expect(setSeconds).toHaveBeenCalledTimes(2);
    expect(setSeconds).toHaveBeenCalledWith(expect.any(Function));
  });
});
