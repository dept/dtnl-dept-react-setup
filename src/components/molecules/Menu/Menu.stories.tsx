import * as React from 'react';

import { Menu, MenuButton, MenuItem, MenuLink, MenuList } from './Menu';

export default { title: 'Molecules/Menu', component: Menu };

export const example = () => (
  <Menu>
    <MenuButton>
      Actions <span aria-hidden>▾</span>
    </MenuButton>
    <MenuList>
      <MenuItem onSelect={() => alert('Download')}>Download</MenuItem>
      <MenuItem onSelect={() => alert('Copy')}>Create a Copy</MenuItem>
      <MenuItem onSelect={() => alert('Mark as Draft')}>Mark as Draft</MenuItem>
      <MenuItem onSelect={() => alert('Delete')}>Delete</MenuItem>
      <MenuLink href="https://reacttraining.com/workshops/">Attend a Workshop</MenuLink>
    </MenuList>
  </Menu>
);
