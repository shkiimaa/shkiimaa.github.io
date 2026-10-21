import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { root } from './build.mjs';
import { projects } from '../src/content.mjs';

const dist=path.join(root,'dist');
const failures=[];
const pages=[];
async function walk(directory){for(const entry of await readdir(directory,{withFileTypes:true})){const p=path.join(directory,entry.name);if(entry.isDirectory())await walk(p);else if(entry.name.endsWith('.html'))pages.push(p);}}
await walk(dist);
for(const file of pages){
  const html=await readFile(file,'utf8');
  if((html.match(/<h1(?:\s|>)/g)||[]).length!==1)failures.push(`${file}: expected one h1`);
  if(!html.includes('lang="ko"')||!html.includes('name="description"'))failures.push(`${file}: missing metadata`);
  if(/notion-file-block:|X-Amz-|localhost:|127\.0\.0\.1:|기여도 100%|백엔드 API 개발 참여/.test(html))failures.push(`${file}: unpublishable or stale source text`);
  const ids=[...html.matchAll(/\sid="([^"]+)"/g)].map(m=>m[1]);
  if(new Set(ids).size!==ids.length)failures.push(`${file}: duplicate ids`);
  for(const match of html.matchAll(/(?:href|src)="(\/[^"#]*)(?:#[^"]*)?"/g)){
    const target=path.join(dist,match[1]);
    try{const s=await stat(target);if(s.isDirectory())await stat(path.join(target,'index.html'));}
    catch{failures.push(`${path.relative(dist,file)}: missing ${match[1]}`);}
  }
  for(const match of html.matchAll(/href="#([^"]+)"/g))if(!ids.includes(match[1]))failures.push(`${file}: missing #${match[1]}`);
}
for(const name of ['resume','career','portfolio']){const pdf=await readFile(path.join(dist,`${name}.pdf`));if(pdf.subarray(0,4).toString()!=='%PDF')failures.push(`Invalid ${name}.pdf`);}
if(projects.length!==8||projects.filter(p=>p.category==='work').length!==6)failures.push('Project count changed');
if(pages.length!==13)failures.push('Expected 12 pages and a 404 page');
if(failures.length){console.error(failures.join('\n'));process.exitCode=1;}else console.log(`Checked ${pages.length} HTML pages, internal links, metadata, 8 projects and three PDFs.`);
