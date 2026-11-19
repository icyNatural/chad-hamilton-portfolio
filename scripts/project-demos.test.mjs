import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { projectDemos } from '../src/data/project-demos.ts';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
test('demonstrations belong to existing projects and have public-safe descriptions', () => {
  assert.ok(projectDemos.length >= 1);
  assert.equal(new Set(projectDemos.map(d => d.slug)).size, projectDemos.length);
  for (const demo of projectDemos) {
    assert.ok(fs.existsSync(path.join(root, 'src/pages/projects', `${demo.slug}.astro`)));
    assert.ok(demo.actions.length >= 3);
    assert.ok(demo.limitation && demo.version);
    assert.doesNotMatch(JSON.stringify(demo), /[CDE]:[\\/]|gh[pousr]_[A-Za-z0-9]{20,}|-----BEGIN .*PRIVATE KEY/);
  }
});
test('every asset exists, captions are WebVTT, videos have practical delivery formats', () => {
  for (const demo of projectDemos) {
    for (const name of [demo.file, demo.poster, demo.captions]) {
      assert.equal(path.basename(name), name);
      assert.ok(fs.statSync(path.join(root, 'public/media/demos', name)).size > 0);
    }
    assert.match(fs.readFileSync(path.join(root, 'public/media/demos', demo.captions), 'utf8'), /^WEBVTT/);
    const probe = spawnSync('ffprobe', ['-v', 'error', '-show_streams', '-show_format', '-of', 'json', path.join(root, 'public/media/demos', demo.file)], { encoding: 'utf8' });
    assert.equal(probe.status, 0);
    const info = JSON.parse(probe.stdout);
    const video = info.streams.find(s => s.codec_type === 'video');
    assert.equal(video.codec_name, 'h264');
    assert.equal(video.pix_fmt, 'yuv420p');
    assert.equal(video.width / video.height, 16 / 9);
    assert.equal(video.r_frame_rate, '30/1');
    assert.equal(video.sample_aspect_ratio, '1:1');
    assert.ok(+info.format.duration >= 35 && +info.format.duration <= 76);
    assert.ok(+info.format.size < 35 * 1024 * 1024, 'Mobile-friendly individual file size');
    assert.equal(info.streams.filter(s => s.codec_type === 'audio').length, 0, 'Silent demonstration');
    const bytes = fs.readFileSync(path.join(root, 'public/media/demos', demo.file));
    assert.ok(bytes.indexOf(Buffer.from('moov')) < bytes.indexOf(Buffer.from('mdat')), 'Fast-start metadata precedes media');
  }
});
test('homepage highlight reel is a short silent fast-start MP4 with poster and captions', () => {
  const filename = path.join(root, 'public/media/demos/project-highlights.mp4');
  const result = spawnSync('ffprobe', ['-v', 'error', '-show_streams', '-show_format', '-of', 'json', filename], { encoding: 'utf8' });
  assert.equal(result.status, 0);
  const info = JSON.parse(result.stdout);
  assert.ok(+info.format.duration >= 20 && +info.format.duration <= 30);
  assert.equal(info.streams.length, 1);
  assert.equal(info.streams[0].codec_name, 'h264');
  const bytes = fs.readFileSync(filename);
  assert.ok(bytes.indexOf(Buffer.from('moov')) < bytes.indexOf(Buffer.from('mdat')));
  assert.ok(fs.statSync(path.join(root, 'public/media/demos/project-highlights.jpg')).size > 0);
  assert.match(fs.readFileSync(path.join(root, 'public/media/demos/project-highlights.vtt'), 'utf8'), /^WEBVTT/);
});