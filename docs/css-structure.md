# CSS 관리 위치

숫자·색상 변수 선언은 Tokens, 실제 스타일 규칙은 Foundation에서 관리합니다. UI의 styles.css는 Foundation을 불러오는 진입점입니다.

```text
packages/tokens/src/
  index.css
  unit.css
  color/
    index.css
    atomic.css
    semantic.css
    aliases.css

packages/foundation/src/style/
  index.scss                    전체 클래스 기반 CSS
  base.scss                     토큰·타이포그래피·슬롯 자산
  shadow.scss                   내부 타이포그래피·컴포넌트 스타일
  reset.css                      선택 적용
  typography/
    index.scss
    base.css                     국문·영문 공통 굵기·행간·자간
    en.css                       영문에서 다른 행간만 지정
    size.scss                    고정 타이포그래피와 컴포넌트 글자 크기
  components/
    index.scss
    common/
      index.scss
      host.css                   웹 태그 표시·hidden·Shadow 슬롯
      base.css                   표시·정렬·박스·기본 글꼴 상속
      size.scss                  동일한 높이·너비·패딩
      _size-rules.scss           고정 크기 Map을 CSS로 만드는 공통 Mixin
      shape.css                  동일한 반경
      content.css                글자 굵기·행간·공통 간격
      appearance.css             동일한 배경·테두리·색상 등
      states/
        index.scss               상태 적용 순서
        input.css                입력 완료·포커스·오류·읽기 전용
        hover.css                마우스 올림
        checked.css              체크 상태
        focus.css                키보드 포커스
        disabled.css             비활성화
        active.css               누르는 동안
        selected.css             선택 상태
    Button/
      Button.scss
      IconButton.scss
      TextButton.scss
    Tab/Tab.scss
    TextInput/TextInput.scss
    UnderlineTextInput/UnderlineTextInput.css
    TextArea/TextArea.scss
    AutoHeightTextArea/AutoHeightTextArea.scss
    Select/Select.scss
    Chip/
      Chip.css
      ContentTag.scss
    Hashtag/Hashtag.css
    Badge/Badge.css
    Toggle/Toggle.scss
    Checkbox/Checkbox.scss
    Radio/Radio.scss
    Field/Field.css
```

공통 파일에는 실제 값과 적용 조건이 같은 규칙만 모았습니다. 같은 medium이라도 컴포넌트에 따라 글자·패딩·높이가 다르면 각 규격을 유지합니다. Text는 별도 외형 CSS를 복제하지 않고 typography 클래스를 사용합니다.

상태의 색상·테두리·커서·포커스 표시를 각 컴포넌트 파일에 복제하지 않습니다. 입력 상태는 `common/states/input.css`, 그 밖의 상태는 `common/states/`의 해당 파일에서 관리하며 컴포넌트 기본 스타일 다음에 불러옵니다. Field 문구 색상은 `Field/Field.css`에서 관리합니다. 상태 이름이 같아도 기존 규격이 다른 경우(예: 투명한 아이콘 버튼의 disabled, 검정/파랑 포커스 표시)는 적용 대상을 구분합니다. 체크 표시의 구조, 토글 손잡이 이동 거리, 탭의 배치 등 고유 표현은 각 컴포넌트 파일에 유지합니다.

Filled TextInput·TextArea의 오류 배경 `red-95`와 placeholder `red-70`은 같은 공통 규칙에서 지정합니다. `appearance.css`의 placeholder 규칙은 `--h_designSystem-placeholder-color`가 있으면 해당 색상을 사용하고, 없으면 기존 색상을 사용합니다. Outline·비활성화·읽기 전용과 실제 입력값의 글자색은 기존 규격을 유지합니다. Select의 빈 값 안내는 빈 `option`의 선택 상태로 구분하며, 컴포넌트에 지정된 placeholder 색상을 사용합니다. Select·UnderlineTextInput·AutoHeightTextArea에 없던 오류 배경은 새로 추가하지 않습니다.

컴포넌트의 `data-spec`은 옵션 이름과 CSS를 연결하는 내부 문자열입니다. `shared/style-id.ts`가 `filled`, `rounded`, `medium` 등을 조합하며 별도의 규격 번호나 전체 목록 조회는 없습니다. React·웹 태그를 사용할 때 직접 작성할 필요가 없습니다. 공통 CSS는 접두사·접미사로 같은 규격을 묶으며, 가상의 Control 컴포넌트는 없습니다. `:where()`는 조건을 추가하면서 선택자 우선순위를 올리지 않기 위해 사용합니다. 새 규격을 추가할 때는 공통 선택자의 적용 대상도 확인합니다.

4배수 길이는 `--h_designSystem-unit-*`를 사용합니다. 1px·2px·10px·14px·15px·18px·9999px 등 기존 예외는 그대로 유지합니다. margin은 사용하지 않습니다. 아이콘은 `packages/foundation/src/icons`의 SVG 파일을 컴포넌트가 사용합니다.

## 고정 크기 규격과 빌드

단일 size 값은 화면 너비에 관계없이 유지합니다. 객체인 경우 프로젝트 설정 API와 공통 ResponsiveController가 기존 size를 선택합니다. 높이·패딩·아이콘 크기·위치·토글 손잡이는 크기 Map과 `common/_size-rules.scss`의 `rules` Mixin으로 관리합니다. 이 믹스인은 기본 크기 CSS만 생성합니다. 같은 외형 값을 공유하는 컴포넌트는 `common/size.scss`, 고유 값은 해당 컴포넌트 SCSS에 둡니다.

