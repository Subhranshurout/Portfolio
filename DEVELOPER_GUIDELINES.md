# Developer Guidelines

This document outlines the design system, coding conventions, and best practices for the portfolio website.

## Design Tokens

### Spacing Scale (4px base)

All spacing must use the 4px scale defined in CSS variables:

```css
--spacing-1: 4px --spacing-2: 8px --spacing-3: 12px --spacing-4: 16px --spacing-5: 20px
  --spacing-6: 24px --spacing-8: 32px --spacing-10: 40px --spacing-12: 48px --spacing-16: 64px
  --spacing-20: 80px --spacing-24: 96px;
```

**Never use hard-coded pixel values.** Always use CSS variables or Tailwind classes that map to these tokens.

### Typography Scale

```css
--font-size-xs: 0.75rem /* 12px */ --font-size-sm: 0.875rem /* 14px */ --font-size-base: 1rem
  /* 16px */ --font-size-lg: 1.125rem /* 18px */ --font-size-xl: 1.25rem /* 20px */
  --font-size-2xl: 1.5rem /* 24px */ --font-size-3xl: 1.875rem /* 30px */ --font-size-4xl: 2.25rem
  /* 36px */ --font-size-5xl: 3rem /* 48px */ --font-size-6xl: 3.75rem /* 60px */
  --font-size-7xl: 4.5rem /* 72px */;
```

### Colors

All colors are defined as CSS variables with theme support:

```css
--color-bg: Background color --color-card: Card background --color-glass: Glassmorphism background
  --color-accent: Accent color (#ffb86b) --color-primary-1: Primary gradient start (#5b21b6)
  --color-primary-2: Primary gradient end (#06b6d4) --color-text-primary: Primary text color
  --color-text-secondary: Secondary text color --color-border: Border color;
```

### Border Radius

```css
--radius-sm: 4px --radius-md: 8px --radius-lg: 12px --radius-xl: 16px --radius-2xl: 24px
  --radius-full: 9999px;
```

## Motion Tokens

All animations must use the centralized motion tokens from `lib/motionTokens.ts`:

```typescript
motionTokens.duration.fast // 180ms
motionTokens.duration.medium // 360ms
motionTokens.duration.slow // 600ms

motionTokens.easing.default // cubic-bezier(0.22, 0.9, 0.35, 1)
```

### Using Motion Tokens

```typescript
import { getTransition, prefersReducedMotion } from '@/lib/motionTokens'

// In Framer Motion
<motion.div
  transition={getTransition('medium')}
  whileHover={prefersReducedMotion() ? {} : { scale: 1.05 }}
/>
```

### Prefers Reduced Motion

**Always respect user preferences:**

```typescript
if (prefersReducedMotion()) {
  // Disable or simplify animations
}
```

## Responsive Breakpoints

```css
Mobile:      ≤ 767px
Tablet:      768px - 1279px
Desktop-small: 1280px - 1439px
Desktop:     ≥ 1440px
```

### Header Heights

```css
Mobile:      --header-height-mobile: 48px
Tablet:      --header-height-tablet: 56px
Desktop:     --header-height-desktop: 64px
```

## Component Conventions

### File Structure

```
components/
  ComponentName/
    index.tsx          # Main component
    ComponentName.test.tsx  # Tests
    ComponentName.module.css # Styles (if needed)
```

### Component Guidelines

1. **Use TypeScript** for all components
2. **Export components** as named exports
3. **Use 'use client'** directive for client components
4. **Keep components focused** - one responsibility per component
5. **Use design tokens** - never hard-code values
6. **Add accessibility** - ARIA labels, keyboard navigation, focus states

### Example Component Structure

```tsx
'use client'

import { motion } from 'framer-motion'
import { getTransition } from '@/lib/motionTokens'

interface ComponentProps {
  title: string
  children: React.ReactNode
}

export function Component({ title, children }: ComponentProps) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={getTransition('medium')}
      className="spacing-section"
    >
      <h2>{title}</h2>
      {children}
    </motion.section>
  )
}
```

## Accessibility Rules

### Required Practices

1. **Semantic HTML** - Use proper HTML elements (`<nav>`, `<main>`, `<section>`, etc.)
2. **ARIA Labels** - Add `aria-label` for icon-only buttons
3. **Keyboard Navigation** - All interactive elements must be keyboard accessible
4. **Focus States** - Visible focus indicators on all focusable elements
5. **Color Contrast** - Minimum 4.5:1 for body text (WCAG AA)
6. **Alt Text** - All images must have meaningful alt text (empty for decorative)
7. **Skip Links** - Provide skip to content links
8. **Live Regions** - Use `role="alert"` for dynamic content updates

### Example

```tsx
<button aria-label="Toggle theme" aria-expanded={isOpen} onClick={handleClick}>
  <Icon aria-hidden="true" />
</button>
```

## Performance Guidelines

1. **Lazy Load** - Use `next/image` for all images
2. **Code Splitting** - Use dynamic imports for heavy libraries
3. **Optimize Animations** - Use `transform` and `opacity` only
4. **Avoid Layout Thrashing** - Don't animate properties that trigger layout
5. **Use `will-change`** sparingly and only when needed

## Testing Requirements

### Unit Tests

- Test component rendering
- Test user interactions
- Test accessibility features
- Minimum 80% code coverage

### E2E Tests

- Test critical user flows
- Test responsive behavior
- Test accessibility features
- Test form submissions

## Code Quality

### Linting

- ESLint with Next.js config
- Prettier for formatting
- TypeScript strict mode

### Before Committing

```bash
npm run lint
npm run format:check
npm run type-check
npm run test
```

## Git Workflow

1. Create feature branch from `main`
2. Make changes following guidelines
3. Write/update tests
4. Run linting and tests
5. Create PR with description
6. Request review

## Questions?

Refer to:

- [Next.js Documentation](https://nextjs.org/docs)
- [Framer Motion Documentation](https://www.framer.com/motion/)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
