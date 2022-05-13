import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import WonDisplay from '../components/WonDisplay';
import { getHumanReadableTime } from '../helpers/utils';
import userEvent from '@testing-library/user-event';

test('should render time with text', () => {
  const seconds = 1240;
  render(<WonDisplay seconds={seconds} />);

  expect(screen.getByText(`You won, with a time of ${getHumanReadableTime(seconds)}!`)).toBeVisible();
});

describe('test should reload page on click', () => {
  const original = window.location;

  beforeAll(() => {
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: { reload: jest.fn() },
    });
  });

  afterAll(() => {
    Object.defineProperty(window, 'location', { configurable: true, value: original });
  });

  it('calls window.location.reload if clicked', () => {
    render(<WonDisplay seconds={0} />);

    const refreshPageButton = screen.getByRole('button', /refresh/i);

    userEvent.click(refreshPageButton);

    expect(window.location.reload).toHaveBeenCalled();
  });

  it('does not call window.location.reload if not clicked', () => {
    render(<WonDisplay seconds={0} />);

    expect(window.location.reload).not.toHaveBeenCalled();
  });
});