타이포그래피와 컴포넌트 글자는 기본 규격의 크기를 그대로 사용합니다. Filled IconButton은 지정한 8·12·16·20·24·28·32·40px 크기를 유지합니다. 기본 입력의 `width: 100%`와 내용에 따른 텍스트 영역 높이 계산은 원래 기능이며, 반응형과 구분되는 기존 동작입니다. UnderlineTextInput의 전체 너비 기본형은 `variant="fluid"`입니다.

`npm run build`는 Foundation의 styles.css(전체), base.css(토큰·타이포그래피), shadow.css(내부 전체 스타일)를 만든 뒤 UI를 빌드합니다. UI/styles.css는 base.css를 연결합니다. UI 내부에서는 전체 shadow.css 대신 아래의 컴포넌트별 결과물을 사용합니다. shadow.css에는 토큰 import와 페이지 reset을 넣지 않습니다. reset.css는 선택 적용입니다. 설치 파일에는 SCSS와 Sass 개발 도구가 포함되지 않습니다.

Storybook 시작 전 Foundation CSS를 빌드합니다. 스타일 원본을 수정한 경우 `npm run build --workspace=@h_designsystem/foundation`으로 다시 생성합니다. UI 동작은 소스 alias, 일반 검증 앱은 공개 빌드 결과, 최종 설치 검증은 별도 .tgz 설치로 구분합니다.

배포용 CSS는 Sass API의 `style: 'compressed'`로 생성합니다. 개발할 때는 압축된 dist 파일 대신 위의 CSS·SCSS 원본을 수정합니다. 선택자 우선순위와 규격값은 그대로 유지합니다.

## 컴포넌트별 스타일 배포

`packages/foundation/scripts/build.mjs`가 기존 SCSS를 컴파일한 다음 PostCSS로 선택자를 읽어 배포 파일을 만듭니다. 원본 공통 규격을 개별 SCSS에 복사하지 않습니다.

버튼을 예로 들면 다음과 같습니다.

1. `Button/Button.scss`의 고유 패딩·아이콘 크기를 유지합니다.
2. `common/`의 높이·반경·색상·정렬과 `common/states/`의 hover·disabled·focus 중 Button에 적용되는 규칙을 추립니다.
3. `typography/size.scss`에서 Button에 적용되는 글자 크기도 함께 추립니다.
4. 이를 기존 순서로 `foundation/dist/components/Button.css`에 출력합니다. Select·TextInput 등의 고유 디자인은 포함하지 않습니다.
5. 일반 호스트·슬롯·아이콘 배치는 `dist/components/common.css`로 한 번 출력합니다.
6. `ui/src/components/Button/Button.ts`는 Button.css를 import하고 `shared/styles.ts`에서 공통 CSSResult와 조합합니다. 같은 컴포넌트의 여러 인스턴스는 같은 스타일 객체를 사용합니다.

쉼표로 나열한 최상위 선택자는 필요한 부분만 남깁니다. `:is()`·`:where()`·`:has()` 내부는 우선순위를 보존하기 위해 수정하지 않습니다. 따라서 Button.css의 **공통 높이 규칙**에 다른 컴포넌트 이름이 남을 수 있지만, 그 컴포넌트의 전체 CSS를 가져오는 것은 아닙니다. 등록되지 않은 컴포넌트 이름이 CSS에 추가되면 빌드 오류로 알려 누락을 방지합니다.

`Text.css`도 새 디자인 원본이 아니라 기존 typography 규칙에서 생성한 결과물입니다. Foundation의 기존 전체 CSS 진입점은 계속 제공합니다. 설치하는 프로젝트에서는 CSS를 컴포넌트마다 직접 import하거나 Sass를 설치할 필요가 없습니다.

React 공개 진입점의 미사용 export는 소비 프로젝트의 프로덕션 빌드에서 제거할 수 있도록 구성했습니다. 실제 태그 등록은 React가 해당 요소를 DOM에 연결할 때 수행합니다. Vue·Svelte는 `@h_designsystem/ui/elements/button` 같은 개별 등록을 사용합니다. 기존 `@h_designsystem/ui/elements`는 호환성을 위해 전체 등록으로 유지합니다.

공통 규칙은 원본에서 한 번 관리하되 여러 컴포넌트의 배포 CSS에 필요한 부분이 반복될 수 있습니다. 선택 사용 시의 다운로드를 줄이는 변경이며, 전체 컴포넌트를 쓰거나 npm 설치 폴더 전체의 크기까지 항상 줄어든다는 뜻은 아닙니다.

## 코드를 찾는 기준

- 높이·너비·패딩: 같은 값이면 `common/size.scss`, 다르면 해당 컴포넌트 SCSS
- 상태 색상·포커스: `common/states/`의 상태 이름 파일
- 비밀번호 표시 버튼·체크박스 클릭 영역·탭 배치: 해당 컴포넌트 SCSS
- 공통 아이콘 배치: `common/content.css`. SVG 원본은 `src/icons/`
- 타이포그래피: `typography/base.css`와 `size.scss`; 영문 차이는 `en.css`

Lit .ts가 구조·동작을 구현하고 .react.tsx는 공식 React 연결의 props·이벤트·슬롯만 담당합니다. Foundation은 CSS를 담당합니다. 화면별 선택은 ui/config와 shared/responsive.ts로 처리하며 CSS 미디어쿼리의 자동 축소나 Vite 전용 플러그인을 만들지 않습니다.
