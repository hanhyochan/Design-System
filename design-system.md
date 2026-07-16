# 디자인 시스템 보일러플레이트

이 문서는 디렉터리 위치나 프레임워크는 강제하지 않지만 전역 CSS는 `foundation.css`, `reset.css`, `utilities.css`, `main.css`, `sub.css`의 5개 책임 파일로 분리한다. 프로젝트를 시작하거나 기존 프로젝트의 CSS를 정리할 때, 이 문서 하나로 전역 Foundation, Reset, 유틸리티, 클래스명, 컴포넌트 작성 원칙을 동일하게 적용하는 것이 목적이다.

## 1. 적용 원칙

1. 먼저 프로젝트의 기존 Reset, 전역 CSS, 토큰, 컴포넌트, 유틸리티, JavaScript 셀렉터를 조사한다.
2. 기존 전역 규칙이 있으면 이 문서를 통째로 덮어쓰지 않고 충돌 항목을 비교한 후 필요한 항목만 병합한다.
3. 신규 프로젝트라면 2.1장의 5개 CSS 파일을 먼저 만들고 Foundation, Reset, Utilities, 해당 페이지 스타일 순으로 적용한다.
4. 모든 색상, 타이포그래피, 간격, 크기, 반경, 보더, 그림자, 모션 값은 Foundation 토큰에서 가져온다.
5. 토큰에 없는 값을 임의로 만들지 않는다. 새로운 값이 반드시 필요하면 먼저 Foundation 토큰으로 등록하고 대응 유틸리티를 만든다. 단, font-size 토큰은 타이포그래피 조합 클래스, breakpoint 토큰은 media query 기준으로 사용한다.
6. 신규 퍼블리싱 스타일에서는 `margin`을 사용하지 않는다. 이 문서의 Reset에 포함된 `margin: 0`만 예외다.
7. 요소 사이의 간격은 부모의 `gap`과 `padding`으로 처리한다.
8. 복사 가능한 CSS 예시는 완성형 단일 클래스로 제공할 수 있지만, 실제 프로젝트 내부 구현은 CSS Modules, SCSS, CSS-in-JS, 공통 컴포넌트 등 프로젝트 방식에 맞게 나눌 수 있다.
9. 구현 방식과 무관하게 최종 computed style, 접근성, 반응형 결과는 동일해야 한다.
10. Checkbox, Radio, Toggle의 외형은 Reset에서 지정하지 않고 프로젝트별 독립 컴포넌트로 설계한다.
11. 신규 spacing, 컴포넌트 높이·너비·padding과 breakpoint 값은 4px 배수로 설계한다. 타이포그래피는 의미 계층을 우선하며 13px 계층은 사용하지 않는다.

## 2. 기존 프로젝트 적용 순서

- 활성 CSS와 템플릿 파일을 찾는다.
- 백업, vendor, 빌드 산출물은 활성 사용 근거가 없으면 기준에서 제외한다.
- 전체 클래스명과 사용처를 추출한다.
- `querySelector`, `querySelectorAll`, `closest`, `matches`, `classList` 사용처를 확인한다.
- 기존 클래스명에서 표준 클래스명으로 가는 매핑표를 만든다.
- Reset 중복, 토큰 중복, 유틸 중복, 미정의 CSS 변수를 확인한다.
- 클래스 변경은 CSS와 마크업, JavaScript, 테스트를 한 단위로 처리한다.
- 서버 배포본이나 별도 빌드 산출물이 있으면 소스와 같은 상태인지 확인한다.

## 2.1 필수 CSS 파일 구조

신규 프로젝트는 작업을 시작할 때 아래 5개 CSS 파일을 먼저 만든다. 파일이 위치할 디렉터리는 프로젝트 구조에 맞게 선택하지만 파일의 책임은 바꾸거나 합치지 않는다.

| 파일 | 허용되는 내용 | 금지되는 내용 |
| --- | --- | --- |
| `foundation.css` | `:root`에 한 번 선언하는 모든 Foundation 토큰 | Reset, 유틸리티 클래스, 컴포넌트, 페이지 선택자 |
| `reset.css` | 3장의 전역 Reset 코드와 브라우저 기본값 정규화 | 토큰 선언, 컴포넌트 외형, Checkbox/Radio/Toggle 외형, 페이지 스타일 |
| `utilities.css` | 4.4장의 타이포그래피 조합 클래스, 5장의 토큰 대응 유틸리티, 6장의 공통 레이아웃 유틸리티 | 전역 토큰 재정의, Reset, 특정 화면·섹션·컴포넌트 전용 스타일 |
| `main.css` | 메인 화면에서만 사용하는 레이아웃, 섹션과 메인 전용 컴포넌트 스타일 | 세부 페이지 스타일, Foundation 토큰, Reset, 범용 유틸리티 |
| `sub.css` | 세부 페이지에서만 사용하는 레이아웃, 섹션과 세부 페이지 전용 컴포넌트 스타일 | 메인 화면 스타일, Foundation 토큰, Reset, 범용 유틸리티 |

- 초기 세팅 단계에서 페이지 스타일이 아직 없어도 `main.css`와 `sub.css`를 빈 파일로 생성해 책임 경계를 먼저 만든다.
- 전역 로드 순서는 `foundation.css → reset.css → utilities.css → 해당 페이지 CSS`다. 메인 화면은 마지막에 `main.css`, 세부 페이지는 마지막에 `sub.css`를 로드한다.
- `reset.css`가 Foundation 변수를 사용하므로 반드시 `foundation.css` 뒤에 로드한다.
- 메인 화면에서 `sub.css`, 세부 페이지에서 `main.css`를 불필요하게 로드하지 않는다. 하나의 번들로 합쳐야 하는 환경에서는 페이지 루트 범위나 라우트 단위 import로 소유 범위를 유지한다.
- 메인과 세부 페이지가 함께 사용하는 실제 공통 컴포넌트는 프로젝트의 컴포넌트 전용 CSS, CSS Modules, scoped style 또는 CSS-in-JS에 둔다. 이를 `utilities.css`에 범용 유틸리티인 것처럼 넣지 않는다.
- 글꼴 파일 로딩은 프로젝트의 HTML, 프레임워크 폰트 로더 또는 전역 진입점이 담당한다. 토큰이 아닌 `@font-face`를 `foundation.css`에 섞지 않는다.
- 기존 프로젝트에 다른 파일명이 이미 있으면 즉시 중복 파일을 만들지 않는다. 기존 파일의 책임을 조사한 뒤 위 5개 역할로 이동·이름 변경할 계획을 세우고 CSS import, 템플릿과 빌드 진입점을 함께 수정한다.

## 3. 전역 Reset

아래 Reset은 신규 프로젝트의 `reset.css`에 그대로 넣는 기본값이다. `reset.css`에는 아래 코드 외의 토큰·유틸리티·컴포넌트·페이지 스타일을 넣지 않는다. 기존 Reset이 있는 프로젝트에서는 전체를 복사하지 말고 선택적으로 병합한다. Checkbox, Radio, Toggle의 appearance, 크기, 보더, 배경, 아이콘과 상태 스타일은 Reset에 포함하지 않는다.

```css
*,
*::before,
*::after {
    font-size: inherit;
    line-height: inherit;
    color: inherit;
    font-family: inherit;
    box-sizing: border-box;
}

html {
    font-size: var(--ds-font-size-body-1);
}

body {
    margin: 0;
    font-family: var(--font-sans);
    word-break: keep-all;
    color: var(--color-black);
    line-height: var(--ds-line-height-relaxed);
}

a {
    color: inherit;
    text-decoration: none;
}

img {
    display: block;
    max-width: 100%;
}

button,
input,
textarea,
select {
    font: inherit;
    color: inherit;
}

button {
    background: none;
    border: 0;
    cursor: pointer;
}

ul,
ol {
    margin: 0;
    padding: 0;
    list-style: none;
}

p,
h1,
h2,
h3,
h4,
h5,
h6 {
    margin: 0;
}
```

## 4. Foundation 토큰

### 4.1 토큰 종류

| 종류 | 역할 |
| --- | --- |
| Font | 기본 글꼴과 폰트 크기·굵기 |
| Atomic Color | 원시 색상 팔레트 |
| Semantic Color | 배경, 라벨, 라인, 상태 등 의미 기반 색상 |
| Opacity | 공통 불투명도 |
| Spacing | padding과 gap |
| Size | 컴포넌트와 아이콘의 고정 크기 |
| Radius | 모서리 반경 |
| Border | 보더 두께 |
| Shadow | 그림자 프리셋 |
| Viewport | 동적 화면 크기 |
| Container | 콘텐츠 최대 너비 |
| Focus | 키보드 포커스 링 |
| Motion | 지속 시간과 easing |
| Breakpoint | 반응형 전환 기준 |
| Z-index | 레이어 순서 |

브랜드를 적용할 때 고정 유채색 Atomic 팔레트를 사용하지 말고 `--color-brand-primary`, `--color-brand-secondary`, `--color-brand-on-primary`, `--color-brand-on-secondary`를 사용자 입력 색상에 맞게 생성한다. `--color-brand-primary`는 사용자가 입력하는 필수 메인 색상, `--color-brand-secondary`는 선택 서브 색상의 단일 진입점으로 사용한다.

### 4.2 컬러 토큰 범위

- 프로젝트 초기 Foundation에는 아래 `초기 Foundation 필수 컬러 세트`를 반드시 선언한다. Blue, Red, Orange, Yellow, Green, Cyan, Violet, Purple, Pink 등 미리 정해진 유채색 Atomic 팔레트는 선언하지 않고 사용자 메인·서브 색상으로 생성한 팔레트만 추가한다.
- 변수명에 특정 프로젝트명, 서비스명 또는 브랜드 접미사가 포함된 컬러 토큰은 공통 Foundation에서 제외한다.
- `--color-brand-primary`처럼 특정 브랜드명이 없는 역할 기반 별칭은 유지하며, 프로젝트 시작 시 Atomic Color에 다시 매핑한다.
- 컬러 토큰은 아래 전체 토큰 CSS의 `컬러 토큰` 블록에 실제 값으로 선언한다. 컴포넌트는 가능한 한 Semantic Color 또는 역할 기반 별칭을 사용한다.
- 실제 화면의 배경, 텍스트, 보더 등에 어떤 컬러 토큰을 매핑할지는 프로젝트마다 결정한다. 공통 문서에서 특정 화면 역할을 하나의 색상으로 고정하지 않는다.
- 컬러 토큰 적용 후 미정의 참조, 중복 선언, 미사용 여부를 검사한다. 전체 팔레트를 제공하기 위한 미사용 Atomic Color는 허용하되, 용도가 없는 Semantic Color와 프로젝트 전용 별칭은 제거하거나 사용 근거를 기록한다.
- 불투명도는 `--opacity-*` 숫자 토큰으로 관리한다. 투명한 배경·보더·그림자는 `rgb(... / alpha)` 값이 실제로 포함된 Semantic Color를 별도로 사용하며, 불투명한 색상을 이름만 다르게 복제한 `--color-opacity-*` 토큰은 만들지 않는다.

현재 컬러 블록은 고정 비브랜드 컬러 토큰 105개와 사용자 색상용 공통 역할 토큰 17개를 포함한다.

#### 초기 Foundation 필수 컬러 세트

- 이 문서를 적용해 새 프로젝트의 Foundation을 세팅할 때 아래 고정 토큰 97개를 사용 여부와 관계없이 전역 컬러 토큰에 먼저 생성한다.
- 필수 세트는 `designSystem-v2.html`의 Color Atomic 중 Common 2개와 Neutral/Cool Neutral 40개, Color Sementic에 실제 문서화된 비브랜드 Semantic Color 55개로 구성한다.
- Common은 Semantic Color의 `var(...)` 참조를 해결하기 위한 필수 의존성이다. `--color-common-0`, `--color-common-100`을 함께 선언한다.
- `_artkorealab`, `_newstant`처럼 프로젝트·서비스·브랜드 식별자가 붙은 토큰과 `--color-newsroll-*` 같은 전용 팔레트는 초기 공통 세트에 포함하지 않는다.
- Neutral과 Cool Neutral은 사용자 브랜드 색상으로부터 보간하지 않는다. 아래 전체 토큰 CSS에 기록된 `designSystem-v2.html` 원본 값을 그대로 복사해 생성한다.
- 필수 컬러 토큰마다 `.color_*`, `.bg_*`, `.border_color_*` 세 유틸리티를 개별 CSS 클래스로 함께 생성한다. 필수 세트 97개 기준 총 291개의 색상 유틸리티 연결이 존재해야 한다.
- 기존 프로젝트에 같은 역할의 컬러 토큰이 있으면 값과 사용처를 비교해 기존 체계를 우선 매핑한다. 같은 값을 다른 이름으로 중복 선언하지 않되 아래 필수 역할이 누락되지 않게 한다.

| Atomic 그룹 | 필수 단계 |
| --- | --- |
| Common | `0`, `100` |
| Neutral | `0`, `5`, `10`, `15`, `20`, `22`, `30`, `40`, `50`, `60`, `70`, `80`, `90`, `95`, `97`, `99`, `100` |
| Cool Neutral | `0`, `5`, `7`, `10`, `15`, `17`, `20`, `22`, `23`, `25`, `30`, `40`, `50`, `60`, `70`, `80`, `90`, `95`, `96`, `97`, `98`, `99`, `100` |

Neutral과 Cool Neutral의 `95`, `97`, `99` 단계는 생략할 수 없다. Cool Neutral은 원본 체계에 있는 `96`, `98`도 함께 생성한다.

| Semantic 그룹 | 필수 토큰 |
| --- | --- |
| Status | `--color-status-positive`, `--color-status-cautionary`, `--color-status-negative` |
| Accent Background | `--color-accent-background-red-orange`, `--color-accent-background-lime`, `--color-accent-background-cyan`, `--color-accent-background-light-blue`, `--color-accent-background-violet`, `--color-accent-background-purple`, `--color-accent-background-pink` |
| Accent Foreground | `--color-accent-foreground-red`, `--color-accent-foreground-red-orange`, `--color-accent-foreground-orange`, `--color-accent-foreground-green`, `--color-accent-foreground-lime`, `--color-accent-foreground-cyan`, `--color-accent-foreground-light-blue`, `--color-accent-foreground-blue`, `--color-accent-foreground-violet`, `--color-accent-foreground-purple`, `--color-accent-foreground-pink` |
| Background | `--color-background-normal-normal`, `--color-background-normal-alternative`, `--color-background-elevated-normal`, `--color-background-elevated-alternative`, `--color-background-transparent-normal`, `--color-background-transparent-alternative` |
| Label | `--color-label-normal`, `--color-label-strong`, `--color-label-neutral`, `--color-label-alternative`, `--color-label-assistive`, `--color-label-disable` |
| Line Normal | `--color-line-normal-normal`, `--color-line-normal-neutral`, `--color-line-normal-alternative`, `--color-line-normal-strong` |
| Line Solid | `--color-line-solid-normal`, `--color-line-solid-neutral`, `--color-line-solid-alternative`, `--color-line-solid-strong`, `--color-line-solid-20`, `--color-line-solid-10`, `--color-line-solid-0` |
| Fill | `--color-fill-normal`, `--color-fill-strong`, `--color-fill-alternative` |
| Interaction | `--color-interaction-inactive`, `--color-interaction-disable` |
| Static | `--color-static-white`, `--color-static-black` |
| Inverse | `--color-inverse-primary`, `--color-inverse-background`, `--color-inverse-label` |
| Material | `--color-material-dimmer` |

위 Semantic 토큰의 실제 값은 아래 `전체 토큰 CSS`의 동일 변수 선언을 단일 원본으로 사용한다. 프로젝트 초기화 과정에서 임의의 다른 색으로 대체하거나 브랜드 색상 단계 생성 규칙을 적용하지 않는다.

#### 메인·서브 색상 입력과 자동 연결

