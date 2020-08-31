import { NextPage, NextPageContext } from 'next';
import React from 'react';

import { ErrorPage } from '@/components/templates';

export interface ErrorProps {
  statusCode?: number | null;
}

const Error: NextPage<ErrorProps> = props => <ErrorPage {...props} />;

Error.getInitialProps = async ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : null;
  return { statusCode };
};

export default Error;
