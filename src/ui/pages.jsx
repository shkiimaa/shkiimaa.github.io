// 페이지: 공통 컴포넌트를 조립만 한다. 크기·간격은 components.jsx에서만 정한다.
import { profile, experiences, projects, skills } from '../content.mjs';
import { portfolioMaterial } from '../portfolio-content.mjs';
import { Document } from './layout.jsx';
import {
  Bullets, CaseStudy, CodeExample, Diagram, DocumentNext, External, Gallery, MeasurementNote, Meta, PageIntro, PageTitle,
  Paragraphs, ProjectHeader, Prose, ResultBox, SectionBlock, SubTitle, TaskList, TechLine, TechStack, TechTokens, TextLink, Toolbar, ArrowIcon, cx, text
} from './components.jsx';

export const projectHref = project => `/projects/${project.id}/`;
const startDate = project => Number((project.period.match(/\d{4}\.\d{2}/)?.[0] ?? '0000.00').replace('.', ''));
export const orderedProjects = [...projects].sort((a, b) => startDate(b) - startDate(a));
const workProjects = orderedProjects.filter(project => project.category === 'work');
const material = project => portfolioMaterial[project.id] || {};
// 포트폴리오 소개: 서비스 소개와 담당 범위를 한 문단으로 (문장마다 줄만 바뀜)
// 경력기술서·포트폴리오 PDF 첫 쪽에 넣는 웹 문서 링크 (이력서 PDF는 연락처 줄에 웹 이력서 링크가 있다)
const webLinks = [[`${profile.site}/`, '웹 이력서'], [`${profile.site}/career/`, '웹 경력기술서'], [`${profile.site}/portfolio/`, '웹 포트폴리오']];
// 포트폴리오 상세 PDF의 '웹 포트폴리오'는 웹 포트폴리오 상세 페이지로 연결한다
const detailWebLinks = [...webLinks.slice(0, 2), [`${profile.site}/portfolio-detail/`, '웹 포트폴리오']];
const portfolioIntro = project => `${material(project).overview} ${material(project).scope}`;

/* ── 이력서 ── */
const ResumeSection = ({ id, title, en, children }) => (
  <section id={id} className="mt-9 mobile:mt-8 print:mt-5">
    <div className="flex items-baseline gap-4 border-b-2 border-ink pb-3 print:border-b print:border-[#333] print:pb-2">
      <h2 className={text.section}>{title}</h2><Meta as="span">{en}</Meta>
    </div>
    {children}
  </section>
);
const Row = ({ as: Tag = 'article', className, id, meta, children }) => (
  <Tag id={id} className={cx('grid grid-cols-[10.875rem_minmax(0,1fr)] gap-7.5 border-b border-line py-7 last:border-b-0 tablet:grid-cols-[8.75rem_minmax(0,1fr)] tablet:gap-5.5 mobile:grid-cols-1 mobile:gap-3 mobile:py-6 print:break-inside-avoid print:py-4', className)}>
    <div className="row-meta mobile:flex mobile:flex-wrap mobile:items-baseline mobile:gap-x-3 mobile:gap-y-1">{meta}</div>
    <div className="min-w-0">{children}</div>
  </Tag>
);
const RowTitle = ({ children }) => <h3 className={cx(text.heading, 'mb-1.5 mobile:mb-0 mobile:basis-full')}>{children}</h3>;

