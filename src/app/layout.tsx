import React from 'react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Pokemon Info</title>
        <link href="/src/style.css" rel="stylesheet" />
      </head>
      <body>
        <div id="root"></div>
        <script type="module" src="/src/main.tsx">
          {children}
        </script>
      </body>
    </html>
  );
}
