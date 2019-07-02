import { Box, BoxProps, Flex } from '@tpdewolf/styled-primitives'
import React from 'react'
import styled from 'styled-components'

import { Icon, IconOption } from './Icon'

type HyperlinkProps = BoxProps & {
  icon?: IconOption
  href?: string
  underline?: boolean
  iconColor?: string
  color?: string
  target?: string
  block?: boolean
}

const StyledHyperlink = styled(Box)<HyperlinkProps>`
  display: inline-block;
  text-decoration: none;
  ${({ block }) => (block ? 'display: block;' : '')}
`

const StyledHyperlinkLabel = styled.span<HyperlinkProps>`
  color: ${({ color, theme }) => color || theme.colors.primary};

  &:hover {
    cursor: pointer;
  }

  &:focus {
    outline: ${props => props.theme.outline || 'inherit'};
  }

  ${({ icon }) =>
    icon
      ? `
    display: flex;
    align-items: center;
    line-height: 1;
  `
      : ''}

  ${({ underline }) =>
    underline
      ? `
      &:after {
        content: '';
        display: block;
        background: currentColor;
        transition: max-width 0.15s ease-in;
        height: 1px;
        margin-top: -2px;
        max-width: 100%;
        width: 100%;
      }

      &:hover {
        &:after {
          max-width: 0%;
        }
      }
    `
      : ''}
`

export const Hyperlink: React.FC<HyperlinkProps> = props => {
  const { children, icon, color, href, iconColor, underline } = props
  return (
    <StyledHyperlink as="a" href={href} {...props}>
      <StyledHyperlinkLabel color={color} underline={underline}>
        <Flex alignItems="center" height="100%" as="span">
          {icon && (
            <Box pr={'xxs'} as="span">
              <Icon size={16} icon={icon} color={iconColor} />
            </Box>
          )}
          {children}
        </Flex>
      </StyledHyperlinkLabel>
    </StyledHyperlink>
  )
}
