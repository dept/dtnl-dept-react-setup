import { FC } from 'react';

import { Heading, Paragraph } from '@/components/atoms/Text';
import { ErrorProps } from '@/pages/_error';

export const ErrorPage: FC<ErrorProps> = ({ statusCode }) => {
  return (
    <>
      <Heading>Oops... {statusCode ? `| ${statusCode} error` : ''} </Heading>
      <Paragraph>Something went wrong</Paragraph>
    </>
  );
};
