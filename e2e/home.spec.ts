import { test, expect } from '@playwright/test'

test.describe('Home page', () => {
  test('loads successfully', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/PMC/)
  })

  test('displays navigation', async ({ page }) => {
    await page.goto('/')
    const nav = page.locator('nav')
    await expect(nav).toBeVisible()
  })

  test('has accessible skip link', async ({ page }) => {
    await page.goto('/')
    const skipLink = page.getByText(/skip to content/i)
    await expect(skipLink).toBeVisible()
  })
})
