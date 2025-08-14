import React from 'react';
import type { Metadata } from 'next';

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
        <div id="root"> {children}</div>
        <script type="module" src="/src/main.tsx"></script>
      </body>
    </html>
  );
}
