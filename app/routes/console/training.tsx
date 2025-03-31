import type { Route } from "./+types/home";

export function loader({ params }: Route.LoaderArgs) {
  return { slug: params.workspaceSlug };
}

export function meta({}: Route.MetaArgs) {
  return [{ title: "Training - Domi" }];
}

export default function Training({ loaderData }: Route.ComponentProps) {
  return (
    <div>
      <div className="p-7">Training</div>
    </div>
  );
}
