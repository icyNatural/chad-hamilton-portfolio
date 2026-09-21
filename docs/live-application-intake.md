# Live Application Intake

> **Status: active intake; classifications and screenshot choices are paused.** This document records what must be checked in current working applications and Lovable before the portfolio registry can be treated as authoritative. A blank or pending field is not evidence that a project lacks an application or assets.

## Rules for this phase

### Source precedence

When sources conflict, use this order:

1. Current working application
2. Current Lovable project
3. Current local application/repository
4. Current documentation
5. Older screenshots
6. Historical portfolio copy

Older screenshots are historical evidence, not the authoritative design. Do not finalize a classification, choose portfolio screenshots, redesign the portfolio, or downgrade a project to **Needs assets** until its Lovable status and current application have been checked.

### Intake states

- **Live source identified** — a current working or published application is known, but capture/publication review may remain open.
- **Lovable-connected; access pending** — local source proves a Lovable connection, but the project/editor or published URL is not yet known or inspectable.
- **Pending Lovable check** — no conclusion about Lovable status may be drawn from the audited files.
- **Identity unresolved** — keep names separate until a working application or authoritative description establishes a merge, rename, component, or successor relationship.
- **Not a final classification** — all entries below remain intake candidates.

### Capture and privacy rules

- Prefer fresh captures from the current application over the June–September 2026 archive.
- Preserve the real interface. Use demonstration data when possible.
- Redact names, account identifiers, health records, exact timestamps, device identifiers, API keys, tokens, local usernames/paths, private prompts, and third-party/personal material.
- Label simulated or demonstration values honestly. Never imply that demo values are computed personal results.
- Do not use setup failures, builder/chat panes, or historical screenshots as product proof when a current working screen is available.

## Access points already discovered

These are evidence leads, not approval to publish.

| System | Access point | Evidence/status |
|---|---|---|
| Energy Engine | `https://lovable.dev/projects/76ad3073-8095-4ab7-8f4a-43254e641496` | Owner-supplied Lovable project ID. The unauthenticated page exposed only a loading shell; inspect in an authorized Lovable session. |
| Energy Engine / Physiology Observatory | `https://phases.icynatural.now` | Public current application; no login wall was encountered during intake. |
| Energy Engine historical web app | `https://icynatural.github.io/Energy_Engine/` | Public older web interface; historical evidence, not current design authority. |
| Inquiry Engine frontend | local repository `inquiry-observatory-8a450d4f` | Current Lovable-connected local frontend; exact Lovable project URL and published URL were not present in known files. |
| Inquiry Backend | local repository `Inquiry-backend` and development API `http://localhost:8000` | Current local FastAPI backend; production base URL is not recorded. |
| Inquiry Engine repository | `https://github.com/icyNatural/inquiry-engine` | Public repository/access evidence; not proof of the frontend/backend identity relationship. |
| Icy Game OS | `https://icynatural.github.io/icyNatural-game-os/` | Documented public application URL; current behavior still needs live review. |
| Day State | `https://idoautographs.github.io/day-state/` | URL found in local documentation; ownership/current deployment must be revalidated. |
| Autonomic Regulation Model | `https://icynatural.github.io/Autonomic-Regulation-Model/` | Documented public model URL; current live review pending. |
| Portfolio | `https://icynatural.github.io/chad-hamilton-portfolio/` | Historical/current portfolio copy only; lowest-precedence product-description source. |

## Intake records

Every project or identity below has at least one unresolved live-source, identity, provenance, deployment, or disclosure question in `project-content-map.md`. “Pending” means not established by known files.

### 1. Energy Engine / Physiology Observatory

