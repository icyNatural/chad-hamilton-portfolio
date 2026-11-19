import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const media = path.join(root, 'public/media/demos');
const work = path.join(root, 'validation-output/reel-edit');
fs.mkdirSync(work, { recursive: true });
// Each excerpt is chosen after inspection of the corresponding full recording.
// Optional seconds let an editor select the meaningful operation, never fabricate it.
const starts = process.argv.slice(2).map(Number);
const shots = [
  { file: 'visual-lab-demo.mp4', name: 'ICY Visual Lab', start: starts[0] ?? 12 },
  { file: 'photogression-demo.mp4', name: 'Photogression', start: starts[1] ?? 20 },
  { file: 'clip-factory-demo.mp4', name: 'Clip Factory', start: starts[2] ?? 28 },
];
function run(args) {
  const result = spawnSync('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-y', ...args], { encoding: 'utf8' });
  if (result.status !== 0) throw new Error(result.stderr || 'FFmpeg failed');
}
for (const [index, shot] of shots.entries()) {
  assertAsset(shot.file);
  run(['-ss', String(shot.start), '-i', path.join(media, shot.file), '-t', '8', '-an', '-vf', 'scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2,fps=30', '-c:v', 'libx264', '-preset', 'fast', '-crf', '24', '-pix_fmt', 'yuv420p', path.join(work, `${index}.mp4`)]);
}
function assertAsset(name) { if (!fs.existsSync(path.join(media, name))) throw new Error(`Missing verified source ${name}`); }
fs.writeFileSync(path.join(work, 'concat.txt'), shots.map((_, i) => `file '${i}.mp4'`).join('\n'));
run(['-f', 'concat', '-safe', '0', '-i', path.join(work, 'concat.txt'), '-c', 'copy', '-movflags', '+faststart', path.join(media, 'project-highlights.mp4')]);
run(['-ss', '2', '-i', path.join(media, 'project-highlights.mp4'), '-frames:v', '1', '-q:v', '3', path.join(media, 'project-highlights.jpg')]);
fs.writeFileSync(path.join(media, 'project-highlights.vtt'), `WEBVTT\n\n00:00.000 --> 00:08.000\nICY Visual Lab — editable scene creation\n\n00:08.000 --> 00:16.000\nPhotogression — image-derived spatial exploration\n\n00:16.000 --> 00:24.000\nClip Factory — local media editing and export\n`);
console.log('Created 24-second highlight reel from verified application captures.');