# Portfolio Progress

## September 20, 2026 — Connected Inquiry runtime verification

### Runtime requirements confirmed

- Docker Desktop was unavailable, but Docker was not required by the active local startup configuration.
- The working stack used:
  - the existing frontend command `npm run dev -- --host localhost --port 5173`;
  - the existing backend virtual environment with `python -m uvicorn app.main:app --host 127.0.0.1 --port 8001`;
  - the already-running native Ollama service with `gemma3:4b`;
  - an isolated Chroma directory and isolated SQLite database in a retained, local-only temporary runtime outside every repository.
- No packages were installed, no source database was reset, and Docker Desktop did not need to be opened.

### Connected inquiry verified

- Updated the current frontend so its primary **Investigate** action uses the backend’s documented `POST /api/investigate` route rather than the non-persisting reasoning route.
- Added centralized normalization between the backend Investigation schema (`original_question`, `brief`, `report`) and the frontend records view.
- Ran one retained inquiry through the interface: “Recall the watering rule for the public demonstration pollinator garden.”
- Used three synthetic, nonprivate garden notes in a dedicated Chroma collection with external retrieval disabled.
- The interface received HTTP 200, retrieved 3 chunks, selected 3 chunks, displayed all three evidence records, and returned the watering rule using local Ollama `gemma3:4b`.
- FastAPI persisted exactly one version-1 SQLite investigation containing the question, policy, scope, four search queries, nine pipeline stages, answer, and three sources.
- Reloaded the investigation through the frontend’s Investigation Records view; the saved question, model, retrieval counts, pipeline stages, answer, and sources were visible with no console errors or failed requests.
- Runtime evidence remains in the retained local-only temporary runtime and is intentionally excluded from source control and publication.

### Portfolio updates

- Replaced the prior configured frontend-only desktop/mobile images with connected result captures.
- Added `public/images/projects/inquiry/saved-investigation.png` to show the persisted backend record in the frontend.
- Rewrote the verified-run section and runtime boundary to reflect the stack and evidence that actually ran.
- Current local backend tests: 22 passed with one Starlette deprecation warning.
- Current frontend production build: passed.
- Portfolio production build: passed with all seven static routes generated.
- Production-preview validation: all 14 route/viewport combinations passed at 1440×1000 and 390×844, including HTTP status, headings, images, GitHub Pages base paths, typography, overflow, console/network failures, and screenshot-viewer behavior.
- The updated Inquiry desktop/mobile case-study captures and homepage desktop/mobile captures were visually reviewed with no regressions found.
- The updated portfolio preview remains available at `http://localhost:4321/chad-hamilton-portfolio/`.
- No commit, push, or deployment was performed.

## September 20, 2026 — Inquiry Engine flagship case study

### Completed

- Added Inquiry Engine as a second flagship project alongside Energy Engine on the homepage.
- Added `/chad-hamilton-portfolio/projects/inquiry-engine/` with:
  - a plain-language product explanation;
  - fresh desktop and mobile captures of the current Inquiry Observatory interface;
  - a verified request → mode/scope/policy → retrieval → model → response → persistence example;
  - an implementation-based architecture diagram;
  - engineering decisions, active/historical boundaries, technologies in context, and the public backend link.
- Investigated the public `icyNatural/inquiry-backend-omen` implementation and compared it with the separate local backend working tree without modifying either source application.
- Verified that the current frontend uses a configurable typed client for the FastAPI routes while richer workspace artifacts remain browser-local by default.
- Omitted a live-app link because the only recovered Lovable address was an internal preview shell, not a verified public application.
- Preserved the approved portfolio design, typography, image viewer, GitHub Pages base path, and existing project content.

### Runtime and test evidence

- Public backend test suite: 19 passed, with one Starlette deprecation warning.
- Current frontend production build: passed.
- Isolated end-to-end backend example completed with local Ollama `gemma3:4b` and an empty isolated Chroma store.
  - The engine retrieved zero chunks, labeled the model-knowledge fallback, returned a real response, and persisted a version-1 SQLite investigation.
  - No private notes or fabricated retrieval results were used.

### New imagery

- `public/images/projects/inquiry/desktop-interface.png` — 1440×1000 frontend-only configured inquiry.
- `public/images/projects/inquiry/mobile-interface.png` — 390×844 frontend-only configured inquiry.

### Validation

- Production build passed with all seven static routes generated.
- Production-preview validation passed for all 14 route/viewport combinations:
  - seven routes at 1440×1000 desktop and 390×844 mobile;
  - HTTP 200, headings, images, base-path links, body type size, horizontal overflow, console/network errors, and all screenshot-viewer interactions passed;
  - Inquiry reported no broken images, bad internal links, overflow, console errors, or failed requests at either viewport.
- Homepage and Inquiry desktop/mobile captures were visually reviewed after validation.
- Production preview confirmed at `http://localhost:4321/chad-hamilton-portfolio/` and left running.
- No push or deployment was performed.

## September 20, 2026 — Live-application case studies

### Completed

