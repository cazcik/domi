import { Link, Outlet } from "react-router";

export default function MarketingLayout() {
  return (
    <div className="flex min-h-dvh flex-col">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-7 py-5 lg:py-7">
        <div className="flex items-center gap-x-10">
          <Link
            to="/"
            className="text-2xl font-bold text-neutral-900 lg:text-3xl"
          >
            domi.
          </Link>
          <nav className="hidden items-center gap-x-8 md:flex">
            {/* <Link
              to="#"
              className="text-neutral-500 hover:text-neutral-900 md:text-xs lg:text-sm"
            >
              Product
            </Link> */}
          </nav>
        </div>
        <div className="flex items-center gap-x-5 sm:gap-x-6 md:gap-x-7">
          <Link
            to="/sign-in"
            className="text-sm text-neutral-500 hover:text-neutral-900 md:text-xs lg:text-sm"
          >
            Sign in
          </Link>
          <Link
            to="/sign-up"
            className="text-sm text-neutral-500 hover:text-neutral-900 md:text-xs lg:text-sm"
          >
            Sign up
          </Link>
        </div>
      </header>
      <main className="flex w-full grow">
        <Outlet />
      </main>
      <footer className="px-7 py-5 lg:py-7">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div>
            <p className="text-[11px] text-neutral-500 uppercase lg:text-xs">
              &copy; 2025 Domi LLC
            </p>
          </div>
          <div className="flex items-center gap-x-4">
            {/* <div className="flex items-center gap-x-4">
              <Link
                to="#"
                className="text-[11px] text-neutral-500 hover:text-neutral-900 lg:text-xs"
              >
                Product
              </Link>
            </div>
            <span className="text-[11px] text-neutral-500 lg:text-xs">|</span> */}
            <div className="flex items-center gap-x-5 sm:gap-x-6 md:gap-x-7">
              <Link
                to="#"
                className="text-[11px] text-neutral-500 hover:text-neutral-900 lg:text-xs"
              >
                Privacy
              </Link>
              <Link
                to="#"
                className="text-[11px] text-neutral-500 hover:text-neutral-900 lg:text-xs"
              >
                Terms
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
