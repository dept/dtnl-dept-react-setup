/**
 * @jest-environment jsdom
 */
import { render } from '@test/utils';

import { Text } from './Text';

test('it renders', () => {
  render(<Text>This is text</Text>);
});