function Resume() {
  const [, ...introDetails] = profile.introduction.split('\n\n');
  return (
    <Document title="이력서" description={profile.introduction.split('\n')[0]} route="/" active="resume" pageLabel="이력서" pdf="resume" toc={[['about', '소개'], ['experience', '경력'], ['projects', '프로젝트'], ['skills', '기술'], ['education', '학력']]}>
      <section id="about" className="pb-11 mobile:pb-6 print:pb-4">
        <div className="mb-5 flex items-baseline gap-5.5 mobile:mb-4 mobile:gap-4"><PageTitle>김수환</PageTitle><span className={cx(text.lead, 'font-semibold text-secondary')}>Frontend Developer</span></div>
        <p className="mb-4 text-2xl leading-snug font-semibold tracking-tight mobile:text-xl">기획부터 운영까지 경험한 개발자로,<br className="mobile:hidden print:hidden" /> 문제는 측정으로 확인하고 구조로 해결합니다.</p>
        <Paragraphs items={introDetails} size="lead" />
        <div className={cx(text.meta, 'mt-6 flex flex-wrap gap-x-5.5 gap-y-1.5 text-secondary')}>
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
          <a href="tel:+821099313175">{profile.phone}</a>
          <External href={profile.github}>GitHub</External>
          <External href={profile.site} className="hidden print:inline">웹 이력서</External>
        </div>
      </section>
      <ResumeSection id="experience" title="경력" en="Experience">
        {experiences.filter(job => ['daon', 'doit'].includes(job.id)).map(job => (
          <Row key={job.id} className="experience-row" meta={<><RowTitle>{job.name}</RowTitle><Meta className="tabular-nums">{job.period}</Meta></>}>
            <p className={cx(text.body, 'mb-2 font-semibold')}>{job.role}</p>
            {job.items.length === 1 ? <Prose as="p" text={job.items[0]} className={text.body} /> : <Bullets items={job.items} />}
          </Row>
        ))}
        {/* 개발 이전 경력은 개발 경력과 같은 비중으로 두지 않고 한 줄로 간결하게 */}
        {experiences.filter(job => job.id === 'founder').map(job => (
          <Row key={job.id} className="experience-row" meta={<Meta>이전 경력</Meta>}>
            <p className={cx(text.body, 'font-semibold')}>{job.name}<span className="font-normal text-secondary"> · {job.role} · <span className="tabular-nums">{job.period}</span></span></p>
            <p className={cx(text.body, 'text-secondary')}>{job.items[0]}</p>
          </Row>
        ))}
      </ResumeSection>
      <ResumeSection id="projects" title="프로젝트" en="Projects">
        {workProjects.map(project => (
          <Row key={project.id} id={`resume-${project.id}`} className="resume-project" meta={<>
            {/* 모바일은 경력기술서처럼 상세 보기 링크를 프로젝트 이름 줄에 둔다 */}
            <div className="flex items-baseline justify-between gap-3 mobile:basis-full">
              <RowTitle><a href={projectHref(project)}>{project.name}</a></RowTitle>
              <span className="hidden mobile:inline"><TextLink href={projectHref(project)} className="whitespace-nowrap">프로젝트 상세 보기</TextLink></span>
            </div>
            <Meta>{project.company}</Meta><Meta className="tabular-nums">{project.period}</Meta>
          </>}>
            <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-1">
              <h4 className={cx(text.lead, 'font-bold tracking-tight')}>{project.kind}</h4>
              <TextLink href={projectHref(project)} className="mt-px ml-auto mobile:hidden">프로젝트 상세 보기</TextLink>
            </div>
            <Meta className="mb-2.5">{project.role}</Meta>
            <Bullets items={project.summary} />
            <TechLine items={project.tech} />
          </Row>
        ))}
      </ResumeSection>
      <ResumeSection id="skills" title="기술" en="Skills">
        <dl>
          {skills.map(group => (
            <Row key={group.label} as="div" meta={<dt className={cx(text.body, 'font-semibold')}>{group.label}</dt>} className="py-5 mobile:gap-1.5 mobile:py-4 print:py-2">
              <dd className={cx(text.body, 'text-secondary')}><TechTokens items={group.items} /></dd>
            </Row>
          ))}
        </dl>
      </ResumeSection>
      <ResumeSection id="education" title="학력" en="Education">
        <div className="flex justify-between gap-6 pt-6 mobile:block print:pt-4">
          <div><RowTitle>{profile.education.school}</RowTitle><p className={cx(text.body, 'text-secondary')}>{profile.education.department}</p></div>
          <Meta className="text-right tabular-nums mobile:mt-3 mobile:text-left">{profile.education.period}<br className="mobile:hidden" /><span className="mobile:ml-2">{profile.education.status}</span></Meta>
        </div>
      </ResumeSection>
      <DocumentNext label="담당 업무와 문제 해결 과정을 더 자세히" href="/career/">경력기술서 읽기</DocumentNext>
    </Document>
  );
}

