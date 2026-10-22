export const profile = {
  name: '김수환', englishName: 'Suhwan Kim', role: 'Frontend Developer',
  email: 'shkiimaa@gmail.com', phone: '010-9931-3175', github: 'https://github.com/shkiimaa',
  introduction: '암호화폐 거래·정보 서비스를 개발하며 웹과 모바일 화면부터 주문·인증·자산 관리 기능까지 맡았습니다. 실제 서비스에서 발견한 성능 저하와 계산 오류를 개선했고, 여러 플랫폼에서 일관된 경험을 제공하기 위한 기능과 개발 환경도 구축했습니다.',
  education: { school: '청운대학교 인천캠퍼스', department: '멀티미디어과(공과계열)', period: '2022.03 – 2027.02', status: '졸업 예정' }
};

export const experiences = [
  { id: 'daon', name: '(주)다온소프트랩', role: 'Frontend Developer', period: '2024.08 – 현재', items: [
    '여러 암호화폐 거래소를 연동한 현물·선물·마진 거래 플랫폼 Bitria의 프론트엔드·백엔드 API 개발·운영',
    '암호화폐 시세·차트·뉴스·커뮤니티와 모의투자 기능을 제공하는 Gobit의 프론트엔드·백엔드 개발',
    'k3s 기반 프로덕션 환경을 배포·운영하고 레거시 플랫폼을 Kubernetes로 이전'
  ] },
  { id: 'doit', name: '(주)두잇', role: 'Frontend Developer', period: '2023.08 – 2024.07', items: [
    '데이터 라벨링·AI 모델 학습·추론을 지원하는 D.A.X의 프론트엔드 개발',
    '사내 공통 UI 라이브러리 doit-uikit 개발·배포, React 개발 표준 수립 및 팀 온보딩 교육',
    'XR·GIS 원격 협업 서비스의 사용자·팀·대용량 파일 관리 백오피스를 풀스택으로 개발',
    '회사 홈페이지를 React로 전환하고 한국어·영어 및 반응형 화면 지원'
  ] },
  { id: 'founder', name: '개인 사업', role: 'Founder', period: '2019.09 – 2022.06', items: ['온라인 커머스·유통 사업. 국내 작가와 협업한 굿즈 제작·판매 및 작품 판매 중개.'] },
  { id: 'designer', name: '프리랜서', role: 'Designer', period: '2017.10 – 2019.08', items: ['상세페이지·BX/BI·편집 디자인.'] }
];

export const skills = [
  { label: 'Front-End', items: ['TypeScript', 'JavaScript', 'Next.js', 'React', 'Tailwind CSS', 'Radix UI', 'Zustand', 'TanStack Query', 'SWR', 'WebSocket', 'next-intl', 'react-hook-form', 'Capacitor', 'Electron', 'Recoil', 'Redux Toolkit'] },
  { label: 'Back-End · Infra', items: ['Node.js', 'Express', 'Prisma', 'MariaDB', 'MySQL', 'MongoDB', 'Redis', 'Docker', 'Kubernetes', 'k3s'] },
  { label: 'Tools', items: ['Git', 'GitHub Actions', 'Lighthouse', 'bundle-analyzer', 'React DevTools Profiler', 'Storybook', 'Chromatic', 'Figma', 'Photoshop', 'Illustrator'] }
];