- **Intake state:** Live source identified; publication capture review pending.
- **September 20, 2026 capture update:** Current public Observatory, Instruments, Atlas, and System routes were captured at 1440 × 1000 and 390 × 844. All eight responses returned HTTP 200 with no captured console errors or failed requests. The browser contained no imported observations or linked automatic signals: the Observatory was **Untracked**, recovery had **No signal**, the energy field was **Awaiting telemetry**, and the Atlas had no recurring traces. These images are approved as interface/empty-state evidence only; they do not establish physiological accuracy, medical validity, prediction quality, Android import behavior, or user outcomes.
- **Canonical name shown inside live application:** `Energy Engine Physiology Observatory` with primary surface label `Observatory` (public application text observed). Confirm whether the intended portfolio product name remains **Energy Engine** and whether “Physiology Observatory” is a subtitle, application name, or current version name.
- **Lovable project link:** `https://lovable.dev/projects/76ad3073-8095-4ab7-8f4a-43254e641496`
- **Published application link:** `https://phases.icynatural.now`
- **Current visible screens/routes:** Public navigation exposes **Observatory**, **Instruments**, **Atlas**, and **System**. Local current source also contains `/`, `/energy`, `/patterns`, and `/settings`; reconcile route names against the deployed build rather than assuming every local route is published.
- **Authentication required:** No login wall encountered on the published landing screen. Lovable editor access may require the owner's session.
- **Publicly accessible:** Yes, the published application responded publicly during intake.
- **Mobile and desktop behavior:** Android Kotlin/WebView host is working and installed. Responsive browser behavior still needs direct viewport/device capture review; do not infer it from historical mobile screenshots.
- **Current project description:** A physiological timing/state system whose working pipeline is **Galaxy Watch → Samsung Health → Health Connect → Android Kotlin/WebView host → TypeScript normalization and storage → physiology engine → Observatory / Instruments / Atlas**.
- **Visible/verified capabilities:** The Android application has built and installed, received Health Connect permissions, and imported Samsung Health sleep data. The current web interface exposes physiological observation/instrument/atlas/system surfaces. Local current source documents timing, recovery, phase, rhythm, autonomic, pattern, local-storage, import, and integrity workflows; verify each in the live build before portfolio claims.
- **Relationship to older screenshots:** `https://icynatural.github.io/Energy_Engine/` and the June 2026 images show an earlier **Icy Natural OS v1** web interface (Home, Energy, Meaning/Interpreter, Patterns, Settings). They are historical web-interface demonstrations and do not represent the current design or prove the Android/data pipeline.
- **Relationship to local repositories:** Current source: local repository `Physiology OS (2)`. Android host: its `android-host` subtree. Earlier Python/static implementation: local repository `energy_engine_v1`; public history: `https://github.com/icyNatural/Energy_Engine`.
- **Safe screenshot opportunities:** Fresh empty-state or seeded demonstration-data captures of Observatory, Instruments, Atlas, System, Health Connect permission status without account details, and an Android-host view that demonstrates the real interface. Prefer demo profiles or replaced values.
- **Sensitive information requiring redaction:** All personal sleep, HRV, heart rate, respiratory, activity, wake/nap, recovery, phase, rhythm, and timestamp values; Samsung/Google account data; Health Connect permission/account screens; device identifiers; exported/debug snapshots; local paths. Never present demonstration values as computed personal results.
- **Open verification:** Inspect the authorized Lovable project and current deployment side by side; confirm canonical naming, exact deployed routes, responsive behavior, demo-data mode, and whether fresh safe captures can fully replace historical Energy images.

### 2. Inquiry Engine

- **Intake state:** Identity unresolved; Lovable-connected frontend exists.
- **Canonical name shown inside live application:** Local current frontend uses **Inquiry Engine** and **Inquiry Observatory** in titles/surfaces. Confirm against the current working/published application.
- **Lovable project link:** Pending; exact project URL/UUID is not present in known files.
- **Published application link:** Pending; none discovered in known files.
- **Current visible screens/routes:** Local frontend routes: `/`, `/investigations`, `/lineage`, `/memory`, `/continuity`, `/graph`, `/entities`, `/entities/:entityId`, `/settings`, and `/workspace/:artifactId`.
- **Authentication required / publicly accessible:** Pending live check.
- **Mobile and desktop behavior:** Pending live viewport check.
- **Current project description:** Current local frontend is an Inquiry Observatory for investigations, evidence/provenance, memory, lineage, continuity, concept/entity exploration, scopes, notes, workspaces, and engine diagnostics.
- **Visible capabilities:** Must be confirmed live. Local source supports investigation workflows, evidence and response panels, previous investigations, scopes, trace/diagnostics, graph/entity views, memory, continuity, and configurable engine connection.
- **Relationship to older screenshots:** July and September inquiry screens are historical candidates only. They cannot establish the current design or whether every screen belongs to this frontend.
- **Relationship to local repositories:** Frontend repository `inquiry-observatory-8a450d4f`; related public repository `https://github.com/icyNatural/inquiry-engine`; backend separately recorded below.
- **Safe screenshot opportunities:** A demonstration inquiry using non-personal/public subject matter; investigation response with clearly visible citations; trace/provenance panel; concept graph; continuity view; empty memory/workspace state.
- **Sensitive information requiring redaction:** Personal memory, previous questions, notes, private source text, API/provider details, keys/tokens, local paths, backend diagnostics, and any owner-specific knowledge base.
- **Open verification:** Obtain Lovable and published URLs, inspect live state, and keep separate from Inquiry Backend and Cognitive Mode Engine until authoritative descriptions establish the relationship.

