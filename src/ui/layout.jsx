// 페이지 틀: 머리말(메뉴·PDF 다운로드), 목차, 바닥글, 이미지 확대 창
import { profile } from '../content.mjs';
import { ArrowIcon, External, cx, text } from './components.jsx';

const origin = 'https://shkiimaa.github.io';
const nav = [['/', '이력서', 'resume'], ['/career/', '경력기술서', 'career'], ['/projects/', '프로젝트', 'projects'], ['/portfolio/', '포트폴리오', 'portfolio']];
// 헤더 PDF 다운로드 메뉴: 어느 페이지에서든 네 문서를 받을 수 있게 한다
const downloads = [
  ['resume', '이력서', '경력과 프로젝트 요약'],
  ['career', '경력기술서', '담당 업무와 문제 해결 과정'],
  ['portfolio', '포트폴리오', '구조도, 측정 근거, 서비스 화면'],
  ['portfolio-detail', '포트폴리오 상세', '경력기술서 설명까지 담은 단독 제출용']
];

const Header = ({ active, pdf }) => (
  <header className="site-header sticky top-0 z-20 h-19 border-b border-line bg-white/97 mobile:h-16 print:hidden">
    <div className="mx-auto flex h-full max-w-296 items-center gap-10.5 px-8 tablet:gap-7.5 tablet:px-6 mobile:gap-3 mobile:px-5 narrow:gap-2 narrow:px-3.5">
      <a className="flex items-baseline gap-3 text-lg font-bold tracking-tight whitespace-nowrap mobile:text-base" href="/" aria-label="김수환 이력서">
        김수환<span className={cx(text.meta, 'font-normal tracking-normal text-muted tablet:hidden')}>Frontend Developer</span>
      </a>
      <nav className="ml-auto flex h-full items-center gap-7 mobile:gap-3 narrow:gap-2" aria-label="주 메뉴">
        {nav.map(([href, label, key]) => (
          <a key={href} href={href} aria-current={active === key ? 'page' : undefined} className={cx(text.body, 'flex h-full items-center border-b-2 border-transparent pt-0.5 whitespace-nowrap text-muted hover:text-ink mobile:text-xs aria-[current=page]:border-accent aria-[current=page]:font-semibold aria-[current=page]:text-ink')}>{label}</a>
        ))}
      </nav>
      <div className="download-menu relative">
        <button className={cx(text.meta, 'download-link group flex items-center gap-3 rounded-sm border border-line bg-paper px-3 py-1.5 font-semibold whitespace-nowrap hover:border-strong-line hover:bg-wash mobile:min-h-10 mobile:gap-1 mobile:border-0 mobile:px-0')} type="button" aria-expanded="false" aria-controls="download-list" aria-label="PDF 다운로드">
          <span>PDF<span className="mobile:hidden"> 다운로드</span></span>
          <ArrowIcon className="rotate-90 transition-transform group-aria-expanded:-rotate-90" />
        </button>
        <ul className="download-list absolute top-[calc(100%+8px)] right-0 grid min-w-62 rounded-sm border border-line bg-paper p-1.5 shadow-lg" id="download-list" hidden>
          {downloads.map(([file, label, note]) => (
            <li key={file}>
              <a className="group grid gap-0.5 rounded-sm px-3 py-2 hover:bg-wash focus-visible:bg-wash" href={`/${file}.pdf`} download={`김수환_${label.replace(' ', '_')}.pdf`} aria-current={pdf === file ? 'page' : undefined}>
                <strong className={cx(text.body, 'font-semibold group-aria-[current=page]:text-accent')}>
                  {label}{pdf === file && <em className="ml-2 rounded-sm bg-wash px-1.5 py-px align-[1px] text-xs font-semibold text-accent not-italic">현재 문서</em>}
                </strong>
                <span className={cx(text.meta, 'text-muted')}>{note}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </header>
);

const Sidebar = ({ items, title }) => (
  <aside className="page-sidebar mobile:hidden print:hidden">
    <div className="sticky top-31">
      <p className={cx(text.meta, 'mb-4 font-semibold text-ink')}>{title}</p>
      <nav className="section-nav flex flex-col gap-0.75 border-l border-line" aria-label="페이지 목차">
        {items.map(([id, label]) => (
          <a key={id} href={`#${id}`} className={cx(text.meta, '-ml-px border-l-2 border-transparent py-1.5 pl-3.5 text-muted hover:text-ink aria-[current]:border-accent aria-[current]:font-semibold aria-[current]:text-accent')}>{label}</a>
        ))}
      </nav>
      <div className={cx(text.meta, 'mt-11 flex flex-col items-start gap-1 border-t border-line pt-5 text-muted')}>
        <span className="mb-0.5 font-semibold">Contact</span>
        <a className="break-all" href={`mailto:${profile.email}`}>{profile.email}</a>
        <External href={profile.github}>GitHub</External>
      </div>
    </div>
  </aside>
);

export function Document({ title, description, route, active, toc = [], pageLabel, pdf, children }) {
  return (
    <html lang="ko">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <title>{`${title} | 김수환`}</title>
        <meta name="description" content={description} />
        <meta name="theme-color" content="#ffffff" />
        <meta name="color-scheme" content="light" />
        <link rel="canonical" href={`${origin}${route}`} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="ko_KR" />
        <meta property="og:site_name" content="김수환 · Frontend Developer" />
        <meta property="og:title" content={`${title} | 김수환`} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={`${origin}${route}`} />
        <meta property="og:image" content={`${origin}/assets/og.png`} />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="preload" href="/fonts/PretendardVariable.woff2" as="font" type="font/woff2" crossOrigin="" />
        <link rel="stylesheet" href="/styles.css" />
        <script src="/app.js" defer />
      </head>
      <body className="bg-paper font-sans text-ink">
        <a className="fixed -top-25 left-4 z-50 bg-ink px-4.5 py-2 text-white focus:top-3 print:hidden" href="#main">본문으로 이동</a>
        <Header active={active} pdf={pdf} />
        <div className="mx-auto grid max-w-296 grid-cols-[10.5rem_minmax(0,1fr)] gap-x-17.5 px-8 pt-17 tablet:grid-cols-[8.5rem_minmax(0,1fr)] tablet:gap-x-9 tablet:px-6 mobile:block mobile:px-6 mobile:pt-9 narrow:px-5 print:block print:max-w-none print:p-0">
          <Sidebar items={toc} title={pageLabel} />
          <main id="main" className="min-w-0 outline-none" tabIndex={-1}>{children}</main>
        </div>
        <footer className={cx('site-footer', text.meta, 'mx-auto mt-19 flex max-w-296 gap-7 border-t border-line px-8 pt-6 pb-7.5 text-muted mobile:mt-11 mobile:gap-4 mobile:px-6 print:hidden')}>
          <span>© {new Date().getUTCFullYear()} Suhwan Kim</span>
          <a className="mobile:hidden" href={`mailto:${profile.email}`}>{profile.email}</a>
          <a className="ml-auto" href="#main">맨 위로 <span aria-hidden="true">↑</span></a>
        </footer>
        <dialog className="image-dialog m-auto max-h-[94dvh] max-w-[min(94vw,1500px)] rounded-sm bg-white px-6 pt-12 pb-5 text-ink backdrop:bg-ink/75 mobile:px-3" aria-label="프로젝트 화면 확대">
          <button type="button" className={cx(text.meta, 'dialog-close absolute top-3 right-4.5 px-2 py-1 mobile:min-h-10 mobile:min-w-14')} aria-label="확대 화면 닫기">닫기 ×</button>
          <img className="m-auto max-h-[77dvh] max-w-full object-contain" alt="" />
          <p className={cx(text.meta, 'pt-3.5 text-secondary')} />
        </dialog>
      </body>
    </html>
  );
}
