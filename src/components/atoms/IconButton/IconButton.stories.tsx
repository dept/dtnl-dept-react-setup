import HomeIcon from '@public/icons/components/Home';
import { number, withKnobs } from '@storybook/addon-knobs';
import React from 'react';

import { IconButton } from '.';

export default { title: 'Atoms/IconButton', component: IconButton, decorators: [withKnobs] };

export const example = () => (
  <IconButton aria-label="Icon button" size={number('Size', 50)} icon={HomeIcon}></IconButton>
);
