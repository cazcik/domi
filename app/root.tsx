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
  { rel: "icon", href: "/favicon.ico" },
  { rel: "icon", href: "/icon.png", type: "image/png" },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className="scroll-smooth bg-neutral-50 text-black antialiased dark:bg-neutral-950 dark:text-white"
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
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <div className="flex min-h-dvh flex-col">
      <div className="m-auto">
        <div>
          <h1 className="font-bold text-black uppercase dark:text-white">
            {message}
          </h1>
          <p className="text-neutral-600 uppercase dark:text-neutral-400">
            {details}
          </p>
          {stack && (
            <pre>
              <code>{stack}</code>
            </pre>
          )}
        </div>
      </div>
      <footer className="flex items-center justify-center py-3">
        <p className="text-xs text-neutral-400 uppercase dark:text-neutral-600">
          &copy; {new Date().getFullYear()} DOMI LLC
        </p>
      </footer>
    </div>
  );
}