- Reframed the homepage around five selected systems:
  - Energy Engine
  - Semantic Archaeology
  - Photogression
  - Sun · Earth · Horizon
  - IcySense
- Removed Inquiry Engine and Potent Lexicon from the public homepage, project routes, next-project navigation, active source, and publicly served image assets. Their prior source remains recoverable through Git history.
- Added concise case-study pages for Semantic Archaeology, Photogression, Sun · Earth · Horizon, and IcySense.
- Added direct links from each new case study to its live application.
- Added a reusable `LiveProjectCase.astro` component for shared case-study structure while keeping project-specific copy and imagery.
- Rewrote Energy Engine’s visitor-facing copy without changing its approved page structure or screenshot sequence.
- Replaced audit/process language in public presentation with direct descriptions of product purpose, actions, implementation, and distinguishing qualities.
- Preserved the configured GitHub Pages base path: `/chad-hamilton-portfolio`.
- Captured fresh desktop and mobile landing states for IcySense, Raw Reality, Icy Lab, and Photogression; reviewed same-day captures for Semantic Archaeology and Sun · Earth · Horizon.
- Kept Raw Reality and Icy Lab out of the flagship homepage set because their current empty states were less representative than the five selected case studies.

### Public routes

- `/chad-hamilton-portfolio/`
- `/chad-hamilton-portfolio/projects/energy-engine/`
- `/chad-hamilton-portfolio/projects/semantic-archaeology/`
- `/chad-hamilton-portfolio/projects/photogression/`
- `/chad-hamilton-portfolio/projects/sun-earth-horizon/`
- `/chad-hamilton-portfolio/projects/icysense/`

### Application imagery

- Energy Engine: `public/images/projects/energy/`
- Semantic Archaeology: `public/images/projects/semantic-archaeology/`
- Photogression: `public/images/projects/photogression/`
- Sun · Earth · Horizon: `public/images/projects/wonder/`
- IcySense: `public/images/projects/icysense/`

Capture metadata and internal review notes remain in `docs/capture-reports/`.

### Validation status

- Production build: passed on September 20, 2026 with `npm run build`.
- Production-preview validation: passed for all 12 route/viewport combinations in `scripts/validate-portfolio.mjs`.
  - Six routes at 1440×1000 desktop and 390×844 mobile.
  - Checks include HTTP 200 responses, non-empty primary headings, loaded images, GitHub Pages base-path links, console errors, failed requests, and horizontal overflow.
- A mobile overflow found on the IcySense heading was corrected with case-study-specific responsive type sizing and grid min-width handling.
- Generated screenshots in `validation-output/` were visually reviewed for the homepage and all new case-study heroes; Energy’s desktop/mobile presentation was also rechecked after the copy changes.
- No commit, push, deployment, archive audit, or broad repository discovery was performed.

### Local preview

- Production preview confirmed at `http://localhost:4321/chad-hamilton-portfolio/` with HTTP 200.
- Preview intentionally left running after validation.

## September 20, 2026 — Proportion, readability, and screenshot-viewer polish

### Completed

- Reduced the homepage hero heading by roughly 25–30% at desktop sizes, widened its measure, and changed the opening composition from a tall stack of short lines to four balanced lines at 1440×1000.
- Rebalanced the homepage hero so its description, primary action, and complete Energy Engine image are visible together at 1440×1000.
- Reduced section, case-study, featured-project, and mobile heading scales proportionally while preserving the Newsreader-led editorial character.
- Raised main desktop body copy to 17px with a more comfortable line height; maintained a 16px minimum on mobile.
- Improved supporting-copy, caption, and metadata legibility without indiscriminately enlarging navigation, eyebrows, tags, or other labels.
- Tightened shared section padding, heading gaps, case-study hero spacing, and screenshot-pair spacing while retaining breathing room around application imagery.
- Added an accessible full-size viewer to every `EvidenceFrame` screenshot:
  - Mouse/touch and keyboard activation.
  - Native dialog behavior with Escape-to-close.
  - Visible close button and focus return to the activating screenshot.
  - Zoom-in and zoom-out controls, scrollable overflow, pinch-zoom support, and preserved image aspect ratios.
  - A direct original-image link both below each screenshot and inside the viewer.
- Kept homepage project-image links as project navigation; screenshot enlargement is presented only as a separately labeled `Enlarge` control.
- Preserved the configured GitHub Pages base path: `/chad-hamilton-portfolio`.

### Validation status

- Production build passed on September 20, 2026 with `npm run build`.
- Production-preview validation passed for all 12 route/viewport combinations at 1440×1000 and 390×844.
- Validation now checks HTTP status, headings, loaded images, base-path links, console/network failures, horizontal overflow, minimum body font size, viewer keyboard opening, Escape closing, visible-close behavior, original-image fallback, and focus return after both close paths.
- Homepage, Energy Engine, and IcySense desktop/mobile captures were visually reviewed for heading wrapping, body readability, image sizing, spacing, and overflow.
- The viewer was visually checked open at both target viewport sizes with its controls and scrollable image area visible.
- Results are stored as UTF-8 JSON in `validation-output/validation-report.json`.
- No push or deployment was performed.