import React from 'react';

/**
 * @jest-environment jsdom
 */
import { render } from '@test/utils';

import { Icon } from './Icon';

test('it renders', () => {
  render(<Icon icon="Clock"></Icon>);
});
