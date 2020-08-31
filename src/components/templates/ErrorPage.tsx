import { Heading, Paragraph } from '@/components/atoms';
import { ErrorProps } from '@/pages/_error';

export const ErrorPage: React.FC<ErrorProps> = ({ statusCode }) => {
  return (
    <>
      <Heading>Oops... {statusCode ? `| ${statusCode} error` : ''} </Heading>
      <Paragraph>Something went wrong</Paragraph>
    </>
  );
};
