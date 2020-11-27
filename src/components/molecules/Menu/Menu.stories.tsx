import * as React from 'react';
import { CSSTransition } from 'react-transition-group';

import { Box } from '@/components/atoms/Grid';

import { Menu, MenuButton, MenuItem, MenuItems, MenuLink, MenuList, MenuPopover } from './Menu';

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

export const withAnimation = () => (
  <Menu>
    {({ isOpen }) => {
      return (
        <>
          <MenuButton>
            Actions <span aria-hidden>▾</span>
          </MenuButton>
          <CSSTransition classNames="x" in={isOpen} timeout={300}>
            <Box
              as={MenuPopover}
              sx={{
                opacity: 0,
                '&[hidden]': {
                  display: 'block',
                },
                '&.x-enter': {
                  opacity: 0,
                  transform: 'scale(0.9)',
                },
                '&.x-enter-done': {
                  opacity: 1,
                  transform: 'scale(1)',
                },
                '&.x-exit': {
                  opacity: 1,
                  transform: 'scale(1)',
                },
                '&.x-exit-done': {
                  opacity: 0,
                  transform: 'scale(0.8)',
                },
                '&.x-enter-active': {
                  opacity: 1,
                  transform: 'scale(1)',
                  transition: 'opacity 200ms, transform 200ms',
                },
                '&.x-exit-active': {
                  opacity: 0,
                  transform: 'scale(0.9)',
                  transition: 'opacity 200ms, transform 200ms',
                },
              }}>
              <MenuItems>
                <MenuItem onSelect={() => alert('Download')}>Download</MenuItem>
                <MenuItem onSelect={() => alert('Copy')}>Create a Copy</MenuItem>
                <MenuItem onSelect={() => alert('Mark as Draft')}>Mark as Draft</MenuItem>
                <MenuItem onSelect={() => alert('Delete')}>Delete</MenuItem>
                <MenuLink href="https://reacttraining.com/workshops/">Attend a Workshop</MenuLink>
              </MenuItems>
            </Box>
          </CSSTransition>
        </>
      );
    }}
  </Menu>
);
