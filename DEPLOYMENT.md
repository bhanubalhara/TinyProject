# Deployment Guide

## Quick Deploy to Vercel

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Add environment variables:
     - `DATABASE_URL`: Your Neon PostgreSQL connection string
     - `NEXT_PUBLIC_BASE_URL`: (Optional) Your Vercel deployment URL
   - Click "Deploy"

3. **Set up Neon Database**
   - Go to [neon.tech](https://neon.tech)
   - Create a free account
   - Create a new project
   - Copy the connection string
   - Add it to Vercel environment variables as `DATABASE_URL`

## Database Setup

The database will be automatically initialized on the first API call. The schema includes:

- `links` table with columns:
  - `id` (SERIAL PRIMARY KEY)
  - `code` (VARCHAR(8) UNIQUE)
  - `url` (TEXT)
  - `clicks` (INTEGER, default 0)
  - `last_clicked` (TIMESTAMP)
  - `created_at` (TIMESTAMP)

## Environment Variables

Required:
- `DATABASE_URL`: PostgreSQL connection string from Neon

Optional:
- `NEXT_PUBLIC_BASE_URL`: Base URL for your app (defaults to Vercel URL)

## Testing After Deployment

1. Visit `/healthz` - should return `{"ok": true, "version": "1.0"}`
2. Create a link via the dashboard
3. Test redirect by visiting `/{code}`
4. Check stats at `/code/{code}`
5. Delete a link and verify it returns 404

## Alternative Hosting Options

### Render
1. Create a new Web Service
2. Connect GitHub repository
3. Build command: `npm install && npm run build`
4. Start command: `npm start`
5. Add environment variables

### Railway
1. Create a new project
2. Add PostgreSQL service
3. Connect GitHub repository
4. Add environment variables
5. Deploy

