import { Hono } from 'hono'

const app = new Hono().basePath('/api')

app.get('/', (c) => {
  return c.text('api')
})

app.notFound((c) => {
  return c.text("route not found", 404)
})

app.onError((err, c) => {
  console.error(err)
  return c.text("internal server error", 500)
})

export default {
  port: 8000,
  fetch: app.fetch,
}
