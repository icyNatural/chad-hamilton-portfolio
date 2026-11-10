import {chromium} from 'playwright';
import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const origin=process.argv[2]||'http://127.0.0.1:4347';
const label=process.argv[3]||'local';
const out=path.join(root,'validation-output',label);
await fs.mkdir(out,{recursive:true});
const routes=[];
async function walk(dir){for(const item of await fs.readdir(dir,{withFileTypes:true})){const file=path.join(dir,item.name);if(item.isDirectory())await walk(file);else if(item.name==='index.html')routes.push('/'+path.relative(path.join(root,'dist'),dir).split(path.sep).filter(Boolean).join('/')+(dir===path.join(root,'dist')?'':'/'));}}
await walk(path.join(root,'dist'));
const browser=await chromium.launch({channel:'chrome',headless:true});
const results=[];const links=new Set();const failures=[];const downloads=[];
try{
 for(const route of routes){for(const width of (['/','/software/','/security/','/systems/','/projects/'].includes(route)?[1440,360,390,430]:[1440,390])){
  const context=await browser.newContext({viewport:{width,height:width===1440?1000:844},isMobile:width<600,hasTouch:width<600,reducedMotion:'reduce'});
  const page=await context.newPage();const errors=[];
  page.on('pageerror',e=>errors.push(e.message));page.on('console',msg=>{if(msg.type()==='error')errors.push(msg.text());});
  page.on('response',response=>{if(response.url().startsWith(origin)&&response.status()>=400)errors.push(`HTTP ${response.status()}: ${response.url()}`);});
  try{
   const response=await page.goto(origin+route,{waitUntil:'networkidle',timeout:25000});assert.equal(response.status(),200);
   assert.equal(await page.locator('h1').count(),1,'One h1 required');assert.ok(await page.title());
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false,'Document overflow');
   assert.ok(await page.getByRole('navigation',{name:'Primary navigation'}).isVisible());
   // Dialog images may have no decoded dimensions until their dialog opens.
   // Their source resources are independently checked by the internal-link audit.
   await page.locator('img').evaluateAll(es=>es.forEach(e=>e.loading='eager'));
   await page.waitForFunction(()=>[...document.images].every(e=>e.complete),null,{timeout:10000});
   assert.deepEqual(await page.locator('img').evaluateAll(es=>es.filter(e=>(!e.naturalWidth&&!e.closest('dialog:not([open])'))||!e.alt).map(e=>e.src)),[],'Image load/alt');
   for(const href of await page.locator('a[href]').evaluateAll(es=>es.map(e=>e.href)))links.add(href);
   if(route==='/projects/visual-lab/'){
    assert.equal(await page.locator('[data-layers] > *').count(),0);await page.locator('[data-add]').click();assert.equal(await page.locator('[data-layers] > *').count(),1);await page.locator('[data-undo]').click();assert.equal(await page.locator('[data-layers] > *').count(),0);
    for(let i=0;i<13;i++)await page.locator('[data-add]').click();assert.equal(await page.locator('[data-layers] > *').count(),12);await page.locator('[data-reset]').click();assert.equal(await page.locator('[data-layers] > *').count(),0);
   }
   if(route==='/projects/music-archive/'){
    assert.ok(await page.locator('[data-export]').isDisabled());await page.locator('[data-review]').first().selectOption('accepted');assert.ok(await page.locator('[data-export]').isEnabled());
    const event=page.waitForEvent('download');await page.locator('[data-export]').click();const download=await event;const text=await fs.readFile(await download.path(),'utf8');const data=JSON.parse(text);assert.equal(data.records.length,1);assert.equal(data.records[0].synthetic,true);downloads.push({width,kind:data.kind,records:data.records.length});
   }
   if(route==='/'||route==='/projects/'){
    const map=page.locator('[data-ecosystem]');await map.locator('[data-group="infrastructure"]').click();assert.equal(await map.locator('[data-ecosystem-group]:visible').count(),1);await map.locator('[data-group="all"]').click();assert.equal(await map.locator('[data-ecosystem-group]:visible').count(),3);
   }
   if(['/', '/software/','/security/','/systems/','/projects/visual-lab/','/projects/music-archive/'].includes(route))await page.screenshot({path:path.join(out,`${route.replaceAll('/','')||'home'}-${width}.png`),fullPage:true});
  }catch(error){errors.push(String(error));}
  results.push({route,width,errors});if(errors.length)failures.push({route,width,errors});console.log(route,width,errors.length?'FAIL '+errors.join('; '):'PASS');await context.close();
 }}
 const context=await browser.newContext();const page=await context.newPage();const linkResults=[];
 for(const href of [...links].filter(h=>h.startsWith(origin))){try{const url=new URL(href);const response=await context.request.get(url.origin+url.pathname+url.search,{timeout:15000});assert.equal(response.status(),200);if(url.hash){await page.goto(url.origin+url.pathname,{waitUntil:'domcontentloaded'});const id=decodeURIComponent(url.hash.slice(1));assert.ok(await page.locator('[id]').evaluateAll((es,id)=>es.some(e=>e.id===id),id),'Missing fragment '+id);}linkResults.push({href,status:200});}catch(e){failures.push({href,error:String(e)});}}
 for(const name of ['software_ai','cybersecurity','systems_it']){const file=`Chad_Hamilton_${name}_AUDITED.pdf`;const response=await context.request.get(`${origin}/resumes/${file}`);assert.equal(response.status(),200);const body=await response.body();assert.equal(body.subarray(0,5).toString(),'%PDF-');const local=await fs.readFile(path.join(root,'public','resumes',file));assert.equal(createHash('sha256').update(body).digest('hex'),createHash('sha256').update(local).digest('hex'));downloads.push({file,bytes:body.length,sha256:createHash('sha256').update(body).digest('hex')});}
 const report={at:new Date().toISOString(),origin,routeViewportChecks:results.length,results,internalLinkChecks:linkResults.length,externalLinks:[...links].filter(h=>h.startsWith('http')&&!h.startsWith(origin)),downloads,failures,physicalDeviceTested:false};await fs.writeFile(path.join(out,'verification.json'),JSON.stringify(report,null,2));console.log('TOTAL',results.length,'LINKS',linkResults.length,'FAILURES',failures.length);if(failures.length)process.exitCode=1;await context.close();
}finally{await browser.close();}