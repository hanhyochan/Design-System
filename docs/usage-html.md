# HTML·JSP 사용

빌드 결과 `packages/ui/dist/browser/`의 두 파일을 프로젝트 정적 경로에 복사합니다. 설치 패키지에서는 `node_modules/@h_designsystem/ui/dist/browser/`입니다.

```text
assets/
  design-system.config.js
  h-designsystem/
    h-designsystem.js
    styles.css
  icons/
    추가로 사용하는 SVG만
```

```html
<link rel="stylesheet" href="./assets/h-designsystem/styles.css">
<script type="module" src="./assets/design-system.config.js"></script>
<h-field label="이름" description="이름을 입력하세요.">
  <h-text-input name="name" required></h-text-input>
</h-field>
<h-button size='{"base":"large","mobile":"small"}'>확인</h-button>
```

```js
// assets/design-system.config.js
import { configureDesignSystem } from './h-designsystem/h-designsystem.js';
configureDesignSystem({ breakpoints: { mobile: 768, tablet: 992 } });
// import 완료 후 객체 속성이나 이벤트를 연결합니다.
document.querySelector('h-text-input').addEventListener('input', event => {
  console.log(event.currentTarget.value);
});
```

고정값만 쓰면 설정 호출 없이 h-designsystem.js만 module script로 연결합니다. React·Vue·Svelte 설치는 필요 없습니다. HTTP(S) 서버에서 제공하고 JS MIME을 JavaScript로 설정합니다. file:// 직접 열기는 사용하지 않습니다.

## JSP 경로

```jsp
<link rel="stylesheet" href="${pageContext.request.contextPath}/assets/h-designsystem/styles.css">
<script type="module" src="${pageContext.request.contextPath}/assets/design-system.config.js"></script>
<h-button>확인</h-button>
```

설정 JS의 상대 import는 그 JS 위치를 기준으로 하므로 서비스 컨텍스트 경로가 있어도 유지됩니다. JSP가 출력한 HTML에서 같은 웹 컴포넌트를 실행하며 JSP 전용 구현은 없습니다.

## 속성·아이콘

disabled·required·readonly·checked는 boolean 속성입니다. `disabled="false"`도 존재하므로 비활성입니다. false일 때는 속성을 제거하거나 `.disabled = false`로 지정합니다. 초기값은 value/checked 또는 default-value/default-checked, 현재값은 `.value`, `.checked`로 읽습니다.

```html
<h-button>
  <img slot="icon" src="./assets/icons/icon_search_medium_2.svg" alt="">
  검색
</h-button>
```

체크·비밀번호 눈·셀렉트 화살표 등 필수 SVG는 JS에 포함됩니다. 추가 아이콘만 Storybook에서 내려받습니다. 전체 394개를 브라우저 폴더에 복사하지 않습니다. 업데이트 시 JS·CSS를 같은 버전으로 교체하고 캐시 정책도 갱신합니다.
