// Supplementary implementation material from the original Notion portfolio.
// Kept separate so the resume and career document stay concise.
export const portfolioMaterial = {
  bitria: {
    overview: '외부 거래소 유동성을 연동해 현물·선물·마진 거래와 계정·자산 관리를 제공하는 암호화폐 거래 플랫폼입니다.',
    scope: '프론트엔드 전체를 초기 구축부터 개발하고, 인증·주문·자산·시세·KYC 등 백엔드 API 서버를 설계·개발했습니다. K3s로 배포·운영하고 있습니다.',
    source: 'https://www.notion.so/3faca024fcb88122ac88de9339a4cb44',
    // 웹 화면 (데스크톱 1440×900)
    webImages: [
      { src: 'bitria-web-home.jpg', alt: '웹 홈 화면', screen: true },
      { src: 'bitria-web-market.jpg', alt: '웹 마켓 화면', screen: true },
      { src: 'bitria-web-spot.jpg', alt: '웹 현물 거래 화면', screen: true },
      { src: 'bitria-web-mypage.jpg', alt: '웹 마이페이지 화면(이메일·UID 가림)', screen: true }
    ],
    images: [
      { src: 'bitria-app-home.jpg', alt: '앱 홈 화면', phone: true },
      { src: 'bitria-app-markets.jpg', alt: '앱 마켓 화면', phone: true },
      { src: 'bitria-app-trade.jpg', alt: '앱 현물 거래 화면', phone: true },
      { src: 'bitria-app-chart.jpg', alt: '앱 선물 차트 화면', phone: true }
    ],
    // 사례 근거 캡처 (같은 조건의 개선 전·후)
    caseImages: {
      'render-isolation': [
        { src: 'bitria-profiler-before.jpg', alt: '개선 전 · 시세 갱신 한 번에 레이아웃·주문 폼까지 리렌더', screen: true },
        { src: 'bitria-profiler-after.jpg', alt: '개선 후 · 같은 갱신에 값 표시 컴포넌트만 리렌더', screen: true }
      ],
      'build-optimization': [
        { src: 'bitria-devtools-before.jpg', alt: '개선 전 · 거래 화면 콜드 로드 전송 4.6MB · 요청 194건', screen: true },
        { src: 'bitria-devtools-after.jpg', alt: '개선 후 · 같은 조건에서 전송 2.5MB · 요청 187건', screen: true }
      ]
    },
    // 대표 사례의 변경 전후 코드
    codeExamples: {
      'render-isolation': {
        examples: [
          { label: '변경 전 · 화면 최상위에서 시세 구독', code: `const [snapshot, setSnapshot] = useState<Snapshot | null>(null);
useSnapshotSocket({
  symbols: symbolInfo ? [symbolInfo] : [],
  onUpdate: handleSnapshotUpdate,
});` },
          { label: '변경 후 · 표시 컴포넌트가 직접 구독', code: `// 실시간 값은 LiveSymbolStats 안에서 구독한다
<LiveSymbolStats
  fallbackPrice={symbolInfo?.snapshot?.price}
  fallbackChange={symbolInfo?.snapshot?.change24h}
/>` }
        ],
      }
    },
    featured: [
      { id: 'render-isolation', title: '비활성 화면의 불필요한 리렌더 개선', paragraphs: [
        '차트 사전 로딩을 위해 숨겨둔 차트 화면과 닫힌 오더북 드로어가 시세 갱신마다 렌더링되며 전체 렌더 시간의 64%를 차지하는 문제를 발견했습니다. 실시간 데이터 구독을 화면 최상위에서 실제 값을 쓰는 컴포넌트로 옮기고, 비활성 화면의 구독을 멈췄습니다.'
      ], result: '컴포넌트 렌더 횟수 5,192회 → 1,534회(70.5% 감소)', evidence: 'images',
        method: '측정 방법: 공개 시세 메시지 73개를 녹화해 개선 전후 버전에서 같은 12초 구간을 재생하고, React DevTools 훅(onCommitFiberRoot)으로 커밋마다 실제로 렌더된 컴포넌트를 집계했습니다. 개발 빌드, 모바일 앱 화면(390×844), 회차마다 새 브라우저로 전후 각 5회 실행한 중앙값입니다.',
        measure: { src: 'bitria-render-measure.jpg', alt: '측정 스크립트 실행 결과 · 렌더된 컴포넌트 합계와 컴포넌트별 렌더 횟수(5회 중앙값)' } },
      { id: 'chart-lifecycle', title: 'TradingView 차트 로딩 안정화', paragraphs: [
        '운영 로그로 실패를 추적해 캐시 버그와 심볼 전환 시 경쟁 상태를 원인으로 특정했습니다. 버그와 무관한 로딩 방식으로 전환하고 위젯을 유지한 채 심볼만 교체하도록 바꿨으며, 실패해도 재시도로 복구되도록 했습니다.'
      ], evidence: 'diagram' }
    ],
    // 사례 옆에 붙이는 구조도
    caseDiagrams: [
      { id: 'chart-lifecycle', diagram: 'bitria-chart-lifecycle', caption: '수정 전 심볼 전환 경쟁 상태 · 이전 위젯에 남아 있던 콜백이 제거된 iframe에 접근해 새 위젯이 준비 완료에 도달하지 못하는 흐름' },
      { id: 'app-resume', diagram: 'bitria-app-resume', caption: '앱 복귀 이벤트에서 현재 상태 재조회와 실시간 연결 복구를 함께 실행하는 흐름' }
    ],
    sections: [
      {
        id: 'fsd', title: 'FSD 아키텍처와 화면 분기 기준',
        paragraphs: [
          '화면과 도메인이 늘어나도 의존성이 뒤섞이지 않도록 app → views → widgets → features → entities → shared 순의 단방향 규칙을 정했습니다. 조회(query)는 entity에, 변경(mutation)은 feature에 두어 각 레이어의 책임을 분리했습니다.',
          '웹과 앱의 라우트가 다르면 폴더를 분리했습니다. 화면 크기 차이가 작으면 prop으로 분기하고, 마크업 차이가 크면 디바이스별 파일을 두도록 기준을 정했습니다.'
        ], diagram: 'bitria-fsd', caption: 'FSD 레이어 간 의존 방향과 각 레이어의 책임'
      },
      {
        id: 'realtime', title: '실시간 데이터 전달 구조',
        paragraphs: [
          '거래소 WebSocket 데이터는 수집 서비스의 심볼 정규화와 Redis Pub/Sub을 거쳐 백엔드에 전달됩니다. 프론트엔드는 REST 스냅샷과 WebSocket 스트림으로 차트·호가·시세를 표시합니다.'
        ], diagram: 'bitria-realtime', caption: '실시간 데이터 전달 경로'
      },
      {
        id: 'platforms', title: '단일 코드베이스의 멀티 플랫폼 대응',
        paragraphs: [
          '2인 팀에서 웹·iOS·Android·데스크톱을 빠르게 동시에 출시하기 위해, 각 플랫폼을 따로 만들지 않고 기존 Next.js 코드베이스를 그대로 쓰는 Capacitor와 Electron을 선택했습니다. 같은 코드베이스를 웹과 iOS·Android 앱, 데스크톱 앱으로 빌드했습니다. 모바일 앱을 스토어에 출시하고 푸시(APNs·FCM)·소셜 로그인·기기 식별 기능을 연결했습니다.',
          '앱 강제 업데이트 정책을 연동하고, Electron 앱의 API 요청을 식별하는 헤더를 추가했습니다.'
        ], diagram: 'bitria-platforms', caption: '웹·모바일·데스크톱 빌드와 네이티브 기능 연결 구조'
      }
    ]
  },
  'doit-uikit': {
    overview: 'D.A.X와 두잇 홈페이지에 적용한 사내 공통 React UI 라이브러리입니다.',
    scope: '컴포넌트 24종을 개발하고, 패키징과 npm 배포, 사용 문서 작성까지 진행했습니다.',
    source: 'https://www.notion.so/9e63c15c084243cbb651e0c422457cf8',
    // 구현 구조는 doit-uikit 저장소의 코드 기준 (src/lib·src/storybook 분리, vite.config의 라이브러리 빌드, styles/variants)
    sections: [{ id: 'packaging', title: '라이브러리 구조와 Props 규칙', paragraphs: [
      '배포할 라이브러리 코드와 Storybook 문서를 한 저장소 안에서 폴더로 분리하고, Vite 라이브러리 모드로 ESM·UMD 두 형식을 빌드했습니다. 컴포넌트는 Atom과 이를 조합한 Molecule 두 단계로 나눴습니다(예: Input·Button·Label → FileInput).',
      'size(small·medium·large)별 글자 크기·여백 규칙을 스타일 모듈 한 곳에 정의해 여러 컴포넌트가 같은 값을 쓰도록 했습니다. Props 타입에 적은 설명 주석을 Storybook이 읽어 Props 표를 자동으로 만들고, Playground에서 값을 바꿔 가며 확인할 수 있습니다.'
    ] }],
    images: [
      { src: 'uikit-button.png', alt: 'Button 컴포넌트의 Storybook 예시' },
      { src: 'uikit-input.png', alt: 'Input 컴포넌트의 상태·Props 문서' },
      { src: 'uikit-file-input.png', alt: 'Input·Button·Label을 조합한 FileInput 컴포넌트' }
    ]
  },
  dax: {
    overview: '데이터 관리·라벨링·모델 학습·추론을 지원하는 AI 플랫폼입니다.',
    scope: '백엔드 개발자 1명과 협업해 프론트엔드 전 화면을 개발했습니다.',
    source: 'https://www.notion.so/ee21c0264f7a440ab88ff4643901869c',
    // detailParagraphs·skipInDetail: 주요 업무·문제 해결 전문을 함께 싣는 문서(포트폴리오 상세·프로젝트 페이지)에서
    // 같은 내용이 두 번 나오지 않게, 그 문서에서만 쓰는 문단 / 그 문서에서는 빼는 구역
    // 계층·개수는 D.A.X 저장소의 client/src 기준 (services 7, hooks/API 7, stores 13, doit-uikit import 50개 파일)
    sections: [{ id: 'architecture', title: '화면·API 계층과 서비스 구성', detailParagraphs: [
      '컴포넌트를 atom → molecules → organisms → templates → pages 순으로 나누고, 공통 UI는 Doit UI Kit을 50개 파일에서 가져다 썼습니다.',
      'API 호출은 도메인별 서비스 모듈 7개에 두고, 그 위에 TanStack Query 훅을 도메인별로 만들어 컴포넌트는 훅만 사용합니다. 모달·검색 조건·페이지네이션 같은 화면 상태는 Zustand 스토어 13개로 분리했습니다.'
    ], paragraphs: [
      '컴포넌트를 atom → molecules → organisms → templates → pages 순으로 나누고, 공통 UI는 Doit UI Kit을 50개 파일에서 가져다 썼습니다. API 호출은 도메인별 서비스 모듈 7개에 두고, 그 위에 TanStack Query 훅을 도메인별로 만들어 컴포넌트는 훅만 사용합니다.',
      '축소된 화면에서 그린 좌표는 원본 이미지 좌표로 변환해 저장하고, 다시 표시할 때 역변환했습니다. 양방향 변환은 useCoordinateTransform 훅으로 분리해 그리기·저장·재표시에 같은 규칙을 적용했습니다.',
      'React 프론트엔드는 웹 서버 API를 통해 프로젝트·라벨·모델 데이터를 조회하고 변경합니다. 백엔드와 AI 서버가 연결된 전체 구성에서 프론트엔드 화면과 API 연동을 구현했습니다.'
    ], diagram: 'dax-architecture', caption: 'D.A.X 전체 서비스 구성 · 개발 범위는 React 프론트엔드와 API 연동' }]
  },
  xrgis: {
    overview: 'XR·GIS 원격 협업 서비스의 사용자·팀·파일 관리 백오피스입니다.',
    scope: 'React 화면과 Express 기반 API 서버를 개발했습니다.',
    source: 'https://www.notion.so/a49f2628c6534bb4ad84ae93a2a287e3',
    // 흐름은 XRGIS_Web 저장소의 server/src/routes/file.ts·controllers/file.ts 기준
    sections: [{ id: 'files', title: '파일 저장과 다운로드 흐름', paragraphs: [
      '업로드한 파일은 multer-gridfs-storage로 받아 바로 GridFS에 저장합니다. 영상과 OBJ를 별도 버킷으로 나누고 청크 크기는 15MB로 두었으며, 파일마다 팀 ID와 폴더 정보를 메타데이터로 붙여 팀 단위로 조회합니다.',
      '다운로드는 파일이 하나면 GridFS 스트림을 그대로 응답으로 보내고, 여러 개면 archiver가 각 스트림을 ZIP으로 묶어 응답에 바로 흘려보냅니다. 서버에 임시 파일을 만들지 않습니다.'
    ] }],
    images: [
      { src: 'xrgis-users.png', alt: 'XR·GIS 사용자 관리 화면' },
      { src: 'xrgis-teams.png', alt: 'XR·GIS 팀 관리 화면' },
      { src: 'xrgis-data.png', alt: 'XR·GIS 팀별 파일 관리 화면 · 대용량 파일 관리와 ZIP 다운로드 기능' }
    ]
  },

  gobit: {
    overview: '암호화폐 시세·차트·뉴스·커뮤니티와 모의투자를 제공하는 플랫폼입니다.',
    scope: 'React·Next.js 웹 클라이언트, Express 백엔드 API 서버, 채팅·스케줄러 서버를 개발했습니다.',
    images: [
      { src: 'gobit-home.jpg', alt: '홈 화면', screen: true },
      { src: 'gobit-market.jpg', alt: '마켓 화면', screen: true },
      { src: 'gobit-coin-btc.jpg', alt: '코인 상세 화면', screen: true },
      { src: 'gobit-news.jpg', alt: '뉴스 화면', screen: true },
      { src: 'gobit-community.jpg', alt: '커뮤니티 화면', screen: true }
    ],
    sections: [{ id: 'data-flow', title: '실시간 시세와 일반 조회 데이터의 분리', detailParagraphs: [
      '서버가 Redis에 캐시한 시세를 Socket.IO로 받아 표시하고, 연결이 끊기면 재연결·헬스체크로 복구하도록 개선했습니다. 시세 이외의 조회 데이터는 SWR로 관리해 실시간 스트림과 API 조회의 역할을 구분했습니다.'
    ], paragraphs: [
      '서버가 Redis에 캐시한 시세를 Socket.IO로 받아 표시하고, 연결이 끊기면 재연결·헬스체크로 복구하도록 개선했습니다. 시세 이외의 조회 데이터는 SWR로 관리해 실시간 스트림과 API 조회의 역할을 구분했습니다.',
      'TradingView 차트를 연동하고 회원 인증·모의투자·랭킹·채팅 기능을 구현했습니다.'
    ] }, { id: 'deployment', title: '레거시 서비스의 통합·배포 구성', skipInDetail: true, paragraphs: [
      '다른 개발자가 만든 레거시 서비스의 소스 코드가 유실돼, 핵심 시세 수집기는 .NET 바이너리만 남아 있었습니다. 서버 5대에 흩어진 Gobit·별도 모의투자 시스템·코인 매매 시그널 서비스를 모노레포로 통합했습니다. 수집기 → Redis → 서버로 데이터 전달 경로를 정리하고, 서비스별 Dockerfile과 Kubernetes 매니페스트를 구성했습니다.',
      'GitHub Actions로 빌드·배포를 자동화하고, 설정값은 Kubernetes Secret에서 불러오도록 구성했습니다. DB 백업과 캔들 보관 작업은 CronJob으로 분리했습니다.'
    ] }]
  },

  'doit-homepage': {
    overview: '사내 React 도입에 맞춰 기존 jQuery 기반 회사 홈페이지를 React로 전환하고 새로 단장한 프로젝트입니다.',
    images: [
      { src: 'doit-site-home.jpg', alt: '메인 화면', screen: true },
      { src: 'doit-site-company.jpg', alt: '회사소개 화면', screen: true },
      { src: 'doit-site-service.jpg', alt: '서비스 화면', screen: true },
      { src: 'doit-site-certification.jpg', alt: '인증 화면', screen: true }
    ],
    sections: [{ id: 'composition', title: '공통 UI와 페이지별 구성', skipInDetail: true, paragraphs: [
      '색상·타이포·레이아웃 등의 공통 요소에 Doit UI Kit을 적용하고, 페이지별 콘텐츠를 React 컴포넌트로 구성했습니다.',
      '번역 리소스는 i18next의 페이지별 네임스페이스로 분리했습니다. CSS와 JavaScript에서 같은 브레이크포인트를 사용하고, 모바일에서 불필요한 영역은 렌더링하지 않도록 구성했습니다.'
    ] }]
  },

};

