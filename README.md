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

PDF는 실제 페이지에 인쇄 스타일을 적용해 만든 파일입니다. 문서를 수정하면 PDF도 갱신해야 합니다. 브라우저의 인쇄 기능으로 새 PDF를 저장해 `public/resume.pdf`, `public/career.pdf`를 교체한 뒤 다시 빌드합니다.

Pretendard의 라이선스는 `public/fonts/LICENSE.txt`에 포함되어 있습니다. 프로젝트 화면은 본인의 기존 포트폴리오 자료를 사용합니다.
