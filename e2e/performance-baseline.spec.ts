/**
 * Performance Baseline Measurement Script
 * Captures performance traces for key interaction scenarios
 */

import { test, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';

const EVIDENCE_DIR = path.join(process.cwd(), '.sisyphus/evidence');
const TIMESTAMP = new Date().toISOString().replace(/[:.]/g, '-').split('T')[0];
const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

// Ensure evidence directory exists
if (!fs.existsSync(EVIDENCE_DIR)) {
  fs.mkdirSync(EVIDENCE_DIR, { recursive: true });
}

test.describe('Performance Baseline Scenarios', () => {
  test.use({
    viewport: { width: 390, height: 844 }, // iPhone 14 Pro dimensions
    deviceScaleFactor: 3,
  });

  test('Scenario 1: Home page full scroll (top to bottom)', async ({ page, context }) => {
    const tracePath = path.join(EVIDENCE_DIR, `task-1-scenario-1-home-scroll-${TIMESTAMP}.json`);
    const screenshotPath = path.join(EVIDENCE_DIR, `task-1-scenario-1-home-scroll-${TIMESTAMP}.png`);

    // Start tracing
    await context.tracing.start({
      screenshots: true,
      snapshots: true,
    });

    // Navigate to home page
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });

    // Wait for initial render
    await page.waitForTimeout(2000);

    // Take initial screenshot
    await page.screenshot({ path: screenshotPath, fullPage: true });

    // Measure scroll performance
    await page.evaluate(() => {
      performance.mark('scroll-start');
    });

    // Smooth scroll to bottom
    const scrollHeight = await page.evaluate(() => document.body.scrollHeight);
    const viewportHeight = await page.evaluate(() => window.innerHeight);
    const scrollSteps = 20;
    const stepSize = (scrollHeight - viewportHeight) / scrollSteps;

    for (let i = 0; i <= scrollSteps; i++) {
      await page.evaluate((y) => {
        window.scrollTo({ top: y, behavior: 'smooth' });
      }, i * stepSize);
      await page.waitForTimeout(100);
    }

    await page.evaluate(() => {
      performance.mark('scroll-end');
      performance.measure('home-scroll', 'scroll-start', 'scroll-end');
    });

    // Get performance metrics
    const metrics = await page.evaluate(() => {
      const scrollMeasure = performance.getEntriesByName('home-scroll')[0];
      const paintEntries = performance.getEntriesByType('paint');
      const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;

      return {
        scrollDuration: scrollMeasure?.duration,
        fcp: paintEntries.find((e) => e.name === 'first-contentful-paint')?.startTime,
        domContentLoaded: navigationEntry?.domContentLoadedEventEnd - navigationEntry?.domContentLoadedEventStart,
        loadComplete: navigationEntry?.loadEventEnd - navigationEntry?.loadEventStart,
      };
    });

    // Stop tracing and save
    await context.tracing.stop({ path: tracePath });

    console.log('Scenario 1 - Home Scroll Metrics:', metrics);
  });

  test('Scenario 2: Navbar scroll interaction', async ({ page, context }) => {
    const tracePath = path.join(EVIDENCE_DIR, `task-1-scenario-2-navbar-scroll-${TIMESTAMP}.json`);
    const screenshotBeforePath = path.join(EVIDENCE_DIR, `task-1-scenario-2-navbar-before-${TIMESTAMP}.png`);
    const screenshotAfterPath = path.join(EVIDENCE_DIR, `task-1-scenario-2-navbar-after-${TIMESTAMP}.png`);

    await context.tracing.start({
      screenshots: true,
      snapshots: true,
    });

    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);

    // Take screenshot before scroll
    await page.screenshot({ path: screenshotBeforePath });

    // Find navbar
    const navbar = page.locator('[data-navbar]');
    await expect(navbar).toBeVisible();

    // Measure navbar scroll interaction
    await page.evaluate(() => {
      performance.mark('navbar-scroll-start');
    });

    // Scroll down to trigger navbar state change
    await page.evaluate(() => {
      window.scrollTo({ top: 200, behavior: 'smooth' });
    });
    await page.waitForTimeout(800);

    // Scroll back up
    await page.evaluate(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    await page.waitForTimeout(800);

    // Repeat to measure consistency
    await page.evaluate(() => {
      window.scrollTo({ top: 300, behavior: 'smooth' });
    });
    await page.waitForTimeout(800);

    await page.evaluate(() => {
      performance.mark('navbar-scroll-end');
      performance.measure('navbar-scroll', 'navbar-scroll-start', 'navbar-scroll-end');
    });

    // Take screenshot after scroll
    await page.screenshot({ path: screenshotAfterPath });

    const metrics = await page.evaluate(() => {
      const measure = performance.getEntriesByName('navbar-scroll')[0];
      return {
        duration: measure?.duration,
      };
    });

    await context.tracing.stop({ path: tracePath });

    console.log('Scenario 2 - Navbar Scroll Metrics:', metrics);
  });

  test('Scenario 3: Timeline scroll interaction', async ({ page, context }) => {
    const tracePath = path.join(EVIDENCE_DIR, `task-1-scenario-3-timeline-scroll-${TIMESTAMP}.json`);
    const screenshotPath = path.join(EVIDENCE_DIR, `task-1-scenario-3-timeline-${TIMESTAMP}.png`);

    await context.tracing.start({
      screenshots: true,
      snapshots: true,
    });

    await page.goto(BASE_URL, { waitUntil: 'networkidle' });

    // Scroll to timeline section (assuming it's further down the page)
    await page.evaluate(() => {
      const timeline = document.querySelector('[class*="timeline"]') || document.querySelector('[class*="Timeline"]');
      if (timeline) {
        timeline.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        // Fallback: scroll to middle of page where timeline likely is
        window.scrollTo({ top: window.innerHeight * 2, behavior: 'smooth' });
      }
    });
    await page.waitForTimeout(1500);

    await page.evaluate(() => {
      performance.mark('timeline-scroll-start');
    });

    // Scroll through timeline
    const currentScroll = await page.evaluate(() => window.scrollY);
    const scrollSteps = 5;
    const scrollIncrement = 200;
    
    for (let i = 0; i < scrollSteps; i++) {
      const targetScroll = currentScroll + i * scrollIncrement;
      await page.evaluate((target) => {
        window.scrollTo({ top: target, behavior: 'smooth' });
      }, targetScroll);
      await page.waitForTimeout(300);
    }

    await page.evaluate(() => {
      performance.mark('timeline-scroll-end');
      performance.measure('timeline-scroll', 'timeline-scroll-start', 'timeline-scroll-end');
    });

    await page.screenshot({ path: screenshotPath, fullPage: false });

    const metrics = await page.evaluate(() => {
      const measure = performance.getEntriesByName('timeline-scroll')[0];
      return {
        duration: measure?.duration,
      };
    });

    await context.tracing.stop({ path: tracePath });

    console.log('Scenario 3 - Timeline Scroll Metrics:', metrics);
  });

  test('Scenario 4: Polaroid hover interactions', async ({ page, context }) => {
    const tracePath = path.join(EVIDENCE_DIR, `task-1-scenario-4-polaroid-hover-${TIMESTAMP}.json`);
    const screenshotPath = path.join(EVIDENCE_DIR, `task-1-scenario-4-polaroid-${TIMESTAMP}.png`);

    await context.tracing.start({
      screenshots: true,
      snapshots: true,
    });

    await page.goto(BASE_URL, { waitUntil: 'networkidle' });

    // Scroll to polaroid section
    await page.evaluate(() => {
      const polaroid = document.querySelector('[class*="polaroid"]') || document.querySelector('[class*="Polaroid"]');
      if (polaroid) {
        polaroid.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        window.scrollTo({ top: window.innerHeight * 3, behavior: 'smooth' });
      }
    });
    await page.waitForTimeout(1500);

    await page.evaluate(() => {
      performance.mark('polaroid-hover-start');
    });

    // Find polaroid elements (look for images or cards)
    const polaroids = page.locator('img[alt*="PMC"], img[alt*="pmc"], [class*="polaroid"]').first();
    
    if (await polaroids.count() > 0) {
      // Hover over multiple polaroids
      const count = Math.min(await polaroids.count(), 5);
      for (let i = 0; i < count; i++) {
        const polaroid = polaroids.nth(i);
        await polaroid.hover({ force: true });
        await page.waitForTimeout(300);
      }
    } else {
      // Fallback: simulate hover interactions on page
      await page.mouse.move(200, 400);
      await page.waitForTimeout(200);
      await page.mouse.move(400, 400);
      await page.waitForTimeout(200);
      await page.mouse.move(600, 400);
      await page.waitForTimeout(200);
    }

    await page.evaluate(() => {
      performance.mark('polaroid-hover-end');
      performance.measure('polaroid-hover', 'polaroid-hover-start', 'polaroid-hover-end');
    });

    await page.screenshot({ path: screenshotPath, fullPage: false });

    const metrics = await page.evaluate(() => {
      const measure = performance.getEntriesByName('polaroid-hover')[0];
      return {
        duration: measure?.duration,
      };
    });

    await context.tracing.stop({ path: tracePath });

    console.log('Scenario 4 - Polaroid Hover Metrics:', metrics);
  });
});
