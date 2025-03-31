import {
  RiBugLine,
  RiCodeLine,
  RiGraduationCapLine,
  RiHome2Line,
  RiScanLine,
  RiSettings4Line,
  RiTerminalWindowLine,
} from "@remixicon/react";
import { Link, Outlet } from "react-router";
import NavLink from "./components/nav-link";

export default function ConsoleLayout({
  params,
}: {
  params: { workspaceSlug: string };
}) {
  return (
    <div className="flex min-h-dvh flex-col">
      <header className="sticky top-0 z-2 border-b border-neutral-200 bg-neutral-50 px-7 py-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-neutral-900">d</span>
            <span className="text-2xl font-bold text-neutral-900">:</span>
            <Link
              to={`/${params.workspaceSlug}`}
              className="rounded-lg text-2xl font-bold text-neutral-900 hover:underline"
            >
              {params.workspaceSlug}
            </Link>
            <span className="text-2xl font-bold text-neutral-900">:</span>
          </div>
          <div>
            <span className="inline-flex size-8 items-center justify-center rounded-full bg-neutral-500">
              <span className="text-sm font-medium text-white">ZW</span>
            </span>
          </div>
        </div>
      </header>
      <div className="z-1 flex flex-1 bg-neutral-50">
        <aside className="sticky inset-0 -mt-[65px] hidden h-screen w-full shrink-0 flex-col justify-between border-r border-neutral-200 pt-[65px] md:flex md:max-w-48 lg:max-w-60">
          <nav className="mt-7 ml-5 flex flex-col gap-y-1 lg:ml-7">
            <NavLink href={`/${params.workspaceSlug}/home`}>
              <div>
                <RiHome2Line className="size-4" />
              </div>
              <span>Home</span>
            </NavLink>
            <NavLink href={`/${params.workspaceSlug}/targets`}>
              <div>
                <RiCodeLine className="size-4" />
              </div>
              <span>Targets</span>
            </NavLink>
            <NavLink href={`/${params.workspaceSlug}/scans`}>
              <div>
                <RiScanLine className="size-4" />
              </div>
              <span>Scans</span>
            </NavLink>
            <NavLink href={`/${params.workspaceSlug}/findings`}>
              <div>
                <RiBugLine className="size-4" />
              </div>
              <span>Findings</span>
            </NavLink>
            <NavLink href={`/${params.workspaceSlug}/training`}>
              <div>
                <RiGraduationCapLine className="size-4" />
              </div>
              <span>Training</span>
            </NavLink>
            <NavLink href={`/${params.workspaceSlug}/settings`}>
              <div>
                <RiSettings4Line className="size-4" />
              </div>
              <span>Settings</span>
            </NavLink>
          </nav>
          <footer className="border-t border-neutral-200 px-3 py-3">
            <div></div>
            <div>
              <p className="text-[11px] text-neutral-500 uppercase lg:text-xs">
                &copy; 2025 Domi LLC
              </p>
            </div>
          </footer>
        </aside>
        <main className="w-full min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
