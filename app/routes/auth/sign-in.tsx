import { Link } from "react-router";
import type { Route } from "./+types/sign-in";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Sign in - Domi" }];
}

export function loader({ context }: Route.LoaderArgs) {
  return { message: context.cloudflare.env.ENVIRONMENT };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return (
    <div className="m-auto w-full">
      <div>
        <div className="mx-auto flex max-w-md flex-col px-7">
          <div className="flex flex-col">
            <h1 className="pb-1 text-xl font-bold text-slate-900 sm:pb-2 sm:text-2xl md:pb-3 md:text-3xl lg:text-4xl dark:text-slate-100">
              domi.
            </h1>
            <p className="text-base text-slate-500 md:text-lg lg:text-xl">
              Please enter your email to continue.
            </p>
          </div>
          <form className="flex flex-col pt-4 sm:pt-5 md:pt-6 lg:pt-7">
            <div>
              <label className="sr-only" htmlFor="email">
                Email
              </label>
              <input
                required
                id="email"
                type="email"
                name="email"
                autoComplete="email"
                placeholder="you@example.com"
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none placeholder:text-slate-500 focus:ring focus:ring-slate-400 md:text-lg lg:text-xl dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-400 dark:focus:ring dark:focus:ring-slate-100"
              />
            </div>
            <div className="pt-2">
              <button
                type="submit"
                className="w-full rounded-lg border border-slate-200 bg-slate-500 px-3 py-2 text-slate-100 outline-none placeholder:text-slate-500 hover:bg-slate-400 hover:text-white focus:ring focus:ring-slate-400 md:text-lg lg:text-xl dark:border-slate-800 dark:bg-slate-700 dark:hover:bg-slate-600 dark:focus:ring dark:focus:ring-slate-500"
              >
                Continue
              </button>
            </div>
          </form>
          <div className="mt-2 flex items-center justify-center">
            <p className="text-sm sm:text-base dark:text-slate-500">
              Need an account?{" "}
              <Link
                to="/sign-up"
                className="dark:text-slate-300 dark:hover:text-slate-100"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
