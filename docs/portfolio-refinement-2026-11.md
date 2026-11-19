# ICY TECH — portfolio refinement / November 19, 2026

## Scope and checkpoint

Started from production `d869245` (including the screenshot-preservation follow-up), on isolated branch `portfolio-refinement-preview-20261119`. The original dirty portfolio checkout and every underlying application remain untouched. GitHub Pages workflow, domain configuration, résumé PDFs, navigation destinations, existing project routes, education records and demonstration media are preserved.

## Design decisions

- Use the requested “Software, systems, and ideas made functional.” headline, supported by the requested first-person description. Reduce hero height without hiding professional navigation or career links.
- Keep system fonts, the technical grid, cyan and lime; use a restrained dark surface hierarchy throughout the shared layout. No new fonts, dependencies, hero animations or decorative objects.
- Present Build / Connect / Verify as a sequence, not metrics. Use the supplied descriptions verbatim.
- Add small numbered section labels and fine rules. Work, academic references and personal context use different visual treatments, without a card behind every heading.
- Preserve original screenshots and all five native players (one reel plus four case demonstrations). Use existing demo posters for cards that previously lacked an image; do not fetch video to create decorative previews.
- Keep range grounded: application development, AI integration and automation are the main project practice; cybersecurity coursework and infrastructure projects support junior-role positioning without implying equivalent professional experience in every specialty.

## CERT ENGINE provenance

The public standalone response at `https://cert.icyclearer.com/` matched `E:\PROJECTS\icyclearer-cert\index.html` byte-for-byte during inspection. SHA-256: `c8a3321186e70dfb2e6a5b45e1c7d6846c131850b701b54867fd2fffe598d9b1`.

The deployed application is one HTML document with inline CSS, JavaScript and JSON, using localStorage and download APIs. It contains 519 unique, structurally complete question/answer/explanation records across five domains and 28 numbered objectives. Verified browser behavior: search, objective filters, recall/reveal, bookmarks persisted across reload, four fixed-interval self-ratings, full-bank export, and a saved HTML copy opened offline. No item-by-item factual audit was performed. Not an official or endorsed CompTIA product. No claim of installable PWA, hosted offline reload, adaptive review algorithm, automatic cross-device sync or complete subtopic coverage.

The separate `D:\ICY-Cert-Engine` Node/SQLite/Ollama source is **not** the deployed standalone application. Its generation and synchronization features are deliberately excluded from the public case description. Import/reset/clipboard controls were inspected but not exercised.

Public-only screenshots and inspection evidence are retained outside the source tree at `E:\PROJECTS\portfolio-refinement-evidence\cert`. The published project image shows a fresh browser session, not personal progress.

## Review deployment boundary

The review is a separate static Vercel project, `icy-tech-refinement-preview`, with no custom production domain and no Git integration. Built Astro output is staged outside the portfolio worktree. Preview-only headers set `X-Robots-Tag: noindex, nofollow`; preview robots disallow crawling. `scripts/make-refinement-review.mjs` generates a comparison page **only in that staging output**, never as a portfolio production route. The initial deployment in a new Vercel project may be classified by Vercel as its production deployment; this means production of the isolated preview project, not the live ICY TECH site.

Do not merge to main, run Pages workflow_dispatch, promote to tech.icyclearer.com, or alter DNS until the owner approves the preview.

## Reproduce validation

From the refinement worktree:

```powershell
npm test
npm run build
npm run preview -- --host 127.0.0.1 --port 4367
node scripts/verify-tech.mjs http://127.0.0.1:4367 refinement-local
node scripts/verify-demos.mjs http://127.0.0.1:4367 refinement-demos
node scripts/verify-refinement.mjs http://127.0.0.1:4367 refinement-quality
node scripts/capture-refinement.mjs http://127.0.0.1:4367 after
```

Repeat browser checks against the isolated public preview. Screenshots, browser results, response checks and performance/resource evidence live under ignored `validation-output/`. All mobile testing is browser emulation, not a physical Samsung device. Contrast sampling is a focused computed-style check, not a full accessibility certification or screen-reader audit. Resource checks establish unchanged lazy media delivery and a lightweight page shell; they are not a statistically controlled real-device performance benchmark.

## Validation outcome

- Astro build: 36 pages, successful. Existing ten tests plus three new refinement tests: 13 passed.
- Full local and public preview audit: 80 route/viewport combinations, 100 internal links, zero failures. Résumé bytes verified against local originals.
- Focused local and public quality audit: 56 layouts each, zero failure groups; widths 360, 390, 430, 768, 1280, 1440, 1920 plus 640px reflow. Includes keyboard skip/navigation, focus, text enlargement, computed-style contrast sampling, overflow, resource delivery and interactive examples.
- Published demo verification: 15 player/viewport combinations, including play/pause/seek/fullscreen/caption behavior. Existing demonstration assets are unchanged in Git.
- Independently reviewed legacy editorial templates and corrected inherited foreground/background pairings. Sampled legacy pages and six primary pages returned zero computed-contrast failures in the review script.
- Captured actual production-before and revised-after layouts for all six primary pages at 390, 768 and 1440px; full-page capture explicitly loads lazy images so the screenshot comparison does not omit below-fold work.
- No new runtime packages or external fonts. Initial homepage still does not fetch MP4 data before interaction. The local compressed shared stylesheet increased by roughly 0.6 KB in the measured capture; not a significant delivery change. Hosted transfer numbers vary by cache and compression.
- Initial quality runs overlapped an Astro rebuild and observed transient local 404s; both complete stable-build reruns passed. These were not suppressed or counted as successful checks.

Review URL: `https://icy-tech-refinement-preview.vercel.app/`.
Actual screenshot comparison: `https://icy-tech-refinement-preview.vercel.app/refinement-review/`.

The owner must approve before production publication. `main` remained at `d869245` during verification.