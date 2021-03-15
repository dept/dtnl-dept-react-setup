import { Heading, Paragraph } from '@/components/shared/Text';
import { ErrorProps } from '@/pages/_error';

export function ErrorPage({ statusCode }: ErrorProps) {
  return (
    <>
      <Heading>Oops... {statusCode ? `| ${statusCode} error` : ''} </Heading>
      <Paragraph>Something went wrong</Paragraph>
    </>
  );
}
