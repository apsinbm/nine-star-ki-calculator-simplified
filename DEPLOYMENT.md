# Nine Star Ki Calculator - Deployment Guide

Complete guide for deploying the Nine Star Ki Calculator to production environments.

---

## Table of Contents

- [Prerequisites](#prerequisites)
- [Production Build](#production-build)
- [Environment Configuration](#environment-configuration)
- [Deployment Options](#deployment-options)
  - [Vercel (Recommended)](#vercel-recommended)
  - [Netlify](#netlify)
  - [Docker](#docker)
  - [Traditional Server](#traditional-server)
- [Performance Optimization](#performance-optimization)
- [Security Considerations](#security-considerations)
- [Monitoring & Analytics](#monitoring--analytics)
- [Post-Deployment Checklist](#post-deployment-checklist)
- [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before deploying, ensure you have:

### Required

- **Node.js** 18.0.0 or higher installed
- **npm** 9.0.0 or higher installed
- All tests passing (`npm test`)
- No linting errors (`npm run lint`)
- Clean production build (`npm run build`)
- Git repository initialized (for Git-based deployments)

### Recommended

- Domain name configured (optional)
- SSL/TLS certificate (automatic with Vercel/Netlify)
- Monitoring service account (Sentry, LogRocket, etc.)
- Analytics account (Google Analytics, Vercel Analytics, etc.)

---

## Production Build

### Building the Application

Follow these steps to create a production-ready build:

```bash
# 1. Install dependencies
npm install

# 2. Run type checking
npm run type-check

# 3. Run linting
npm run lint

# 4. Run tests to ensure everything works
npm test

# 5. Create optimized production build
npm run build
```

The build output will be in the `.next` directory.

### Build Output

```
.next/
├── cache/              # Build cache
├── server/             # Server-side code
├── static/             # Static assets with content hashes
└── standalone/         # Standalone build (if configured)
```

### Testing the Production Build Locally

Before deploying, test the production build on your local machine:

```bash
# Build and start production server on port 3333
npm run build
npm start
```

Access the application at `http://localhost:3333` and verify:

- ✅ All pages load correctly
- ✅ Calculator functions properly
- ✅ No console errors
- ✅ Responsive design works on mobile
- ✅ All links and navigation work

---

## Environment Configuration

### Environment Variables

The Nine Star Ki Calculator requires no mandatory environment variables for core functionality. However, you can configure optional settings for enhanced features:

#### Optional Variables

Create environment files for different environments:

**`.env.local`** (Local development - not committed):
```bash
# Development settings
NEXT_PUBLIC_APP_URL=http://localhost:3333
```

**`.env.production`** (Production - not committed):
```bash
# Application URL (for metadata and SEO)
NEXT_PUBLIC_APP_URL=https://your-domain.com

# Analytics (if using Google Analytics)
NEXT_PUBLIC_GA_TRACKING_ID=G-XXXXXXXXXX

# Feature flags (optional)
NEXT_PUBLIC_ENABLE_ADVANCED_FEATURES=false

# API endpoints (if adding API features in Phase 2)
# NEXT_PUBLIC_API_URL=https://api.your-domain.com
```

### Environment File Structure

```
.env.local          # Local development (not committed, in .gitignore)
.env.production     # Production settings (not committed, in .gitignore)
.env.example        # Template file (committed to git for reference)
```

**Important Security Note**: Never commit `.env.local` or `.env.production` to version control. These files are already included in `.gitignore`.

---

## Deployment Options

### Vercel (Recommended)

Vercel is the **recommended platform** as it's built by the Next.js team and offers seamless, zero-configuration deployment.

#### Why Vercel?

- ✅ Zero-configuration deployment for Next.js
- ✅ Automatic HTTPS with SSL certificates
- ✅ Global CDN with edge network
- ✅ Automatic preview deployments for pull requests
- ✅ Built-in analytics and monitoring
- ✅ Custom domains with automatic DNS configuration
- ✅ Instant rollbacks
- ✅ Environment variable management

#### Method 1: Deploy with Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel (opens browser)
vercel login

# Deploy to preview environment
vercel

# Deploy to production
vercel --prod
```

#### Method 2: Deploy via Git Integration (Recommended)

This method enables automatic deployments on every push:

**Step 1: Push to Git Repository**

```bash
# Initialize git (if not already done)
git init
git add .
git commit -m "Initial commit"

# Push to GitHub/GitLab/Bitbucket
git remote add origin https://github.com/yourusername/nine-star-ki.git
git push -u origin master
```

**Step 2: Connect to Vercel**

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New Project"
3. Import your Git repository
4. Configure project settings (auto-detected for Next.js):

   ```
   Framework Preset:     Next.js
   Root Directory:       ./
   Build Command:        npm run build
   Output Directory:     .next
   Install Command:      npm install
   Node.js Version:      18.x
   ```

5. Click "Deploy"

**Step 3: Configure Environment Variables (if needed)**

1. Go to Project Settings → Environment Variables
2. Add any required environment variables:
   - `NEXT_PUBLIC_APP_URL`
   - `NEXT_PUBLIC_GA_TRACKING_ID`
3. Redeploy for changes to take effect

**Step 4: Configure Custom Domain**

1. Go to Project Settings → Domains
2. Add your custom domain (e.g., `ninestarki.com`)
3. Follow DNS configuration instructions:
   - Add A record or CNAME record to your DNS provider
   - Vercel will automatically provision SSL certificate
4. Wait for DNS propagation (usually a few minutes)

#### Automatic Deployments

Once connected to Git:

- **Production**: Every push to `main`/`master` branch triggers production deployment
- **Preview**: Every pull request gets a unique preview URL
- **Instant Rollback**: Revert to any previous deployment with one click

#### Vercel Configuration File

Create `vercel.json` for advanced configuration (optional):

```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "regions": ["iad1"],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "SAMEORIGIN"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
```

---

### Netlify

Netlify is an excellent alternative to Vercel with similar features.

#### Why Netlify?

- ✅ Git-based deployment workflow
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ Preview deployments
- ✅ Form handling (useful for future contact forms)
- ✅ Split testing capabilities

#### Method 1: Deploy with Netlify CLI

```bash
# Install Netlify CLI globally
npm install -g netlify-cli

# Login to Netlify
netlify login

# Initialize Netlify site
netlify init

# Build the project
npm run build

# Deploy to production
netlify deploy --prod
```

#### Method 2: Deploy via Git Integration

**Step 1: Push to Git**

```bash
git push origin master
```

**Step 2: Connect to Netlify**

1. Go to [netlify.com](https://netlify.com) and sign in
2. Click "Add new site" → "Import an existing project"
3. Connect to your Git provider (GitHub/GitLab/Bitbucket)
4. Select your repository
5. Configure build settings:

   ```
   Base directory:       (leave empty)
   Build command:        npm run build
   Publish directory:    .next
   ```

6. Click "Deploy site"

**Step 3: Configure for Next.js**

Netlify requires the Next.js plugin for optimal performance.

Create `netlify.toml` in your project root:

```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"

[build.environment]
  NODE_VERSION = "18"

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "SAMEORIGIN"
    X-Content-Type-Options = "nosniff"
    X-XSS-Protection = "1; mode=block"
    Referrer-Policy = "strict-origin-when-cross-origin"
```

Install the plugin:

```bash
npm install -D @netlify/plugin-nextjs
```

**Step 4: Environment Variables**

1. Go to Site Settings → Environment variables
2. Add your environment variables
3. Redeploy for changes to take effect

**Step 5: Custom Domain**

1. Go to Domain Settings → Add custom domain
2. Follow DNS configuration instructions
3. Netlify will automatically provision SSL certificate

---

### Docker

Deploy using Docker for containerized environments, self-hosting, or cloud platforms like AWS, Google Cloud, or Azure.

#### Why Docker?

- ✅ Consistent environments (dev, staging, prod)
- ✅ Easy scaling with orchestration (Kubernetes, Docker Swarm)
- ✅ Portable across cloud providers
- ✅ Isolated dependencies
- ✅ Easy rollbacks with versioned images

#### Dockerfile

Create a `Dockerfile` in your project root:

```dockerfile
# Multi-stage build for optimal image size

# Stage 1: Dependencies
FROM node:18-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --only=production

# Stage 2: Builder
FROM node:18-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Set environment variables for build
ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV production

# Build the application
RUN npm run build

# Stage 3: Runner
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Create non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy necessary files
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Set correct permissions
RUN chown -R nextjs:nodejs /app

USER nextjs

EXPOSE 3333

ENV PORT 3333
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

#### Update next.config.js

Add output configuration for standalone build:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  // ... rest of your config
}

module.exports = nextConfig
```

#### .dockerignore

Create `.dockerignore` to exclude unnecessary files:

```
.git
.next
node_modules
npm-debug.log
README.md
.env*.local
.vscode
.idea
coverage
.DS_Store
```

#### Build and Run Docker Container

```bash
# Build Docker image
docker build -t nine-star-ki:latest .

# Run container locally (test)
docker run -p 3333:3333 nine-star-ki:latest

# Run with environment variables
docker run -p 3333:3333 \
  -e NEXT_PUBLIC_APP_URL=https://your-domain.com \
  nine-star-ki:latest

# Run in detached mode
docker run -d -p 3333:3333 --name nine-star-ki nine-star-ki:latest

# View logs
docker logs nine-star-ki

# Stop container
docker stop nine-star-ki
```

#### Docker Compose

Create `docker-compose.yml` for easier management:

```yaml
version: '3.8'

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "3333:3333"
    environment:
      - NODE_ENV=production
      - NEXT_PUBLIC_APP_URL=https://your-domain.com
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "wget", "--quiet", "--tries=1", "--spider", "http://localhost:3333"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
```

Run with Docker Compose:

```bash
# Build and start
docker-compose up -d

# View logs
docker-compose logs -f

# Stop
docker-compose down

# Rebuild and restart
docker-compose up -d --build
```

#### Deploy to Cloud Platforms

**AWS Elastic Container Service (ECS):**
```bash
# Build and tag
docker build -t nine-star-ki:latest .
docker tag nine-star-ki:latest your-registry/nine-star-ki:latest

# Push to ECR
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin your-registry
docker push your-registry/nine-star-ki:latest
```

**Google Cloud Run:**
```bash
# Build and deploy
gcloud builds submit --tag gcr.io/your-project/nine-star-ki
gcloud run deploy nine-star-ki --image gcr.io/your-project/nine-star-ki --platform managed
```

**Azure Container Instances:**
```bash
# Create container instance
az container create --resource-group myResourceGroup \
  --name nine-star-ki \
  --image your-registry/nine-star-ki:latest \
  --dns-name-label nine-star-ki \
  --ports 3333
```

---

### Traditional Server

Deploy to a VPS or dedicated server (DigitalOcean, Linode, AWS EC2, etc.).

#### Prerequisites

- Ubuntu 20.04+ or similar Linux distribution
- Root or sudo access
- Node.js 18+ installed
- Nginx installed (for reverse proxy)

#### Using PM2 (Process Manager)

PM2 is a production process manager for Node.js applications.

```bash
# Install PM2 globally on server
npm install -g pm2

# Navigate to project directory
cd /var/www/nine-star-ki

# Install dependencies
npm install

# Build the application
npm run build

# Start with PM2
pm2 start npm --name "nine-star-ki" -- start

# Or use ecosystem file (recommended)
pm2 start ecosystem.config.js

# Save PM2 configuration
pm2 save

# Setup PM2 to start on system boot
pm2 startup
# Follow the instructions provided

# Useful PM2 commands
pm2 status                # Check status
pm2 logs nine-star-ki     # View logs
pm2 restart nine-star-ki  # Restart app
pm2 stop nine-star-ki     # Stop app
pm2 delete nine-star-ki   # Remove from PM2
```

**ecosystem.config.js** (PM2 configuration):

```javascript
module.exports = {
  apps: [{
    name: 'nine-star-ki',
    script: 'npm',
    args: 'start',
    cwd: '/var/www/nine-star-ki',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3333
    }
  }]
}
```

#### Using systemd (Linux)

For native Linux service management:

Create `/etc/systemd/system/nine-star-ki.service`:

```ini
[Unit]
Description=Nine Star Ki Calculator
Documentation=https://github.com/yourusername/nine-star-ki
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/var/www/nine-star-ki
ExecStart=/usr/bin/npm start
Restart=on-failure
RestartSec=10
StandardOutput=syslog
StandardError=syslog
SyslogIdentifier=nine-star-ki

Environment=NODE_ENV=production
Environment=PORT=3333
Environment=NEXT_PUBLIC_APP_URL=https://your-domain.com

[Install]
WantedBy=multi-user.target
```

Enable and manage the service:

```bash
# Reload systemd
sudo systemctl daemon-reload

# Enable service to start on boot
sudo systemctl enable nine-star-ki

# Start service
sudo systemctl start nine-star-ki

# Check status
sudo systemctl status nine-star-ki

# View logs
sudo journalctl -u nine-star-ki -f

# Restart service
sudo systemctl restart nine-star-ki

# Stop service
sudo systemctl stop nine-star-ki
```

#### Nginx Reverse Proxy

Configure Nginx as reverse proxy for SSL/TLS and load balancing:

Create `/etc/nginx/sites-available/nine-star-ki`:

```nginx
# Upstream configuration
upstream nine_star_ki {
    server localhost:3333;
}

# HTTP redirect to HTTPS
server {
    listen 80;
    listen [::]:80;
    server_name your-domain.com www.your-domain.com;

    return 301 https://$server_name$request_uri;
}

# HTTPS server
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name your-domain.com www.your-domain.com;

    # SSL certificates (Let's Encrypt)
    ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;
    ssl_trusted_certificate /etc/letsencrypt/live/your-domain.com/chain.pem;

    # SSL configuration
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;

    # Security headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # Logging
    access_log /var/log/nginx/nine-star-ki-access.log;
    error_log /var/log/nginx/nine-star-ki-error.log;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/json application/javascript;

    # Proxy configuration
    location / {
        proxy_pass http://nine_star_ki;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 90;
    }

    # Cache static assets
    location /_next/static {
        proxy_pass http://nine_star_ki;
        proxy_cache_valid 200 60m;
        add_header Cache-Control "public, immutable";
    }
}
```

Enable the site:

```bash
# Create symbolic link
sudo ln -s /etc/nginx/sites-available/nine-star-ki /etc/nginx/sites-enabled/

# Test configuration
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

#### SSL with Let's Encrypt

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Obtain certificate
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# Test automatic renewal
sudo certbot renew --dry-run

# Certbot will automatically renew certificates
```

---

## Performance Optimization

### Next.js Built-in Optimizations

The application already benefits from:

- ✅ **Automatic Code Splitting**: Only load necessary JavaScript
- ✅ **Server Components**: Reduce client-side JavaScript
- ✅ **Static Generation**: Pre-rendered pages for optimal performance
- ✅ **CSS Optimization**: Automatic CSS minification
- ✅ **Font Optimization**: Optimized font loading with `next/font`
- ✅ **Tree Shaking**: Eliminate unused code

### Additional Optimizations

#### 1. Enable Compression

Ensure gzip/brotli compression is enabled.

**Vercel/Netlify**: Compression is automatic.

**Nginx**: Already included in the configuration above.

**Express/Node**: Add compression middleware:

```bash
npm install compression
```

```javascript
const compression = require('compression')
app.use(compression())
```

#### 2. CDN Configuration

- Use CDN for static assets (automatic with Vercel/Netlify)
- Configure appropriate cache headers
- Enable edge caching

#### 3. Image Optimization

If you add images in the future:

```jsx
import Image from 'next/image'

<Image
  src="/path/to/image.jpg"
  alt="Description"
  width={800}
  height={600}
  placeholder="blur"
/>
```

#### 4. Bundle Analysis

Analyze bundle size:

```bash
# Install bundle analyzer
npm install -D @next/bundle-analyzer

# Add to next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
  // ... your config
})

# Run analysis
ANALYZE=true npm run build
```

### Performance Monitoring

Monitor these key Web Vitals:

- **Time to First Byte (TTFB)**: < 600ms
- **First Contentful Paint (FCP)**: < 1.8s
- **Largest Contentful Paint (LCP)**: < 2.5s
- **Cumulative Layout Shift (CLS)**: < 0.1
- **First Input Delay (FID)**: < 100ms
- **Interaction to Next Paint (INP)**: < 200ms

### Performance Testing Tools

- [Lighthouse](https://developers.google.com/web/tools/lighthouse) - Chrome DevTools
- [WebPageTest](https://www.webpagetest.org/) - Detailed performance analysis
- [GTmetrix](https://gtmetrix.com/) - Performance reports
- [PageSpeed Insights](https://pagespeed.web.dev/) - Google's tool

---

## Security Considerations

### Security Headers

Configure security headers in `next.config.js`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          }
        ]
      }
    ]
  }
}

module.exports = nextConfig
```

### HTTPS

Always use HTTPS in production:

- **Vercel/Netlify**: Automatic HTTPS with Let's Encrypt
- **Docker/Traditional**: Use Let's Encrypt certificates (shown above)

### Dependency Security

Regularly audit and update dependencies:

```bash
# Check for vulnerabilities
npm audit

# Fix vulnerabilities automatically
npm audit fix

# Check for outdated packages
npm outdated

# Update dependencies
npm update

# Update to latest versions (careful!)
npx npm-check-updates -u
npm install
```

### Content Security Policy (CSP)

For maximum security, add CSP headers:

```javascript
{
  key: 'Content-Security-Policy',
  value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self';"
}
```

**Note**: Adjust CSP based on your needs (analytics, fonts, etc.)

---

## Monitoring & Analytics

### Error Tracking

Integrate error tracking services:

#### Sentry

```bash
npm install @sentry/nextjs
```

```javascript
// sentry.client.config.js
import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0,
})
```

#### LogRocket

```bash
npm install logrocket
```

#### Bugsnag

```bash
npm install @bugsnag/js @bugsnag/plugin-react
```

### Analytics

#### Google Analytics 4

```javascript
// lib/gtag.js
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID

export const pageview = (url) => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  })
}
```

Add to `app/layout.tsx`:

```jsx
<Script
  src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
  strategy="afterInteractive"
/>
<Script id="google-analytics" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${GA_TRACKING_ID}');
  `}
</Script>
```

#### Vercel Analytics

```bash
npm install @vercel/analytics
```

```jsx
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

### Uptime Monitoring

Set up uptime monitoring with:

- [UptimeRobot](https://uptimerobot.com/) - Free tier available
- [Pingdom](https://www.pingdom.com/) - Comprehensive monitoring
- [StatusCake](https://www.statuscake.com/) - Uptime and performance
- [Better Uptime](https://betteruptime.com/) - Modern monitoring

---

## Post-Deployment Checklist

### Pre-Launch

- [ ] All tests pass (`npm test`)
- [ ] No linting errors (`npm run lint`)
- [ ] Type checking passes (`npm run type-check`)
- [ ] Production build succeeds (`npm run build`)
- [ ] Local production server works (`npm start`)
- [ ] Cross-browser testing completed (Chrome, Firefox, Safari, Edge)
- [ ] Mobile responsiveness verified on real devices
- [ ] Accessibility testing completed (screen readers, keyboard navigation)
- [ ] Performance testing completed (Lighthouse score > 90)
- [ ] Security headers configured

### Deployment

- [ ] Environment variables configured correctly
- [ ] Custom domain configured (if applicable)
- [ ] SSL/HTTPS enabled and working
- [ ] DNS records properly configured
- [ ] CDN configured (if applicable)
- [ ] Backup strategy in place

### Post-Launch

- [ ] Verify site loads correctly at production URL
- [ ] Test calculator functionality thoroughly
- [ ] Check all pages and routes work
- [ ] Verify responsive design on real mobile devices
- [ ] Test on multiple browsers
- [ ] Verify analytics are collecting data
- [ ] Set up monitoring and alerts
- [ ] Configure error tracking
- [ ] Test recovery procedures
- [ ] Document deployment process for team
- [ ] Create runbook for common issues

### Ongoing Maintenance

- [ ] Monitor performance metrics weekly
- [ ] Review error logs regularly
- [ ] Update dependencies monthly (`npm update`)
- [ ] Run security audits quarterly (`npm audit`)
- [ ] Review and optimize based on analytics monthly
- [ ] Backup configuration and data regularly
- [ ] Test disaster recovery procedures quarterly

---

## Troubleshooting

### Common Issues

#### Build Failures

```bash
# Clear Next.js cache
rm -rf .next

# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Rebuild
npm run build
```

#### Memory Issues During Build

Increase Node.js memory limit:

```bash
# Temporary (current terminal session)
NODE_OPTIONS='--max-old-space-size=4096' npm run build

# Permanent (add to package.json)
{
  "scripts": {
    "build": "NODE_OPTIONS='--max-old-space-size=4096' next build"
  }
}
```

#### Port Already in Use

```bash
# Find process using port 3333
lsof -i :3333

# Kill the process
kill -9 <PID>

# Or change port
PORT=3334 npm start
```

#### Deployment Fails on Vercel/Netlify

1. Check build logs in dashboard
2. Verify Node.js version matches local (18.x)
3. Ensure all dependencies are in `package.json`
4. Check environment variables are set correctly
5. Try manual deployment with CLI

#### Application Won't Start

```bash
# Check Node.js version
node --version  # Should be 18+

# Verify build completed
ls -la .next/

# Check for errors
npm start 2>&1 | tee start.log

# Check system logs (systemd)
sudo journalctl -u nine-star-ki -n 50

# Check PM2 logs
pm2 logs nine-star-ki
```

#### Performance Issues

1. **Enable caching**: Configure cache headers in Nginx/CDN
2. **Optimize images**: Use Next.js Image component
3. **Minimize JavaScript**: Analyze bundle with webpack-bundle-analyzer
4. **Use CDN**: Distribute static assets globally
5. **Enable compression**: Ensure gzip/brotli is enabled
6. **Database optimization**: Add indexes (Phase 2, if applicable)

#### SSL Certificate Issues

```bash
# Renew Let's Encrypt certificate
sudo certbot renew

# Force renewal
sudo certbot renew --force-renewal

# Check certificate expiration
sudo certbot certificates

# Test SSL configuration
openssl s_client -connect your-domain.com:443
```

### Getting Help

- **Next.js Documentation**: https://nextjs.org/docs
- **Project Documentation**: Check `/docs` directory
- **Vercel Support**: https://vercel.com/support
- **Netlify Support**: https://docs.netlify.com
- **Stack Overflow**: Tag questions with `next.js`, `react`, `typescript`

---

## Rollback Procedure

### Vercel/Netlify

1. Go to deployments dashboard
2. Find previous working deployment
3. Click "Promote to Production" or "Publish deploy"
4. Verify rollback successful

### Docker

```bash
# List images with tags
docker images nine-star-ki

# Stop current container
docker stop nine-star-ki
docker rm nine-star-ki

# Start previous version
docker run -d -p 3333:3333 --name nine-star-ki nine-star-ki:previous-tag

# Or use Docker Compose
docker-compose down
# Edit docker-compose.yml to use previous tag
docker-compose up -d
```

### Traditional Server (PM2)

```bash
# Stop current application
pm2 stop nine-star-ki

# Switch to backup directory
cd /var/www/nine-star-ki-backup

# Install dependencies
npm install

# Build
npm run build

# Update PM2
pm2 delete nine-star-ki
pm2 start npm --name "nine-star-ki" -- start
pm2 save
```

### Git-Based Rollback

```bash
# Revert to previous commit
git revert HEAD
git push

# Or reset to specific commit
git reset --hard <commit-hash>
git push --force

# Trigger re-deployment on Vercel/Netlify
```

---

## Additional Resources

### Official Documentation

- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com/)
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)
- [Nginx Documentation](https://nginx.org/en/docs/)

### Performance & Optimization

- [Web.dev Performance Guide](https://web.dev/performance/)
- [Next.js Performance](https://nextjs.org/docs/advanced-features/measuring-performance)
- [Core Web Vitals](https://web.dev/vitals/)

### Security

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Next.js Security](https://nextjs.org/docs/advanced-features/security-headers)
- [Let's Encrypt](https://letsencrypt.org/)

---

## Support

For deployment issues or questions:

1. Check this deployment guide
2. Review [docs/architecture.md](./docs/architecture.md)
3. Check project documentation in root directory
4. Contact development team

---

**Version**: 1.0.0
**Last Updated**: October 31, 2025
**Status**: Production Ready

*This deployment guide is maintained as part of the Nine Star Ki Calculator project documentation.*
