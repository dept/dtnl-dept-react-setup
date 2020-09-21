import { NextPage, NextPageContext } from 'next';
import React, { useEffect, useState } from 'react';

import { Button } from '@/components/atoms/Button';
import { Paragraph } from '@/components/atoms/Text';
import { useAuth } from '@/context/AuthContext';

export const withAuth = (Page: NextPage<any>) => {
  const WithAuth: NextPage<any> = props => {
    const { user, login } = useAuth();
    const [loading, setLoading] = useState(!user);

    async function initialize() {
      setLoading(false);
    }

    useEffect(() => {
      initialize();
    }, []);

    if (loading) {
      return <div>Loading</div>;
    }

    if (!user) {
      return (
        <>
          <Paragraph mb={10}>You are not logged in.</Paragraph>
          <Button onClick={login}>Log in</Button>
        </>
      );
    }

    return <Page {...props} />;
  };

  if (Page.getInitialProps) {
    WithAuth.getInitialProps = async (ctx: NextPageContext) => {
      const pageProps = Page.getInitialProps && (await Page.getInitialProps(ctx));

      return { ...pageProps };
    };
  }

  return WithAuth;
};
