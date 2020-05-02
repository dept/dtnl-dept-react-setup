import { LinkProps } from 'next/link'
import React from 'react'
import { useTheme } from 'styled-components'

import { IconOption } from '@/theme'

import { Box, BoxProps, Flex, PseudoBox } from '../Grid'
import { Icon } from '../Icon'
import { Link } from '../Link'

interface HyperLinkElementProps {
  icon?: IconOption
  iconColor?: string
  target?: string
}

type HyperlinkProps = BoxProps & Pick<LinkProps, 'href' | 'as' | 'prefetch'> & HyperLinkElementProps

export const Hyperlink = React.forwardRef<HTMLAnchorElement, HyperlinkProps>(
  ({ children, icon, href, as, iconColor, color = 'primary', ...props }, ref) => {
    const theme = useTheme()

    return (
      <Link href={href} as={as} passHref>
        <PseudoBox
          as="a"
          display="inline-block"
          color={color}
          borderRadius={4}
          {...props}
          _focus={{
            outline: 'none',
            boxShadow: theme.shadows.outline,
          }}
          ref={ref}>
          <Flex alignItems="center" height="100%" as="span">
            {icon && (
              <Box mr={'0.5em'} as="span">
                <Icon size={16} icon={icon} color={iconColor} />
              </Box>
            )}
            {children}
          </Flex>
        </PseudoBox>
      </Link>
    )
  },
)
