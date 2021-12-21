import { Box } from '@chakra-ui/react';
import { Transition } from 'react-transition-group';

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
          <Transition
            in={isOpen}
            timeout={{
              enter: 0,
              exit: 300,
            }}
          >
            {state => {
              const isShown = state === 'entered';

              return (
                <Box
                  as={MenuPopover}
                  sx={{
                    transition: 'opacity 200ms, transform 200ms',
                    opacity: isShown ? 1 : 0,
                    transform: isShown ? 'scale(1)' : 'scale(0.9)',
                    pointerEvents: isShown ? 'all' : 'none',
                    '&[hidden]': {
                      display: 'block',
                    },
                  }}
                >
                  <MenuItems>
                    <MenuItem onSelect={() => alert('Download')}>Download</MenuItem>
                    <MenuItem onSelect={() => alert('Copy')}>Create a Copy</MenuItem>
                    <MenuItem onSelect={() => alert('Mark as Draft')}>Mark as Draft</MenuItem>
                    <MenuItem onSelect={() => alert('Delete')}>Delete</MenuItem>
                    <MenuLink href="https://reacttraining.com/workshops/">
                      Attend a Workshop
                    </MenuLink>
                  </MenuItems>
                </Box>
              );
            }}
          </Transition>
        </>
      );
    }}
  </Menu>
);
