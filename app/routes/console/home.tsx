import type { Route } from "./+types/home";

export function loader({ params }: Route.LoaderArgs) {
  return { slug: params.workspaceSlug };
}

export function meta({}: Route.MetaArgs) {
  return [{ title: "Home - Domi" }];
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { slug } = loaderData;
  return (
    <div>
      <div className="px-7">{slug}</div>
    </div>
  );
}