export const projects = [
  {
    id: 'bitria', name: 'Bitria', category: 'work', company: '(주)다온소프트랩', companyId: 'daon', period: '2025.11 – 현재',
    kind: '멀티 거래소 연동 암호화폐 거래 플랫폼', role: '프론트엔드·백엔드 API 개발 담당',
    description: '여러 암호화폐 거래소를 연동해 현물·선물·마진 거래를 제공하는 플랫폼입니다. 웹·모바일 앱의 프론트엔드와 백엔드 API 개발을 담당하고, 인프라 운영에 참여했습니다.',
    summary: [
    '실시간 시세·호가·체결 및 TradingView 차트, 주문·계정·자산 관리 화면 구현',
      '주문·인증·보안·자산·손익 조회 및 가격 알림 API 설계·개발',
      '주문 가능액 계산 로직을 공통화해 화면 간 계산 불일치 해결',
      '모바일 홈 스크립트 차단 시간(TBT) 약 49%, 앱 트레이딩 화면 누적 렌더 시간 약 60% 감소',
      '웹·iOS·Android 및 Electron 빌드 대응, 모바일 앱 스토어 출시'
    ],
    tasks: [
      ['거래 화면', 'TradingView 차트, 실시간 시세·호가·체결, 현물·선물·마진 주문 및 포지션·체결 내역 구현'],
      ['백엔드 API', '주문 생성·조회·취소·수정 API를 개발하고 요청 검증·권한 확인·주문 처리 서비스와 연동했습니다. 계좌별 자산·USDT 환산·스냅샷·일별 손익 조회도 구현했습니다.'],
      ['인증·보안', '회원가입·소셜 로그인, 2단계 인증(2FA)·패스키·신뢰 기기·세션·계정 복구 기능을 개발했습니다. 고객확인(KYC)·입출금 연동과 API 키 관리도 구현했습니다.'],
      ['멀티 플랫폼', '하나의 코드베이스로 웹·iOS·Android·Electron 앱 빌드, 모바일 앱 스토어 출시, 네이티브 푸시·소셜 로그인·생체인증 연동'],
      ['공통 구조', 'FSD(Feature-Sliced Design) 구조와 시맨틱 디자인 토큰을 설계했습니다. 다크·라이트 테마와 브랜드 2종·6개 로케일을 지원했습니다. 웹·앱별 코드를 분리하고 컴포넌트 API 기준을 문서화했습니다.'],
      ['서비스 운영', '가격 조건별 알림·클라이언트 오류 수집·앱 버전 정책·고객 문의(CS) API 개발, k3s 프로덕션 배포·운영 및 장애 대응']
    ],
    tech: ['TypeScript', 'Next.js 16', 'React 19', 'Tailwind CSS', 'Zustand', 'TanStack Query', 'Capacitor', 'Electron', 'Node.js', 'Express', 'Prisma', 'MariaDB', 'Redis', 'Docker', 'k3s'],
    techGroups: [['프론트엔드·앱', ['TypeScript', 'Next.js 16', 'React 19', 'Tailwind CSS', 'Zustand', 'TanStack Query', 'Capacitor', 'Electron']], ['백엔드·인프라', ['Node.js', 'Express', 'Prisma', 'MariaDB', 'Redis', 'Docker', 'k3s']]],
    outcomes: [{ label: '모바일 홈 총 차단 시간(TBT)', value: '49%', detail: '443 → 226ms · 로컬 비교 측정' }, { label: '앱 트레이딩 화면 누적 렌더 시간', value: '60%', detail: '1,028 → 416ms · 12초 측정' }],
    cases: [
      { id: 'order-calculation', title: '교차 마진 주문 가능액 계산 오류 수정', paragraphs: [
        '레버리지 모달과 주문 폼이 최대 주문 가능액을 따로 계산해 같은 조건에서도 표시 금액이 최대 56배 차이 났습니다. 거래소 문서와 API 응답을 비교해 두 원인을 찾았습니다. 교차 마진 계산에 격리 마진용 리스크 한도를 적용했고, 잔고에 레버리지를 단순 곱하는 계산도 문제였습니다.',
        '표시값만 고치지 않고 계산 로직을 공통 모듈로 통합했습니다. 수수료·안전 여유분·리스크 한도·레버리지 상한·최소 주문 단위를 반영했습니다. 주문 수량의 부동소수점 오차는 BigNumber로 처리했습니다.'
      ], result: '두 화면의 계산값을 거래 단위까지 일치시켰습니다. 경계 사례 20건을 검증하고, 운영 환경에서 발견한 양방향 포지션의 조건부 주문 누락도 수정했습니다.' },
      { id: 'mobile-performance', title: '모바일 홈 JavaScript 실행 시간 개선', paragraphs: [
        '프로덕션 모바일 홈에서 Lighthouse 성능 점수 38점, 총 차단 시간(TBT) 1,610ms를 측정했습니다. JavaScript 청크 실행 시간을 분석해 shared/ui의 일괄 재수출 구조가 불필요한 모듈까지 같은 청크에 포함하는 것을 확인했습니다.',
        'optimizePackageImports를 적용했지만 청크 수와 전체 번들이 늘어 이를 되돌렸습니다. 대신 컴포넌트를 직접 import하도록 바꾸고 three.js 배경은 늦게 불러오도록 했습니다.'
      ], result: '로컬 프로덕션 빌드 비교에서 TBT가 443ms에서 226ms로 약 49% 줄었습니다. 일부 청크 크기는 늘었지만 초기 로드에서 불러오는 JavaScript는 22KB 줄었습니다.', note: 'Lighthouse 모바일 설정(CPU 4배 스로틀·느린 4G)에서 워밍업 후 3~5회 측정했습니다. 프로덕션 진단값 1,610ms와 로컬 비교값은 측정 환경이 다릅니다.' },
      { id: 'render-isolation', title: '실시간 갱신 범위를 표시 컴포넌트로 제한', paragraphs: [
        '페이지 최상위에서 실시간 스냅샷을 구독해 시세가 갱신될 때 주문 폼·하단 패널·닫힌 UI까지 다시 렌더링됐습니다. 웹에서는 같은 현상이 재현되지 않았습니다.',
        '앱 화면에서는 데이터 구독을 실제 시세 표시 컴포넌트로 옮기고, props와 구독 인자의 참조를 안정화했습니다.'
      ], result: '12초 프로파일링에서 누적 렌더 시간 1,028 → 416ms(약 60% 감소), 렌더 횟수 2,802 → 1,323회(약 53% 감소)를 확인했습니다.', note: '앱 현물 트레이딩 화면에서 조작 없이 실시간 데이터만 갱신한 구간입니다. 해당 구간에서 주문 폼·하단 패널의 불필요한 렌더링도 줄었습니다.' }
    ]
  },
  {
    id: 'gobit', name: 'Gobit', category: 'work', company: '(주)다온소프트랩', companyId: 'daon', period: '2024.10 – 2025.12', role: '프론트엔드·백엔드 개발 담당 · 2인 팀', kind: '코인 정보·커뮤니티 플랫폼',
    description: '암호화폐 시세·차트·뉴스·커뮤니티와 모의투자 기능을 제공하는 코인 정보 플랫폼입니다. 2인 팀에서 Next.js 웹 클라이언트를 새로 구축하고 Node.js·Express API를 개발했습니다. Binance 시세를 수집해 Redis에 캐시하고 Socket.IO로 전달했으며, 회원·게시글 기능과 운영 도구를 구현했습니다.',
    summary: ['시세·차트·뉴스·커뮤니티 화면 구현 및 TradingView 차트 연동', 'Binance WebSocket·Redis·Socket.IO 기반 실시간 시세 처리', '커뮤니티 기능과 회원 인증·데이터 API 개발'],
    tasks: [
      ['웹 클라이언트', 'Next.js 15·React 19로 마켓·코인 상세 등 주요 화면을 구현하고 TradingView 차트와 tiptap 에디터를 연동했습니다.'],
      ['실시간 데이터', '시세는 Socket.IO로, 나머지 조회 데이터는 SWR로 관리했습니다. Binance 시세를 Redis에 캐시하고 소켓 재연결·헬스체크 기능을 개선했습니다.'],
      ['서비스 기능', '회원 인증·출석·레퍼럴·게시글·댓글·북마크 기능과 관련 API 개발'],
      ['운영 개선', 'SSR·이미지·폰트를 최적화하고 SEO와 코인 상세 페이지 LCP를 개선했습니다. coinlns에서 Gobit으로 리브랜딩하고 점검 모드·회원 탈퇴 기능을 구현했습니다.']
    ],
    result: '웹 클라이언트 전 페이지와 API를 구축하고 coinlns에서 Gobit으로 리브랜딩했습니다. 2025년 12월 주요 기능 개발을 마친 뒤 유지보수했습니다.',
    tech: ['TypeScript', 'Next.js 15', 'React 19', 'SWR', 'Zustand', 'Radix UI', 'TradingView', 'tiptap', 'Node.js', 'Express', 'Prisma', 'Redis', 'Socket.IO'],
    cases: [{ id: 'platform-migration', title: '레거시 플랫폼 통합과 Kubernetes 이전', period: '2026.07 – 2026.08 · 이전 후 유지보수', paragraphs: [
      'Gobit·모의투자 시스템·코인 매매 시그널 서비스가 Windows·Linux 서버 5대에 분산돼 있었습니다. 핵심 시세 수집기는 소스 코드 없이 .NET 바이너리만 남아 있었습니다. 유지보수와 배포를 이어갈 수 있도록 서비스를 모노레포로 통합하고 Kubernetes 환경으로 이전했습니다.'
    ], items: [
      '기존 바이너리의 동작과 데이터 형식을 분석해 수집기를 Node.js로 재작성했습니다. 실시간 시세·캔들·과거 데이터 수집 모드를 구현하고, 연결 분산 처리와 요청 속도 제한으로 WebSocket 연결 끊김에 대응했습니다.',
      '중계 계층을 정리해 데이터 흐름을 수집기 → Redis → 서버로 단순화했습니다.',
      '13개 서비스의 Dockerfile과 Kubernetes 매니페스트를 작성하고, Ingress 설정 및 DB 백업·캔들 보관 CronJob을 구성했습니다.',
      'GitHub Actions 빌드·배포를 자동화하고, 설정값을 Kubernetes Secret에서 불러오도록 변경했습니다.'
    ], result: '서버 5대에 분산된 서비스를 모노레포로 통합하고 Kubernetes 환경으로 이전했습니다. 기존 바이너리와 결과를 대조해 새 수집기를 검증하고, 13개 서비스의 빌드·배포를 자동화했습니다.' }]
  },
  {
    id: 'doit-uikit', name: 'doit-uikit', category: 'work', company: '두잇', companyId: 'doit', period: '2024.02 – 2024.07', role: '프론트엔드 개발 담당', kind: '사내 공통 UI 라이브러리',
    description: '프로젝트마다 반복 구현하던 UI를 공통 라이브러리로 만들고, React 개발 규칙을 팀에 공유했습니다.',
    summary: ['Atomic Design 기반 UI 컴포넌트 24종 개발 및 npm 배포', '타입 선언 자동 생성·React 외부화 등 패키징 구성', 'Storybook·Chromatic 문서화 및 사내 프로젝트 2곳에 도입'],
    tasks: [
      ['컴포넌트', 'Atomic Design 기반 UI 컴포넌트 24종 개발: 기본 컴포넌트 12종, 차트 5종을 포함한 복합 컴포넌트 12종'],
      ['패키징', 'React·React DOM을 peer dependency로 분리하고 vite-plugin-dts로 타입 선언을 자동 생성해 npm 배포'],
      ['문서화', 'Storybook·Chromatic으로 사용법·Props·상태별 UI 문서화'],
      ['팀 표준', '디렉토리 구조·디자인 패턴·라이브러리 선정 기준 정립, ESLint·Prettier 설정 및 팀 온보딩 교육']
    ],
    result: 'D.A.X와 회사 홈페이지에서 사용하며 요구사항에 맞춰 라이브러리를 개선하고 배포했습니다. 컴포넌트·사용 문서·린터 설정을 함께 제공해 공통 UI와 개발 규칙을 적용했습니다.',
    tech: ['TypeScript', 'React 18', 'Vite', 'styled-components', 'Storybook 8', 'Chromatic', 'vite-plugin-dts'],
    images: [{ src: 'uikit-storybook.png', alt: 'doit-uikit 컴포넌트의 Storybook 문서와 Props 설정 화면' }]
  },
  {
    id: 'dax', name: 'D.A.X', category: 'work', company: '두잇', companyId: 'doit', period: '2024.01 – 2024.06', role: '프론트엔드 개발 담당 · 백엔드 1명과 협업', kind: 'AI 모델 학습·운영 플랫폼',
    description: '데이터 수집·라벨링부터 모델 학습·추론까지 지원하는 사내 플랫폼입니다. 백엔드 개발자 1명과 협업해 프론트엔드 전 화면을 개발했습니다.',
    summary: ['데이터 관리·모델 학습·추론·대시보드 화면 구현', '원본↔화면 좌표 변환을 적용한 캔버스 라벨링 도구 개발', '이미지 업로드·컬렉션 ZIP 다운로드 구현 및 사내 UI 라이브러리 적용'],
    tasks: [
      ['플랫폼 화면', '프로젝트·대시보드·클래스·컬렉션·라벨링·모델 학습·추론 화면 구현'],
      ['데이터 도구', '캔버스 기반 바운딩 박스 라벨링, 이미지·폴더 업로드, 컬렉션 ZIP 다운로드 기능 개발'],
      ['공통 구조', '검색 조건·페이지네이션·로딩 상태 처리, 사내 표준 구조와 doit-uikit 적용']
    ],
    insight: '라벨링 이미지는 화면 크기에 맞춰 축소되지만 학습용 좌표는 원본 해상도로 저장해야 했습니다. 원본↔화면 좌표의 양방향 변환을 전용 훅으로 분리해 그리기·저장·재표시가 같은 규칙을 사용하도록 구현했습니다.',
    tech: ['TypeScript', 'React 18', 'TanStack Query 5', 'Zustand', 'React Router 6', 'Axios', 'doit-uikit'],
    images: [{ src: 'dax-labeling-example.png', alt: 'D.A.X에서 이미지 위에 바운딩 박스를 그려 라벨링하는 화면' }, { src: 'dax-dashboard.png', alt: 'D.A.X의 프로젝트 데이터와 학습 현황 대시보드' }]
  },
  {
    id: 'doit-homepage', name: 'doit-homepage', category: 'work', company: '두잇', companyId: 'doit', period: '2024.05 – 2024.07', role: '프론트엔드 개발 담당', kind: '회사 홈페이지 React 마이그레이션',
    description: 'jQuery 기반 회사 홈페이지를 React·TypeScript·Vite SPA로 재작성해 한국어·영어와 반응형 화면을 지원했습니다.',
    summary: ['주요 5개 페이지를 React로 재작성하고 공통 UI를 doit-uikit으로 통일', 'i18next 기반 한국어·영어 및 반응형 화면 구현'],
    tasks: [
      ['마이그레이션', '메인·회사소개·서비스·인증·파트너 5개 페이지를 컴포넌트 구조로 재작성'],
      ['UI 재사용', '사내 UI 라이브러리 doit-uikit을 적용해 색상·타이포·레이아웃 등 공통 요소 재사용'],
      ['다국어', 'i18next로 한국어·영어를 지원하고 번역 리소스를 페이지별 네임스페이스로 분리'],
      ['반응형', 'CSS와 JavaScript가 같은 브레이크포인트를 사용하도록 구성하고 화면 크기 변화는 CSS로 처리했습니다. 모바일에서 불필요한 영역은 렌더링하지 않도록 했습니다.']
    ],
    result: '주요 페이지를 React로 전환하고 한국어·영어 및 반응형 화면을 구현했습니다. 공통 라이브러리를 적용하고 사용 중 발견한 개선점을 라이브러리에 반영했습니다.',
    tech: ['TypeScript', 'React 18', 'Vite', 'styled-components', 'doit-uikit', 'i18next', 'react-responsive', 'Zustand', 'React Router 6', 'Kakao Maps SDK']
  },
  {
    id: 'xrgis', name: 'XRGIS BackOffice', category: 'work', company: '두잇', companyId: 'doit', period: '2023.08 – 2023.12', role: '프론트엔드·백엔드 개발 담당', kind: 'XR·GIS 원격 협업 시스템 백오피스',
    description: '가상·증강·혼합현실(XR)과 지도·공간정보(GIS)를 결합한 원격 협업 서비스입니다. 사용자·팀 관리와 OBJ 모델·영상 파일 처리를 위한 백오피스를 개발했습니다. React 화면과 Express API를 구현하고 GridFS 기반 파일 저장 및 MariaDB 기반 세션 인증을 연동했습니다.',
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
