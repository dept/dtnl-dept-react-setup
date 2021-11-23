/**
 * @jest-environment jsdom
 */
import { render } from '@test/utils';

import { Switch } from './Switch';

test('it renders', () => {
  render(<Switch></Switch>);
});
