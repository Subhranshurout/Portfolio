# Quick Setup Guide

## First Time Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Before Deploying

1. **Update personal information:**
   - Edit `app/layout.tsx` - Update metadata and structured data URLs
   - Edit `components/Contact.tsx` - Verify contact links
   - Edit `components/Hero.tsx` - Update hero text if needed

2. **Add project images:**
   - Place project images in `public/images/`
   - Update image paths in `data/projects.json`
   - Recommended: Use WebP or AVIF format for best performance

3. **Update domain URLs:**
   - Replace `https://subhranshurout.dev` with your actual domain in:
     - `app/layout.tsx` (structured data)
     - `app/robots.ts`
     - `public/robots.txt`

4. **Add resume PDF:**
   - Place your resume as `public/resume.pdf`
   - Or update the link in `components/Hero.tsx`

## Building for Production

```bash
npm run build
npm start
```

## Deployment Options

### Vercel (Recommended)
1. Push to GitHub
2. Import on [vercel.com](https://vercel.com)
3. Auto-deploys on push

### Netlify
1. Build command: `npm run build`
2. Publish directory: `.next`
3. Deploy!

## Notes

- The old `index.html` and `style.css` files are preserved but not used by Next.js
- You can delete them after confirming the new site works
- All animations respect `prefers-reduced-motion` for accessibility

