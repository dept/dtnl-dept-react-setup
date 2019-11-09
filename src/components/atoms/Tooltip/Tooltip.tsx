import { Box, Flex, Text } from '@tpdewolf/styled-primitives'
import { useRef, useState } from 'react'
import { Manager, Popper, PopperProps, Reference } from 'react-popper'
import useClickAway from 'react-use/lib/useClickAway'
import styled from 'styled-components'

import { colors } from '@/theme/colors'

interface TooltipProps {
  placement?: PopperProps['placement']
  trigger?: any
}

const TooltipElement = styled(Box)`
  background-color: ${colors.black};
  color: #fff;
  padding: 15px;
  transform: translateX(-50%);
  max-width: 250px;
  margin-bottom: 10px;
  transition: opacity 0.2s linear;
  pointer-events: none;
`

const Trigger = styled.button`
  width: 22px;
  height: 22px;
  border-radius: 50%;
  border: solid 1px #000000;
  -webkit-appearance: none;
  outline: none;
  padding: 0;
  vertical-align: middle;
`

export const Tooltip: React.FC<TooltipProps> = ({ placement = 'top', children, trigger }) => {
  const [active, setActive] = useState(false)
  const tooltipRef = useRef(null)

  useClickAway(tooltipRef, () => {
    setActive(false)
  })

  return (
    <Manager>
      <Reference>
        {({ ref }) => (
          <div
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
                  <Text fontWeight="bold">i</Text>
                </Flex>
              </Trigger>
            )}
          </div>
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
          )
        }}
      </Popper>
    </Manager>
  )
}
