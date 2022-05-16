import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

import NamePopup from '../NamePopup';

test('should render label with text', () => {
  render(<NamePopup />);
  expect(screen.getByLabelText(/enter your name/i)).toBeVisible();
});

test('should change input value when typing', () => {
  render(<NamePopup />);

  userEvent.type(screen.getByLabelText(/enter your name/i), 'iamtypingtext');

  expect(screen.getByLabelText(/enter your name/i)).toHaveValue('iamtypingtext');
});

test('should call handleNameSubmit with correct value on submit button click', () => {
  const handleNameSubmitMock = jest.fn();

  render(<NamePopup handleNameSubmit={handleNameSubmitMock} />);

  userEvent.type(screen.getByLabelText(/enter your name/i), 'iamtypingtext');
  userEvent.click(screen.getByRole('button', { name: /submit/i }));

  expect(handleNameSubmitMock).toHaveBeenCalledWith('iamtypingtext');
});
