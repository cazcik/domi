import type { Route } from "./+types/home";

export function loader({ params }: Route.LoaderArgs) {
  return { slug: params.workspaceSlug };
}

export function meta({}: Route.MetaArgs) {
  return [{ title: "Applications - Domi" }];
}

export default function Applications({ loaderData }: Route.ComponentProps) {
  return (
    <div>
      <div className="p-7">Applications</div>
    </div>
  );
}
