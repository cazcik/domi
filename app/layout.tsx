import { Inter } from "next/font/google";
import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/react";
import { AuthKitProvider } from "@workos-inc/authkit-nextjs/components";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  colorScheme: "dark light",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://usedomi.com"),
  title: {
    default: "domi",
    template: "%s - domi",
  },
  description: "the missing product security toolkit",
  openGraph: {
    title: {
      default: "domi",
      template: "%s - domi",
    },
    description: "the missing product security toolkit",
    url: "https://usedomi.com",
    siteName: "domi",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: {
      default: "domi",
      template: "%s - domi",
    },
    description: "the missing product security toolkit",
    creator: "@wiardsdotio",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} antialiased smooth-scroll bg-white dark:bg-black text-black dark:text-white`}
    >
      <body>
        <AuthKitProvider>{children}</AuthKitProvider>
        <Analytics />
      </body>
    </html>
  );
}