### 3. Inquiry Backend

- **Intake state:** Identity unresolved; current local service confirmed.
- **Canonical name shown inside live application:** No standalone live UI name established. Current docs call it **Lovable Inquiry Observatory — Frontend Integration Contract**, **Inquiry Engine**, and **Inquiry Observatory stack** in different contexts.
- **Lovable project link / published application link:** Pending. Development access is `http://localhost:8000`; production base URL is undocumented.
- **Current visible screens/routes:** API rather than a confirmed standalone UI. Documented endpoints include `/api/cognition/reason`, `/api/investigate`, investigation CRUD/children endpoints, and related engine/status operations in current code.
- **Authentication required:** Current documentation says no authentication on the endpoints; production status is pending.
- **Publicly accessible:** Local only from known evidence; production accessibility pending.
- **Mobile and desktop behavior:** Not applicable to API presentation; test behavior through the current frontend on both form factors.
- **Current project description:** FastAPI investigation/reasoning backend with normalization, retrieval/ranking, persistence, source provenance, scopes, and structured trace output.
- **Visible capabilities:** API responses, evidence sources, reasoning trace, investigation persistence, external/scientific retrieval when enabled, and frontend integration. Do not treat code/tests as proof of a public deployment.
- **Relationship to older screenshots:** Terminal/API and “Inquiry Backend” screenshots are process evidence, not proof that it is a separate product or the current UI.
- **Relationship to local repositories:** Local repository `Inquiry-backend`; integrates with the local Inquiry Observatory frontend.
- **Safe screenshot opportunities:** Sanitized API docs/schema, a demonstration response using public data, and a frontend connection/trace state with secrets and local paths removed.
- **Sensitive information requiring redaction:** Environment variables, provider keys, internal URLs, local usernames/paths, personal memory records, raw retrieved text, logs, prompts, and persisted investigations.
- **Open verification:** Determine whether this is a backend component of Inquiry Engine, a separately named product, or a versioned service. Do not merge yet.

### 4. Cognitive Mode Engine

- **Intake state:** Identity unresolved; pending Lovable check.
- **Canonical name shown inside live application:** Pending. Local documentation uses **Cognitive Mode Engine**.
- **Lovable project link / published application link:** Pending; none discovered in known files.
- **Current visible screens/routes:** Pending live check. Local variants exist in repositories `cognitive-mode-engine`, `cognitive-mode-web`, and `cognitive-mode-static`.
- **Authentication required / publicly accessible / mobile and desktop behavior:** Pending.
- **Current project description:** Local evidence establishes a structured-question system with named cognitive/inquiry modes and dashboard/export commands; it does not establish identity equivalence with Inquiry Engine.
- **Visible capabilities:** Must be observed live. Repository evidence supports mode selection, structured prompts/questions, running modes, adding questions, dashboards, and exports.
- **Relationship to older screenshots:** Inquiry-like archive screens are only possible candidates; visual resemblance is not provenance.
- **Relationship to local repositories:** The three `cognitive-mode-*` roots above; possible relationship to Inquiry frontend/backend remains unresolved.
- **Safe screenshot opportunities:** Mode chooser and a demonstration run with neutral, non-personal content; export/dashboard using synthetic entries.
- **Sensitive information requiring redaction:** Personal questions, reflections, exports, prompts, local paths, and any model/provider credentials.
- **Open verification:** Preserve all four possibilities: renamed versions; frontend + backend components; Inquiry Engine using Cognitive Mode Engine internally; or separate related experiments.

### 5. Potent Lexicon

- **Intake state:** Identity unresolved; pending Lovable check.
- **Canonical name shown inside live application:** Historical portfolio uses **Potent Lexicon**; current live name pending.
- **Lovable project link / published application link:** Pending.
- **Current visible screens/routes; authentication; public access; mobile/desktop:** Pending live check.
- **Current project description:** Historical copy describes a semantic language system mapping words by sound, texture, atmosphere, symbolism, and meaning. This must be confirmed against a current application.
- **Visible capabilities:** Pending live observation.
- **Relationship to older screenshots:** Current portfolio PNGs and June language screens are historical evidence only.
- **Relationship to local repositories:** Possible relationship to local repository `Potent-Library`; not established as the same product.
- **Safe screenshot opportunities:** A demonstration word analysis with ordinary non-personal terms, clearly showing input, semantic dimensions, and output.
- **Sensitive information requiring redaction:** User-entered private text, generated personal interpretations, source/copyrighted datasets, local paths, prompts, and credentials.
- **Open verification:** Establish whether Potent Lexicon is the application name for Potent Library or a separate interface/system.

