import { ReactNode, useContext, useState } from 'react';

import { css } from '@dept/styled-system/css';
import React from 'react';
import { Footer } from '../features/layout/Footer';
import { Header } from '../features/layout/Header';
import { Theme, ThemeContext } from './ThemeContext';

interface BaseLayoutProps {
  children?: ReactNode;
}

const layout = css({
  position: 'absolute',
  inset: '[0]',
  display: 'flex',
  flexDirection: 'column',
  bg: 'white',
  _themeA: {
    bg: 'white',
  },
  _themeB: {
    bg: 'darkNight',
  },
});

export function BaseLayout({ children }: BaseLayoutProps) {
  const [theme, setTheme] = useState<Theme>('themeA');
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className={layout} data-theme={theme}>
        <Header />
        <main
          className={css({
            flex: '1',
            flexCenter: true,
          })}
          data-theme={theme}
        >
          {children}
        </main>
        <Footer />
      </div>
    </ThemeContext.Provider>
  );
}
