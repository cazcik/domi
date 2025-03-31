import { redirect } from "react-router";
import type { Route } from "./+types/home";

export function loader({ params }: Route.LoaderArgs) {
  return redirect(`/${params.workspaceSlug}/home`);
}

export function meta({}: Route.MetaArgs) {
  return [{ title: "Home - Domi" }];
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return;
}
