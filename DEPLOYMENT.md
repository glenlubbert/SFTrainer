# 🚀 Deployment Guide - GitHub Pages

This guide will walk you through deploying the Stamina Lab Coach Trainer App to GitHub Pages.

## 📋 Prerequisites

1. **GitHub Account** - You need a GitHub account
2. **Git** - Make sure Git is installed on your machine
3. **Node.js** - Version 16 or higher (already installed)

## 🔧 Step-by-Step Deployment

### 1. Create a GitHub Repository

1. Go to [GitHub.com](https://github.com) and sign in
2. Click the "+" icon in the top right corner
3. Select "New repository"
4. Name it `SFTrainer` (or your preferred name)
5. Make it **Public** (required for free GitHub Pages)
6. **Don't** initialize with README, .gitignore, or license (we already have these)
7. Click "Create repository"

### 2. Initialize Git and Push to GitHub

Run these commands in your project directory:

```bash
# Initialize Git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Stamina Lab Coach Trainer App"

# Add GitHub repository as remote
git remote add origin https://github.com/YOUR_USERNAME/SFTrainer.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**Replace `YOUR_USERNAME` with your actual GitHub username.**

### 3. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on "Settings" tab
3. Scroll down to "Pages" section (in the left sidebar)
4. Under "Source", select "Deploy from a branch"
5. Choose "gh-pages" branch
6. Click "Save"

### 4. Deploy the Application

You have two options for deployment:

#### Option A: Manual Deployment (Recommended for first time)

```bash
# Build and deploy
npm run deploy
```

#### Option B: Automatic Deployment via GitHub Actions

The GitHub Actions workflow will automatically deploy when you push to the main branch. Just push your changes:

```bash
git add .
git commit -m "Update app"
git push
```

### 5. Access Your Deployed App

After deployment (usually takes 2-5 minutes), your app will be available at:
```
https://YOUR_USERNAME.github.io/SFTrainer
```

## 🔄 Updating the App

To update your deployed app:

1. Make your changes locally
2. Test with `npm run dev`
3. Commit and push:
   ```bash
   git add .
   git commit -m "Update description"
   git push
   ```
4. The GitHub Actions workflow will automatically rebuild and deploy

## 🛠️ Troubleshooting

### Common Issues:

1. **404 Error**: Make sure the repository name matches exactly in `vite.config.ts`
2. **Build Fails**: Check the GitHub Actions tab for error details
3. **Page Not Loading**: Wait 5-10 minutes for GitHub Pages to update

### Manual Deployment if Actions Fail:

```bash
npm run deploy
```

### Check Deployment Status:

1. Go to your repository on GitHub
2. Click "Actions" tab
3. Check the latest workflow run

## 📱 Custom Domain (Optional)

If you want to use a custom domain:

1. Go to repository Settings → Pages
2. Enter your domain in "Custom domain"
3. Add a CNAME file to your repository with your domain
4. Update your DNS settings

## 🔒 Security Notes

- The app is currently set up for public deployment
- No sensitive data is stored in the application
- All coaching scenarios are fictional examples

## 📞 Support

If you encounter issues:

1. Check the GitHub Actions logs
2. Verify your repository settings
3. Ensure all files are committed and pushed
4. Check that the repository name matches in `vite.config.ts`

Your app should now be live and accessible to anyone with the URL! 