### 6. Potent Library

- **Intake state:** Identity unresolved; pending Lovable check.
- **Canonical name shown inside live application:** Pending; local project uses **Potent Library**.
- **Lovable/published links and live behavior:** Pending; none discovered in known files.
- **Current screens/routes; auth/public access; mobile/desktop:** Pending.
- **Current project description:** Local library and analysis tooling for semantic, phonosemantic, morphology, root/prefix/suffix, and related language data.
- **Visible capabilities:** No current live UI verified; local analyzers and registries are implementation evidence only.
- **Relationship to older screenshots:** Language-system screenshots must not be assigned without live/repository provenance.
- **Relationship to local repositories:** Local repository `Potent-Library`; keep distinct from Potent Lexicon, Language Execution Framework, and Word2Vec Galaxy.
- **Safe screenshot opportunities:** If a live UI exists, use a synthetic/common-word lookup; otherwise sanitized CLI/library output may be secondary process evidence only.
- **Sensitive information requiring redaction:** Proprietary or third-party word lists, imported texts, prompts, paths, and credentials.
- **Open verification:** Check Lovable and deployment status before making any asset conclusion.

### 7. Language Execution Framework

- **Intake state:** Related identity unresolved; pending Lovable/live check.
- **Canonical name:** Local repository uses **Language Execution Framework**.
- **Lovable/published links; screens/routes; auth/public access; mobile/desktop:** Pending.
- **Current project description/capabilities:** Documented framework linking Semantic → Instruction → Behavior → Environment → Outcome; confirm whether a working interactive application exists.
- **Relationship to older screenshots:** Repository-owned `assets/behavior.png` is support material, not evidence that language-system archive screens belong to this project.
- **Relationship to local repositories:** Local repository `language-execution-framework`; relationship to Potent products unresolved.
- **Safe screenshot opportunities:** Current interactive framework flow using generic language, if present; otherwise the owned diagram with clear “framework” labeling.
- **Sensitive information requiring redaction:** Private text examples, prompts, source material, paths, and credentials.

### 8. IcySense v1

- **Intake state:** Exact identity verified locally; pending Lovable and current live-source check.
- **Canonical name shown inside live application:** Pending; repository identity is **IcySense v1**.
- **Lovable project link / published application link:** Pending; known development access is `http://localhost:8080`.
- **Current screens/routes:** Repository evidence indicates onboarding, camera, scan modes, spoken output, local history, and identity settings; verify live.
- **Authentication / public access / mobile and desktop behavior:** Pending. Camera/mobile behavior requires device testing.
- **Current project description:** Camera/scan interaction demo. Its v1 classifier is explicitly a placeholder; do not claim production vision AI.
- **Visible capabilities:** Pending live confirmation of camera → scan → structured result → speech/history/settings flow.
- **Relationship to older screenshots:** June 25/26 captures are historical candidates only.
- **Relationship to local repositories:** Local repository `icysense-v1`; proposed aliases WorldLens and Visual Lens remain separate below.
- **Safe screenshot opportunities:** Non-identifying household object; demo-result state labeled as placeholder/demo; permission screen without account/device information.
- **Sensitive information requiring redaction:** Camera view of people, homes, documents, screens, addresses, location, device/account identifiers, and local scan history.

### 9. WorldLens

- **Intake state:** Proposed/ambiguous identity; pending Lovable check.
- **Canonical name, Lovable link, published link, screens/routes, auth/public access, responsive behavior, description, and visible capabilities:** Pending; no authoritative current source discovered.
- **Relationship to older screenshots/repositories:** Possible alias or successor to IcySense only; do not merge based on similarity.
- **Safe screenshot opportunities:** Determine only after a current application is found; use non-identifying camera subjects and demo labels.
- **Sensitive information requiring redaction:** Same camera/privacy risks as IcySense.

### 10. Visual Lens

- **Intake state:** Proposed/ambiguous identity; pending Lovable check.
- **Canonical name, Lovable link, published link, screens/routes, auth/public access, responsive behavior, description, and visible capabilities:** Pending; no authoritative current source discovered.
- **Relationship to older screenshots/repositories:** Possible alias or successor to IcySense only; keep separate from WorldLens and IcySense.
- **Safe screenshot opportunities / sensitive information:** Same constraints as WorldLens and IcySense.

