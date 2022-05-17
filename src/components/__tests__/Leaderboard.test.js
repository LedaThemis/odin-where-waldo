import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import Leaderboard from '../Leaderboard';

import * as db from '../../helpers/db';

test('should render table', async () => {
  render(<Leaderboard />);

  expect(screen.getByRole('table')).toBeVisible();
});

test('should render Name, Time table headers', async () => {
  render(<Leaderboard />);

  expect(screen.getByRole('columnheader', { name: /name/i })).toBeVisible();
  expect(screen.getByRole('columnheader', { name: /time/i })).toBeVisible();
});

test('should render rows based on provided data', async () => {
  const fakeLeaderboardData = [{ id: 1, name: 'John', seconds: 23 }];
  jest.spyOn(db, 'fetchLeaderboard').mockImplementation(() => Promise.resolve(fakeLeaderboardData));

  render(<Leaderboard />);

  expect(await screen.findByRole('cell', { name: /John/i })).toBeVisible();
  expect(await screen.findByRole('cell', { name: /00:00:23/i })).toBeVisible();
});
