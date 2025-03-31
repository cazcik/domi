import { Link } from "react-router";
import type { Route } from "./+types/sign-up";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Sign up - Domi" }];
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
            <h1 className="pb-1 text-xl font-bold text-neutral-900 sm:pb-2 sm:text-2xl md:pb-3 md:text-3xl lg:text-4xl">
              domi.
            </h1>
            <p className="text-base text-neutral-500 md:text-lg lg:text-xl">
              Please enter your details to continue.
            </p>
          </div>
          <form className="flex flex-col pt-4 sm:pt-5 md:pt-6 lg:pt-7">
            <div>
              <label className="ml-1 text-sm text-neutral-700" htmlFor="name">
                Name
              </label>
              <input
                required
                id="name"
                type="name"
                name="name"
                autoComplete="name"
                placeholder="Tim Apple"
                className="w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-neutral-900 outline-none placeholder:text-neutral-500 focus:ring focus:ring-neutral-400 md:text-lg"
              />
            </div>
            <div className="pt-2">
              <label className="ml-1 text-sm text-neutral-700" htmlFor="email">
                Email
              </label>
              <input
                required
                id="email"
                type="email"
                name="email"
                autoComplete="email"
                placeholder="tim@apple.com"
                className="w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-neutral-900 outline-none placeholder:text-neutral-500 focus:ring focus:ring-neutral-400 md:text-lg"
              />
            </div>
            <div className="pt-2">
              <label
                className="ml-1 text-sm text-neutral-700"
                htmlFor="workspace"
              >
                Workspace
              </label>
              <input
                required
                id="workspace"
                type="workspace"
                name="name"
                placeholder="Apple"
                className="w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-neutral-900 outline-none placeholder:text-neutral-500 focus:ring focus:ring-neutral-400 md:text-lg"
              />
            </div>
            <div className="pt-4 lg:pt-5">
              <p className="text-xs text-neutral-500 md:text-sm">
                By clicking Sign up you agree to our{" "}
                <Link
                  to="#"
                  className="text-neutral-700 hover:text-neutral-900"
                >
                  Privacy Policy
                </Link>{" "}
                and{" "}
                <Link
                  to="#"
                  className="text-neutral-700 hover:text-neutral-900"
                >
                  Terms of Service
                </Link>
                .
              </p>
            </div>
            <div className="pt-3">
              <button
                type="submit"
                className="w-full rounded-lg border border-neutral-200 bg-neutral-800 px-3 py-2 text-neutral-100 outline-none placeholder:text-neutral-500 hover:bg-neutral-900 hover:text-white focus:ring focus:ring-neutral-400 md:text-lg lg:text-xl"
              >
                Sign up
              </button>
            </div>
          </form>
          <div className="flex items-center justify-center pt-2 lg:pt-3">
            <p className="text-sm text-neutral-500 sm:text-base">
              Already have an account?{" "}
              <Link
                to="/sign-in"
                className="text-neutral-700 hover:text-neutral-900"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
