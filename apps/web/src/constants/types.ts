import { NextSeoProps } from 'next-seo';
export interface SeoProps {
  seo: NextSeoProps & Required<Pick<NextSeoProps, 'title' | 'description'>>;
}
