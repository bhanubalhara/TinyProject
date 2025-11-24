# Quick Deployment Guide

## Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `url-shortener` (or any name you prefer)
3. **Important**: Do NOT check "Initialize this repository with a README"
4. Click "Create repository"

## Step 2: Push to GitHub

After creating the repo, GitHub will show you commands. Use these:

```bash
# Add the remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/url-shortener.git

# Push to GitHub
git push -u origin main
```

Or if you prefer SSH:
```bash
git remote add origin git@github.com:YOUR_USERNAME/url-shortener.git
git push -u origin main
```

## Step 3: Set Up Neon Database

1. Go to https://neon.tech
2. Sign up for a free account
3. Create a new project
4. Copy the connection string (it looks like: `postgresql://user:password@host/database?sslmode=require`)

## Step 4: Deploy to Vercel

1. Go to https://vercel.com
2. Sign in with your GitHub account
3. Click "Add New..." → "Project"
4. Import your `url-shortener` repository
5. **Add Environment Variables:**
   - `DATABASE_URL`: Paste your Neon connection string
   - `NEXT_PUBLIC_BASE_URL`: (Optional) Leave empty, Vercel will auto-detect
6. Click "Deploy"

## Step 5: Test Your Deployment

After deployment completes:
1. Visit `https://your-app.vercel.app/healthz` - should return `{"ok": true, "version": "1.0"}`
2. Visit `https://your-app.vercel.app` - should show the dashboard
3. Create a test link
4. Test the redirect

## Alternative: Use the Deployment Script

You can also run:
```bash
./DEPLOY.sh
```

This script will guide you through the process interactively.

