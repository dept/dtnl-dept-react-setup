import { LinkProps } from 'next/link'
import React from 'react'

import { Button, ButtonProps } from '../Button'
import { Link } from '../Link'

export type ButtonLinkProps = ButtonProps & LinkProps

export const ButtonLink: React.FC<ButtonLinkProps> = ({
  href,
  as,
  prefetch,
  replace,
  scroll,
  shallow,
  children,
  ...props
}) => {
  return (
    <Link
      href={href}
      as={as}
      prefetch={prefetch}
      scroll={scroll}
      shallow={shallow}
      replace={replace}>
      <Button as="a" {...props}>
        {children}
      </Button>
    </Link>
  )
}
