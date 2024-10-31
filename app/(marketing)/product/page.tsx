import type { Metadata } from "next";

import { auth, signIn } from "@/app/auth";
import Link from "next/link";

export const metadata: Metadata = {
  title: {
    absolute: "introducing domi",
  },
};

export default async function ProductPage() {
  const session = await auth();

  return (
    <div className="flex min-h-dvh flex-col">
      <div className="pl-5 pt-5">
        {session && session.user ? (
          <Link
            href="/home"
            className="text-lg text-neutral-500 lg:mt-1 lg:text-xl"
          >
            home.
          </Link>
        ) : (
          <form
            action={async () => {
              "use server";
              await signIn();
            }}
          >
            <button className="text-lg text-neutral-500 lg:mt-1 lg:text-xl">
              sign in.
            </button>
          </form>
        )}
      </div>
      <div className="m-auto w-full max-w-xl">
        <div className="-mt-12 flex flex-col px-6">
          <h1 className="text-xl font-bold text-black lg:text-2xl">domi.</h1>
          <p className="text-lg text-neutral-500 lg:mt-1 lg:text-xl">
            the friendly way to homeschool.
          </p>
        </div>
      </div>
    </div>
  );
}
