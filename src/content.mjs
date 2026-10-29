export const profile = {
  name: '김수환', englishName: 'Suhwan Kim', role: 'Frontend Developer',
  email: 'shkiimaa@gmail.com', phone: '010-9931-3175', github: 'https://github.com/shkiimaa',
  introduction: '중복되는 코드는 공통화하고, 플랫폼별 차이는 분리해 유지보수하기 좋은 프론트엔드를 만듭니다.\n\n사내 공통 UI 라이브러리를 개발·배포하고, 컴포넌트 사용법과 개발 규칙을 문서화해 두 프로젝트에 적용했습니다. 실시간 거래 서비스에서는 웹·모바일·데스크톱의 공통 코드와 플랫폼별 구현을 분리하고, 거래 화면과 백엔드 API를 개발했습니다.',
  education: { school: '청운대학교 인천캠퍼스', department: '멀티미디어과(공과계열)', period: '2022.03 – 2027.02', status: '졸업 예정' }
};

export const experiences = [
  { id: 'daon', name: '(주)다온소프트랩', role: 'Frontend Developer', period: '2024.08 – 현재', items: [
    'Bitria (암호화폐 거래 플랫폼) | 프론트엔드·백엔드 개발 · Next.js·Express',
    'Gobit (코인 정보·커뮤니티 플랫폼) | 프론트엔드·백엔드 개발 · Next.js·Express',
    'Gobit 레거시 플랫폼 통합 (서비스 13개) | 인프라 이전·배포 자동화 · Kubernetes(K3s)'
  ] },
  { id: 'doit', name: '(주)두잇', role: 'Frontend Developer', period: '2023.08 – 2024.07', items: [
    'D.A.X (AI 모델 학습·운영 플랫폼) | 프론트엔드 개발 · React',
    'doit-uikit (사내 UI 라이브러리) | 컴포넌트 개발·npm 배포 · React',
    'XRGIS BackOffice (사용자·파일 관리) | 프론트엔드·백엔드 개발 · React·Express',
    'doit-homepage (회사 홈페이지 React 전환) | 프론트엔드 개발 · React'
  ] },
  { id: 'founder', name: '개인 사업', role: 'Founder', period: '2019.09 – 2022.06', items: ['온라인 커머스·유통 사업. 국내 작가와 협업한 굿즈 제작·판매 및 작품 판매 중개.'] },
  { id: 'designer', name: '프리랜서', role: 'Designer', period: '2017.10 – 2019.08', items: ['상세페이지·BX/BI·편집 디자인.'] }
];

export const skills = [
  { label: 'Front-End', items: ['TypeScript', 'React', 'Next.js', 'Tailwind CSS', 'styled-components', 'Zustand', 'TanStack Query', 'SWR', 'Capacitor', 'Electron'] },
  { label: 'Back-End', items: ['Node.js', 'Express', 'Socket.IO', 'MariaDB', 'TimescaleDB', 'Redis', 'RabbitMQ'] },
  { label: 'Infra', items: ['Docker', 'Kubernetes(K3s)', 'GitHub Actions'] }
];

