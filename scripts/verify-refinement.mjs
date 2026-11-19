import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const origin = (process.argv[2] || 'http://127.0.0.1:4367').replace(/\/$/, '');
const label = process.argv[3] || 'refinement-local';
assert.match(label, /^[a-zA-Z0-9_-]+$/, 'label must be one safe directory name');
const out = path.join(root, 'validation-output', label);
await fs.mkdir(out, { recursive: true });
const routes = ['/', '/projects/', '/software/', '/security/', '/systems/', '/education/', '/projects/cert-engine/'];
const widths = [360, 390, 430, 768, 1280, 1440, 1920];
const report = {
  origin, label, startedAt: new Date().toISOString(), results: [], interactions: [], failures: [],
  limitations: [
    'Chromium desktop emulation only; no physical devices, other engines, screen reader or axe audit.',
    'Contrast uses actual nonempty rendered DOM text nodes, computed sRGB colors and ancestor solid backgrounds. Alpha and ancestor opacity are composited approximately. Gradients/images, pseudo-elements and overlapping paint cannot be reliably resolved; these nodes are reported as unassessed, not passed.',
    'Hidden/fully clipped text, disabled controls, SVG metadata and native video controls are excluded. Generated content, placeholders, canvas and text inside images are not audited.',
    'Focus checks establish keyboard reachability, viewport visibility and a computed outline/shadow, not a pixel-level focus contrast or occlusion audit.',
    '200% zoom equivalent is a 640 CSS-pixel viewport representing a 1280-pixel window. This is reflow emulation, not browser UI zoom. Text-only resizing doubles every element computed font size; clipping heuristics are not visual proof.',
    'Transfer measurements use a fresh cache-disabled context and CDP encodedDataLength (response transfer including headers); resource timing is also recorded. No byte budget is invented.',
    'The server may rebuild during this non-atomic run. Timestamps and document ETags/Last-Modified are retained; rerun if a build changes.'
  ]
};
function fail(scope, message, details) {
  report.failures.push({ scope, message, details });
  console.error(`FAIL ${scope}: ${message}`);
}
async function save() { await fs.writeFile(path.join(out, 'report.json'), JSON.stringify(report, null, 2)); }

