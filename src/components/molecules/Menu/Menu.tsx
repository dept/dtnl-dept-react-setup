import {
  Menu as ReachMenu,
  MenuButton as ReactMenuButton,
  MenuList as ReactMenuList,
  MenuItem as ReachMenuItem,
  MenuLink as ReachMenuLink,
} from '@reach/menu-button';
import React, { AnchorHTMLAttributes, FC } from 'react';

import { Button, ButtonProps } from '@/components/atoms/Button';
import { Box, BoxProps } from '@/components/atoms/Grid';

interface MenuItemProps {
  onSelect: () => void;
  valueText?: string;
}

export const MenuButton: FC<ButtonProps> = props => <Button {...props} as={ReactMenuButton} />;

export const MenuList: FC<BoxProps> = props => (
  <Box
    {...props}
    border="1px solid"
    borderColor="gray.100"
    _focus={{
      outline: 'none',
    }}
    as={ReactMenuList}
  />
);

export const Item: FC<any> = props => (
  <Box
    as="a"
    display="block"
    sx={{
      '&[data-selected]': {
        bg: 'gray.100',
      },
    }}
    {...props}></Box>
);

export const MenuItem: FC<BoxProps & MenuItemProps> = props => (
  <Item {...props} as={ReachMenuItem} />
);

export const MenuLink: FC<BoxProps & AnchorHTMLAttributes<any>> = props => (
  <Item {...props} as={ReachMenuLink} />
);

export const Menu = ReachMenu;
