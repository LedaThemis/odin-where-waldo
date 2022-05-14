import renderer from 'react-test-renderer';

import Overlay from '../Overlay';

test('renders correctly', () => {
  const tree = renderer.create(<Overlay />).toJSON();

  expect(tree).toMatchSnapshot();
});
