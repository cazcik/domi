import clsx from "clsx";
import { Link, useLocation } from "react-router";

export default function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const path = useLocation().pathname;
  const active = path === href || path.startsWith(href + "/");
  return (
    <Link
      to={href}
      className={clsx(
        active
          ? "border-r-2 border-neutral-900 bg-neutral-200 text-neutral-900"
          : "text-neutral-600 hover:bg-neutral-200 hover:text-neutral-900",
        "flex w-full items-center gap-x-2 rounded-l-lg px-5 py-1.5 text-sm",
      )}
    >
      {children}
    </Link>
  );
}
