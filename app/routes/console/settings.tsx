import { data, redirect } from "react-router";
import type { Route } from "./+types/home";

import { currentUser, workspaces } from "../../../data.json";

export async function loader({ params }: Route.LoaderArgs) {
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
  }

  return workspace;
}

export function meta({}: Route.MetaArgs) {
  return [{ title: "Settings - Domi" }];
}

export default function Settings({ loaderData }: Route.ComponentProps) {
  const workspace = loaderData;

  return (
    <div>
      <div className="p-7">
        <div>
          <h1 className="pb-1 text-lg font-bold text-neutral-900 sm:pb-2 sm:text-xl">
            Settings
          </h1>
          <p className="text-sm text-neutral-500">
            Options and settings for the organization.
          </p>
        </div>
        <form className="mt-6 flex max-w-sm flex-col">
          <div>
            <label className="ml-0.5 text-sm text-neutral-700" htmlFor="name">
              Workspace Name
            </label>
            <input
              required
              id="name"
              type="name"
              name="name"
              autoComplete="off"
              defaultValue={workspace.name}
              className="w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-neutral-900 outline-none focus:ring focus:ring-neutral-400"
            />
          </div>
          <div className="pt-2">
            <label className="ml-0.5 text-sm text-neutral-700" htmlFor="slug">
              Workspace Slug
            </label>
            <input
              required
              id="slug"
              type="slug"
              name="slug"
              autoComplete="off"
              defaultValue={workspace.slug}
              className="w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-neutral-900 outline-none focus:ring focus:ring-neutral-400"
            />
          </div>
          <div className="pt-2">
            <label className="ml-0.5 text-sm text-neutral-700" htmlFor="email">
              Billing Email
            </label>
            <input
              required
              id="billingEmail"
              type="billingEmail"
              name="billingEmail"
              autoComplete="off"
              defaultValue={workspace.billingEmail}
              className="w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-neutral-900 outline-none focus:ring focus:ring-neutral-400"
            />
          </div>
          <div className="pt-3">
            <button
              type="submit"
              className="w-full rounded-lg border border-neutral-200 bg-neutral-800 px-3 py-1.5 text-neutral-100 outline-none placeholder:text-neutral-500 hover:bg-neutral-900 hover:text-white focus:ring focus:ring-neutral-400 sm:w-auto sm:px-6"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
