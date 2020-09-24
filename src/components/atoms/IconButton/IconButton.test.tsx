import { render } from '@test/utils';
import React from 'react';

import HomeIcon from '@/icons/components/Home';

import { IconButton } from './IconButton';

test('it renders', () => {
  render(<IconButton aria-label="Home" icon={HomeIcon} size={20} />);
});
