// Supplementary implementation material from the original Notion portfolio.
// Kept separate so the resume and career document stay concise.
export const portfolioMaterial = {
  bitria: {
    source: 'https://www.notion.so/3faca024fcb88122ac88de9339a4cb44',
    sections: [
      {
        id: 'fsd', title: 'FSD 아키텍처와 화면 분기 기준',
        paragraphs: [
          '화면과 도메인이 늘어나도 의존성이 뒤섞이지 않도록 app → views → widgets → features → entities → shared 순의 단방향 규칙을 정했습니다. 조회(query)는 entity에, 변경(mutation)은 feature에 두어 각 레이어의 책임을 분리했습니다.',
          '웹과 앱의 라우트가 다르면 폴더를 분리했습니다. 화면 크기 차이가 작으면 prop으로 분기하고, 마크업 차이가 크면 디바이스별 파일을 두도록 기준을 정했습니다.'
        ], diagram: 'bitria-fsd', caption: 'FSD 레이어 간 의존 방향과 각 레이어의 책임'
      },
      {
        id: 'realtime', title: '실시간 데이터 전달과 구독 구조',
        paragraphs: [
          '거래소 WebSocket 데이터는 수집 서비스의 심볼 정규화와 Redis Pub/Sub을 거쳐 백엔드에 전달됩니다. 프론트엔드는 REST 스냅샷과 WebSocket 스트림으로 차트·호가·시세를 표시합니다.',
          '상위 레이아웃에서 시세 구독을 제거하고, 값을 표시하는 컴포넌트가 직접 구독하도록 변경했습니다. 화면의 마운트 상태를 유지하면서도 시세 갱신에 따른 리렌더링 전파 범위를 줄였습니다. 닫힌 오더북은 구독을 중지하고, 체결 내역은 구독을 유지하되 행에 memo를 적용했습니다.'
        ], diagram: 'bitria-realtime', caption: '실시간 데이터 전달 경로: 프론트엔드에서는 표시 컴포넌트별로 시세를 구독'
      },
      {
        id: 'chart-lifecycle', title: '차트 로딩 실패의 원인 분석과 해결',
        paragraphs: [
          '빠르게 심볼을 전환할 때 차트 로딩이 완료되지 않는 문제를 클라이언트 오류 로그와 서버·CDN 응답 시간으로 추적했습니다. 이전 위젯의 콜백이 이미 해제된 iframe에 접근하는 상황을 재현했습니다.',
          '심볼 전환마다 차트 위젯이 재마운트되면서 발생하는 생명주기 충돌을 줄이기 위해, 위젯을 거래 레이아웃에서 유지했습니다. 위젯이 준비되기 전에는 최신 심볼을 보관하고, 준비 상태에 따라 반영하도록 변경했습니다.'
        ], diagram: 'bitria-chart-lifecycle', caption: '수정 전: 심볼 전환 후 이전 위젯의 콜백이 해제된 iframe에 접근하는 흐름'
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
    source: 'https://www.notion.so/ee21c0264f7a440ab88ff4643901869c',
    sections: [{ id: 'architecture', title: '서비스 구성과 프론트엔드 담당 범위', paragraphs: [
      'React 프론트엔드는 웹 서버 API를 통해 프로젝트·라벨·모델 데이터를 조회하고 변경합니다. 백엔드와 AI 서버가 연결된 전체 구성에서 프론트엔드 화면과 API 연동을 담당했습니다.',
      'API 호출을 auth·project·class·datamanage·aiModel·operation 등 도메인별 서비스 모듈로 나눴습니다. 축소된 화면에서 그린 좌표는 원본 이미지 좌표로 변환해 저장하고, 다시 표시할 때 역변환했습니다. 양방향 변환은 useCoordinateTransform 훅으로 분리해 그리기·저장·재표시에 같은 규칙을 적용했습니다.'
    ], images: [{ src: 'dax-architecture.png', alt: 'D.A.X 전체 서비스 구성 — 담당 범위는 React 프론트엔드와 API 연동' }] }]
  },
  xrgis: {
    source: 'https://www.notion.so/a49f2628c6534bb4ad84ae93a2a287e3',
    images: [
      { src: 'xrgis-users.png', alt: 'XRGIS 사용자 관리 화면' },
      { src: 'xrgis-teams.png', alt: 'XRGIS 팀 관리 화면' },
      { src: 'xrgis-data.png', alt: 'XRGIS 팀별 데이터·파일 관리 화면: 대용량 파일 관리와 ZIP 다운로드 기능' }
    ]
  },

};