/* ── 프로젝트 공통 구역 ── */
const ProjectIntro = ({ project, items }) => (
  <div className="mt-3 max-w-180"><Paragraphs items={items} /></div>
);
const Results = ({ project }) => <>{project.insight && <ResultBox text={project.insight} />}{project.result && <ResultBox text={project.result} />}</>;

const Implementation = ({ project, prefix = '' }) => {
  const sections = material(project).sections;
  if (!sections?.length) return null;
  return (
    <SectionBlock id={`${prefix}implementation`} title="구현 구조와 설계" rule>
      {sections.map(section => (
        <section key={section.id} id={`${prefix}design-${section.id}`} className="implementation-section not-first-of-type:mt-10 print:not-first-of-type:mt-5">
          <SubTitle>{section.title}</SubTitle>
          <Paragraphs items={section.paragraphs} />
          {section.diagram && <Diagram name={section.diagram} caption={section.caption} />}
          {section.images && <Gallery images={section.images} className="mt-5" />}
        </section>
      ))}
    </SectionBlock>
  );
};

const Highlights = ({ project, prefix = '' }) => {
  const m = material(project);
  const items = (project.cases || []).filter(study => study.highlight);
  if (!items.length) return null;
  const diagrams = Object.fromEntries((m.caseDiagrams || []).map(d => [d.id, d]));
  const featured = m.featured || [];
  const featuredIds = new Set(featured.map(f => f.id));
  const evidence = f => f.evidence === 'code'
    ? (m.codeExamples?.[f.id]?.examples || []).map(item => <CodeExample key={item.label} label={item.label} code={item.code} />)
    : f.evidence === 'images' ? <Gallery images={m.caseImages?.[f.id]} className="mt-5" />
    : diagrams[f.id] ? <Diagram name={diagrams[f.id].diagram} caption={diagrams[f.id].caption} /> : null;
  const rest = items.filter(study => !featuredIds.has(study.id));
  return (
    <SectionBlock id={`${prefix}measurements`} title="문제 해결과 개선" rule>
      {featured.map(f => {
        const study = items.find(s => s.id === f.id);
        return (
          <section key={f.id} id={`${prefix}case-${f.id}`} className="implementation-section featured-case not-first-of-type:mt-10 print:not-first-of-type:mt-5">
            <SubTitle>{f.title || study.title}</SubTitle>
            <Paragraphs items={f.paragraphs} />
            {f.result && <ResultBox text={f.result} raw />}
            {f.method && <MeasurementNote text={f.method} raw />}
            {f.measure && <div className="measure-shot mt-5"><Gallery images={[f.measure]} single /></div>}
            {evidence(f)}
          </section>
        );
      })}
      {rest.length > 0 && (
        <ul className={cx('grid gap-8 print:gap-3', featured.length > 0 && 'mt-10 print:mt-5')}>
          {rest.map(study => (
            <li key={study.id} id={`${prefix}case-${study.id}`} className="min-w-0">
              <p className={text.heading}>{study.title}</p>
              <p className={cx(text.body, 'mt-2 text-secondary')}>{study.highlight}</p>
              {diagrams[study.id] && <Diagram name={diagrams[study.id].diagram} caption={diagrams[study.id].caption} />}
              <Gallery images={m.caseImages?.[study.id]} className="mt-4" />
            </li>
          ))}
        </ul>
      )}
    </SectionBlock>
  );
};

const Screens = ({ project, id }) => {
  const web = material(project).webImages || [];
  const images = [...(project.images || []), ...(material(project).images || [])];
  if (!images.length && !web.length) return null;
  return (
    <SectionBlock id={id} title="프로젝트 화면" rule className={cx('screens-section', web.length > 0 && images.length > 0 && 'print:break-before-page')}>
      <Gallery images={web} />
      <Gallery images={images} className={web.length ? 'mt-6 print:mt-3' : ''} printRow={web.length > 0} />
    </SectionBlock>
  );
};
const Technology = ({ project, id }) => <SectionBlock id={id} title="기술 스택" rule className="print:break-inside-avoid"><TechStack project={project} /></SectionBlock>;

