import { ReactNode, useState } from 'react';

import React from 'react';
import { Footer } from '../features/layout/Footer';
import { Header } from '../features/layout/Header';
import layoutStyles from './base.module.css';
import { Theme, ThemeContext } from './ThemeContext';

interface BaseLayoutProps {
  children?: ReactNode;
}

export function BaseLayout({ children }: BaseLayoutProps) {
  const [theme, setTheme] = useState<Theme>('themeA');
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className={layoutStyles.root} data-theme={theme}>
        <Header />
        <main className={layoutStyles.main} data-theme={theme}>
          {children}
        </main>
        <Footer />
      </div>
    </ThemeContext.Provider>
  );
}
