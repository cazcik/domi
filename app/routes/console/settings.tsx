import type { Route } from "./+types/home";

export function loader({ params }: Route.LoaderArgs) {
  return { slug: params.workspaceSlug };
}

export function meta({}: Route.MetaArgs) {
  return [{ title: "Settings - Domi" }];
}

export default function Settings({ loaderData }: Route.ComponentProps) {
  return (
    <div>
      <div className="p-7">Settings</div>
    </div>
  );
}
