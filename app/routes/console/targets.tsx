import type { Route } from "./+types/home";

export function loader({ params }: Route.LoaderArgs) {
  return { slug: params.workspaceSlug };
}

export function meta({}: Route.MetaArgs) {
  return [{ title: "Targets - Domi" }];
}

export default function Targets({ loaderData }: Route.ComponentProps) {
  return (
    <div>
      <div className="p-7">Targets</div>
    </div>
  );
}