- 이 문서를 프로젝트에 적용할 때 색상이 요구사항에 이미 명시되어 있지 않다면 구현 전에 `메인 색상(필수)`과 `서브 색상(선택, 없으면 없음)`을 사용자에게 먼저 묻는다. 메인 색상 답변 없이 임의의 브랜드 색상으로 구현을 확정하지 않는다.
- 사용자가 프로젝트의 메인 색상을 HEX 또는 RGB 코드로 입력하면 해당 값을 `--color-brand-primary-50`에 그대로 설정하고 `--color-brand-primary`는 해당 50 단계를 참조한다.
- 사용자가 서브 색상을 제공하지 않으면 `--color-brand-secondary`만 `--color-brand-primary`를 참조한다. 이때 `--color-brand-secondary-0~100` 단계 토큰과 단계별 secondary 유틸리티는 만들지 않는다.
- 사용자가 서브 색상으로 Neutral 또는 Cool Neutral을 지정하거나 입력값이 각각의 50 단계인 `#737373`, `#70737c`와 정확히 일치하면 새 secondary 팔레트를 만들지 않는다. `--color-brand-secondary`만 각각 `--color-neutral-50` 또는 `--color-cool-neutral-50`을 참조하고, 단계 표현에는 기존 Neutral 또는 Cool Neutral 토큰과 `.color_*`, `.bg_*`, `.border_color_*` 유틸리티를 그대로 사용한다.
- 사용자가 제공한 서브 색상이 Neutral·Cool Neutral이 아닌 새로운 색상일 때만 입력값을 `--color-brand-secondary-50`에 그대로 설정하고 표준 13단계 secondary 팔레트와 단계별 유틸리티를 생성한다. 이때 `--color-brand-secondary`는 `--color-brand-secondary-50`을 참조한다.
- 허용 입력 예시는 `#0066ff`, `#06f`, `rgb(0, 102, 255)`, `rgb(0 102 255)`이다. 유효한 CSS 색상인지 확인한 뒤 사용하며 임의로 다른 색상으로 보정하지 않는다.
- 메인 또는 서브 색상의 50 단계가 기존 Atomic Color와 정확히 같고 해당 색상군의 전체 단계가 이미 있으면 새 값을 중복 선언하지 않고 기존 Atomic Color 단계들을 `var(...)`로 연결한다. 특히 서브 색상이 Neutral 또는 Cool Neutral이면 번호가 붙은 secondary 별칭도 만들지 않고 기존 색상군 이름을 그대로 사용한다. 일치하는 색상군이 없으면 아래 생성 규칙으로 실제 값을 만든다.
- 메인 색상 입력 시 기존 `.color_brand_primary`, `.bg_brand_primary`, `.border_color_brand_primary`를 그대로 유지한다. 세 유틸리티가 모두 `--color-brand-primary`를 참조하므로 변수 값 한 곳만 변경하면 `color`, `background-color`, `border-color`에 같은 색상이 자동 반영된다.
- 서브 색상 입력 시 기존 `.color_brand_secondary`, `.bg_brand_secondary`, `.border_color_brand_secondary`를 그대로 유지한다. 세 유틸리티가 모두 `--color-brand-secondary`를 참조하므로 메인 색상과 동일한 방식으로 자동 반영된다.
- 프로젝트 초기 세팅 시 primary의 글자색·배경색·보더색 유틸리티는 복사 가능한 개별 CSS 클래스로 반드시 생성한다. 단계 없는 secondary 유틸리티 3종은 항상 유지하고, 번호가 붙은 secondary 유틸리티는 새로운 비중립 서브 팔레트를 생성할 때만 추가한다. Neutral 또는 Cool Neutral 서브 색상은 기존 단계별 유틸리티를 재사용한다.
- 여기서 자동 연결은 CSS custom property 전파를 뜻한다. 런타임에 CSS 클래스 문자열을 동적으로 생성하거나 SCSS 반복문에 의존하지 않는다.
- 메인 색상을 배경으로 사용하는 컴포넌트는 `--color-brand-on-primary`, 서브 색상을 배경으로 사용하는 컴포넌트는 `--color-brand-on-secondary`를 전경색으로 사용한다. 기존 흰색과 검정 계열 토큰 중 각각 WCAG 대비를 충족하는 값을 선택하고 실제 화면에서 검수한다.
- primary는 항상 전체 색상 단계를 생성한다. secondary는 사용자가 새로운 비중립 색상을 제공한 경우에만 같은 방식으로 생성한다. 미입력 시에는 단계 없는 역할 토큰만 primary를 참조하고, Neutral 또는 Cool Neutral 선택 시에는 단계 없는 역할 토큰만 기존 50 단계를 참조한다. Accent와 추가 색상군은 사용자가 별도로 제공하거나 요청하지 않으면 생성하지 않는다.
- 정적 프로젝트 생성 단계에서는 CSS 변수 값을 문서에 직접 반영한다. 실행 중 사용자가 색상을 바꾸는 런타임 테마 기능은 명시적으로 요청된 경우에만 입력값 검증과 함께 구현한다.

#### 메인·서브 Atomic Color 단계 생성 규칙

- 생성 단계는 `0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 95, 99, 100`으로 고정한다.
- 사용자가 입력한 원본 색상은 색상 보정 없이 반드시 `50` 단계가 된다.
- `0`은 `#000000`, `100`은 `#ffffff`로 고정한다.
- `10`~`40`은 원본 색상을 검정 방향으로, `60`~`99`는 원본 색상을 흰색 방향으로 OKLCH 색 공간에서 보간한다.
- 보간 결과는 sRGB 영역으로 변환하고 영역을 벗어난 채널은 유효 범위로 보정한 뒤 정적 HEX 또는 RGB 값으로 토큰에 기록한다. 브라우저에서 계산되는 `color-mix()`를 최종 토큰값으로 남기지 않는다.

| 단계 | 생성 기준 |
| --- | --- |
| `0` | 검정 100% |
| `10` | 원본 20% + 검정 80% |
| `20` | 원본 40% + 검정 60% |
| `30` | 원본 60% + 검정 40% |
| `40` | 원본 80% + 검정 20% |
| `50` | 사용자가 입력한 원본 100% |
| `60` | 원본 80% + 흰색 20% |
| `70` | 원본 60% + 흰색 40% |
| `80` | 원본 40% + 흰색 60% |
| `90` | 원본 20% + 흰색 80% |
| `95` | 원본 10% + 흰색 90% |
| `99` | 원본 2% + 흰색 98% |
| `100` | 흰색 100% |

- Primary 토큰은 `--color-brand-primary-[단계]` 형식을 사용한다. Secondary 토큰은 사용자가 Neutral·Cool Neutral이 아닌 새로운 서브 색상을 제공한 경우에만 `--color-brand-secondary-[단계]` 형식으로 생성한다.
- Primary의 각 단계마다 `.color_brand_primary_[단계]`, `.bg_brand_primary_[단계]`, `.border_color_brand_primary_[단계]`를 생성한다. 새로운 비중립 Secondary 팔레트를 만든 경우에만 같은 형식의 단계별 유틸리티를 생성한다. Neutral과 Cool Neutral은 이미 존재하는 단계 토큰 및 유틸리티를 재사용한다.
- 단계별 토큰과 유틸리티는 SCSS 반복문이나 런타임 생성에만 의존하지 않고 최종 전역 CSS에 개별 선언으로 존재해야 한다.

### 4.3 전체 토큰 CSS

아래 `:root` 토큰 선언은 `foundation.css`에 넣는다. `foundation.css`에는 클래스 선택자, Reset과 페이지 스타일을 추가하지 않는다.

```css
:root {
  /* 폰트 */
  --font-pretendard: 'Pretendard Variable';
  --font-sans: var(--font-pretendard, 'Pretendard Variable'), 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif;
  --font-size-10: 10px;
  --font-size-11: 11px;
  --font-size-115: 115px;
  --font-size-12: 12px;
  --font-size-14: 14px;
  --font-size-15: 15px;
  --font-size-16: 16px;
  --font-size-18: 18px;
  --font-size-20: 20px;
  --font-size-24: 24px;
  --font-size-28: 28px;
  --font-size-32: 32px;
  --font-size-40: 40px;
  --font-size-48: 48px;
  --font-size-52: 52px;
  --font-size-60: 60px;
  --font-size-fixed-16: 16px;
  --font-size-fixed-18: 18px;
  --font-weight-300: 300;
  --font-weight-400: 400;
  --font-weight-500: 500;
  --font-weight-600: 600;
  --font-weight-700: 700;

  /* 컬러 토큰: Atomic Color, Semantic Color, 공통 역할 별칭 */
  --color-accent-background-cyan: #00bdde;
  --color-accent-background-light-blue: #00aeff;
  --color-accent-background-lime: #58cf04;
  --color-accent-background-pink: #f553da;
  --color-accent-background-purple: #cb59ff;
  --color-accent-background-red-orange: #ff5e00;
  --color-accent-background-violet: #6541f2;
  --color-accent-foreground-blue: #005eeb;
  --color-accent-foreground-cyan: #0098b2;
  --color-accent-foreground-green: #009632;
  --color-accent-foreground-light-blue: #008dcf;
  --color-accent-foreground-lime: #429e00;
  --color-accent-foreground-orange: #d17600;
  --color-accent-foreground-pink: #e846cd;
  --color-accent-foreground-purple: #ad36e3;
  --color-accent-foreground-red: #e52222;
  --color-accent-foreground-red-orange: #f55a00;
  --color-accent-foreground-violet: #5b37ed;
  --color-alpha-shadow1: rgb(0 0 0 / 5%);
  --color-alpha-shadow2: rgb(0 0 0 / 8%);
  --color-alpha-shadow3: rgb(0 0 0 / 12%);
  --color-alpha-shadow4: rgb(0 0 0 / 16%);
  --color-alpha-shadow5: rgb(0 0 0 / 18%);
  --color-background-elevated-alternative: #f7f7f8;
  --color-background-elevated-normal: #ffffff;
  --color-background-normal-alternative: #f7f7f8;
  --color-background-normal-normal: #ffffff;
  --color-background-transparent-alternative: rgb(255 255 255 / 28%);
  --color-background-transparent-normal: rgb(255 255 255 / 8%);
  --color-background-transparent-strong: rgb(255 255 255 / 16%);
  --color-black: var(--color-cool-neutral-17);
  --color-brand-on-primary: var(--color-common-100);
  --color-brand-on-secondary: var(--color-common-100);
  --color-brand-primary-0: var(--color-neutral-0);
  --color-brand-primary-10: var(--color-neutral-10);
  --color-brand-primary-20: var(--color-neutral-20);
  --color-brand-primary-30: var(--color-neutral-30);
  --color-brand-primary-40: var(--color-neutral-40);
  --color-brand-primary-50: var(--color-neutral-50); /* 사용자 메인 색상 입력 전 임시 연결값 */
  --color-brand-primary-60: var(--color-neutral-60);
  --color-brand-primary-70: var(--color-neutral-70);
  --color-brand-primary-80: var(--color-neutral-80);
  --color-brand-primary-90: var(--color-neutral-90);
  --color-brand-primary-95: var(--color-neutral-95);
  --color-brand-primary-99: var(--color-neutral-99);
  --color-brand-primary-100: var(--color-neutral-100);
  --color-brand-primary: var(--color-brand-primary-50);
  --color-brand-secondary: var(--color-brand-primary); /* 서브 미입력 기본값. Neutral/Cool Neutral 선택 시 해당 50 단계로 교체 */
  --color-common-0: var(--color-cool-neutral-15);
  --color-common-100: #ffffff;
  --color-cool-neutral-0: #000000;
  --color-cool-neutral-10: #171719;
  --color-cool-neutral-100: #ffffff;
  --color-cool-neutral-15: #1b1c1e;
  --color-cool-neutral-17: #212225;
  --color-cool-neutral-20: #292a2d;
  --color-cool-neutral-22: #2e2f33;
  --color-cool-neutral-23: #333438;
  --color-cool-neutral-25: #37383c;
  --color-cool-neutral-30: #46474c;
  --color-cool-neutral-40: #5a5c63;
  --color-cool-neutral-5: #0f0f10;
  --color-cool-neutral-50: #70737c;
  --color-cool-neutral-60: #878a93;
  --color-cool-neutral-7: #141415;
  --color-cool-neutral-70: #989ba2;
  --color-cool-neutral-80: #aeb0b6;
  --color-cool-neutral-90: #c2c4c8;
  --color-cool-neutral-95: #dbdcdf;
  --color-cool-neutral-96: #e1e2e4;
  --color-cool-neutral-97: #eaebec;
  --color-cool-neutral-98: #f4f4f5;
  --color-cool-neutral-99: #f7f7f8;
  --color-fill-alternative: rgb(112 115 124 / 5%);
  --color-fill-normal: rgb(112 115 124 / 8%);
  --color-fill-strong: rgb(112 115 124 / 16%);
  --color-interaction-disable: #f4f4f5;
  --color-interaction-inactive: #989ba2;
  --color-inverse-background: #1b1c1e;
  --color-inverse-label: #f7f7f8;
  --color-inverse-primary: #3385ff;
  --color-label-alternative: rgb(55 56 60 / 61%);
  --color-label-assistive: rgb(55 56 60 / 28%);
  --color-label-disable: rgb(55 56 60 / 16%);
  --color-label-neutral: rgb(46 47 51 / 88%);
  --color-label-normal: #171719;
  --color-label-strong: var(--color-common-0);
  --color-line-normal-alternative: rgb(112 115 124 / 8%);
  --color-line-normal-neutral: rgb(112 115 124 / 16%);
  --color-line-normal-normal: rgb(112 115 124 / 22%);
  --color-line-normal-strong: rgb(112 115 124 / 52%);
  --color-line-solid-0: #000000;
  --color-line-solid-10: #1a0f26;
  --color-line-solid-20: #34204c;
  --color-line-solid-alternative: #f4f4f5;
  --color-line-solid-neutral: #eaebec;
  --color-line-solid-normal: #e1e2e4;
  --color-line-solid-strong: #aeb0b6;
  --color-material-dimmer: rgb(23 23 25 / 52%);
  --color-neutral-0: var(--color-cool-neutral-15);
  --color-neutral-10: #171717;
  --color-neutral-100: #ffffff;
  --color-neutral-15: #1c1c1c;
  --color-neutral-20: #2a2a2a;
  --color-neutral-22: #303030;
  --color-neutral-30: #474747;
  --color-neutral-40: #5c5c5c;
  --color-neutral-5: #0f0f0f;
  --color-neutral-50: #737373;
  --color-neutral-60: #8a8a8a;
  --color-neutral-70: #9b9b9b;
  --color-neutral-80: #b0b0b0;
  --color-neutral-90: #c4c4c4;
  --color-neutral-95: #dcdcdc;
  --color-neutral-97: #f0f0f0;
  --color-neutral-99: #f7f7f7;
  --color-static-black: #000000;
  --color-static-white: #ffffff;
  --color-status-cautionary: #ff9200;
  --color-status-negative: #ff4242;
  --color-status-positive: #00bf40;
  --color-white: var(--color-common-100);
  --ds-atomic-neutral-40: var(--color-neutral-40);
  --ds-atomic-neutral-90: var(--color-neutral-90);

  /* 불투명도 */
  --opacity-0: 0;
  --opacity-100: 100%;
  --opacity-12: 12%;
  --opacity-16: 16%;
  --opacity-22: 22%;
  --opacity-28: 28%;
  --opacity-35: 35%;
  --opacity-43: 43%;
  --opacity-5: 5%;
  --opacity-52: 52%;
  --opacity-61: 61%;
  --opacity-74: 74%;
  --opacity-8: 8%;
  --opacity-88: 88%;
  --opacity-97: 97%;

  /* 간격 */
  --spacing-0: 0;
  --spacing-4: 4px;
  --spacing-8: 8px;
  --spacing-12: 12px;
  --spacing-16: 16px;
  --spacing-20: 20px;
  --spacing-24: 24px;
  --spacing-28: 28px;
  --spacing-32: 32px;
  --spacing-36: 36px;
  --spacing-40: 40px;
  --spacing-44: 44px;
  --spacing-48: 48px;
  --spacing-52: 52px;
  --spacing-56: 56px;
  --spacing-60: 60px;
  --spacing-64: 64px;
  --spacing-68: 68px;
  --spacing-72: 72px;
  --spacing-76: 76px;
  --spacing-80: 80px;
  --spacing-84: 84px;
  --spacing-88: 88px;
  --spacing-92: 92px;
  --spacing-96: 96px;
  --spacing-100: 100px;
  --spacing-104: 104px;
  --spacing-108: 108px;
  --spacing-112: 112px;
  --spacing-116: 116px;
  --spacing-120: 120px;
  --spacing-gap-horizontal-16: 16px;
  --spacing-gap-horizontal-20: 20px;
  --spacing-gap-horizontal-24: 24px;
  --spacing-gap-horizontal-32: 32px;
  --spacing-gap-horizontal-4: 4px;
  --spacing-gap-horizontal-40: 40px;
  --spacing-gap-horizontal-60: 60px;
  --spacing-gap-horizontal-8: 8px;
  --spacing-gap-vertical-16: 16px;
  --spacing-gap-vertical-20: 20px;
  --spacing-gap-vertical-24: 24px;
  --spacing-gap-vertical-32: 32px;
  --spacing-gap-vertical-4: 4px;
  --spacing-gap-vertical-40: 40px;
  --spacing-gap-vertical-60: 60px;
  --spacing-gap-vertical-8: 8px;
  --spacing-padding-horizontal-12: 12px;
  --spacing-padding-horizontal-16: 16px;
  --spacing-padding-horizontal-24: 24px;
  --spacing-padding-horizontal-32: 32px;
  --spacing-padding-horizontal-4: 4px;
  --spacing-padding-horizontal-40: 40px;
  --spacing-padding-horizontal-60: 60px;
  --spacing-padding-horizontal-8: 8px;
  --spacing-padding-vertical-12: 12px;
  --spacing-padding-vertical-16: 16px;
  --spacing-padding-vertical-24: 24px;
  --spacing-padding-vertical-32: 32px;
  --spacing-padding-vertical-4: 4px;
  --spacing-padding-vertical-40: 40px;
  --spacing-padding-vertical-60: 60px;
  --spacing-padding-vertical-8: 8px;

  /* 크기 */
  --size-8: 8px;
  --size-12: 12px;
  --size-16: 16px;
  --size-20: 20px;
  --size-24: 24px;
  --size-28: 28px;
  --size-32: 32px;
  --size-36: 36px;
  --size-40: 40px;
  --size-44: 44px;
  --size-48: 48px;
  --size-52: 52px;
  --size-56: 56px;
  --size-60: 60px;
  --size-64: 64px;
  --size-72: 72px;
  --size-96: 96px;
  --size-112: 112px;
  --size-128: 128px;
  --size-144: 144px;
  --size-320: 320px;

  /* 반경 */
  --radius-0: 0;
  --radius-16: 16px;
  --radius-2: 2px;
  --radius-20: 20px;
  --radius-24: 24px;
  --radius-32: 32px;
  --radius-4: 4px;
  --radius-40: 40px;
  --radius-8: 8px;
  --radius-full: 9999px;

  /* 보더 */
  --border-0-5: 0.5px;
  --border-1: 1px;
  --border-2: 2px;
  --border-3: 3px;
  --focus-ring-width: 2px;

  /* 그림자 */
  --shadow-1: 0 1px 2px 0 var(--color-alpha-shadow1, rgba(0, 0, 0, 0.05));
  --shadow-2: 0 0 2px 0 var(--color-alpha-shadow1, rgba(0, 0, 0, 0.05)), 0 4px 8px 0 var(--color-alpha-shadow2, rgba(0, 0, 0, 0.08));
  --shadow-3: 0 0 2px 0 var(--color-alpha-shadow2, rgba(0, 0, 0, 0.08)), 0 8px 16px 0 var(--color-alpha-shadow3, rgba(0, 0, 0, 0.12));
  --shadow-4: 0 0 2px 0 var(--color-alpha-shadow2, rgba(0, 0, 0, 0.08)), 0 16px 24px 0 var(--color-alpha-shadow3, rgba(0, 0, 0, 0.12));

  /* 행간 */
  --ds-line-height-relaxed: 1.5;
  --line-height-16: 16px;
  --line-height-20: 20px;
  --line-height-24: 24px;
  --line-height-26: 26px;
  --line-height-32: 32px;
  --line-height-40: 40px;
  --line-height-44: 44px;
  --line-height-48: 48px;
  --line-height-60: 60px;
  --line-height-72: 72px;
  --line-height-90: 90px;
  --line-height-fixed-20: 20px;
  --line-height-fixed-26: 26px;

  /* 뷰포트 */
  --viewport-height: 100dvh;
  --viewport-width: 100vw;

  /* 반응형 기준 */
  --breakpoint-compact: 576px;
  --breakpoint-responsive: 992px;
  --breakpoint-content: 1260px;

  /* 컨테이너 */
  --container-large: 1024px;
  --container-medium: 768px;
  --container-small: 360px;
  --container-xlarge: 1240px;

  /* 포커스 */
  --focus-ring-color: var(--color-brand-primary);

  /* 모션 */
  --motion-duration-fast: 160ms;
  --motion-duration-normal: 240ms;
  --motion-duration-slow: 320ms;
  --motion-easing-standard: cubic-bezier(0.2, 0, 0, 1);

  /* 레이어 */
  --z-base: 0;
  --z-dropdown: 200;
  --z-modal: 400;
  --z-overlay: 300;
  --z-sticky: 100;
  --z-toast: 500;

  /* 기타 */
  --app-border: var(--color-cool-neutral-96);
  --app-control-surface: var(--color-common-100);
  --app-input-border: var(--color-line-normal-normal);
  --app-input-surface: var(--color-background-elevated-normal);
  --app-input-text: var(--color-label-normal);
  --app-surface: var(--color-common-100);
  --app-surface-muted: var(--color-cool-neutral-98);
  --app-text: var(--color-cool-neutral-15);
  --app-text-muted: var(--color-cool-neutral-50);
  --ds-font-size-body-1: var(--font-size-16);

}
```

