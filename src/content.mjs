export const profile = {
  name: '김수환', englishName: 'Suhwan Kim', role: '웹 개발자',
  email: 'shkiimaa@gmail.com', phone: '010-9931-3175', github: 'https://github.com/shkiimaa',
  introduction: '웹 서비스의 프론트엔드와 백엔드 API를 개발·운영합니다. 암호화폐 거래·정보 서비스, 사내 UI 라이브러리와 AI 모델 학습·운영 플랫폼을 개발했습니다. 디자인 실무 경험을 바탕으로 기획·디자인·백엔드와 구현 범위를 조율합니다.',
  education: { school: '청운대학교 인천캠퍼스', department: '멀티미디어과(공과계열)', period: '2022.03 – 2027.02', status: '졸업 예정' }
};

export const experiences = [
  { id: 'daon', name: '(주)다온소프트랩', role: 'Web Developer', period: '2024.08 – 현재', items: [
    '여러 암호화폐 거래소를 연동한 현물·선물·마진 거래 플랫폼 Bitria의 프론트엔드·백엔드 API 개발·운영',
    '암호화폐 시세·차트·뉴스·커뮤니티와 모의투자를 제공하는 Gobit의 프론트엔드·백엔드 개발',
    'k3s 기반 프로덕션 배포·운영 참여 및 레거시 플랫폼의 Kubernetes 이전'
  ] },
  { id: 'doit', name: '(주)두잇', role: 'Web Developer', period: '2023.08 – 2024.07', items: [
    '데이터 라벨링·AI 모델 학습·추론을 지원하는 D.A.X의 프론트엔드 개발',
    '사내 공통 UI 라이브러리 doit-uikit 개발·배포, React 개발 표준 수립 및 팀 온보딩 교육',
    'XR·GIS 관리자 백오피스의 프론트엔드·백엔드 개발',
    '회사 홈페이지 React 마이그레이션 및 한국어·영어 다국어·반응형 대응'
  ] },
  { id: 'founder', name: '개인 사업', role: 'Founder', period: '2019.09 – 2022.06', items: ['온라인 커머스·유통 사업. 국내 작가와 협업한 굿즈 제작·판매 및 작품 판매 중개.'] },
  { id: 'designer', name: '프리랜서', role: 'Designer', period: '2017.10 – 2019.08', items: ['상세페이지·BX/BI·편집 디자인.'] }
];

export const skills = [
  { label: 'Front-End', items: ['TypeScript / JavaScript', 'Next.js / React', 'Tailwind CSS / Radix UI', 'Zustand / TanStack Query / SWR', 'WebSocket', 'next-intl / react-hook-form', 'Capacitor / Electron', 'Recoil / Redux Toolkit'] },
  { label: 'Back-End · Infra', items: ['Node.js / Express', 'Prisma', 'MariaDB / MySQL', 'MongoDB / Redis', 'Docker / Kubernetes / k3s'] },
  { label: 'Tools', items: ['Git / GitHub Actions', 'Lighthouse / bundle-analyzer', 'React DevTools Profiler', 'Storybook / Chromatic', 'Figma', 'Photoshop / Illustrator'] }
];

