import { mkdir, writeFile, cp, rm } from 'node:fs/promises';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { profile, experiences, projects, skills } from '../src/content.mjs';
import { portfolioMaterial } from '../src/portfolio-content.mjs';

export const root = fileURLToPath(new URL('../', import.meta.url));
const out = path.join(root, 'dist');
const origin = 'https://shkiimaa.github.io';
const escape = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const e = escape;
// Start each complete sentence on a fresh line so copy never leaves a short
// fragment at the end of a wrapped line. The same markup is used for screen and print.
const prose = value => e(value).replace(/([.!?])\s+(?=[\p{L}\d(])/gu, '$1<br class="sentence-break">');
const external = (label, href, cls = '') => `<a class="${cls}" href="${e(href)}" target="_blank" rel="noopener noreferrer">${e(label)}<span aria-hidden="true"> ↗</span></a>`;
const list = items => `<ul class="bullets">${items.map(item => `<li>${prose(item)}</li>`).join('')}</ul>`;
const techTokens = items => items.map((item,index)=>`<span class="tech-token">${e(item)}${index<items.length-1?' <span aria-hidden="true">·</span>':''}</span>`).join(' ');
const tech = project => project.techGroups?.length
  ? `<div class="tech-groups">${project.techGroups.map(([label,items])=>`<p><span class="tech-label">${e(label)}</span><span>${techTokens(items)}</span></p>`).join('')}</div>`
  : `<p class="tech-line"><span class="tech-label">기술</span>${techTokens(project.tech)}</p>`;
const projectHref = project => `/projects/${project.id}/`;
const projectStartDate = project => Number((project.period.match(/\d{4}\.\d{2}/)?.[0] ?? '0000.00').replace('.', ''));
const orderedProjects = [...projects].sort((a, b) => projectStartDate(b) - projectStartDate(a));
const featuredOrder = ['bitria', 'gobit', 'doit-uikit', 'dax', 'doit-homepage', 'xrgis'];
const workProjects = featuredOrder.map(id => projects.find(project => project.id === id)).filter(Boolean);
const projectNames = { daon: '다온소프트랩', doit: '두잇' };

function sidebar(items, pageTitle) {
  return `<aside class="page-sidebar"><div class="sidebar-sticky"><p class="sidebar-title">${pageTitle}</p><nav class="section-nav" aria-label="페이지 목차">${items.map(([id,label])=>`<a href="#${id}">${e(label)}</a>`).join('')}</nav><div class="sidebar-contact"><span>Contact</span><a href="mailto:${profile.email}">${profile.email}</a>${external('GitHub', profile.github)}</div></div></aside>`;
}

function layout({ title, description, route, active, body, toc = [], pageLabel, pdf }) {
  const nav = [['/', '이력서', 'resume'], ['/career/', '경력기술서', 'career'], ['/projects/', '프로젝트', 'projects']];
  return `<!doctype html>
<html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${e(title)} | 김수환</title><meta name="description" content="${e(description)}"><meta name="theme-color" content="#ffffff"><meta name="color-scheme" content="light"><link rel="canonical" href="${origin}${route}"><meta property="og:type" content="website"><meta property="og:locale" content="ko_KR"><meta property="og:site_name" content="김수환 · Frontend Developer"><meta property="og:title" content="${e(title)} | 김수환"><meta property="og:description" content="${e(description)}"><meta property="og:url" content="${origin}${route}"><meta property="og:image" content="${origin}/assets/og.png"><meta name="twitter:card" content="summary_large_image"><link rel="icon" href="/favicon.svg" type="image/svg+xml"><link rel="preload" href="/fonts/PretendardVariable.woff2" as="font" type="font/woff2" crossorigin><link rel="stylesheet" href="/styles.css"><script src="/app.js" defer></script></head>
<body><a class="skip-link" href="#main">본문으로 이동</a>
<header class="site-header"><div class="header-inner"><a class="wordmark" href="/" aria-label="김수환 이력서">김수환<span>Frontend Developer</span></a><nav class="primary-nav" aria-label="주 메뉴">${nav.map(([href,label,key])=>`<a href="${href}"${active===key?' aria-current="page"':''}>${label}</a>`).join('')}</nav>${pdf ? `<a class="download-link" href="/${pdf}.pdf" download="김수환_${pdf==='resume'?'이력서':pdf==='career'?'경력기술서':'포트폴리오'}.pdf">${pdf==='portfolio'?'포트폴리오 PDF':'PDF 다운로드'} <span aria-hidden="true">↓</span></a>` : '<button class="download-link" type="button" data-print>인쇄 <span aria-hidden="true">↗</span></button>'}</div></header>
<div class="page-shell">${sidebar(toc,pageLabel)}<main id="main" class="document" tabindex="-1">${body}</main></div>
<footer class="site-footer"><span>© ${new Date().getUTCFullYear()} Suhwan Kim</span><a href="mailto:${profile.email}">${profile.email}</a><a href="#main" class="back-top">맨 위로 <span aria-hidden="true">↑</span></a></footer>
<dialog class="image-dialog" aria-label="프로젝트 화면 확대"><button type="button" class="dialog-close" aria-label="확대 화면 닫기">닫기 ×</button><img src="" alt=""><p></p></dialog></body></html>`;
}

function resumeProject(project) {
  return `<article class="resume-project" id="resume-${project.id}"><div class="row-meta"><h3><a href="${projectHref(project)}">${e(project.name)}</a></h3><p>${e(project.company)}</p><p class="numeric">${e(project.period)}</p>${project.periodNote?`<p class="period-note">${e(project.periodNote)}</p>`:''}</div><div class="row-body"><h4>${e(project.kind)}</h4><p class="role-line">${e(project.role)}</p>${list(project.summary)}<p class="compact-tech">${project.tech.slice(0, project.id==='bitria'?13:9).map(e).join(' · ')}</p><a class="text-link" href="${projectHref(project)}">프로젝트 자세히 보기 <span aria-hidden="true">↗</span></a></div></article>`;
}

function resume() {
  const [introLead, ...introDetails] = profile.introduction.split('\n\n');
  const body = `<section class="resume-intro" id="about"><div class="intro-heading"><h1>김수환</h1><span class="role-badge">Frontend Developer</span></div><p class="intro-lead">${prose(introLead)}</p><div class="intro-description">${introDetails.map(copy=>`<p>${prose(copy)}</p>`).join('')}</div><div class="contact-links"><a href="mailto:${profile.email}">${profile.email}</a><a href="tel:+821099313175">${profile.phone}</a>${external('GitHub',profile.github)}</div></section>
<section class="resume-section" id="experience"><div class="section-heading"><h2>경력</h2><span>Experience</span></div>${experiences.filter(job=>['daon','doit'].includes(job.id)).map(job=>`<article class="experience-row"><div class="row-meta"><h3>${e(job.name)}</h3><p class="numeric">${e(job.period)}</p></div><div class="row-body"><p class="job-role">${e(job.role)}</p>${job.items.length===1?`<p>${prose(job.items[0])}</p>`:list(job.items)}</div></article>`).join('')}</section>
<section class="resume-section" id="projects"><div class="section-heading"><h2>프로젝트</h2><span>Projects</span></div>${workProjects.map(resumeProject).join('')}</section>
<section class="resume-section" id="skills"><div class="section-heading"><h2>기술</h2><span>Skills</span></div><dl class="skills-list">${skills.map(group=>`<div><dt>${e(group.label)}</dt><dd>${techTokens(group.items)}</dd></div>`).join('')}</dl></section>
<section class="resume-section" id="education"><div class="section-heading"><h2>학력</h2><span>Education</span></div><div class="education-row"><div><h3>${profile.education.school}</h3><p>${profile.education.department}</p></div><p class="numeric">${profile.education.period}<br><span class="muted">${profile.education.status}</span></p></div></section>
<div class="document-next"><span>담당 업무와 문제 해결 과정을 더 자세히</span><a href="/career/">경력기술서 읽기 <span aria-hidden="true">→</span></a></div>`;
  return layout({title:'이력서',description:profile.introduction,route:'/',active:'resume',body,pageLabel:'이력서',pdf:'resume',toc:[['about','소개'],['experience','경력'],['projects','프로젝트'],['skills','기술'],['education','학력']]});
}

function taskList(project) {
  return `<dl class="task-list">${project.tasks.map(([label,copy])=>`<div><dt>${e(label)}</dt><dd>${prose(copy)}</dd></div>`).join('')}</dl>`;
}

function caseStudy(study, prefix = '', showReports = false) {
  return `<section class="case-study" id="${prefix}${study.id}"><h3>${e(study.title)}</h3>${study.period?`<p class="role-line numeric">${e(study.period)}</p>`:''}${study.paragraphs.map(copy=>`<p>${prose(copy)}</p>`).join('')}${study.items?list(study.items):''}<div class="result"><strong>결과</strong><p>${prose(study.result)}</p></div>${study.note?`<p class="measurement-note">${prose(study.note)}</p>`:''}${showReports ? measurementDataLink(portfolioMaterial.bitria.evidence.find(item=>item.caseId===study.id)) + measurementReports(portfolioMaterial.bitria.evidence.find(item=>item.caseId===study.id)) : ''}</section>`;
}

function careerProject(project, { portfolio = false } = {}) {
  return `<article class="career-project" id="${project.id}"><div class="project-overview"><header class="project-heading"><h2>${e(project.name)}</h2><p class="project-kind">${e(project.kind)}</p><div class="project-meta"><span class="numeric">${e(project.period)}</span><span>${e(project.role)}</span></div>${project.periodNote?`<p class="period-note">${e(project.periodNote)}</p>`:''}</header><p class="project-description">${prose(project.description)}</p><h3 class="subsection-heading">주요 업무</h3>${taskList(project)}${project.insight?`<p class="implementation-note">${prose(project.insight)}</p>`:''}${project.result?`<div class="result"><strong>결과</strong><p>${prose(project.result)}</p></div>`:''}${tech(project)}</div>${project.cases?.length?`<div class="case-group"><p class="case-group-label">대표 문제 해결</p>${project.cases.map(study=>caseStudy(study,project.id+'-')).join('')}</div>`:''}${portfolio?implementation(project,project.id+'-')+projectGallery(project):''}<a class="text-link" href="${projectHref(project)}">프로젝트 상세 보기 <span aria-hidden="true">↗</span></a></article>`;
}

function career() {
  const body = `<div class="page-intro"><p class="page-kicker">김수환 · Frontend Developer</p><h1>경력기술서</h1><p>개발한 서비스, 담당한 역할,<br class="mobile-break"> 그리고 문제를 해결한 과정입니다.</p></div>${experiences.slice(0,2).map(job=>`<section class="company-section" id="${job.id}"><header class="company-heading"><div><h2>${e(job.name)}</h2><p>${e(job.role)}</p></div><p class="numeric">${e(job.period)}</p></header>${workProjects.filter(p=>p.companyId===job.id).map(careerProject).join('')}</section>`).join('')}<div class="document-next"><span>프로젝트 화면과 구현 자료</span><a href="/projects/">프로젝트 둘러보기 <span aria-hidden="true">→</span></a></div>`;
  return layout({title:'경력기술서',description:'김수환의 프론트엔드·백엔드 개발 경험과 대표 문제 해결 사례입니다.',route:'/career/',active:'career',body,pageLabel:'경력기술서',pdf:'career',toc:workProjects.map(p=>[p.id,p.name])});
}

function gallery(images, comparison = false) {
  if (!images?.length) return '';
  return `<div class="project-gallery${comparison ? ' measurement-gallery' : ''}">${images.map(image=>`<figure><button class="image-expand" type="button" data-image="/assets/${e(image.src)}" data-caption="${e(image.alt)}" aria-label="${e(image.alt)} 확대"><img src="/assets/${e(image.src)}" alt="${e(image.alt)}" loading="lazy" decoding="async"><span class="image-hint">화면 확대 <span aria-hidden="true">↗</span></span></button><figcaption>${e(image.alt)}${image.fullSrc ? `<a class="full-record-link" href="/assets/${e(image.fullSrc)}" target="_blank" rel="noopener noreferrer">전체 기록 보기 ↗</a>` : ''}</figcaption></figure>`).join('')}</div>`;
}

function measurementDataLink(item) {
  return item?.measurementFile ? `<p class="measurement-data-link"><a href="/assets/${e(item.measurementFile)}" download>전후 각 5회 렌더 계측 데이터(JSON) 다운로드 ↗</a> · <a href="/assets/bitria-render-evidence.zip" download>원본 Chrome trace·캡처 ZIP 다운로드 ↗</a></p>` : '';
}

function measurementReports(item) {
  return item?.images?.length ? `<div class="measurement-reports"><h4>${e(item.reportTitle || "Lighthouse 원본 보고서 전후 비교")}</h4>${gallery(item.images, true)}${item.reportNote ? `<p class="measurement-note">${prose(item.reportNote)}</p>` : ''}</div>` : '';
}

function implementation(project, prefix = '') {
  const material = portfolioMaterial[project.id];
  if (!material?.sections?.length) return '';
  return `<section class="detail-section implementation" id="${prefix}implementation"><h2>구현 구조와 설계</h2>${material.sections.map(section=>`<section class="implementation-section" id="${prefix}design-${section.id}"><h3>${e(section.title)}</h3>${section.paragraphs.map(p=>`<p>${prose(p)}</p>`).join('')}${section.diagram?`<figure class="architecture-diagram"><div class="diagram-scroll" role="region" aria-label="${e(section.caption)}" tabindex="0">${readFileSync(path.join(root,'public/assets/diagrams',section.diagram+'.svg'),'utf8')}</div><figcaption>${e(section.caption)}</figcaption></figure>`:''}${section.afterFlow?`<div class="after-flow"><h4>수정 후</h4><ol>${section.afterFlow.map(step=>`<li>${e(step)}</li>`).join('')}</ol></div>`:''}${section.images?gallery(section.images):''}</section>`).join('')}</section>`;
}

function projectGallery(project, id = '') {
  const images = [...(project.images || []), ...(portfolioMaterial[project.id]?.images || [])];
  return images.length ? `<section class="detail-section"${id?` id="${id}"`:''}><h2>${project.id === 'bitria' ? 'Lighthouse 원본 보고서 전후 비교' : (id ? '' : e(project.name)+' · ')+'프로젝트 화면'}</h2>${gallery(images, project.id === 'bitria')}</section>` : '';
}

function portfolioProject(project) {
  const evidence = portfolioMaterial[project.id]?.evidence || [];
  return `<article class="career-project" id="${project.id}"><div class="portfolio-overview"><header class="project-heading"><h2>${e(project.name)}</h2><p class="project-kind">${e(project.kind)}</p><div class="project-meta"><span class="numeric">${e(project.period)}</span><span>${e(project.role)}</span></div>${project.periodNote?`<p class="period-note">${e(project.periodNote)}</p>`:''}</header><p class="project-description">${prose(project.description)}</p><div class="portfolio-scope"><h3>담당 범위</h3>${list(project.summary.slice(0, project.id==='bitria'?4:3))}</div></div>${evidence.map(item=>`<section class="evidence-section"><h3>${e(item.title)}</h3><p><strong>문제</strong> ${prose(item.problem)}</p><p><strong>판단·수정</strong> ${prose(item.decision)}</p>${item.metrics?`<table class="metric-table"><caption>${e(item.caption)}</caption><thead><tr><th scope="col">지표</th><th scope="col">개선 전</th><th scope="col">개선 후</th></tr></thead><tbody>${item.metrics.map(row=>`<tr>${row.map((cell,i)=>i===0?`<th scope="row">${e(cell)}</th>`:`<td>${e(cell)}</td>`).join('')}</tr>`).join('')}</tbody></table>`:''}<p class="measurement-note">${prose(item.note)}</p>${measurementDataLink(item)}${measurementReports(item)}</section>`).join('')}${project.insight?`<p class="implementation-note">${prose(project.insight)}</p>`:''}${implementation(project,project.id+'-')}${projectGallery(project)}<p class="portfolio-detail-link"><a href="${origin}${projectHref(project)}">${e(project.name)} 상세 설명 ↗</a></p></article>`;
}

function portfolio() {
  const body = `<div class="portfolio-document"><div class="page-intro portfolio-cover"><p class="page-kicker">Frontend Developer · ${external('GitHub',profile.github)}</p><h1>김수환 포트폴리오</h1><p>실시간 UI 성능·공통 컴포넌트·멀티 플랫폼 구현 사례</p></div>${workProjects.map(project=>`<div class="portfolio-project"><p class="portfolio-company">${e(project.company)} · 업무 프로젝트</p>${portfolioProject(project)}</div>`).join('')}</div>`;
  return layout({title:'포트폴리오',description:'김수환의 프로젝트 구현 구조·문제 해결 사례·화면 자료 모음입니다.',route:'/portfolio/',active:'projects',body,pageLabel:'포트폴리오',pdf:'portfolio',toc:workProjects.map(p=>[p.id,p.name])});
}

function projectIndex() {
  const body = `<div class="page-intro"><p class="page-kicker">프론트엔드 · 백엔드 · 서비스 운영</p><h1>프로젝트</h1><p>직접 개발하고 운영한 6개 프로젝트의<br class="mobile-break"> 담당 업무와 구현 사례입니다.</p></div><div class="project-toolbar"><p class="project-count" aria-live="polite">6개 프로젝트</p></div><div class="project-index">${orderedProjects.map(p=>`<article class="project-index-row${p.images?' has-image':''}" data-category="${p.category}"><div class="project-index-content"><p class="index-meta">${e(p.company)} <span aria-hidden="true">/</span> <span class="numeric">${e(p.period)}</span></p><h2><a href="${projectHref(p)}">${e(p.name)}<span aria-hidden="true">↗</span></a></h2><p class="index-kind">${e(p.kind)}</p><p class="index-description">${prose(p.description)}</p><p class="compact-tech">${p.tech.slice(0,6).map(e).join(' · ')}</p></div>${p.images?`<a class="project-thumbnail" href="${projectHref(p)}" tabindex="-1" aria-hidden="true"><img src="/assets/${p.images[0].src}" alt="" loading="lazy" decoding="async"></a>`:''}</article>`).join('')}</div>`;
  return layout({title:'프로젝트',description:'Bitria, Gobit, doit-uikit, D.A.X 등 김수환이 개발한 6개 프로젝트입니다.',route:'/projects/',active:'projects',body,pageLabel:'프로젝트',pdf:'portfolio',toc:[['main','전체 프로젝트']]});
}

function projectDetail(project, index) {
  const toc=[['overview','프로젝트 소개'],['work','담당 업무']];
  if(project.cases?.length)toc.push(...project.cases.map(study=>[study.id,study.title]));
  if(portfolioMaterial[project.id]?.sections?.length)toc.push(['implementation','구현 구조와 설계']);
  if(project.images?.length||portfolioMaterial[project.id]?.images?.length)toc.push(['screens','프로젝트 화면']);
  toc.push(['technology','사용 기술']);
  const previous=orderedProjects[index-1],next=orderedProjects[index+1];
  const body=`<a class="breadcrumb" href="/projects/"><span aria-hidden="true">←</span> 프로젝트 목록</a><section class="detail-intro" id="overview"><p class="page-kicker">${project.category==='work'?e(project.company)+' · 업무 프로젝트':'팀 프로젝트'}</p><h1>${e(project.name)}</h1><p class="detail-kind">${e(project.kind)}</p><div class="project-meta"><span class="numeric">${e(project.period)}</span><span>${e(project.role)}</span></div>${project.periodNote?`<p class="period-note">${e(project.periodNote)}</p>`:''}<p class="detail-description">${prose(project.description)}</p>${project.links?.length?`<div class="project-links">${project.links.map(link=>external(link.label,link.url,'text-link')).join('')}</div>`:''}</section>${project.outcomes?`<dl class="outcome-strip">${project.outcomes.map(outcome=>`<div><dt>${e(outcome.label)}</dt><dd>${outcome.value}<span>감소</span></dd><p>${e(outcome.detail)}</p></div>`).join('')}</dl>`:''}<section class="detail-section" id="work"><h2>담당 업무</h2>${taskList(project)}${project.insight?`<p class="implementation-note">${prose(project.insight)}</p>`:''}${project.result?`<div class="result"><strong>결과</strong><p>${prose(project.result)}</p></div>`:''}</section>${project.cases?.map(study=>caseStudy(study, '', true)).join('')||''}${implementation(project)}${projectGallery(project,'screens')}<section class="detail-section" id="technology"><h2>사용 기술</h2><p class="technology-text">${project.tech.map(e).join(' · ')}</p></section><nav class="project-pagination" aria-label="다른 프로젝트">${previous?`<a href="${projectHref(previous)}"><span>이전 프로젝트</span><strong>← ${e(previous.name)}</strong></a>`:'<span></span>'}${next?`<a href="${projectHref(next)}"><span>다음 프로젝트</span><strong>${e(next.name)} →</strong></a>`:''}</nav>`;
  return layout({title:project.name,description:project.description,route:projectHref(project),active:'projects',body,pageLabel:project.name,pdf:'portfolio',toc});
}

export async function build() {
  await rm(out,{recursive:true,force:true});
  await mkdir(out,{recursive:true});
  await cp(path.join(root,'public'),out,{recursive:true});
  await cp(path.join(root,'src/styles.css'),path.join(out,'styles.css'));
  await cp(path.join(root,'src/app.js'),path.join(out,'app.js'));
  const pages=[['/',resume()],['/career/',career()],['/projects/',projectIndex()],['/portfolio/',portfolio()],...orderedProjects.map((p,i)=>[projectHref(p),projectDetail(p,i)])];
  for(const [route,html] of pages){const directory=path.join(out,route);await mkdir(directory,{recursive:true});await writeFile(path.join(directory,'index.html'),html);}
  await writeFile(path.join(out,'404.html'),layout({title:'페이지를 찾을 수 없습니다',description:'김수환의 이력서로 돌아갑니다.',route:'/404.html',active:'',pageLabel:'페이지 안내',body:'<div class="page-intro"><p class="page-kicker">404</p><h1>페이지를 찾을 수 없습니다.</h1><p>주소를 확인하거나 이력서로 돌아가 주세요.</p><a class="text-link" href="/">이력서로 돌아가기 →</a></div>'}));
  await writeFile(path.join(out,'sitemap.xml'),`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${pages.map(([route])=>`<url><loc>${origin}${route}</loc></url>`).join('')}</urlset>`);
  await writeFile(path.join(out,'robots.txt'),`User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`);
  console.log(`Built ${pages.length} pages → dist/`);
}

if(process.argv[1]===fileURLToPath(import.meta.url))await build();
