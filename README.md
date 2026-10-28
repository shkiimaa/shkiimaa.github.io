# 김수환 · 웹 개발자

이력서, 경력기술서, 프로젝트 상세를 연결하는 GitHub Pages 정적 사이트입니다.

## 로컬 실행

Node.js 22 이상에서 별도의 패키지 설치 없이 실행합니다.

```sh
npm run dev
```

미리보기: http://127.0.0.1:4173

## 빌드와 확인

```sh
npm run build
npm run check
```

정적 파일은 `dist/`에 생성됩니다. GitHub Actions가 `main` 브랜치 변경을 빌드해 Pages로 배포합니다. 저장소 Settings → Pages의 Source는 **GitHub Actions**로 설정합니다.

## 내용 수정

- `src/content.mjs`: 소개, 경력, 기술, 프로젝트와 문제 해결 사례
- `scripts/build.mjs`: 페이지 템플릿과 메타데이터
- `src/styles.css`: 화면·모바일·인쇄 스타일
- `src/app.js`: 목차, 분류 필터, 화면 확대, 인쇄
- `public/`: 글꼴, 실제 프로젝트 화면, PDF

`/`은 이력서, `/career/`는 경력기술서, `/projects/`는 프로젝트 목록입니다. 모든 프로젝트는 `/projects/<id>/` 상세 페이지가 있습니다.

PDF는 실제 페이지에 인쇄 스타일을 적용해 만든 파일입니다. `/portfolio/`는 구현 구조·문제 해결 사례·화면 자료를 모아 인쇄하는 전체 포트폴리오입니다. 프로젝트 목록의 PDF 다운로드로 `public/portfolio.pdf`를 받을 수 있습니다.

문서 수정 후에는 로컬 서버를 실행한 상태에서 `node scripts/export-pdfs.mjs`로 세 문서를 갱신합니다. Playwright가 외부에 설치돼 있다면 `PLAYWRIGHT_MODULE`에 해당 모듈 경로를 지정합니다. 모든 이미지의 로드가 끝난 뒤 PDF를 생성하고, 다이어그램 포함 여부와 인쇄 배치를 검증합니다.

`src/diagrams/*.mmd`는 원본 Notion 포트폴리오의 Mermaid 소스입니다. `node scripts/render-diagrams.mjs`로 `public/assets/diagrams/*.svg`를 생성합니다. `MERMAID_SCRIPT`에 Mermaid 11의 `dist/mermaid.min.js` 경로를 지정합니다. SVG는 빌드 시 HTML에 포함되므로 방문자와 PDF에서는 Mermaid 실행이나 외부 CDN이 필요하지 않습니다. `src/portfolio-content.mjs`는 원본 자료의 출처와 포트폴리오용 상세 설명을 관리합니다.

Pretendard의 라이선스는 `public/fonts/LICENSE.txt`에 포함되어 있습니다. 프로젝트 화면은 본인의 기존 포트폴리오 자료를 사용합니다.

## 브라우저 실행이 제한된 환경에서 PDF 생성

기본 경로는 위의 Playwright 내보내기입니다. Chromium을 실행할 수 없는 환경에서는
WeasyPrint 70을 설치한 Python 환경에서 로컬 서버를 켠 뒤 아래 명령을 사용합니다.

```sh
python scripts/export-pdfs.py
npm run build
npm run check
```

macOS에서 Pango를 찾지 못하면 설치된 Homebrew 라이브러리 경로를
`DYLD_FALLBACK_LIBRARY_PATH`로 지정합니다. 이 스크립트는 같은 페이지와 인쇄 CSS를
읽고 엔진별 배치 보정 및 페이지 번호를 추가합니다. PDF 엔진에 따라 페이지 분할이
달라질 수 있으므로 갱신 후 실제 PDF의 모든 페이지를 확인합니다.

이력서는 핵심 성과, 경력기술서는 상세 업무와 문제 해결 과정,
포트폴리오는 측정 비교표·구조·화면 자료를 우선합니다.