### 4.4 타이포그래피 조합 클래스

아래 조합 클래스는 토큰이 아니라 재사용 유틸리티이므로 `utilities.css`에 넣는다. 폰트 크기 토큰은 작은 값부터 큰 값까지 모두 제공하되, 문서에 표시할 때는 큰 크기부터 정렬한다. 같은 크기라도 font-family, font-weight, line-height 조합이 다르면 별도 조합 클래스로 둘 수 있다. 13px 계층은 만들지 않으며 12px 이하는 Caption으로 분류한다.

```css
/* typography: display */
.type-display_1 {
  font-size: var(--font-size-60);
  font-weight: var(--font-weight-400);
  line-height: var(--line-height-90);
}

.type-display_2 {
  font-size: var(--font-size-48);
  font-weight: var(--font-weight-500);
  line-height: var(--line-height-60);
}

.type-display_3 {
  font-size: var(--font-size-40);
  font-weight: var(--font-weight-400);
  line-height: var(--line-height-60);
}

/* typography: headline */
.type-headline_1 {
  font-size: var(--font-size-32);
  font-weight: var(--font-weight-400);
  line-height: var(--line-height-48);
}

.type-headline_2 {
  font-size: var(--font-size-28);
  font-weight: var(--font-weight-500);
  line-height: var(--line-height-40);
}

.type-headline_3 {
  font-size: var(--font-size-24);
  font-weight: var(--font-weight-400);
  line-height: var(--line-height-40);
}

/* typography: title */
.type-title_1 {
  font-size: var(--font-size-20);
  font-weight: var(--font-weight-500);
  line-height: var(--line-height-40);
}

.type-title_2 {
  font-size: var(--font-size-18);
  font-weight: var(--font-weight-600);
  line-height: var(--line-height-26);
}

/* typography: body */
.type-body_1 {
  font-size: var(--font-size-16);
  font-weight: var(--font-weight-400);
  line-height: var(--line-height-24);
}

.type-body_2 {
  font-size: var(--font-size-15);
  font-weight: var(--font-weight-400);
  line-height: var(--line-height-20);
}

/* typography: label */
.type-label_1 {
  font-size: var(--font-size-14);
  font-weight: var(--font-weight-500);
  line-height: var(--line-height-20);
}

/* typography: caption */
.type-caption_1 {
  font-size: var(--font-size-12);
  font-weight: var(--font-weight-500);
  line-height: var(--line-height-20);
}

.type-caption_2 {
  font-size: var(--font-size-11);
  font-weight: var(--font-weight-500);
  line-height: var(--line-height-20);
}

.type-caption_3 {
  font-size: var(--font-size-10);
  font-weight: var(--font-weight-500);
  line-height: var(--line-height-16);
}
```

### 4.5 폰트 로딩

- 신규 프로젝트의 기본 글꼴은 Pretendard이며 Reset은 `font-family: var(--font-sans)`를 사용한다.
- 기존 프로젝트에 이미 전역 기본 글꼴이 있으면 새 글꼴을 강제로 추가하지 않고 `--font-sans`를 기존 font-family와 fallback 체계에 맞게 재정의한다.
- `--font-sans`에 선언한 글꼴은 프로젝트의 실제 전역 진입점에서 먼저 로드한다.
- `@font-face`, 프레임워크 폰트 로더, CDN 중 프로젝트 환경에 맞는 방식을 선택한다.
- 가변 폰트는 지원하는 weight 범위를 정확히 선언하고, 정적 폰트는 파일과 일치하는 weight만 매핑한다.
- 폰트 파일 경로, CORS, preload, `font-display`를 빌드 결과에서 확인한다.
- 폰트 로드 실패 시에도 한글이 깨지지 않도록 시스템 폰트 fallback을 유지한다.

### 4.6 아이콘과 이미지

- 일반 UI 아이콘의 표준 크기는 `8px`부터 `64px`까지 4px 간격으로 정의한다.
- 아이콘 크기 클래스는 `.icon_[size]` 형식을 사용한다. 예: `.icon_8`, `.icon_12`, `.icon_16`, `.icon_20`, `.icon_24`.
- `.icon_8`~`.icon_64`는 반드시 대응하는 `--size-*` 토큰을 참조해 `width`, `height`, `flex-basis`를 함께 고정한다.
- `64px`보다 큰 일러스트형 아이콘, 로고와 이미지는 아이콘 유틸리티를 무리하게 확장하지 않고 `.size_*`, `.w_*`, `.h_*` 또는 해당 컴포넌트 스펙을 사용한다.
- 단색 아이콘은 `currentColor`를 사용해 텍스트 색상 토큰을 상속할 수 있게 한다.
- 장식 아이콘은 `aria-hidden="true"`, 의미가 있는 아이콘은 대체 텍스트나 접근 가능한 이름을 제공한다.
- 외부 SVG의 내부 색상이 필요한 경우 `img`, 색상 상속이 필요하면 inline SVG 또는 mask 방식을 선택한다.
- 아이콘과 이미지의 실제 경로가 개발 서버, 빌드 결과, 정적 배포 환경에서 모두 유효한지 확인한다.

## 5. 토큰 대응 유틸리티

이 장의 모든 클래스는 `utilities.css`에 넣는다. Foundation의 공개 토큰에는 실제 CSS 속성에 연결되는 유틸리티가 있어야 한다. 색상 토큰은 글자색, 배경색, 보더색 유틸을 제공하고, 간격 토큰은 padding과 gap, 타이포그래피 토큰은 font-weight·line-height, 장식 토큰은 radius·border·shadow 유틸을 제공한다.

메인·서브 색상은 기존 역할 토큰과 유틸리티를 다음과 같이 연결한다. 같은 값을 가리키는 별도 유틸리티를 다른 이름으로 중복 생성하지 않는다.

| 입력 또는 역할 | 토큰 | 글자색 유틸리티 | 배경색 유틸리티 | 보더색 유틸리티 |
| --- | --- | --- | --- | --- |
| 사용자가 입력한 메인 색상의 50 단계 | `--color-brand-primary-50` → `--color-brand-primary` | `.color_brand_primary` | `.bg_brand_primary` | `.border_color_brand_primary` |
| 메인 색상 위 전경색 | `--color-brand-on-primary` | `.color_brand_on_primary` | `.bg_brand_on_primary` | `.border_color_brand_on_primary` |
| 새 비중립 서브 색상의 50 단계 | `--color-brand-secondary-50` → `--color-brand-secondary` | `.color_brand_secondary` | `.bg_brand_secondary` | `.border_color_brand_secondary` |
| Neutral 서브 색상 | `--color-neutral-50` → `--color-brand-secondary` | `.color_neutral_0~100` | `.bg_neutral_0~100` | `.border_color_neutral_0~100` |
| Cool Neutral 서브 색상 | `--color-cool-neutral-50` → `--color-brand-secondary` | `.color_cool_neutral_0~100` | `.bg_cool_neutral_0~100` | `.border_color_cool_neutral_0~100` |
| 서브 색상 위 전경색 | `--color-brand-on-secondary` | `.color_brand_on_secondary` | `.bg_brand_on_secondary` | `.border_color_brand_on_secondary` |

예를 들어 사용자가 메인 색상 `#ff3b30`, 새로운 비중립 서브 색상 `rgb(0, 102, 255)`를 입력하면 각각 `--color-brand-primary-50: #ff3b30;`, `--color-brand-secondary-50: rgb(0, 102, 255);`로 설정하고 나머지 단계를 생성한다. 서브 색상이 Neutral이면 `--color-brand-secondary: var(--color-neutral-50);`만 설정하고 단계에는 `.color_neutral_*`, `.bg_neutral_*`, `.border_color_neutral_*`를 사용한다. Cool Neutral도 같은 방식으로 기존 Cool Neutral 계열을 사용한다.

Breakpoint는 media query 조건으로 사용하므로 단일 속성 유틸리티를 만들지 않는다.

폰트 크기는 예외다. `font-size`만 바꾸는 `.fs_*` 유틸리티는 만들지 않으며, 타이포그래피 조합 클래스나 컴포넌트 안에서 `font-size`, `line-height`, 필요한 `font-weight`를 함께 지정한다. 폰트 굵기 보조 유틸리티는 `.fw_300`, `.fw_400`, `.fw_500`, `.fw_600`, `.fw_700`을 제공한다.

유틸리티 코드는 한 번에 복사할 수 있는 개별 클래스 선언으로 작성한다. SCSS map, `@each`, 동적 문자열 조합이나 빌드 시점 반복 생성으로 이 목록을 대체하지 않는다. 유틸리티의 총개수는 고정하지 않고 현재 토큰과 규칙에서 생성되어야 하는 클래스의 누락·중복 여부로 검수한다.

유틸리티는 문맥상 필요한 한두 속성을 보조하는 용도다. 버튼 높이, 폰트, padding, radius처럼 컴포넌트 정체성을 만드는 필수 속성을 여러 유틸 조합에만 의존시키지 않는다.

### 5.1 전체 토큰 유틸리티 CSS

