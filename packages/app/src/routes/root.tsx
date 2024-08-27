import { Outlet } from "react-router-dom";

import PostHogPageView from "../components/pageview";

export default function Root() {
  return (
    <div id="root-layout">
      <Outlet />
      <PostHogPageView />
    </div>
  );
}
