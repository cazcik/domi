import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { HTTPException } from "hono/http-exception";
import { trimTrailingSlash } from "hono/trailing-slash";

const app = new Hono();

app.use(cors());
app.use(trimTrailingSlash());
app.use(logger());

app.get("/", (c) => {
  return c.text(c.req.path, 200);
});

app.notFound((c) => {
  return c.text(`route not found: ${c.req.path}`, 404);
});

app.onError((e, c) => {
  if (e instanceof HTTPException) {
    return c.text(e.message.toLowerCase(), e.status);
  } else {
    console.error(e);
    return c.text("internal server error", 500);
  }
});

export default app;
