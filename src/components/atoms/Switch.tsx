import { hideVisually } from 'polished'
import React, { HTMLAttributes } from 'react'
import styled from 'styled-components'

import { colors } from '@/theme/colors'

import { Box } from './Box'
import { Flex } from './Flex'
import { Label } from './Form/Label'
import { Text } from './Text'

const TOGGLE_HEIGHT = '25px'

type SwitchProps = HTMLAttributes<HTMLInputElement> & {
  checked?: boolean
  label?: {
    active: string
    inactive: string
  }
}

const SwitchBackground = styled.div`
  background-color: transparent;
  border: 1px solid ${colors.grey.dark};
  border-radius: 12px;
  padding: 5px;
  height: ${TOGGLE_HEIGHT};
  width: 45px;
  position: relative;
  cursor: pointer;
  box-sizing: border-box;
  flex-shrink: 0;
`

const SwitchBall = styled.div`
  height: 13px;
  width: 13px;
  border-radius: 50%;
  transition: all 0.2s linear;
  background-color: ${colors.grey.dark};
  transform: translateX(0%);
`

const LabelWrapper = styled(Box)`
  height: ${TOGGLE_HEIGHT};
  overflow: hidden;
`

const LabelPosition = styled(Box)`
  transition: transform 0.2s ease-in-out;
`

const HiddenInput = styled.input`
  ${hideVisually()};

  &:checked ~ ${SwitchBackground} {
    background-color: ${colors.grey.dark};
    ${SwitchBall} {
      background-color: ${colors.white};
      transform: translateX(150%);
    }
  }

  &:checked ~ ${LabelWrapper} {
    ${LabelPosition} {
      transform: translateY(-50%);
    }
  }

  &:focus ~ ${SwitchBackground} {
    outline: -webkit-focus-ring-color auto 5px;
  }
`

export const Switch = ({ label, ...props }: SwitchProps) => {
  return (
    <Label>
      <Flex alignItems="center">
        <HiddenInput type="checkbox" {...props} />
        <SwitchBackground>
          <SwitchBall />
        </SwitchBackground>

        {label && (
          <LabelWrapper>
            <LabelPosition>
              <Flex ml={15} flexDirection="column">
                <Text lineHeight={TOGGLE_HEIGHT} flex={'0 0'}>
                  {label.inactive}
                </Text>
                <Text lineHeight={TOGGLE_HEIGHT} flex={'0 0'}>
                  {label.active}
                </Text>
              </Flex>
            </LabelPosition>
          </LabelWrapper>
        )}
      </Flex>
    </Label>
  )
}
