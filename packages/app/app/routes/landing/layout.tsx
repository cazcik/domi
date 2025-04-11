import { Outlet } from "react-router";

export default function Layout() {
  return (
    <div className="flex min-h-dvh">
      <div className="m-auto">
        <Outlet />
      </div>
    </div>
  );
}
