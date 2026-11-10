import { engineeringProjects } from './engineering-projects';

// Curated from the sanitized November 10, 2026 career evidence audit.
// Explicit allowlist: never import operational registries, private receipts, or media.
export interface CareerProject {
  id: string;
  name: string;
  stack: string[];
  problem: string;
  built: string;
  diagram: [string, string, string];
  evidenceDate: string;
  evidence: string;
  limits: string;
  contribution: string;
  status: string;
  caseSlug?: string;
  publicUrl?: string;
}

const contribution = 'Independent implementation/integration; upstream libraries and recovered tools retain their authorship. This is independent project work, not an employer role.';
const status = 'Source not linked; local/private runtime';
const existing = (slug: string) => {
  const project = engineeringProjects.find(p => p.slug === slug);
  if (!project) throw new Error(`Missing existing engineering case: ${slug}`);
  // Reuse only curated editorial fields, not historical evidence or source links.
  return { problem: project.problem, caseSlug: project.slug };
};

export const careerProjects: Record<string, CareerProject> = {
  photogression: {
    id: 'photogression', name: 'Photogression', stack: ['TypeScript', 'React', 'TanStack Start', 'IndexedDB', 'Vitest', 'Playwright'],
    problem: 'Keep photo observations recoverable while making browser depth exploration usable with orientation and fallback controls.',
    built: 'EXIF-aware import, additive restore, IndexedDB persistence, and in-browser depth inference with orientation/fallback controls.',
    diagram: ['EXIF-aware photo import', 'IndexedDB + additive restore', 'Depth inference + fallback view'],
    evidenceDate: 'November 7–8, 2026',
    evidence: 'November 7 retained unit output: 143 passed, 1 skipped across 20 files; 42 Playwright checks. Actual desktop Depth Anything inference recorded November 7/8, not mocked depth.',
    limits: 'Physical-phone tilt/depth explicitly unverified. Mobile results are headless emulation, not phone GPU, heat or browser acceptance. November 7 lint failed; fix not rerun. Local changes remain uncommitted. Public runtime/source revision equality unknown.',
    contribution, status: 'Public app HTML verified unauthenticated November 10, 2026; source not linked.',
    caseSlug: 'photogression', publicUrl: 'https://photogression.icynatural.now/',
  },
  inquiry: {
    id: 'inquiry', name: 'Personal Inquiry Engine', stack: ['Python', 'FastAPI', 'Pydantic', 'ChromaDB', 'Ollama', 'SQLite', 'React'],
    problem: 'Keep retrieval scoped and its sources inspectable across saved AI-assisted investigations.',
    built: 'Source filters, reranking, six inquiry modes, versioned SQLite investigations and a connected evidence/trace interface.',
    diagram: ['Scoped retrieval + source filters', 'Reranking + inquiry modes', 'SQLite investigations + trace UI'],
    evidenceDate: 'November 2–3, 2026',
    evidence: 'Earlier connected isolated-record demonstration and 22 backend tests. November 2/3 phase-two validation documentation separately records 161 backend pytest passes and 6 frontend local tests. Ecosystem proof records actual isolated qwen3.5:4b inference with real routers/repository but heavy-dependency stubs, not a full application entrypoint boot. Exact executed command not established.',
    limits: 'Uncommitted frontend/backend work. Full frontend lint failed with 15,095 problems, mostly CRLF; scoped lint/type/build reported passing. Synthetic integration does not access personal stores or certify private data/model quality or full-app boot. Frontend/runtime remain local; physical-device acceptance not established.',
    contribution, status, caseSlug: 'inquiry-engine',
  },
  'discovery-lab': {
    id: 'discovery-lab', name: 'ICY Discovery Lab', stack: ['JavaScript', 'Node.js', 'WebGL'],
    problem: 'Make numerical exploration cancellable and reproducible without treating generated inputs as physical observations.',
    built: 'Native numerical instruments, bounded cancellable workers, append-only investigations, portable evidence bundles, deterministic scene exchange and a direct-manipulation Terrain & Gravity bench.',
    diagram: ['Generated inputs + instrument UI', 'Bounded cancellable workers', 'Investigation ledger + evidence bundle'],
    evidenceDate: 'November 4 / November 7, 2026',
    evidence: 'November 7 checkpoint documents 76/76 unit and 48/48 cloud Chromium checks. Retained raw browser JSON is older: 47/47 on November 4, not corroboration of 48. Raw terrain JSON: 23/23 November 7; Windows launcher JSON: 12/12 November 4.',
    limits: 'Cloud Linux/software-WebGL results are not Windows-GPU or physical-phone acceptance. Inputs use generated WAV/CSV; first physical observations and external adapter acceptance pending. Separate from the older Discovery Convergence engineering case.',
    contribution, status,
  },
  'icy-all': {
    id: 'icy-all', name: 'ICY ALL Registry / Control', stack: ['TypeScript', 'React', 'Node.js', 'Vitest'],
    ...existing('icy-all'),
    built: 'Typed identity/relationship registry, bounded discovery and observer, paired Control service, exact-Origin/Host/CSRF boundaries, and identity-checked Windows lifecycle operations.',
    diagram: ['Typed registry + bounded discovery', 'Origin / Host / CSRF boundary', 'Identity-checked Control operations'],
    evidenceDate: 'November 9, 2026',
    evidence: 'Audit counted 100 identities / 68 relationships. November 9 raw final suite output: 60 files / 750 passed, scoped to isolated fixtures/processes, not every application. Integrity receipt retains 89 original IDs, 62 edges and 28 launch profiles.',
    limits: 'Extensive uncommitted implementation beyond October source revision. Repository-wide lint failed with 85 pre-existing errors. Archive rendering uses jsdom + HTTP shell, not physical/offline acceptance. Operational registry and bundles are withheld from public output.',
    contribution, status,
  },
  'fabric-mind': {
    id: 'fabric-mind', name: 'ICY Fabric / Mind', stack: ['TypeScript', 'Node.js', 'SQLite', 'SSE', 'Python'],
    problem: 'Share bounded events and approved memory capabilities without granting unrestricted agents access to local systems.',
    built: 'SQLite event history, bounded rules, authenticated APIs, JavaScript/Python SDKs, SSE, and a separate Mind memory/provider service with privacy exclusions and approved capabilities.',
    diagram: ['Authenticated APIs + SDKs', 'SQLite events + bounded rules', 'Mind privacy + approved capabilities'],
    evidenceDate: 'Test logs undated; smoke receipts October 30, 2026',
    evidence: 'Raw logs: Fabric 29/29, Mind rerun 34/34, Python 2/2; embedded dates/invocations absent. October 30 actual local Ollama and embedding smoke receipts are separate from synthetic-only phase-three browser proof, which made zero model calls.',
    limits: 'No own repository revision established; parent container revision not attributed. SSE has finite retries, no replay/delivery guarantee. No shell agent or global multi-owner transaction; hooks opt-in, no database consolidation.',
    contribution, status,
  },
  'cert-engine': {
    id: 'cert-engine', name: 'ICY CERT ENGINE', stack: ['TypeScript', 'Node.js', 'SQLite', 'Ollama', 'PWA'],
    problem: 'Preserve offline study/review state and constrain generation requests while keeping content trust separate from software checks.',
    built: 'Local question-generation validation, SQLite persistence, standalone offline study bank, durable review/bookmark queue, reconnect sync and request/file-access boundaries.',
    diagram: ['Bounded generation + validation', 'SQLite bank + offline cache', 'Durable review queue + reconnect sync'],
    evidenceDate: 'November 9, 2026',
    evidence: 'Raw reports: 14 API assertions and 24 browser checks, including seven viewports, cold offline reload and reconnect. Seven unit passes documented; seven definitions confirmed, raw unit log absent. Batch: 25 saved / 36 attempted / 11 rejected.',
    limits: 'Zero source-supported and zero human-verified generated questions. AI critique is not factual certification. Physical phone and private HTTPS approval pending; no closed-app sync guarantee. No own Git repository.',
    contribution, status,
  },
  inspector: {
    id: 'inspector', name: 'ICY Inspector', stack: ['JavaScript', 'Node.js', 'Playwright'],
    problem: 'Inspect a target without mutating it, and distinguish verified observations from partial or contradicted findings.',
    built: 'Read-only source/browser inspection, request-method restrictions, evidence manifests and baseline regression comparisons.',
    diagram: ['Read-only source + browser inspection', 'Restricted requests + evidence manifest', 'Baseline comparison + qualified findings'],
    evidenceDate: 'November 6–7, 2026',
    evidence: 'November 6 target inspection: 8 verified, 2 partial, 1 contradicted finding; 10 retained screenshots and 1 target page error. November 7 retest used the unchanged target, not a corrected build.',
    limits: 'No own revision or retained unit pass count. Seven represented modes are not seven deep presets. Findings describe the inspected target; they are not Inspector test passes or corrected defects. No retained screenshots are published here.',
    contribution, status,
  },
  'clip-factory': {
    id: 'clip-factory', name: 'Clip Factory', stack: ['TypeScript', 'Vite', 'Mediabunny', 'IndexedDB'],
    ...existing('clip-factory'),
    built: 'Batch media queues, export metadata, review decisions and bounded publishing automation with explicit approval gates.',
    diagram: ['Local media queue + export metadata', 'Review decisions + approval gate', 'Bounded publishing automation'],
    evidenceDate: 'October 23, 2026; older raw log October 20',
    evidence: 'October 23 automation documentation records 58/58 automation and 119/119 browser tests. Older raw October 20 log records 114 pass / 2 fail followed by two isolated passes; it does not corroborate 119.',
    limits: 'Uncommitted work; later counts are report-supported only. Private upload accounts, media and receipts were not opened. Port/saturation caveats remain. No verified public demo or freshly accepted live publication.',
    contribution, status,
  },
  weatherful: {
    id: 'weatherful', name: 'WEATHERFUL', stack: ['TypeScript', 'React', 'Vite', 'Node.js', 'IndexedDB', 'Service Worker'],
    problem: 'Keep weather observations and backups usable across network failures without implying native-device acceptance.',
    built: 'Weather normalization/cache, versioned IndexedDB backup, offline shell/capture and failure-state handling.',
    diagram: ['Weather normalization + cache', 'Versioned IndexedDB backup', 'Offline shell + capture'],
    evidenceDate: 'Execution receipt undated; reviewed November 10, 2026',
    evidence: 'Retained raw end-to-end log records Playwright: 6 passed. Desktop Edge mobile viewports, not a physical phone. This November review supersedes the older engineering index statement that the project was not located.',
    limits: 'Private HTTPS approval pending; no physical phone/GPS/cellular acceptance. No native APK, accounts, sync or encryption claimed. No own Git revision or fresh build receipt.',
    contribution, status,
  },
};

export const careerTracks = {
  'software-ai': {
    title: 'Software & AI',
    intro: 'Local-first applications, evidence-aware AI workflows, and bounded system integration. Five projects selected for implementation depth and inspectable engineering decisions.',
    projects: ['photogression', 'inquiry', 'discovery-lab', 'icy-all', 'fabric-mind'],
  },
  cybersecurity: {
    title: 'Cybersecurity',
    intro: 'Security-conscious application engineering: explicit trust boundaries, restricted operations, privacy exclusions, and evidence-based inspection—not a claim of penetration-testing certification or production security assurance.',
    projects: ['icy-all', 'fabric-mind', 'cert-engine', 'inquiry', 'inspector'],
  },
  'systems-it': {
    title: 'Systems & IT',
    intro: 'Lifecycle controls, service coordination, reproducible workflows, and offline resilience. Five independent projects viewed through their operational boundaries and acceptance gaps.',
    projects: ['icy-all', 'fabric-mind', 'discovery-lab', 'clip-factory', 'weatherful'],
  },
} as const;

export type CareerTrackId = keyof typeof careerTracks;