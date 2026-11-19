import fs from 'node:fs/promises';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
const root = process.cwd();
const target = process.argv[2];
if (!target || !path.isAbsolute(target)) throw new Error('Supply an absolute preview-only static-output path');
const out = path.join(target, 'refinement-review');
await fs.mkdir(out, { recursive: true });
for (const state of ['before', 'after']) {
  for (const width of [390, 1440]) {
    for (const kind of ['home', 'home-fold']) {
      execFileSync('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-y', '-i', path.join(root, 'validation-output', 'refinement', state, `${kind}-${width}.png`), '-frames:v', '1', '-q:v', '3', path.join(out, `${state}-${kind}-${width}.jpg`)]);
    }
  }
}
await fs.writeFile(path.join(out, 'index.html'), `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>ICY TECH — original / revised comparison</title>
<style>*{box-sizing:border-box}body{margin:0;background:#10191e;color:#e8eee9;font:16px/1.65 system-ui,sans-serif}main{width:min(1500px,calc(100% - 40px));margin:40px auto}h1{font-size:clamp(2rem,4vw,3.5rem);line-height:1.1;letter-spacing:-.04em}h2{margin-top:3rem}a{color:#7ee9ef}a:focus-visible,summary:focus-visible{outline:3px solid #dcff6b;outline-offset:5px}.pair{display:grid;grid-template-columns:1fr 1fr;gap:20px}figure{margin:0;min-width:0}img{display:block;width:100%;height:auto;border:1px solid #415861}figcaption{padding:10px 0;color:#b0c0c5}.phone{max-width:850px}.phone img{max-width:390px}summary{cursor:pointer;padding:16px 0;color:#7ee9ef}li{margin:.4rem 0}.note{border-left:2px solid #7ee9ef;padding:0 20px;max-width:85ch}@media(max-width:650px){.pair{grid-template-columns:1fr}.phone img{max-width:100%}}</style></head><body><main>
<p>ICY TECH / November 19, 2026 / review only</p><h1>Same work.<br>A more deliberate presentation.</h1>
<p><a href="/">Explore the revised portfolio →</a></p><div class="note"><p>These are actual browser screenshots, not mockups. Original captures are from tech.icyclearer.com before edits. Revised captures are from the built preview. Both use identical viewport sizes: 1440 × 1000 and 390 × 1000. Production remains unchanged.</p></div>
<ul><li>Preferred headline and first-person description; a shorter hero brings recorded work into view sooner.</li><li>Dark working surfaces, fine dividers, restrained cyan/lime, and numbered labels replace repeated cream-card sections.</li><li>Build / Connect / Verify are aligned process descriptions rather than statistics.</li><li>Original demonstrations, screenshots, project routes, education and résumé links are preserved.</li><li>CERT ENGINE joins the project index and Security track with accurate standalone/offline limits.</li></ul>
${[1440,390].map(width => `<section><h2>${width === 1440 ? 'Desktop' : 'Mobile'} / first viewport</h2><div class="pair ${width === 390 ? 'phone' : ''}">${['before','after'].map(state => `<figure><figcaption>${state === 'before' ? 'Original production' : 'Revised preview'} · ${width}px</figcaption><a href="${state}-home-fold-${width}.jpg"><img src="${state}-home-fold-${width}.jpg" width="${width}" height="1000" alt="Actual ${state} homepage screenshot at ${width}px width" loading="lazy"></a></figure>`).join('')}</div><details><summary>Compare full-page screenshots</summary><div class="pair ${width === 390 ? 'phone' : ''}">${['before','after'].map(state => `<figure><figcaption>${state === 'before' ? 'Original production' : 'Revised preview'} · full page</figcaption><a href="${state}-home-${width}.jpg"><img src="${state}-home-${width}.jpg" alt="Full ${state} homepage screenshot at ${width}px width" loading="lazy"></a></figure>`).join('')}</div></details></section>`).join('')}
<p>Mobile captures use Chromium responsive emulation, not a physical Samsung device. This comparison page exists only in the isolated review deployment; it is not part of the portfolio’s production source routes.</p></main></body></html>`);
console.log(`Wrote screenshot comparison to ${out}`);