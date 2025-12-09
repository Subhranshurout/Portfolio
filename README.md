# Subhranshu Sekhar Rout — Portfolio Website

A modern, production-ready portfolio website built with Next.js, Tailwind CSS, and Framer Motion. Features rich animations, responsive design, accessibility compliance, and comprehensive testing.

## 🚀 Features

- **Modern Design**: Glassmorphism effects, gradient backgrounds, smooth animations
- **Dark/Light Theme**: Automatic theme detection with manual toggle
- **Fully Responsive**: Mobile-first design (Mobile ≤767px, Tablet 768-1279px, Desktop ≥1280px)
- **Performance Optimized**: Lighthouse scores ≥90, lazy loading, code splitting
- **Accessibility**: WCAG AA compliant, keyboard navigation, screen reader support
- **Interactive Projects**: Filterable project gallery with detailed case study modals
- **Smooth Scrolling**: Custom smooth scroll with section highlighting
- **Parallax Effects**: Multi-layer parallax on hero section (respects reduced motion)
- **Comprehensive Testing**: Unit tests (Jest) and E2E tests (Playwright)

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS with custom design tokens
- **Animations**: Framer Motion with centralized motion tokens
- **State Management**: React Context (Theme)
- **TypeScript**: Full type safety
- **Font**: Inter (variable font, optimized)
- **Testing**: Jest + React Testing Library, Playwright
- **CI/CD**: GitHub Actions

## 🌐 Deploy for Free (No Server Needed!)

### Deploy to Vercel (Recommended - 100% Free)

1. **Go to**: https://vercel.com
2. **Sign up** with your GitHub account
3. **Click "Add New Project"**
4. **Import** your `Subhranshurout/Portfolio` repository
5. **Click "Deploy"** (Vercel auto-detects Next.js)
6. **Done!** Your site is live in 2-3 minutes

✅ **Free features included:**
- Unlimited deployments
- Automatic deployments on every git push
- Free SSL certificate
- Global CDN (fast loading worldwide)
- Custom domain support (free)

**Your site will be live at**: `https://portfolio-xxxxx.vercel.app`

📖 **See `DEPLOYMENT.md` for detailed instructions and alternatives**

---

## 📦 Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
portfolio/
├── app/
│   ├── api/              # API routes
│   ├── globals.css       # Global styles & design tokens
│   ├── layout.tsx        # Root layout with metadata
│   └── page.tsx          # Main page component
├── components/
│   ├── __tests__/        # Component unit tests
│   ├── About.tsx
│   ├── CaseStudyModal.tsx
│   ├── Contact.tsx
│   ├── Education.tsx
│   ├── Experience.tsx
│   ├── Footer.tsx
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── Highlights.tsx
│   ├── Projects.tsx
│   ├── Skills.tsx
│   ├── ThemeProvider.tsx
│   └── ThemeToggle.tsx
├── data/
│   └── projects.json     # Project data
├── e2e/                  # E2E tests
├── lib/
│   └── motionTokens.ts   # Centralized motion tokens
├── public/               # Static assets
└── ...config files
```

## 🎨 Design Tokens

The project uses a comprehensive design token system with a 4px spacing scale. See [DEVELOPER_GUIDELINES.md](./DEVELOPER_GUIDELINES.md) for details.

### Key Tokens

- **Spacing**: 4px base scale (4, 8, 12, 16, 24, 32, 40, 48, 64, 80, 96px)
- **Typography**: Modular scale from 12px to 72px
- **Colors**: Theme-aware CSS variables
- **Motion**: Centralized timing and easing (180ms, 360ms, 600ms)
- **Breakpoints**: Mobile (≤767px), Tablet (768-1279px), Desktop (≥1280px)

## 🧪 Testing

### Unit Tests

```bash
npm run test              # Run tests
npm run test:watch        # Watch mode
npm run test:coverage      # With coverage
```

### E2E Tests

```bash
npm run test:e2e         # Run E2E tests
npm run test:e2e:ui       # UI mode
```

## 🔧 Development Scripts

```bash
npm run dev              # Start development server
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Run ESLint
npm run lint:fix          # Fix linting issues
npm run format            # Format code with Prettier
npm run format:check      # Check formatting
npm run type-check        # TypeScript type checking
```

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Vercel will automatically detect Next.js and deploy
4. Add environment variables if needed

### Deploy to Netlify

1. Build the project: `npm run build`
2. Set build command: `npm run build`
3. Set publish directory: `.next`
4. Deploy!

## 🔒 Environment Variables

Create a `.env.local` file for local development:

```env
# Add any required environment variables
# (Currently none required, but ready for future use)
```

## 📝 Customization

### Update Project Data

Edit `data/projects.json`:

```json
{
  "id": "project-id",
  "title": "Project Title",
  "category": "iOS",
  "role": "Your Role",
  "tech": ["Tech1", "Tech2"],
  "description": "Project description",
  "highlights": ["Highlight 1", "Highlight 2"],
  "metrics": {
    "downloads": "10k+"
  }
}
```

### Update Personal Information

- `app/layout.tsx` - SEO metadata and structured data
- `components/Hero.tsx` - Hero section content
- `components/About.tsx` - About section
- `components/Contact.tsx` - Contact information

### Customize Colors

Edit CSS variables in `app/globals.css`:

```css
:root {
  --color-accent: #FFB86B;
  --color-primary-1: #5B21B6;
  --color-primary-2: #06B6D4;
}
```

## ♿ Accessibility

- ✅ WCAG AA compliant
- ✅ Keyboard navigation
- ✅ Screen reader support
- ✅ Focus indicators
- ✅ Skip to content links
- ✅ ARIA labels and landmarks
- ✅ Color contrast ≥4.5:1

## 🎯 Performance

- ✅ Lighthouse Performance ≥90
- ✅ Optimized images (WebP/AVIF)
- ✅ Code splitting
- ✅ Lazy loading
- ✅ Font optimization
- ✅ Minimal JavaScript bundle

## 📚 Documentation

- [Developer Guidelines](./DEVELOPER_GUIDELINES.md) - Design tokens, conventions, best practices
- [Setup Guide](./SETUP.md) - Quick setup instructions

## 🤝 Contributing

1. Follow the [Developer Guidelines](./DEVELOPER_GUIDELINES.md)
2. Write tests for new features
3. Ensure accessibility compliance
4. Run linting and tests before committing
5. Create a PR with description

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Credits

- Design inspired by modern portfolio trends
- Icons from Font Awesome
- Fonts from Google Fonts

---

Built with ❤️ by Subhranshu Sekhar Rout
# Portfolio
