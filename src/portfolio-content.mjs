// Supplementary implementation material from the original Notion portfolio.
// Kept separate so the resume and career document stay concise.
export const portfolioMaterial = {
  bitria: {
    overview: '외부 거래소 유동성을 연동해 현물·선물·마진 거래와 계정·자산 관리를 제공하는 암호화폐 거래 플랫폼입니다.',
    scope: '프론트엔드 전체를 초기 구축부터 개발하고, 인증·주문·자산·시세·KYC 등 백엔드 API 서버를 설계·개발했습니다. K3s 배포·운영을 맡았습니다.',
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
      ], result: '렌더 작업 5,192회 → 1,534회(70% 감소)', evidence: 'images',
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
    scope: '컴포넌트 24종과 패키징·npm 배포·사용 문서를 담당했습니다.',
    source: 'https://www.notion.so/9e63c15c084243cbb651e0c422457cf8',
    sections: [{ id: 'packaging', title: '컴포넌트 조합과 라이브러리 배포', paragraphs: [
      'Button·Input 같은 Atom을 조합해 FileInput 등의 Molecule을 구성했습니다. 컴포넌트의 Props와 상태별 UI를 Storybook에 문서화하고, 사용하는 프로젝트에서 같은 기준으로 확인하도록 구성했습니다. Playground에서는 값을 직접 바꿔 사용 예를 확인할 수 있습니다.',
      'vite-plugin-dts로 타입 선언을 함께 배포하고 React·React DOM은 peer dependency로 분리했습니다. D.A.X와 두잇 홈페이지에 적용하면서 발견한 요구사항을 라이브러리에 반영했습니다.'
    ] }],
    images: [
      { src: 'uikit-button.png', alt: 'Button 컴포넌트의 Storybook 예시' },
      { src: 'uikit-input.png', alt: 'Input 컴포넌트의 상태·Props 문서' },
      { src: 'uikit-file-input.png', alt: 'Input·Button·Label을 조합한 FileInput 컴포넌트' }
    ]
  },
  dax: {
    overview: '데이터 관리·라벨링·모델 학습·추론을 지원하는 AI 플랫폼입니다.',
    scope: '백엔드 개발자 1명과 협업해 프론트엔드를 담당했습니다.',
    source: 'https://www.notion.so/ee21c0264f7a440ab88ff4643901869c',
    sections: [{ id: 'architecture', title: '서비스 구성과 프론트엔드 담당 범위', paragraphs: [
      'React 프론트엔드는 웹 서버 API를 통해 프로젝트·라벨·모델 데이터를 조회하고 변경합니다. 백엔드와 AI 서버가 연결된 전체 구성에서 프론트엔드 화면과 API 연동을 담당했습니다.',
      'API 호출을 auth·project·class·datamanage·aiModel·operation 등 도메인별 서비스 모듈로 나눴습니다. 축소된 화면에서 그린 좌표는 원본 이미지 좌표로 변환해 저장하고, 다시 표시할 때 역변환했습니다. 양방향 변환은 useCoordinateTransform 훅으로 분리해 그리기·저장·재표시에 같은 규칙을 적용했습니다.'
    ], diagram: 'dax-architecture', caption: 'D.A.X 전체 서비스 구성 · 담당 범위는 React 프론트엔드와 API 연동' }]
  },
  xrgis: {
    overview: 'XR·GIS 원격 협업 서비스의 사용자·팀·파일 관리 백오피스입니다.',
    scope: 'React 화면과 Express API를 담당했습니다.',
    source: 'https://www.notion.so/a49f2628c6534bb4ad84ae93a2a287e3',
    sections: [{ id: 'files', title: '팀별 접근 권한과 대용량 파일 처리', paragraphs: [
      '파일 관리 API에서 사용자의 팀 소속에 따라 다운로드 권한을 확인합니다. 같은 관리자 계정을 사용하는 사내 서비스와는 MariaDB 기반 세션 저장소를 통해 인증 체계를 맞췄습니다.',
      'OBJ·영상 파일은 MongoDB GridFS로 청크를 나눠 저장하고, 선택한 파일은 archiver로 ZIP을 생성해 다운로드하도록 구현했습니다.'
    ] }],
    images: [
      { src: 'xrgis-users.png', alt: 'XR·GIS 사용자 관리 화면' },
      { src: 'xrgis-teams.png', alt: 'XR·GIS 팀 관리 화면' },
      { src: 'xrgis-data.png', alt: 'XR·GIS 팀별 파일 관리 화면 · 대용량 파일 관리와 ZIP 다운로드 기능' }
    ]
  },

  gobit: {
    overview: '암호화폐 시세·차트·뉴스·커뮤니티와 모의투자를 제공하는 플랫폼입니다.',
    scope: 'React·Next.js 웹 클라이언트, Express 백엔드 API 서버, 채팅·스케줄러 서버를 담당했습니다.',
    images: [
      { src: 'gobit-home.jpg', alt: '홈 화면', screen: true },
      { src: 'gobit-market.jpg', alt: '마켓 화면', screen: true },
      { src: 'gobit-coin-btc.jpg', alt: '코인 상세 화면', screen: true },
      { src: 'gobit-news.jpg', alt: '뉴스 화면', screen: true },
      { src: 'gobit-community.jpg', alt: '커뮤니티 화면', screen: true }
    ],
    sections: [{ id: 'data-flow', title: '실시간 시세와 일반 조회 데이터의 분리', paragraphs: [
      '서버가 Redis에 캐시한 시세를 Socket.IO로 받아 표시하고, 연결이 끊기면 재연결·헬스체크로 복구하도록 개선했습니다. 시세 이외의 조회 데이터는 SWR로 관리해 실시간 스트림과 API 조회의 역할을 구분했습니다.',
      'TradingView 차트를 연동하고 회원 인증·모의투자·랭킹·채팅 기능을 구현했습니다.'
    ] }, { id: 'deployment', title: '레거시 서비스의 통합·배포 구성', paragraphs: [
      '다른 개발자가 만든 레거시 서비스의 소스 코드가 유실돼, 핵심 시세 수집기는 .NET 바이너리만 남아 있었습니다. 서버 5대에 흩어진 Gobit·별도 모의투자 시스템·코인 매매 시그널 서비스를 모노레포로 통합했습니다. 수집기 → Redis → 서버로 데이터 전달 경로를 정리하고, 서비스별 Dockerfile과 Kubernetes 매니페스트를 구성했습니다.',
      'GitHub Actions로 빌드·배포를 자동화하고, 설정값은 Kubernetes Secret에서 불러오도록 구성했습니다. DB 백업과 캔들 보관 작업은 CronJob으로 분리했습니다.'
    ] }]
  },

  'doit-homepage': {
    overview: '사내 React 도입에 맞춰 기존 jQuery 기반 회사 홈페이지를 React로 전환하고 새로 단장한 프로젝트입니다.',
    scope: '메인·회사소개·서비스·인증·파트너 페이지를 담당했습니다.',
    images: [
      { src: 'doit-site-home.jpg', alt: '메인 화면', screen: true },
      { src: 'doit-site-company.jpg', alt: '회사소개 화면', screen: true },
      { src: 'doit-site-service.jpg', alt: '서비스 화면', screen: true },
      { src: 'doit-site-certification.jpg', alt: '인증 화면', screen: true }
    ],
    sections: [{ id: 'composition', title: '공통 UI와 페이지별 구성', paragraphs: [
      '색상·타이포·레이아웃 등의 공통 요소에 Doit UI Kit을 적용하고, 페이지별 콘텐츠를 React 컴포넌트로 구성했습니다.',
      '번역 리소스는 i18next의 페이지별 네임스페이스로 분리했습니다. CSS와 JavaScript에서 같은 브레이크포인트를 사용하고, 모바일에서 불필요한 영역은 렌더링하지 않도록 구성했습니다.'
    ] }]
  },

};
