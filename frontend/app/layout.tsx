import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import "./globals.css";

import { Providers } from "./providers";
// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "JobsPortal - Find your dreamed job!",
  description:
    "Portal created for people who wants to make their dreams come true with best job ever!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
