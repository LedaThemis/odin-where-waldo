import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Status from '../components/Status';
import rerenderer from 'react-test-renderer';

test('should render correctly', () => {
  const tree = rerenderer.create(<Status text={'Sample Text'} />).toJSON();

  expect(tree).toMatchSnapshot();
});

test('should render provided text', () => {
  const text = '4witj4gijskdgIJdf';
  render(<Status text={text} />);

  expect(screen.getByText(text)).toBeVisible();
});