// 포트폴리오(하나로 합친 문서) 전용 내용. 경력기술서가 문제 해결 과정을 글로 설명하므로,
// 여기서는 맡은 범위, 실제 화면, 구조와 기술을 고른 이유, 측정 결과·코드 같은 근거를 보여준다 (같은 문장을 되풀이하지 않는다).
// facts: 서비스·팀·맡은 범위 표 / design: 구조와 기술 선택 (불릿 + 구조도·코드) / evidence: 성능·문제 해결 근거 (제목 + 불릿 + 측정 화면·코드·흐름도)
// 코드는 각 저장소의 실제 코드를 옮겼다 (요약한 것은 이름표에 적는다)
export const portfolioDoc = {
  bitria: {
    facts: [
      ['서비스', '외부 거래소 유동성을 연동한 현물·선물·마진 암호화폐 거래 플랫폼'],
      ['팀', '개발자 2명 (프론트엔드·백엔드 각 1명)'],
      ['맡은 범위', '프론트엔드(웹·iOS·Android·데스크톱 앱), 인증·주문·자산·시세·KYC 등 백엔드 API, K3s 배포·운영']
    ],
    design: [
      {
        id: 'fsd', title: 'FSD 레이어 구조',
        points: [
          'app → views → widgets → features → entities → shared 순으로만 의존하고, 조회(query)는 entities, 변경(mutation)은 features에 둠',
          'views는 FSD의 Pages 레이어로, Next.js가 pages 폴더를 라우팅에 쓰기 때문에 이름을 바꿈 (루트 app/은 Next.js 라우팅 전용, src/app은 FSD App 레이어)',
          '웹·앱 라우트가 다르면 폴더를 나누고, 화면 크기 차이가 작으면 prop으로, 마크업 차이가 크면 디바이스별 파일로 분기'
        ],
        diagram: 'bitria-fsd', caption: 'FSD 레이어 간 의존 방향과 각 레이어의 책임'
      },
      {
        id: 'realtime', title: '실시간 데이터 전달 구조',
        points: [
          '거래소 WebSocket 데이터를 수집 서비스가 심볼 정규화 후 Redis Pub/Sub으로 백엔드에 전달',
          '프론트엔드는 REST 스냅샷과 WebSocket 스트림을 함께 받아 차트·호가·시세 표시'
        ],
        diagram: 'bitria-realtime', caption: '실시간 데이터 전달 경로'
      },
      {
        id: 'platforms', title: '하나의 코드베이스로 4개 플랫폼',
        points: [
          '개발자 2명이 웹·iOS·Android·데스크톱을 함께 내기 위해, 플랫폼별로 따로 만들지 않고 Next.js 코드베이스를 그대로 쓰는 Capacitor·Electron 선택',
          '모바일 앱은 스토어에 출시하고 푸시(APNs·FCM)·소셜 로그인·기기 식별 연결, 앱 강제 업데이트 정책과 Electron 요청 식별 헤더 추가'
        ],
        diagram: 'bitria-platforms', caption: '웹·모바일·데스크톱 빌드와 네이티브 기능 연결 구조'
      }
    ],
    evidence: [
      {
        id: 'render-isolation', title: '숨겨진 화면의 구독 중지: 컴포넌트 렌더 횟수 5,192 → 1,534회 (70.5% 감소)',
        points: [
          '같은 시세 메시지 73개를 12초간 재생하는 측정 스크립트로 개선 전후를 각 5회 비교',
          '프로파일러에서 개선 전에는 시세 한 번에 레이아웃·주문 폼까지, 개선 후에는 값을 표시하는 컴포넌트만 다시 렌더링',
          '코드는 화면 최상위의 시세 구독을 값을 표시하는 컴포넌트 안으로 옮긴 것'
        ],
        measure: true, caseImages: 'render-isolation', code: 'render-isolation',
        note: '개발 빌드, 모바일 화면(390×844), 전후 각 5회 중앙값입니다. 렌더 시간은 기기 부하에 따라 흔들려 렌더 횟수를 대표 지표로 썼습니다.'
      },
      {
        id: 'barrel', title: '배럴 import 정리: 모바일 홈 TBT 417 → 292.5ms (30% 감소)',
        points: [
          '공통 UI 배럴이 하위 배럴 10개를 다시 내보내, 버튼 하나만 가져와도 three.js 컴포넌트까지 163개 모듈이 한 청크로 묶이던 구조',
          '배럴 import 136곳을 정의 파일 직접 참조로 변경'
        ],
        examples: [
          { label: '변경 전 · 공통 UI 배럴 (src/shared/ui/index.ts)', code: `export * from './primitives';
export * from './media';   // three.js 기반 컴포넌트까지 함께 평가
// … 하위 배럴 10개

import { Button } from '@/shared/ui';` },
          { label: '변경 후 · 정의 파일 직접 참조 (136곳)', code: `import { Button } from '@/shared/ui/primitives/button';` }
        ],
        note: '측정 조건: 로컬 프로덕션 빌드 · 모바일 CPU 4배 감속 · 전후 각 5회 중앙값 / three.js 지연 로딩은 전후 동일'
      },
      {
        id: 'build-optimization', title: 'Turbopack 통일과 번들·폰트 정리: 빌드 시간 56%, 홈 JS 크기 27%, 초기 폰트 전송 95% 감소',
        points: [
          '빌드 74.2 → 32.8초, 홈 JS 752 → 550KB(gzip), 초기 폰트 2,048 → 111KB',
          '거래 화면 콜드 로드 기준 네트워크 전송 4.6MB → 2.5MB, 요청 194 → 187건 (아래 DevTools 합계 줄)'
        ],
        strips: 'build-optimization',
        note: '측정 조건: 빌드 시간 · 캐시 없는 프로덕션 빌드 3회 중앙값 / JS · 빌드 결과물 gzip / 폰트 · 홈 화면 기준'
      },
      {
        id: 'chart-lifecycle', title: '차트 로딩 실패: 심볼 전환 경쟁 상태',
        points: [
          '수정 전에는 이전 위젯에 남은 콜백이 제거된 iframe에 접근해, 새 위젯이 준비 완료에 도달하지 못함 (아래 흐름도)',
          '수정 후에는 위젯은 그대로 두고 심볼만 교체하고, 준비 전에 들어온 심볼 전환은 보관했다가 반영'
        ],
        diagram: 'chart-lifecycle'
      },
      {
        id: 'app-resume', title: '앱 복귀 시 재조회와 실시간 연결 복구',
        points: [
          '수정 전에는 복귀해도 쿼리를 다시 요청하지 않아, 다음 정기 조회(최대 2분)까지 이전 캐시가 화면에 남음',
          'WKWebView는 복귀 이벤트(visibilitychange)를 보내지 않아, Capacitor 앱 상태 이벤트를 기준으로 쿼리 재조회와 소켓 재연결을 함께 실행',
          '수정 후에는 복귀할 때마다 사용 중인 포지션·자산·주문 쿼리만 다시 요청 (페이지 새로고침 없음)'
        ],
        diagram: 'app-resume',
        examples: [
          { label: 'app/[locale]/m/layout.tsx · 앱 복귀 처리 (요약)', code: `App.addListener('appStateChange', async ({ isActive }) => {
  // 네이티브 복귀를 웹 focus 신호로 승격 — visibilitychange 가 안 오는 WKWebView 보정
  focusManager.setFocused(isActive);
  if (isActive) {
    marketSocket.handleForeground('appStateChange');
    notifySocket.handleForeground();
  } else {
    marketSocket.handleBackground();
  }
});` }
        ]
      }
    ]
  },
  gobit: {
    facts: [
      ['서비스', '암호화폐 시세·차트·뉴스·커뮤니티와 모의투자를 제공하는 코인 정보 플랫폼'],
      ['맡은 범위', 'React·Next.js 웹 클라이언트, Express 백엔드 API 서버, 채팅·스케줄러 서버']
    ],
    design: [
      {
        id: 'data-flow', title: '실시간 시세와 일반 조회 데이터의 분리',
        points: [
          '시세는 서버가 Redis에 캐시한 값을 Socket.IO로 받고, 연결이 끊기면 재연결·헬스체크로 복구',
          '시세 외 조회 데이터는 SWR로 관리해 실시간 스트림과 API 조회의 역할을 나눔'
        ]
      },
      {
        id: 'exchanges', title: '4개 거래소 시세를 하나의 형식으로',
        points: [
          '거래소마다 연결 하나를 가진 스토어를 두고, 거래소별 메시지를 공통 캔들 형식으로 변환해 TradingView 데이터 소스 하나로 처리',
          '코인 목록은 가상화 리스트(@tanstack/react-virtual)로 화면에 보이는 행의 심볼만 구독'
        ]
      },
      {
        id: 'nextjs', title: 'Next.js로 다시 만든 이유',
        points: [
          'React SPA의 prerender는 빌드 설정에 적은 고정 경로 26개만 처리해, 계속 늘어나는 게시글 상세를 담을 수 없었음',
          'Next.js 15 App Router로 코인 상세(/market/[symbol])·게시글 상세(/community/[id])를 서버 렌더링하고 페이지별 메타데이터 생성'
        ]
      },
      {
        id: 'deployment', title: '레거시 서비스 통합·배포 구성 (2026.07 – 2026.08, 유지보수 기간)',
        points: [
          '수집기 → Redis → 서버로 데이터 경로를 정리하고 서비스별 Dockerfile·Kubernetes 매니페스트 구성',
          'GitHub Actions로 빌드·배포 자동화, 설정값은 Kubernetes Secret, DB 백업·캔들 보관은 CronJob으로 분리'
        ]
      }
    ]
  },
  'doit-uikit': {
    facts: [
      ['서비스', 'D.A.X와 두잇 홈페이지에 적용한 사내 공통 React UI 라이브러리'],
      ['맡은 범위', '컴포넌트 24종 개발, 패키징·npm 배포, Storybook 문서화']
    ],
    design: [
      {
        id: 'packaging', title: '라이브러리 구조와 패키징',
        points: [
          '배포할 라이브러리 코드(src/lib)와 Storybook 문서(src/storybook)를 한 저장소에서 폴더로 분리',
          'Vite 라이브러리 모드로 ESM·UMD를 빌드하고, React는 번들에서 빼 peerDependencies로 둬 쓰는 앱의 React와 중복되지 않게 함',
          'Atom과 이를 조합한 Molecule 두 단계(예: Input·Button·Label → FileInput), size별 글자·여백 규칙은 스타일 모듈 한 곳에서 정의'
        ],
        examples: [
          { label: 'vite.config.ts · 라이브러리 빌드 설정 (요약)', code: `plugins: [react(), svgr(), tsconfigPaths(), dts({ include: 'src/lib/**/*' })],
build: {
  lib: { entry: path.resolve(__dirname, 'src/lib/index.ts'), name: 'doit-uikit', fileName: 'index' },
  rollupOptions: { external: ['react', 'react-dom'] },
},` }
        ]
      }
    ]
  },
  dax: {
    facts: [
      ['서비스', '데이터 관리·라벨링·모델 학습·추론을 지원하는 사내 AI 플랫폼'],
      ['팀', '백엔드 개발자 1명과 협업'],
      ['맡은 범위', '프론트엔드 전 화면과 API 연동']
    ],
    design: [
      {
        id: 'architecture', title: '화면·API 계층과 서비스 구성',
        points: [
          '컴포넌트를 atom → molecules → organisms → templates → pages로 나누고, 공통 UI는 Doit UI Kit을 50개 파일에서 사용',
          'API 호출은 도메인별 서비스 모듈 7개에 두고 그 위에 TanStack Query 훅을 만들어 컴포넌트는 훅만 사용, 화면 상태는 Zustand 스토어 13개로 분리'
        ],
        diagram: 'dax-architecture', caption: 'D.A.X 전체 서비스 구성 · 개발 범위는 React 프론트엔드와 API 연동'
      },
      {
        id: 'coordinates', title: '캔버스 라벨링의 화면 ↔ 원본 좌표 변환',
        points: [
          '저장할 때는 화면 좌표를 원본 좌표로, 저장된 라벨과 모델 예측 결과를 다시 그릴 때는 원본 좌표를 화면 좌표로 같은 훅에서 변환'
        ],
        examples: [
          { label: 'hooks/useCoordinateTransform.ts · 화면 ↔ 원본 좌표 변환 (요약)', code: `const calcToNaturalCoor = (coor: number, type: CoorType) =>
    Math.round(coor * (naturalImgSize[type] / renderImgSize[type]));
const calcToRenderCoor = (coor: number, type: CoorType) =>
    Math.round(coor * (renderImgSize[type] / naturalImgSize[type]));` }
        ]
      }
    ]
  },
  'doit-homepage': {
    facts: [
      ['서비스', '회사 홈페이지'],
      ['맡은 범위', 'jQuery로 작성돼 있던 회사 홈페이지를 React로 재작성']
    ],
    design: [
      {
        id: 'composition', title: '공통 UI와 페이지 구성',
        points: [
          '색상·타이포·레이아웃 등 공통 요소에 Doit UI Kit을 적용하고, 페이지별 콘텐츠를 React 컴포넌트로 구성',
          '번역 리소스는 i18next의 페이지별 네임스페이스로 분리, CSS와 JavaScript에서 같은 브레이크포인트를 쓰고 모바일에서 필요 없는 영역은 렌더링하지 않음'
        ]
      }
    ]
  },
  xrgis: {
    facts: [
      ['서비스', 'XR·GIS 원격 협업 서비스의 사용자·팀·파일 관리 백오피스'],
      ['맡은 범위', 'React 화면과 Express 기반 API 서버']
    ],
    design: [
      {
        id: 'files', title: '파일 저장과 다운로드 흐름',
        points: [
          '업로드 파일은 multer-gridfs-storage로 받아 바로 GridFS에 저장, 영상·OBJ는 버킷을 나누고 청크는 15MB, 파일마다 팀 ID·폴더 정보를 메타데이터로 붙여 팀 단위로 조회',
          '다운로드는 파일이 하나면 GridFS 스트림을 그대로, 여러 개면 archiver로 ZIP 스트림에 이어 응답해 서버에 임시 파일을 만들지 않음'
        ],
        examples: [
          { label: 'server/src/controllers/file.ts · 폴더별 ZIP 다운로드 (요약)', code: `const archive = archiver("zip", { zlib: { level: 9 } });
res.attachment(\`\${+new Date()}.zip\`);
archive.pipe(res);

for (const file of folderFiles) {
    const downloadStream = bucket.openDownloadStream(file._id);
    archive.append(downloadStream, { name: \`\${folderName}/\${file.filename}\` });
}
archive.finalize();` }
        ]
      }
    ]
  }
};