```css
.bg_accent_background_cyan { background-color: var(--color-accent-background-cyan); }
.bg_accent_background_light_blue { background-color: var(--color-accent-background-light-blue); }
.bg_accent_background_lime { background-color: var(--color-accent-background-lime); }
.bg_accent_background_pink { background-color: var(--color-accent-background-pink); }
.bg_accent_background_purple { background-color: var(--color-accent-background-purple); }
.bg_accent_background_red_orange { background-color: var(--color-accent-background-red-orange); }
.bg_accent_background_violet { background-color: var(--color-accent-background-violet); }
.bg_accent_foreground_blue { background-color: var(--color-accent-foreground-blue); }
.bg_accent_foreground_cyan { background-color: var(--color-accent-foreground-cyan); }
.bg_accent_foreground_green { background-color: var(--color-accent-foreground-green); }
.bg_accent_foreground_light_blue { background-color: var(--color-accent-foreground-light-blue); }
.bg_accent_foreground_lime { background-color: var(--color-accent-foreground-lime); }
.bg_accent_foreground_orange { background-color: var(--color-accent-foreground-orange); }
.bg_accent_foreground_pink { background-color: var(--color-accent-foreground-pink); }
.bg_accent_foreground_purple { background-color: var(--color-accent-foreground-purple); }
.bg_accent_foreground_red { background-color: var(--color-accent-foreground-red); }
.bg_accent_foreground_red_orange { background-color: var(--color-accent-foreground-red-orange); }
.bg_accent_foreground_violet { background-color: var(--color-accent-foreground-violet); }
.bg_alpha_shadow1 { background-color: var(--color-alpha-shadow1); }
.bg_alpha_shadow2 { background-color: var(--color-alpha-shadow2); }
.bg_alpha_shadow3 { background-color: var(--color-alpha-shadow3); }
.bg_alpha_shadow4 { background-color: var(--color-alpha-shadow4); }
.bg_alpha_shadow5 { background-color: var(--color-alpha-shadow5); }
.bg_app_border { background-color: var(--app-border); }
.bg_app_control_surface { background-color: var(--app-control-surface); }
.bg_app_input_border { background-color: var(--app-input-border); }
.bg_app_input_surface { background-color: var(--app-input-surface); }
.bg_app_input_text { background-color: var(--app-input-text); }
.bg_app_surface { background-color: var(--app-surface); }
.bg_app_surface_muted { background-color: var(--app-surface-muted); }
.bg_app_text { background-color: var(--app-text); }
.bg_app_text_muted { background-color: var(--app-text-muted); }
.bg_background_elevated_alternative { background-color: var(--color-background-elevated-alternative); }
.bg_background_elevated_normal { background-color: var(--color-background-elevated-normal); }
.bg_background_normal_alternative { background-color: var(--color-background-normal-alternative); }
.bg_background_normal_normal { background-color: var(--color-background-normal-normal); }
.bg_background_transparent_alternative { background-color: var(--color-background-transparent-alternative); }
.bg_background_transparent_normal { background-color: var(--color-background-transparent-normal); }
.bg_background_transparent_strong { background-color: var(--color-background-transparent-strong); }
.bg_black { background-color: var(--color-black); }
.bg_brand_on_primary { background-color: var(--color-brand-on-primary); }
.bg_brand_on_secondary { background-color: var(--color-brand-on-secondary); }
.bg_brand_primary { background-color: var(--color-brand-primary); }
.bg_brand_primary_0 { background-color: var(--color-brand-primary-0); }
.bg_brand_primary_10 { background-color: var(--color-brand-primary-10); }
.bg_brand_primary_20 { background-color: var(--color-brand-primary-20); }
.bg_brand_primary_30 { background-color: var(--color-brand-primary-30); }
.bg_brand_primary_40 { background-color: var(--color-brand-primary-40); }
.bg_brand_primary_50 { background-color: var(--color-brand-primary-50); }
.bg_brand_primary_60 { background-color: var(--color-brand-primary-60); }
.bg_brand_primary_70 { background-color: var(--color-brand-primary-70); }
.bg_brand_primary_80 { background-color: var(--color-brand-primary-80); }
.bg_brand_primary_90 { background-color: var(--color-brand-primary-90); }
.bg_brand_primary_95 { background-color: var(--color-brand-primary-95); }
.bg_brand_primary_99 { background-color: var(--color-brand-primary-99); }
.bg_brand_primary_100 { background-color: var(--color-brand-primary-100); }
.bg_brand_secondary { background-color: var(--color-brand-secondary); }
.bg_common_0 { background-color: var(--color-common-0); }
.bg_common_100 { background-color: var(--color-common-100); }
.bg_cool_neutral_0 { background-color: var(--color-cool-neutral-0); }
.bg_cool_neutral_10 { background-color: var(--color-cool-neutral-10); }
.bg_cool_neutral_100 { background-color: var(--color-cool-neutral-100); }
.bg_cool_neutral_15 { background-color: var(--color-cool-neutral-15); }
.bg_cool_neutral_17 { background-color: var(--color-cool-neutral-17); }
.bg_cool_neutral_20 { background-color: var(--color-cool-neutral-20); }
.bg_cool_neutral_22 { background-color: var(--color-cool-neutral-22); }
.bg_cool_neutral_23 { background-color: var(--color-cool-neutral-23); }
.bg_cool_neutral_25 { background-color: var(--color-cool-neutral-25); }
.bg_cool_neutral_30 { background-color: var(--color-cool-neutral-30); }
.bg_cool_neutral_40 { background-color: var(--color-cool-neutral-40); }
.bg_cool_neutral_5 { background-color: var(--color-cool-neutral-5); }
.bg_cool_neutral_50 { background-color: var(--color-cool-neutral-50); }
.bg_cool_neutral_60 { background-color: var(--color-cool-neutral-60); }
.bg_cool_neutral_7 { background-color: var(--color-cool-neutral-7); }
.bg_cool_neutral_70 { background-color: var(--color-cool-neutral-70); }
.bg_cool_neutral_80 { background-color: var(--color-cool-neutral-80); }
.bg_cool_neutral_90 { background-color: var(--color-cool-neutral-90); }
.bg_cool_neutral_95 { background-color: var(--color-cool-neutral-95); }
.bg_cool_neutral_96 { background-color: var(--color-cool-neutral-96); }
.bg_cool_neutral_97 { background-color: var(--color-cool-neutral-97); }
.bg_cool_neutral_98 { background-color: var(--color-cool-neutral-98); }
.bg_cool_neutral_99 { background-color: var(--color-cool-neutral-99); }
.bg_ds_atomic_neutral_40 { background-color: var(--ds-atomic-neutral-40); }
.bg_ds_atomic_neutral_90 { background-color: var(--ds-atomic-neutral-90); }
.bg_fill_alternative { background-color: var(--color-fill-alternative); }
.bg_fill_normal { background-color: var(--color-fill-normal); }
.bg_fill_strong { background-color: var(--color-fill-strong); }
.bg_interaction_disable { background-color: var(--color-interaction-disable); }
.bg_interaction_inactive { background-color: var(--color-interaction-inactive); }
.bg_inverse_background { background-color: var(--color-inverse-background); }
.bg_inverse_label { background-color: var(--color-inverse-label); }
.bg_inverse_primary { background-color: var(--color-inverse-primary); }
.bg_label_alternative { background-color: var(--color-label-alternative); }
.bg_label_assistive { background-color: var(--color-label-assistive); }
.bg_label_disable { background-color: var(--color-label-disable); }
.bg_label_neutral { background-color: var(--color-label-neutral); }
.bg_label_normal { background-color: var(--color-label-normal); }
.bg_label_strong { background-color: var(--color-label-strong); }
.bg_line_normal_alternative { background-color: var(--color-line-normal-alternative); }
.bg_line_normal_neutral { background-color: var(--color-line-normal-neutral); }
.bg_line_normal_normal { background-color: var(--color-line-normal-normal); }
.bg_line_normal_strong { background-color: var(--color-line-normal-strong); }
.bg_line_solid_0 { background-color: var(--color-line-solid-0); }
.bg_line_solid_10 { background-color: var(--color-line-solid-10); }
.bg_line_solid_20 { background-color: var(--color-line-solid-20); }
.bg_line_solid_alternative { background-color: var(--color-line-solid-alternative); }
.bg_line_solid_neutral { background-color: var(--color-line-solid-neutral); }
.bg_line_solid_normal { background-color: var(--color-line-solid-normal); }
.bg_line_solid_strong { background-color: var(--color-line-solid-strong); }
.bg_material_dimmer { background-color: var(--color-material-dimmer); }
.bg_neutral_0 { background-color: var(--color-neutral-0); }
.bg_neutral_10 { background-color: var(--color-neutral-10); }
.bg_neutral_100 { background-color: var(--color-neutral-100); }
.bg_neutral_15 { background-color: var(--color-neutral-15); }
.bg_neutral_20 { background-color: var(--color-neutral-20); }
.bg_neutral_22 { background-color: var(--color-neutral-22); }
.bg_neutral_30 { background-color: var(--color-neutral-30); }
.bg_neutral_40 { background-color: var(--color-neutral-40); }
.bg_neutral_5 { background-color: var(--color-neutral-5); }
.bg_neutral_50 { background-color: var(--color-neutral-50); }
.bg_neutral_60 { background-color: var(--color-neutral-60); }
.bg_neutral_70 { background-color: var(--color-neutral-70); }
.bg_neutral_80 { background-color: var(--color-neutral-80); }
.bg_neutral_90 { background-color: var(--color-neutral-90); }
.bg_neutral_95 { background-color: var(--color-neutral-95); }
.bg_neutral_97 { background-color: var(--color-neutral-97); }
.bg_neutral_99 { background-color: var(--color-neutral-99); }
.bg_static_black { background-color: var(--color-static-black); }
.bg_static_white { background-color: var(--color-static-white); }
.bg_status_cautionary { background-color: var(--color-status-cautionary); }
.bg_status_negative { background-color: var(--color-status-negative); }
.bg_status_positive { background-color: var(--color-status-positive); }
.bg_white { background-color: var(--color-white); }
.border_color_accent_background_cyan { border-color: var(--color-accent-background-cyan); }
.border_color_accent_background_light_blue { border-color: var(--color-accent-background-light-blue); }
.border_color_accent_background_lime { border-color: var(--color-accent-background-lime); }
.border_color_accent_background_pink { border-color: var(--color-accent-background-pink); }
.border_color_accent_background_purple { border-color: var(--color-accent-background-purple); }
.border_color_accent_background_red_orange { border-color: var(--color-accent-background-red-orange); }
.border_color_accent_background_violet { border-color: var(--color-accent-background-violet); }
.border_color_accent_foreground_blue { border-color: var(--color-accent-foreground-blue); }
.border_color_accent_foreground_cyan { border-color: var(--color-accent-foreground-cyan); }
.border_color_accent_foreground_green { border-color: var(--color-accent-foreground-green); }
.border_color_accent_foreground_light_blue { border-color: var(--color-accent-foreground-light-blue); }
.border_color_accent_foreground_lime { border-color: var(--color-accent-foreground-lime); }
.border_color_accent_foreground_orange { border-color: var(--color-accent-foreground-orange); }
.border_color_accent_foreground_pink { border-color: var(--color-accent-foreground-pink); }
.border_color_accent_foreground_purple { border-color: var(--color-accent-foreground-purple); }
.border_color_accent_foreground_red { border-color: var(--color-accent-foreground-red); }
.border_color_accent_foreground_red_orange { border-color: var(--color-accent-foreground-red-orange); }
.border_color_accent_foreground_violet { border-color: var(--color-accent-foreground-violet); }
.border_color_alpha_shadow1 { border-color: var(--color-alpha-shadow1); }
.border_color_alpha_shadow2 { border-color: var(--color-alpha-shadow2); }
.border_color_alpha_shadow3 { border-color: var(--color-alpha-shadow3); }
.border_color_alpha_shadow4 { border-color: var(--color-alpha-shadow4); }
.border_color_alpha_shadow5 { border-color: var(--color-alpha-shadow5); }
.border_color_app_border { border-color: var(--app-border); }
.border_color_app_control_surface { border-color: var(--app-control-surface); }
.border_color_app_input_border { border-color: var(--app-input-border); }
.border_color_app_input_surface { border-color: var(--app-input-surface); }
.border_color_app_input_text { border-color: var(--app-input-text); }
.border_color_app_surface { border-color: var(--app-surface); }
.border_color_app_surface_muted { border-color: var(--app-surface-muted); }
.border_color_app_text { border-color: var(--app-text); }
.border_color_app_text_muted { border-color: var(--app-text-muted); }
.border_color_background_elevated_alternative { border-color: var(--color-background-elevated-alternative); }
.border_color_background_elevated_normal { border-color: var(--color-background-elevated-normal); }
.border_color_background_normal_alternative { border-color: var(--color-background-normal-alternative); }
.border_color_background_normal_normal { border-color: var(--color-background-normal-normal); }
.border_color_background_transparent_alternative { border-color: var(--color-background-transparent-alternative); }
.border_color_background_transparent_normal { border-color: var(--color-background-transparent-normal); }
.border_color_background_transparent_strong { border-color: var(--color-background-transparent-strong); }
.border_color_black { border-color: var(--color-black); }
.border_color_brand_on_primary { border-color: var(--color-brand-on-primary); }
.border_color_brand_on_secondary { border-color: var(--color-brand-on-secondary); }
.border_color_brand_primary { border-color: var(--color-brand-primary); }
.border_color_brand_primary_0 { border-color: var(--color-brand-primary-0); }
.border_color_brand_primary_10 { border-color: var(--color-brand-primary-10); }
.border_color_brand_primary_20 { border-color: var(--color-brand-primary-20); }
.border_color_brand_primary_30 { border-color: var(--color-brand-primary-30); }
.border_color_brand_primary_40 { border-color: var(--color-brand-primary-40); }
.border_color_brand_primary_50 { border-color: var(--color-brand-primary-50); }
.border_color_brand_primary_60 { border-color: var(--color-brand-primary-60); }
.border_color_brand_primary_70 { border-color: var(--color-brand-primary-70); }
.border_color_brand_primary_80 { border-color: var(--color-brand-primary-80); }
.border_color_brand_primary_90 { border-color: var(--color-brand-primary-90); }
.border_color_brand_primary_95 { border-color: var(--color-brand-primary-95); }
.border_color_brand_primary_99 { border-color: var(--color-brand-primary-99); }
.border_color_brand_primary_100 { border-color: var(--color-brand-primary-100); }
.border_color_brand_secondary { border-color: var(--color-brand-secondary); }
.border_color_common_0 { border-color: var(--color-common-0); }
.border_color_common_100 { border-color: var(--color-common-100); }
.border_color_cool_neutral_0 { border-color: var(--color-cool-neutral-0); }
.border_color_cool_neutral_10 { border-color: var(--color-cool-neutral-10); }
.border_color_cool_neutral_100 { border-color: var(--color-cool-neutral-100); }
.border_color_cool_neutral_15 { border-color: var(--color-cool-neutral-15); }
.border_color_cool_neutral_17 { border-color: var(--color-cool-neutral-17); }
.border_color_cool_neutral_20 { border-color: var(--color-cool-neutral-20); }
.border_color_cool_neutral_22 { border-color: var(--color-cool-neutral-22); }
.border_color_cool_neutral_23 { border-color: var(--color-cool-neutral-23); }
.border_color_cool_neutral_25 { border-color: var(--color-cool-neutral-25); }
.border_color_cool_neutral_30 { border-color: var(--color-cool-neutral-30); }
.border_color_cool_neutral_40 { border-color: var(--color-cool-neutral-40); }
.border_color_cool_neutral_5 { border-color: var(--color-cool-neutral-5); }
.border_color_cool_neutral_50 { border-color: var(--color-cool-neutral-50); }
.border_color_cool_neutral_60 { border-color: var(--color-cool-neutral-60); }
.border_color_cool_neutral_7 { border-color: var(--color-cool-neutral-7); }
.border_color_cool_neutral_70 { border-color: var(--color-cool-neutral-70); }
.border_color_cool_neutral_80 { border-color: var(--color-cool-neutral-80); }
.border_color_cool_neutral_90 { border-color: var(--color-cool-neutral-90); }
.border_color_cool_neutral_95 { border-color: var(--color-cool-neutral-95); }
.border_color_cool_neutral_96 { border-color: var(--color-cool-neutral-96); }
.border_color_cool_neutral_97 { border-color: var(--color-cool-neutral-97); }
.border_color_cool_neutral_98 { border-color: var(--color-cool-neutral-98); }
.border_color_cool_neutral_99 { border-color: var(--color-cool-neutral-99); }
.border_color_ds_atomic_neutral_40 { border-color: var(--ds-atomic-neutral-40); }
.border_color_ds_atomic_neutral_90 { border-color: var(--ds-atomic-neutral-90); }
.border_color_fill_alternative { border-color: var(--color-fill-alternative); }
.border_color_fill_normal { border-color: var(--color-fill-normal); }
.border_color_fill_strong { border-color: var(--color-fill-strong); }
.border_color_interaction_disable { border-color: var(--color-interaction-disable); }
.border_color_interaction_inactive { border-color: var(--color-interaction-inactive); }
.border_color_inverse_background { border-color: var(--color-inverse-background); }
.border_color_inverse_label { border-color: var(--color-inverse-label); }
.border_color_inverse_primary { border-color: var(--color-inverse-primary); }
.border_color_label_alternative { border-color: var(--color-label-alternative); }
.border_color_label_assistive { border-color: var(--color-label-assistive); }
.border_color_label_disable { border-color: var(--color-label-disable); }
.border_color_label_neutral { border-color: var(--color-label-neutral); }
.border_color_label_normal { border-color: var(--color-label-normal); }
.border_color_label_strong { border-color: var(--color-label-strong); }
.border_color_line_normal_alternative { border-color: var(--color-line-normal-alternative); }
.border_color_line_normal_neutral { border-color: var(--color-line-normal-neutral); }
.border_color_line_normal_normal { border-color: var(--color-line-normal-normal); }
.border_color_line_normal_strong { border-color: var(--color-line-normal-strong); }
.border_color_line_solid_0 { border-color: var(--color-line-solid-0); }
.border_color_line_solid_10 { border-color: var(--color-line-solid-10); }
.border_color_line_solid_20 { border-color: var(--color-line-solid-20); }
.border_color_line_solid_alternative { border-color: var(--color-line-solid-alternative); }
.border_color_line_solid_neutral { border-color: var(--color-line-solid-neutral); }
.border_color_line_solid_normal { border-color: var(--color-line-solid-normal); }
.border_color_line_solid_strong { border-color: var(--color-line-solid-strong); }
.border_color_material_dimmer { border-color: var(--color-material-dimmer); }
.border_color_neutral_0 { border-color: var(--color-neutral-0); }
.border_color_neutral_10 { border-color: var(--color-neutral-10); }
.border_color_neutral_100 { border-color: var(--color-neutral-100); }
.border_color_neutral_15 { border-color: var(--color-neutral-15); }
.border_color_neutral_20 { border-color: var(--color-neutral-20); }
.border_color_neutral_22 { border-color: var(--color-neutral-22); }
.border_color_neutral_30 { border-color: var(--color-neutral-30); }
.border_color_neutral_40 { border-color: var(--color-neutral-40); }
.border_color_neutral_5 { border-color: var(--color-neutral-5); }
.border_color_neutral_50 { border-color: var(--color-neutral-50); }
.border_color_neutral_60 { border-color: var(--color-neutral-60); }
.border_color_neutral_70 { border-color: var(--color-neutral-70); }
.border_color_neutral_80 { border-color: var(--color-neutral-80); }
.border_color_neutral_90 { border-color: var(--color-neutral-90); }
.border_color_neutral_95 { border-color: var(--color-neutral-95); }
.border_color_neutral_97 { border-color: var(--color-neutral-97); }
.border_color_neutral_99 { border-color: var(--color-neutral-99); }
.border_color_static_black { border-color: var(--color-static-black); }
.border_color_static_white { border-color: var(--color-static-white); }
.border_color_status_cautionary { border-color: var(--color-status-cautionary); }
.border_color_status_negative { border-color: var(--color-status-negative); }
.border_color_status_positive { border-color: var(--color-status-positive); }
.border_color_white { border-color: var(--color-white); }
.border_width_0_5 { border-width: var(--border-0-5); }
.border_width_1 { border-width: var(--border-1); }
.border_width_2 { border-width: var(--border-2); }
.border_width_3 { border-width: var(--border-3); }
.color_accent_background_cyan { color: var(--color-accent-background-cyan); }
.color_accent_background_light_blue { color: var(--color-accent-background-light-blue); }
.color_accent_background_lime { color: var(--color-accent-background-lime); }
.color_accent_background_pink { color: var(--color-accent-background-pink); }
.color_accent_background_purple { color: var(--color-accent-background-purple); }
.color_accent_background_red_orange { color: var(--color-accent-background-red-orange); }
.color_accent_background_violet { color: var(--color-accent-background-violet); }
.color_accent_foreground_blue { color: var(--color-accent-foreground-blue); }
.color_accent_foreground_cyan { color: var(--color-accent-foreground-cyan); }
.color_accent_foreground_green { color: var(--color-accent-foreground-green); }
.color_accent_foreground_light_blue { color: var(--color-accent-foreground-light-blue); }
.color_accent_foreground_lime { color: var(--color-accent-foreground-lime); }
.color_accent_foreground_orange { color: var(--color-accent-foreground-orange); }
.color_accent_foreground_pink { color: var(--color-accent-foreground-pink); }
.color_accent_foreground_purple { color: var(--color-accent-foreground-purple); }
.color_accent_foreground_red { color: var(--color-accent-foreground-red); }
.color_accent_foreground_red_orange { color: var(--color-accent-foreground-red-orange); }
.color_accent_foreground_violet { color: var(--color-accent-foreground-violet); }
.color_alpha_shadow1 { color: var(--color-alpha-shadow1); }
.color_alpha_shadow2 { color: var(--color-alpha-shadow2); }
.color_alpha_shadow3 { color: var(--color-alpha-shadow3); }
.color_alpha_shadow4 { color: var(--color-alpha-shadow4); }
.color_alpha_shadow5 { color: var(--color-alpha-shadow5); }
.color_app_border { color: var(--app-border); }
.color_app_control_surface { color: var(--app-control-surface); }
.color_app_input_border { color: var(--app-input-border); }
.color_app_input_surface { color: var(--app-input-surface); }
.color_app_input_text { color: var(--app-input-text); }
.color_app_surface { color: var(--app-surface); }
.color_app_surface_muted { color: var(--app-surface-muted); }
.color_app_text { color: var(--app-text); }
.color_app_text_muted { color: var(--app-text-muted); }
.color_background_elevated_alternative { color: var(--color-background-elevated-alternative); }
.color_background_elevated_normal { color: var(--color-background-elevated-normal); }
.color_background_normal_alternative { color: var(--color-background-normal-alternative); }
.color_background_normal_normal { color: var(--color-background-normal-normal); }
.color_background_transparent_alternative { color: var(--color-background-transparent-alternative); }
.color_background_transparent_normal { color: var(--color-background-transparent-normal); }
.color_background_transparent_strong { color: var(--color-background-transparent-strong); }
.color_black { color: var(--color-black); }
.color_brand_on_primary { color: var(--color-brand-on-primary); }
.color_brand_on_secondary { color: var(--color-brand-on-secondary); }
.color_brand_primary { color: var(--color-brand-primary); }
.color_brand_primary_0 { color: var(--color-brand-primary-0); }
.color_brand_primary_10 { color: var(--color-brand-primary-10); }
.color_brand_primary_20 { color: var(--color-brand-primary-20); }
.color_brand_primary_30 { color: var(--color-brand-primary-30); }
.color_brand_primary_40 { color: var(--color-brand-primary-40); }
.color_brand_primary_50 { color: var(--color-brand-primary-50); }
.color_brand_primary_60 { color: var(--color-brand-primary-60); }
.color_brand_primary_70 { color: var(--color-brand-primary-70); }
.color_brand_primary_80 { color: var(--color-brand-primary-80); }
.color_brand_primary_90 { color: var(--color-brand-primary-90); }
.color_brand_primary_95 { color: var(--color-brand-primary-95); }
.color_brand_primary_99 { color: var(--color-brand-primary-99); }
.color_brand_primary_100 { color: var(--color-brand-primary-100); }
.color_brand_secondary { color: var(--color-brand-secondary); }
.color_common_0 { color: var(--color-common-0); }
.color_common_100 { color: var(--color-common-100); }
.color_cool_neutral_0 { color: var(--color-cool-neutral-0); }
.color_cool_neutral_10 { color: var(--color-cool-neutral-10); }
.color_cool_neutral_100 { color: var(--color-cool-neutral-100); }
.color_cool_neutral_15 { color: var(--color-cool-neutral-15); }
.color_cool_neutral_17 { color: var(--color-cool-neutral-17); }
.color_cool_neutral_20 { color: var(--color-cool-neutral-20); }
.color_cool_neutral_22 { color: var(--color-cool-neutral-22); }
.color_cool_neutral_23 { color: var(--color-cool-neutral-23); }
.color_cool_neutral_25 { color: var(--color-cool-neutral-25); }
.color_cool_neutral_30 { color: var(--color-cool-neutral-30); }
.color_cool_neutral_40 { color: var(--color-cool-neutral-40); }
.color_cool_neutral_5 { color: var(--color-cool-neutral-5); }
.color_cool_neutral_50 { color: var(--color-cool-neutral-50); }
.color_cool_neutral_60 { color: var(--color-cool-neutral-60); }
.color_cool_neutral_7 { color: var(--color-cool-neutral-7); }
.color_cool_neutral_70 { color: var(--color-cool-neutral-70); }
.color_cool_neutral_80 { color: var(--color-cool-neutral-80); }
.color_cool_neutral_90 { color: var(--color-cool-neutral-90); }
.color_cool_neutral_95 { color: var(--color-cool-neutral-95); }
.color_cool_neutral_96 { color: var(--color-cool-neutral-96); }
.color_cool_neutral_97 { color: var(--color-cool-neutral-97); }
.color_cool_neutral_98 { color: var(--color-cool-neutral-98); }
.color_cool_neutral_99 { color: var(--color-cool-neutral-99); }
.color_ds_atomic_neutral_40 { color: var(--ds-atomic-neutral-40); }
.color_ds_atomic_neutral_90 { color: var(--ds-atomic-neutral-90); }
.color_fill_alternative { color: var(--color-fill-alternative); }
.color_fill_normal { color: var(--color-fill-normal); }
.color_fill_strong { color: var(--color-fill-strong); }
.color_interaction_disable { color: var(--color-interaction-disable); }
.color_interaction_inactive { color: var(--color-interaction-inactive); }
.color_inverse_background { color: var(--color-inverse-background); }
.color_inverse_label { color: var(--color-inverse-label); }
.color_inverse_primary { color: var(--color-inverse-primary); }
.color_label_alternative { color: var(--color-label-alternative); }
.color_label_assistive { color: var(--color-label-assistive); }
.color_label_disable { color: var(--color-label-disable); }
.color_label_neutral { color: var(--color-label-neutral); }
.color_label_normal { color: var(--color-label-normal); }
.color_label_strong { color: var(--color-label-strong); }
.color_line_normal_alternative { color: var(--color-line-normal-alternative); }
.color_line_normal_neutral { color: var(--color-line-normal-neutral); }
.color_line_normal_normal { color: var(--color-line-normal-normal); }
.color_line_normal_strong { color: var(--color-line-normal-strong); }
.color_line_solid_0 { color: var(--color-line-solid-0); }
.color_line_solid_10 { color: var(--color-line-solid-10); }
.color_line_solid_20 { color: var(--color-line-solid-20); }
.color_line_solid_alternative { color: var(--color-line-solid-alternative); }
.color_line_solid_neutral { color: var(--color-line-solid-neutral); }
.color_line_solid_normal { color: var(--color-line-solid-normal); }
.color_line_solid_strong { color: var(--color-line-solid-strong); }
.color_material_dimmer { color: var(--color-material-dimmer); }
.color_neutral_0 { color: var(--color-neutral-0); }
.color_neutral_10 { color: var(--color-neutral-10); }
.color_neutral_100 { color: var(--color-neutral-100); }
.color_neutral_15 { color: var(--color-neutral-15); }
.color_neutral_20 { color: var(--color-neutral-20); }
.color_neutral_22 { color: var(--color-neutral-22); }
.color_neutral_30 { color: var(--color-neutral-30); }
.color_neutral_40 { color: var(--color-neutral-40); }
.color_neutral_5 { color: var(--color-neutral-5); }
.color_neutral_50 { color: var(--color-neutral-50); }
.color_neutral_60 { color: var(--color-neutral-60); }
.color_neutral_70 { color: var(--color-neutral-70); }
.color_neutral_80 { color: var(--color-neutral-80); }
.color_neutral_90 { color: var(--color-neutral-90); }
.color_neutral_95 { color: var(--color-neutral-95); }
.color_neutral_97 { color: var(--color-neutral-97); }
.color_neutral_99 { color: var(--color-neutral-99); }
.color_static_black { color: var(--color-static-black); }
.color_static_white { color: var(--color-static-white); }
.color_status_cautionary { color: var(--color-status-cautionary); }
.color_status_negative { color: var(--color-status-negative); }
.color_status_positive { color: var(--color-status-positive); }
.color_white { color: var(--color-white); }
.duration_fast { transition-duration: var(--motion-duration-fast); }
.duration_normal { transition-duration: var(--motion-duration-normal); }
.duration_slow { transition-duration: var(--motion-duration-slow); }
.easing_standard { transition-timing-function: var(--motion-easing-standard); }
.font_pretendard { font-family: var(--font-pretendard); }
.font_sans { font-family: var(--font-sans); }
.fw_300 { font-weight: var(--font-weight-300); }
.fw_400 { font-weight: var(--font-weight-400); }
.fw_500 { font-weight: var(--font-weight-500); }
.fw_600 { font-weight: var(--font-weight-600); }
.fw_700 { font-weight: var(--font-weight-700); }
.gap_4 { gap: var(--spacing-4); }
.gap_8 { gap: var(--spacing-8); }
.gap_12 { gap: var(--spacing-12); }
.gap_16 { gap: var(--spacing-16); }
.gap_20 { gap: var(--spacing-20); }
.gap_24 { gap: var(--spacing-24); }
.gap_28 { gap: var(--spacing-28); }
.gap_32 { gap: var(--spacing-32); }
.gap_36 { gap: var(--spacing-36); }
.gap_40 { gap: var(--spacing-40); }
.gap_44 { gap: var(--spacing-44); }
.gap_48 { gap: var(--spacing-48); }
.gap_52 { gap: var(--spacing-52); }
.gap_56 { gap: var(--spacing-56); }
.gap_60 { gap: var(--spacing-60); }
.gap_64 { gap: var(--spacing-64); }
.gap_68 { gap: var(--spacing-68); }
.gap_72 { gap: var(--spacing-72); }
.gap_76 { gap: var(--spacing-76); }
.gap_80 { gap: var(--spacing-80); }
.gap_84 { gap: var(--spacing-84); }
.gap_88 { gap: var(--spacing-88); }
.gap_92 { gap: var(--spacing-92); }
.gap_96 { gap: var(--spacing-96); }
.gap_100 { gap: var(--spacing-100); }
.gap_104 { gap: var(--spacing-104); }
.gap_108 { gap: var(--spacing-108); }
.gap_112 { gap: var(--spacing-112); }
.gap_116 { gap: var(--spacing-116); }
.gap_120 { gap: var(--spacing-120); }
.gap_x_16 { column-gap: var(--spacing-gap-horizontal-16); }
.gap_x_20 { column-gap: var(--spacing-gap-horizontal-20); }
.gap_x_24 { column-gap: var(--spacing-gap-horizontal-24); }
.gap_x_32 { column-gap: var(--spacing-gap-horizontal-32); }
.gap_x_4 { column-gap: var(--spacing-gap-horizontal-4); }
.gap_x_40 { column-gap: var(--spacing-gap-horizontal-40); }
.gap_x_60 { column-gap: var(--spacing-gap-horizontal-60); }
.gap_x_8 { column-gap: var(--spacing-gap-horizontal-8); }
.gap_y_16 { row-gap: var(--spacing-gap-vertical-16); }
.gap_y_20 { row-gap: var(--spacing-gap-vertical-20); }
.gap_y_24 { row-gap: var(--spacing-gap-vertical-24); }
.gap_y_32 { row-gap: var(--spacing-gap-vertical-32); }
.gap_y_4 { row-gap: var(--spacing-gap-vertical-4); }
.gap_y_40 { row-gap: var(--spacing-gap-vertical-40); }
.gap_y_60 { row-gap: var(--spacing-gap-vertical-60); }
.gap_y_8 { row-gap: var(--spacing-gap-vertical-8); }
.h_100p { height: 100%; }
.h_10p { height: 10%; }
.h_8 { height: var(--size-8); }
.h_12 { height: var(--size-12); }
.h_16 { height: var(--size-16); }
.h_112 { height: var(--size-112); }
.h_128 { height: var(--size-128); }
.h_144 { height: var(--size-144); }
.h_15p { height: 15%; }
.h_20 { height: var(--size-20); }
.h_20p { height: 20%; }
.h_24 { height: var(--size-24); }
.h_25p { height: 25%; }
.h_28 { height: var(--size-28); }
.h_30p { height: 30%; }
.h_32 { height: var(--size-32); }
.h_320 { height: var(--size-320); }
.h_35p { height: 35%; }
.h_36 { height: var(--size-36); }
.h_40 { height: var(--size-40); }
.h_40p { height: 40%; }
.h_44 { height: var(--size-44); }
.h_45p { height: 45%; }
.h_48 { height: var(--size-48); }
.h_50p { height: 50%; }
.h_52 { height: var(--size-52); }
.h_55p { height: 55%; }
.h_56 { height: var(--size-56); }
.h_5p { height: 5%; }
.h_60 { height: var(--size-60); }
.h_60p { height: 60%; }
.h_64 { height: var(--size-64); }
.h_65p { height: 65%; }
.h_70p { height: 70%; }
.h_72 { height: var(--size-72); }
.h_75p { height: 75%; }
.h_80p { height: 80%; }
.h_85p { height: 85%; }
.h_90p { height: 90%; }
.h_95p { height: 95%; }
.h_96 { height: var(--size-96); }
.h_viewport { height: var(--viewport-height); }
.lh_16 { line-height: var(--line-height-16); }
.lh_20 { line-height: var(--line-height-20); }
.lh_24 { line-height: var(--line-height-24); }
.lh_26 { line-height: var(--line-height-26); }
.lh_32 { line-height: var(--line-height-32); }
.lh_40 { line-height: var(--line-height-40); }
.lh_44 { line-height: var(--line-height-44); }
.lh_48 { line-height: var(--line-height-48); }
.lh_60 { line-height: var(--line-height-60); }
.lh_72 { line-height: var(--line-height-72); }
.lh_90 { line-height: var(--line-height-90); }
.lh_fixed_20 { line-height: var(--line-height-fixed-20); }
.lh_fixed_26 { line-height: var(--line-height-fixed-26); }
.lh_relaxed { line-height: var(--ds-line-height-relaxed); }
.max_width_large { max-width: var(--container-large); }
.max_width_medium { max-width: var(--container-medium); }
.max_width_small { max-width: var(--container-small); }
.max_width_xlarge { max-width: var(--container-xlarge); }
.opacity_0 { opacity: var(--opacity-0); }
.opacity_100 { opacity: var(--opacity-100); }
.opacity_12 { opacity: var(--opacity-12); }
.opacity_16 { opacity: var(--opacity-16); }
.opacity_22 { opacity: var(--opacity-22); }
.opacity_28 { opacity: var(--opacity-28); }
.opacity_35 { opacity: var(--opacity-35); }
.opacity_43 { opacity: var(--opacity-43); }
.opacity_5 { opacity: var(--opacity-5); }
.opacity_52 { opacity: var(--opacity-52); }
.opacity_61 { opacity: var(--opacity-61); }
.opacity_74 { opacity: var(--opacity-74); }
.opacity_8 { opacity: var(--opacity-8); }
.opacity_88 { opacity: var(--opacity-88); }
.opacity_97 { opacity: var(--opacity-97); }
.outline_focus_color { outline-color: var(--focus-ring-color); }
.outline_focus_width { outline-width: var(--focus-ring-width); }
.pb_12 { padding-bottom: var(--spacing-padding-vertical-12); }
.pb_16 { padding-bottom: var(--spacing-padding-vertical-16); }
.pb_24 { padding-bottom: var(--spacing-padding-vertical-24); }
.pb_32 { padding-bottom: var(--spacing-padding-vertical-32); }
.pb_4 { padding-bottom: var(--spacing-padding-vertical-4); }
.pb_40 { padding-bottom: var(--spacing-padding-vertical-40); }
.pb_60 { padding-bottom: var(--spacing-padding-vertical-60); }
.pb_8 { padding-bottom: var(--spacing-padding-vertical-8); }
.pl_12 { padding-left: var(--spacing-padding-horizontal-12); }
.pl_16 { padding-left: var(--spacing-padding-horizontal-16); }
.pl_24 { padding-left: var(--spacing-padding-horizontal-24); }
.pl_32 { padding-left: var(--spacing-padding-horizontal-32); }
.pl_4 { padding-left: var(--spacing-padding-horizontal-4); }
.pl_40 { padding-left: var(--spacing-padding-horizontal-40); }
.pl_60 { padding-left: var(--spacing-padding-horizontal-60); }
.pl_8 { padding-left: var(--spacing-padding-horizontal-8); }
.pr_12 { padding-right: var(--spacing-padding-horizontal-12); }
.pr_16 { padding-right: var(--spacing-padding-horizontal-16); }
.pr_24 { padding-right: var(--spacing-padding-horizontal-24); }
.pr_32 { padding-right: var(--spacing-padding-horizontal-32); }
.pr_4 { padding-right: var(--spacing-padding-horizontal-4); }
.pr_40 { padding-right: var(--spacing-padding-horizontal-40); }
.pr_60 { padding-right: var(--spacing-padding-horizontal-60); }
.pr_8 { padding-right: var(--spacing-padding-horizontal-8); }
.pt_12 { padding-top: var(--spacing-padding-vertical-12); }
.pt_16 { padding-top: var(--spacing-padding-vertical-16); }
.pt_24 { padding-top: var(--spacing-padding-vertical-24); }
.pt_32 { padding-top: var(--spacing-padding-vertical-32); }
.pt_4 { padding-top: var(--spacing-padding-vertical-4); }
.pt_40 { padding-top: var(--spacing-padding-vertical-40); }
.pt_60 { padding-top: var(--spacing-padding-vertical-60); }
.pt_8 { padding-top: var(--spacing-padding-vertical-8); }
.px_4 { padding-inline: var(--spacing-4); }
.px_8 { padding-inline: var(--spacing-8); }
.px_12 { padding-inline: var(--spacing-12); }
.px_16 { padding-inline: var(--spacing-16); }
.px_20 { padding-inline: var(--spacing-20); }
.px_24 { padding-inline: var(--spacing-24); }
.px_28 { padding-inline: var(--spacing-28); }
.px_32 { padding-inline: var(--spacing-32); }
.px_36 { padding-inline: var(--spacing-36); }
.px_40 { padding-inline: var(--spacing-40); }
.px_44 { padding-inline: var(--spacing-44); }
.px_48 { padding-inline: var(--spacing-48); }
.px_52 { padding-inline: var(--spacing-52); }
.px_56 { padding-inline: var(--spacing-56); }
.px_60 { padding-inline: var(--spacing-60); }
.px_64 { padding-inline: var(--spacing-64); }
.px_68 { padding-inline: var(--spacing-68); }
.px_72 { padding-inline: var(--spacing-72); }
.px_76 { padding-inline: var(--spacing-76); }
.px_80 { padding-inline: var(--spacing-80); }
.px_84 { padding-inline: var(--spacing-84); }
.px_88 { padding-inline: var(--spacing-88); }
.px_92 { padding-inline: var(--spacing-92); }
.px_96 { padding-inline: var(--spacing-96); }
.px_100 { padding-inline: var(--spacing-100); }
.px_104 { padding-inline: var(--spacing-104); }
.px_108 { padding-inline: var(--spacing-108); }
.px_112 { padding-inline: var(--spacing-112); }
.px_116 { padding-inline: var(--spacing-116); }
.px_120 { padding-inline: var(--spacing-120); }
.py_4 { padding-block: var(--spacing-4); }
.py_8 { padding-block: var(--spacing-8); }
.py_12 { padding-block: var(--spacing-12); }
.py_16 { padding-block: var(--spacing-16); }
.py_20 { padding-block: var(--spacing-20); }
.py_24 { padding-block: var(--spacing-24); }
.py_28 { padding-block: var(--spacing-28); }
.py_32 { padding-block: var(--spacing-32); }
.py_36 { padding-block: var(--spacing-36); }
.py_40 { padding-block: var(--spacing-40); }
.py_44 { padding-block: var(--spacing-44); }
.py_48 { padding-block: var(--spacing-48); }
.py_52 { padding-block: var(--spacing-52); }
.py_56 { padding-block: var(--spacing-56); }
.py_60 { padding-block: var(--spacing-60); }
.py_64 { padding-block: var(--spacing-64); }
.py_68 { padding-block: var(--spacing-68); }
.py_72 { padding-block: var(--spacing-72); }
.py_76 { padding-block: var(--spacing-76); }
.py_80 { padding-block: var(--spacing-80); }
.py_84 { padding-block: var(--spacing-84); }
.py_88 { padding-block: var(--spacing-88); }
.py_92 { padding-block: var(--spacing-92); }
.py_96 { padding-block: var(--spacing-96); }
.py_100 { padding-block: var(--spacing-100); }
.py_104 { padding-block: var(--spacing-104); }
.py_108 { padding-block: var(--spacing-108); }
.py_112 { padding-block: var(--spacing-112); }
.py_116 { padding-block: var(--spacing-116); }
.py_120 { padding-block: var(--spacing-120); }
.radius_0 { border-radius: var(--radius-0); }
.radius_16 { border-radius: var(--radius-16); }
.radius_2 { border-radius: var(--radius-2); }
.radius_20 { border-radius: var(--radius-20); }
.radius_24 { border-radius: var(--radius-24); }
.radius_32 { border-radius: var(--radius-32); }
.radius_4 { border-radius: var(--radius-4); }
.radius_40 { border-radius: var(--radius-40); }
.radius_8 { border-radius: var(--radius-8); }
.radius_full { border-radius: var(--radius-full); }
.shadow_1 { box-shadow: var(--shadow-1); }
.shadow_2 { box-shadow: var(--shadow-2); }
.shadow_3 { box-shadow: var(--shadow-3); }
.shadow_4 { box-shadow: var(--shadow-4); }
.icon_8 { width: var(--size-8); height: var(--size-8); flex: 0 0 var(--size-8); }
.icon_12 { width: var(--size-12); height: var(--size-12); flex: 0 0 var(--size-12); }
.icon_16 { width: var(--size-16); height: var(--size-16); flex: 0 0 var(--size-16); }
.icon_20 { width: var(--size-20); height: var(--size-20); flex: 0 0 var(--size-20); }
.icon_24 { width: var(--size-24); height: var(--size-24); flex: 0 0 var(--size-24); }
.icon_28 { width: var(--size-28); height: var(--size-28); flex: 0 0 var(--size-28); }
.icon_32 { width: var(--size-32); height: var(--size-32); flex: 0 0 var(--size-32); }
.icon_36 { width: var(--size-36); height: var(--size-36); flex: 0 0 var(--size-36); }
.icon_40 { width: var(--size-40); height: var(--size-40); flex: 0 0 var(--size-40); }
.icon_44 { width: var(--size-44); height: var(--size-44); flex: 0 0 var(--size-44); }
.icon_48 { width: var(--size-48); height: var(--size-48); flex: 0 0 var(--size-48); }
.icon_52 { width: var(--size-52); height: var(--size-52); flex: 0 0 var(--size-52); }
.icon_56 { width: var(--size-56); height: var(--size-56); flex: 0 0 var(--size-56); }
.icon_60 { width: var(--size-60); height: var(--size-60); flex: 0 0 var(--size-60); }
.icon_64 { width: var(--size-64); height: var(--size-64); flex: 0 0 var(--size-64); }
.size_8 { width: var(--size-8); height: var(--size-8); }
.size_12 { width: var(--size-12); height: var(--size-12); }
.size_16 { width: var(--size-16); height: var(--size-16); }
.size_20 { width: var(--size-20); height: var(--size-20); }
.size_24 { width: var(--size-24); height: var(--size-24); }
.size_28 { width: var(--size-28); height: var(--size-28); }
.size_32 { width: var(--size-32); height: var(--size-32); }
.size_36 { width: var(--size-36); height: var(--size-36); }
.size_40 { width: var(--size-40); height: var(--size-40); }
.size_44 { width: var(--size-44); height: var(--size-44); }
.size_48 { width: var(--size-48); height: var(--size-48); }
.size_52 { width: var(--size-52); height: var(--size-52); }
.size_56 { width: var(--size-56); height: var(--size-56); }
.size_60 { width: var(--size-60); height: var(--size-60); }
.size_64 { width: var(--size-64); height: var(--size-64); }
.size_72 { width: var(--size-72); height: var(--size-72); }
.size_96 { width: var(--size-96); height: var(--size-96); }
.size_112 { width: var(--size-112); height: var(--size-112); }
.size_128 { width: var(--size-128); height: var(--size-128); }
.size_144 { width: var(--size-144); height: var(--size-144); }
.size_320 { width: var(--size-320); height: var(--size-320); }
.w_100p { width: 100%; }
.w_10p { width: 10%; }
.w_8 { width: var(--size-8); }
.w_12 { width: var(--size-12); }
.w_16 { width: var(--size-16); }
.w_112 { width: var(--size-112); }
.w_128 { width: var(--size-128); }
.w_144 { width: var(--size-144); }
.w_15p { width: 15%; }
.w_20 { width: var(--size-20); }
.w_20p { width: 20%; }
.w_24 { width: var(--size-24); }
.w_25p { width: 25%; }
.w_28 { width: var(--size-28); }
.w_30p { width: 30%; }
.w_32 { width: var(--size-32); }
.w_320 { width: var(--size-320); }
.w_35p { width: 35%; }
.w_36 { width: var(--size-36); }
.w_40 { width: var(--size-40); }
.w_40p { width: 40%; }
.w_44 { width: var(--size-44); }
.w_45p { width: 45%; }
.w_48 { width: var(--size-48); }
.w_50p { width: 50%; }
.w_52 { width: var(--size-52); }
.w_55p { width: 55%; }
.w_56 { width: var(--size-56); }
.w_5p { width: 5%; }
.w_60 { width: var(--size-60); }
.w_60p { width: 60%; }
.w_64 { width: var(--size-64); }
.w_65p { width: 65%; }
.w_70p { width: 70%; }
.w_72 { width: var(--size-72); }
.w_75p { width: 75%; }
.w_80p { width: 80%; }
.w_85p { width: 85%; }
.w_90p { width: 90%; }
.w_95p { width: 95%; }
.w_96 { width: var(--size-96); }
.w_viewport { width: var(--viewport-width); }
.z_base { z-index: var(--z-base); }
.z_dropdown { z-index: var(--z-dropdown); }
.z_modal { z-index: var(--z-modal); }
.z_overlay { z-index: var(--z-overlay); }
.z_sticky { z-index: var(--z-sticky); }
.z_toast { z-index: var(--z-toast); }
```

