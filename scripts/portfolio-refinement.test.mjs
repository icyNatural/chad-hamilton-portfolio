import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import { techProjects, trackInfo } from '../src/data/tech-projects.ts';

test('homepage retains demonstrations and uses the requested first-person introduction', async () => {
  const home = await fs.readFile(new URL('../src/pages/index.astro', import.meta.url), 'utf8');
  assert.match(home, /Software, systems,/);
  assert.match(home, /and ideas <em>made functional\./);
  assert.match(home, /I develop interactive applications, AI workflows, and technical infrastructure/);
  for (const phrase of ['Applications, interfaces, and interactive environments.', 'Models, services, data, and automation.', 'Working deployments, tests, and measurable behavior.']) assert.ok(home.includes(phrase));
  for (const component of ['DemoShowcase', 'TechEducation', 'Ecosystem', 'CertProject']) assert.ok(home.includes(`<${component}`));
});

test('CERT case describes only the inspected standalone deployment with explicit limits', async () => {
  const cert = techProjects.find(p => p.slug === 'cert-engine');
  assert.ok(cert);
  assert.equal(cert.live, 'https://cert.icyclearer.com/');
  assert.ok(trackInfo.security.projects.includes('cert-engine'));
  assert.match(cert.summary, /519/);
  assert.deepEqual(cert.stack, ['HTML', 'CSS', 'JavaScript', 'Embedded JSON', 'localStorage']);
  assert.match(cert.limitations.join(' '), /not independently fact-checked/);
  assert.match(cert.limitations.join(' '), /not an official or endorsed CompTIA product/);
  assert.match(cert.limitations.join(' '), /not hosted offline reload or an installable PWA/);
  await fs.access(new URL(`../public/${cert.image}`, import.meta.url));
});

test('visual refinement keeps delivery dependency-free and motion restrained', async () => {
  const css = await fs.readFile(new URL('../src/styles/tech.css', import.meta.url), 'utf8');
  assert.match(css, /prefers-reduced-motion/);
  assert.match(css, /:focus-visible/);
  assert.match(css, /\.tech-process/);
  assert.doesNotMatch(css, /@import|https:\/\//);
});