// Runs in the page. Never changes the application or its persisted state.
function inspect() {
  const rgba = value => {
    const m = value.match(/^rgba?\(([^)]+)\)$/);
    if (!m) return null;
    const n = m[1].split(/[,\s/]+/).map(Number);
    return [n[0], n[1], n[2], n[3] ?? 1];
  };
  const over = (a, b) => [0, 1, 2].map(i => a[i] * a[3] + b[i] * (1 - a[3])).concat(1);
  const luminance = c => c.slice(0, 3).map(v => { v /= 255; return v <= .04045 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4; }).reduce((s, v, i) => s + v * [.2126, .7152, .0722][i], 0);
  const selector = el => `${el.tagName.toLowerCase()}${el.id ? '#' + el.id : ''}${typeof el.className === 'string' && el.className ? '.' + el.className.trim().split(/\s+/).join('.') : ''}`;
  const visible = el => {
    for (let p = el; p; p = p.parentElement) {
      const s = getComputedStyle(p);
      if (s.display === 'none' || s.visibility !== 'visible' || Number(s.opacity) === 0 || p.hidden) return false;
    }
    return true;
  };
  const contrast = { assessed: 0, excluded: 0, unassessed: [], failures: [], minimumRatio: null };
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) {
    const node = walker.currentNode, el = node.parentElement;
    const text = node.textContent.replace(/\s+/g, ' ').trim();
    if (!text || !el || el.closest('script,style,template,video,svg,button:disabled,input:disabled,select:disabled,textarea:disabled,fieldset:disabled,[aria-disabled="true"]') || !visible(el)) { contrast.excluded++; continue; }
    const range = document.createRange(); range.selectNodeContents(node);
    const rects = [...range.getClientRects()].filter(r => r.width > 0 && r.height > 0);
    if (!rects.some(r => r.right > 0 && r.left < innerWidth && r.bottom > 0 && r.top < document.documentElement.scrollHeight)) { contrast.excluded++; continue; }
    const chain = []; for (let p = el; p; p = p.parentElement) chain.unshift(p);
    let bg = [255, 255, 255, 1], opacity = 1, uncertain = null;
    for (const p of chain) {
      const s = getComputedStyle(p), c = rgba(s.backgroundColor);
      opacity *= Number(s.opacity);
      if (c?.[3] === 1) uncertain = null;
      if (s.backgroundImage !== 'none') uncertain = 'background image/gradient';
      if (s.mixBlendMode !== 'normal' || s.filter !== 'none' || s.backdropFilter !== 'none') uncertain = 'filter/blending';
      if (c) bg = over(c, bg);
    }
    const s = getComputedStyle(el), color = rgba(s.color);
    const entry = { text: text.slice(0, 180), element: selector(el) };
    if (!color || uncertain || opacity !== 1) { contrast.unassessed.push({ ...entry, reason: uncertain || (opacity !== 1 ? 'group opacity requires paint-level compositing' : 'unsupported color syntax') }); continue; }
    const fg = over(color, bg), a = luminance(fg), b = luminance(bg);
    const ratio = (Math.max(a, b) + .05) / (Math.min(a, b) + .05);
    const large = parseFloat(s.fontSize) >= 24 || (parseFloat(s.fontSize) >= 18.6667 && parseInt(s.fontWeight) >= 700);
    const required = large ? 3 : 4.5;
    contrast.assessed++;
    contrast.minimumRatio = Math.min(contrast.minimumRatio ?? Infinity, ratio);
    if (ratio + .001 < required) contrast.failures.push({ ...entry, ratio, required, foreground: s.color, background: bg, fontSize: s.fontSize, fontWeight: s.fontWeight });
  }
  const overflow = { viewport: innerWidth, document: document.documentElement.scrollWidth, body: document.body.scrollWidth };
  overflow.elements = [...document.body.querySelectorAll('*')].filter(el => {
    if (!visible(el) || el.closest('video,svg')) return false;
    const r = el.getBoundingClientRect(); return r.width && (r.right > innerWidth + 1 || r.left < -1);
  }).slice(0, 25).map(el => ({ element: selector(el), left: el.getBoundingClientRect().left, right: el.getBoundingClientRect().right }));
  return { overflow, contrast };
}

async function focusState(page) {
  return page.evaluate(() => {
    const e = document.activeElement, s = getComputedStyle(e), r = e.getBoundingClientRect();
    return { text: e.textContent.trim().slice(0, 100), tag: e.tagName, href: e.getAttribute('href'), focusVisible: e.matches(':focus-visible'), indicator: (s.outlineStyle !== 'none' && parseFloat(s.outlineWidth) > 0 && !s.outlineColor.endsWith(', 0)')) || s.boxShadow !== 'none', inViewport: r.width > 0 && r.height > 0 && r.left >= 0 && r.right <= innerWidth + 1 && r.top >= 0 && r.bottom <= innerHeight + 1, inPrimary: !!e.closest('nav[aria-label="Primary navigation"]') };
  });
}
async function keyboard(page) {
  await page.evaluate(() => { document.activeElement?.blur(); scrollTo(0, 0); });
  await page.keyboard.press('Tab');
  const skip = await focusState(page);
  assert.ok(skip.href?.startsWith('#') && /skip/i.test(skip.text) && skip.focusVisible && skip.indicator && skip.inViewport, `First Tab must reveal skip link: ${JSON.stringify(skip)}`);
  await page.keyboard.press('Enter');
  const target = await page.evaluate(() => ({ active: document.activeElement.id, hash: location.hash, main: !!document.activeElement.closest('main') }));
  assert.ok(target.main && target.active === skip.href.slice(1), `Skip must focus main: ${JSON.stringify(target)}`);
  // Reset sequential focus starting point by focusing the skip, then use real Tab events.
  await page.locator(`a[href="${skip.href}"]`).first().focus();
  const sequence = [];
  for (let i = 0; i < 12 && sequence.length < 6; i++) {
    await page.keyboard.press('Tab');
    const state = await focusState(page);
    if (state.inPrimary) {
      assert.ok(state.focusVisible && state.indicator && state.inViewport, `Navigation focus: ${JSON.stringify(state)}`);
      sequence.push(state);
    }
  }
  assert.deepEqual(sequence.map(s => s.text), ['Home', 'Projects', 'Software', 'Security', 'Systems', 'Education'], 'Primary links must be reachable in DOM order');
  await page.keyboard.press('Shift+Tab');
  assert.equal((await focusState(page)).text, 'Systems', 'Reverse Tab order');
  return { skip, target, sequence, reverseTab: true };
}

