/**
 * @jest-environment jsdom
 */
import { render } from '@test/utils';

import { Loader } from './Loader';

test('it renders', () => {
  render(<Loader isAnimating />);
});
