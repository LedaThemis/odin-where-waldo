import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

import Timer from '../Timer';
import { getHumanReadableTime } from '../../helpers/utils';
import * as utils from '../../helpers/utils';

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

test('should call startTimer when isStarted is true', async () => {
  const spySetTimer = jest.spyOn(utils, 'startTimer');

  render(<Timer seconds={0} setSeconds={() => {}} isStarted={true} />);

  await waitFor(() => expect(spySetTimer).toHaveBeenCalled());
});

test('should not call startTimer when isStarted is false', async () => {
  const spySetTimer = jest.spyOn(utils, 'startTimer');

  render(<Timer seconds={0} setSeconds={() => {}} isStarted={false} />);

  await waitFor(() => expect(spySetTimer).not.toHaveBeenCalled());
});