const browser = await chromium.launch({ channel: 'chrome', headless: true });
try {
  for (const route of routes) {
    for (const width of [...widths, 640]) {
      const scope = `${route} @ ${width}`;
      const result = { route, width, mode: width === 640 ? '200%-zoom-equivalent' : 'normal', startedAt: new Date().toISOString(), errors: [] };
      const context = await browser.newContext({ viewport: { width, height: 1000 }, reducedMotion: 'reduce', serviceWorkers: 'block' });
      const page = await context.newPage();
      const mp4 = [];
      page.on('request', r => { if (/\.mp4(?:[?#]|$)/i.test(r.url())) mp4.push(r.url()); });
      page.on('pageerror', e => result.errors.push(e.message));
      const cdp = await context.newCDPSession(page);
      await cdp.send('Network.enable'); await cdp.send('Network.setCacheDisabled', { cacheDisabled: true });
      const transfers = new Map();
      cdp.on('Network.responseReceived', e => transfers.set(e.requestId, { url: e.response.url, type: e.type, mime: e.response.mimeType, bytes: null }));
      cdp.on('Network.loadingFinished', e => { if (transfers.has(e.requestId)) transfers.get(e.requestId).bytes = e.encodedDataLength; });
      try {
        const response = await page.goto(origin + route, { waitUntil: 'networkidle', timeout: 45000 });
        result.status = response.status(); result.etag = response.headers().etag; result.lastModified = response.headers()['last-modified'];
        assert.equal(result.status, 200, 'HTTP status');
        await page.evaluate(() => document.fonts.ready);
        Object.assign(result, await page.evaluate(inspect));
        if (result.overflow.document > width + 1 || result.overflow.body > width + 1) fail(scope, 'Horizontal overflow', result.overflow);
        if (result.contrast.failures.length) fail(scope, `${result.contrast.failures.length} approximate solid-background text contrast failures`, result.contrast.failures);
        result.keyboard = await keyboard(page);
        if (route === '/') {
          const resources = [...transfers.values()];
          result.homeTransfer = { cssBytes: resources.filter(r => r.type === 'Stylesheet' || /text\/css/.test(r.mime)).reduce((n, r) => n + (r.bytes || 0), 0), jsBytes: resources.filter(r => r.type === 'Script').reduce((n, r) => n + (r.bytes || 0), 0), resources, timing: await page.evaluate(() => performance.getEntriesByType('resource').map(r => ({ url: r.name, transferSize: r.transferSize, encodedBodySize: r.encodedBodySize }))) };
        }
        // Scroll all content to expose intersection-observer eager media, without pressing play.
        await page.evaluate(async () => { for (let y = 0; y < document.documentElement.scrollHeight; y += 800) { scrollTo(0, y); await new Promise(r => setTimeout(r, 15)); } scrollTo(0, 0); });
        await page.waitForTimeout(100);
        result.mp4BeforeInteraction = [...new Set(mp4)];
        assert.equal(mp4.length, 0, 'No eager MP4 requests, including after scrolling');
        if (width === 640) {
          result.textResize = await page.evaluate(async () => {
            const elements = [...document.querySelectorAll('body, body *')].filter(e => !e.closest('svg,video,script,style'));
            const sizes = elements.map(e => parseFloat(getComputedStyle(e).fontSize));
            elements.forEach((e, i) => e.style.setProperty('font-size', `${sizes[i] * 2}px`, 'important'));
            await document.fonts.ready;
            return { factor: 2, bodyFont: getComputedStyle(document.body).fontSize, scrollWidth: document.documentElement.scrollWidth, clippedTextContainers: elements.filter(e => { const s = getComputedStyle(e); return e.textContent.trim() && ((['hidden', 'clip'].includes(s.overflowX) && e.scrollWidth > e.clientWidth + 1) || (['hidden', 'clip'].includes(s.overflowY) && e.scrollHeight > e.clientHeight + 1)); }).map(e => ({ tag: e.tagName, class: e.className, text: e.textContent.trim().slice(0, 80) })).slice(0, 30) };
          });
          if (result.textResize.scrollWidth > width + 1 || result.textResize.clippedTextContainers.length) fail(scope, '200% text resizing overflow/clipping', result.textResize);
        }
        assert.equal(result.errors.length, 0, 'Uncaught browser errors');
      } catch (e) { fail(scope, e.message); }
      finally {
        report.results.push(result); await save(); await context.close();
        console.log(`${scope}: ${report.failures.some(f => f.scope === scope) ? 'FAIL' : 'PASS'}`);
      }
    }
  }
  // Only ephemeral in-browser UI changes: no writes to application files or backend.
  for (const width of [390, 1440]) {
    const page = await browser.newPage({ viewport: { width, height: 1000 }, reducedMotion: 'reduce' });
    try {
      let ecosystemFound = false, editorFound = false;
      for (const route of ['/', '/projects/', '/software/', '/projects/visual-lab/']) {
        await page.goto(origin + route, { waitUntil: 'networkidle' });
        if (!ecosystemFound && await page.locator('[data-ecosystem]').count()) {
          const buttons = page.locator('[data-ecosystem] [data-group]');
          for (let i = 0; i < await buttons.count(); i++) {
            const button = buttons.nth(i), group = await button.getAttribute('data-group');
            await button.focus(); await page.keyboard.press(i % 2 ? 'Space' : 'Enter');
            assert.equal(await button.getAttribute('aria-pressed'), 'true');
            assert.equal(await page.locator('[data-ecosystem] [aria-pressed="true"]').count(), 1);
            const states = await page.locator('[data-ecosystem-group]').evaluateAll(nodes => nodes.map(n => ({ group: n.dataset.ecosystemGroup, visible: getComputedStyle(n).display !== 'none', hidden: n.hidden })));
            assert.ok(states.every(s => s.visible === (group === 'all' || s.group === group) && s.hidden !== s.visible), 'Filter must update actual visibility and hidden state');
            assert.ok(await button.evaluate(e => e === document.activeElement), 'Filter retains focus');
          }
          ecosystemFound = true; report.interactions.push({ width, route, ecosystemKeyboardFilters: true });
        }
        if (!editorFound && await page.locator('[data-construction-study]').count()) {
          const editor = page.locator('[data-construction-study]');
          const activate = async selector => { await editor.locator(selector).focus(); await page.keyboard.press('Enter'); };
          assert.equal(await editor.locator('[data-layers] > *').count(), 0);
          assert.ok(await editor.locator('[data-undo]').isDisabled());
          await editor.locator('[data-shape]').selectOption('rect');
          await editor.locator('[data-color]').fill('#123456');
          await activate('[data-add]');
          assert.equal(await editor.locator('[data-layers] rect').count(), 1);
          assert.equal(await editor.locator('[data-layers] rect').getAttribute('fill'), '#123456');
          await activate('[data-add]'); await activate('[data-undo]');
          assert.equal(await editor.locator('[data-layers] > *').count(), 1);
          await activate('[data-reset]');
          assert.equal(await editor.locator('[data-layers] > *').count(), 0);
          assert.ok(await editor.locator('[data-undo]').isDisabled());
          assert.match(await editor.locator('[data-scene-status]').textContent(), /0 layers/);
          editorFound = true; report.interactions.push({ width, route, layerEditorAddUndoReset: true, shapeAndColor: true });
        }
      }
      assert.ok(ecosystemFound, 'Ecosystem not found'); assert.ok(editorFound, 'Layer editor not found');
    } catch (e) { fail(`interactions @ ${width}`, e.message); }
    finally { await page.close(); await save(); }
  }
} finally {
  await browser.close(); report.finishedAt = new Date().toISOString(); await save();
}
console.log(`Report: ${path.join(out, 'report.json')} — ${report.results.length} layouts; ${report.failures.length} failure groups`);
assert.equal(report.failures.length, 0, 'Focused browser validation failed; see report.json');