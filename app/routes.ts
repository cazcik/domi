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
  ]),
] satisfies RouteConfig;