### 11. Human State Atlas

- **Intake state:** Repository identity exists; current live/Lovable provenance pending.
- **Canonical name shown inside live application:** Pending; repository name is **Human State Atlas**.
- **Lovable/published links:** Pending.
- **Current screens/routes; auth/public access; mobile/desktop:** Pending live check.
- **Current project description/capabilities:** Source suggests a state/atlas interface, but the generic README is not authoritative. Observe the working application before describing current capabilities.
- **Relationship to older screenshots:** July/August Atlas, Ecosystem, and human-state screens cannot be assigned until direct provenance is established.
- **Relationship to local repositories:** Local repository `human-state-atlas`.
- **Safe screenshot opportunities:** Current atlas overview, navigation, and a neutral demonstration state without personal telemetry.
- **Sensitive information requiring redaction:** Personal state entries, health or mood values, notes, timestamps, account data, and imported personal records.

### 12. Ancient Human Energy Lab

- **Intake state:** Exact identity unresolved; pending Lovable check.
- **Canonical name, Lovable/published links, screens/routes, auth/public access, mobile/desktop, current description, and visible capabilities:** Pending; no repository with this exact name was found.
- **Relationship to older screenshots:** Ancient-art/research captures are references, not product proof.
- **Relationship to local repositories:** Possible research relationship to local repository `human-operating-system`; do not rename or merge without authority.
- **Safe screenshot opportunities:** Only original current interface/research tooling with third-party references clearly attributed.
- **Sensitive information requiring redaction:** Personal physiology/state material, private notes, copyrighted/third-party imagery, and source metadata.

### 13. Human Operating System

- **Intake state:** Verified research repository; possible product relationship unresolved; pending Lovable/live check.
- **Canonical name:** Local/public repository identity is **Human Operating System**.
- **Lovable/published links and current screens/routes:** Pending.
- **Authentication/public access/mobile/desktop:** Repository is public; working application behavior pending.
- **Current project description/capabilities:** Research system covering state engineering, directed energy, ancient psychology, identity, and experiments; do not substitute this identity for Ancient Human Energy Lab without evidence.
- **Relationship to older screenshots:** Human-state/model and research captures require direct mapping.
- **Relationship to local repositories:** Local repository `human-operating-system` and public GitHub repository of the same slug.
- **Safe screenshot opportunities:** Current original research interface or clearly labeled documentation, excluding third-party imagery.
- **Sensitive information requiring redaction:** Personal experiments, health/state records, private notes, source material, and identifiers.

### 14. Scenario States

- **Intake state:** Exact identity unresolved; pending Lovable check.
- **Canonical name, Lovable/published links, screens/routes, auth/public access, mobile/desktop, description, visible capabilities:** Pending; no exact repository identity verified.
- **Relationship to older screenshots:** Parasympathetic/state-selector captures are historical and not attributable to this name.
- **Relationship to local repositories:** Possible grouping around Day State, Cognitive Mode, or Human State Atlas; do not merge.
- **Safe screenshot opportunities:** Current scenario/state selection using synthetic entries, if application exists.
- **Sensitive information requiring redaction:** Personal state, mental/health descriptions, notes, timestamps, and exports.

### 15. Day State

- **Intake state:** Local identity verified; deployment and Lovable status pending.
- **Canonical name:** **Day State** in local evidence.
- **Lovable project link:** Pending.
- **Published link:** `https://idoautographs.github.io/day-state/` is documented but requires ownership/current-deployment validation.
- **Current screens/routes:** Repository describes an eight-category mobile state selector with local persistence and JSON export; live routes pending.
- **Authentication/public access/mobile/desktop:** Pending live check; design is documented as mobile-oriented.
- **Current description/capabilities:** Local state selection, browser persistence, and JSON export.
- **Relationship to older screenshots:** No repository-owned Day State media was established; state screens remain historical/ambiguous.
- **Relationship to local repositories:** Local repositories `day-state` and `day-state-site`; relation to Scenario States remains unresolved.
- **Safe screenshot opportunities:** Synthetic state selection and sanitized export flow.
- **Sensitive information requiring redaction:** Personal state selections, notes, dates/times, browser storage, and exported JSON.

### 16. Icy Chaos Engine

