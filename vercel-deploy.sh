#!/bin/bash

echo "🚀 Deploying to Vercel..."
echo ""
echo "This will open an interactive deployment process."
echo "You'll need to:"
echo "  1. Sign in to Vercel (or create account)"
echo "  2. Link to your GitHub repo"
echo "  3. Add environment variables (DATABASE_URL from Neon)"
echo ""
read -p "Press Enter to continue..."

npx vercel

echo ""
echo "✅ Deployment initiated!"
echo ""
echo "📝 Next steps:"
echo "  1. Set up Neon database at https://neon.tech"
echo "  2. Copy the connection string"
echo "  3. Go to Vercel dashboard → Your project → Settings → Environment Variables"
echo "  4. Add DATABASE_URL with your Neon connection string"
echo "  5. Redeploy or wait for automatic redeploy"
echo ""

