import { useThemeContext } from '@/components/templates/ThemeContext';
import { SeoProps } from '@/constants/types';
import { Button, Card } from '@dept/ui';
import buttonStyles from '@dept/ui/src/components/button/button.module.css';
import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import { useState } from 'react';
import styles from './index.module.css';

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

const Page: NextPage<PageProps> = () => {
  const [counter, setCounter] = useState(0);
  const { theme, setTheme } = useThemeContext();

  const toggleTheme = () => {
    setTheme(theme === 'themeA' ? 'themeB' : 'themeA');
  };

  const incrementCounter = () => setCounter(counter + 1);
  //vstack gap=2
  return (
    <div className={styles.root}>
      <Card
        title={counter.toString()}
        style={{
          color: counter > 3 ? 'green' : undefined,
        }}
      >
        <Button onClick={incrementCounter} className={buttonStyles['button--visual_funky']}>
          Counter +1
        </Button>
      </Card>
      <div className={styles.buttonContainer}>
        <Button onClick={toggleTheme} className={buttonStyles['button--visual_funky']}>
          Change theme
        </Button>
      </div>
    </div>
  );
};

export const getStaticProps = (() => {
  return {
    props: {
      seo: {
        title: 'Homepage',
        description: 'This is the homepage',
        openGraph: {
          type: 'website',
        },
      },
    },
  };
}) satisfies GetStaticProps<SeoProps>;

export default Page;
