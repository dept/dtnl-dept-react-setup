import {
  Menu as ReachMenu,
  MenuButton as ReactMenuButton,
  MenuList as ReactMenuList,
  MenuItem as ReachMenuItem,
  MenuLink as ReachMenuLink,
  MenuPopover as ReachMenuPopover,
  MenuItems as ReachMenuItems,
} from '@reach/menu-button';
import { AnchorHTMLAttributes, FC } from 'react';

import { Button, ButtonProps } from '@/components/atoms/Button';
import { Box, BoxProps } from '@/components/atoms/Grid';

interface MenuItemProps {
  onSelect: () => void;
  valueText?: string;
}

export const MenuButton: FC<ButtonProps> = props => <Button {...props} as={ReactMenuButton} />;

const List: FC<BoxProps & { as: any }> = props => (
  <Box
    {...props}
    sx={{
      border: '1px solid',
      borderColor: 'gray.200',
      borderRadius: '6px',
      py: 1,
      display: 'block',
      ...props.sx,
    }}
    _focus={
      {
        // outline: 'none',
      }
    }
  />
);

export const MenuList: FC<BoxProps> = props => <List {...props} as={ReactMenuList} />;
export const MenuItems: FC<BoxProps> = props => <List {...props} as={ReachMenuItems} />;

export const Item: FC<any> = props => (
  <Box
    as="a"
    py={2}
    px={4}
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
export const MenuPopover = ReachMenuPopover;
