import React from 'react';

import { render } from '@test/utils';

import { Hamburger } from './Hamburger';

test('it renders', () => {
  render(<Hamburger onClick={console.log} isActive={false}></Hamburger>);
});
