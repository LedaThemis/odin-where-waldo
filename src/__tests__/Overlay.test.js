import Overlay from '../components/Overlay';
import renderer from 'react-test-renderer';

test('renders correctly', () => {
  const tree = renderer.create(<Overlay />).toJSON();

  expect(tree).toMatchSnapshot();
});
