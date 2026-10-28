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

## 필요한 태그만 연결

전체 단일 파일 대신 개별 모듈을 사용할 수 있습니다. `browser/` 안의 `elements/`, `chunks/`, `config.js`, `styles.css`, `LICENSE.txt`를 같은 구조로 복사합니다. 서버에 파일이 있어도 브라우저는 실제 import한 모듈과 그 의존 파일만 요청합니다. `elements/button.js` 하나만 따로 복사하면 공통 모듈을 찾을 수 없으므로 폴더 구조를 유지해야 합니다.

```html
<link rel="stylesheet" href="./assets/h-designsystem/styles.css">
<script type="module">
  import './assets/h-designsystem/elements/button.js';
  import './assets/h-designsystem/elements/field.js';
  import './assets/h-designsystem/elements/text-input.js';
  import { configureDesignSystem } from './assets/h-designsystem/config.js';
  configureDesignSystem({ breakpoints: { mobile: 768, tablet: 992 } });
</script>
<h-field label="이름"><h-text-input name="name"></h-text-input></h-field>
<h-button size='{"base":"large","mobile":"small"}'>확인</h-button>
```

공유 Lit 실행 코드와 공통 스타일은 `chunks/`에서 재사용하며 각 컴포넌트 파일에 반복 내장하지 않습니다. 고정 크기만 쓰면 config.js import와 설정 호출은 생략합니다. 탭 조합은 `tabs.js`, `tab-list.js`, `tab.js`, `tab-panel.js`를 모두 연결합니다. 전체 단일 파일과 개별 모듈 중 한 방식을 선택해 사용하세요. 업데이트할 때는 참조하는 청크 이름도 바뀔 수 있으므로 선택 모듈과 chunks를 같은 빌드 결과로 함께 교체합니다.

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
