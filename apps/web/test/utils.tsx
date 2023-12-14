import { ThemeProvider } from '@emotion/react';
import { render as rtlRender } from '@testing-library/react';
import { Fragment, PropsWithChildren } from 'react';

type ArgumentTypes<F> = F extends (...args: infer A) => any ? A : never;

type RenderArgs = ArgumentTypes<typeof rtlRender>;

export const Wrapper = ({ children }: PropsWithChildren<unknown>) => {
  return <Fragment>{children}</Fragment>;
};

// eslint-disable-next-line import/export
export * from '@testing-library/react';

// eslint-disable-next-line import/export
export const render = (ui: RenderArgs[0], config?: RenderArgs[1]) => {
  return rtlRender(ui, {
    wrapper: Wrapper,
    ...config,
  });
};
