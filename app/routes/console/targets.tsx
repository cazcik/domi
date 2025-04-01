import { data, redirect } from "react-router";
import type { Route } from "./+types/home";

import { currentUser, workspaces } from "../../../data.json";

export function loader({ params }: Route.LoaderArgs) {
  // check if user is authenticated
  if (!currentUser) {
    return redirect("/sign-in");
  }

  // check if user has access to the requested workspace
  if (
    !currentUser.workspaces ||
    currentUser.workspaces.length === 0 ||
    !currentUser.workspaces.find(
      (workspace) => workspace.slug === params.workspaceSlug,
    )
  ) {
    throw data("Workspace not found.", { status: 404 });
  }

  const workspace = workspaces.find(
    (workspace) => workspace.slug === params.workspaceSlug,
  );

  // check if slug exists and get workspace
  if (
    !workspace ||
    !params.workspaceSlug ||
    params.workspaceSlug.length === 0
  ) {
    throw data("Workspace not found.", { status: 404 });
  } else {
    return workspace;
  }
}

export function meta({}: Route.MetaArgs) {
  return [{ title: "Targets - Domi" }];
}

export default function Targets({ loaderData }: Route.ComponentProps) {
  return (
    <div>
      <div className="p-7">
        <div>
          <h1 className="pb-1 text-lg font-bold text-neutral-900 sm:pb-2 sm:text-xl">
            Targets
          </h1>
          <p className="text-sm text-neutral-500">
            Configure and manage all your targets.
          </p>
        </div>
      </div>
    </div>
  );
}
