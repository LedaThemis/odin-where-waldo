import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

import Name from '../Name';

test('should render label with text', () => {
  render(<Name />);
  expect(screen.getByLabelText(/enter your name/i)).toBeVisible();
});

test('should change input value when typing', () => {
  render(<Name />);

  userEvent.type(screen.getByLabelText(/enter your name/i), 'iamtypingtext');

  expect(screen.getByLabelText(/enter your name/i)).toHaveValue('iamtypingtext');
});

test('should call handleNameSubmit with correct value on submit button click', () => {
  const handleNameSubmitMock = jest.fn();

  render(<Name handleNameSubmit={handleNameSubmitMock} />);

  userEvent.type(screen.getByLabelText(/enter your name/i), 'iamtypingtext');
  userEvent.click(screen.getByRole('button', { name: /submit/i }));

  expect(handleNameSubmitMock).toHaveBeenCalledWith('iamtypingtext');
});

test('should call setIsLeaderboardPopupShown with true on button click', () => {
  const setIsLeaderboardPopupShown = jest.fn();

  render(<Name handleNameSubmit={() => {}} setIsLeaderboardPopupShown={setIsLeaderboardPopupShown} />);

  userEvent.click(screen.getByRole('button', { name: /leaderboard/i }));

  expect(setIsLeaderboardPopupShown).toHaveBeenCalledWith(true);
});
