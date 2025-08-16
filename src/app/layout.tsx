import React from 'react';
import type { Metadata } from 'next';
import './style.css';

export const metadata: Metadata = {
  title: 'Pokemon',
  description: 'Pokemon store',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