/* ── 경력기술서 ── */
const CareerProject = ({ project }) => (
  <article id={project.id} className="career-project border-b border-line py-9 last:border-b-0 last:pb-0 mobile:py-7 print:py-6">
    <ProjectHeader project={project} href={projectHref(project)} />
    <ProjectIntro project={project} items={[project.description]} />
    <SectionBlock title="주요 업무"><TaskList tasks={project.tasks} /><Results project={project} /></SectionBlock>
    <SectionBlock title="기술 스택" className="print:break-inside-avoid"><TechStack project={project} /></SectionBlock>
    {project.cases?.length > 0 && (
      <SectionBlock title="문제 해결과 개선" rule>
        {project.cases.map(study => <CaseStudy key={study.id} study={study} id={`${project.id}-${study.id}`} />)}
      </SectionBlock>
    )}
  </article>
);

function Career() {
  return (
    <Document title="경력기술서" description="김수환의 프론트엔드·백엔드 개발 경험과 문제 해결·개선 사례입니다." route="/career/" active="career" pageLabel="경력기술서" pdf="career" toc={workProjects.map(p => [p.id, p.name])}>
      <PageIntro title="김수환 경력기술서" links={webLinks}>개발한 서비스, 담당한 역할,<br className="hidden mobile:inline" /> 그리고 문제를 해결한 과정입니다.</PageIntro>
      {experiences.slice(0, 2).map((job, j) => (
        <section key={job.id} id={job.id} className={j ? 'mt-17.5 mobile:mt-12 print:mt-7' : 'mt-7.5 mobile:mt-5 print:mt-4'}>
          <header className="flex items-start justify-between gap-5 border-t-2 border-b border-t-ink border-b-strong-line pt-5 pb-6 mobile:block mobile:py-4.5 print:items-baseline print:border-t-0 print:border-b-[#333] print:py-2.5 print:break-after-avoid">
            <div><h2 className={text.section}>{job.name}</h2><Meta className="mt-1 mobile:hidden print:hidden">{job.role}</Meta></div>
            <Meta className="tabular-nums whitespace-nowrap mobile:mt-2">{job.period}</Meta>
          </header>
          {workProjects.filter(p => p.companyId === job.id).map(project => <CareerProject key={project.id} project={project} />)}
        </section>
      ))}
      <DocumentNext label="프로젝트 화면과 구현 자료" href="/projects/">프로젝트 둘러보기</DocumentNext>
    </Document>
  );
}

/* ── 포트폴리오 ── */
const PortfolioList = ({ children }) => <div className="portfolio-document">{children}</div>;
const PortfolioProject = ({ index, children }) => (
  <div className={cx('portfolio-project', index > 0 ? 'mt-27.5 border-t-2 border-ink mobile:mt-18 print:mt-0 print:break-before-page print:border-t-0' : 'print:border-t print:border-[#333]')}>
    <article className="career-project pt-8 mobile:pt-6 print:pt-4">{children}</article>
  </div>
);

function Portfolio() {
  return (
    <Document title="포트폴리오" description="김수환의 프로젝트 구현 구조·문제 해결 사례·화면 자료 모음입니다." route="/portfolio/" active="portfolio" pageLabel="포트폴리오" pdf="portfolio" toc={orderedProjects.map(p => [p.id, p.name])}>
      <PortfolioList>
        <PageIntro title="김수환 포트폴리오" links={webLinks}>프로젝트 화면과 구조도를 중심으로 구현 방식과 설계 기준을 설명합니다.</PageIntro>
        <Toolbar count="6개 프로젝트" links={[['/portfolio-detail/', '상세 버전으로 보기'], ['/projects/', '프로젝트별로 보기']]} />
        {orderedProjects.map((project, i) => (
          <PortfolioProject key={project.id} index={i}>
            <div id={project.id}><ProjectHeader project={project} /></div>
            <ProjectIntro project={project} items={[portfolioIntro(project)]} />
            <Implementation project={project} prefix={`${project.id}-`} />
            <Highlights project={project} prefix={`${project.id}-`} />
            <Screens project={project} />
            <Technology project={project} />
            {project.links?.length > 0 && <div className="mt-4.5 flex flex-wrap gap-5">{project.links.map(link => <TextLink key={link.url} href={link.url} external>{link.label}</TextLink>)}</div>}
          </PortfolioProject>
        ))}
      </PortfolioList>
    </Document>
  );
}

