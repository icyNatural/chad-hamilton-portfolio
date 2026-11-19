export interface ProjectDemo {
  slug: string;
  name: string;
  file: string;
  poster: string;
  captions: string;
  description: string;
  actions: string[];
  limitation: string;
  version: string;
}

// Only recordings inspected and verified for public presentation belong here.
export const projectDemos: ProjectDemo[] = [
  {
    slug: 'visual-lab', name: 'ICY Visual Lab',
    file: 'visual-lab-demo.mp4', poster: 'visual-lab-3d-poster.png', captions: 'visual-lab-demo.vtt',
    description: 'Edit Marble Terrain in the full Visual Lab studio, orbit the scene, save a branch and export a rendered PNG.',
    actions: ['Open the bundled Marble Terrain Remix as an editable copy and inspect the native 3D controls.', 'Freeze marble positions, arrange them in a ring, apply a colourful palette, try a line arrangement and undo it.', 'Convert recorded trajectories to editable curve objects and orbit the scene with the pointer.', 'Save a named branch and complete an actual rendered PNG download.'],
    limitation: 'One continuous workflow in the full AI edition; no other edition is mixed in. Direct scene controls are demonstrated, not AI Operator execution, a newly run physics simulation or individual object gizmo editing. The bundled terrain and trajectories are starting material.',
    version: 'Full Visual Lab AI edition 1.5.0 · 3fc30a7 · November 19, 2026',
  },
  {
    slug: 'photogression-spatial', name: 'Photogression',
    file: 'photogression-demo.mp4', poster: 'photogression-poster.jpg', captions: 'photogression-demo.vtt',
    description: 'From a bundled forest image to real browser-based depth estimation and interactive spatial views.',
    actions: ['Load the bundled forest demonstration and explore composition guides without changing the original.', 'Approve the model download and run actual Depth Anything V2 Small inference in the browser.', 'Orbit the estimated surface; change relief and edge separation; switch among contours, mesh, points and depth colormaps.', 'Compare Photograph and Structure, then save the experiment settings to the local Progression journal.'],
    limitation: 'Uses the bundled demonstration image, not a recorded file-import workflow. Relative AI-estimated depth is not a distance measurement. Model download waiting time is cut. Desktop capture does not verify physical-phone sensors.',
    version: 'd416cbc + existing local Spatial Explorer extension · November 19, 2026',
  },
  {
    slug: 'clip-pipeline', name: 'Clip Factory',
    file: 'clip-factory-demo.mp4', poster: 'clip-factory-demo-poster.jpg', captions: 'clip-factory-demo.vtt',
    description: 'Import footage, trim it, prepare metadata, export locally and view the finished composition.',
    actions: ['Import a safe, generated eight-second motion-study video through the actual file chooser into the media queue.', 'Add on-media title and insight text, preview the vertical composition and manually trim the source to 1–6 seconds.', 'Prepare title, description, hashtags and tags, then complete a real local MP4 download.', 'Inspect the exported queue state and watch the five-second downloaded result at the end of the recording.'],
    limitation: 'One queue item and one local export are demonstrated; multi-item batch processing and automatic highlight suggestions are not verified. The preview resets after export in this version. No YouTube account is connected and no external publishing is performed. The appended final segment is the actual exported file.',
    version: '7031bc7 + existing local automation/UI changes · November 19, 2026',
  },
  {
    slug: 'discovery-lab', name: 'ICY Discovery Lab',
    file: 'discovery-lab-demo.mp4', poster: 'discovery-lab-poster.jpg', captions: 'discovery-lab-demo.vtt',
    description: 'Sculpt terrain, change gravity, run simulated marbles and save replayable investigation evidence.',
    actions: ['Open the Terrain & Gravity bench, choose Valley and change gravity from 9.81 to 3.71 m/s².', 'Sculpt the terrain with the pointer brush and drop another marble into the starting scene.', 'Run the live simulation and inspect computed trajectories and model energy.', 'Record an independent server calculation, replay its result hash, save the investigation and export its evidence bundle.'],
    limitation: 'A numerical simulation, not physical observation or a validated real-world measurement. This sculpted run has about 1.03% energy-balance error and a 1.4% rolling-slip warning; sliding is not modeled. Warnings remain visible. No other Discovery edition is mixed into this recording.',
    version: 'ICY Discovery Lab 1.0.0 · a055db8 · November 19, 2026',
  },
];
export const getDemo = (slug: string) => projectDemos.find(demo => demo.slug === slug);