import { render } from '@test/utils';
import React from 'react';

import { Hamburger } from './Hamburger';

test('it renders', () => {
  render(<Hamburger onClick={console.log} isActive={false}></Hamburger>);
});
