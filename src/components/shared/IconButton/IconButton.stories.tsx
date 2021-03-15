import { number, withKnobs } from '@storybook/addon-knobs';
import React from 'react';

import SearchIcon from '@/icons/components/Search';

import { IconButton } from './IconButton';

export default { title: 'Atoms/IconButton', component: IconButton, decorators: [withKnobs] };

export const example = () => (
  <IconButton aria-label="Search" icon={<SearchIcon size={number('Size', 20)} />} />
);
