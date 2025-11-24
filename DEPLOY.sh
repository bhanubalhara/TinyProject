#!/bin/bash

# URL Shortener - Deployment Script
# This script helps you push to GitHub and deploy to Vercel

echo "🚀 URL Shortener Deployment Helper"
echo "=================================="
echo ""

# Check if GitHub remote exists
if git remote get-url origin &>/dev/null; then
    echo "✅ GitHub remote already configured"
    echo "   Remote URL: $(git remote get-url origin)"
    echo ""
    echo "📤 Pushing to GitHub..."
    git push -u origin main
    echo ""
    echo "✅ Code pushed to GitHub!"
else
    echo "📝 GitHub Setup Required"
    echo "   1. Go to https://github.com/new"
    echo "   2. Create a new repository (e.g., 'url-shortener')"
    echo "   3. DO NOT initialize with README, .gitignore, or license"
    echo "   4. Copy the repository URL"
    echo ""
    read -p "Enter your GitHub repository URL: " repo_url
    if [ -n "$repo_url" ]; then
        git remote add origin "$repo_url"
        git branch -M main
        echo ""
        echo "📤 Pushing to GitHub..."
        git push -u origin main
        echo ""
        echo "✅ Code pushed to GitHub!"
    else
        echo "❌ No URL provided. Please run this script again after creating the repo."
        exit 1
    fi
fi

echo ""
echo "🌐 Vercel Deployment"
echo "   1. Go to https://vercel.com"
echo "   2. Sign in with GitHub"
echo "   3. Click 'New Project'"
echo "   4. Import your repository: $(git remote get-url origin 2>/dev/null || echo 'your-repo')"
echo "   5. Add environment variables:"
echo "      - DATABASE_URL: Your Neon PostgreSQL connection string"
echo "      - NEXT_PUBLIC_BASE_URL: (Optional) Your Vercel URL"
echo "   6. Click 'Deploy'"
echo ""
echo "💡 Don't have a Neon database yet?"
echo "   1. Go to https://neon.tech"
echo "   2. Create a free account"
echo "   3. Create a new project"
echo "   4. Copy the connection string"
echo "   5. Add it to Vercel as DATABASE_URL"
echo ""
echo "✨ After deployment, your app will be live at: https://your-app.vercel.app"
echo ""