- **Intake state:** Exact identity unresolved; pending Lovable check.
- **Canonical name, Lovable/published links, screens/routes, auth/public access, mobile/desktop, description, visible capabilities:** Pending; no direct authoritative source found in the audited files.
- **Relationship to older screenshots:** Generic networks/constellations are not attributable product evidence.
- **Relationship to local repositories:** None established.
- **Safe screenshot opportunities:** Only after a working application is identified; do not use generic archive imagery as a substitute.
- **Sensitive information requiring redaction:** Determine from the live application; apply default credential, personal-data, and path redaction.

### 17. Icy Game OS

- **Intake state:** Working/deployed candidate; current live and Lovable check pending.
- **Canonical name:** Repository uses **Icy Game OS** / `icyNatural-game-os`; confirm live UI wording.
- **Lovable project link:** Pending.
- **Published link:** `https://icynatural.github.io/icyNatural-game-os/`
- **Current screens/routes:** Pending live inspection; repository describes a starter interface for attention, control feel, expression, and engagement-density experiments.
- **Authentication/public access:** Published URL is expected public; revalidate. **Mobile/desktop:** pending.
- **Current description/capabilities:** Starter UI/research prototype, not a finished game platform.
- **Relationship to older screenshots:** June 24/25 dashboards are historical candidates; eight locally referenced images are missing, so current deployment must be checked first.
- **Relationship to local repositories:** Local repository `icyNatural-game-os` and public GitHub repository.
- **Safe screenshot opportunities:** Fresh end-to-end state/control interaction with default/demo state.
- **Sensitive information requiring redaction:** Usernames, save/profile data, local paths, debug panels, and any third-party game assets.

### 18. Life Chronicle

- **Intake state:** Exact identity unresolved; pending Lovable check.
- **Canonical name, Lovable/published links, screens/routes, auth/public access, mobile/desktop, current description, visible capabilities:** Pending; no exact current source found.
- **Relationship to older screenshots:** Raw Reality, constellation, and timeline-like images are not attributable enough to assign.
- **Relationship to local repositories:** Possible adjacency to Runtime Logger and Icy Lifestyle; keep separate.
- **Safe screenshot opportunities:** A synthetic timeline/logging workflow if a live application is found.
- **Sensitive information requiring redaction:** Life events, locations, habits, health/state records, notes, dates, contacts, and exports.

### 19. Runtime Logger

- **Intake state:** Related local prototype; pending Lovable/live check.
- **Canonical name:** **Runtime Logger** in local README.
- **Lovable/published links and screens/routes:** Pending; known implementation is local telemetry logging.
- **Authentication/public access/mobile/desktop:** Pending/not established.
- **Current description/capabilities:** Personal runtime telemetry logger with event commands; exact relation to Life Chronicle unresolved.
- **Relationship to older screenshots:** Timeline/log archive captures cannot be assigned without provenance.
- **Relationship to local repositories:** Local repository `runtime-logger`.
- **Safe screenshot opportunities:** Synthetic events in a clean test profile; sanitized CLI output as secondary evidence.
- **Sensitive information requiring redaction:** Food, water, habits, health, location, work, notes, dates/times, usernames, and filesystem paths.

### 20. Icy Lifestyle

- **Intake state:** Related local prototype; pending Lovable/live check.
- **Canonical name:** **Icy Lifestyle** inferred from local project identity; confirm in application.
- **Lovable/published links; screens/routes; auth/public access; mobile/desktop; visible capabilities:** Pending.
- **Current description:** Local lifestyle prototype; do not claim a Life Chronicle relationship until verified.
- **Relationship to older screenshots/repositories:** Local repository `icy-lifestyle`; archive assignment pending.
- **Safe screenshot opportunities:** Synthetic/non-personal lifestyle entries only.
- **Sensitive information requiring redaction:** Habits, health, schedules, locations, notes, identifiers, and exports.

### 21. Automation / Local AI

- **Intake state:** Proposed grouping, not an established single product; pending Lovable checks per application.
- **Canonical name:** None established for the grouping. Known candidate project is **Local AI Lab Installer** / repository `icy-ai-lab-installer`.
- **Lovable/published links:** Pending for the grouping and installer; public repository `https://github.com/icyNatural/icy-ai-lab-installer` is known.
- **Current screens/routes:** Local installer/launcher, Docker/Open WebUI/n8n/Ollama workflows, repair/status/backup controls; current UI must be inspected.
- **Authentication/public access/mobile/desktop:** Primarily local Windows infrastructure; not established as a public web app.
- **Current description/capabilities:** PowerShell-first setup and operations tooling for a local AI stack. Keep other automation projects separate until a deliberate grouping is authorized.
- **Relationship to older screenshots:** August installer and terminal captures are process evidence; they may expose machine details and are not automatically publication-safe.
- **Relationship to local repositories:** Known public installer repository plus other local automation roots; exact grouping scope pending.
- **Safe screenshot opportunities:** Clean installer welcome/status/repair screens in a test environment; architecture diagram; sanitized success output.
- **Sensitive information requiring redaction:** Windows username, hostnames, IPs, filesystem paths, container IDs, model/history data, API keys, logs, shortcuts, and private service URLs.