export const projects = [
  {
    id: 'bitria', name: 'Bitria', category: 'work', company: '(주)다온소프트랩', companyId: 'daon', period: '2025.11 – 현재',
    kind: '멀티 거래소 연동 암호화폐 거래 플랫폼', role: '프론트엔드 전담·백엔드 API 개발 · 2인 팀',
    description: '여러 암호화폐 거래소를 연동해 현물·선물·마진 거래를 제공하는 플랫폼입니다. 2인 팀에서 웹·iOS·Android·데스크톱 프론트엔드 전체를 초기 구축부터 개발했습니다. 주문·인증·자산 API 개발과 인프라 운영에도 참여했습니다.',
    summary: [
    '실시간 시세·호가·체결과 TradingView 차트, 주문·계정·자산 관리 화면 개발',
      '주문·인증·보안·자산·손익 조회 및 가격 알림 API 설계·개발',
      'shared/ui 배럴 import의 불필요한 모듈 유입 개선',
      '앱 복귀 시 포지션·자산 캐시와 알림 소켓이 복구되지 않던 문제 해결',
      '웹·iOS·Android·Electron 빌드 대응 및 모바일 앱 스토어 출시'
    ],
    tasks: [
      ['공통 구조', 'FSD(Feature-Sliced Design) 구조와 시맨틱 디자인 토큰 설계, 다크·라이트 테마·브랜드 2종·6개 로케일 지원, 웹·앱별 코드 분리 및 컴포넌트 API 기준 문서화'],
      ['거래 화면', 'TradingView 차트, 실시간 시세·호가·체결, 현물·선물·마진 주문 및 포지션·체결 내역 구현'],
      ['멀티 플랫폼', '하나의 코드베이스로 웹·iOS·Android·Electron 앱 빌드, 모바일 앱 스토어 출시, 네이티브 푸시·소셜 로그인·생체인증 연동'],
      ['인증·보안', '회원가입·소셜 로그인, 2단계 인증(2FA)·패스키·신뢰 기기·세션·계정 복구 개발, 고객확인(KYC)·입출금 연동 및 API 키 관리 구현'],
      ['백엔드 API', '주문 생성·조회·취소·수정 API 개발 및 요청 검증·권한 확인·주문 처리 서비스 연동, 계좌별 자산·USDT 환산·스냅샷·일별 손익 조회 구현'],
      ['서비스 운영', '가격 조건별 알림·클라이언트 오류 수집·앱 버전 정책·고객 문의(CS) API 개발, K3s 프로덕션 배포·운영 및 장애 대응']
    ],
    tech: ['TypeScript', 'Next.js', 'TanStack Query', 'Zustand', 'Tailwind CSS', 'Capacitor', 'Node.js', 'Express', 'Socket.IO'],
    techGroups: [['프론트엔드', ['TypeScript', 'Next.js', 'Tailwind CSS', 'next-intl', 'Zustand', 'TanStack Query', 'Capacitor', 'Electron']], ['백엔드', ['Node.js', 'Express', 'Prisma', 'MariaDB', 'TimescaleDB', 'Redis', 'RabbitMQ', 'Socket.IO', 'Docker', 'Kubernetes(K3s)']]],
    outcomes: [{ label: '모바일 홈 총 차단 시간(TBT)', value: '30%', detail: '417 → 292.5ms · 로컬 프로덕션 빌드·5회 중앙값' }],
    cases: [
      { id: 'mobile-performance', title: '배럴 import의 불필요한 모듈 유입 개선', paragraphs: [
        '번들 분석으로 버튼 하나를 import해도 shared/ui의 다단계 배럴을 거쳐 163개 모듈 전체가 하나의 청크로 묶여 들어오는 구조를 확인했습니다. 배럴 import 136곳을 컴포넌트 정의 파일 직접 참조로 바꿔 이 청크를 없앴습니다.',
        'optimizePackageImports도 비교했지만 청크 수와 전체 번들이 증가해 채택하지 않았습니다. three.js 기반 장식용 배경은 별도 조치로 next/dynamic을 이용해 클라이언트 청크로 분리했습니다.'
      ], result: '직접 import 변경 전후의 로컬 프로덕션 빌드를 각 5회 측정한 결과, 모바일 Lighthouse TBT 중앙값은 417ms에서 292.5ms로 감소했습니다.', note: '측정 조건은 로컬 프로덕션 빌드, 모바일 CPU 4배 감속, 네트워크 제한입니다. three.js 동적 import는 전후 모두 적용돼 있어 직접 import 변경만 비교했습니다. 외부 API 응답과 측정 당시 시스템 부하에 따라 수치는 달라질 수 있습니다.' },
      { id: 'app-resume', title: '앱 복귀 후 포지션·자산 정보 불일치 해결', paragraphs: [
        'iOS 앱을 백그라운드에 두었다가 복귀하면 이미 청산된 포지션이 화면에 남고, 현재 시세로 계산한 손익까지 표시되는 프로덕션 장애가 있었습니다. 시세 연결은 복구되지만 포지션 조회 캐시는 갱신되지 않아, 다음 정기 조회까지 최대 2분간 오래된 정보가 남았습니다.',
        '원인은 두 가지였습니다. iOS WKWebView는 백그라운드에서 복귀할 때 웹의 visibilitychange 이벤트를 보내지 않아 TanStack Query가 복귀를 감지하지 못했습니다. 알림 소켓은 백그라운드에 있는 동안 재연결 5회 제한을 모두 써버려 재연결을 포기했습니다. 네이티브 앱 복귀 이벤트는 시세 소켓에만 연결돼 있었습니다.',
        'Capacitor의 appStateChange를 TanStack Query focusManager에 연결해 사용 중인 stale 쿼리를 다시 조회하도록 했습니다. 알림 소켓에는 복귀 시 명시적 재연결과 지속 재시도를 추가했습니다. 현재 상태를 확인하는 API 재조회와 이후 변경을 받는 소켓 연결을 함께 복구하도록 구성했습니다.'
      ], result: '앱 복귀 시 청산된 포지션이 남지 않고, 포지션·자산이 바로 최신 상태로 표시됩니다. 페이지 새로고침 없이 갱신이 필요한 쿼리만 다시 요청합니다.' },
      { id: 'app-locale-navigation', title: '비영어 기기에서 앱 대신 Safari가 열리던 문제 해결', paragraphs: [
        '일본어·스페인어·베트남어·태국어·중국어 기기에서 iOS 앱을 실행하면 앱 화면 대신 Safari로 사이트가 열리는 문제가 있었습니다. 영어 이외의 지원 언어를 쓰는 기기에서 공통으로 발생했습니다.',
        'Capacitor iOS 소스를 확인한 결과, 앱 내부 이동 여부를 server.url과의 문자열 접두사 비교로 판정하고 있었습니다. next-intl의 as-needed 설정으로 기본 언어 외에는 /th/m처럼 주소 앞에 언어 코드가 붙어, server.url(/m)과 접두사가 달라지면서 외부 링크로 판정됐습니다. 두 설정은 각각 정상이었지만 함께 쓰일 때 문제가 생겼습니다.',
        '앱 요청에 한해 미들웨어에서 언어 코드를 붙이는 리다이렉트를 같은 대상의 rewrite로 바꿨습니다. 주소는 /m으로 시작하도록 유지하면서 화면은 기기 언어로 표시하고, 웹 동작은 바꾸지 않았습니다.'
      ], result: '영어 외 지원 언어 5개(일본어·스페인어·베트남어·태국어·중국어) 기기에서 앱이 정상 실행됩니다. 원격 URL 방식이라 앱 재빌드·스토어 재심사 없이 서버 배포만으로 적용했습니다.' },
      { id: 'chart-lifecycle', title: '차트 로딩 실패의 원인 분석과 해결', paragraphs: [
        '심볼을 빠르게 전환하면 차트 로딩이 완료되지 않는 문제가 있었습니다. 클라이언트 오류 로그와 서버·CDN 응답 시간을 대조해 네트워크가 아닌 클라이언트 쪽 문제로 범위를 좁혔습니다.',
        '심볼을 전환할 때마다 차트 위젯이 재마운트되는 구조에서, 이전 위젯의 콜백이 이미 해제된 iframe에 접근하는 상황을 재현했습니다. onChartReady가 도달하지 않아 로딩 상태가 끝나지 않았습니다.',
        '위젯을 거래 레이아웃에서 유지해 심볼 전환 시 재마운트를 없앴습니다. 위젯이 준비되기 전에 전환된 심볼은 최신 값만 보관했다가 준비 완료 시점에 반영하도록 변경했습니다.'
      ], result: '빠르게 심볼을 전환해도 마지막에 선택한 심볼로 차트가 정상 로딩됩니다. 위젯을 재마운트하지 않아 전환할 때마다 차트를 다시 초기화하지 않습니다.' }
    ],
  },
  {
    id: 'gobit', name: 'Gobit', category: 'work', company: '(주)다온소프트랩', companyId: 'daon', period: '2024.10 – 2025.12', role: '프론트엔드·백엔드 개발 담당 · 2인 팀', kind: '코인 정보·커뮤니티 플랫폼',
    description: '암호화폐 시세·차트·뉴스·커뮤니티와 모의투자 기능을 제공하는 코인 정보 플랫폼입니다. 2인 팀에서 Next.js 웹 클라이언트를 새로 구축하고 Node.js·Express API를 개발했습니다. Binance 시세를 수집해 Redis에 캐시하고 Socket.IO로 전달했으며, 회원·게시글 기능과 운영 도구를 구현했습니다.',
    summary: ['시세·차트·뉴스·커뮤니티 화면 구현 및 TradingView 차트 연동', 'Binance WebSocket·Redis·Socket.IO 기반 실시간 시세 처리', '커뮤니티 기능과 회원 인증·데이터 API 개발'],
    tasks: [
      ['웹 클라이언트', 'Next.js 15·React 19 기반 마켓·코인 상세 등 주요 화면 구현, TradingView 차트·tiptap 에디터 연동'],
      ['실시간 데이터', '시세는 Socket.IO, 나머지 조회 데이터는 SWR로 관리, Binance 시세 Redis 캐시 및 소켓 재연결·헬스체크 개선'],
      ['서비스 기능', '회원 인증·출석·레퍼럴·게시글·댓글·북마크 기능과 관련 API 개발'],
      ['운영 개선', 'SSR·이미지·폰트 최적화로 SEO·코인 상세 페이지 LCP 개선, coinlns → Gobit 리브랜딩 및 점검 모드·회원 탈퇴 구현']
    ],
    tech: ['TypeScript', 'Next.js', 'Tailwind CSS', 'Node.js', 'Express', 'MariaDB', 'Redis', 'Socket.IO'],
    techGroups: [['프론트엔드', ['TypeScript', 'Next.js', 'Tailwind CSS']], ['백엔드', ['Node.js', 'Express', 'MariaDB', 'Redis', 'Socket.IO']]],
    cases: [{ id: 'platform-migration', title: '레거시 플랫폼 통합과 Kubernetes 이전', period: '2026.07 – 2026.08 · 이전 후 유지보수', paragraphs: [
      'Gobit·모의투자 시스템·코인 매매 시그널 서비스가 Windows·Linux 서버 5대에 분산돼 있었습니다. 핵심 시세 수집기는 소스 코드 없이 .NET 바이너리만 남아 있었습니다. 유지보수와 배포를 이어갈 수 있도록 서비스를 모노레포로 통합하고 Kubernetes 환경으로 이전했습니다.'
    ], items: [
      '기존 바이너리의 동작과 데이터 형식을 분석해 수집기를 Node.js로 재작성했습니다. 실시간 시세·캔들·과거 데이터 수집 모드를 구현하고, 연결 분산 처리와 요청 속도 제한으로 WebSocket 연결 끊김에 대응했습니다.',
      '중계 계층을 정리해 데이터 흐름을 수집기 → Redis → 서버로 단순화했습니다.',
      '13개 서비스의 Dockerfile과 Kubernetes 매니페스트를 작성하고, Ingress 설정 및 DB 백업·캔들 보관 CronJob을 구성했습니다.',
      'GitHub Actions 빌드·배포를 자동화하고, 설정값을 Kubernetes Secret에서 불러오도록 변경했습니다.'
    ], result: '서버 5대에 흩어져 있던 13개 서비스를 하나의 Kubernetes 환경에서 배포·운영합니다. 소스 없이 바이너리만 남아 있던 수집기도 코드로 관리할 수 있게 됐습니다.' }]
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
    result: 'D.A.X와 회사 홈페이지가 같은 컴포넌트와 개발 규칙을 사용하게 됐습니다. 두 프로젝트에서 나온 요구사항은 라이브러리에 반영해 다시 배포했습니다.',
    tech: ['TypeScript', 'React', 'styled-components', 'Storybook'],
    techGroups: [['프론트엔드', ['TypeScript', 'React', 'styled-components', 'Storybook']]],
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
    tech: ['TypeScript', 'React', 'styled-components', 'TanStack Query', 'Zustand'],
    techGroups: [['프론트엔드', ['TypeScript', 'React', 'styled-components', 'TanStack Query', 'Zustand']]],
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
      ['반응형', 'CSS·JavaScript 브레이크포인트 통일, 화면 크기 변화는 CSS로 처리하고 모바일에서 불필요한 영역은 렌더링 제외']
    ],
    tech: ['TypeScript', 'React', 'styled-components', 'i18next'],
    techGroups: [['프론트엔드', ['TypeScript', 'React', 'styled-components', 'i18next']]]
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
    insight: 'MongoDB에 파일을 저장해야 하는 요구사항에 맞춰, 일반 문서의 16MB 제한에 걸리는 OBJ·영상 등을 GridFS의 청크 분할 저장으로 처리했습니다. 같은 관리자 계정을 사용하는 사내 서비스와는 MariaDB 기반 세션 저장소를 통해 인증 체계를 맞췄습니다.',
    tech: ['TypeScript', 'React', 'styled-components', 'Node.js', 'Express', 'MongoDB(GridFS)', 'MariaDB'],
    techGroups: [['프론트엔드', ['TypeScript', 'React', 'styled-components']], ['백엔드', ['Node.js', 'Express', 'MongoDB(GridFS)', 'MariaDB']]]
  },
];
