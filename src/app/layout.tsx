import { Metadata } from "next";
import { PropsWithChildren } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Night Nails",
  description:
    "Night Nails is a nails salon website that provides a variety of services for the nails",
  icons: {
    icon: "/favicon/favicon.ico",
  },
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" data-theme="white" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Handjet:wght@100..900&family=Kode+Mono:wght@400..700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Cherry+Bomb+One&family=Manrope:wght@200..800&family=Pacifico&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Geom:ital,wght@0,300..900;1,300..900&family=Sriracha&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Lemonada:wght@300..700&family=Sour+Gummy:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Pinyon+Script&family=Sriracha&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Ga+Maamli&family=Playpen+Sans:wght@100..800&display=swap" rel="stylesheet" />
      </head>
      <body suppressHydrationWarning>
        <main className="relative w-full bg-cream-luxury">{children}</main>
      </body>
    </html>
  );
}
