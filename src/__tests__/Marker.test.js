import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import rerenderer from 'react-test-renderer';
import Marker from '../components/Marker';

test('should render correctly', () => {
  const tree = rerenderer.create(<Marker x={10} y={10} />).toJSON();

  expect(tree).toMatchSnapshot();
});

test('should assign correct styles', () => {
  const x = 10;
  const y = 10;
  render(<Marker x={x} y={y} />);

  expect(screen.getByTestId('marker-div')).toHaveStyle(`left: ${x - 25}px; top: ${y - 50}px`);
});
