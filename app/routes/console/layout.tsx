import {
  RiBugLine,
  RiCrosshairLine,
  RiGraduationCapLine,
  RiGroupLine,
  RiHome2Line,
  RiScanLine,
  RiSettings4Line,
} from "@remixicon/react";
import { Link, Outlet, useLocation } from "react-router";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";

import NavLink from "./components/nav-link";
import { currentUser } from "../../../data.json";

export default function ConsoleLayout({
  params,
}: {
  params: { workspaceSlug: string };
}) {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <div className="flex min-h-dvh flex-col">
      <header className="sticky top-0 z-2 border-b border-neutral-200 bg-neutral-50 px-7 py-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-neutral-900">d</span>
            <span className="text-2xl font-bold text-neutral-900">:</span>
            {pathnames.map((path) => (
              <Link
                key={path}
                to={
                  path === params.workspaceSlug
                    ? `/${params.workspaceSlug}`
                    : `/${params.workspaceSlug}/${path}`
                }
                className="group rounded-lg text-2xl font-bold text-neutral-900"
              >
                <span className="group-hover:underline">{path}</span>
                <span className="group-hover:no-underline">:</span>
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-x-5 sm:gap-x-6 md:gap-x-7">
            <div className="hidden items-center gap-x-3 sm:gap-x-4 md:flex md:gap-x-5">
              <Link
                to="#"
                className="text-sm text-neutral-500 hover:text-neutral-900 md:text-xs lg:text-sm"
              >
                Help
              </Link>
              <Link
                to="#"
                className="text-sm text-neutral-500 hover:text-neutral-900 md:text-xs lg:text-sm"
              >
                Docs
              </Link>
            </div>
            <Popover className="relative">
              <PopoverButton
                as="button"
                className="inline-flex size-8 items-center justify-center rounded-full bg-neutral-500"
              >
                <span className="text-sm font-medium text-white">
                  {currentUser && currentUser.name
                    ? currentUser.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                    : "??"}
                </span>
              </PopoverButton>
              <PopoverPanel className="absolute right-0 mt-1 flex">
                <div className="w-48 divide-y divide-neutral-200 rounded-lg border border-neutral-200 bg-white shadow-lg">
                  <div className="flex flex-col rounded-t-lg px-3 py-2.5">
                    <span className="text-sm font-medium text-black">
                      {currentUser.name}
                    </span>
                    <span className="text-sm text-neutral-500">
                      {currentUser.email}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <Link
                      to="#"
                      className="px-3 py-2.5 text-sm text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900"
                    >
                      Profile
                    </Link>
                    <Link
                      to="#"
                      className="px-3 py-2.5 text-sm text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900"
                    >
                      Settings
                    </Link>
                    <Link
                      to="#"
                      className="px-3 py-2.5 text-sm text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900"
                    >
                      Workspaces
                    </Link>
                  </div>
                  <div className="flex flex-col">
                    <Link
                      to="#"
                      className="px-3 py-2.5 text-sm text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900"
                    >
                      Create workspace
                    </Link>
                  </div>
                  <div className="flex flex-col">
                    <Link
                      to="#"
                      className="rounded-b-lg px-3 py-2.5 text-sm text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900"
                    >
                      Sign out
                    </Link>
                  </div>
                </div>
              </PopoverPanel>
            </Popover>
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
                <RiCrosshairLine className="size-4" />
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
            <NavLink href={`/${params.workspaceSlug}/team`}>
              <div>
                <RiGroupLine className="size-4" />
              </div>
              <span>Team</span>
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
        <main className="w-full min-w-0 pb-32">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
