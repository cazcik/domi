# SSL Setup with Let's Encrypt

Two-stage setup to avoid certificate dependency issues.

## Stage 1: Initial Setup (HTTP Only)

1. **Configure your domain:**
   ```bash
   cp env.prod.example .env.prod
   # Edit .env.prod with your domain and email
   ```

2. **Create directories:**
   ```bash
   mkdir -p certbot/conf certbot/www
   ```

3. **Start with HTTP-only config:**
   ```bash
   # Temporarily use init config
   docker-compose -f compose.prod.yaml --env-file .env.prod up -d web api
   docker run -d --name temp-proxy \
     -p 80:80 \
     -v $(pwd)/nginx.init.conf:/etc/nginx/conf.d/default.conf \
     -v $(pwd)/certbot/www:/var/www/certbot \
     --network domi_app-network \
     nginx:alpine
   ```

4. **Get initial certificate:**
   ```bash
   docker-compose -f compose.prod.yaml run --rm certbot certonly \
     --webroot \
     --webroot-path=/var/www/certbot \
     --email admin@yourdomain.com \
     --agree-tos \
     --no-eff-email \
     -d yourdomain.com
   ```

## Stage 2: Production Setup (With SSL)

5. **Stop temporary proxy:**
   ```bash
   docker stop temp-proxy && docker rm temp-proxy
   ```

6. **Start full production stack:**
   ```bash
   docker-compose -f compose.prod.yaml --env-file .env.prod up -d
   ```

## Alternative: Single Command Setup

If you prefer, you can also use this approach:

1. **Start everything except proxy:**
   ```bash
   docker-compose -f compose.prod.yaml --env-file .env.prod up -d web api certbot
   ```

2. **Start proxy with init config:**
   ```bash
   docker run -d --name proxy \
     -p 80:80 -p 443:443 \
     -v $(pwd)/nginx.init.conf:/etc/nginx/conf.d/default.conf \
     -v $(pwd)/certbot/conf:/etc/letsencrypt \
     -v $(pwd)/certbot/www:/var/www/certbot \
     --network domi_app-network \
     nginx:alpine
   ```

3. **Get certificate:**
   ```bash
   docker-compose -f compose.prod.yaml run --rm certbot certonly \
     --webroot \
     --webroot-path=/var/www/certbot \
     --email admin@yourdomain.com \
     --agree-tos \
     --no-eff-email \
     -d yourdomain.com
   ```

4. **Switch to production config:**
   ```bash
   docker stop proxy && docker rm proxy
   docker-compose -f compose.prod.yaml --env-file .env.prod up -d
   ```

## Management Commands

```bash
# Check certificate status
docker-compose -f compose.prod.yaml exec certbot certbot certificates

# Manual renewal
docker-compose -f compose.prod.yaml exec certbot certbot renew

# View logs
docker-compose -f compose.prod.yaml logs certbot
```
