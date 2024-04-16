import { Example } from '../components/Example';
import { ThemeContextProvider } from '../components/ThemContextProvider';
import styles from './page.module.css';

export const metadata = {
  title: 'Store | Kitchen Sink',
};

export default function Store(): JSX.Element {
  return (
    <ThemeContextProvider>
      <div className={styles.root}>
        <Example />
      </div>
    </ThemeContextProvider>
  );
}
