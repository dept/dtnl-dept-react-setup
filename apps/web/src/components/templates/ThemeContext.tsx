import { createContext, useContext } from 'react';

export type Theme = 'themeA' | 'themeB';

export type ThemeContextType = {
  theme: 'themeA' | 'themeB';
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  setTheme: (theme: Theme) => void;
};
export const ThemeContext = createContext<ThemeContextType | null>(null);

export const useThemeContext = (): ThemeContextType => {
  const themeContext = useContext(ThemeContext);
  if (themeContext) {
    const { theme, setTheme } = themeContext;
    return { theme, setTheme };
  } else {
    return {
      theme: 'themeA',
      setTheme: () => null,
    };
  }
};