// 포트폴리오 단독 제출용: 경력기술서의 설명(주요 업무·문제 해결 전문)에 포트폴리오 근거 자료를 붙인 문서
const CaseEvidence = ({ project, study }) => {
  const m = material(project);
  const diagram = (m.caseDiagrams || []).find(d => d.id === study.id);
  const featured = (m.featured || []).find(f => f.id === study.id);
  if (!featured?.measure && !m.caseImages?.[study.id] && !diagram) return null;
  return (
    <div className="featured-case">
      {featured?.measure && <div className="measure-shot mt-5"><Gallery images={[featured.measure]} single /></div>}
      <Gallery images={m.caseImages?.[study.id]} className="mt-5" />
      {diagram && <Diagram name={diagram.diagram} caption={diagram.caption} />}
    </div>
  );
};

function PortfolioDetail() {
  return (
    <Document title="포트폴리오 상세" description="김수환의 프로젝트 담당 업무·문제 해결 과정·구현 구조·화면 자료입니다." route="/portfolio-detail/" active="portfolio" pageLabel="포트폴리오 상세" pdf="portfolio-detail" toc={orderedProjects.map(p => [p.id, p.name])}>
      <PortfolioList>
        <PageIntro title="김수환 포트폴리오" links={detailWebLinks}>프로젝트별 담당 업무와 문제 해결 과정, 구현 구조와 실제 화면을 함께 정리했습니다.</PageIntro>
        <Toolbar count="6개 프로젝트" links={[['/portfolio/', '기본 버전으로 보기'], ['/projects/', '프로젝트별로 보기']]} />
        {orderedProjects.map((project, i) => (
          <PortfolioProject key={project.id} index={i}>
            <div id={project.id}><ProjectHeader project={project} /></div>
            <ProjectIntro project={project} items={[portfolioIntro(project)]} />
            <SectionBlock title="주요 업무"><TaskList tasks={project.tasks} /><Results project={project} /></SectionBlock>
            <Implementation project={project} prefix={`${project.id}-`} />
            {project.cases?.length > 0 && (
              <SectionBlock title="문제 해결과 개선" rule>
                {project.cases.map(study => (
                  <CaseStudy key={study.id} study={study} id={`case-${project.id}-${study.id}`}><CaseEvidence project={project} study={study} /></CaseStudy>
                ))}
              </SectionBlock>
            )}
            <Screens project={project} />
            <Technology project={project} />
          </PortfolioProject>
        ))}
      </PortfolioList>
    </Document>
  );
}

/* ── 프로젝트 목록 ── */
// 목록 대표 이미지: 웹 화면이 있으면 웹 화면을 먼저 쓴다
const thumbnail = project => material(project).webImages?.[0] || project.images?.[0] || material(project).images?.[0];

function ProjectIndex() {
  return (
    <Document title="프로젝트" description="Bitria, Gobit, Doit UI Kit, D.A.X 등 김수환이 개발한 6개 프로젝트입니다." route="/projects/" active="projects" pageLabel="프로젝트" pdf="portfolio" toc={[['main', '전체 프로젝트']]}>
      <PageIntro title="프로젝트">직접 개발한 6개 프로젝트의<br className="hidden mobile:inline" /> 담당 업무와 구현 사례입니다.</PageIntro>
      <Toolbar count="6개 프로젝트" links={[['/portfolio/', '한 페이지로 모두 보기']]} />
      <div>
        {orderedProjects.map(p => (
          <article key={p.id} data-category={p.category} className={cx('project-index-row group relative border-b border-line py-8 mobile:py-6 print:break-inside-avoid', thumbnail(p) && 'grid grid-cols-[minmax(0,1fr)_14.25rem] items-center gap-7 tablet:grid-cols-[minmax(0,1fr)_10.5rem] tablet:gap-5.5 mobile:grid-cols-1 mobile:gap-4')}>
            <div>
              <Meta className="mb-2">{p.company} <span className="mx-1.5 text-strong-line" aria-hidden="true">/</span> <span className="tabular-nums">{p.period}</span></Meta>
              <h2 className={text.title}>
                <a className="inline-flex items-center gap-3 group-hover:text-accent after:absolute after:inset-0 after:content-['']" href={projectHref(p)}>{p.name}<ArrowIcon className="size-4.5 text-accent" /></a>
              </h2>
              <p className={cx(text.lead, 'mt-1 font-semibold')}>{p.kind}</p>
              <Prose as="p" text={p.description} className={cx(text.body, 'mt-3 max-w-162 text-secondary')} />
              <TechLine items={p.tech} />
            </div>
            {thumbnail(p) && (
              <a className="relative block rounded-sm border border-line bg-wash p-2.5 mobile:p-4" href={projectHref(p)} tabIndex={-1} aria-hidden="true">
                <img className="h-34.5 w-full object-contain tablet:h-26 mobile:h-45" src={`/assets/${thumbnail(p).src}`} alt="" loading="lazy" decoding="async" />
              </a>
            )}
          </article>
        ))}
      </div>
    </Document>
  );
}

