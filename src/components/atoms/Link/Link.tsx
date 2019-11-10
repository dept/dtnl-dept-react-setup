import { default as NextLink, LinkProps } from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

export const Link: React.FC<LinkProps> = props => <NextLink passHref {...props} />

type ActiveLinkProps = LinkProps & {
  activeClassName?: string
  exact?: boolean
  render?: (isActive: boolean) => any
  children?: React.ReactElement
}

export const ActiveLink: React.FC<ActiveLinkProps> = ({
  children,
  href,
  exact,
  activeClassName = 'active',
  render,
  ...otherProps
}: ActiveLinkProps) => {
  const router = useRouter()
  const child = children && React.Children.only(children)
  const condition = exact
    ? Boolean(router && router.pathname === href)
    : Boolean(router && router.pathname.startsWith(String(href)))
  const className = condition ? activeClassName : undefined

  return (
    <Link href={href} {...otherProps}>
      {render
        ? render(condition)
        : child &&
          React.cloneElement(child, { className: [child.props.className, className].join(' ') })}
    </Link>
  )
}
