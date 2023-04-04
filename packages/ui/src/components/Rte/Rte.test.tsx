/**
 * @jest-environment jsdom
 */
import { render } from '@dept/web/test/utils';

import { Rte } from './Rte';

test('it renders', () => {
  render(<Rte>{'<h1>Test</h1>'}</Rte>);
});