### 22. Autonomic Regulation Model

- **Intake state:** Published-model candidate; pending Lovable/current live check.
- **Canonical name:** **Autonomic Regulation Model** in repository documentation.
- **Lovable project link:** Pending.
- **Published link:** `https://icynatural.github.io/Autonomic-Regulation-Model/`
- **Current screens/routes; authentication/public access; mobile/desktop:** Pending live inspection.
- **Current description/capabilities:** Neutral interactive model of mobilization/restoration and influences such as breathing, rhythm, and cognition; documented as an Energy Engine integration target.
- **Relationship to older screenshots:** Do not substitute Energy or human-state archive screens for this model.
- **Relationship to local repositories:** Local repository `Autonomic-Regulation-Model` and public repository.
- **Safe screenshot opportunities:** Fresh neutral/default interactive model state after checking for deployment artifacts.
- **Sensitive information requiring redaction:** Any personal physiology inputs/results, local paths, deployment banners, and debug data.

### 23. Cybersecurity

- **Intake state:** Proposed portfolio area, not a verified project identity; pending live/Lovable source discovery.
- **Canonical name, Lovable/published links, screens/routes, auth/public access, mobile/desktop, description, visible capabilities:** No single application established. Do not create a product from a capability label.
- **Relationship to older screenshots:** Generic terminals, key handling, allowlists, and hardening details do not establish a case study.
- **Relationship to local repositories:** No attributable audited project boundary established.
- **Safe screenshot opportunities:** Only a clearly owned, sanitized lab/application with documented scope and role.
- **Sensitive information requiring redaction:** Credentials, tokens, keys, IPs, hostnames, vulnerabilities, client/employer data, logs, network topology, and personal paths.
- **Open verification:** Check Lovable/project sources before retaining, renaming, or dropping this candidate; until then it remains a capability lead rather than a project classification.

### 24. Word2Vec Galaxy

- **Intake state:** Authorship/contribution boundary unresolved; pending live-source check.
- **Canonical name:** **Word2Vec Galaxy** in local/upstream evidence.
- **Lovable project link / published link:** Pending.
- **Current screens/routes; auth/public access; mobile/desktop:** Pending; local evidence describes a Streamlit Word2Vec/PCA visualization.
- **Current description/capabilities:** Embedding visualization using Word2Vec/PCA; ownership and contribution must be documented before portfolio use.
- **Relationship to older screenshots:** `ref.jpeg` is upstream/reference material, not automatically owned product evidence.
- **Relationship to local repositories:** Local repository `Word2Vec-Galaxy`; upstream origin is `Gayanukaa/Word2Vec-Galaxy` according to the audit.
- **Safe screenshot opportunities:** A fresh run of owned modifications with attribution and a neutral word set, if contribution is confirmed.
- **Sensitive information requiring redaction:** Imported/private corpora, copyrighted datasets, local paths, and account/service credentials.

### 25. Icy Clear mobile

- **Intake state:** Identity/content unresolved; pending Lovable check.
- **Canonical name:** Pending; local repository is `icy-clear-mobile-app`.
- **Lovable/published links, screens/routes, auth/public access, mobile/desktop, description, visible capabilities:** Pending; current audit found starter documentation only.
- **Relationship to older screenshots:** Starter assets and a shared chart do not establish an application.
- **Relationship to local repositories:** Keep distinct from Icy Clear v2 and terrestrial-trappist until current sources prove otherwise.
- **Safe screenshot opportunities:** Only a current non-starter application state, if found.
- **Sensitive information requiring redaction:** Determine from live source; apply default privacy and credential rules.

### 26. Icy Clear v2

