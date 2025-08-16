import React from 'react';
import Link from 'next/link';

export default function MenuLayout() {
  return (
    <nav className="flex justify-end p-1">
      <Link href="/about" className="px-4">
        About
      </Link>
    </nav>
  );
}
