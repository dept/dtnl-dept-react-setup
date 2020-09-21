import { useEffect, useRef, useState } from 'react';
import useClickAway from 'react-use/lib/useClickAway';
import styled from 'styled-components';

import { Box } from '@/components/atoms/Grid';
import { useWindowScrollPosition } from '@/utils/hooks';
import { useKeyPress } from '@/utils/hooks/useKeyPress';

type ClickHandler = () => void;

interface MenuProps {
  placement?: 'start' | 'end';
  trigger: (clickHandler: ClickHandler, isOpen: boolean) => any;
  children: any;
}

interface MenuPopupProps {
  isOpen: boolean;
}

const MenuPopup = styled(Box)<MenuPopupProps>`
  opacity: ${props => (props.isOpen ? 1 : 0)};
  transform: translateY(${props => (props.isOpen ? '10px' : 0)});
  pointer-events: ${props => (props.isOpen ? 'all' : 'none')};
  transition: all 200ms ease-in-out;
`;

export const Menu: React.FC<MenuProps> = ({ trigger, children, placement = 'start' }) => {
  const [open, setOpen] = useState(false);
  const popupRef = useRef(null);
  const position = useWindowScrollPosition({ throttle: 200 });
  useKeyPress('Escape', () => {
    setOpen(false);
  });
  useClickAway(popupRef, () => {
    setOpen(false);
  });
  useEffect(() => {
    setOpen(false);
  }, [position]);

  const positionProps = {
    right: placement === 'end' ? 0 : undefined,
    left: placement === 'start' ? 0 : undefined,
  };

  return (
    <Box position="relative" ref={popupRef}>
      {trigger(() => setOpen(!open), open)}
      <MenuPopup isOpen={open} position="absolute" {...positionProps}>
        {children}
      </MenuPopup>
    </Box>
  );
};
