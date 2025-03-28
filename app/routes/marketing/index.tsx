import { Link } from "react-router";
import type { Route } from "./+types/index";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Domi: Secure your apps easily." }];
}

export function loader({ context }: Route.LoaderArgs) {
  return { message: context.cloudflare.env.ENVIRONMENT };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return (
    <div className="flex w-full flex-col">
      <div>
        <div className="mx-auto flex max-w-sm flex-col px-7 py-20 sm:max-w-md sm:py-24 md:max-w-xl md:py-28 lg:py-32">
          <div className="flex flex-col items-center justify-center">
            <h1 className="pb-4 text-center text-3xl font-bold text-slate-900 sm:pb-5 sm:text-4xl md:pb-6 md:text-5xl dark:text-slate-100">
              Securing your app just got a whole lot easier.
            </h1>
            <p className="text-center text-sm text-slate-500 sm:text-base md:text-lg">
              Meet the plain and simple way to manage your apps and api's
              security posture; without completely crushing your soul.
            </p>
          </div>
          <div className="flex items-center justify-center gap-x-6 pt-10 sm:pt-12 md:pt-14">
            <Link
              to="#"
              className="rounded-4xl px-6 py-2.5 text-sm sm:text-base md:text-lg dark:bg-slate-700 dark:text-slate-100 dark:hover:bg-slate-600"
            >
              Get started
            </Link>
            <Link
              to="#"
              className="text-sm sm:text-base md:text-lg dark:text-slate-100 dark:hover:text-slate-300"
            >
              Watch demo
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
