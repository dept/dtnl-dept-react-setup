import { ReactNode } from 'react';

import { Footer } from '../features/layout/Footer';
import { Header } from '../features/layout/Header';

interface BaseLayoutProps {
  children?: ReactNode;
}

export function BaseLayout({ children }: BaseLayoutProps) {
  return (
    <div>
      <Header />
        {children}
      <Footer />
    </div>

  );
}
