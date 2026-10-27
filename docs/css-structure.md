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
  index.css
  reset.css                      선택 적용
  typography/
    index.css
    ko.css
    en.css
  components/
    index.css
    behavior.css                 실제 조작에 필요한 공통 보완
    common/
      index.css
      base.css                   표시·정렬·박스·기본 글꼴 상속
      size.css                   동일한 높이·너비·패딩
      shape.css                  동일한 반경
      content.css                글자 규격·아이콘 크기·간격
      appearance.css             동일한 배경·테두리·색상 등
      input-state.css            오류·입력 포커스·읽기 전용·완료·문구 색상
      interaction-state.css      비활성화·hover·active·키보드 포커스·체크·선택
    Button/
      Button.css
      IconButton.css
      TextButton.css
    Tab/Tab.css
    TextInput/TextInput.css
    UnderlineTextInput/UnderlineTextInput.css
    TextArea/TextArea.css
    AutoHeightTextArea/AutoHeightTextArea.css
    Select/Select.css
    Chip/
      Chip.css
      ContentTag.css
    Hashtag/Hashtag.css
    Badge/Badge.css
    Toggle/Toggle.css
    Checkbox/Checkbox.css
    Radio/Radio.css
    Field/Field.css
    Pagination/Pagination.css
```

공통 파일에는 실제 값과 적용 조건이 같은 규칙만 모았습니다. 같은 medium이라도 컴포넌트에 따라 글자·패딩·높이가 다르면 각 규격을 유지합니다. Text는 별도 외형 CSS를 복제하지 않고 typography 클래스를 사용합니다.

상태의 색상·테두리·커서·포커스 표시를 각 컴포넌트 파일에 복제하지 않습니다. 입력 상태는 `common/input-state.css`, 여러 인터랙션 요소가 공유하는 상태는 `common/interaction-state.css`에서 관리하며 컴포넌트 기본 스타일 다음에 불러옵니다. 상태 이름이 같아도 기존 규격이 다른 경우(예: 투명한 아이콘 버튼의 disabled, 검정/파랑 포커스 표시)는 공통 파일 안에서 적용 대상을 구분합니다. 체크 표시의 구조, 토글 손잡이 이동 거리, 선택된 페이지의 글자 굵기 등 고유 표현은 각 컴포넌트 파일에 유지합니다.

Filled TextInput·TextArea의 오류 배경 `red-95`와 placeholder `red-70`은 같은 공통 규칙에서 지정합니다. `appearance.css`의 placeholder 규칙은 `--h_designSystem-placeholder-color`가 있으면 해당 색상을 사용하고, 없으면 기존 색상을 사용합니다. Outline·비활성화·읽기 전용과 실제 입력값의 글자색은 기존 규격을 유지합니다. Select의 빈 값 안내는 빈 `option`의 선택 상태로 구분하며, 컴포넌트에 지정된 placeholder 색상을 사용합니다. Select·UnderlineTextInput·AutoHeightTextArea에 없던 오류 배경은 새로 추가하지 않습니다.

컴포넌트의 `data-spec`은 원래 규격과 CSS를 연결하는 내부 식별자입니다. React를 사용할 때 직접 작성할 필요가 없습니다. 공통 CSS는 등록된 식별자의 접두사·접미사로 같은 규격을 묶으며, 가상의 Control 컴포넌트는 없습니다. 새 규격을 추가할 때는 공통 선택자가 새 식별자에 적용되는지도 확인합니다.

4배수 길이는 `--h_designSystem-unit-*`를 사용합니다. 1px·2px·10px·14px·15px·18px·9999px 등 기존 예외는 그대로 유지합니다. margin은 사용하지 않습니다. 아이콘은 `packages/foundation/src/icons`의 SVG 파일을 컴포넌트가 사용합니다.
