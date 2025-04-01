import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import type { Route } from "./+types/root";

import "./app.css";

export const links: Route.LinksFunction = () => [
  {
    rel: "icon",
    href: "/images/icon.png",
  },
  {
    rel: "preload",
    href: "/fonts/inter-var-upright.woff2",
    as: "font",
    type: "font/woff2",
    crossOrigin: "anonymous",
  },
  {
    rel: "preload",
    href: "/fonts/inter-var-italic.woff2",
    as: "font",
    type: "font/woff2",
    crossOrigin: "anonymous",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className="scroll-smooth bg-neutral-50 text-black antialiased"
    >
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        <Analytics />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? error.data || "The requested page was not found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <div className="flex min-h-dvh">
      <div className="m-auto w-full">
        <div>
          <div className="mx-auto flex max-w-sm flex-col px-7 sm:max-w-md md:max-w-xl lg:max-w-2xl">
            <div className="flex flex-col items-center justify-center">
              <h1 className="pb-4 text-center text-3xl font-bold text-neutral-900 sm:pb-5 sm:text-4xl md:pb-6 md:text-5xl lg:text-6xl">
                {message}
              </h1>
              <p className="text-center text-sm text-neutral-500 sm:text-base md:text-lg lg:text-xl">
                {details}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Analytics() {
  if (import.meta.env.MODE === "production") {
    return (
      <script
        defer
        data-domain="usedomi.com"
        data-api="/loops/api/event"
        src="/loops/js/script.js"
      ></script>
    );
  }
}
