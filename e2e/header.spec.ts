import { test, expect } from '@playwright/test'

test.describe('Header and Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should display header with navigation', async ({ page }) => {
    const header = page.locator('header')
    await expect(header).toBeVisible()

    const nav = page.locator('nav[aria-label="Main navigation"]')
    await expect(nav).toBeVisible()
  })

  test('should have skip to content link', async ({ page }) => {
    await page.keyboard.press('Tab')
    const skipLink = page.locator('a.skip-link')
    await expect(skipLink).toBeFocused()
    await expect(skipLink).toHaveText('Skip to main content')
  })

  test('should navigate to sections on click', async ({ page }) => {
    const aboutLink = page.locator('a[href="#about"]')
    await aboutLink.click()

    // Wait for smooth scroll
    await page.waitForTimeout(500)

    const aboutSection = page.locator('#about')
    await expect(aboutSection).toBeInViewport()
  })

  test('should toggle mobile menu on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })

    const menuButton = page.locator('button[aria-label="Open menu"]')
    await expect(menuButton).toBeVisible()

    await menuButton.click()

    const mobileMenu = page.locator('#mobile-menu')
    await expect(mobileMenu).toBeVisible()

    const closeButton = page.locator('button[aria-label="Close menu"]')
    await expect(closeButton).toBeVisible()
  })

  test('should close mobile menu on escape key', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })

    const menuButton = page.locator('button[aria-label="Open menu"]')
    await menuButton.click()

    await page.keyboard.press('Escape')

    const mobileMenu = page.locator('#mobile-menu')
    await expect(mobileMenu).not.toBeVisible()
  })

  test('should toggle theme', async ({ page }) => {
    const themeToggle = page.locator('button[aria-label*="Switch to"]')
    await expect(themeToggle).toBeVisible()

    await themeToggle.click()

    // Check that theme attribute changes
    const html = page.locator('html')
    await expect(html).toHaveAttribute('data-theme', /light|dark/)
  })
})
