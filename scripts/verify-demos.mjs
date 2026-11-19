import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { projectDemos } from '../src/data/project-demos.ts';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const origin = process.argv[2] || 'http://127.0.0.1:4357';
const label = process.argv[3] || 'demos-local';
const out = path.join(root, 'validation-output', label);
await fs.mkdir(out, { recursive: true });
assert.ok(projectDemos.length, 'No verified demonstrations registered');
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const results = [];
try {
  const routes = process.argv[4] ? process.argv.slice(4) : ['/', ...projectDemos.map(demo => `/projects/${demo.slug}/`)];
  for (const route of routes) {
    for (const width of [390, 768, 1440]) {
      const context = await browser.newContext({ viewport: { width, height: 1000 }, isMobile: width === 390, hasTouch: width === 390 });
      const page = await context.newPage();
      const errors = [];
      const result = { route, width, errors, videos: [] };
      page.on('pageerror', error => errors.push(error.message));
      page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
      page.on('response', response => { if (response.status() >= 400 && response.url().startsWith(origin)) errors.push(`HTTP ${response.status()} ${response.url()}`); });
      const initialMediaRequests = [];
      page.on('request', request => { if (request.url().endsWith('.mp4')) initialMediaRequests.push(request.url()); });
      try {
        assert.equal((await page.goto(origin + route, { waitUntil: 'networkidle' })).status(), 200);
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1), false, 'Page overflow');
        const videos = page.locator('video');
        assert.equal(await videos.count(), 1, 'Exactly one player per page');
        assert.equal(initialMediaRequests.length, 0, 'MP4 is not downloaded before visitor interaction');
        for (let i = 0; i < await videos.count(); i++) {
          const video = videos.nth(i);
          await video.scrollIntoViewIfNeeded();
          assert.equal(await video.getAttribute('preload'), 'none');
          assert.ok(await video.getAttribute('aria-label'));
          const initial = await video.evaluate(v => ({ paused: v.paused, autoplay: v.autoplay, controls: v.controls, src: v.currentSrc, poster: v.poster }));
          assert.ok(initial.paused && !initial.autoplay && initial.controls);
          for (const src of await video.locator('source, track').evaluateAll(nodes => nodes.map(n => n.src))) assert.equal((await context.request.get(src)).status(), 200);
          assert.equal((await context.request.get(initial.poster)).status(), 200);
          // The native player is activated by a real pointer click; no autoplay policy bypass.
          const box = await video.boundingBox();
          assert.ok(Math.abs(box.width / box.height - 16 / 9) < .02, '16:9 ratio');
          assert.ok(box.x >= 0 && box.x + box.width <= width + 1, 'Player within viewport');
          await video.click({ position: { x: 28, y: box.height - 28 } });
          result.stage = 'wait-play';
          await page.waitForFunction(() => { const v = document.querySelector('video'); return !v.paused && v.currentTime > .2 && v.videoWidth > 0; }, null, { timeout: 30000 });
          const duration = await video.evaluate(v => v.duration);
          assert.ok(duration >= 20 && duration <= 80, 'Expected demonstration duration');
          await video.evaluate(v => v.pause());
          assert.equal(await video.evaluate(v => v.paused), true);
          await video.evaluate(v => { v.currentTime = v.duration * .6; });
          result.stage = 'wait-seek';
          await page.waitForFunction(() => { const v = document.querySelector('video'); return !v.seeking && v.currentTime > v.duration * .55; });
          // Enter fullscreen from an actual user gesture, then verify browser state.
          await video.evaluate(v => v.addEventListener('click', () => v.requestFullscreen(), { once: true }));
          await video.click({ position: { x: box.width / 2, y: box.height / 2 } });
          result.stage = 'wait-fullscreen';
          await page.waitForFunction(() => document.fullscreenElement instanceof HTMLVideoElement);
          await page.evaluate(() => document.exitFullscreen());
          await video.evaluate(v => { v.pause(); v.currentTime = v.duration * .45; });
          await page.waitForTimeout(500);
          assert.ok(await video.locator('track').count());
          const captions = await video.evaluate(v => [...v.textTracks].map(track => ({ mode: track.mode, cues: track.cues?.length ?? 0 })));
          assert.ok(captions.some(track => track.cues > 0), 'Captions parsed successfully');
          result.videos.push({ duration, play: true, pause: true, seek: true, fullscreen: true, captions, width: box.width, height: box.height, initialPaused: initial.paused, noInitialMediaDownload: true });
          await page.screenshot({ path: path.join(out, `${route.replaceAll('/', '') || 'home'}-${width}.png`) });
        }
      } catch (error) { errors.push(`${result.stage || 'load'}: ${String(error)}`); await page.screenshot({path: path.join(out, `failure-${route.replaceAll('/', '') || 'home'}-${width}.png`)}); }
      results.push(result);
      console.log(route, width, errors.length ? errors : 'PASS');
      await context.close();
    }
  }
} finally { await browser.close(); }
const report = { origin, results, failures: results.filter(r => r.errors.length).length, physicalDeviceTested: false };
await fs.writeFile(path.join(out, 'playback.json'), JSON.stringify(report, null, 2));
if (report.failures) process.exitCode = 1;