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
  return [{ title: "Team - Domi" }];
}

export default function Team({ loaderData }: Route.ComponentProps) {
  const { team } = loaderData;
  return (
    <div>
      <div className="p-7">
        <div>
          <h1 className="pb-1 text-lg font-bold text-neutral-900 sm:pb-2 sm:text-xl">
            Team
          </h1>
          <p className="text-sm text-neutral-500">
            Add, remove, and update your team members.
          </p>
        </div>
        <div className="mt-6 flex max-w-lg flex-col">
          <div className="flex items-center gap-x-2">
            <button
              type="button"
              className="w-full rounded-lg border border-neutral-200 bg-neutral-800 px-3 py-1.5 text-neutral-100 outline-none placeholder:text-neutral-500 hover:bg-black hover:text-white focus:ring focus:ring-neutral-400 sm:w-auto sm:px-6"
            >
              Add team member
            </button>
          </div>
          <div className="mt-3">
            {team && team.length > 0 ? (
              <div className="flex flex-col gap-y-2">
                {team.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center rounded-lg border border-neutral-200 bg-white px-3 py-2"
                  >
                    <div className="flex items-center gap-x-3">
                      <div className="inline-flex size-7 items-center justify-center rounded-full bg-neutral-500">
                        <span className="text-xs font-medium text-white">
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <div>{member.name}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-neutral-500">No recent team members.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
