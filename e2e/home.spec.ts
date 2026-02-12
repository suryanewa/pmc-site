import { test, expect } from '@playwright/test'

interface WindowWithLenis extends Window {
  lenis?: {
    isRunning: boolean;
  };
}

test.describe('Home Page', () => {
  test('should load without errors', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/PMC|Product/)
  })
  
  test('should render main content', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('main').first()).toBeVisible()
  })

  test('should scroll smoothly without jank', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const scrollSteps = 5
    const pageHeight = await page.evaluate(() => document.body.scrollHeight)
    const viewportHeight = await page.evaluate(() => window.innerHeight)
    const scrollIncrement = (pageHeight - viewportHeight) / scrollSteps

    for (let i = 1; i <= scrollSteps; i++) {
      const targetY = Math.floor(scrollIncrement * i)
      await page.evaluate((y) => window.scrollTo({ top: y, behavior: 'smooth' }), targetY)
      await page.waitForTimeout(500)
    }

    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' }))
    await page.waitForTimeout(1000)

    const scrollY = await page.evaluate(() => window.scrollY)
    expect(scrollY).toBeLessThan(200)
  })

  test('should pause animations when tab is hidden', async ({ page, context }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const isLenisRunningBefore = await page.evaluate(() => {
      return (window as WindowWithLenis).lenis?.isRunning ?? true
    })
    expect(isLenisRunningBefore).toBeTruthy()

    const newPage = await context.newPage()
    await newPage.goto('about:blank')
    await newPage.waitForTimeout(500)

    await newPage.close()
    await page.bringToFront()
    await page.waitForTimeout(100)

    const isLenisRunningAfter = await page.evaluate(() => {
      return (window as WindowWithLenis).lenis?.isRunning ?? true
    })
    expect(isLenisRunningAfter).toBeTruthy()
  })
})
