export interface EngineeringProject {
  slug: string;
  name: string;
  discipline: string;
  status: 'Verified' | 'Implemented but unverified' | 'Experimental';
  summary: string;
  stack: string[];
  problem: string;
  architecture: string;
  implemented: string[];
  evidence: string[];
  limits: string;
  relationship: string;
  repository?: string;
  image?: { file: string; alt: string; width: number; height: number; caption: string };
}

// Audited October 27, 2026. Historical receipts are not current test passes.
export const engineeringProjects: EngineeringProject[] = [
  {
    slug: 'orient', name: 'ORIENT', discipline: 'Android · scientific software', status: 'Verified',
    summary: 'A native observation instrument connecting celestial calculations, device orientation, time exploration, and stored observations.',
    stack: ['Kotlin', 'Jetpack Compose', 'Android sensors', 'SQLite'],
    problem: 'Make celestial position and observation explorable while keeping calculation accuracy separate from physical-device accuracy.',
    architecture: 'A core astronomy engine supplies the Compose interface. Sensor inputs and persisted observations remain separate from reference calculations, allowing deterministic checks without treating a compass reading as ground truth.',
    implemented: ['Solar and lunar calculations with comparison views.', 'Sensor-oriented observation interface and SQLite observation storage.', 'Time exploration and reference-comparison workflows.'],
    evidence: ['Audited ref: orient-0.2.1-verified-baseline, b752ab6, October 26, 2026.', 'Retained documentation records 48 core tests and 406 reference comparisons.', 'Retained XML records 16 app and 8 engine passes at 360 × 640dp; this is historical, viewport-specific evidence.'],
    limits: 'Verified describes the recorded baseline scope, not every device. The default-screen run had two UI failures. Physical compass, GNSS, and battery acceptance remain unestablished.',
    relationship: 'An independent observation application. A shared Discovery notebook or backend has not been established.',
    image: { file: 'orient.webp', alt: 'ORIENT observation interface in its no-location state', width: 1080, height: 2400, caption: 'Retained ORIENT screenshot; no-location state. Not a fresh physical-device acceptance test.' },
  },
  {
    slug: 'local-ai-lab', name: 'Local AI Lab Installer', discipline: 'Automation · infrastructure', status: 'Implemented but unverified',
    summary: 'Windows bootstrap and lifecycle automation for a self-hosted AI workstation, including backup, recovery, and service management.',
    stack: ['PowerShell', 'Docker', 'WSL2', 'Ollama', 'Open WebUI', 'n8n'],
    problem: 'Reduce the repeated work of assembling a local AI environment while making partial failures and recovery visible.',
    architecture: 'A PowerShell entry point coordinates workstation setup and Docker Compose services. Separate lifecycle, repair, backup, and restore scripts make ongoing operations distinct from initial provisioning.',
    implemented: ['Installer and service lifecycle scripts.', 'Container configuration for local AI and workflow services.', 'Backup, restore, repair, and status-reporting workflows.'],
    evidence: ['Audited source baseline d949c6b, August 3, 2026, plus preserved local development work.', 'August 6 retained status reports phase Complete but overall PartialSuccess with exit code 20.', 'Installer.Tests.ps1 and testing documentation exist; a fresh passing suite was not established.'],
    limits: 'Beta infrastructure with partial operating evidence—not a claim of unattended production readiness. No publishable interface screenshot was established.',
    relationship: 'Relevant infrastructure for local AI applications, not evidence that Inquiry or every other project is automatically provisioned.',
    repository: 'https://github.com/icyNatural/icy-ai-lab-installer',
  },
  {
    slug: 'clip-factory', name: 'Clip Factory', discipline: 'Media pipelines · application engineering', status: 'Implemented but unverified',
    summary: 'A media workflow application spanning library management, detection, timeline editing, rendering, export, and publishing adapters.',
    stack: ['TypeScript', 'Vite', 'MediaBunny', 'exifr', 'PWA'],
    problem: 'Move repeated media-processing steps into an inspectable workflow rather than a collection of disconnected manual operations.',
    architecture: 'Library and storage modules feed detection and timeline editing, followed by render/export. A separate automation worker and YouTube broker establish a boundary between local processing and external publishing.',
    implemented: ['Media library, detection, and timeline-editing interfaces.', 'Rendering and export pipeline, with fixed 1080 × 1920 export scope.', 'Batch/automation code and metadata/publishing adapters.'],
    evidence: ['Audited source 7031bc7, October 23, 2026.', 'Workflow, detection, frame-rate, Xbox, and automation test sources are present.', 'Retained main test marker says passed; automation marker says failed. The mobile timeline capture is interface evidence only.'],
    limits: 'Conflicting retained test results prevent a current passing-release claim. OAuth, batch completion, and live YouTube publication were not freshly accepted.',
    relationship: 'A media pipeline internal to Clip Factory. No integration with Music Branch Resolver has been established.',
    image: { file: 'clip-factory.webp', alt: 'Clip Factory mobile timeline editor with trim controls', width: 390, height: 844, caption: 'Retained mobile timeline test artifact. UI evidence, not proof of successful external publication.' },
  },
  {
    slug: 'discovery-laboratory', name: 'OMNINATURAL / Discovery', discipline: 'Systems integration · experimental instruments', status: 'Experimental',
    summary: 'An investigation environment for exploring phenomena through models, interactive instruments, recorded states, and bounded native-tool exchange.',
    stack: ['JavaScript', 'Node.js', 'Python', 'Browser instruments'],
    problem: 'Keep exploration, manipulation, and evidence together without confusing generated model states with measured observations.',
    architecture: 'Execution, store, registry, and investigation modules organize the environment. Discovery reads geometry code from ICY Reality and signal code from Visual Lab v4; a bounded export adapter supports native Luxar exchange.',
    implemented: ['Investigation, workbench, discovery, and chamber surfaces.', 'Interactive geometry and signal-model exploration.', 'Documented Luxar compile, orbit, layers, and restore exchange workflows.'],
    evidence: ['Audited source e37e17e, October 27, 2026.', 'Retained discovery-play-browser and chamber-luxar-browser reports record passes.', 'October 27 HTTP and isolated browser intake confirmed the five known service ports responded. Running revisions were not proven identical to source HEAD.'],
    limits: 'An experimental system, not calibrated scientific instrumentation. Simulations are not measurements. Recovered third-party applications retain upstream authorship; recovery does not imply independent authorship or security certification.',
    relationship: 'Direct geometry and signal-code reuse is supported. A unified observation database spanning ORIENT, Fieldwork, and Discovery is not established.',
    image: { file: 'discovery.webp', alt: 'Discovery laboratory interactive phenomenon exploration interface', width: 1440, height: 1000, caption: 'Actual local Discovery interface captured October 27, 2026 in an isolated browser context. Modeled states, not measured observations.' },
  },
  {
    slug: 'icy-all', name: 'ICY ALL', discipline: 'Observability · systems integration', status: 'Implemented but unverified',
    summary: 'A system-discovery and application-registry interface for inspecting projects, dependencies, access boundaries, and operational state.',
    stack: ['React', 'TypeScript', 'Vite', 'Node.js', 'Vitest'],
    problem: 'Make a growing collection of local applications understandable without treating discovery metadata as permission to control everything.',
    architecture: 'Atlas and Workbench interfaces sit alongside project-sync, observer, access, and control-service modules. The registry/control boundary is distinct from the Discovery launch dashboard.',
    implemented: ['Atlas and Workbench application surfaces.', 'Project synchronization, dependency-oriented registry, and observer modules.', 'Separate access and control-service code with dedicated test sources.'],
    evidence: ['Audited source 525ea3a, October 20, 2026.', 'App, Workbench, ProjectSync, control, Git, and synchronization test sources identified.', 'Historical artifacts exist; a fresh runtime or full passing suite was not established.'],
    limits: 'Implementation evidence is not current operational acceptance. Registry screenshots were withheld from public assets because they can expose local system details.',
    relationship: 'ICY FIELDWORK contains a read-only control-session adapter. This is not proof of a shared database or a universal control plane.',
  },
];