export const projects = [
  {
    id: 'bitria', name: 'Bitria', category: 'work', company: '다온소프트랩', companyId: 'daon', period: '2025.11 – 현재',
    kind: '멀티 거래소 연동 암호화폐 거래 플랫폼', role: '프론트엔드·백엔드 API 개발 담당',
    description: '여러 암호화폐 거래소를 연동해 현물·선물·마진 거래를 제공하는 플랫폼입니다. 웹·모바일 앱의 프론트엔드와 백엔드 API 개발을 담당하고, 인프라 운영에 참여했습니다.',
    summary: [
      '실시간 시세·호가·체결과 TradingView 차트, 주문·계정·자산 관리 화면 구현',
      '주문·인증·보안·자산·손익 조회 및 가격 알림 API 설계·개발',
      '주문 가능액 계산 공통화로 화면 간 계산 불일치 해결',
      '모바일 홈 TBT 약 49%, 앱 트레이딩 누적 렌더 시간 약 60% 감소',
      '웹·iOS·Android 및 Electron 빌드 대응, 모바일 앱 스토어 출시'
    ],
    tasks: [
      ['거래 화면', 'TradingView 차트, 실시간 시세·호가·체결, 현물·선물·마진 주문 및 포지션·체결 내역 구현'],
      ['백엔드 API', '주문 생성·조회·취소·수정, 요청 검증·권한 확인·주문 처리 서비스 연동. 계좌별 자산·USDT 환산·자산 스냅샷·일별 손익 조회 구현'],
      ['인증·보안', '회원가입·로그인·소셜 로그인, 2FA·패스키·신뢰 기기·세션 관리·계정 복구 API와 화면 개발. KYC·입출금 서비스 연동 및 API 키 관리'],
      ['멀티 플랫폼', '동일 코드베이스에서 웹·iOS·Android와 Electron 데스크톱 빌드 대응. 모바일 앱 스토어 출시, 네이티브 푸시·소셜 로그인·생체인증 연동'],
      ['공통 구조', 'FSD 아키텍처와 시맨틱 디자인 토큰 설계. 다크·라이트 테마, 브랜드 2종·6개 로케일 지원. 웹·앱 차이에 따른 폴더·props·slot 사용 기준 문서화'],
      ['서비스 운영', '가격 조건별 알림·클라이언트 에러 수집·앱 버전 정책·CS 티켓 API 개발. k3s 프로덕션 배포·운영 및 이슈 대응']
    ],
    tech: ['TypeScript', 'Next.js 16', 'React 19', 'Tailwind CSS', 'Zustand', 'TanStack Query', 'Capacitor', 'Electron', 'Node.js', 'Express', 'Prisma', 'MariaDB', 'Redis', 'Docker', 'k3s'],
    outcomes: [{ label: '모바일 홈 TBT', value: '49%', detail: '443 → 226ms · 로컬 비교 측정' }, { label: '앱 누적 렌더 시간', value: '60%', detail: '1,028 → 416ms · 12초 측정' }],
    cases: [
      { id: 'order-calculation', title: '주문 가능액 계산 불일치 개선', paragraphs: [
        '레버리지 모달과 주문 폼이 최대 주문 가능액을 각각 계산해, 같은 조건에서 약 56배의 표시 차이가 발생했습니다. 거래소 공식 문서와 실제 API 응답을 대조해 교차 마진에 격리 마진 전용 리스크리밋을 적용한 오류와 잔고×레버리지 단순 계산을 원인으로 확인했습니다.',
        '표시값만 수정하면 계산 규칙이 바뀔 때 다시 어긋날 수 있어, 수수료·안전 버퍼·리스크리밋·레버리지 상한·최소 주문 단위를 반영하는 공통 계산 모듈로 통합했습니다. 주문 수량의 부동소수점 오차는 BigNumber 기반으로 처리했습니다.'
      ], result: '두 화면의 계산값을 랏 단위까지 일치시켰습니다. 경계 사례 20건을 검증하고, 운영 환경 확인 과정에서 발견한 양방향 포지션의 조건부 요청 누락도 수정했습니다.' },
      { id: 'mobile-performance', title: '모바일 홈의 스크립트 실행 비용 개선', paragraphs: [
        '프로덕션 모바일 홈 진단에서 Lighthouse 38점·TBT 1,610ms를 확인했습니다. 청크별 실행 비용을 분석한 결과, shared/ui의 일괄 재수출 경로가 불필요한 모듈을 같은 청크로 묶고 있었습니다.',
        'optimizePackageImports 적용은 청크 수와 전체 번들을 늘려 되돌리고, 컴포넌트별 직접 경로 import와 three.js 배경 지연 로딩을 적용했습니다.'
      ], result: '로컬 프로덕션 빌드의 전후 비교에서 TBT 443 → 226ms(약 49% 감소), 초기 JavaScript 전송량 22KB 감소를 확인했습니다. 전체 번들 증가분은 초기 로드에 포함되지 않음을 확인했습니다.', note: 'Lighthouse 모바일 프리셋, CPU 4배 스로틀·느린 4G, 워밍업 후 3~5회 측정. 프로덕션 진단값 1,610ms와 로컬 전후 비교값은 서로 다른 환경의 측정입니다.' },
      { id: 'render-isolation', title: '실시간 갱신 범위를 표시 컴포넌트로 제한', paragraphs: [
        '실시간 스냅샷을 페이지 최상위 상태에서 받아 시세가 갱신될 때 주문 폼·하단 패널·닫힌 UI까지 함께 렌더링됐습니다. 웹 화면은 같은 문제가 없음을 측정으로 확인했습니다.',
        '앱 라우트에 한정해 구독을 표시 컴포넌트로 내리고, props와 구독 인자의 참조를 안정화했습니다.'
      ], result: '12초 프로파일링에서 누적 렌더 시간 1,028 → 416ms(약 60% 감소), 렌더 횟수 2,802 → 1,323회(약 53% 감소)를 확인했습니다.', note: '앱 현물 트레이딩 화면에서 조작 없이 실시간 데이터만 갱신한 구간입니다. 해당 구간에서 주문 폼·하단 패널의 불필요한 렌더링도 줄었습니다.' }
    ]
  },
  {
    id: 'gobit', name: 'Gobit', category: 'work', company: '다온소프트랩', companyId: 'daon', period: '2024.10 – 2025.12', role: '프론트엔드·백엔드 개발 담당 · 2인 팀', kind: '코인 정보·커뮤니티 플랫폼',
    description: '암호화폐 시세·차트와 뉴스, 커뮤니티, 모의투자를 한곳에서 제공하는 코인 정보 플랫폼입니다. 2인 팀에서 Next.js 웹 클라이언트를 신규 구축하고 Node.js·Express API를 함께 개발했습니다. Binance 시세를 수집해 Redis에 캐시하고 Socket.IO로 전달했으며, 회원·게시글 기능과 서비스 운영 기능을 구현했습니다.',
    summary: ['시세·차트·뉴스·커뮤니티 화면 구현 및 TradingView 차트 연동', 'Binance WebSocket·Redis·Socket.IO 기반 실시간 시세 처리', '커뮤니티 기능과 회원 인증·데이터 API 개발'],
    tasks: [
      ['웹 클라이언트', 'Next.js 15·React 19 기반 마켓·심볼 상세·뉴스·커뮤니티·랭킹·마이페이지 구현. TradingView 차트와 tiptap 에디터 연동'],
      ['실시간 데이터', '시세는 Socket.IO, 그 외 조회는 SWR로 관리. Binance 데이터 수집·Redis 캐시·소켓 재연결·헬스체크 개선'],
      ['서비스 기능', '회원 인증·출석·레퍼럴·게시글·댓글·북마크 등 서비스 기능과 API 개발'],
      ['운영 개선', 'SSR·이미지·폰트·SEO·LCP·심볼 페이지 렌더링 개선. coinlns → Gobit 리브랜딩, 점검 모드·회원 탈퇴 구현']
    ],
    result: '웹 클라이언트 전 페이지와 API 기능을 구축하고 coinlns에서 Gobit으로 리브랜딩했습니다. 2025년 12월 주요 기능 개발을 마쳤고, 이후 유지보수와 2026년 플랫폼 이전 작업은 별도 이력으로 구분했습니다.',
    tech: ['TypeScript', 'Next.js 15', 'React 19', 'SWR', 'Zustand', 'Radix UI', 'TradingView', 'tiptap', 'Node.js', 'Express', 'Prisma', 'Redis', 'Socket.IO'],
    links: [{ label: '웹 클라이언트 코드', url: 'https://github.com/shkiimaa/junco_client' }, { label: '백엔드 코드', url: 'https://github.com/shkiimaa/junco_server' }],
    cases: [{ id: 'platform-migration', title: '레거시 플랫폼 통합과 Kubernetes 이전', period: '2026.07 – 2026.08 · 이전 후 유지보수', paragraphs: [
      'Gobit·모의투자 시스템·코인 매매 시그널 서비스가 Windows·Linux 서버 5대에 분산돼 있었고, 핵심 시세 수집기는 소스가 유실된 .NET 바이너리만 남아 있었습니다. 유지보수와 배포를 이어갈 수 있도록 서비스들을 모노레포로 통합하고 Kubernetes 환경으로 이전했습니다.'
    ], items: [
      '기존 바이너리의 동작과 데이터 형식을 분석해 수집기를 Node.js로 재작성. 실시간·캔들·백필 모드 구현, 연결 샤딩·스로틀로 WebSocket 끊김 대응',
      '중계 계층을 정리해 수집기 → Redis → 서버 구조로 단순화',
      '13개 서비스의 Dockerfile·Kubernetes 매니페스트, Ingress·DB 백업·캔들 보관정책 CronJob 작성',
      'GitHub Actions 빌드·배포 파이프라인 구성 및 Kubernetes Secret 참조 전환'
    ], result: '서버 5대에 분산된 플랫폼을 모노레포·Kubernetes 환경으로 이전하고, 재작성한 수집기를 기존 동작과 대조 검증했습니다. 13개 서비스의 빌드·배포를 자동화했습니다.' }]
  },
  {
    id: 'doit-uikit', name: 'doit-uikit', category: 'work', company: '두잇', companyId: 'doit', period: '2024.02 – 2024.07', role: '프론트엔드 개발 담당', kind: '사내 공통 UI 라이브러리',
    description: '프로젝트마다 반복 구현하던 UI를 공통 라이브러리로 개발하고, React 개발 규칙을 팀에 공유했습니다.',
    summary: ['Atomic Design 기반 UI 컴포넌트 24종 개발 및 npm 배포', '타입 선언 자동 생성·React 외부화 등 패키징 구성', 'Storybook·Chromatic 문서화 및 사내 프로젝트 2곳에 도입'],
    tasks: [
      ['컴포넌트', 'Atomic Design 기반 UI 컴포넌트 24종 개발. 기본 요소 12종과 차트 5종을 포함한 복합 요소 12종 구성'],
      ['패키징', 'React·React DOM을 peer dependency로 분리하고 vite-plugin-dts로 타입 선언을 자동 생성해 npm 배포'],
      ['문서화', 'Storybook·Chromatic으로 사용법·Props·상태별 UI 문서화'],
      ['팀 표준', '디렉토리 구조·디자인 패턴·라이브러리 선정 기준 정립, ESLint·Prettier 설정 및 팀 온보딩 교육']
    ],
    result: 'D.A.X와 회사 홈페이지 2개 프로젝트에 도입해 요구사항에 맞춰 버전을 올리며 유지보수했습니다. 문서·린터 설정·실제 라이브러리를 함께 제공해 공통 UI와 개발 규칙을 제품에 적용했습니다.',
    tech: ['TypeScript', 'React 18', 'Vite', 'styled-components', 'Storybook 8', 'Chromatic', 'vite-plugin-dts'],
    images: [{ src: 'uikit-storybook.png', alt: 'doit-uikit 컴포넌트의 Storybook 문서와 Props 설정 화면' }],
    links: [{ label: 'npm 패키지', url: 'https://www.npmjs.com/package/doit-uikit' }]
  },
  {
    id: 'dax', name: 'D.A.X', category: 'work', company: '두잇', companyId: 'doit', period: '2024.01 – 2024.06', role: '프론트엔드 개발 담당 · 백엔드 1명과 협업', kind: 'AI 모델 학습·운영 플랫폼',
    description: '데이터 수집·라벨링부터 모델 학습·추론까지 지원하는 사내 플랫폼입니다. 백엔드 개발자 1명과 협업해 프론트엔드 전 화면을 개발했습니다.',
    summary: ['데이터 관리·모델 학습·추론·대시보드 화면 구현', '원본↔화면 좌표 변환을 적용한 캔버스 라벨링 도구 개발', '이미지 업로드·컬렉션 ZIP 다운로드 구현 및 사내 UI 라이브러리 적용'],
    tasks: [
      ['플랫폼 화면', '프로젝트·대시보드·클래스·컬렉션·라벨링·모델 학습·추론 화면 구현'],
      ['데이터 도구', '캔버스 바운딩 박스 라벨링 도구와 이미지·폴더 업로드, 컬렉션 ZIP 다운로드 개발'],
      ['공통 구조', '검색 조건·페이지네이션·로딩 상태 처리, 사내 표준 구조와 doit-uikit 적용']
    ],
    insight: '라벨링 이미지는 화면 크기에 맞춰 축소되지만 학습용 좌표는 원본 해상도로 저장해야 했습니다. 원본↔화면 좌표의 양방향 변환을 전용 훅으로 분리해 그리기·저장·재표시가 같은 규칙을 사용하도록 구현했습니다.',
    tech: ['TypeScript', 'React 18', 'TanStack Query 5', 'Zustand', 'React Router 6', 'Axios', 'doit-uikit'],
    images: [{ src: 'dax-labeling-example.png', alt: 'D.A.X에서 이미지 위에 바운딩 박스를 그려 라벨링하는 화면' }, { src: 'dax-dashboard.png', alt: 'D.A.X의 프로젝트 데이터와 학습 현황 대시보드' }]
  },
  {
    id: 'doit-homepage', name: 'doit-homepage', category: 'work', company: '두잇', companyId: 'doit', period: '2024.05 – 2024.07', role: '프론트엔드 개발 담당', kind: '회사 홈페이지 React 마이그레이션',
    description: 'jQuery 기반 회사 홈페이지를 React·TypeScript·Vite 기반 SPA로 재작성하고 다국어·반응형에 대응했습니다.',
    summary: ['주요 5개 페이지를 React로 재작성하고 공통 UI를 doit-uikit으로 통일', 'i18next 기반 한국어·영어 및 반응형 화면 구현'],
    tasks: [
      ['마이그레이션', '메인·회사소개·서비스·인증·파트너 5개 페이지를 컴포넌트 구조로 재작성'],
      ['UI 재사용', '사내 UI 라이브러리 doit-uikit을 적용해 색상·타이포·레이아웃 등 공통 요소 재사용'],
      ['다국어', 'i18next 기반 한국어·영어 지원. 번역 리소스를 페이지별 네임스페이스로 분리'],
      ['반응형', 'CSS·JavaScript가 공통 브레이크포인트를 사용하도록 구성. 치수 변화는 CSS로 처리하고 모바일에서 불필요한 영역은 렌더링 생략']
    ],
    result: '주요 페이지의 React 전환과 2개 언어·반응형 대응을 완료했습니다. 공통 라이브러리를 적용하고, 사용 과정에서 필요한 개선을 라이브러리에 반영했습니다.',
    tech: ['TypeScript', 'React 18', 'Vite', 'styled-components', 'doit-uikit', 'i18next', 'react-responsive', 'Zustand', 'React Router 6', 'Kakao Maps SDK']
  },
  {
    id: 'xrgis', name: 'XRGIS BackOffice', category: 'work', company: '두잇', companyId: 'doit', period: '2023.08 – 2023.12', role: '프론트엔드·백엔드 개발 담당', kind: 'XR·GIS 관리자 도구',
    description: 'XR·GIS 서비스의 사용자·팀·대용량 파일을 관리하는 사내 백오피스입니다. 프론트엔드·백엔드와 데이터베이스 연동을 개발했습니다.',
    summary: ['사용자·팀·파일 관리 화면 및 Express API 개발', 'GridFS 대용량 파일 업로드와 ZIP 일괄 다운로드 구현', '사내 공통 계정 인증 및 팀별 파일 접근 권한 적용'],
    tasks: [
      ['풀스택 개발', 'React 기반 사용자·팀·데이터 관리 화면과 Express API 개발'],
      ['파일 처리', 'MongoDB GridFS 기반 대용량 파일 업로드, archiver 기반 ZIP 일괄 다운로드 구현'],
      ['인증·권한', '사내 공통 관리자 계정의 세션 인증과 팀 소속에 따른 파일 다운로드 권한 적용'],
      ['상태·피드백', '서버 상태는 React Query, UI 상태는 Recoil로 분리하고 API 결과를 Toast로 안내']
    ],
    insight: 'MongoDB에 파일을 저장해야 하는 요구사항에 맞춰, 일반 문서의 16MB 제한에 걸리는 OBJ·영상 등을 GridFS의 청크 분할 저장으로 처리했습니다. 같은 관리자 계정을 사용하는 사내 서비스와는 MySQL 기반 세션 저장소를 통해 인증 체계를 맞췄습니다.',
    tech: ['TypeScript', 'React 18', 'React Query', 'Recoil', 'styled-components', 'Express', 'MongoDB(GridFS)', 'MariaDB']
  },
];
