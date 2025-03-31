import { data, redirect } from "react-router";
import type { Route } from "./+types/home";

import { currentUser } from "../../../data.json";

export function loader({ params }: Route.LoaderArgs) {
  // check user is authenticated
  if (!currentUser) {
    return redirect("/sign-in");
  }

  // check currentUser has access to requested slug
  if (
    currentUser.workspaces.find(
      (workspace) => workspace.slug === params.workspaceSlug,
    )
  ) {
    // user has access, redirect to slug's home page
    return redirect(`/${params.workspaceSlug}/home`);
  } else {
    // user does not have access, throw an error
    throw data("Workspace not found.", {
      status: 404,
    });
  }
}

export function meta({}: Route.MetaArgs) {
  return [{ title: "Home - Domi" }];
}

export default function Home() {
  return;
}
