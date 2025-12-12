"use client"
import { PropsWithChildren } from "react";

const RootLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <html lang="en" data-theme="white">
      <head>
        <link rel="shortcut icon" href="/favicon/favicon.ico" type="image/x-icon" />
        <title>Night Nails</title>
        <meta
          name="description"
          content="Night Nails is a nails salon website that provides a variety of services for the nails"
        />
      </head>
      <body className="relative bg-main-background">
        <main className="relative w-full">
          {children}
        </main>
      </body>
    </html>
  );
};

export default RootLayout;
