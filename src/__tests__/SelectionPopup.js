import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SelectionPopup from '../components/SelectionPopup';

test('should render correct styles', () => {
  const x = 10;
  const y = 25;
  render(
    <SelectionPopup
      x={x}
      y={y}
      availableSelections={[]}
      currentSelection={''}
      setCurrentSelection={() => {}}
      submitSelection={() => {}}
    />
  );

  expect(screen.getByTestId('selection--popup--div')).toHaveStyle({
    top: `${y}px`,
    left: `${x}px`,
  });
});