/* ── 프로젝트 상세 ── */
function ProjectDetail({ project, index }) {
  const m = material(project);
  const toc = [['overview', '프로젝트 소개']];
  if (m.sections?.length) toc.push(['implementation', '구현 구조와 설계']);
  if (project.cases?.some(study => study.highlight)) toc.push(['measurements', '문제 해결과 개선']);
  if (project.images?.length || m.images?.length) toc.push(['screens', '프로젝트 화면']);
  toc.push(['technology', '기술 스택']);
  const previous = orderedProjects[index - 1], next = orderedProjects[index + 1];
  return (
    <Document title={project.name} description={project.description} route={projectHref(project)} active="projects" pageLabel={project.name} pdf="portfolio" toc={toc}>
      <a className={cx(text.meta, 'mb-8 inline-flex gap-2 text-muted mobile:mb-6 print:hidden')} href="/projects/"><span aria-hidden="true">←</span> 프로젝트 목록</a>
      <section id="overview">
        <Meta className="mb-3.5">{project.category === 'work' ? `${project.company} · 업무 프로젝트` : '팀 프로젝트'}</Meta>
        <ProjectHeader project={project} large />
        <ProjectIntro project={project} items={[portfolioIntro(project)]} />
        {project.links?.length > 0 && <div className="mt-4 flex gap-5">{project.links.map(link => <TextLink key={link.url} href={link.url} external>{link.label}</TextLink>)}</div>}
      </section>
      <Implementation project={project} />
      <Highlights project={project} />
      <Screens project={project} id="screens" />
      <Technology project={project} id="technology" />
      <nav className="mt-12.5 flex justify-between gap-5 border-t border-strong-line pt-5.5 mobile:mt-9 print:hidden" aria-label="다른 프로젝트">
        {previous ? <a href={projectHref(previous)}><Meta as="span" className="mb-1.5 block">이전 프로젝트</Meta><strong className={cx(text.body, 'font-semibold')}>← {previous.name}</strong></a> : <span />}
        {next && <a className="text-right" href={projectHref(next)}><Meta as="span" className="mb-1.5 block">다음 프로젝트</Meta><strong className={cx(text.body, 'font-semibold')}>{next.name} →</strong></a>}
      </nav>
    </Document>
  );
}

function NotFound() {
  return (
    <Document title="페이지를 찾을 수 없습니다" description="김수환의 이력서로 돌아갑니다." route="/404.html" active="" pageLabel="페이지 안내">
      <Meta className="mb-3">404</Meta>
      <PageIntro title="페이지를 찾을 수 없습니다">주소를 확인하거나 이력서로 돌아가 주세요.</PageIntro>
      <TextLink href="/">이력서로 돌아가기</TextLink>
    </Document>
  );
}

// 경로 → 페이지
export const pages = [
  ['/', () => <Resume />],
  ['/career/', () => <Career />],
  ['/projects/', () => <ProjectIndex />],
  ['/portfolio/', () => <Portfolio />],
  ['/portfolio-detail/', () => <PortfolioDetail />],
  ...orderedProjects.map((project, i) => [projectHref(project), () => <ProjectDetail project={project} index={i} />])
];
export const notFound = () => <NotFound />;