## 6. 공통 레이아웃 유틸리티

아래 유틸리티는 `utilities.css`에 넣는다. 토큰만으로 표현하기 어려운 display, flex, grid, 정렬, overflow, 텍스트 처리, 접근성 패턴을 제공하며 클래스명은 소문자 `snake_case`를 사용한다.

```css
/* 표시 */
.d_block { display: block; }
.d_inline { display: inline; }
.d_inline_block { display: inline-block; }
.d_none { display: none; }
.flex { display: flex; }
.inline_flex { display: inline-flex; }
.grid { display: grid; }

/* Flex 방향 */
.flex_row { display: flex; flex-direction: row; }
.flex_row_reverse { display: flex; flex-direction: row-reverse; }
.flex_col { display: flex; flex-direction: column; }
.flex_col_reverse { display: flex; flex-direction: column-reverse; }
.flex_wrap { flex-wrap: wrap; }
.flex_nowrap { flex-wrap: nowrap; }
.flex_1_1_0 { flex: 1 1 0; min-width: 0; }
.flex_none { flex: none; }
.flex_grow { flex-grow: 1; }
.flex_shrink_0 { flex-shrink: 0; }

/* Flex 조합 */
.flex_row_start { display: flex; align-items: center; justify-content: flex-start; }
.flex_row_center { display: flex; align-items: center; justify-content: center; }
.flex_row_end { display: flex; align-items: center; justify-content: flex-end; }
.flex_row_between { display: flex; align-items: center; justify-content: space-between; }
.flex_row_around { display: flex; align-items: center; justify-content: space-around; }
.flex_row_evenly { display: flex; align-items: center; justify-content: space-evenly; }
.flex_row_between_start { display: flex; align-items: flex-start; justify-content: space-between; }
.flex_col_start { display: flex; flex-direction: column; align-items: flex-start; }
.flex_col_center { display: flex; flex-direction: column; align-items: center; justify-content: center; }
.flex_col_end { display: flex; flex-direction: column; align-items: center; justify-content: flex-end; }
.flex_col_between { display: flex; flex-direction: column; align-items: center; justify-content: space-between; }
.flex_col_stretch { display: flex; flex-direction: column; align-items: stretch; }

/* 정렬 */
.items_start { align-items: flex-start; }
.items_center { align-items: center; }
.items_end { align-items: flex-end; }
.items_stretch { align-items: stretch; }
.justify_start { justify-content: flex-start; }
.justify_center { justify-content: center; }
.justify_end { justify-content: flex-end; }
.justify_between { justify-content: space-between; }
.justify_around { justify-content: space-around; }
.justify_evenly { justify-content: space-evenly; }
.self_start { align-self: flex-start; }
.self_center { align-self: center; }
.self_end { align-self: flex-end; }
.self_stretch { align-self: stretch; }

/* 크기 */
.w_full { width: 100%; }
.w_auto { width: auto; }
.h_full { height: 100%; }
.h_auto { height: auto; }
.min_w_0 { min-width: 0; }
.min_h_0 { min-height: 0; }
.max_w_none { max-width: none; }

/* 텍스트 */
.text_left { text-align: left; }
.text_center { text-align: center; }
.text_right { text-align: right; }
.text_nowrap { white-space: nowrap; }
.text_break_keep { word-break: keep-all; }
.text_break_word { overflow-wrap: anywhere; }
.text_ellipsis { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.text_clamp_2 { display: -webkit-box; overflow: hidden; -webkit-box-orient: vertical; -webkit-line-clamp: 2; }
.text_clamp_3 { display: -webkit-box; overflow: hidden; -webkit-box-orient: vertical; -webkit-line-clamp: 3; }

/* 위치와 넘침 */
.position_relative { position: relative; }
.position_absolute { position: absolute; }
.position_fixed { position: fixed; }
.position_sticky { position: sticky; }
.overflow_hidden { overflow: hidden; }
.overflow_auto { overflow: auto; }
.overflow_x_auto { overflow-x: auto; }
.overflow_y_auto { overflow-y: auto; }

/* 미디어 */
.object_contain { object-fit: contain; }
.object_cover { object-fit: cover; }
.object_center { object-position: center; }
.img_responsive { display: block; max-width: 100%; height: auto; }

/* 상호작용과 접근성 */
.cursor_pointer { cursor: pointer; }
.cursor_default { cursor: default; }
.pointer_events_none { pointer-events: none; }
.user_select_none { user-select: none; }
.sr_only { position: absolute; width: 1px; height: 1px; padding: 0; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0; }

/* 효과 */
.transition_color { transition-property: color, background-color, border-color; transition-duration: var(--motion-duration-normal); transition-timing-function: var(--motion-easing-standard); }
.transition_transform { transition-property: transform; transition-duration: var(--motion-duration-normal); transition-timing-function: var(--motion-easing-standard); }
.transition_shadow { transition-property: box-shadow; transition-duration: var(--motion-duration-normal); transition-timing-function: var(--motion-easing-standard); }
.rotate_180 { transform: rotate(180deg); }
```

