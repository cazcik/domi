import { type RouteConfig, index, layout } from "@react-router/dev/routes";

export default [
  layout("routes/marketing/layout.tsx", [index("routes/marketing/home.tsx")]),
] satisfies RouteConfig;
