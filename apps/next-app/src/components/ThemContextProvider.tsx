'use client';

import { useState } from 'react';
import type { Theme } from './ThemeContext';
import { ThemeContext } from './ThemeContext';

export function ThemeContextProvider(props: { children: React.ReactNode }): JSX.Element {
  const [theme, setTheme] = useState<Theme>('themeA');
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>{props.children}</ThemeContext.Provider>
  );
}
