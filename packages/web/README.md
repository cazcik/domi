## development

run dev server:

```sh
pnpm run dev
```

run wrangler:

```sh
pnpm run build
pnpm run start
```

generate types for bindings in `wrangler.toml`:

```sh
pnpm run typegen
```

## deployment

build app for production:

```sh
pnpm run build
```

deploy app to cf pages:

```sh
pnpm run deploy
```
