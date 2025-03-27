import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [{ title: "introducing domi" }];
}

export function loader({ context }: Route.LoaderArgs) {
  return { message: context.cloudflare.env.ENVIRONMENT };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return (
    <div className="flex min-h-dvh">
      <div className="m-auto">{loaderData.message}</div>
    </div>
  );
}
