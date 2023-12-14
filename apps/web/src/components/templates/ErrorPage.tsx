import { ErrorProps } from '@/pages/_error';

export function ErrorPage({ statusCode }: ErrorProps) {
  return <>Some error: {statusCode}</>;
}