export const supportingProjects = [
  { name: 'Music Branch Resolver', status: 'Implemented but unverified', scope: 'React/Node archive reconciliation, DOCX provenance ingestion, search and matching workflows. Seven test files identified; no retained current pass or live publishing acceptance.' },
  { name: 'Speech Android', status: 'Experimental', scope: 'React/Capacitor and Java audio bridge, articulation exploration, recording, reversible DSP, and JSON/WAV export. Historical 0.2.1 receipts: 141 Vitest, 7 Chromium, 17 Java codec, and 3 emulator instrumentation passes; no physical-device or speech-scoring validation.' },
  { name: 'Icy Clearer', status: 'Experimental', scope: 'Separate Astro spatial-navigation interface with a typed project registry and mobile Moments. Related editorial/interface work, not the authoritative portfolio or a shared backend.' },
  { name: 'Generative Reality', status: 'Experimental', scope: 'React/TypeScript interactive models, history exploration, and evidence ledger. Retained smoke captures do not establish model accuracy or Discovery integration.' },
  { name: 'ICY FIELDWORK', status: 'Experimental', scope: 'FastAPI research instruments using audio, motion, reconstruction, layers, and provenance. Historical documentation records 34 passes; weak reconstruction results and missing real-sensor acceptance remain explicit.' },
  { name: 'ICY Reality / Visual Lab', status: 'Experimental', scope: 'Geometry and signal-model sources reused by Discovery. Multiple Visual Lab variants remain distinct; broad scientific verification was not established.' },
];