import { data, redirect } from "react-router";
import type { Route } from "./+types/home";

import { currentUser, workspaces, trainings } from "../../../data.json";

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
  return [{ title: "Training - Domi" }];
}

export default function Training({ loaderData }: Route.ComponentProps) {
  const workspace = loaderData;

  const workspaceTrainingIds = new Set(
    workspace.trainings.flatMap((t) => t.id),
  );

  const activeTrainings = trainings.filter((training) =>
    workspaceTrainingIds.has(training.id),
  );

  return (
    <div>
      <div className="p-7">
        <div>
          <h1 className="pb-1 text-lg font-bold text-neutral-900 sm:pb-2 sm:text-xl">
            Training
          </h1>
          <p className="text-sm text-neutral-500">
            Configure, assign, and complete training.
          </p>
        </div>
        <div className="mt-6 flex">
          <div className="flex gap-x-4 overflow-x-auto pb-2 md:pb-1">
            {activeTrainings &&
              activeTrainings.map((training) => (
                <div className="flex w-full min-w-72">
                  <div
                    key={training.id}
                    className="flex w-full flex-col items-center justify-between rounded-lg border border-neutral-200 bg-white p-4"
                  >
                    <div>
                      <img
                        src={training.image}
                        alt={training.title}
                        className="mb-4 h-44 w-full rounded-lg object-cover"
                      />
                      <h2 className="pb-1 text-lg font-medium text-neutral-900">
                        {training.title}
                      </h2>
                      <p className="line-clamp-3 text-neutral-500">
                        {training.description}
                      </p>
                    </div>
                    <div className="flex w-full flex-col pt-3 md:flex-row md:items-center md:justify-between">
                      <p className="pb-2 text-sm text-neutral-500 md:pb-0">
                        {training.time}
                      </p>
                      <div className="flex items-center gap-x-2">
                        {training.tags.map((tag) => (
                          <span className="text-xs text-neutral-500">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
