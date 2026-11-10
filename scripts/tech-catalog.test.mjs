import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {techProjects,trackInfo,getProject} from '../src/data/tech-projects.ts';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
test('ranked catalog has unique continuous ranks and slugs',()=>{
 assert.equal(new Set(techProjects.map(p=>p.slug)).size,techProjects.length);
 assert.deepEqual(techProjects.map(p=>p.rank),techProjects.map((_,i)=>i+1));
});
test('all public case routes and relationship targets exist',()=>{
 for(const p of techProjects){assert.ok(fs.existsSync(path.join(root,'src/pages/projects',p.slug+'.astro')));for(const slug of p.related)assert.ok(getProject(slug));}
});
test('every case has concrete evidence, limits and an architecture flow',()=>{
 for(const p of techProjects){assert.ok(p.evidence.length>=2,p.slug);assert.ok(p.limitations.length>=2,p.slug);assert.equal(p.flow.length,3);assert.ok(p.version);assert.ok(p.demonstration);}
});
test('career selection targets valid cases and unchanged matching PDF files',()=>{
 for(const [track,info]of Object.entries(trackInfo)){for(const slug of info.projects)assert.ok(getProject(slug),track);const pdf=fs.readFileSync(path.join(root,'public/resumes',info.resume));assert.equal(pdf.subarray(0,5).toString(),'%PDF-');}
});
test('curated public catalog excludes local paths, credentials and private source links',()=>{
 const text=JSON.stringify(techProjects);assert.doesNotMatch(text,/[CDE]:[\\/](?:Users|PROJECTS|Resume|ICY)|gh[pousr]_[A-Za-z0-9]{20,}|-----BEGIN .*PRIVATE KEY/);
 for(const p of techProjects){assert.equal(p.repository,undefined,'Private project source must not be linked casually');if(p.live)assert.equal(new URL(p.live).protocol,'https:');}
});
test('old career entry routes remain and use current shared track component',()=>{
 for(const route of ['software-ai','cybersecurity','systems-it'])assert.match(fs.readFileSync(path.join(root,'src/pages',route,'index.astro'),'utf8'),/TechTrack/);
});
test('domain settings use root base, custom domain, and no apex CNAME',()=>{
 const config=fs.readFileSync(path.join(root,'astro.config.mjs'),'utf8');assert.match(config,/base: '\/'/);assert.match(config,/https:\/\/tech\.icyclearer\.com/);assert.equal(fs.readFileSync(path.join(root,'public/CNAME'),'utf8').trim(),'tech.icyclearer.com');
});