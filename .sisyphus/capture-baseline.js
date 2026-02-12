const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const pages = [
  '/people/e-board',
  '/people/leads',
  '/events/speakers',
  '/programs/product-team',
  '/events/case-comp',
  '/'
];

const viewports = [
  { width: 375, height: 812, name: '375' },
  { width: 768, height: 1024, name: '768' },
  { width: 1440, height: 900, name: '1440' }
];

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  for (const pagePath of pages) {
    const slug = pagePath === '/' ? 'home' : pagePath.replace(/\//g, '-').substring(1);
    
    for (const viewport of viewports) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto(`http://localhost:3000${pagePath}`, { waitUntil: 'networkidle' });
      await page.waitForTimeout(2000); // Wait for animations
      
      const filename = `.sisyphus/evidence/baseline/${slug}-${viewport.name}.png`;
      await page.screenshot({ path: filename, fullPage: true });
      console.log(`Captured: ${filename}`);
    }
  }

  await browser.close();
  console.log('All screenshots captured!');
})();
