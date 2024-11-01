import type { Metadata } from "next";

import { signIn } from "@/app/auth";

export const metadata: Metadata = {
  title: "sign in",
};

export default function SignInPage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <div className="m-auto w-full max-w-xl">
        <div className="flex flex-col px-6">
          <h1 className="text-xl font-medium text-black lg:text-2xl">
            sign in.
          </h1>
          <form
            action={async () => {
              "use server";
              await signIn("google", { redirectTo: "/home" });
            }}
          >
            <button
              type="submit"
              className="text-lg text-neutral-500 hover:text-neutral-900 lg:mt-1 lg:text-xl"
            >
              with google.
            </button>
          </form>
          <form
            action={async () => {
              "use server";
              await signIn("facebook", { redirectTo: "/home" });
            }}
          >
            <button
              type="submit"
              className="text-lg text-neutral-500 hover:text-neutral-900 lg:mt-1 lg:text-xl"
            >
              with facebook.
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
