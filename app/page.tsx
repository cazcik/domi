import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { auth } from "@/app/auth";
import ProductPage from "@/app/(marketing)/product/page";

export const metadata: Metadata = {
  title: {
    absolute: "introducing domi",
  },
};

export default async function IndexPage() {
  const session = await auth();

  if (session && session.user) {
    redirect("/home");
  } else {
    return <ProductPage />;
  }
}
