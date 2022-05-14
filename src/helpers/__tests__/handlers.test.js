import { handleImageClick } from '../handlers';

describe('handleImageClick', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  const event = {
    target: {
      getBoundingClientRect: () => ({ left: 5, top: 5, width: 20, height: 10 }),
    },
    clientX: 15,
    clientY: 10,
    pageX: 25,
    pageY: 20,
  };
  const setIsStarted = jest.fn();
  const setCurrentCoordinates = jest.fn();
  const setMouseCoordinates = jest.fn();
  const setIsPopupActive = jest.fn();

  it('should call setIsStarted if isStarted is false', () => {
    const isStarted = false;
    handleImageClick(event, isStarted, setIsStarted, setCurrentCoordinates, setMouseCoordinates, setIsPopupActive);

    expect(setIsStarted).toHaveBeenCalled();
  });

  it('should not call setIsStarted if isStarted is true', () => {
    const isStarted = true;
    handleImageClick(event, isStarted, setIsStarted, setCurrentCoordinates, setMouseCoordinates, setIsPopupActive);

    expect(setIsStarted).not.toHaveBeenCalled();
  });

  it('should call setCurrentCoordinates, setMouseCoordinates, setIsPopupActive', () => {
    const isStarted = true;
    handleImageClick(event, isStarted, setIsStarted, setCurrentCoordinates, setMouseCoordinates, setIsPopupActive);

    expect(setCurrentCoordinates).toHaveBeenCalled();
    expect(setMouseCoordinates).toHaveBeenCalled();
    expect(setIsPopupActive).toHaveBeenCalled();
  });

  it('should call function arguments with correct arguments', () => {
    const isStarted = false;
    handleImageClick(event, isStarted, setIsStarted, setCurrentCoordinates, setMouseCoordinates, setIsPopupActive);

    expect(setIsStarted).toHaveBeenCalledWith(true);
    expect(setCurrentCoordinates).toHaveBeenCalledWith({ x: 50, y: 50 });
    expect(setMouseCoordinates).toHaveBeenCalledWith({ x: 25, y: 20 });
    expect(setIsPopupActive).toHaveBeenCalledWith(true);
  });
});
