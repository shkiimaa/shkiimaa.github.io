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
          '실시간 구독을 값을 표시하는 컴포넌트로 옮기고, 티커 데이터도 항목별로 구독하도록 분리했습니다. 보이지 않는 오더북과 닫힌 드로어는 구독을 중지하고, 체결 내역 행에는 memo를 적용해 갱신 범위를 줄였습니다.'
        ], diagram: 'bitria-realtime', caption: '실시간 데이터가 프론트엔드에 전달되는 흐름'
      },
      {
        id: 'chart-lifecycle', title: '차트 로딩 실패의 원인 분석과 해결',
        paragraphs: [
          '간헐적인 차트 로딩 실패를 클라이언트 오류 로그와 서버·CDN 응답 시간으로 추적했습니다. 심볼을 빠르게 바꾸면 이전 위젯의 콜백이 이미 해제된 iframe에 접근해 새 차트가 초기화되지 않는 상황을 재현했습니다.',
          '라우트가 바뀔 때 페이지 전체가 다시 마운트되는 구조가 원인이었습니다. 차트 뷰를 레이아웃에 두어 불필요한 재마운트를 막고, 위젯 초기화 중 심볼이 바뀌어도 최신 심볼을 적용하도록 수정했습니다.'
        ], diagram: 'bitria-chart-lifecycle', caption: '수정 전: 빠른 심볼 전환에서 발생한 위젯 생명주기 충돌'
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
      'Button·Input 같은 Atom을 조합해 FileInput 등의 Molecule을 구성했습니다. Storybook에서 Props·상태·사용 예를 확인하고 Playground로 직접 값을 바꿔볼 수 있도록 문서화했습니다.',
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
      '사내 표준 디렉토리 구조를 적용하고 API 호출을 auth·project·class·datamanage·aiModel·operation 등 도메인별 서비스 모듈로 나눴습니다. 원본·렌더 좌표 변환은 useCoordinateTransform 훅으로 분리해 그리기·저장·재표시에 같은 규칙을 적용했습니다.'
    ], images: [{ src: 'dax-architecture.png', alt: 'D.A.X 전체 서비스 구성 — 담당 범위는 React 프론트엔드와 API 연동' }] }]
  },
  xrgis: {
    source: 'https://www.notion.so/a49f2628c6534bb4ad84ae93a2a287e3',
    images: [
      { src: 'xrgis-users.png', alt: 'XRGIS 사용자 관리 화면' },
      { src: 'xrgis-teams.png', alt: 'XRGIS 팀 관리 화면' },
      { src: 'xrgis-data.png', alt: 'XRGIS 팀별 데이터·파일 관리 화면' }
    ]
  },

};
