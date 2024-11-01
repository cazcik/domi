import Link from "next/link";
import type { Metadata } from "next";

import { auth } from "@/app/auth";

export const metadata: Metadata = {
  title: {
    absolute: "introducing domi",
  },
};

export default async function ProductPage() {
  const session = await auth();

  return (
    <div className="flex min-h-dvh flex-col">
      <div className="absolute pl-5 pt-5">
        {session && session.user ? (
          <Link
            href="/home"
            className="text-lg text-neutral-500 hover:text-neutral-900 lg:text-xl"
          >
            home.
          </Link>
        ) : (
          <Link
            href="/sign-in"
            className="text-lg text-neutral-500 hover:text-neutral-900 lg:text-xl"
          >
            sign in.
          </Link>
        )}
      </div>
      <div className="m-auto w-full max-w-xl">
        <div className="flex flex-col px-6">
          <h1 className="text-xl font-bold text-black lg:text-2xl">domi.</h1>
          <p className="text-lg text-neutral-500 lg:mt-1 lg:text-xl">
            meet the friendly way to homeschool.
          </p>
        </div>
      </div>
    </div>
  );
}
