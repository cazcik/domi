import { Link, Outlet } from "react-router";

export default function ConsoleLayout({
  params,
}: {
  params: { workspaceSlug: string };
}) {
  return (
    <div className="flex min-h-dvh flex-col">
      <header className="px-7 py-5 lg:py-7">
        <div>
          <Link
            to={`/${params.workspaceSlug}`}
            className="text-2xl font-bold text-slate-900 lg:text-3xl dark:text-slate-100"
          >
            domi.
          </Link>
        </div>
      </header>
      <main className="flex w-full grow">
        <Outlet />
      </main>
      <footer className="px-7 py-5 lg:py-7">
        <p className="text-[11px] text-slate-500 uppercase lg:text-xs">
          &copy; 2025 Domi LLC
        </p>
      </footer>
    </div>
  );
}