### 6.1 반응형 기준

아래 값은 한 프로젝트의 실제 운영 CSS에서 반복 사용된 기준을 일반화한 참고값이다. 기존 프로젝트에 이미 breakpoint 체계가 있으면 기존 값을 우선하고 중복 체계를 만들지 않는다.

| 구간 | 기준 | 적용 원칙 |
| --- | --- | --- |
| Content | `max-width: 1260px` | 넓은 콘텐츠 영역의 폭과 좌우 padding을 조정하는 선택적 분기 |
| Responsive | `max-width: 992px` | 데스크톱 다단 레이아웃을 단일 열 또는 가변 폭으로 전환하는 주 분기 |
| Compact | `max-width: 576px` | 작은 화면의 padding, 컨트롤 배치, 긴 텍스트와 표 overflow를 보정하는 보조 분기 |
| Desktop | `min-width: 993px` | 별도 media query 없이 사용하는 기본 레이아웃 |

- CSS custom property는 일반적인 media query 조건에서 직접 사용할 수 없으므로 `@media (max-width: 992px)`처럼 실제 값을 쓴다. `--breakpoint-*` 토큰은 문서, JavaScript와 빌드 도구의 기준값으로 사용한다.
- `992px` 이하에서는 고정 폭 컴포넌트를 무조건 축소하지 말고 `responsive` variant, `width: 100%`, grid 열 축소 또는 overflow wrapper 중 의미에 맞는 방식을 선택한다.
- `576px` 이하에서도 컴포넌트의 터치 영역과 타이포그래피 계층을 임의로 줄이지 않는다.
- 페이지에만 필요한 `1110px`, `1350px`, `1600px` 같은 보조 분기는 전역 breakpoint로 승격하지 않는다.
- breakpoint, padding, gap과 컴포넌트 외곽 크기는 4px 배수를 유지한다.
- 모션을 사용하는 프로젝트는 다음 접근성 예외를 전역에 한 번 제공한다.

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    scroll-behavior: auto !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

## 7. 클래스명 규칙

### 7.1 기본 형식

`[역할]_[영역]_[종류]_[variant]_[feature]_[state]_[size]`

필요하지 않은 항목은 생략한다. 이름은 DOM 태그가 아니라 요소가 맡은 역할을 설명해야 한다.

| 접두사 | 역할 |
| --- | --- |
| `page_` | 페이지 최상위 범위 |
| `container_` | 페이지 또는 섹션의 큰 레이아웃 범위 |
| `wrapper_` | 내부 요소 묶음과 정렬 |
| `box_` | 시각적으로 구획된 패널이나 카드 |
| `list_` | 반복 목록 |
| `item_` | 반복 항목 |
| `btn_` | 사용자 동작을 실행하는 버튼형 UI |
| `link_` | 경로 이동 링크 |
| `form_`, `fieldset_` | 폼 범위와 그룹 |
| `input_`, `textarea_`, `select_`, `label_` | 폼 컨트롤 |
| `tab_`, `pagination_`, `table_` | 탐색 및 데이터 UI |
| `badge_`, `chip_` | 상태와 분류 표시 |
| `title_`, `text_` | 제목과 텍스트 |
| `icon_`, `image_`, `logo_` | 시각 자산 |
| `header_`, `footer_`, `nav_` | 공통 레이아웃 |
| `divider_` | 구분선 |

### 7.2 이름 규칙

- 소문자 `snake_case`만 사용한다.
- camelCase, PascalCase, BEM, 의미 없는 숫자 이름을 사용하지 않는다. 단, `.icon_16`, `.gap_16`처럼 토큰 값을 명확히 나타내는 유틸리티 숫자 접미사는 허용한다.
- 색상이나 모양만으로 컴포넌트 이름을 만들지 않는다. `.btn_blue_round`보다 `.btn_content_submit`을 사용한다.
- 컴포넌트 이름은 렌더링 태그에 종속되지 않는다. 동일한 버튼형 스펙은 `button`, `a`, Router Link에 같은 클래스를 적용할 수 있다.
- `middle`은 사용하지 않는다. 고정 너비는 `fixed`, 가변 너비는 `responsive`를 사용한다.
- 표와 문서의 열 순서는 `fixed → responsive`, 크기 순서는 `small → medium → large → xlarge`다.
- 상태는 `:hover`, `:focus-visible`, `:checked`, `:disabled`, ARIA, `data-state`를 우선하고 필요한 경우에만 `is_active`, `is_open`을 사용한다.
- `[class^="..."]`, `[class*="..."]`로 컴포넌트 공통 속성을 숨겨 적용하지 않는다.

### 7.3 정규화 예시

| 변경 전 | 표준 이름 |
| --- | --- |
| `.btn_quickLink` | `.btn_quick_link` |
| `.btn_subFunc_pc` | `.btn_sub_func_pc` |
| `.align_self_flexEnd` | `.align_self_flex_end` |
| `.bg_lightBlue` | `.bg_light_blue` |
| `.box_shadow_blackCard` | `.box_shadow_black_card` |
| `.input_form_middle` | `.input_form_fixed` |
| `.select_form_middle` | `.select_form_fixed` |

## 8. 컴포넌트 작성 원칙

메인 화면에서만 사용하는 전역 컴포넌트 스타일은 `main.css`, 세부 페이지에서만 사용하는 전역 컴포넌트 스타일은 `sub.css`에 넣는다. 양쪽에서 함께 사용하는 공통 컴포넌트는 프로젝트의 컴포넌트 전용 스타일 체계에 두며 `foundation.css`, `reset.css`, `utilities.css`에 섞지 않는다.

컴포넌트의 시각 스펙에는 다음 속성을 검토한다.

- display, flex/grid 정렬
- width, min-width, max-width
- height, min-height
- padding, gap
- border, radius, background, color
- font-size, font-weight, line-height
- 아이콘 크기와 배치
- shadow, cursor, appearance, white-space
- hover, focus-visible, active, checked, disabled, readonly, error
- 반응형 변화

복사·붙여넣기용 예시는 한 클래스만으로 핵심 스펙이 완성돼야 한다.

```css
.btn_primary_filled_medium {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-weight: var(--font-weight-500);
    white-space: nowrap;
    appearance: none;
    cursor: pointer;
    min-height: var(--size-40);
    padding: 0 var(--spacing-padding-horizontal-24);
    font-size: var(--font-size-14);
    line-height: var(--line-height-20);
    border: 0;
    border-radius: var(--radius-0);
    background: var(--color-brand-primary);
    color: var(--color-brand-on-primary);
}
```

실제 프로젝트에서는 공통 컴포넌트, CSS Modules, SCSS mixin, CSS-in-JS 등으로 내부 구현을 나눌 수 있다. 다만 최종 computed style과 토큰 사용 규칙은 동일해야 한다.

### 8.1 프로젝트 시작 시 확인할 공통 컴포넌트

| 분류 | 기본 확인 항목 |
| --- | --- |
| Button/Link | 역할, variant, 아이콘, disabled, loading, `small/medium/large/xlarge` |
| Tab/Navigation | active, keyboard, overflow, panel 연결 |
| Input | `fixed/responsive`, placeholder, readonly, disabled, error |
| Textarea | 최소 높이, 자동 높이, 글자 수 표시, error |
| Select | 기본 화살표, 아이콘, readonly 대체, disabled, error |
| Checkbox/Radio/Toggle | 자유로운 외형, checked, indeterminate, disabled, label 연결 |
| Chip/Badge | 크기, 상태, 삭제 동작 여부, 비상호작용 상태 |
| Card/Box | 정보 구조, 클릭 영역, 내부 인터랙션 |
| Table/List | 헤더 의미, 반응형 overflow, 빈 상태, pagination |
| Modal/Drawer/Tooltip | portal, focus trap, 닫기, overlay, z-index |
| Feedback | validation, alert, toast, loading, empty state |

