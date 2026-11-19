import { chromium } from 'playwright';
import fs from 'node:fs/promises';
import path from 'node:path';
const origin = process.argv[2] || 'https://tech.icyclearer.com';
const label = process.argv[3] || 'before';
const out = path.resolve('validation-output', 'refinement', label);
await fs.mkdir(out, { recursive: true });
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const results = [];
try {
  for (const route of ['/', '/projects/', '/software/', '/security/', '/systems/', '/education/']) {
    for (const width of [390, 768, 1440]) {
      const page = await browser.newPage({ viewport: { width, height: 1000 }, reducedMotion: 'reduce' });
      await page.goto(origin + route, { waitUntil: 'networkidle' });
      await page.locator('img').evaluateAll(images => images.forEach(image => image.loading = 'eager'));
      await page.waitForFunction(() => [...document.images].every(image => image.complete));
      await page.screenshot({ path: path.join(out, `${route.replaceAll('/', '') || 'home'}-${width}.png`), fullPage: true });
      if (route === '/') await page.screenshot({ path: path.join(out, `home-fold-${width}.png`) });
      results.push({ route, width, title: await page.title(), overflow: await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1), resources: await page.evaluate(() => performance.getEntriesByType('resource').map(r => ({ name: new URL(r.name).pathname, bytes: r.transferSize }))) });
      await page.close();
    }
  }
} finally { await browser.close(); }
await fs.writeFile(path.join(out, 'capture.json'), JSON.stringify({ origin, label, results }, null, 2));
console.log(`Captured ${results.length} before/after layouts: ${out}`);