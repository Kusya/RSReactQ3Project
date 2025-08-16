import React from 'react';
import Link from 'next/link';

export default function About() {
  return (
    <div>
      <h1>This is About page</h1>
      <p> </p>
      <p>Author information: Veronika Dementey. Github: Kusya</p>
      <p>
        This project is creating in accordance to{' '}
        <a href="https://rs.school/courses/reactjs">React course</a>
      </p>
      <p> </p>
      <p>Pokemon search application</p>
      <p>Done with popular tools such as react+vite+typescript.</p>
      <p>Routing implemented with a help of react router </p>
      <p>Test information: vitest + rtl + msw </p>
      <Link href="/">Go Back</Link>
    </div>
  );
}
