// 공통 컴포넌트: 글자 크기·행간·간격은 여기서만 정한다. 페이지는 이 컴포넌트를 조립만 한다.
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import hljs from 'highlight.js/lib/common';

const root = fileURLToPath(new URL('../../', import.meta.url));
export const cx = (...names) => names.filter(Boolean).join(' ');

const escape = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
// 문장마다 줄을 바꾸고 `코드` 표기를 인라인 코드로 바꾼 HTML
// 문장 안의 `\n` 은 넓은 화면(PC·PDF)에서만 줄을 바꾼다 — 좁은 모바일은 자동 줄바꿈에 맡긴다
export const proseHtml = value => escape(value)
  .replace(/\n/g, ' <br class="mobile:hidden">')
  .replace(/([.!?])\s+(?=[\p{L}\d(])/gu, '$1<br>')
  .replace(/`([^`]+)`/g, '<code class="rounded-sm border border-line bg-wash px-1 py-px font-mono text-xs text-ink">$1</code>');
export const Prose = ({ as: Tag = 'span', text, className }) => <Tag className={className} dangerouslySetInnerHTML={{ __html: proseHtml(text) }} />;

/* ── 글자 역할 ── */
export const text = {
  display: 'text-4xl font-bold leading-tight tracking-tighter mobile:text-3xl',
  title: 'text-3xl font-bold leading-tight tracking-tighter mobile:text-2xl',
  section: 'text-2xl font-bold leading-snug tracking-tight mobile:text-xl',
  // 묶음 머리말(경력의 회사 이름): 구역 제목과 항목 제목 사이 단계 — 항목과 같은 크기면 위계가 안 보인다
  group: 'text-xl font-bold leading-snug tracking-tight mobile:text-lg',
  heading: 'text-lg font-bold leading-snug tracking-tight',
  // 이력서 항목 이름(회사·프로젝트·학교): 바로 아래 보조 줄과 같은 크기에 굵기만 올린다 — 크기를 여러 단계로 쓰지 않는다
  item: 'text-base font-bold leading-6',
  lead: 'text-base leading-7',
  body: 'text-sm leading-6',
  // 제목 바로 아래 붙는 보조 줄(직무·기간·학과·역할): 본문 크기, 줄 간격만 촘촘하게
  detail: 'text-sm leading-5',
  meta: 'text-xs leading-5'
};

export const PageTitle = ({ children }) => <h1 className={text.display}>{children}</h1>;
// 구역 제목: 위 간격은 놓이는 자리(SectionBlock)에서, 아래 간격은 여기서
// 크기 단계를 좁게 쓴다: 프로젝트 이름(section) > 구역 제목(group) > 소제목(heading) > 본문
export const SectionTitle = ({ as: Tag = 'h2', children, className }) => <Tag className={cx(text.group, 'mb-4 print:mb-3 print:break-after-avoid', className)}>{children}</Tag>;
export const SubTitle = ({ children }) => <h3 className={cx(text.item, 'mb-3 print:mb-2 print:break-after-avoid')}>{children}</h3>;
// 한 줄 안의 항목 구분선 (기간 | 역할, 기간 | 상태 | 학과)
// 모바일에서는 선을 감추고 간격만 남긴다 — 좁은 폭에서 뒤 항목이 다음 줄로 넘어가면 선이 줄 끝에 홀로 남는다
export const Bar = ({ className }) => <span className={cx('mx-2.5 inline-block h-3 w-px bg-strong-line mobile:bg-transparent', className)} aria-hidden="true" />;
export const Meta = ({ as: Tag = 'p', children, className, ...rest }) => <Tag className={cx(text.meta, 'text-muted', className)} {...rest}>{children}</Tag>;

// 같은 구역 안 문단: 두 번째 문단부터 문단 사이 간격
export const Paragraphs = ({ items, size = 'body', muted = true, className }) => items.map((copy, i) => (
  <Prose key={i} as="p" text={copy} className={cx(size === 'lead' ? text.lead : text.body, muted && 'text-secondary', i > 0 && 'mt-3', className)} />
));

export const Bullets = ({ items }) => (
  <ul className={cx(text.body, 'list-disc pl-4 marker:text-secondary')}>{items.map((item, i) => <Prose key={i} as="li" text={item} className="my-0.5 pl-px" />)}</ul>
);

export const ResultBox = ({ text: copy, raw }) => (
  <div className={cx('result', text.body, 'mt-5 border-l-2 border-accent bg-wash px-5 py-4 text-ink mobile:px-4 mobile:py-3 print:mt-3 print:break-inside-avoid print:py-3')}>
    {raw ? <p>{copy}</p> : <Prose as="p" text={copy} />}
  </div>
);
export const MeasurementNote = ({ text: copy, raw }) => raw
  ? <Meta className="mt-3">{copy}</Meta>
  : <Prose as="p" text={copy} className={cx(text.meta, 'mt-3 text-muted')} />;

export const ArrowIcon = ({ className }) => (
  <svg className={cx('size-3.5 flex-none', className)} width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false"><path d="m9 5 7 7-7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
);
export const TextLink = ({ href, children, className }) => (
  <a className={cx(text.meta, 'group inline-flex items-center gap-1.5 font-semibold text-accent print:hidden', className)} href={href}>
    <span className="group-hover:underline group-hover:underline-offset-3">{children}</span><ArrowIcon />
  </a>
);

// 아이콘: src/icons의 SVG를 빌드 시 HTML에 넣는다 (Simple Icons·Tabler Icons 원본, 글자색을 따른다)
const iconSvg = name => readFileSync(path.join(root, 'src/icons', `${name}.svg`), 'utf8');
export const Icon = ({ name, className }) => (
  <span className={cx('inline-flex [&_svg]:size-full', className)} aria-hidden="true" dangerouslySetInnerHTML={{ __html: iconSvg(name) }} />
);
// 서비스 링크 버튼: 아이콘 + 이름을 같은 높이의 테두리 칸에 넣는다 —
// 아이콘만 두면 로고마다 생김새가 달라 크기가 들쭉날쭉해 보인다
export const IconLinks = ({ links, className }) => links?.length > 0 && (
  <p className={cx('flex flex-wrap items-center gap-1.5 mobile:gap-1', className)}>
    {links.map(link => (
      <a key={link.url} className={cx(text.meta, 'inline-flex items-center gap-1.5 rounded-sm border border-line bg-paper px-2 py-0.5 font-medium whitespace-nowrap text-secondary hover:border-strong-line hover:text-ink mobile:gap-1 mobile:px-1.5')} href={link.url} target="_blank" rel="noopener noreferrer">
        <Icon name={link.icon} className="size-3 flex-none" />{link.label}
      </a>
    ))}
  </p>
);
/* ── 프로젝트 ── */
// 이름·종류 한 줄 + 기간·역할 한 줄 + 서비스 링크 버튼 줄. 상세 보기 링크는 이름 줄 오른쪽 끝, 이름 글자 윗선에 맞춘다.
// 버튼 줄은 화면과 PDF 모두 기간·역할 아래에 둔다 (자리가 문서마다 달라지지 않게)
export const ProjectHeader = ({ project, href, large }) => (
  <header className="project-heading grid grid-cols-[auto_minmax(0,1fr)_auto_auto] items-baseline gap-x-3 mobile:grid-cols-[minmax(0,1fr)_auto] print:break-after-avoid">
    {large ? <h1 className={text.display}>{project.name}</h1> : <h2 className={text.section}>{project.name}</h2>}
    <p className={cx(text.body, 'text-secondary mobile:col-span-full mobile:row-start-2 mobile:mt-1')}>{project.kind}</p>
    {href && <TextLink href={href} className="col-start-4 row-start-1 mt-0.75 ml-2 self-start whitespace-nowrap mobile:col-start-2 mobile:mt-0.5 mobile:ml-0">프로젝트 상세 보기</TextLink>}
    {/* 기간 | 역할 — 이력서의 프로젝트 줄과 같은 모양 (구분선은 역할 쪽에 붙여 두 칸으로 유지한다) */}
    <div className={cx('project-meta', text.detail, 'col-span-full mt-1.5 flex flex-wrap items-center gap-y-0.75 mobile:row-start-3 print:flex-nowrap')}>
      <span className="tabular-nums whitespace-nowrap">{project.period}</span><span className="inline-flex items-center"><Bar />{project.role}</span>
    </div>
    <IconLinks links={project.links} className="col-span-full mt-2.5 mobile:row-start-4" />
  </header>
);

const TaskRows = ({ tasks }) => (
  <dl className="task-list grid content-start gap-1.5">
    {tasks.map(([label, copy]) => label === '#' ? (
      // 묶음 제목: 아래 항목들이 어느 쪽 일인지 구분한다
      <dt key={copy} className={cx(text.body, 'mb-1 font-bold text-ink print:break-after-avoid')}>{copy}</dt>
    ) : !label ? (
      // 이름표 없는 줄: 불릿 한 줄에 한 가지
      <dd key={copy} className={cx(text.body, "relative pl-4 text-secondary before:absolute before:left-0.5 before:text-muted before:content-['•'] print:break-inside-avoid")}>{copy}</dd>
    ) : (
      <div key={label} className="grid grid-cols-[5.75rem_minmax(0,1fr)] items-baseline gap-x-5 mobile:block print:break-inside-avoid">
        <dt className={cx(text.body, 'font-semibold text-ink mobile:mb-1')}>{label}</dt>
        <Prose as="dd" text={copy} className={cx(text.body, 'text-secondary')} />
      </div>
    ))}
  </dl>
);
// '#' 줄로 묶음이 둘 이상 나뉘면 좌우로 나란히 둔다 (모바일은 위아래)
export const TaskList = ({ tasks }) => {
  const groups = [];
  for (const row of tasks) { if (row[0] === '#' || !groups.length) groups.push([]); groups.at(-1).push(row); }
  if (groups.length < 2) return <TaskRows tasks={tasks} />;
  return (
    <div className="grid grid-cols-2 gap-x-10 gap-y-6 mobile:grid-cols-1 print:gap-x-8 print:break-inside-avoid">
      {groups.map(group => <TaskRows key={group[0][1]} tasks={group} />)}
    </div>
  );
};

export const TechTokens = ({ items }) => items.map((item, i) => (
  <span key={item} className="inline-block whitespace-nowrap">{item}{i < items.length - 1 && <span aria-hidden="true">&nbsp;·&nbsp;</span>}</span>
));
export const TechStack = ({ project }) => (
  <div className="grid gap-3">
    {(project.techGroups?.length ? project.techGroups : [['기술', project.tech]]).map(([label, items]) => (
      <p key={label} className={cx(text.body, 'grid grid-cols-[5.75rem_minmax(0,1fr)] items-baseline gap-x-5 mobile:block print:break-inside-avoid')}>
        <span className="font-semibold whitespace-nowrap text-ink mobile:mb-1 mobile:block">{label}</span>
        <span className="text-secondary"><TechTokens items={items} /></span>
      </p>
    ))}
  </div>
);
export const TechLine = ({ items }) => <p className={cx(text.meta, 'mt-3 text-secondary')}><TechTokens items={items} /></p>;

// 프로젝트 안의 구역(주요 업무, 기술 스택, 문제 해결 등): 위 간격과 구분선
export const SectionBlock = ({ id, title, children, rule, className }) => (
  <section id={id} className={cx(rule ? 'detail-section mt-10 border-t border-line pt-10 mobile:mt-7.5 mobile:pt-7.5 print:mt-5 print:pt-4' : 'mt-10 mobile:mt-8 print:mt-6', className)}>
    <SectionTitle>{title}</SectionTitle>
    {children}
  </section>
);

export const CaseStudy = ({ study, id, children }) => (
  <section id={id} className="case-study border-t border-line pt-6 first-of-type:border-t-0 first-of-type:pt-0 not-first-of-type:mt-5 print:pt-4 print:not-first-of-type:mt-3">
    <SubTitle>{study.title}</SubTitle>
    {study.period && <p className={cx(text.detail, '-mt-2 mb-3 tabular-nums')}>{study.period}</p>}
    <Paragraphs items={study.paragraphs} />
    {study.items && <div className="mt-3"><Bullets items={study.items} /></div>}
    {study.result && <ResultBox text={study.result} />}
    {study.note && <MeasurementNote text={study.note} />}
    {children}
  </section>
);

/* ── 화면·구조도·코드 ── */
// printRow: PDF에서 앱 화면을 한 줄 4장으로 작게 (웹 화면 2×2 아래에 붙을 때)
// 이미지 원본 크기(빌드 시 파일 헤더에서 읽음). width·height를 넣어야 지연 로딩 중에도 자리가 잡혀
// 목차로 이동할 때 위쪽 이미지가 늦게 로드되며 위치가 밀리지 않는다.
const imageSize = src => {
  const data = readFileSync(path.join(root, 'public/assets', src));
  if (data.readUInt32BE(0) === 0x89504e47) return { width: data.readUInt32BE(16), height: data.readUInt32BE(20) };
  for (let i = 2; i < data.length;) {
    const marker = data[i + 1], length = data.readUInt16BE(i + 2);
    if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) return { width: data.readUInt16BE(i + 7), height: data.readUInt16BE(i + 5) };
    i += 2 + length;
  }
  throw new Error(`이미지 크기를 읽을 수 없음: ${src}`);
};

const ratio = src => { const { width, height } = imageSize(src); return (width / height).toFixed(4); };

// printCompact: PDF에서 화면 캡처를 더 낮게 (프로젝트 화면 구역 — 작은 프로젝트가 한 쪽에 들어가게)
export const Gallery = ({ images, className, printRow, single, printCompact }) => {
  if (!images?.length) return null;
  const phone = images.every(image => image.phone), screen = images.every(image => image.screen);
  // webOnly 화면은 웹에서만 보여준다. PDF에서는 남은 화면을 한 줄 3장으로 둔다
  // 일반 화면 캡처: PDF에서는 한 줄 2장, 높이 제한 (측정 캡처처럼 한 장을 크게 보여줄 때는 single)
  const plain = !phone && !screen && !single;
  return (
    <div className={cx('project-gallery grid gap-6 print:gap-4', phone && 'phone-gallery grid-cols-2 gap-x-6 mobile:grid-cols-1', phone && printRow && 'print:grid-cols-4 print:gap-x-3', screen && 'screen-gallery grid-cols-2 mobile:grid-cols-1', screen && printCompact && images.some(image => image.webOnly) && 'print:grid-cols-3', plain && (printCompact && images.length === 3 ? 'print:grid-cols-3 print:gap-3' : 'print:grid-cols-2 print:gap-3'), className)}>
      {images.map((image, i) => (
        <figure key={image.src} className={cx('min-w-0 break-inside-avoid', image.webOnly && 'print:hidden')}>
          <button className={cx('image-expand relative block w-full overflow-hidden rounded-sm after:pointer-events-none after:absolute after:inset-0 after:rounded-sm after:shadow-[inset_0_0_0_1px_var(--color-strong-line)] after:content-[\'\']', phone && 'bg-wash p-6 print:p-3', phone && printRow && 'print:p-1.5')} type="button" data-image={`/assets/${image.src}`} data-caption={image.alt} aria-label={`${image.alt} 확대`}>
            {/* 휴대폰 캡처: 높이 상한(화면 32.5rem, PDF 16·22.5rem)을 원본 비율로 너비 상한으로 바꿔 둔다.
                w-auto + max-h는 로드 전 높이가 0이라 목차 이동 위치가 밀리고, w-full + max-h는 옆으로 늘어난다. */}
            <img className={cx('block w-full', phone ? cx('mx-auto max-w-[calc(32.5rem*var(--ratio))]', printRow ? 'print:max-w-[calc(16rem*var(--ratio))]' : 'print:max-w-[calc(22.5rem*var(--ratio))]') : screen ? cx('aspect-16/10 object-cover object-top', printCompact && 'print:aspect-16/9') : single ? 'object-contain' : cx('max-h-115 object-contain mobile:max-h-82', printCompact ? 'print:max-h-32' : 'print:max-h-50'))} style={phone ? { '--ratio': ratio(image.src) } : undefined} src={`/assets/${image.src}`} {...imageSize(image.src)} alt={image.alt} loading="lazy" decoding="async" />
            <span className={cx(text.meta, 'absolute right-2 bottom-2 rounded-sm bg-white/90 px-2 py-0.5 text-muted print:hidden')}>화면 확대</span>
          </button>
          <Meta as="figcaption" className="mt-2">{image.alt}</Meta>
        </figure>
      ))}
    </div>
  );
};

const svg = name => readFileSync(path.join(root, 'public/assets/diagrams', `${name}.svg`), 'utf8');
export const Diagram = ({ name, caption, className }) => (
  <figure className={cx('architecture-diagram mt-5 break-inside-avoid print:mt-3', className)}>
    <div className="overflow-x-auto border border-line bg-white px-3 py-5 mobile:px-2 mobile:py-4 print:overflow-visible print:border-transparent print:px-3 print:py-2 print:shadow-[inset_0_0_0_1px_var(--color-line)] [&_svg]:mx-auto [&_svg]:block [&_svg]:h-auto [&_svg]:w-full [&_svg]:min-w-145 print:[&_svg]:max-h-80 print:[&_svg]:min-w-0" role="region" aria-label={caption} tabIndex={0} dangerouslySetInnerHTML={{ __html: svg(name) }} />
    <Meta as="figcaption" className="mt-2">{caption}</Meta>
  </figure>
);

export const CodeExample = ({ label, code }) => (
  <figure className="mt-4 print:break-inside-avoid">
    <Meta as="figcaption" className="mb-1.5">{label}</Meta>
    <pre className={cx(text.meta, 'syntax-block rounded-sm border border-line bg-[#f6f8fa] px-4 py-3.5 leading-6 tracking-normal break-words whitespace-pre-wrap text-[#24292f] print:border-transparent print:shadow-[inset_0_0_0_1px_var(--color-line)]')}>
      <code className="font-mono" dangerouslySetInnerHTML={{ __html: hljs.highlight(code, { language: 'typescript', ignoreIllegals: true }).value }} />
    </pre>
  </figure>
);

/* ── 페이지 공통 ── */
// links: PDF에만 보이는 웹 문서 링크 ([주소, 이름] 목록). PDF 안의 링크라 전체 주소를 쓴다.
export const PageIntro = ({ title, links, children }) => (
  <div className="pb-11 mobile:pb-8 print:pb-4">
    <PageTitle>{title}</PageTitle>
    <p className={cx(text.lead, 'mt-4 text-secondary')}>{children}</p>
    {/* 링크 아이콘 + 밑줄 글자, 항목 사이는 구분선 */}
    {links && (
      <div className={cx(text.body, 'mt-4 hidden flex-wrap items-center text-secondary print:flex')}>
        {links.map(([href, label], i) => (
          <span key={href} className="inline-flex items-center">
            {i > 0 && <Bar className="mx-3.5" />}
            <a className="inline-flex items-center gap-1.5" href={href} target="_blank" rel="noopener noreferrer">
              <Icon name="link" className="size-3.5 flex-none" /><span className="underline decoration-strong-line underline-offset-3">{label}</span>
            </a>
          </span>
        ))}
      </div>
    )}
  </div>
);

// links: 다른 보기로 가는 링크 ([주소, 이름] 목록)
export const Toolbar = ({ count, links }) => (
  <div className="flex items-center justify-between gap-4 border-b-2 border-ink pb-4 print:hidden">
    <Meta aria-live="polite">{count}</Meta>
    <div className="flex flex-wrap justify-end gap-x-5 gap-y-1">
      {links.map(([href, label]) => <TextLink key={href} href={href}>{label}</TextLink>)}
    </div>
  </div>
);

export const DocumentNext = ({ label, href, children }) => (
  <div className="mt-14 flex items-center justify-between gap-5 border-t border-strong-line py-6 mobile:mt-9 mobile:block print:hidden">
    <Meta as="span" className="mobile:mb-2 mobile:block">{label}</Meta>
    <a className={cx(text.body, 'font-semibold text-accent')} href={href}>{children} <span aria-hidden="true">→</span></a>
  </div>
);
