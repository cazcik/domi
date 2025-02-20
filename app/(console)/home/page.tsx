import Link from "next/link";
import {
  getSignInUrl,
  getSignUpUrl,
  withAuth,
  signOut,
} from "@workos-inc/authkit-nextjs";

export default async function Home() {
  const { user } = await withAuth();

  if (!user) {
    const signInUrl = await getSignInUrl();
    const signUpUrl = await getSignUpUrl();

    return (
      <div>
        <div>y r u here</div>
        <Link href={signInUrl}>Log in</Link>
        <Link href={signUpUrl}>Sign Up</Link>
      </div>
    );
  }
  return (
    <form
      action={async () => {
        "use server";
        await signOut({ returnTo: "/" });
      }}
    >
      <p>yo{user?.firstName && `, ${user?.firstName.toLowerCase()}`}</p>
      <button type="submit">sign out</button>
    </form>
  );
}
