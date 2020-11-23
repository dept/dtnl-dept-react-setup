import { FC } from 'react';

import { Heading, Paragraph } from '../atoms/Text';

export const NotFoundPage: FC = () => {
  return (
    <>
      <Heading>404</Heading>
      <Paragraph>The page you&apos;re trying to visit doesn&apos;t exist (anymore).</Paragraph>
    </>
  );
};
