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
      <body suppressHydrationWarning>
        <main className="relative w-full bg-cream-luxury">{children}</main>
      </body>
    </html>
  );
}
