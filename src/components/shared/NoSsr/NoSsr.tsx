import { PropsWithChildren } from 'react';

export function NoSsr({ children }: PropsWithChildren<any>) {
  /**
   * to validate whenever your code is running either client side or in node, use typeof window
   * https://github.com/zeit/next.js/pull/7651
   */
  if (typeof window === 'undefined') return null;

  return <>{children}</>;
}
