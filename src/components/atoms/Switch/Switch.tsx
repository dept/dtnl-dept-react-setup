import { hideVisually } from 'polished';
import { HTMLAttributes } from 'react';
import styled from 'styled-components';

import { colors } from '@/theme/colors';

import { Box, Flex } from '../Grid';
import { Label } from '../Label';
import { Text } from '../Text';

const TOGGLE_HEIGHT = '25px';

type SwitchProps = HTMLAttributes<HTMLInputElement> & {
  checked?: boolean;
  label?: {
    active: string;
    inactive: string;
  };
};

const SwitchBackground = styled.div`
  background-color: transparent;
  border: 1px solid ${colors.gray[600]};
  border-radius: 12px;
  padding: 5px;
  height: ${TOGGLE_HEIGHT};
  width: 45px;
  position: relative;
  cursor: pointer;
  box-sizing: border-box;
  flex-shrink: 0;
`;

const SwitchBall = styled.div`
  height: 13px;
  width: 13px;
  border-radius: 50%;
  transition: all 0.2s linear;
  background-color: ${colors.gray[600]};
  transform: translateX(0%);
`;

const LabelWrapper = styled(Box)`
  height: ${TOGGLE_HEIGHT};
  overflow: hidden;
`;

const LabelPosition = styled(Box)`
  transition: transform 0.2s ease-in-out;
`;

const HiddenInput = styled.input`
  ${hideVisually()};

  &:checked ~ ${SwitchBackground} {
    background-color: ${colors.gray[600]};
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
    outline: none;
    box-shadow: ${props => props.theme?.shadows.outline || 'inherit'};
  }
`;

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
                <Text lineHeight={TOGGLE_HEIGHT} flex={'0 0'} margin={0}>
                  {label.inactive}
                </Text>
                <Text lineHeight={TOGGLE_HEIGHT} flex={'0 0'} margin={0}>
                  {label.active}
                </Text>
              </Flex>
            </LabelPosition>
          </LabelWrapper>
        )}
      </Flex>
    </Label>
  );
};
