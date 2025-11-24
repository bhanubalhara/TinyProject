# Deploy to Vercel - Step by Step Guide

## ✅ Step 1: Code is on GitHub
Your code is already pushed to: https://github.com/bhanubalhara/TinyProject.git

## 🌐 Step 2: Deploy via Vercel Web Interface (Recommended)

### 2.1 Go to Vercel
1. Visit https://vercel.com
2. Sign in with your GitHub account (or create an account)

### 2.2 Import Project
1. Click "Add New..." → "Project"
2. You'll see your GitHub repositories
3. Find and click "Import" next to `TinyProject`

### 2.3 Configure Project
- **Framework Preset**: Next.js (should auto-detect)
- **Root Directory**: `./` (default)
- **Build Command**: `npm run build` (default)
- **Output Directory**: `.next` (default)
- **Install Command**: `npm install` (default)

### 2.4 Add Environment Variables
**IMPORTANT**: Before deploying, you need to set up your database!

1. Click "Environment Variables" section
2. Add the following:

   **Variable Name**: `DATABASE_URL`  
   **Value**: Your Neon PostgreSQL connection string  
   (Get this from https://neon.tech - see Step 3 below)

   **Variable Name**: `NEXT_PUBLIC_BASE_URL`  
   **Value**: (Leave empty - Vercel will auto-detect your URL)

3. Click "Deploy"

## 🗄️ Step 3: Set Up Neon Database (If Not Done)

1. Go to https://neon.tech
2. Sign up for a free account (or sign in)
3. Click "Create Project"
4. Choose a name (e.g., "url-shortener")
5. Select a region close to you
6. Click "Create Project"
7. Once created, you'll see a connection string like:
   ```
   postgresql://user:password@ep-xxx-xxx.us-east-2.aws.neon.tech/dbname?sslmode=require
   ```
8. **Copy this entire connection string**
9. Go back to Vercel and add it as `DATABASE_URL`

## 🔄 Step 4: After First Deployment

If you added the database URL after deployment:
1. Go to your project in Vercel dashboard
2. Click "Deployments" tab
3. Click the "..." menu on the latest deployment
4. Click "Redeploy"

Or simply push a new commit to trigger automatic redeploy:
```bash
git commit --allow-empty -m "Trigger redeploy"
git push
```

## ✅ Step 5: Test Your Deployment

Once deployed, Vercel will give you a URL like: `https://tiny-project-xxx.vercel.app`

Test these endpoints:
1. **Health Check**: `https://your-app.vercel.app/healthz`
   - Should return: `{"ok": true, "version": "1.0"}`

2. **Dashboard**: `https://your-app.vercel.app/`
   - Should show the URL shortener dashboard

3. **Create a Link**: Use the form on the dashboard

4. **Test Redirect**: Visit `https://your-app.vercel.app/{code}`

## 🚀 Alternative: Deploy via CLI

If you prefer command line:

```bash
# Run the deployment script
./vercel-deploy.sh

# Or directly:
npx vercel
```

Follow the interactive prompts. You'll need to:
- Sign in to Vercel
- Link to your project
- Add environment variables in Vercel dashboard after deployment

## 📝 Important Notes

- The database will be automatically initialized on the first API call
- Make sure `DATABASE_URL` is set correctly in Vercel
- Your app will be live at: `https://your-project-name.vercel.app`
- Vercel provides free SSL certificates automatically
- Each push to GitHub will trigger a new deployment

## 🐛 Troubleshooting

**Database connection errors?**
- Verify `DATABASE_URL` is correct in Vercel environment variables
- Check that your Neon database is active
- Make sure the connection string includes `?sslmode=require`

**Build fails?**
- Check Vercel build logs
- Make sure all dependencies are in `package.json`
- Verify Node.js version (Vercel auto-detects, but you can set it in settings)

**404 errors?**
- Make sure you're using the correct routes
- Check that the deployment completed successfully

