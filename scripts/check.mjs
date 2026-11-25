import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { root } from './build.mjs';
import { projects, careerDetails } from '../src/content.mjs';
import { portfolioMaterial, portfolioDoc } from '../src/portfolio-content.mjs';

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
for(const name of ['resume','career','portfolio','portfolio-detail']){const pdf=await readFile(path.join(dist,`${name}.pdf`));if(pdf.subarray(0,4).toString()!=='%PDF')failures.push(`Invalid ${name}.pdf`);}
// 경력기술서 사례와 같은 내용을 다루는 포트폴리오 항목: 있어야 하고, 제목·기간이 같아야 한다 (두 문서를 함께 내므로 같은 사례의 이름이 달라지면 안 된다)
// 경력기술서가 가리킬 수 있는 것은 사례(evidence)뿐이다: '구조와 기술 선택' 항목은 4줄 형식이 아니다
const portfolioItems=new Map(Object.entries(portfolioDoc).flatMap(([pid,doc])=>(doc.evidence||[]).map(item=>[`${pid}-${item.id}`,item])));
for(const [pid,detail] of Object.entries(careerDetails))for(const study of detail.cases||[]){
  if(!study.ref)continue;
  const anchor=study.ref;const item=portfolioItems.get(anchor);
  if(!item){failures.push(`career ${pid}: ref ${anchor} has no portfolio case (성능 개선·트러블슈팅)`);continue;}
  if(item.title!==study.title)failures.push(`career ${pid}: title differs from portfolio ${anchor}\n  career:    ${study.title}\n  portfolio: ${item.title}`);
  if((item.period||'')!==(study.period||''))failures.push(`career ${pid}: period differs from portfolio ${anchor}`);
}
// 포트폴리오 문제 해결 사례: 불릿은 문제 → 원인 → 해결 → 결과 네 줄
for(const [pid,doc] of Object.entries(portfolioDoc))for(const item of doc.evidence||[]){
  if(!['성능 개선','트러블슈팅'].includes(item.kind))failures.push(`portfolio ${pid}-${item.id}: kind must be 성능 개선 or 트러블슈팅`);
  const labels=item.points.map(point=>point.split(':')[0]);
  if(labels.join()!=='문제,원인,해결,결과')failures.push(`portfolio ${pid}-${item.id}: bullets must be 문제/원인/해결/결과, got ${labels.join('/')}`);
}
// 가운데 점(·)은 나열에만 쓴다: 캡션·이름표·측정 조건에서 라벨을 붙일 때는 콜론이나 괄호를 쓴다
const walkStrings=(value,key,visit)=>{if(typeof value==='string')visit(key,value);else if(value&&typeof value==='object')for(const [k,v] of Object.entries(value))walkStrings(v,Array.isArray(value)?key:k,visit);};
walkStrings({portfolioMaterial,portfolioDoc},'',(key,value)=>{if(['alt','label','caption','note'].includes(key)&&value.includes(' · '))failures.push(`${key} uses ' · ' as a separator: ${value.slice(0,50)}`);});
if(projects.length!==6||projects.filter(p=>p.category==='work').length!==6)failures.push('Project count changed');
if(pages.length!==12)failures.push('Expected 11 pages and a 404 page');
if(failures.length){console.error(failures.join('\n'));process.exitCode=1;}else console.log(`Checked ${pages.length} HTML pages, internal links, metadata, 6 projects and four PDFs.`);
