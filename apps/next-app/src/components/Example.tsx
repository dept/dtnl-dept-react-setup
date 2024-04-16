'use client';
import { Button, Card } from '@dept/ui';
import { useState } from 'react';
import { useThemeContext } from './ThemeContext';
import example from './example.module.css';

export function Example(): JSX.Element {
  const [counter, setCounter] = useState(0);
  const { theme, setTheme } = useThemeContext();

  const toggleTheme = (): void => {
    setTheme(theme === 'themeA' ? 'themeB' : 'themeA');
  };

  const incrementCounter = (): void => {
    setCounter(counter + 1);
  };

  return (
    <>
      <Card title={counter.toString()} titleColor={counter > 3 ? 'green' : undefined}>
        <Button onClick={incrementCounter}>Counter +1</Button>
      </Card>
      <div className={example.buttonContainer}>
        <Button onClick={toggleTheme}>Change theme</Button>
      </div>
    </>
  );
}
