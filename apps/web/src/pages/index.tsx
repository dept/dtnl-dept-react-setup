import { useThemeContext } from '@/components/templates/ThemeContext';
import { SeoProps } from '@/constants/types';
import { css } from '@dept/styled-system/css';
import { vstack } from '@dept/styled-system/patterns';
import { Button, Card } from '@dept/ui';
import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import { useState } from 'react';

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

const Page: NextPage<PageProps> = () => {
  const [counter, setCounter] = useState(0);
  const { theme, setTheme } = useThemeContext();

  const toggleTheme = () => {
    setTheme(theme === 'themeA' ? 'themeB' : 'themeA');
  };

  const incrementCounter = () => setCounter(counter + 1);

  return (
    <div className={vstack({ gap: '2' })}>
      <Card title={counter.toString()} titleColor={counter > 3 ? 'peach' : 'black'}>
        <Button onClick={incrementCounter} fullWidth shape="square">
          Counter +1
        </Button>
      </Card>
      <div className={css({ width: '[262px]', padding: '4' })}>
        <Button onClick={toggleTheme} shape="square" fullWidth>
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
