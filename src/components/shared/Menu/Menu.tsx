import { Button, ButtonProps, Box, BoxProps } from '@chakra-ui/react';
import {
  Menu as ReachMenu,
  MenuButton as ReactMenuButton,
  MenuList as ReactMenuList,
  MenuItem as ReachMenuItem,
  MenuLink as ReachMenuLink,
  MenuPopover as ReachMenuPopover,
  MenuItems as ReachMenuItems,
} from '@reach/menu-button';
import { AnchorHTMLAttributes } from 'react';

interface MenuItemProps {
  onSelect: () => void;
  valueText?: string;
}

export const MenuButton = (props: ButtonProps) => <Button {...props} as={ReactMenuButton} />;

const List = (props: BoxProps & { as: any }) => (
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
    _focus={{
      outline: 'none',
    }}
  />
);

export const MenuList = (props: BoxProps) => <List {...props} as={ReactMenuList} />;
export const MenuItems = (props: BoxProps) => <List {...props} as={ReachMenuItems} />;

export const Item = (props: BoxProps) => (
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
    {...props}
  ></Box>
);

export const MenuItem = (props: BoxProps & MenuItemProps) => <Item {...props} as={ReachMenuItem} />;

export const MenuLink = (props: BoxProps & AnchorHTMLAttributes<any>) => (
  <Item {...props} as={ReachMenuLink} />
);

export const Menu = ReachMenu;
export const MenuPopover = ReachMenuPopover;