- **Intake state:** Identity/content unresolved; pending Lovable check.
- **Canonical name:** Pending; local repositories include `icy-clear-v2-main` and `icy-clear-v2`.
- **Lovable/published links:** No Lovable link found. A separate Icy Clear OS site links to GitHub Pages, but its status as this exact candidate must be confirmed.
- **Current screens/routes; auth/public access; mobile/desktop; description/capabilities:** Pending authoritative live check.
- **Relationship to older screenshots:** Shared chart/starter media are insufficient; do not infer product identity from the newer local shell.
- **Relationship to local repositories:** Keep distinct from Icy Clear mobile and terrestrial-trappist.
- **Safe screenshot opportunities:** Current working routes only after identity is established.
- **Sensitive information requiring redaction:** Personal framework/state storage, local browser data, paths, and identifiers.

### 27. terrestrial-trappist

- **Intake state:** Identity/content unresolved; pending Lovable check.
- **Canonical name:** Pending; folder/repository label is `terrestrial-trappist`.
- **Lovable/published links, screens/routes, auth/public access, mobile/desktop, description, visible capabilities:** Pending; audit found starter assets/documentation only.
- **Relationship to older screenshots:** None established.
- **Relationship to local repositories:** Keep distinct from both Icy Clear candidates.
- **Safe screenshot opportunities:** Only after a current non-starter application and its intended identity are confirmed.
- **Sensitive information requiring redaction:** Determine from live source.

## Inquiry-family hold

Do not merge or split **Inquiry Engine**, **Inquiry Backend**, and **Cognitive Mode Engine** during intake. Evidence collection must allow all of these outcomes without choosing one prematurely:

1. one system with renamed versions;
2. frontend + backend components;
3. Inquiry Engine using Cognitive Mode Engine internally;
4. separate related experiments.

Required resolving evidence: authorized Lovable project descriptions/history, canonical names visible in the current applications, published URLs, repository links shown by Lovable, and a current architecture/product description from the owner or application itself.

## Live review checklist

For each record, reviewers should capture the following in notes before changing portfolio status:

1. Date, viewport/device, and access point used.
2. Exact name in the title, header, about/settings surface, and Lovable project.
3. Route/navigation list and one-sentence purpose per screen.
4. Login/permission requirements and whether an unauthenticated visitor can reach the useful interface.
5. Desktop, narrow-mobile, and—where applicable—installed Android behavior.
6. Current description and only capabilities actually observed working.
7. Explicit mapping to repository and historical screenshots, including “not the same version” where appropriate.
8. Fresh capture candidates using demo/empty data.
9. Redaction list and disclosure label for every candidate capture.
10. Remaining access or identity questions. Only then may classification and asset selection resume.

## Access points still required

This is the concise request list. Do not request screenshots or manual classification yet.

- Inquiry Engine / Inquiry Observatory — exact Lovable project URL and published application URL.
- Inquiry Backend — production API/application URL, if one exists.
- Cognitive Mode Engine — Lovable project URL and published application URL, including which local variant is current.
- Potent Lexicon — Lovable project URL and published application URL.
- Potent Library — Lovable project URL and published application URL, if it has a UI.
- Language Execution Framework — Lovable/published application URL, if interactive.
- IcySense v1 — Lovable project URL and current published application URL.
- WorldLens — Lovable/published URL or confirmation that it is only an alias/concept.
- Visual Lens — Lovable/published URL or confirmation that it is only an alias/concept.
- Human State Atlas — Lovable project URL and published application URL.
- Ancient Human Energy Lab — Lovable/published URL or authoritative access point under its actual current name.
- Human Operating System — Lovable/published application URL, if a working app exists.
- Scenario States — Lovable/published URL or authoritative access point under its actual current name.
- Day State — Lovable project URL and confirmation/correction of `https://idoautographs.github.io/day-state/`.
- Icy Chaos Engine — Lovable/published URL or authoritative current access point.
- Icy Game OS — Lovable project URL and confirmation that `https://icynatural.github.io/icyNatural-game-os/` is current.
- Life Chronicle — Lovable/published URL or authoritative current access point.
- Runtime Logger — Lovable/published application URL, if one exists.
- Icy Lifestyle — Lovable/published application URL, if one exists.
- Local AI Lab Installer / intended Automation grouping — Lovable or current application access point, if any.
- Autonomic Regulation Model — Lovable project URL and confirmation that `https://icynatural.github.io/Autonomic-Regulation-Model/` is current.
- Cybersecurity candidate — an authoritative project/application access point, if this is intended as a project rather than a capability.
- Word2Vec Galaxy — current application URL and authoritative contribution/ownership access point.
- Icy Clear mobile — Lovable/published URL and current canonical name.
- Icy Clear v2 — Lovable/published URL and current canonical name.
- terrestrial-trappist — Lovable/published URL and intended canonical name.