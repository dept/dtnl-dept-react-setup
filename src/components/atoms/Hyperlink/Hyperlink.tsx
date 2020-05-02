import { LinkProps } from 'next/link'
import React from 'react'
import styled, { css } from 'styled-components'

import { IconOption } from '@/theme'

import { Box, BoxProps, Flex } from '../Grid'
import { Icon } from '../Icon'
import { Link } from '../Link'

interface HyperLinkElementProps {
  icon?: IconOption
  underline?: boolean
  iconColor?: string
  color?: string
  target?: string
  block?: boolean
}

type HyperlinkProps = BoxProps & Pick<LinkProps, 'href' | 'as' | 'prefetch'> & HyperLinkElementProps

const HyperlinkWrapper = styled(Box)<HyperLinkElementProps>`
  display: inline-block;
  text-decoration: none;
  ${({ block }) => (block ? 'display: block;' : '')}
`

const HyperlinkLabel = styled.span<HyperLinkElementProps>`
  color: ${({ color, theme }) => color || theme.colors.primary};

  &:hover {
    cursor: pointer;
  }

  &:focus {
    outline: ${props => props.theme.outline || 'inherit'};
  }

  ${({ icon }) =>
    icon &&
    css`
      display: flex;
      align-items: center;
      line-height: 1;
    `}

  ${({ underline }) =>
    underline &&
    css`
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
    `}
`

export const Hyperlink = React.forwardRef<HTMLAnchorElement, HyperlinkProps>(
  ({ children, icon, color, href, as, iconColor, underline = true, ...props }, ref) => {
    return (
      <Link href={href} as={as} passHref>
        <HyperlinkWrapper as="a" {...props} ref={ref}>
          <HyperlinkLabel color={color} underline={underline}>
            <Flex alignItems="center" height="100%" as="span">
              {icon && (
                <Box pr={'xxs'} as="span">
                  <Icon size={16} icon={icon} color={iconColor} />
                </Box>
              )}
              {children}
            </Flex>
          </HyperlinkLabel>
        </HyperlinkWrapper>
      </Link>
    )
  },
)
