import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { auth, signOut } from "@/app/auth";
import Link from "next/link";

export const metadata: Metadata = {
  title: "home",
};

export default async function ConsolePage() {
  const session = await auth();

  if (!session || !session.user) {
    redirect("/sign-in");
  } else {
    return (
      <div className="flex min-h-dvh flex-col">
        <div className="absolute flex w-full items-center justify-between px-5 pt-5">
          <div>
            <Link
              href="/product"
              className="text-lg text-neutral-500 hover:text-neutral-900 lg:text-xl"
            >
              product.
            </Link>
          </div>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/" });
            }}
          >
            <button className="text-lg text-neutral-500 hover:text-neutral-900 lg:text-xl">
              sign out.
            </button>
          </form>
        </div>
        <div className="m-auto w-full max-w-xl">
          <div className="flex flex-col px-6">
            <h1 className="text-xl font-bold text-black lg:text-2xl">
              hi {session.user.name?.toLowerCase() || "person"}.
            </h1>
            <p className="text-lg text-neutral-500 lg:mt-1 lg:text-xl">
              {session.user.id || "00000000-0000-0000-0000-000000000000"}
            </p>
          </div>
        </div>
      </div>
    );
  }
}
