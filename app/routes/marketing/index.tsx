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
    <div className="m-auto w-full">
      <div>
        <div className="mx-auto flex max-w-sm flex-col px-7 sm:max-w-md md:max-w-xl lg:max-w-2xl">
          <div className="flex flex-col items-center justify-center">
            <h1 className="pb-4 text-center text-3xl font-bold text-neutral-900 sm:pb-5 sm:text-4xl md:pb-6 md:text-5xl lg:text-6xl">
              Securing your app just got a whole lot easier.
            </h1>
            <p className="text-center text-sm text-neutral-500 sm:text-base md:text-lg lg:text-xl">
              Meet the plain and simple way to manage your apps and apis
              security posture; without completely crushing your soul.
            </p>
          </div>
          <div className="flex items-center justify-center gap-x-6 pt-10 sm:pt-12 md:gap-x-8 md:pt-14 lg:gap-x-10 lg:pt-16">
            <Link
              to="/sign-up"
              className="text-sm text-neutral-600 hover:text-neutral-900 sm:text-base md:text-lg lg:text-xl"
            >
              Get started &rarr;
            </Link>
            <Link
              to="#"
              className="text-sm text-neutral-600 hover:text-neutral-900 sm:text-base md:text-lg lg:text-xl"
            >
              Watch demo
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
