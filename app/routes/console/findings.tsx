import type { Route } from "./+types/home";

export function loader({ params }: Route.LoaderArgs) {
  return { slug: params.workspaceSlug };
}

export function meta({}: Route.MetaArgs) {
  return [{ title: "Findings - Domi" }];
}

export default function Findings({ loaderData }: Route.ComponentProps) {
  return (
    <div>
      <div className="p-7">Findings</div>
    </div>
  );
}
