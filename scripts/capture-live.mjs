import { chromium } from 'playwright';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const outputRoot = path.join(root, 'public', 'images', 'projects');
const reportRoot = path.join(root, 'docs', 'capture-reports');
const allTargets = [
  { slug: 'icy-clearer', url: 'https://icyclearer.com/' },
  { slug: 'icy-clearer-clear', url: 'https://icyclearer.com/clear.html' },
  { slug: 'energy', url: 'https://phases.icynatural.now' },
  { slug: 'icysense', url: 'https://vision.icynatural.now' },
  { slug: 'raw-reality', url: 'https://reality.icynatural.now' },
  { slug: 'icy-lab', url: 'https://playground.icynatural.now' },
  { slug: 'semantic-archaeology', url: 'https://language.icynatural.now' },
  { slug: 'photogression', url: 'https://photogression.icynatural.now' },
  { slug: 'wonder', url: 'https://wonder.icynatural.now' },
];

const requestedSlug = process.argv[2];
const targets = requestedSlug
  ? allTargets.filter((target) => target.slug === requestedSlug)
  : allTargets;

if (requestedSlug && targets.length === 0) {
  throw new Error(`Unknown target slug: ${requestedSlug}`);
}

const viewports = [
  { name: 'desktop', width: 1440, height: 1000, isMobile: false },
  { name: 'mobile', width: 390, height: 844, isMobile: true },
];

const browser = await chromium.launch({
  channel: 'chrome',
  headless: true,
  args: ['--disable-dev-shm-usage'],
});

const report = [];

for (const target of targets) {
  const projectDir = path.join(outputRoot, target.slug);
  await mkdir(projectDir, { recursive: true });

  for (const viewport of viewports) {
    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height },
      deviceScaleFactor: 1,
      isMobile: viewport.isMobile,
      hasTouch: viewport.isMobile,
      colorScheme: 'dark',
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

    const capturedAt = new Date().toISOString();
    const outputPath = path.join(projectDir, `${viewport.name}-landing.png`);
    const entry = {
      ...target,
      viewport: `${viewport.width}x${viewport.height}`,
      state: 'landing',
      capturedAt,
      outputPath: path.relative(root, outputPath).replaceAll('\\', '/'),
    };

    try {
      const response = await page.goto(target.url, { waitUntil: 'domcontentloaded', timeout: 20000 });
      await page.waitForLoadState('networkidle', { timeout: 4000 }).catch(() => {});
      await page.evaluate(async () => {
        await document.fonts?.ready;
        const images = [...document.images];
        await Promise.all(images.map((image) => image.complete ? undefined : new Promise((resolve) => {
          image.addEventListener('load', resolve, { once: true });
          image.addEventListener('error', resolve, { once: true });
        })));
      });
      await page.waitForTimeout(1200);

      const pageDetails = await page.evaluate(() => {
        const clean = (value) => value?.replace(/\s+/g, ' ').trim();
        const visible = (element) => {
          const style = getComputedStyle(element);
          const rect = element.getBoundingClientRect();
          return style.visibility !== 'hidden' && style.display !== 'none' && rect.width > 0 && rect.height > 0;
        };
        const textOf = (selector, limit = 30) => [...document.querySelectorAll(selector)]
          .filter(visible)
          .map((element) => clean(element.textContent))
          .filter(Boolean)
          .slice(0, limit);

        return {
          title: document.title,
          finalUrl: location.href,
          headings: textOf('h1, h2, h3'),
          controls: textOf('a, button, [role="button"]', 50),
          bodyText: clean(document.body?.innerText)?.slice(0, 4000),
          dimensions: {
            viewportWidth: innerWidth,
            viewportHeight: innerHeight,
            scrollWidth: document.documentElement.scrollWidth,
            scrollHeight: document.documentElement.scrollHeight,
          },
        };
      });

      await page.screenshot({ path: outputPath, fullPage: false });
      Object.assign(entry, {
        status: response?.status() ?? null,
        ok: response?.ok() ?? null,
        ...pageDetails,
        consoleErrors: consoleErrors.slice(0, 20),
        failedRequests: failedRequests.slice(0, 20),
      });
    } catch (error) {
      entry.error = error instanceof Error ? error.message : String(error);
      entry.consoleErrors = consoleErrors.slice(0, 20);
      entry.failedRequests = failedRequests.slice(0, 20);
    } finally {
      report.push(entry);
      await context.close();
    }
  }
}

await browser.close();
await mkdir(reportRoot, { recursive: true });
const reportPath = path.join(reportRoot, `${requestedSlug ?? 'all-sites'}.json`);
await writeFile(reportPath, `${JSON.stringify(report, null, 2)}\n`);
console.log(`Captured ${report.filter((entry) => !entry.error).length}/${report.length} views.`);
console.log(`Report: ${reportPath}`);