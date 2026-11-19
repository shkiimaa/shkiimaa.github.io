// 페이지: 공통 컴포넌트를 조립만 한다. 크기·간격은 components.jsx에서만 정한다.
import { profile, experiences, projects, skills, careerDetails } from '../content.mjs';
import { portfolioMaterial } from '../portfolio-content.mjs';
import { Document } from './layout.jsx';
import {
  Bar, Bullets, CaseStudy, CodeExample, Diagram, DocumentNext, Gallery, IconLinks, MeasurementNote, Meta, PageIntro, PageTitle,
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
// 포트폴리오는 경력기술서 내용을 담고 있어 웹 경력기술서 링크를 빼고, '웹 포트폴리오'는 웹 포트폴리오 페이지로 연결한다
const portfolioIntro = project => [material(project).overview, material(project).scope].filter(Boolean).join(' ');

/* ── 이력서 ── */
// 구역 사이 간격은 여기 한 곳에서만 정한다 (소개 → 경력 → 스킬 → 학력이 모두 같은 간격)
// 구역 제목 옆의 보조 정보(총 경력)는 제목 바로 옆에 옅게 둔다
const ResumeSection = ({ id, title, note, className, children }) => (
  <section id={id} className={cx('mt-14 mobile:mt-11 print:mt-10', className)}>
    <div className="flex items-baseline gap-3 border-b-2 border-ink pb-3 print:border-b print:border-[#333] print:pb-2">
      <h2 className={text.heading}>{title}</h2>
      {note && <span className={cx(text.body, 'text-muted tabular-nums')}>{note}</span>}
    </div>
    {children}
  </section>
);
// 회사·학교 표시: 로고가 있으면 로고, 없으면 이름 첫 글자 ((주) 같은 법인 표기는 뺀다)
// 크기는 이름 줄 글자 윗선부터 기간 줄 글자 아랫선까지의 높이에 맞춘다
const Mark = ({ name, logo }) => (
  <span className={cx('mt-1 flex aspect-square w-10 shrink-0 items-center justify-center self-start overflow-hidden rounded-sm border border-line', logo ? 'bg-paper' : 'bg-wash')} aria-hidden="true">
    {logo
      ? <img className="w-full object-contain p-1" src={`/assets/${logo}`} alt="" />
      : <span className={cx(text.body, 'font-semibold text-secondary')}>{name.replace(/\(주\)/, '').trim()[0]}</span>}
  </span>
);
// 표시 + 이름·보조 줄. 머리줄은 PDF에서 쪼개지지 않는다.
// rule(아래에 프로젝트가 이어지는 회사 줄)일 때만 바로 뒤 내용과 같은 쪽에 묶는다 —
// 뒤 내용이 없는 줄까지 묶으면 다음 구역 제목과 떨어지지 못해, 다음 구역이 쪽 사이에서 쪼개진다
const MarkedHead = ({ name, logo, rule, children }) => (
  <header className={cx('flex gap-x-4 mobile:gap-x-3 print:break-inside-avoid', rule && 'print:break-after-avoid')}>
    <Mark name={name} logo={logo} />
    <div className={cx('min-w-0 flex-1', rule && 'border-b border-line pb-3.5 print:pb-2.5')}>
      <h3 className={text.item}>{name}</h3>
      <p className={cx(text.lead, 'flex flex-wrap items-center leading-6 tabular-nums')}>{children}</p>
    </div>
  </header>
);
// 표시 너비 + 간격만큼의 들여쓰기: 프로젝트가 회사 이름과 같은 세로선에 맞는다
const underMark = 'pl-14 mobile:pl-13';
// breakable: 인쇄 시 줄 안에서 쪽이 나뉘어도 되는 경우 (여러 항목을 품는 묶음 —
// 통째로 안 쪼개지게 두면 다음 쪽으로 밀려 앞쪽에 큰 빈칸이 생긴다)
const Row = ({ as: Tag = 'article', className, id, meta, breakable, children }) => (
  <Tag id={id} className={cx('grid grid-cols-[10.875rem_minmax(0,1fr)] gap-7.5 border-b border-line py-7 last:border-b-0 tablet:grid-cols-[8.75rem_minmax(0,1fr)] tablet:gap-5.5 mobile:grid-cols-1 mobile:gap-3 mobile:py-6 print:py-4', !breakable && 'print:break-inside-avoid', className)}>
    <div className="row-meta mobile:flex mobile:flex-wrap mobile:items-baseline mobile:gap-x-3 mobile:gap-y-1">{meta}</div>
    <div className="min-w-0">{children}</div>
  </Tag>
);

// 개발 경력 합계: 회사 기간을 시작·종료 월을 포함해 더하고, '현재'·'재직 중'은 빌드 시점의 달까지 센다
const devJobs = experiences.filter(job => ['daon', 'doit'].includes(job.id));
const monthIndex = ym => { const [y, m] = ym.split('.').map(Number); return y * 12 + m - 1; };
const jobMonths = job => {
  const now = new Date();
  const [start, end] = job.period.split('–').map(part => part.trim());
  const last = ['현재', '재직 중'].includes(end) ? now.getFullYear() * 12 + now.getMonth() : monthIndex(end);
  return last - monthIndex(start) + 1;
};
const formatMonths = months => [months >= 12 && `${Math.floor(months / 12)}년`, months % 12 && `${months % 12}개월`].filter(Boolean).join(' ');
const careerTotal = jobs => formatMonths(jobs.reduce((sum, job) => sum + jobMonths(job), 0));

const pdfContacts = [
  ['전화번호', 'tel:+821099313175', profile.phone],
  ['이메일', `mailto:${profile.email}`, profile.email],
  ['포트폴리오', `${profile.site}/portfolio/`, `${profile.site.replace('https://', '')}/portfolio`]
];

// 개발 이전 경력: 회사 줄과 같은 모양으로 이름·기간·직함만 (프로젝트 없음, 총 경력에는 넣지 않는다)
const EarlierCareer = () => experiences.filter(job => job.id === 'founder').map(job => (
  <section key={job.id} className="experience-group pt-16 mobile:pt-13 print:pt-14">
    <MarkedHead name={job.name} logo={job.logo}>
      <span className="whitespace-nowrap">{job.period}</span><Bar /><span>{job.role}</span><Bar /><span className="text-secondary">개발 이전 경력</span>
    </MarkedHead>
  </section>
));
// 스킬·학력: 이력서와 경력기술서가 같은 구역을 쓴다
const SkillsAndEducation = () => (
  <>
    {/* 기술 표는 PDF에서 페이지 사이에 나뉘지 않게 한 덩어리로 둔다 */}
    <ResumeSection id="skills" title="스킬" className="print:break-inside-avoid">
      {/* 첫 줄 위 간격을 다른 구역(제목 선 아래 pt-7)과 같게 맞춘다 */}
      <dl className="print:pt-1.5">
        {skills.map(group => (
          <Row key={group.label} as="div" meta={<dt className={cx(text.body, 'font-semibold')}>{group.label}</dt>} className="py-5 mobile:gap-1.5 mobile:py-4 print:py-2">
            <dd className={cx(text.body, 'text-secondary')}><TechTokens items={group.items} /></dd>
          </Row>
        ))}
      </dl>
    </ResumeSection>
    <ResumeSection id="education" title="학력" className="print:break-inside-avoid">
      <div className="pt-7 mobile:pt-6 print:pt-5">
        <MarkedHead name={profile.education.school}>
          <span className="whitespace-nowrap">{profile.education.period}</span><Bar /><span>{profile.education.status}</span><Bar /><span>{profile.education.department}</span>
        </MarkedHead>
      </div>
    </ResumeSection>
  </>
);

// 이름·연락처·사진·소개 글: 이력서와 경력기술서가 같은 머리를 쓴다
const ProfileHead = () => {
  const [, ...introDetails] = profile.introduction.split('\n\n');
  return (
    <>
      {/* 연락처는 이름 줄 오른쪽에 둔다 (모바일은 이름 아래로 줄바꿈)
          PDF는 연락처를 이름 아래로 내리고, 그 옆에만 증명사진을 둬서 소개 문단 폭은 그대로 쓴다 (웹 화면에는 사진 없음) */}
      <div className="mb-5 mobile:mb-4 print:mb-8 print:flex print:items-start print:justify-between print:gap-6">
        <div>
          <div className="flex flex-wrap items-baseline gap-x-5.5 gap-y-2 mobile:gap-x-4">
            <PageTitle>김수환</PageTitle><span className={cx(text.lead, 'font-semibold text-secondary')}>Frontend Engineer</span>
            <div className={cx(text.meta, 'ml-auto flex flex-wrap gap-x-5.5 gap-y-1.5 text-secondary mobile:ml-0 mobile:basis-full print:hidden')}>
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
              <a href="tel:+821099313175">{profile.phone}</a>
            </div>
          </div>
          {/* PDF 연락처: 이름 아래에 항목 이름을 붙여 세로로 나열하고, 출력해도 읽히게 주소를 보여준다 */}
          <dl className={cx(text.body, 'mt-3 hidden grid-cols-[auto_minmax(0,1fr)] gap-x-5 print:grid')}>
            {pdfContacts.map(([label, href, value]) => (
              <div key={label} className="contents"><dt className="text-muted">{label}</dt><dd><a href={href}>{value}</a></dd></div>
            ))}
          </dl>
        </div>
        {/* 정사각형 사진의 높이를 이름 줄부터 마지막 연락처 줄까지의 높이에 맞춘 크기 */}
        <img className="hidden aspect-square w-38 shrink-0 rounded-sm object-cover print:block" src="/assets/profile.jpg" alt="김수환 증명사진" loading="lazy" />
      </div>
      <p className="mb-4 text-2xl leading-snug font-semibold tracking-tight mobile:text-xl print:mb-3 print:text-lg">하나의 코드베이스로 웹·iOS·Android·데스크톱 앱을 출시한<br className="mobile:hidden print:hidden" /> 프론트엔드 개발자입니다.</p>
      <Paragraphs items={introDetails} muted={false} />
    </>
  );
};

function Resume() {
  return (
    <Document title="이력서" description={profile.introduction.split('\n')[0]} route="/" active="resume" pageLabel="이력서" pdf="resume" htmlClass="resume-doc" toc={[['about', '소개'], ['experience', '경력'], ['skills', '스킬'], ['education', '학력']]}>
      <section id="about"><ProfileHead /></section>
      {/* 한 단 구성: 회사 이름, 그 아래 '재직 기간 | 직무' 줄과 구분선, 이어서 그 회사의 프로젝트를 위에서 아래로 쌓는다.
          프로젝트 사이는 선 없이 간격으로만 나누고, 글자는 보조 줄까지 본문색에 가깝게 써서 흐린 줄이 없게 한다 */}
      <ResumeSection id="experience" title="경력" note={careerTotal(devJobs)}>
        {/* 회사 사이는 프로젝트 사이보다 넓게 띄워, 회사 묶음이 먼저 눈에 들어오게 한다 */}
        {devJobs.map((job, i) => (
          <section key={job.id} className={cx('experience-group', i > 0 ? 'pt-16 mobile:pt-13 print:pt-14' : 'pt-7 mobile:pt-6 print:pt-5')}>
            <MarkedHead name={job.name} logo={job.logo} rule>
              <span className="whitespace-nowrap">{job.period} ({formatMonths(jobMonths(job))})</span><Bar /><span>{job.employment}</span><Bar /><span>{job.role}</span>
            </MarkedHead>
            <div className={underMark}>
            {/* 회사 안에서는 시작일이 아니라 content.mjs에 적은 순서(비중 순)로 둔다 */}
            {/* 프로젝트 사이는 본문 줄 간격의 두 배 넘게 띄운다 — 좁으면 앞 프로젝트의 기술 줄과 다음 프로젝트 이름이 붙어 보인다 */}
            {projects.filter(project => project.category === 'work' && project.companyId === job.id).map((project, n) => (
              <article key={project.id} id={`resume-${project.id}`} className={cx('resume-project print:break-inside-avoid', n > 0 ? 'pt-11 mobile:pt-9 print:pt-10' : 'pt-6 print:pt-4')}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  {/* 이름만 굵게, 서비스 종류는 보조 글씨로 — 굵은 글씨가 둘이면 어디가 제목인지 늦게 읽힌다 */}
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h3 className={text.item}><a href={projectHref(project)}>{project.name}</a></h3>
                    <p className={cx(text.body, 'text-secondary')}>{project.kind}</p>
                  </div>
                  {/* 상세 보기 링크는 잠시 꺼 둔다
                  <TextLink href={projectHref(project)}>프로젝트 상세 보기</TextLink>
                  */}
                </div>
                <p className={cx(text.detail, 'mt-0.5 mb-3 flex flex-wrap items-center gap-y-0.5 print:mb-2.5')}>
                  <span className="tabular-nums whitespace-nowrap">{project.period}</span><Bar /><span>{project.role}</span>
                </p>
                {/* 이름·기간 줄은 본문색, 내용과 기술 줄은 한 단계 옅게 — 색이 같으면 기간·역할 줄이 내용에 묻힌다 */}
                <div className="text-secondary"><Bullets items={project.summary} /></div>
                <p className={cx(text.meta, 'mt-5 text-secondary')}><TechTokens items={project.tech} /></p>
                {/* 서비스 링크 버튼은 기술 줄 아래에 둔다 — 이름 줄을 비워 두고, 화면·PDF 모두 같은 자리에 온다 */}
                <IconLinks links={project.links} className="mt-3" />
              </article>
            ))}
            </div>
          </section>
        ))}
        <EarlierCareer />
      </ResumeSection>
      <SkillsAndEducation />
      <DocumentNext label="주요 업무와 문제 해결 과정을 더 자세히" href="/portfolio/">포트폴리오 보기</DocumentNext>
    </Document>
  );
}

/* ── 프로젝트 공통 구역 ── */
const ProjectIntro = ({ project, items }) => (
  // 머리줄(이름·기간·링크)과 소개 문단은 다른 덩어리 — 머리줄 안쪽 간격보다 넓게 띄운다
  <div className="mt-6 max-w-180 print:mt-4"><Paragraphs items={items} /></div>
);
const Results = ({ project }) => <>{project.insight && <ResultBox text={project.insight} />}{project.result && <ResultBox text={project.result} />}</>;

// detail: 주요 업무와 문제 해결 전문을 함께 싣는 문서 — 거기서 겹치는 구역·문단은 뺀다 (portfolio-content.mjs의 skipInDetail·detailParagraphs)
const sectionsFor = (project, detail) => (material(project).sections || [])
  .filter(section => !(detail && section.skipInDetail))
  .map(section => detail && section.detailParagraphs ? { ...section, title: section.detailTitle || section.title, paragraphs: section.detailParagraphs } : section);
const Implementation = ({ project, prefix = '', detail }) => {
  const sections = sectionsFor(project, detail);
  if (!sections.length) return null;
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
  // 이미지·다이어그램이 있는 사례를 앞에, 글만 있는 사례를 뒤에 둔다 (PDF 에서 이미지가 글 사이에 끼어 페이지가 비는 것 방지)
  const hasVisual = study => Boolean(m.caseImages?.[study.id]?.length || diagrams[study.id]);
  const rest = items.filter(study => !featuredIds.has(study.id)).sort((a, b) => hasVisual(b) - hasVisual(a));
  return (
    <SectionBlock id={`${prefix}measurements`} title="핵심 개선 사례와 구현 근거" rule>
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
            <li key={study.id} id={`${prefix}case-${study.id}`} className="min-w-0 print:break-inside-avoid">
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
      <Gallery images={images} className={web.length ? 'mt-6 print:mt-3' : ''} printRow={web.length > 0} printCompact />
    </SectionBlock>
  );
};
// PDF에서는 위 간격을 줄인다 — 두 줄짜리 기술 스택만 다음 쪽으로 넘어가 홀로 남지 않게
const Technology = ({ project, id }) => <SectionBlock id={id} title="기술 스택" rule className="print:mt-4 print:break-inside-avoid print:pt-3"><TechStack project={project} /></SectionBlock>;

/* ── 경력기술서 ── */
// 이력서와 같은 틀(소개 → 경력 → 스킬 → 학력)에 프로젝트마다 소개·주요 업무·사례를 펼친 문서.
// 경력기술서만 받는 곳에 이 문서 하나로 낼 수 있게 연락처·소개·스킬·학력을 이력서와 똑같이 싣는다.
// 사례: 굵은 제목(결과 포함) + 한 줄 불릿 + 측정 조건 한 줄. 라벨·상자·그림은 쓰지 않는다 (그림은 포트폴리오에 있다)
// 쪽 나눔: 목록이 통째로 다음 쪽으로 밀려 앞쪽 아래가 비지 않게, 목록 안에서도 쪽이 바뀔 수 있다.
// 다만 첫 줄은 둘째 줄과, 마지막 줄은 그 앞줄과 같은 쪽에 둔다 (한 줄만 따로 떨어지지 않게).
// glueEnd: 목록 바로 뒤 내용(측정 조건, 기술 줄)을 마지막 줄과 같은 쪽에 묶는다
const FlowBullets = ({ items, glueEnd }) => (
  <ul className={cx(text.body, 'list-disc pl-4 text-secondary marker:text-secondary')}>
    {items.map((item, i, all) => (
      <Prose key={i} as="li" text={item} className={cx('my-0.5 pl-px print:break-inside-avoid', ((i === 0 || i >= all.length - 2) && i < all.length - 1 || i === all.length - 1 && glueEnd) && 'print:break-after-avoid')} />
    ))}
  </ul>
);
// 사례: 제목은 첫 줄과 같은 쪽에 둔다
const CareerCase = ({ study }) => (
  <section className="mt-6 print:mt-4">
    <h4 className={cx(text.body, 'mb-1 font-bold text-ink print:break-after-avoid')}>
      {study.title}{study.period && <span className={cx(text.meta, 'ml-2.5 font-medium text-muted tabular-nums')}>{study.period}</span>}
    </h4>
    <FlowBullets items={study.bullets} glueEnd={Boolean(study.note)} />
    {study.note && <Meta className="mt-1.5 print:break-inside-avoid">{study.note}</Meta>}
  </section>
);
// 주요 업무: 사례와 같은 불릿 모양을 쓴다. '#' 줄로 묶음이 둘 이상이면 좌우로 나란히 (이때는 쪽이 나뉘지 않게 한 덩어리)
// glueEnd: 바로 뒤 기술 줄을 마지막 줄과 같은 쪽에 묶는다
const CareerTasks = ({ tasks, glueEnd }) => {
  const groups = [];
  for (const [label, copy] of tasks) {
    if (label === '#') groups.push({ title: copy, items: [] });
    else { if (!groups.length) groups.push({ items: [] }); groups.at(-1).items.push(copy); }
  }
  if (groups.length < 2) return <FlowBullets items={groups[0].items} glueEnd={glueEnd} />;
  return (
    <div className={cx('grid grid-cols-2 gap-x-6 gap-y-5 mobile:grid-cols-1 print:break-inside-avoid', glueEnd && 'print:break-after-avoid')}>
      {groups.map(group => (
        <div key={group.title} className="min-w-0">
          {/* 묶음 이름은 '주요 업무' 제목보다 한 단계 아래 */}
          <p className={cx(text.body, 'mb-0.5 font-semibold text-secondary')}>{group.title}</p>
          <FlowBullets items={group.items} />
        </div>
      ))}
    </div>
  );
};
// 모든 프로젝트가 같은 순서: 이름·기간·링크 → 소개(서비스와 맡은 범위) → 사례(있는 프로젝트만) → 주요 업무 → 기술.
// 맡은 일의 목록보다 문제를 푼 과정이 먼저 읽히게 사례를 주요 업무 앞에 둔다
const CareerEntry = ({ project, first }) => {
  const detail = careerDetails[project.id] || {};
  const cases = detail.cases || [];
  return (
    <article id={project.id} className={cx('career-entry', first ? 'pt-6 print:pt-4' : 'pt-11 mobile:pt-9 print:mt-8 print:pt-0')}>
      {/* 이름·기간 줄, 링크, 소개는 한 덩어리로, 바로 뒤 내용(첫 사례 또는 주요 업무)의 첫 줄과 같은 쪽에 둔다 —
          프로젝트 이름만 쪽 맨 아래에 남고 내용이 다음 쪽에서 시작하지 않게 */}
      <div className="print:break-inside-avoid print:break-after-avoid">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h3 className={text.item}>{project.name}</h3>
          <p className={cx(text.body, 'text-secondary')}>{project.kind}</p>
        </div>
        <p className={cx(text.detail, 'mt-0.5 flex flex-wrap items-center gap-y-0.5')}>
          <span className="tabular-nums whitespace-nowrap">{project.period}</span><Bar /><span>{project.role}</span>
        </p>
        {/* 서비스 링크는 기간·역할 바로 아래에 둔다 — 내용이 길어 끝에 두면 한 쪽 넘게 지나서야 나온다 */}
        <IconLinks links={project.links} className="mt-2.5" />
        <div className="mt-3 print:mt-2.5"><Paragraphs items={[detail.description || project.description]} /></div>
      </div>
      {cases.map(study => <CareerCase key={study.title} study={study} />)}
      <section className="mt-6 print:mt-4">
        <h4 className={cx(text.body, 'mb-1 font-bold text-ink print:break-after-avoid')}>주요 업무</h4>
        <CareerTasks tasks={detail.tasks || project.tasks} glueEnd />
      </section>
      {/* 기술 줄은 주요 업무 끝과 같은 쪽에 둔다 — 다음 쪽에 홀로 남지 않게 */}
      <p className={cx(text.meta, 'mt-5 text-secondary print:mt-4 print:break-inside-avoid')}><TechTokens items={project.tech} /></p>
    </article>
  );
};

function Career() {
  return (
    <Document title="경력기술서" description="김수환의 프론트엔드·백엔드 개발 경험과 문제 해결·개선 사례입니다." route="/career/" active="career" pageLabel="경력기술서" pdf="career" htmlClass="resume-doc" toc={[['about', '소개'], ['experience', '경력'], ['skills', '스킬'], ['education', '학력']]}>
      <section id="about"><ProfileHead /></section>
      <ResumeSection id="experience" title="경력" note={careerTotal(devJobs)}>
        {devJobs.map((job, i) => (
          <section key={job.id} className={cx('experience-group', i > 0 ? 'pt-16 mobile:pt-13 print:mt-12 print:pt-0' : 'pt-7 mobile:pt-6 print:pt-5')}>
            <MarkedHead name={job.name} logo={job.logo} rule>
              <span className="whitespace-nowrap">{job.period} ({formatMonths(jobMonths(job))})</span><Bar /><span>{job.employment}</span><Bar /><span>{job.role}</span>
            </MarkedHead>
            <div className={underMark}>
              {projects.filter(project => project.category === 'work' && project.companyId === job.id).map((project, n) => <CareerEntry key={project.id} project={project} first={n === 0} />)}
            </div>
          </section>
        ))}
        <EarlierCareer />
      </ResumeSection>
      <SkillsAndEducation />
    </Document>
  );
}

/* ── 포트폴리오 ── */
const PortfolioList = ({ children }) => <div className="portfolio-document">{children}</div>;
const PortfolioProject = ({ index, children }) => (
  <div className={cx('portfolio-project', index > 0 ? 'mt-27.5 border-t-2 border-ink mobile:mt-18 print:mt-0 print:break-before-page print:border-t-0' : 'print:border-t print:border-[#333]')}>
    <article className="career-project pt-8 mobile:pt-6 print:pt-3">{children}</article>
  </div>
);

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

function Portfolio() {
  return (
    <Document title="포트폴리오" description="김수환의 프로젝트 구현 구조·측정 근거·코드와 실제 서비스 화면입니다." route="/portfolio/" active="portfolio" pageLabel="포트폴리오" pdf="portfolio" toc={orderedProjects.map(p => [p.id, p.name])}>
      <PortfolioList>
        <PageIntro title="김수환 포트폴리오" links={webLinks}>프로젝트별 구현 구조, 설계 판단, 측정 근거와 실제 서비스 화면을 정리했습니다. 문제 해결의 전체 과정은 경력기술서에서 확인할 수 있습니다.</PageIntro>
        <Toolbar count="6개 프로젝트" links={[['/projects/', '프로젝트별로 보기']]} />
        {orderedProjects.map((project, i) => (
          <PortfolioProject key={project.id} index={i}>
            <div id={project.id}><ProjectHeader project={project} /></div>
            <ProjectIntro project={project} items={[portfolioIntro(project)]} />
            <Implementation project={project} prefix={`${project.id}-`} />
            <Highlights project={project} prefix={`${project.id}-`} />
            <Results project={project} />
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
      <PageIntro title="프로젝트">직접 개발한 6개 프로젝트의<br className="hidden mobile:inline" /> 주요 업무와 구현 사례입니다.</PageIntro>
      <Toolbar count="6개 프로젝트" links={[['/portfolio/', '한 페이지로 모두 보기']]} />
      <div>
        {orderedProjects.map(p => (
          <article key={p.id} data-category={p.category} className={cx('project-index-row group relative border-b border-line py-8 mobile:py-6 print:break-inside-avoid', thumbnail(p) && 'grid grid-cols-[minmax(0,1fr)_14.25rem] items-center gap-7 tablet:grid-cols-[minmax(0,1fr)_10.5rem] tablet:gap-5.5 mobile:grid-cols-1 mobile:gap-4')}>
            <div>
              <p className={cx(text.detail, 'mb-2 flex flex-wrap items-center')}>{p.company}<Bar /><span className="tabular-nums">{p.period}</span></p>
              <h2 className={text.section}>
                <a className="inline-flex items-center gap-3 group-hover:text-accent after:absolute after:inset-0 after:content-['']" href={projectHref(p)}>{p.name}<ArrowIcon className="size-4.5 text-accent" /></a>
              </h2>
              <p className={cx(text.body, 'mt-1 text-secondary')}>{p.kind}</p>
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
// 포트폴리오와 같은 구성: 주요 업무와 문제 해결 전문에 근거 자료를 붙인다
function ProjectDetail({ project, index }) {
  const m = material(project);
  const toc = [['overview', '프로젝트 소개'], ['tasks', '주요 업무']];
  if (sectionsFor(project, true).length) toc.push(['implementation', '구현 구조와 설계']);
  if (project.cases?.length) toc.push(['measurements', '문제 해결과 개선']);
  if (project.images?.length || m.images?.length) toc.push(['screens', '프로젝트 화면']);
  toc.push(['technology', '기술 스택']);
  const previous = orderedProjects[index - 1], next = orderedProjects[index + 1];
  return (
    <Document title={project.name} description={project.description} route={projectHref(project)} active="projects" pageLabel={project.name} pdf="portfolio" toc={toc}>
      <a className={cx(text.meta, 'mb-8 inline-flex gap-2 text-muted mobile:mb-6 print:hidden')} href="/projects/"><span aria-hidden="true">←</span> 프로젝트 목록</a>
      <section id="overview">
        <p className={cx(text.detail, 'mb-3.5 text-secondary')}>{project.category === 'work' ? `${project.company} · 업무 프로젝트` : '팀 프로젝트'}</p>
        <ProjectHeader project={project} large />
        <ProjectIntro project={project} items={[portfolioIntro(project)]} />
      </section>
      <SectionBlock id="tasks" title="주요 업무" rule><TaskList tasks={project.tasks} /><Results project={project} /></SectionBlock>
      <Implementation project={project} detail />
      {project.cases?.length > 0 && (
        <SectionBlock id="measurements" title="문제 해결과 개선" rule>
          {project.cases.map(study => (
            <CaseStudy key={study.id} study={study} id={`case-${study.id}`}><CaseEvidence project={project} study={study} /></CaseStudy>
          ))}
        </SectionBlock>
      )}
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
  ...orderedProjects.map((project, i) => [projectHref(project), () => <ProjectDetail project={project} index={i} />])
];
export const notFound = () => <NotFound />;
