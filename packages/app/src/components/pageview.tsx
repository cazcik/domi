import posthog from "posthog-js";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function PostHogPageView() {
  let location = useLocation();

  useEffect(() => {
    if (posthog) {
      posthog.capture("$pageview", {
        $current_url: window.location.href,
      });
    }
  }, [location]);

  return null;
}
