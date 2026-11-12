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
    evidence: ['Earlier validation recorded 48 core tests and 406 sky-position reference comparisons.', 'A separate Android UI run recorded 16 app and eight engine passes at 360 × 640dp.'],
    limits: 'The tested baseline does not establish accuracy for all devices; two UI checks failed in one screen run. Physical compass, GNSS and battery behavior still require testing.',
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
    evidence: ['An August 2026 installation report returned PartialSuccess after completing several setup phases.', 'PowerShell installer tests and technical documentation exist; the full setup has not been revalidated in a clean environment.'],
    limits: 'This is a local installer in active development. A full unattended deployment and recovery cycle has not yet been established.',
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
    evidence: ['Core tests cover workflows, frame rates, Xbox media handling and automation components.', 'Earlier test results were mixed, so this older revision is not presented as a fully passing release.'],
    limits: 'This is an earlier Clip Factory version. See the newer Clip Factory pipeline case study for additional export and upload evidence; this revision has incomplete verification.',
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
    evidence: ['Recorded browser runs exercised Discovery Play and Chamber/Luxar interactions.', 'Local HTTP and browser checks confirmed five service endpoints responded during an October 2026 session.'],
    limits: 'An experimental laboratory using simulations rather than calibrated measurement. Some components build on existing third-party tools; current service behavior may differ from older source revisions.',
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
    evidence: ['The application includes project registry, synchronization, Git and lifecycle-control test modules.', 'This earlier version has documented test artifacts but no new complete runtime acceptance run.'],
    limits: 'This is an earlier ICY ALL version. The newer Control case study documents additional lifecycle and authorization work. Private machine records are not part of this website.',
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