import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Facebook from "next-auth/providers/facebook";
import { DrizzleAdapter } from "@auth/drizzle-adapter";

import { db } from "@/app/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db),
  providers: [Google, Facebook],
  session: {
    strategy: "database",
  },
  pages: {
    signIn: "/sign-in",
  },
});
