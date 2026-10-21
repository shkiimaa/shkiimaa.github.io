import { mkdir, writeFile, readFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { root, build } from './build.mjs';
import { projects } from '../src/content.mjs';

const playwrightModule=process.env.PLAYWRIGHT_MODULE;
const {chromium}=playwrightModule?await import(pathToFileURL(playwrightModule).href):await import('playwright');
const base=process.env.SITE_URL||'http://127.0.0.1:4173';
const artifacts=path.join(root,'artifacts');
await mkdir(artifacts,{recursive:true});
const browser=await chromium.launch({headless:true});
const failures=[];
const page=await browser.newPage({viewport:{width:1440,height:1000},deviceScaleFactor:1});
page.on('pageerror',error=>failures.push(error.message));
const ready=async route=>{await page.goto(base+route);await page.evaluate(()=>document.fonts.ready);};
try {
  for(const [route,name] of [['/','resume'],['/career/','career'],['/projects/','projects'],['/projects/bitria/','bitria'],['/projects/dax/','dax']]){
    await ready(route);
    await page.screenshot({path:path.join(artifacts,`${name}-desktop.png`)});
    if(name==='resume'||name==='career'){
      await page.evaluate(() => {
        for (const anchor of document.querySelectorAll('a[href^="/"]')) anchor.href = `https://shkiimaa.github.io${anchor.getAttribute('href')}`;
      });
      await page.pdf({path:path.join(root,'public',`${name}.pdf`),format:'A4',printBackground:true,preferCSSPageSize:true,tagged:true,displayHeaderFooter:true,headerTemplate:'<span></span>',footerTemplate:'<div style="width:100%;font-family:Arial,sans-serif;font-size:8px;color:#777;text-align:right;padding-right:55px"><span class="pageNumber"></span> / <span class="totalPages"></span></div>',margin:{top:'15mm',bottom:'16mm',left:'15mm',right:'15mm'}});
    }
  }
  await page.setViewportSize({width:1200,height:630});await ready('/');await page.screenshot({path:path.join(root,'public/assets/og.png')});
  await build();
  const routes=['/','/career/','/projects/',...projects.map(p=>`/projects/${p.id}/`)];
  for(const width of [360,390,768,1024,1440]){
    await page.setViewportSize({width,height:900});
    for(const route of routes){
      await ready(route);
      const result=await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth+1,emptyImages:[...document.images].filter(i=>i.getAttribute('src')&&i.offsetParent!==null&&i.complete&&i.naturalWidth===0).map(i=>i.src),h1:document.querySelectorAll('main h1').length,duplicates:[...document.querySelectorAll('[id]')].map(e=>e.id).filter((id,i,ids)=>ids.indexOf(id)!==i),missingAnchors:[...document.querySelectorAll('a[href^="#"]')].filter(a=>!document.getElementById(a.hash.slice(1))).map(a=>a.hash)}));
      if(result.overflow||result.emptyImages.length||result.h1!==1||result.duplicates.length||result.missingAnchors.length)failures.push({width,route,...result});
      if(width===390&&['/','/career/','/projects/','/projects/bitria/'].includes(route))await page.screenshot({path:path.join(artifacts,`${route==='/'?'resume':route.split('/')[1]==='career'?'career':route.includes('bitria')?'bitria':'projects'}-mobile.png`)});
    }
  }
  await ready('/projects/');
  await page.getByRole('button',{name:/팀 2/}).click();
  if(await page.locator('.project-index-row:visible').count()!==2)failures.push('Team filter did not show two projects');
  await page.getByRole('button',{name:/업무 6/}).click();
  if(await page.locator('.project-index-row:visible').count()!==6)failures.push('Work filter did not show six projects');
  await page.getByRole('button',{name:/전체 8/}).click();
  if(await page.locator('.project-index-row:visible').count()!==8)failures.push('All filter did not restore projects');
  await ready('/projects/dax/');await page.locator('[data-image]').first().click();
  if(!await page.locator('dialog').evaluate(dialog=>dialog.open))failures.push('Image dialog did not open');
  await page.keyboard.press('Escape');
  if(await page.locator('dialog').evaluate(dialog=>dialog.open))failures.push('Image dialog did not close with Escape');
  for(const doc of ['resume','career']){
    const res=await page.request.get(`${base}/${doc}.pdf`);
    if(res.status()!==200||!Buffer.from(await res.body()).subarray(0,4).equals(Buffer.from('%PDF')))failures.push(`Invalid ${doc} PDF`);
  }
  for(const route of routes){
    await ready(route);
    const localAssets=await page.locator('[href],[src]').evaluateAll(elements=>elements.map(el=>el.getAttribute('href')||el.getAttribute('src')).filter(v=>v?.startsWith('/')&&!v.startsWith('//')).map(v=>v.split('#')[0]));
    for(const asset of new Set(localAssets)){const response=await page.request.get(base+asset);if(response.status()!==200)failures.push({route,brokenLink:asset,status:response.status()});}
  }
  const status=await page.request.get(base+'/missing-page/');if(status.status()!==404)failures.push('Unknown URL must return 404');
  await page.emulateMedia({reducedMotion:'reduce'});await ready('/');
  if(await page.evaluate(()=>getComputedStyle(document.documentElement).scrollBehavior)!=='auto')failures.push('Reduced motion not respected');
  const result={pages:routes.length,viewports:[360,390,768,1024,1440],filtering:true,imageDialog:true,pdfs:true,internalLinks:true,failures};
  await writeFile(path.join(artifacts,'qa.json'),JSON.stringify(result,null,2));
  console.log(JSON.stringify(result,null,2));
  if(failures.length)process.exitCode=1;
} finally {await browser.close();}