프로젝트에서 사용하지 않는 컴포넌트까지 미리 구현할 필요는 없다. 다만 위 목록을 기준으로 필요한 컴포넌트와 누락된 상태를 착수 전에 확정한다. Checkbox, Radio, Toggle의 외형은 프로젝트 디자인에 맞게 자유롭게 설계하되 Foundation 토큰과 접근성 규칙을 지킨다.

### 8.2 컴포넌트 기준 적용 방식

- 아래 규격은 기준 디자인 시스템의 기본 컴포넌트와 실제 적용 프로젝트에서 확인된 컴포넌트 유형을 통합한 공통 기준이다.
- 프로젝트 전용 클래스명, 브랜드명과 고유 색상값은 공통 규격으로 승격하지 않는다. 컴포넌트 색상은 Foundation에서 확정된 `--color-brand-primary`, `--color-brand-secondary`, `--color-brand-on-primary`, `--color-brand-on-secondary` 역할 토큰으로 연결한다.
- 공통 컴포넌트를 만들기 전에는 메인 색상이 반드시 확정되어 있어야 한다. 다만 `Filled`라는 이름만 보고 모든 컴포넌트에 메인 색상을 일괄 적용하지 않는다. Button·Chip·Badge의 Primary Filled처럼 원본 규격에서 Primary 색상을 사용하는 위치만 `--color-brand-primary`와 `--color-brand-on-primary`로 연결한다.
- Tab의 기본 Filled, Text Input, Textarea, Select처럼 원본 규격에서 Surface·Fill·Label Semantic Color를 사용하는 컴포넌트는 해당 Semantic 토큰을 유지한다. 메인 색상은 active·selected·checked 등 원본에서 강조색을 사용하는 상태에만 적용한다.
- 사용자가 Secondary 역할을 요청하고 해당 컴포넌트가 Primary 색상 위치를 갖는 경우에만 그 위치를 `--color-brand-secondary`와 `--color-brand-on-secondary`로 교체한다. 서브 색상이 없는 프로젝트에서는 임의의 보조 색상을 만들지 않고 Foundation 매핑을 따른다.
- 색상 HEX/RGB 값은 프로젝트마다 달라질 수 있지만 컴포넌트 CSS에 값을 직접 고정하지 않는다. 메인·서브 색상이 변경되면 컴포넌트 코드를 다시 만들지 않고 역할 토큰 값의 변경만으로 전체 공통 컴포넌트에 반영되어야 한다.
- 컴포넌트의 레이아웃, 크기, padding, 타이포그래피, radius, border, 상태 변화는 아래 표를 기준으로 재현한다.
- CSS 클래스 하나에 모든 속성을 넣는 방식은 복사·붙여넣기 예시용이다. 실제 프로젝트는 CSS Modules, 공통 컴포넌트, variant props, SCSS mixin 등 적절한 구조를 사용할 수 있다.
- 코드 구조가 달라도 최종 computed style은 아래 규격과 같아야 한다.
- 기존 프로젝트에 이미 공통 컴포넌트가 있으면 태그나 클래스 구조를 강제로 교체하지 않고 기존 API에 아래 스펙을 매핑한다.
- 아래 목록에 없는 프로젝트 특화 컴포넌트는 가장 가까운 공통 유형을 기반으로 추가하되 먼저 Foundation 토큰과 4px 배수 규칙을 확인한다.

#### 컴포넌트 Variant 결정 규칙

- 컴포넌트 생성 시 `컴포넌트 종류 → variant → radius modifier → size → state → 색상 역할` 순서로 스펙을 결정한다.
- Size는 해당 컴포넌트 표의 높이·padding·font-size·line-height만 바꾼다. Size가 달라져도 variant의 border, radius, display, 정렬, 배경 방식은 바꾸지 않는다.
- `Filled`는 기본형, `Filled Rounded`는 Rounded형, `Filled Full Rounded`는 Full Rounded형이다. `Filled` 요청에 Rounded 규칙을 섞지 않는다. Outline도 같은 원칙을 적용한다.
- 다른 컴포넌트의 규칙을 가져오지 않는다. 예를 들어 Button Filled와 Tab Filled, Text Input Filled는 이름이 같아도 배경색·상태·cursor·width 규칙이 서로 다르다.
- 아래 표에 없는 size나 variant는 임의로 보간해 만들지 않는다. 사용자가 추가를 요청하면 가장 가까운 실제 size를 기준으로 설계하되, 추가된 값과 근거를 먼저 명시한다.

| Component | Filled/기본형 | Outline | Radius 규칙 | Primary 색상 적용 위치 |
| --- | --- | --- | --- | --- |
| Button | `border: 0` | `1px solid` 역할 색상, Surface 배경 | 기본 `radius-0`, Rounded `radius-8`, Full Rounded `radius-full` | Primary Filled 배경·전경, Primary Outline 보더·글자 |
| Tab | `border: 0`, 기본 `fill-normal/label-normal` | 기본 `common-0`, Gray Line `line-normal-normal` | 기본 `radius-0`, Rounded `radius-8`, Full Rounded `radius-full` | active·selected 상태 |
| Text Input | `border: 0`, `fill-normal/label-normal` | `line-solid-0`, `common-100/label-normal` | 기본 `radius-0`, Rounded `radius-8`, Full Rounded `radius-full` | 원본 상태에서 강조색을 쓰는 focus·complete 위치만 |
| Textarea | `border: 0`, `fill-normal/label-normal` | `line-solid-0`, `common-100/label-normal` | 기본 `radius-0`, Rounded `radius-8` | 원본 상태에서 강조색을 쓰는 focus 위치만 |
| Select | `border: 0`, `fill-normal/label-normal` | `line-solid-0`, `common-100/label-normal` | 기본 `radius-0`, Rounded `radius-8`, Full Rounded `radius-full` | 원본 상태에서 강조색을 쓰는 focus·open 위치만 |
| Chip | `border: 0` | 기본 `common-0`, Gray Line `line-normal-normal` | 모든 variant `radius-full` | Primary Filled 배경·전경, selected·active 상태 |
| Badge | `border: 0` | `1px solid common-0` | 모든 variant `radius-full` | Primary Filled 배경·전경 |
| Content Tag | `1px solid neutral-90`, `common-100/neutral-40` | 별도 Filled/Outline 구분 없음 | `radius-full` | 적용하지 않음 |
| Toggle | 상태별 track 배경 | 해당 없음 | Small `radius-20`, Medium `radius-24`, Large `radius-32` | on 상태 track |
| Checkbox | `2px solid line-solid-strong`, `common-100` | 해당 없음 | `radius-2` | checked·indeterminate 상태 |
| Radio | `2px solid line-solid-strong`, `common-100` | 해당 없음 | `radius-full` | checked 상태 |

### 8.3 공통 사이즈 기준

#### Button

| Size | Min-height | Padding | Font-size | Line-height | Weight |
| --- | ---: | ---: | ---: | ---: | ---: |
| Small | `32px` | `0 16px` | `12px` | `16px` | `500` |
| Medium | `40px` | `0 24px` | `14px` | `20px` | `500` |
| Large | `48px` | `0 24px` | `16px` | `20px` | `500` |
| Xlarge | `60px` | `0 24px` | `16px` | `20px` | `500` |

#### Tab

| Size | Min-height | Padding | Font-size | Line-height | Weight |
| --- | ---: | ---: | ---: | ---: | ---: |
| Small | `32px` | `0 12px` | `14px` | `20px` | `500` |
| Medium | `40px` | `0 16px` | `15px` | `20px` | `500` |
| Large | `48px` | `0 24px` | `16px` | `20px` | `500` |
| Xlarge | `60px` | `0 24px` | `16px` | `20px` | `500` |

#### Text Input

| Size | Min-height | Padding | Font-size | Line-height |
| --- | ---: | ---: | ---: | ---: |
| Small | `40px` | `0 12px` | `14px` | `20px` |
| Medium | `48px` | `0 16px` | `15px` | `20px` |
| Large | `52px` | `0 16px` | `16px` | `24px` |
| Xlarge | `56px` | `0 16px` | `16px` | `24px` |

#### Select

| Size | Min-height | Padding | Font-size | Line-height |
| --- | ---: | ---: | ---: | ---: |
| Small | `40px` | `0 12px` | `14px` | `20px` |
| Medium | `48px` | `0 16px` | `15px` | `20px` |
| Large | `52px` | `0 24px` | `16px` | `24px` |

#### Textarea

| Size | Min-height | Padding | Font-size | Line-height |
| --- | ---: | ---: | ---: | ---: |
| Small | `96px` | `12px` | `14px` | `20px` |
| Medium | `112px` | `12px 16px` | `15px` | `20px` |
| Large | `128px` | `12px 16px` | `16px` | `24px` |

#### Chip

| Size | Min-height | Padding | Font-size | Line-height |
| --- | ---: | ---: | ---: | ---: |
| Small | `32px` | `0 12px` | `14px` | `20px` |
| Medium | `40px` | `0 16px` | `15px` | `20px` |
| Large | `48px` | `0 24px` | `16px` | `24px` |

#### Badge

| Size | Padding | Font-size | Line-height |
| --- | ---: | ---: | ---: |
| Small | `4px 8px` | `12px` | `16px` |
| Medium | `4px 10px` | `14px` | `20px` |

#### Content Tag

| Size | Min-height | Padding | Font-size | Line-height |
| --- | ---: | ---: | ---: | ---: |
| Small | `24px` | `0 12px` | `12px` | `1` |
| Medium | `32px` | `0 16px` | `14px` | `1` |
| Large | `40px` | `0 20px` | `16px` | `1` |

#### Checkbox, Radio와 Toggle

| Size | Checkbox/Radio | Toggle Track | Toggle Padding |
| --- | ---: | ---: | ---: |
| Small | `16px × 16px` | `36px × 20px` | `2px` |
| Medium | `20px × 20px` | `44px × 24px` | `2px` |
| Large | 지원하지 않음 | `52px × 32px` | `2px` |

사이즈 표의 수치는 Foundation 토큰으로 표현한다. 예를 들어 `32px`은 `var(--size-32)` 또는 동일 값의 컴포넌트 토큰, `16px` 간격은 `var(--spacing-16)`을 사용한다. 기존 의미가 확정된 18px·15px·14px 타이포그래피는 유지하지만 13px 계층은 만들지 않는다.

### 8.4 전체 컴포넌트 Variant와 상태

| Component | Variant/Feature | 필수 상태 |
| --- | --- | --- |
| Button | Filled, Filled+Icon, Rounded, Rounded+Icon, Full Rounded, Full Rounded+Icon, Outline, Outline+Icon, Outline Rounded, Outline Rounded+Icon, Outline Full Rounded, Outline Full Rounded+Icon | default, hover, active, focus-visible, shadow, disabled, loading |
| Icon Button | Filled, Outline, Outline Rounded, Outline Full Rounded, danger, neutral, translucent | default, hover, active, focus-visible, disabled |
| Text Button | Text, Text+Icon, default action, danger action, like/dislike/vote | default, hover, active, focus-visible, disabled |
| Functional Button | primary, field/form action, content action, CTA, panel action, download, quick link, search, swiper previous/next/play/stop, social login | 의미에 필요한 상태와 loading |
| Tab | Filled, Filled+Icon, Rounded, Rounded+Icon, Full Rounded, Full Rounded+Icon, Outline 계열, Gray Line Outline 계열, Pill, View Toggle, Content Tab | default, active, focus-visible, disabled |
| Text Input | Filled, Filled Rounded, Filled Full Rounded, Outline, Outline Rounded, Outline Full Rounded | default, focus, complete, error, disabled, readonly/view, password, dark |
| Textarea | Filled, Filled Rounded, Outline, Outline Rounded, inquiry | default, focus, error, disabled, readonly/view |
| Select | Filled/Outline × 기본/Rounded/Full Rounded × icon 유무, native select, select button | default, open, focus, disabled, error |
| Chip | Filled, Outline, Gray Line Outline, content tag | default, selected, active, disabled, removable |
| Badge | Filled, Outline, neutral, status, notification | default, positive, cautionary, negative, disabled |
| Toggle | off, on | focus-visible, disabled |
| Checkbox | default, checked, indeterminate | focus-visible, disabled |
| Radio | default, checked | focus-visible, disabled |
| Content Module | post link, information box, accordion, information table, card/list | default, hover/focus, active/open, empty/loading/error |

### 8.5 공통 시각 스펙

#### Button

- 기본 레이아웃은 `inline-flex`, 중앙 정렬, `white-space: nowrap`, `appearance: none`, `cursor: pointer`다.
- Primary Filled는 `border: 0`, `background: var(--color-brand-primary)`, `color: var(--color-brand-on-primary)`를 사용한다. 색상 역할이 생략된 일반 Filled 요청도 Primary로 처리한다.
- Secondary Filled는 `border: 0`, `background: var(--color-brand-secondary)`, `color: var(--color-brand-on-secondary)`를 사용한다.
- Primary Outline은 `1px solid var(--color-brand-primary)` 보더와 같은 역할의 텍스트 색상을 사용하고, Secondary Outline은 `--color-brand-secondary`를 같은 방식으로 사용한다. 배경은 투명 또는 해당 프로젝트의 Surface 토큰을 사용한다.
- 기본 radius는 `var(--radius-0)`, Rounded는 `var(--radius-8)`, Full Rounded는 `var(--radius-full)`이다.
- Icon 포함형은 텍스트와 아이콘 사이에 `8px` gap을 사용한다. Xlarge에서 더 넓은 간격이 필요하면 `12px`을 사용한다.
- Icon 전용 버튼은 width와 height를 같은 값으로 만들고 padding을 `0`으로 한다.
- Shadow 상태는 `var(--shadow-2)`를 사용한다.
- Disabled는 `background: var(--color-interaction-disable)`, `color: var(--color-label-disable)`, `box-shadow: none`, `cursor: default`를 사용하고 실제 동작도 차단한다.
- `button`, `a`, Router Link 등 태그가 달라도 같은 역할이면 동일 computed style을 적용한다.

색상 역할이 별도로 지정되지 않은 `Primary Filled Xlarge Button`의 기준 computed style은 아래와 같다. 클래스명과 코드 구조는 프로젝트에 맞게 바꿀 수 있지만 속성 결과는 동일해야 한다.

```css
.btn_primary_filled_xlarge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-weight: var(--font-weight-500);
    white-space: nowrap;
    appearance: none;
    cursor: pointer;
    min-height: var(--size-60);
    padding: 0 var(--spacing-padding-horizontal-24);
    font-size: var(--font-size-16);
    line-height: var(--line-height-20);
    border: 0;
    border-radius: var(--radius-0);
    background: var(--color-brand-primary);
    color: var(--color-brand-on-primary);
}
```

#### Tab

- 기본 레이아웃은 Button과 동일하되 Small부터 Xlarge까지 Tab 사이즈 표를 사용한다.
- Filled default는 `background: var(--color-fill-normal)`, `color: var(--color-label-normal)`을 기본값으로 삼는다.
- Active는 역할 색상 배경과 대비 텍스트를 사용한다.
- Outline은 `1px solid var(--color-common-0)`, Gray Line Outline은 `1px solid var(--color-line-normal-normal)`을 사용한다.
- Disabled는 Interaction/Label disable 토큰을 사용하고 `cursor: default`로 바꾼다.
- active 표현만으로 선택 상태를 전달하지 말고 `aria-selected`와 연결된 panel을 함께 갱신한다.

#### Text Input

- 외곽 또는 입력 자체는 `display: inline-flex`, `align-items: center`, `width: 100%`, `min-width: 0`, `cursor: text`를 기본으로 한다.
- Filled는 `border: 0`, `background: var(--color-fill-normal)`을 사용한다.
- Outline은 `border: 1px solid var(--color-line-solid-0)`, Surface 배경을 사용한다.
- Rounded와 Full Rounded는 각각 `var(--radius-8)`, `var(--radius-full)`을 사용한다.
- Focus는 보더 또는 배경 강도를 높이고 `:focus-visible` 포커스 링을 제공한다.
- Complete와 Password처럼 후행 아이콘이 있는 상태는 `8px` column-gap과 아이콘 공간을 확보한다.
- Error는 Negative 계열 Semantic Color, Disabled는 Interaction/Label disable 토큰을 사용한다.
- View/Readonly는 편집 가능한 입력과 시각·동작 상태를 구분한다.

#### Textarea

- `display: block`, `width: 100%`, `min-width: 0`, `resize: vertical`, `cursor: text`를 기본으로 한다.
- Filled/Outline과 radius 변화는 Text Input 규칙을 따른다.
- `outline: 0`을 사용하면 반드시 별도의 `:focus-visible` 스타일을 제공한다.
- 글자 수 표시, validation 메시지와 자동 높이 기능은 입력 영역 밖의 구조로 제공하되 상태 색상은 Semantic Color를 사용한다.

#### Select

- Native select는 `width: 100%`, `appearance: none`, `cursor: pointer`를 기본으로 한다.
- Filled/Outline과 radius 체계는 Text Input과 동일하다.
- 기본 화살표는 두 개의 linear-gradient 또는 프로젝트 아이콘을 사용하며 `background-repeat: no-repeat`로 중복을 막는다.
- 기본 화살표 geometry는 `6px × 6px`, 우측 위치는 `calc(100% - 18px)`과 `calc(100% - 12px)`을 기준으로 한다.
- 왼쪽 아이콘 포함형은 Small `40px`, Medium `48px`, Large/Xlarge `56px`의 padding-left를 확보하고 아이콘은 4px 배수 크기를 사용한다.
- Open은 `aria-expanded="true"`, Disabled는 실제 `disabled` 또는 동작 차단된 `aria-disabled` 상태와 함께 표현한다.

