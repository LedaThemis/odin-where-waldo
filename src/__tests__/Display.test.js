import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Display from '../components/Display';

test('should render image with provided source', () => {
  const imgSrc = 'sample/src';
  render(<Display imageObject={imgSrc} />);

  expect(screen.getByRole('img')).toHaveAttribute('src', imgSrc);
});
