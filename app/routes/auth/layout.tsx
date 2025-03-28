import { Link, Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <div className="flex min-h-dvh flex-col">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-7 py-5 lg:py-7">
        <div className="flex items-center gap-x-10"></div>
        <div className="flex items-center gap-x-7"></div>
      </header>
      <main className="flex w-full grow">
        <Outlet />
      </main>
      <footer className="px-7 py-5 lg:py-7">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div>
            <p className="text-[11px] text-slate-500 uppercase lg:text-xs">
              &copy; 2025 Domi LLC
            </p>
          </div>
          <div className="flex items-center gap-x-3 sm:gap-x-4">
            <Link
              to="#"
              className="text-[11px] text-slate-500 hover:text-slate-900 lg:text-xs dark:hover:text-slate-100"
            >
              Privacy
            </Link>
            <Link
              to="#"
              className="text-[11px] text-slate-500 hover:text-slate-900 lg:text-xs dark:hover:text-slate-100"
            >
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
