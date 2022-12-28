'use client';

import { Heading, Text } from '@chakra-ui/react';
import { ErrorProps } from 'next/error';

export function ErrorPage({ statusCode }: ErrorProps) {
  return (
    <>
      <Heading>Oops... {statusCode ? `| ${statusCode} error` : ''} </Heading>
      <Text>Something went wrong</Text>
    </>
  );
}
