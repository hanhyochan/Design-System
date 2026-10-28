# 0.1 → 0.2 변경

React 구현을 Lit와 공식 @lit/react 연결로 교체했습니다. 외형과 import 이름을 유지하지만 DOM·ref·이벤트는 변경됩니다. 기존 프로젝트는 재설치 전까지 설치한 버전을 계속 사용합니다.

| 항목 | 0.2 |
|---|---|
| React import | `import { Button } from '@h_designsystem/ui'` 유지 |
| 스타일 | `@h_designsystem/ui/styles.css` 유지. 내부 스타일은 Shadow DOM |
| DOM | h-button 등 웹 태그 안에 네이티브 요소 |
| ref | 웹 컴포넌트. focus(), value, checked, 읽기 전용 control 접근 |
| 이벤트 | 네이티브 이벤트. currentTarget.value/checked |
| DOM 탐색 | 외부 querySelector는 Shadow 내부에 닿지 않음. control 사용 |
| 외부 CSS | 내부 클래스 대신 호스트의 배경색·글자색 CSS 변수 |
| size | 단일값 고정, 객체는 프로젝트 기준으로 선택. 일반 기본 medium |
| typography | 기존 39개 이름과 객체 선택. _res 없음 |
| Text as | 허용된 HTML 태그만. 임의 React 컴포넌트 제외 |
| HTML·JSP | 브라우저 JS/CSS와 h- 태그로 동작까지 재사용 |

HTMLInputElement ref, React.ChangeEvent 타입을 웹 컴포넌트 타입으로 갱신합니다. Field 조합과 프로젝트 검증 기준을 유지합니다. 폼 제출·reset·required는 ElementInternals에 연결합니다.

Tokens·Foundation·UI를 같은 0.2.0으로 설치하고 lockfile도 관리합니다. 기존 서비스 CSS·폼·이벤트는 자동 변환되지 않습니다. 실제 화면·키보드·모바일·빌드를 확인한 뒤 배포합니다.
