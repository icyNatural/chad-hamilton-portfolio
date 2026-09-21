import { chromium } from 'playwright';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const origin = process.env.PORTFOLIO_ORIGIN ?? 'http://127.0.0.1:4321';
const base = '/chad-hamilton-portfolio';
const routes = [
  '/',
  '/projects/energy-engine/',
  '/projects/inquiry-engine/',
  '/projects/semantic-archaeology/',
  '/projects/photogression/',
  '/projects/sun-earth-horizon/',
  '/projects/icysense/',
];
const viewports = [
  { label: 'desktop', width: 1440, height: 1000 },
  { label: 'mobile', width: 390, height: 844 },
];
const screenshotDir = path.resolve('validation-output');
await mkdir(screenshotDir, { recursive: true });

const browser = await chromium.launch({ channel: 'chrome', headless: true });
const results = [];

for (const route of routes) {
  for (const viewport of viewports) {
    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height },
      colorScheme: 'light',
      reducedMotion: 'reduce',
    });
    const page = await context.newPage();
    const consoleErrors = [];
    const failedRequests = [];

    page.on('console', (message) => {
      if (message.type() === 'error') consoleErrors.push(message.text());
    });
    page.on('requestfailed', (request) => {
      failedRequests.push(`${request.method()} ${request.url()} — ${request.failure()?.errorText ?? 'failed'}`);
    });

    const url = `${origin}${base}${route}`;
    const response = await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
    await page.evaluate(async () => { await document.fonts?.ready; });
    await page.evaluate(async () => {
      const step = Math.max(300, Math.floor(innerHeight * 0.75));
      for (let top = 0; top < document.documentElement.scrollHeight; top += step) {
        scrollTo(0, top);
        await new Promise((resolve) => setTimeout(resolve, 30));
      }
      scrollTo(0, 0);
      await Promise.all([...document.images].map((image) => {
        if (image.complete) return undefined;
        return new Promise((resolve) => {
          image.addEventListener('load', resolve, { once: true });
          image.addEventListener('error', resolve, { once: true });
        });
      }));
    });

    const slug = route === '/' ? 'home' : route.split('/').filter(Boolean).at(-1);
    await page.screenshot({
      path: path.join(screenshotDir, `${slug}-${viewport.label}.png`),
      fullPage: false,
    });

    const viewerOpen = page.locator('[data-image-viewer-open]').first();
    const viewer = page.locator('[data-image-viewer]').first();
    let viewerChecks = {
      available: false,
      opensWithKeyboard: false,
      escapeCloses: false,
      focusReturnsAfterEscape: false,
      visibleCloseWorks: false,
      focusReturnsAfterClose: false,
      originalLinkAvailable: false,
    };

    if (await viewerOpen.count()) {
      viewerChecks.available = true;
      await viewerOpen.focus();
      await page.keyboard.press('Enter');
      viewerChecks.opensWithKeyboard = await viewer.evaluate((element) => element instanceof HTMLDialogElement && element.open);
      viewerChecks.originalLinkAvailable = await viewer.locator('a[target="_blank"]').count() > 0;
      await page.keyboard.press('Escape');
      viewerChecks.escapeCloses = await viewer.evaluate((element) => element instanceof HTMLDialogElement && !element.open);
      viewerChecks.focusReturnsAfterEscape = await viewerOpen.evaluate((element) => document.activeElement === element);

      await viewerOpen.click();
      await viewer.locator('[data-image-viewer-close]').click();
      viewerChecks.visibleCloseWorks = await viewer.evaluate((element) => element instanceof HTMLDialogElement && !element.open);
      viewerChecks.focusReturnsAfterClose = await viewerOpen.evaluate((element) => document.activeElement === element);
    }

    const details = await page.evaluate((expectedBase) => {
      const images = [...document.images].map((image) => ({
        src: image.currentSrc || image.src,
        complete: image.complete,
        naturalWidth: image.naturalWidth,
      }));
      const badInternalLinks = [...document.querySelectorAll('a[href]')]
        .map((anchor) => anchor.getAttribute('href'))
        .filter((href) => href?.startsWith('/') && !href.startsWith(expectedBase));

      return {
        title: document.title,
        h1: document.querySelector('h1')?.textContent?.trim() ?? '',
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
        brokenImages: images.filter((image) => !image.complete || image.naturalWidth === 0),
        badInternalLinks,
        bodyFontSize: Number.parseFloat(getComputedStyle(document.body).fontSize),
        h1LineCount: (() => {
          const heading = document.querySelector('h1');
          if (!heading) return 0;
          const lineHeight = Number.parseFloat(getComputedStyle(heading).lineHeight);
          return Math.round(heading.getBoundingClientRect().height / lineHeight);
        })(),
      };
    }, base);

    results.push({
      route,
      viewport: viewport.label,
      status: response?.status() ?? null,
      ...details,
      consoleErrors,
      failedRequests,
      viewerChecks,
    });
    await context.close();
  }
}

await browser.close();

await writeFile(
  path.join(screenshotDir, 'validation-report.json'),
  `${JSON.stringify(results, null, 2)}\n`,
  'utf8',
);

const failures = results.filter((result) =>
  result.status !== 200 ||
  !result.h1 ||
  result.scrollWidth > result.clientWidth ||
  result.brokenImages.length > 0 ||
  result.badInternalLinks.length > 0 ||
  result.consoleErrors.length > 0 ||
  result.failedRequests.length > 0
  || result.bodyFontSize < (result.viewport === 'desktop' ? 17 : 16)
  || Object.values(result.viewerChecks).some((value) => value !== true)
);

console.log(JSON.stringify(results, null, 2));

if (failures.length > 0) {
  console.error(`Validation failed for ${failures.length} route/viewport combinations.`);
  process.exitCode = 1;
} else {
  console.log(`Validated ${results.length} route/viewport combinations with no detected failures.`);
}