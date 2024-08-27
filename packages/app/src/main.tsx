import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { PHProvider } from "./components/providers";
import PostHogPageView from "./components/pageview";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PHProvider>
      <div id="root-component"></div>
      <PostHogPageView />
    </PHProvider>
  </StrictMode>
);
