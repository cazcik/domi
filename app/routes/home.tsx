import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [{ title: "domi" }];
}

export default function Home() {
  return (
    <div className="flex min-h-dvh">
      <div className="m-auto px-5">
        <h1>domi</h1>
      </div>
    </div>
  );
}
