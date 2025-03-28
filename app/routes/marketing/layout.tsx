import { Link, Outlet } from "react-router";

export default function MarketingLayout() {
  return (
    <div className="flex min-h-dvh flex-col">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-7 py-5 lg:py-7">
        <div className="flex items-center gap-x-10">
          <Link
            to="/"
            className="text-2xl font-bold text-black lg:text-3xl dark:text-white"
          >
            d.
          </Link>
          <nav className="hidden items-center gap-x-8 md:flex">
            <Link
              to="#"
              className="text-slate-500 hover:text-slate-900 md:text-xs lg:text-sm dark:hover:text-slate-100"
            >
              Product
            </Link>
            <Link
              to="#"
              className="text-slate-500 hover:text-slate-900 md:text-xs lg:text-sm dark:hover:text-slate-100"
            >
              Solutions
            </Link>
            <Link
              to="#"
              className="text-slate-500 hover:text-slate-900 md:text-xs lg:text-sm dark:hover:text-slate-100"
            >
              Pricing
            </Link>
            <Link
              to="#"
              className="text-slate-500 hover:text-slate-900 md:text-xs lg:text-sm dark:hover:text-slate-100"
            >
              Resources
            </Link>
            <Link
              to="#"
              className="text-slate-500 hover:text-slate-900 md:text-xs lg:text-sm dark:hover:text-slate-100"
            >
              Company
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-x-7">
          <Link
            to="#"
            className="text-sm text-slate-500 hover:text-slate-900 md:text-xs lg:text-sm dark:hover:text-slate-100"
          >
            Sign in
          </Link>
          <Link
            to="#"
            className="text-sm text-slate-500 hover:text-slate-900 md:text-xs lg:text-sm dark:hover:text-slate-100"
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
            <p className="text-[11px] text-slate-500 uppercase lg:text-xs">
              &copy; 2025 Domi LLC
            </p>
          </div>
          <div className="hidden items-center gap-x-4 md:flex">
            <div className="flex items-center gap-x-4">
              <Link
                to="#"
                className="text-[11px] text-slate-500 hover:text-slate-900 lg:text-xs dark:hover:text-slate-100"
              >
                Product
              </Link>
              <Link
                to="#"
                className="text-[11px] text-slate-500 hover:text-slate-900 lg:text-xs dark:hover:text-slate-100"
              >
                Solutions
              </Link>
              <Link
                to="#"
                className="text-[11px] text-slate-500 hover:text-slate-900 lg:text-xs dark:hover:text-slate-100"
              >
                Pricing
              </Link>
              <Link
                to="#"
                className="text-[11px] text-slate-500 hover:text-slate-900 lg:text-xs dark:hover:text-slate-100"
              >
                Resources
              </Link>
              <Link
                to="#"
                className="text-[11px] text-slate-500 hover:text-slate-900 lg:text-xs dark:hover:text-slate-100"
              >
                Company
              </Link>
            </div>
            <span className="text-[11px] text-slate-500 lg:text-xs">|</span>
            <div className="flex items-center gap-x-4">
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
              <Link
                to="#"
                className="text-[11px] text-slate-500 hover:text-slate-900 lg:text-xs dark:hover:text-slate-100"
              >
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
