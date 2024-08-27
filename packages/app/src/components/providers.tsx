import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";

export function PHProvider({ children }: { children?: React.ReactNode }) {
  if (import.meta.env.MODE === "production") {
    if (typeof window !== "undefined") {
      posthog.init("phc_1Ogcp16thrs0Rff8hcueMLAjSF3paFAbrX0cAmotrsu", {
        api_host: "https://circles.usedomi.com",
        person_profiles: "identified_only",
      });
    }

    return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
  } else {
    return <>{children}</>;
  }
}
