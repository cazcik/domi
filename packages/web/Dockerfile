FROM oven/bun:1-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN bun install

COPY . .
RUN bun run build

FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

RUN chmod -R 644 /usr/share/nginx/html/* && \
    find /usr/share/nginx/html -type d -exec chmod 755 {} \;

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]