#### Chip과 Badge

- `inline-flex`, 중앙 정렬, `white-space: nowrap`, `vertical-align: middle`을 기본으로 한다.
- Chip은 상호작용 여부에 따라 `cursor: pointer` 또는 `default`를 명시한다.
- Filled는 역할 색상 배경, Outline은 `1px solid` 역할 색상, Gray Line은 `var(--color-line-normal-normal)`을 사용한다.
- radius는 기본적으로 `var(--radius-full)`을 사용한다.
- 삭제 가능한 Chip은 삭제 버튼에 별도 접근 가능한 이름을 제공한다.
- Badge는 의미 전달용이므로 기본적으로 비상호작용 요소를 사용하고 상태를 색상만으로 전달하지 않는다.

#### Toggle, Checkbox와 Radio

- Reset에서는 외형을 만들지 않고 독립 컴포넌트에서 `appearance: none`과 상태 스타일을 적용한다.
- Checkbox와 Radio는 실제 input을 유지하고 `checked`, `indeterminate`, `disabled`, `focus-visible` 상태를 구현한다.
- Toggle은 내부 knob가 track padding을 제외한 크기를 사용하며 on 상태에서 반대쪽으로 이동한다.
- 크기, 보더, radius와 상태 색상은 Foundation 토큰을 사용한다.
- Checkbox는 사각형 또는 프로젝트 radius, Radio와 Toggle은 `var(--radius-full)`을 기본으로 한다.

### 8.6 콘텐츠 모듈 기준

| Module | 레이아웃 기준 |
| --- | --- |
| Post Link | `display: flex`, `align-items: center`, `gap: 16px`, `min-height: 60px`, `padding: 0 24px`, 긴 제목 말줄임과 Badge 조합 지원 |
| Information Box | `display: flex`, `flex-direction: column`, `width: 100%`, `border-radius: 40px`, `padding: 40px 32px` |
| Accordion | 바깥 `overflow: hidden`, header `display: flex`, `justify-content: space-between`, `padding: 32px 40px`, panel `padding: 0 48px 48px` |
| Information Table | 실제 table 요소, `width: 100%`, 명확한 `th/td/scope`, 작은 화면에서는 overflow wrapper 사용 |

모듈의 색상과 글자색은 고정하지 않고 프로젝트의 Semantic Color를 사용한다. Accordion은 `aria-expanded`, `aria-controls`, 키보드 조작과 focus 이동을 구현한다.

## 9. 의미론과 접근성

- 동작 실행은 `button`, 경로 이동은 `a`를 사용한다.
- 제출 목적이 아닌 버튼에는 `type="button"`을 지정한다.
- `a > button`, `button > a`와 클릭 가능한 `div`, `span`을 사용하지 않는다.
- 아이콘 전용 컨트롤에는 접근 가능한 이름을 제공한다.
- 장식 아이콘은 보조 기술에서 숨긴다.
- 모든 인터랙티브 요소에 `:focus-visible` 상태를 제공한다.
- disabled처럼 보이는 상태는 실제 `disabled`, `readonly`, `aria-disabled`와 동작 차단을 함께 처리한다.
- label을 placeholder로 대체하지 않는다.
- Checkbox, Radio, Toggle은 키보드와 label 연결을 유지한다.
- Checkbox를 시각적으로 숨기더라도 조작 가능한 입력을 `display: none`으로 제거하지 않는다.
- Tab은 `role`, `aria-selected`, `aria-controls`와 키보드 이동을 구현한다.
- 데이터 표는 실제 `table`, `thead`, `tbody`, `th`, `td`, `scope`를 사용한다.

## 10. JavaScript 동작 훅

- JavaScript 동작은 가능한 한 `data-*`, ARIA, `name`, `id`를 사용한다.
- 스타일 클래스 변경 전에 `querySelector`, `querySelectorAll`, `closest`, `matches`, `classList` 사용처를 확인한다.
- 상태 변경은 `data-state`, `aria-expanded`, `aria-selected`, `hidden`을 우선한다.
- 외부 라이브러리가 요구하는 클래스명은 임의로 변경하지 않는다.

## 11. 프레임워크와 Cascade

- Plain CSS는 `foundation.css → reset.css → utilities.css → main.css 또는 sub.css` 순서로 로드한다.
- Tailwind CSS에서도 5개 소스 파일의 책임을 유지한다. `foundation.css`의 토큰과 `reset.css`의 Reset은 `@layer base`, `utilities.css`는 `@layer utilities`, 페이지 스타일은 `main.css` 또는 `sub.css`의 `@layer components`에 둔다.
- Tailwind 프로젝트에서 Reset을 unlayered CSS로 두지 않는다.
- CSS Modules와 scoped style 안에 `:root`, `html`, `body`, 전역 Reset을 넣지 않는다.
- CSS Modules, scoped style과 CSS-in-JS를 사용하는 프로젝트도 5개 전역 CSS 파일을 앱 루트에서 한 번 로드하고 공통 컴포넌트의 지역 스타일만 해당 기술로 관리한다.
- SSR에서는 서버와 클라이언트의 스타일 로드 순서를 동일하게 유지한다.
- Portal, Shadow DOM, iframe 안에서도 필요한 토큰과 Reset이 전달되는지 확인한다.

## 12. 금지사항

- Reset의 초기화 값을 제외한 신규 `margin`
- `html`, `body`의 스크롤바를 전역에서 강제로 숨기는 Reset
- Foundation에 없는 임의 색상, 간격, 타이포그래피, 반경, 보더, 그림자
- 실제 alpha가 없는 중복 `--color-opacity-*` 토큰
- 13px font-size 및 line-height 계층
- 기존 breakpoint 조사 없이 새 반응형 분기 체계를 병행하는 구현
- 컴포넌트 파일에서 전역 토큰 재정의
- 중복 Reset
- 컴포넌트 필수 스펙을 유틸 조합에만 의존하는 구현
- SCSS map, `@each` 또는 동적 생성 코드로만 제공되는 복사 불가능한 유틸리티 목록
- `font-size`만 변경하는 `.fs_*` 유틸리티
- `.gap_0`, `.p_0`, `.px_0`, `.py_0` 같은 0 간격 유틸리티
- Cascade 문제를 덮기 위한 무분별한 `!important`
- `btn_base + size_large + variant_filled` 같은 공개 조합 클래스 강제
- 스타일 클래스와 JavaScript 동작 훅의 불필요한 결합
- 외부 라이브러리 클래스 임의 변경
- 접근성을 제거하는 태그 변경
- Reset에서 Checkbox, Radio, Toggle의 외형을 고정하는 규칙
- 사용자 메인·서브 색상과 동일한 값을 `--color-main`, `--primary-color`, `--sub-color`처럼 다른 이름으로 중복 선언하는 방식
- 사용자 입력 색상을 `50`이 아닌 다른 단계로 배치하거나 정의된 보간 비율을 임의로 바꾸는 방식
- 표준 단계 외의 추가 단계, accent 또는 별도 색상군을 사용자 요청 없이 생성하는 방식
- `foundation.css`에 토큰 이외의 Reset, 클래스 또는 페이지 스타일을 넣는 방식
- `reset.css`에 3장의 Reset 외 토큰, 유틸리티, 컴포넌트 또는 페이지 스타일을 넣는 방식
- `utilities.css`에 특정 화면·섹션·컴포넌트 전용 스타일을 넣거나 전역 토큰을 재정의하는 방식
- `main.css`와 `sub.css`의 코드를 서로 섞거나 두 파일을 모든 페이지에 무조건 함께 로드하는 방식

## 13. 생성 및 검수 체크리스트

- `foundation.css`, `reset.css`, `utilities.css`, `main.css`, `sub.css` 5개 파일이 생성됐는가
- `foundation.css`에는 전역 토큰만, `reset.css`에는 3장의 Reset만, `utilities.css`에는 재사용 유틸리티만 있는가
- `main.css`에는 메인 화면 코드만, `sub.css`에는 세부 페이지 코드만 있으며 서로의 선택자가 섞이지 않았는가
- 로드 순서가 `foundation.css → reset.css → utilities.css → 해당 페이지 CSS`인가
- 모든 Foundation 토큰이 전역에서 한 번 정의됐는가
- 공개 토큰마다 대응 유틸리티가 있는가. 단, font-size 토큰은 타이포그래피 조합 클래스, breakpoint 토큰은 media query 기준에서 사용하는가
- 유틸리티가 SCSS 반복문 없이 개별 CSS 클래스로 명시되어 있는가
- `.gap_4`~`.gap_120`, `.px_4`~`.px_120`, `.py_4`~`.py_120`이 4px 단위로 각각 30개 존재하는가
- `.icon_8`~`.icon_64`가 4px 단위로 존재하고 각각 동일 크기의 `--size-*` 토큰을 참조하는가
- 0 간격 유틸리티와 `.fs_*` 유틸리티가 없는가
- 컬러 토큰에 미정의 참조와 중복 선언이 없는가
- 초기 Foundation에 Common 2개, Neutral/Cool Neutral 40개, 비브랜드 Semantic 55개로 구성된 고정 컬러 토큰 97개가 모두 있는가
- Neutral과 Cool Neutral의 원본 단계가 전부 존재하며 `95`, `97`, `99`와 Cool Neutral의 `96`, `98`이 누락되지 않았는가
- 고정 컬러 토큰 97개의 값이 `designSystem-v2.html` 원본과 일치하고 291개의 글자색·배경색·보더색 유틸리티가 연결됐는가
- 초기 공통 세트에 `_artkorealab`, `_newstant`, `--color-newsroll-*` 등 프로젝트·브랜드 전용 토큰이 섞이지 않았는가
- 구현 전에 사용자에게 메인 색상(필수)과 서브 색상(선택)을 확인했는가
- 사용자 메인 색상이 보정 없이 `--color-brand-primary-50`에 설정되고 표준 13단계가 모두 생성됐는가
- `.color_brand_primary`, `.bg_brand_primary`, `.border_color_brand_primary`가 50 단계 별칭을 사용하고, 각 단계별 3종 유틸리티가 해당 번호 토큰을 참조하는가
- 새로운 비중립 서브 색상을 제공받았다면 보정 없이 `--color-brand-secondary-50`에 설정되고 표준 13단계와 단계별 3종 유틸리티가 모두 생성됐는가
- 서브 색상이 Neutral 또는 Cool Neutral이면 `--color-brand-secondary`가 기존 50 단계를 참조하고, 중복되는 `--color-brand-secondary-0~100` 토큰 및 단계별 secondary 유틸리티를 만들지 않았는가
- 서브 색상을 제공받지 않았다면 `--color-brand-secondary`만 `--color-brand-primary`를 참조하고 번호가 붙은 secondary 토큰이나 유틸리티를 만들지 않았는가
- `0`과 `100`이 각각 검정과 흰색이며 나머지 단계가 정의된 OKLCH 보간 비율을 따르는가
- `--color-brand-on-primary`가 메인 색상 위에서 충분한 텍스트·아이콘 대비를 제공하는가
- `--color-brand-on-secondary`가 서브 색상 위에서 충분한 텍스트·아이콘 대비를 제공하는가
- 미사용 컬러 토큰을 검사하고 Atomic 팔레트와 실제 불필요 토큰을 구분했는가
- Reset이 중복 적용되지 않는가
- 기존 Reset이 있다면 충돌 비교 후 병합했는가
- Reset이 `*`, `*::before`, `*::after`에 `box-sizing: border-box`를 적용하는가
- 전역 스크롤바를 강제로 숨기지 않는가
- Reset에서 Checkbox, Radio, Toggle 외형을 강제하지 않는가
- 신규 프로젝트는 Pretendard를 사용하고, 기존 프로젝트는 `--font-sans`를 기존 기본 글꼴에 맞게 재정의했는가
- 13px 타이포그래피 토큰과 클래스가 없는가
- 투명 색상은 실제 alpha가 포함된 Semantic Color이고 불투명한 중복 `--color-opacity-*`가 없는가
- 미정의 `var(--*)` 참조가 없는가
- 신규 `margin` 선언이 없는가
- 색상과 수치가 토큰 범위 안에 있는가
- 클래스명이 소문자 `snake_case`인가
- `middle` 대신 `fixed` 또는 `medium`의 올바른 의미를 사용했는가
- 크기 순서가 `small → medium → large → xlarge`인가
- spacing, 컴포넌트 외곽 크기와 breakpoint가 4px 배수인가
- 기존 반응형 체계가 없다면 `1260px`, `992px`, `576px` 참고 기준을 일관되게 적용했는가
- `prefers-reduced-motion: reduce` 예외가 있는가
- 컴포넌트의 핵심 스펙이 유틸리티에만 의존하지 않는가
- 메인 색상이 확정된 뒤 공통 컴포넌트를 만들었으며 Button·Chip·Badge의 Primary Filled처럼 원본에서 Primary 색상을 쓰는 위치만 `--color-brand-primary`와 `--color-brand-on-primary`를 사용하는가
- Tab 기본 Filled, Text Input, Textarea, Select의 Semantic Fill·Label 색상을 Primary 색상으로 임의 교체하지 않았는가
- Secondary가 명시된 경우 원본의 Primary 색상 위치만 `--color-brand-secondary`와 `--color-brand-on-secondary`로 교체하고, 컴포넌트 CSS에 프로젝트 HEX/RGB 값을 직접 고정하지 않았는가
- Filled·Rounded·Full Rounded·Outline의 border와 radius가 해당 컴포넌트의 Variant 표와 일치하며 다른 컴포넌트 규칙을 섞지 않았는가
- Button, Tab, Text Input, Textarea, Select, Chip, Badge, Toggle, Checkbox, Radio와 Content Module의 필요한 variant·state·size가 8장의 기준과 일치하는가
- JavaScript 셀렉터와 테스트가 클래스 변경을 반영했는가
- focus, disabled, readonly, error 상태가 구현됐는가
- 태그와 ARIA가 의미에 맞는가
- 폰트와 아이콘 경로가 실제 빌드 환경에서 유효한가
- Tailwind 사용 시 Cascade Layer가 올바른가
- CSS 중괄호, HTML 구조, UTF-8 인코딩이 정상인가

## 14. AI 적용 지시문

이 문서를 전달받은 AI는 다음 순서를 따른다.

구현을 시작하기 전에 사용자가 이미 색상을 명시했는지 확인한다. 명시하지 않았다면 반드시 `메인 색상(필수, HEX 또는 RGB)`과 `서브 색상(선택, HEX 또는 RGB 또는 없음)`을 먼저 질문한다. 메인 색상은 반드시 답을 받은 뒤 브랜드 토큰을 확정하고, 서브 색상은 사용자가 제공한 경우에만 별도 값으로 설정한다.

1. 기존 프로젝트의 스타일 구조와 프레임워크를 먼저 조사한다.
2. 클래스, 토큰, Reset, 유틸, JavaScript 의존성 인벤토리를 만든다.
3. 기존명에서 표준명으로 가는 변경표를 제시한다.
4. 기존 전역 스타일이 있으면 Reset을 통째로 덮어쓰지 않는다.
5. 신규 프로젝트는 Pretendard를 기본으로 사용하고 기존 프로젝트는 `--font-sans`를 기존 기본 글꼴에 맞게 재정의한다.
6. 프로젝트 구조에 맞는 위치에 `foundation.css`, `reset.css`, `utilities.css`, `main.css`, `sub.css`를 만들고 2.1장의 책임과 로드 순서를 적용한다.
7. 초기 Foundation에 Common, Neutral, Cool Neutral과 비브랜드 Semantic으로 구성된 고정 컬러 토큰 97개 및 대응 유틸리티 291개를 원본 값 그대로 생성한다.
8. 메인 색상은 `--color-brand-primary-50`에 원본 그대로 설정하고 표준 13단계와 단계별 글자색·배경색·보더색 유틸리티를 생성한다. 서브 색상이 새로운 비중립 색상일 때만 같은 방식의 secondary 단계 토큰과 유틸리티를 생성한다. Neutral 또는 Cool Neutral이면 기존 계열을 재사용하고, 서브 미입력 시에는 `--color-brand-secondary`만 primary를 참조하게 한다.
9. 나머지 Foundation 토큰은 `foundation.css`, 모든 재사용 유틸리티는 `utilities.css`에 준비하고 컴포넌트가 이를 사용하게 한다.
10. 3장의 Reset 코드를 `reset.css`에 그대로 넣고 전역 스크롤바를 숨기거나 Checkbox, Radio, Toggle의 외형을 추가하지 않는다.
11. 메인 전용 스타일은 `main.css`, 세부 페이지 전용 스타일은 `sub.css`에만 작성한다.
12. 토큰에 없는 값을 임의로 만들지 않으며 13px 타이포그래피 계층과 가짜 `--color-opacity-*` 토큰을 만들지 않는다.
13. 유틸리티는 SCSS 반복 생성이 아니라 복사 가능한 개별 CSS 클래스로 작성한다.
14. font-size 단독 유틸리티와 0 간격 유틸리티를 만들지 않는다.
15. 기존 breakpoint가 없으면 `1260px`, `992px`, `576px` 참고 기준과 reduced-motion 예외를 적용한다.
16. 모든 컴포넌트는 8장의 컴포넌트별 variant·state·size·layout 기준을 사용한다. Button·Chip·Badge의 Primary Filled처럼 원본이 Primary 색상을 쓰는 위치만 브랜드 역할 토큰으로 연결하며, Tab·폼 컴포넌트의 Semantic Fill·Label·Line 토큰은 유지한다. Filled 요청에 Rounded radius를 섞거나 다른 컴포넌트의 규칙을 재사용하지 않는다.
17. 실제 코드 구조는 프로젝트에 맞게 선택하되 최종 시각 스펙과 접근성은 이 문서를 따른다.
18. 구현 후 토큰, 파일 책임, 클래스, JavaScript 셀렉터, 반응형, 접근성을 검수한다.
