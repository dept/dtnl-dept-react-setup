/**
 * @jest-environment jsdom
 */
import { render } from '@test/utils';

import { Reveal } from './Reveal';

test('it renders', () => {
  render(<Reveal></Reveal>);
});
