# Recorded project demonstrations — November 19, 2026

## Isolation and preservation

- Implementation branch: `project-demonstrations-20261119`.
- Based on freshly fetched production commit `9547c94`, not the older, dirty portfolio checkout.
- Original checkout and its unrelated uncommitted changes are retained untouched.
- Original recordings and capture scripts are retained separately in the local `portfolio-demo-recordings` archive; only inspected delivery assets are committed under `public/media/demos`.
- No creative-site files, accounts, or deployments are changed. No external media publishing is performed.

## Delivery behavior

- One native HTML video on each applicable case study, immediately after the introduction.
- One homepage highlight reel, with links to full demonstrations rather than repeated embedded players.
- 16:9 responsive players, visible native controls, visitor-initiated playback, `playsinline`, poster images and `preload="none"`.
- Silent H.264/yuv420p MP4, fast-start metadata, English WebVTT action captions and an expandable action transcript.
- Starting a player pauses other players on the same document.
- Existing architecture, supporting evidence, project relationships, careers, matching resumes, education and navigation are retained.

## Verification commands

```powershell
npm run build
npm test
node scripts/verify-tech.mjs http://127.0.0.1:4357 final
node scripts/verify-demos.mjs http://127.0.0.1:4357 demos-local
```

`verify-tech.mjs` checks all built routes, internal links, image loading, career resume hashes, navigation, responsive overflow and the existing interactive examples. `verify-demos.mjs` adds 390px, 768px and 1440px browser checks of real media decoding, play, pause, seek, fullscreen, parsed captions, poster/track/source paths, aspect ratio and no MP4 transfer before interaction. Screenshots and JSON reports remain in ignored `validation-output`.

The preexisting catalog test required at least two evidence strings per project, but production FIELDWORK and Interface Atlas each retain one. The test now requires at least one substantive entry rather than encouraging duplicate or fabricated evidence. No project evidence was invented to make this assertion pass.

Physical phones and sensors are not tested by these desktop browser checks. Simulation footage is not physical observation.

## Capture provenance

### ICY Visual Lab

- Selected full AI edition 1.5.0 at `3fc30a76921e3251e47ec63f7b6eed59cc168cfd`; tracked source clean, existing untracked workspace artifacts preserved.
- Compared full AI, Standard (`852a7f4`) and Creative Playground (`c755152`, locally modified). Full studio was selected for its working gallery, native 3D controls, branch saving and actual PNG export.
- Existing six-second Interference Bloom artwork export was inspected and archived, but cannot demonstrate interactive editing. Fresh 52-second browser capture is used instead.
- Opens Marble Terrain Remix as an editable copy, freezes positions, applies ring/line arrangements and palette, undoes, converts recorded trajectories into curve objects, orbits, saves a named branch and downloads a rendered PNG.
- Does not demonstrate AI execution, a new physics simulation or object-gizmo manipulation. Native rendering uses the installed sibling ThreeJS renderer. No incompatible application editions are mixed.

### Photogression

- Active source at `d416cbcef2266085a519f7d02f1d06de7ab085ed` plus the preexisting uncommitted Spatial Explorer extension. This is explicitly not a clean release at that SHA.
- Compared active source with the older rollback and browser-data backup. Selected active source for working real inference and spatial modes.
- Fresh 57-second browser capture; no suitable existing workflow video reused. Bundled forest demo loads directly, rather than a recorded file import.
- Real Depth Anything V2 Small model download/inference, Surface/Contours/Mesh/Points/Depth modes, pointer rotation, relief and depth-edge separation, photo comparison and locally saved experiment settings.
- Model-download wait and slow interaction pauses are cut, not simulated. No metric-distance, physical-phone, camera, backup/reload or file-import preservation claim.
- Bundled demonstration image SHA-256: `0D096D221C88AB8B896773D12241F64CF283F2CBC71BB1A7CEA702116C2B29E6`. Used only as the app's existing nonpersonal demonstration; independent asset redistribution licensing is not asserted.

### ICY Discovery Lab

- Selected self-contained ICY Discovery Lab 1.0.0, clean `a055db838a42992d2d9a9481ab49421824ac3f1f`, after comparison with convergence (`e37e17e`) and convergence-interactive (`133e080`). The strongest matching interactive terrain/evidence workflow is in the standalone lab, not the older portfolio candidate.
- Fresh 46.4-second recording: choose Valley, change gravity, pointer-sculpt terrain, drop a marble, run simulated trajectories and energy, compute a run, record server evidence, replay a matching result hash, save and download an investigation bundle.
- An isolated evidence store is used; no personal investigations enter the recording. Raw footage and exported evidence remain outside the public portfolio.
- The model's physical limitations remain visible. This is a numerical simulation, not physical evidence. Focused terrain suite rerun: 13/13 pass.
- Captured run reports approximately 1.03% energy-balance error and 1.4% rolling-slip warning; sliding is not modeled. Public recording limits state these explicitly. Delivery is normalized from original 25fps to 30fps without changing duration; original encode and raw are retained.

### Clip Factory

- Selected active original application at `7031bc7863f60e8d54fc289f3491d8ba2c92f50b` with preexisting uncommitted automation/UI changes; not represented as a clean release. No app source was changed for capture.
- Existing tiny portrait acceptance outputs were inspected, but were unsuitable for demonstrating the horizontal-source importer. Fresh recording uses a clearly labeled generated eight-second motion-study input, not personal footage or a replacement app.
- Actual file chooser import, on-media text, vertical preview, manual trim from 1–6 seconds, metadata preparation, successful local MP4 download and exported queue status. The last five seconds show the actual downloaded composition.
- Delivery is 41.83 seconds, 1920×1080/30fps, with the original viewport padded without distortion. The original 1600×1000 edit and raw recordings remain archived.
- One item only: multi-item batch processing, automatic suggestions and remote publication are not demonstrated. Preview reset after export is documented. No OAuth account was connected or external upload performed.

### Homepage reel

- 24 seconds, three eight-second excerpts from the verified Visual Lab (30s), Photogression (19s) and Clip Factory (18s) edits.
- The excerpt start times and reproducible FFmpeg workflow are in `scripts/make-highlight-reel.mjs`; invoking with `30 19 18` selects these reviewed moments.
- All final MP4s are silent, H.264/yuv420p, 1920×1080, 30fps and fast-start. No new media service or dependency is needed.

## Prepublication results

- Complete Astro build: 35 pages successful.
- `npm test`: 10/10 passed, including media format, duration, aspect ratio, captions, fast-start and retained career/resume checks.
- Full-site browser validation: 78 route/viewport checks and 98 internal-link checks, zero failures. All three matching resume downloads retain their source SHA-256.
- Five players (homepage + four cases), each at 390px, 768px and 1440px: 15/15 passed play, pause, seek, fullscreen, captions, responsive bounds, paths and no initial MP4 transfer. No console/runtime errors reported.
- Video-derived contact sheets, posters, exported result frames and portfolio screenshots inspected visually. Browser captures use isolated contexts and safe example media. No account secrets, internal addresses, private files or personal images were included in reviewed footage.
- Desktop browser mobile emulation only; no physical-device acceptance claim.