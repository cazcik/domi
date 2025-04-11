import { Outlet } from "react-router";

export default function Layout() {
  return (
    <div className="flex min-h-dvh flex-col">
      <div className="m-auto">
        <Outlet />
      </div>
      <footer className="flex items-center justify-center py-3">
        <p className="text-xs text-neutral-400 uppercase dark:text-neutral-600">
          &copy; {new Date().getFullYear()} DOMI LLC
        </p>
      </footer>
    </div>
  );
}
