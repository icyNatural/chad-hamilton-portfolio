# Portfolio Plan

> Proposal only. Implementation is blocked until the Phase 1 inventory and mapping are approved.

## Objective

Rebuild the Astro portfolio as an evidence-led systems portfolio: clear project identities, honest maturity labels, strong visual proof, concise case studies, and accessible/responsive delivery. The redesign must use verified repository facts and approved assets rather than extrapolating from filenames or generated imagery.

## Required approval gate

Before any redesign, route change, media copy, or neighboring-repository edit:

1. Approve or correct `docs/asset-inventory.md`.
2. Resolve the six identity/provenance questions in `docs/project-content-map.md`.
3. Approve the featured-project shortlist and public-disclosure boundaries.
4. Confirm whether generated artwork may appear and how it must be labeled.
5. Confirm which external repositories, demos, and deployments may be linked.

## Recommended information architecture

### Home

- Concise positioning statement grounded in verified work.
- Three to five flagship systems with real interface evidence.
- Capability groups supported by projects, not generic skill lists.
- Selected research/experiments separated from shipped products.
- Clear contact and GitHub links.

### Work index

Filter by honest status:

- **Working prototype**
- **Static product demonstration**
- **Research system**
- **Module / experiment**
- **Needs evidence** (internal only; do not publish as featured work)

Suggested initial public set, subject to approval:

1. Energy Engine
2. IcySense
3. Icy Game OS
4. Inquiry/Cognitive Mode system (after naming clarification)
5. Human State Atlas (after screenshot provenance confirmation)
6. Potent Lexicon/Library (after naming clarification)

### Case-study template

Each case study should use the same evidence hierarchy:

1. **What it is** — one factual sentence.
2. **Status** — prototype, static demo, research, or module.
3. **Problem / intent** — based on README/source evidence.
4. **System model** — architecture or interaction flow.
5. **What works now** — explicitly separate implemented features from roadmap.
6. **Evidence gallery** — clean product captures with descriptive captions.
7. **Constraints / limitations** — e.g., IcySense’s demo classifier.
8. **Repository / demo links** — only verified URLs.
9. **Related systems** — qualified relationships, not merged identities.

### Research index

Use for Human Operating System, Autonomic Regulation Model, Day State, Language Execution Framework, and other documented modules. Research references and third-party material belong here only with attribution, never mixed into owned project galleries.

### About / capabilities

Derive claims from the audited work:

- Astro/React and static deployment;
- Python/API prototyping;
- PowerShell/local automation;
- state, language, and interaction-system modeling;
- documentation and experimental systems design.

Cybersecurity should remain a capability only if the owner supplies verifiable evidence; it should not become a case study based on the current audit.

## Visual direction

- Preserve the dark systems aesthetic only where it improves hierarchy and readability.
- Let each project’s actual UI provide color and character; do not cover weak evidence with decorative generated art.
- Use generated icy-eye/snowflake exploration, if approved, as clearly labeled brand/process material—not as UI screenshots.
- Prefer one strong hero image plus two to four workflow/detail images per case study.
- Crop out browser chrome, personal account details, local paths, prompts, and unrelated windows during the future asset-preparation phase.
- Never upscale thumbnails or narrow text strips into hero images.

## Content and evidence workflow

### Phase 2 — owner decisions

- Resolve project naming and relationships.
- Mark every proposed asset: approve, reject, redact, or recapture.
- Confirm authorship/attribution for Word2Vec and all third-party reference captures.
- Select canonical repository and URL for every public project.

### Phase 3 — asset preparation

- Copy only approved source files into a deliberate portfolio asset structure.
- Preserve originals; create web derivatives rather than modifying source evidence.
- Redact sensitive information before publication.
- Generate responsive AVIF/WebP derivatives with PNG/JPEG fallbacks as needed.
- Record alt text, captions, provenance, crop, and project association in a content manifest.
- Remove duplicate copies from the publication set, not from neighboring repositories.

### Phase 4 — Astro content model

Create a typed collection (or equivalent verified Astro 6 pattern) with fields such as:

- slug and title;
- one-line description;
- status and date range;
- role / authorship;
- stack;
- verified features;
- limitations;
- repository and demo URLs;
- hero/gallery assets with alt text and provenance;
- related systems;
- featured flag.

Do not embed the project catalog directly in `src/pages/index.astro` as it is today.

### Phase 5 — implementation

- Establish shared layout, header/footer, project cards, evidence gallery, status badge, and case-study components.
- Build home, work index, case-study routes, research index, and about/contact.
- Preserve the configured GitHub Pages base path.
- Add metadata, canonical URLs, Open Graph images, sitemap/robots decisions, and structured data where appropriate.
- Keep JavaScript optional for core content and navigation.

### Phase 6 — validation

- Production build and Astro checks.
- Keyboard navigation and visible focus.
- Semantic heading/landmark audit.
- Color contrast and reduced-motion checks.
- Responsive checks at small mobile, tablet, laptop, and wide desktop widths.
- Broken-link and missing-asset checks under the configured base path.
- Image dimension/aspect-ratio and cumulative-layout-shift review.
- Content audit ensuring roadmap items are not described as implemented.
- Final Git diff limited to approved portfolio changes.

## Asset acquisition backlog

| Priority | Project | Needed evidence |
|---:|---|---|
| 1 | Icy Game OS | Restore or replace eight missing referenced images; capture a clean end-to-end state interaction. |
| 2 | IcySense | Clean phone-sized camera → scan → result → history sequence; label demo classifier limitation. |
| 3 | Inquiry/Cognitive Mode | Canonical naming plus repository-owned screenshots for multiple modes and the continuity/retrieval flow. |
| 4 | Human State Atlas | Current app captures tied directly to the repository and a non-template README. |
| 5 | Day State / Scenario States | State-selection, persistence, and JSON-export workflow; validate deployment. |
| 6 | Autonomic Regulation Model | Clean interactive-model capture after deployment QA. |
| 7 | Ancient Human Energy Lab | Exact identity, repository/content boundary, and original visual evidence. |
| 8 | Life Chronicle | Exact identity and real logging/timeline workflow evidence. |
| 9 | Icy Chaos Engine | Repository, explanation, and product proof; otherwise omit. |
| 10 | Cybersecurity | An attributable project, scope, role, safe screenshots, and results; otherwise capability only. |

## Explicit non-goals for the current phase

- No redesign or component implementation.
- No route or content-collection changes.
- No media copying, conversion, deletion, or renaming.
- No edits to neighboring repositories.
- No deployment changes.
- No fabricated project relationships, metrics, user outcomes, integrations, or completion claims.

## Definition of ready for redesign

Redesign may begin only when:

- every featured project has a verified identity and honest status;
- each featured project has at least one approved, attributable, legible visual;
- ambiguous aliases and repository relationships are resolved or explicitly disclosed;
- sensitive/third-party/generated material has a publication decision;
- **needs assets** projects are either supplied with evidence or removed from the featured scope;
- the owner approves this plan.
