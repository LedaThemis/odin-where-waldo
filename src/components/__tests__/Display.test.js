import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

import Display from '../Display';
import * as handlers from '../../helpers/handlers';

test('should render image with provided source', () => {
  const imgSrc = 'sample/src';
  render(<Display imageObject={imgSrc} />);

  expect(screen.getByRole('img')).toHaveAttribute('src', imgSrc);
});

test('should call handleImageClick on click', () => {
  const spyHandleImageClick = jest.spyOn(handlers, 'handleImageClick');

  render(
    <Display
      imageObject={'https://via.placeholder.com/1/1'}
      isStarted={true}
      setIsStarted={() => {}}
      setCurrentCoordinates={() => {}}
      setMouseCoordinates={() => {}}
      setIsPopupActive={() => {}}
    />
  );

  expect(spyHandleImageClick).not.toHaveBeenCalled();

  userEvent.click(screen.getByRole('img'));

  expect(spyHandleImageClick).toHaveBeenCalled();
});

test('should call handleImageClick with correct arguments', () => {
  const spyHandleImageClick = jest.spyOn(handlers, 'handleImageClick');
  const isStarted = true;
  const setIsStarted = () => {};
  const setCurrentCoordinates = () => {};
  const setMouseCoordinates = () => {};
  const setIsPopupActive = () => {};
  render(
    <Display
      imageObject={'https://via.placeholder.com/1/1'}
      isStarted={isStarted}
      setIsStarted={setIsStarted}
      setCurrentCoordinates={setCurrentCoordinates}
      setMouseCoordinates={setMouseCoordinates}
      setIsPopupActive={setIsPopupActive}
    />
  );

  userEvent.click(screen.getByRole('img'));

  expect(spyHandleImageClick).toHaveBeenCalledWith(
    expect.any(Object),
    isStarted,
    setIsStarted,
    setCurrentCoordinates,
    setMouseCoordinates,
    setIsPopupActive
  );
});
