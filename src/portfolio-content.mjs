// Supplementary implementation material from the original Notion portfolio.
// Kept separate so the resume and career document stay concise.
export const portfolioMaterial = {
  bitria: {
    overview: '실시간 시세·차트와 주문·계정·자산 관리를 제공하는 암호화폐 거래 플랫폼입니다.',
    scope: '2인 팀에서 프론트엔드 전체를 초기 구축부터 개발하고, 백엔드 API 개발에도 참여했습니다. 아래 자료는 화면·도메인 분리, 실시간 데이터 전달, 차트 생명주기와 멀티 플랫폼 구성을 설명합니다.',
    optimizations: {
      'mobile-performance': {
        description: '`shared/ui` 전체 163개 모듈을 하나의 청크로 묶던 배럴 import 136곳을 컴포넌트 정의 파일 직접 참조로 변경했습니다. 아래는 실제 변경한 import의 예시입니다.',
        examples: [
          { label: '변경 전 · 공통 배럴 참조', code: "import { SortButton } from '@/shared/ui';" },
          { label: '변경 후 · 정의 파일 직접 참조', code: "import { SortButton } from '@/shared/ui/navigation/sort-icon';" }
        ],
        caption: 'symbol-list-header.tsx 변경 예시'
      },
    },
    source: 'https://www.notion.so/3faca024fcb88122ac88de9339a4cb44',
    recoveryCases: [{
        id: 'app-resume', title: '앱 복귀 후 포지션·자산 정보 불일치 해결',
        paragraphs: [
          '앱 복귀 후 시세는 움직이지만 이미 청산된 포지션이 화면에 남는 프로덕션 장애가 있었습니다. 앱 복귀 이벤트로 복구되는 것은 시세 소켓뿐이었고, API 조회 캐시와 체결·잔고 알림 소켓은 복구되지 않았습니다.',
          '네이티브 `appStateChange`를 공통 진입점으로 사용했습니다. `focusManager.setFocused(isActive)`로 화면에서 사용 중인 stale 쿼리를 다시 조회하고, 시세·알림 소켓의 복귀 처리를 함께 실행합니다.',
          'API 재조회는 복귀 시점의 현재 상태를 확인하고, 소켓 재연결은 이후 변경을 계속 받는 역할입니다. 알림 소켓의 재연결 5회 제한을 제거하고, 이미 연결돼 있거나 로그인한 사용자가 없으면 추가 연결을 생략하도록 했습니다.'
        ], result: '앱 복귀 시 청산된 포지션이 남지 않고, 포지션·자산이 바로 최신 상태로 표시됩니다. 페이지 새로고침 없이 갱신이 필요한 쿼리만 다시 요청합니다.', diagram: 'bitria-app-resume', caption: '앱 복귀 이벤트에서 현재 상태 재조회와 실시간 연결 복구를 함께 실행하는 흐름'
      }, {
        id: 'app-locale-navigation', title: '비영어 기기에서 앱 대신 Safari가 열리던 문제 해결',
        paragraphs: [
          '일본어·스페인어·베트남어·태국어·중국어 기기에서 iOS 앱을 실행하면 앱 대신 Safari로 `bitria.com/th/m`이 열렸습니다.',
          'Capacitor iOS는 `WebViewDelegationHandler`에서 이동할 주소가 `server.url`로 시작하는지 문자열로 비교해 앱 내부 이동을 판정합니다. `server.url`은 `https://bitria.com/m`인데, next-intl의 `localePrefix: \'as-needed\'` 설정으로 기본 언어 외에는 `/th/m`처럼 언어 코드가 앞에 붙어 외부 링크로 판정됐습니다.',
          '앱 요청(User-Agent의 `BitriaMobile`)에 한해 미들웨어에서 언어 코드를 붙이는 리다이렉트를 같은 대상의 rewrite로 바꿨습니다. 브라우저 주소는 `/m/...`으로 유지하고 렌더링은 `/{locale}/m/...`에서 처리해 기기 언어를 그대로 표시합니다. 이미 언어 코드가 붙은 주소로 들어온 앱 요청은 코드 없는 주소로 리다이렉트합니다.'
        ], result: '영어 외 지원 언어 5개(일본어·스페인어·베트남어·태국어·중국어) 기기에서 앱이 정상 실행됩니다. 원격 URL 방식이라 앱 재빌드·스토어 재심사 없이 서버 배포만으로 적용했습니다.'
      }, {
        id: 'chart-lifecycle', title: '차트 로딩 실패의 원인 분석과 해결',
        paragraphs: [
          '빠르게 심볼을 전환할 때 차트 로딩이 완료되지 않는 문제를 클라이언트 오류 로그와 서버·CDN 응답 시간으로 추적했습니다. 이전 위젯의 콜백이 이미 해제된 iframe에 접근하는 상황을 재현했습니다.',
          '심볼 전환마다 차트 위젯이 재마운트되면서 발생하는 생명주기 충돌을 줄이기 위해, 위젯을 거래 레이아웃에서 유지했습니다. 위젯이 준비되기 전에는 최신 심볼을 보관하고, 준비 상태에 따라 반영하도록 변경했습니다.'
        ], result: '빠르게 심볼을 전환해도 마지막에 선택한 심볼로 차트가 정상 로딩됩니다. 위젯을 재마운트하지 않아 전환할 때마다 차트를 다시 초기화하지 않습니다.', diagram: 'bitria-chart-lifecycle', caption: '수정 전: 심볼 전환 후 이전 위젯의 콜백이 해제된 iframe에 접근하는 흐름'
      }],
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
          'Next.js·TypeScript 코드베이스를 웹, Capacitor 기반 iOS·Android 앱, Electron 데스크톱 앱으로 빌드했습니다. 모바일 앱을 스토어에 출시하고 푸시(APNs·FCM)·소셜 로그인·기기 식별 기능을 연결했습니다.',
          '앱 강제 업데이트 정책을 연동하고, Electron 앱의 API 요청을 식별하는 헤더를 추가했습니다.'
        ], diagram: 'bitria-platforms', caption: '웹·모바일·데스크톱 빌드와 네이티브 기능 연결 구조'
      }
    ]
  },
  'doit-uikit': {
    overview: 'D.A.X와 회사 홈페이지에 적용한 사내 공통 React UI 라이브러리입니다.',
    scope: '컴포넌트 24종과 패키징·npm 배포·사용 문서를 담당했습니다. 아래 Storybook 화면에서 컴포넌트별 Props와 상태별 UI를 확인할 수 있습니다.',
    source: 'https://www.notion.so/9e63c15c084243cbb651e0c422457cf8',
    sections: [{ id: 'packaging', title: '컴포넌트 조합과 라이브러리 배포', paragraphs: [
      'Button·Input 같은 Atom을 조합해 FileInput 등의 Molecule을 구성했습니다. 컴포넌트의 Props와 상태별 UI를 Storybook에 문서화하고, 사용하는 프로젝트에서 같은 기준으로 확인하도록 구성했습니다. Playground에서는 값을 직접 바꿔 사용 예를 확인할 수 있습니다.',
      'vite-plugin-dts로 타입 선언을 함께 배포하고 React·React DOM은 peer dependency로 분리했습니다. D.A.X와 회사 홈페이지에 적용하면서 발견한 요구사항을 라이브러리에 반영했습니다.'
    ] }],
    images: [
      { src: 'uikit-button.png', alt: 'Button 컴포넌트의 Storybook 예시' },
      { src: 'uikit-input.png', alt: 'Input 컴포넌트의 상태·Props 문서' },
      { src: 'uikit-file-input.png', alt: 'Input·Button·Label을 조합한 FileInput 컴포넌트' }
    ]
  },
  dax: {
    overview: '데이터 관리·라벨링·모델 학습·추론을 지원하는 AI 플랫폼입니다.',
    scope: '백엔드 개발자 1명과 협업해 프론트엔드를 담당했습니다. 서비스 구성도와 라벨링 화면을 중심으로 API 연동 범위와 좌표 변환 방식을 설명합니다.',
    source: 'https://www.notion.so/ee21c0264f7a440ab88ff4643901869c',
    sections: [{ id: 'architecture', title: '서비스 구성과 프론트엔드 담당 범위', paragraphs: [
      'React 프론트엔드는 웹 서버 API를 통해 프로젝트·라벨·모델 데이터를 조회하고 변경합니다. 백엔드와 AI 서버가 연결된 전체 구성에서 프론트엔드 화면과 API 연동을 담당했습니다.',
      'API 호출을 auth·project·class·datamanage·aiModel·operation 등 도메인별 서비스 모듈로 나눴습니다. 축소된 화면에서 그린 좌표는 원본 이미지 좌표로 변환해 저장하고, 다시 표시할 때 역변환했습니다. 양방향 변환은 useCoordinateTransform 훅으로 분리해 그리기·저장·재표시에 같은 규칙을 적용했습니다.'
    ], images: [{ src: 'dax-architecture.png', alt: 'D.A.X 전체 서비스 구성 — 담당 범위는 React 프론트엔드와 API 연동' }] }]
  },
  xrgis: {
    overview: 'XR·GIS 원격 협업 서비스의 사용자·팀·파일 관리 백오피스입니다.',
    scope: 'React 화면과 Express API를 담당했습니다. 아래 화면은 사용자·팀 관리와 팀별 파일 접근, 대용량 파일 처리 기능을 보여줍니다.',
    source: 'https://www.notion.so/a49f2628c6534bb4ad84ae93a2a287e3',
    sections: [{ id: 'files', title: '팀별 접근 권한과 대용량 파일 처리', paragraphs: [
      '파일 관리 API에서 사용자의 팀 소속에 따라 다운로드 권한을 확인합니다. 같은 관리자 계정을 사용하는 사내 서비스와는 MariaDB 기반 세션 저장소를 통해 인증 체계를 맞췄습니다.',
      'OBJ·영상 파일은 MongoDB GridFS로 청크를 나눠 저장하고, 선택한 파일은 archiver로 ZIP을 생성해 다운로드하도록 구현했습니다.'
    ] }],
    images: [
      { src: 'xrgis-users.png', alt: 'XRGIS 사용자 관리 화면' },
      { src: 'xrgis-teams.png', alt: 'XRGIS 팀 관리 화면' },
      { src: 'xrgis-data.png', alt: 'XRGIS 팀별 데이터·파일 관리 화면: 대용량 파일 관리와 ZIP 다운로드 기능' }
    ]
  },

  gobit: {
    overview: '암호화폐 시세·차트·뉴스·커뮤니티와 모의투자를 제공하는 플랫폼입니다.',
    scope: '2인 팀에서 Next.js 웹 클라이언트와 Node.js·Express API를 개발했습니다. 조회 데이터와 실시간 시세의 전달 경로, 레거시 서비스 통합 구조를 설명합니다.',
    sections: [{ id: 'data-flow', title: '실시간 시세와 일반 조회 데이터의 분리', paragraphs: [
      'Binance WebSocket으로 수집한 시세를 Redis에 캐시하고 Socket.IO로 웹 클라이언트에 전달했습니다. 시세 이외의 조회 데이터는 SWR로 관리해 실시간 스트림과 API 조회의 역할을 구분했습니다.',
      'TradingView 차트와 tiptap 에디터를 연동하고 회원 인증·게시글·댓글·북마크 기능을 구현했습니다.'
    ] }, { id: 'deployment', title: '레거시 서비스의 통합·배포 구성', paragraphs: [
      'Gobit·모의투자·코인 매매 시그널 서비스를 모노레포로 통합했습니다. 수집기 → Redis → 서버로 데이터 전달 경로를 정리하고, 서비스별 Dockerfile과 Kubernetes 매니페스트를 구성했습니다.',
      'GitHub Actions로 빌드·배포를 자동화하고, 설정값은 Kubernetes Secret에서 불러오도록 구성했습니다. DB 백업과 캔들 보관 작업은 CronJob으로 분리했습니다.'
    ] }]
  },

  'doit-homepage': {
    overview: '기존 jQuery 기반 회사 홈페이지를 React로 전환한 프로젝트입니다.',
    scope: '메인·회사소개·서비스·인증·파트너 페이지를 담당했습니다. 공통 UI 적용과 한국어·영어, 반응형 화면의 구성 방식을 설명합니다.',
    sections: [{ id: 'composition', title: '공통 UI와 페이지별 구성', paragraphs: [
      '색상·타이포·레이아웃 등의 공통 요소에 doit-uikit을 적용하고, 페이지별 콘텐츠를 React 컴포넌트로 구성했습니다.',
      '번역 리소스는 i18next의 페이지별 네임스페이스로 분리했습니다. CSS와 JavaScript에서 같은 브레이크포인트를 사용하고, 모바일에서 불필요한 영역은 렌더링하지 않도록 구성했습니다.'
    ] }]
  },

};
