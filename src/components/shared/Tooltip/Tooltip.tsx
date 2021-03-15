import styled from '@emotion/styled';
import { ReactNode, useRef, useState } from 'react';
import { Manager, Popper, PopperProps, Reference } from 'react-popper';
import useClickAway from 'react-use/lib/useClickAway';

import { colors } from '@/theme/colors';

import { Box, Flex } from '../Grid';
import { Text } from '../Text';

interface TooltipProps {
  placement?: PopperProps<any>['placement'];
  trigger?: any;
  children?: ReactNode;
}

const TooltipElement = styled(Box)`
  background-color: ${colors.black};
  color: #fff;
  padding: 15px;
  transform: translateX(-50%);
  max-width: 250px;
  margin: 10px 0;
  transition: opacity 0.2s linear;
  pointer-events: none;
`;

const Trigger = styled.button`
  width: 22px;
  height: 22px;
  border-radius: 50%;
  border: solid 1px #000000;
  -webkit-appearance: none;
  outline: none;
  padding: 0;
  vertical-align: middle;
  position: relative;
`;

export const Tooltip = ({ placement = 'top', children, trigger }: TooltipProps) => {
  const [active, setActive] = useState(false);
  const tooltipRef = useRef(null);

  useClickAway(tooltipRef, () => {
    setActive(false);
  });

  return (
    <Manager>
      <Reference>
        {({ ref }) => (
          <span
            role="presentation"
            ref={ref}
            onClick={() => setActive(!active)}
            onFocus={() => setActive(true)}
            onBlur={() => setActive(false)}
            onMouseOver={() => setActive(true)}
            onMouseOut={() => setActive(false)}>
            {trigger || (
              <Trigger>
                <Flex ref={tooltipRef} justifyContent="center" alignItems="center">
                  <Text fontWeight="bold" margin={0}>
                    i
                  </Text>
                </Flex>
              </Trigger>
            )}
          </span>
        )}
      </Reference>
      <Popper placement={placement}>
        {({ ref, style, placement: dataPlacement }) => {
          return (
            <TooltipElement
              ref={ref}
              style={style}
              data-placement={dataPlacement}
              opacity={active ? 1 : 0}>
              {children}

              {/* <div ref={arrowProps.ref} style={arrowProps.style} /> */}
            </TooltipElement>
          );
        }}
      </Popper>
    </Manager>
  );
};
