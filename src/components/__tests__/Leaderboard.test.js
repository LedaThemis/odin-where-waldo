import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import Leaderboard from '../Leaderboard';

test('should render table', () => {
  render(<Leaderboard leaderboardData={[]} />);

  expect(screen.getByRole('table')).toBeVisible();
});

test('should render Name, Time table headers', () => {
  render(<Leaderboard leaderboardData={[]} />);

  expect(screen.getByRole('columnheader', { name: /name/i })).toBeVisible();
  expect(screen.getByRole('columnheader', { name: /time/i })).toBeVisible();
});

test('should render rows based on provided data', () => {
  render(<Leaderboard leaderboardData={[{ id: 1, name: 'John', seconds: 23 }]} />);

  expect(screen.getByRole('cell', { name: /John/i })).toBeVisible();
  expect(screen.getByRole('cell', { name: /00:00:23/i })).toBeVisible();
});
