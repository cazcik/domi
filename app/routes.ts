import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("routes/marketing/layout.tsx", [index("routes/marketing/index.tsx")]),
  layout("routes/auth/layout.tsx", [
    route("sign-in", "routes/auth/sign-in.tsx"),
    route("sign-up", "routes/auth/sign-up.tsx"),
  ]),
  layout("routes/console/layout.tsx", [
    route(":workspaceSlug", "routes/console/home.tsx"),
    route(":workspaceSlug/applications", "routes/console/applications.tsx"),
    route(":workspaceSlug/scans", "routes/console/scans.tsx"),
    route(":workspaceSlug/findings", "routes/console/findings.tsx"),
    route(":workspaceSlug/training", "routes/console/training.tsx"),
    route(":workspaceSlug/settings", "routes/console/settings.tsx"),
  ]),
] satisfies RouteConfig;
