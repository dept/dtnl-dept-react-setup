import { css } from '@dept/styled-system/css';

export function Header() {
  return (
    <header
      className={css({
        flexCenter: true,
        _themeB: {
          color: 'white',
        },
      })}
    >
      header
    </header>
  );
}
