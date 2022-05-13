import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Timer from '../components/Timer';

import { getHumanReadableTime } from '../helpers/utils';

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.useRealTimers();
});

test('should display time correctly (uses helper)', () => {
  const seconds = 482;
  const timeString = getHumanReadableTime(seconds);

  render(<Timer seconds={seconds} setSeconds={() => {}} isStarted={false} />);

  expect(screen.getByText(timeString)).toBeInTheDocument();
});

test('should not call setSeconds if isStarted is false', async () => {
  const setSeconds = jest.fn();
  render(<Timer seconds={0} setSeconds={setSeconds} isStarted={false} />);

  await waitFor(() => expect(setSeconds).toHaveBeenCalledTimes(0), { timeout: 1100 });
});

test('should call setSeconds each second if isStarted is true', async () => {
  const setSeconds = jest.fn(() => {});
  render(<Timer seconds={0} setSeconds={setSeconds} isStarted={true} />);
  await waitFor(() => expect(setSeconds).toHaveBeenCalledTimes(2), { timeout: 2100 });
});
