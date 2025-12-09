# Free Deployment Guide

## 🚀 Deploy to Vercel (Recommended - 100% Free)

Vercel is made by the creators of Next.js and offers the best free hosting for Next.js apps.

### Steps:

1. **Go to Vercel**: https://vercel.com
2. **Sign up** with your GitHub account (free)
3. **Click "Add New Project"**
4. **Import your repository**:
   - Select `Subhranshurout/Portfolio`
   - Vercel will auto-detect Next.js
5. **Configure** (usually auto-detected):
   - Framework Preset: Next.js
   - Root Directory: `./`
   - Build Command: `npm run build` (auto-detected)
   - Output Directory: `.next` (auto-detected)
6. **Click "Deploy"**
7. **Wait 2-3 minutes** - Your site will be live!

### After Deployment:

- ✅ Your site will be live at: `https://portfolio-xxxxx.vercel.app`
- ✅ Automatic deployments on every git push
- ✅ Free SSL certificate
- ✅ Custom domain support (free)
- ✅ Global CDN for fast loading

### Custom Domain (Optional):

1. Go to your project settings in Vercel
2. Click "Domains"
3. Add your custom domain (e.g., `subhranshurout.dev`)
4. Follow DNS instructions (free)

---

## 🌐 Alternative Free Options

### Option 2: Netlify (Also Free)

1. Go to: https://www.netlify.com
2. Sign up with GitHub
3. Click "Add new site" → "Import an existing project"
4. Select your repository
5. Build settings (auto-detected):
   - Build command: `npm run build`
   - Publish directory: `.next`
6. Deploy!

### Option 3: GitHub Pages (Static Only)

⚠️ Note: Requires static export, loses some Next.js features

1. Update `next.config.js`:
   ```js
   output: 'export'
   ```
2. Build: `npm run build`
3. Push `out` folder to `gh-pages` branch
4. Enable GitHub Pages in repo settings

---

## 📊 Comparison

| Platform | Free Tier | Next.js Support | Auto Deploy | Custom Domain |
|----------|-----------|-----------------|-------------|--------------|
| **Vercel** | ✅ Excellent | ✅ Perfect | ✅ Yes | ✅ Free |
| **Netlify** | ✅ Good | ✅ Great | ✅ Yes | ✅ Free |
| **GitHub Pages** | ✅ Basic | ⚠️ Static only | ⚠️ Manual | ✅ Free |

## 🎯 Recommendation

**Use Vercel** - It's the easiest, fastest, and best for Next.js apps. Takes 5 minutes to set up!

