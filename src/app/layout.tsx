import React from 'react';
import type { Metadata } from 'next';
import Menu from './components/Menu';

export const metadata: Metadata = {
  title: 'Pokemon',
  description: 'Pokemon store',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header>
          <Menu />
        </header>
        <div id="root"> {children}</div>
      </body>
    </html>
  );
}
