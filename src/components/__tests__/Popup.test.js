import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

import Popup from '../Popup';

test('should render container with provided styles', () => {
  render(<Popup Component={<></>} styles={{ backgroundColor: 'red' }} />);

  expect(screen.getByTestId('popup')).toHaveStyle({ backgroundColor: 'red' });
});

test('should call closePopup() on button click', () => {
  const closePopupMock = jest.fn();
  render(<Popup Component={<></>} withCloseButton={true} closePopup={closePopupMock} />);

  userEvent.click(screen.getByRole('button'));

  expect(closePopupMock).toHaveBeenCalled();
});

test('should not render close button if not specified', () => {
  render(<Popup Component={<></>} />);

  expect(screen.queryByRole('button')).not.toBeInTheDocument();
});
