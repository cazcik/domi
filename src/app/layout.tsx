import type { Metadata } from "next";
import localFont from "next/font/local";

import "./globals.css";

const source = localFont({
  src: [
    {
      path: "source-sans-3vf-upright.woff2",
      style: "normal",
    },
    {
      path: "source-sans-3vf-italic.woff2",
      style: "italic",
    },
  ],
  display: "swap",
  variable: "--font-source",
});

export const metadata: Metadata = {
  title: {
    default: "domi",
    template: "%s - domi",
  },
  description: "the friendly home school assistant.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${source.variable} scroll-smooth bg-amber-50/10 text-black antialiased`}
    >
      <body>
        {children}
        {process.env.NODE_ENV === "production" ? (
          <script
            defer
            data-domain="usedomi.com"
            data-api="https://circles.usedomi.com/api/event"
            src="https://circles.usedomi.com/js/script.js"
          ></script>
        ) : null}
      </body>
    </html>
  );
}
