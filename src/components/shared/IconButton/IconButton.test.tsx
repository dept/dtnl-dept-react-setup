import React from 'react';

import SearchIcon from '@/icons/components/Search';

import { render } from '@test/utils';

import { IconButton } from './IconButton';

test('it renders', () => {
  render(<IconButton aria-label="Home" icon={<SearchIcon size={20} />} />);
});
