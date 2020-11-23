import { LinkProps } from 'next/link';
import { FC } from 'react';

import { Button, ButtonProps } from '../Button';
import { Link } from '../Link';

export type ButtonLinkProps = Omit<ButtonProps, 'as'> & LinkProps;

export const ButtonLink: FC<ButtonLinkProps> = ({
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
      replace={replace}
      passHref>
      <Button as="a" display="inline-block" {...props}>
        {children}
      </Button>
    </Link>
  );
};
