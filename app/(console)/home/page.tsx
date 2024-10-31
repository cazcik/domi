import type { Metadata } from "next";

import { auth, signOut } from "@/app/auth";
import { redirect } from "next/navigation";

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
        <div className="m-auto w-full max-w-xl">
          <div className="flex flex-col px-6">
            <h1 className="text-xl font-bold text-black lg:text-2xl">
              hi {session.user.name?.toLowerCase() || "person"}.
            </h1>
            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/" });
              }}
            >
              <button className="text-lg text-neutral-500 lg:mt-1 lg:text-xl">
                sign out.
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
