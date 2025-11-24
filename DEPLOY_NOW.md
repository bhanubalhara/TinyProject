# Deploy to Vercel - Quick Guide

## Option 1: Deploy via CLI (Interactive)

Run this command and follow the prompts:

```bash
npx vercel
```

**During the prompts:**
1. **Set up and deploy?** → Yes
2. **Which scope?** → Select your account
3. **Link to existing project?** → No (first time) or Yes (if redeploying)
4. **Project name?** → `tiny-project` or press Enter for default
5. **Directory?** → `./` (press Enter)
6. **Override settings?** → No (press Enter)

**After deployment:**
- Vercel will give you a URL like: `https://tiny-project-xxx.vercel.app`
- You'll need to add environment variables in the Vercel dashboard

## Option 2: Deploy via Web Interface (Recommended for First Time)

1. **Go to**: https://vercel.com
2. **Sign in** with GitHub
3. **Click**: "Add New..." → "Project"
4. **Import**: `bhanubalhara/TinyProject`
5. **Configure**:
   - Framework: Next.js (auto-detected)
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `.next`
6. **Environment Variables** (IMPORTANT - Add before deploying):
   - Click "Environment Variables"
   - Add:
     - **Name**: `DATABASE_URL`
     - **Value**: `postgresql://neondb_owner:npg_sKGp59MIWPkm@ep-empty-leaf-ahet26pl-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require`
     - **Environments**: Select all (Production, Preview, Development)
   - Click "Add"
7. **Click**: "Deploy"

## After Deployment

1. **Wait for build to complete** (usually 1-2 minutes)
2. **Visit your app**: `https://your-project-name.vercel.app`
3. **Test endpoints**:
   - `/healthz` → Should return `{"ok": true, "version": "1.0"}`
   - `/` → Should show dashboard
   - Create a test link
   - Test redirect

## Adding Environment Variables After Deployment

If you forgot to add `DATABASE_URL` before deploying:

1. Go to Vercel Dashboard → Your Project
2. Click "Settings" → "Environment Variables"
3. Add `DATABASE_URL` with your connection string
4. Go to "Deployments" tab
5. Click "..." on latest deployment → "Redeploy"

## Your Database Connection String

```
postgresql://neondb_owner:npg_sKGp59MIWPkm@ep-empty-leaf-ahet26pl-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
```

Copy this and add it as `DATABASE_URL` in Vercel environment variables.

