import HomeIcon from '@public/icons/components/Home';
import { render } from '@test/utils';
import React from 'react';

import { IconButton } from './IconButton';

test('it renders', () => {
  render(<IconButton aria-label="Home" icon={HomeIcon} size={20} />);
});
