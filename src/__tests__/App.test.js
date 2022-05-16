import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

import App from '../App';

beforeEach(() => {
  jest.clearAllMocks();
});

jest.mock('../components/Header', () => () => <div data-testid="header"></div>);
jest.mock('../components/Timer', () => () => <div data-testid="timer"></div>);
jest.mock('../components/Display', () => ({ setIsPopupActive }) => (
  <div data-testid="display-component" onClick={() => setIsPopupActive(true)}></div>
));
jest.mock('../components/SelectionPopup', () => ({ submitSelection }) => (
  <div data-testid="selection-popup">
    <button onClick={submitSelection}>Submit</button>
  </div>
));
jest.mock('../components/Marker', () => () => <div data-testid="marker"></div>);
jest.mock('../components/Status', () => () => <div data-testid="status"></div>);
jest.mock('../components/WonDisplay', () => () => <div data-testid="won-display"></div>);
jest.mock('../components/Overlay', () => () => <div data-testid="overlay"></div>);

jest.mock('../helpers/db', () => ({
  fetchPositions: async () => [{ id: 'props', imageWidth: 100, imageHeight: 100 }],
  fetchLeaderboard: async () => [{ id: '1', name: 'guy1', seconds: 10 }],
  addToLeaderboard: async () => {},
}));

test('should render Header component', async () => {
  render(<App />);

  expect(await screen.findByTestId('header')).toBeVisible();
});

test('should render Timer component after name submit', async () => {
  render(<App />);

  userEvent.click(screen.getByRole('button', /submit/i));

  expect(await screen.findByTestId('timer')).toBeVisible();
});

test('should render Display component', async () => {
  render(<App />);

  expect(await screen.findByTestId('display-component')).toBeVisible();
});

test('should render SelectionPopup component with Marker component after click', async () => {
  render(<App />);

  expect(screen.queryByTestId('selection-popup')).not.toBeInTheDocument();
  expect(screen.queryByTestId('marker')).not.toBeInTheDocument();
  userEvent.click(screen.getByTestId('display-component'));
  expect(await screen.findByTestId('selection-popup')).toBeVisible();
  expect(await screen.findByTestId('marker')).toBeVisible();
});

test('should render Status component on submit button click', async () => {
  render(<App />);

  userEvent.click(screen.getByRole('button', { name: /submit/i }));
  userEvent.click(screen.getByTestId('display-component'));
  userEvent.click(screen.getByRole('button', { name: /submit/i }));

  expect(await screen.findByTestId('status')).toBeVisible();
});

test('should render WonDisplay component and Overlay on win', async () => {
  render(<App />);

  userEvent.click(screen.getByRole('button', { name: /submit/i }));
  userEvent.click(screen.getByTestId('display-component'));
  userEvent.click(screen.getByRole('button', { name: /submit/i }));

  expect(await screen.findByTestId('won-display')).toBeVisible();
  expect(await screen.findByTestId('overlay')).toBeVisible();
});
