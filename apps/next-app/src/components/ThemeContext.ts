import { createContext, useContext } from 'react';

export type Theme = 'themeA' | 'themeB';

export interface ThemeContextType {
  theme: 'themeA' | 'themeB';

  setTheme: (theme: Theme) => void;
}
export const ThemeContext = createContext<ThemeContextType | null>(null);

export const useThemeContext = (): ThemeContextType => {
  const themeContext = useContext(ThemeContext);
  if (themeContext) {
    const { theme, setTheme } = themeContext;
    return { theme, setTheme };
  }
  return {
    theme: 'themeA',
    setTheme: () => null,
  };
};
