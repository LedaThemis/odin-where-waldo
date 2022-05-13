import rerenderer from 'react-test-renderer';
import Header from '../components/Header';

test('should render correctly', () => {
  const tree = rerenderer.create(<Header />).toJSON();

  expect(tree).toMatchSnapshot();
});
