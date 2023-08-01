import { Button, ButtonProps } from '@chakra-ui/react';
import { LinkProps } from 'next/link';

import { CustomLink } from '../Link';

export type ButtonLinkProps = Omit<ButtonProps, 'as'> & LinkProps & { target?: string };

export function ButtonLink({
  href,
  as,
  prefetch,
  replace,
  scroll,
  shallow,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <CustomLink
      href={href}
      as={as}
      prefetch={prefetch}
      scroll={scroll}
      shallow={shallow}
      replace={replace}
      passHref
      legacyBehavior
    >
      <Button as="a" display="inline-flex" {...props}>
        {children}
      </Button>
    </CustomLink>
  );
}
