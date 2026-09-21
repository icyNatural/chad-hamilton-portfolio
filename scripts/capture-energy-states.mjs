import { chromium } from 'playwright';
import fs from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const outputDir = path.join(root, 'public', 'images', 'projects', 'energy');
const reportDir = path.join(root, 'docs', 'capture-reports');
await fs.mkdir(outputDir, { recursive: true });
await fs.mkdir(reportDir, { recursive: true });

const states = [
  { name: 'instruments', url: 'https://phases.icynatural.now/energy' },
  { name: 'atlas', url: 'https://phases.icynatural.now/patterns' },
  { name: 'system', url: 'https://phases.icynatural.now/settings' },
];
const viewports = [
  { label: 'desktop', width: 1440, height: 1000 },
  { label: 'mobile', width: 390, height: 844 },
];
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const reports = [];
for (const state of states) {
  for (const viewport of viewports) {
    const page = await browser.newPage({ viewport: { width: viewport.width, height: viewport.height }, deviceScaleFactor: 1 });
    const consoleErrors = [];
    const failedRequests = [];
    page.on('console', msg => { if (msg.type() === 'error') consoleErrors.push(msg.text()); });
    page.on('requestfailed', req => failedRequests.push(`${req.method()} ${req.url()} — ${req.failure()?.errorText ?? 'failed'}`));
    let response;
    try {
      response = await page.goto(state.url, { waitUntil: 'domcontentloaded', timeout: 60000 });
      await page.waitForLoadState('networkidle', { timeout: 12000 }).catch(() => {});
      await page.evaluate(async () => { await document.fonts?.ready; });
      await page.waitForTimeout(2500);
      const outputPath = path.join(outputDir, `${viewport.label}-${state.name}.png`);
      await page.screenshot({ path: outputPath, fullPage: true });
      const metadata = await page.evaluate(() => ({
        title: document.title,
        headings: [...document.querySelectorAll('h1,h2,h3')].map(el => el.textContent?.trim()).filter(Boolean),
        controls: [...document.querySelectorAll('a,button,[role="button"],input,select')].map(el => (el.innerText || el.getAttribute('aria-label') || el.getAttribute('title') || '').trim().replace(/\s+/g, ' ')).filter(Boolean),
        bodyText: document.body.innerText.trim().replace(/\n{3,}/g, '\n\n'),
        dimensions: { viewportWidth: innerWidth, viewportHeight: innerHeight, scrollWidth: document.documentElement.scrollWidth, scrollHeight: document.documentElement.scrollHeight }
      }));
      reports.push({ state: state.name, url: state.url, viewport: `${viewport.width}x${viewport.height}`, capturedAt: new Date().toISOString(), outputPath: path.relative(root, outputPath).replaceAll('\\','/'), status: response?.status() ?? null, ok: response?.ok() ?? false, finalUrl: page.url(), ...metadata, consoleErrors, failedRequests });
      console.log(`Captured ${state.name} ${viewport.label}`);
    } catch (error) {
      reports.push({ state: state.name, url: state.url, viewport: `${viewport.width}x${viewport.height}`, capturedAt: new Date().toISOString(), error: String(error), consoleErrors, failedRequests });
      console.error(`Failed ${state.name} ${viewport.label}: ${error}`);
    } finally { await page.close(); }
  }
}
await browser.close();
await fs.writeFile(path.join(reportDir, 'energy-states.json'), JSON.stringify(reports, null, 2) + '\n');
