# Design System Guide

이 문서는 모든 프로젝트에서 공통으로 따라야 하는 디자인 시스템 규칙이다. 새 프로젝트를 만들 때는 이 문서의 규칙을 반드시 따르고, 아래 보일러 템플릿 구조를 유지한다. 새로운 스타일을 임의로 만들지 말고 기존 토큰과 컴포넌트를 먼저 재사용한다.

## 1. 기본 원칙

- 파운데이션 토큰은 `system/foundation`의 CSS 변수만 사용한다.
- 컴포넌트는 `system/component`의 기존 클래스를 우선 사용한다.
- 화면별 CSS는 레이아웃, 배치, 반응형, 상태 전환 보조에만 사용한다.
- 색상, 폰트 크기, 행간, radius, border, shadow, spacing 값을 새로 만들지 않는다.
- 컴포넌트 클래스명은 기존 네이밍 체계를 유지한다.
- 프로젝트 생성 시 CSS import 순서를 유지한다. 파운데이션, reset/global, layout, component 순서다.

## 2. 보일러 템플릿 구조

프로젝트는 아래 구조를 기준으로 시작한다. 파일명과 역할은 유지하고, 화면별 파일만 필요에 따라 추가한다.

```text
project-root/
  index.html
  global.css
  layout.css
  design-system.md
  system/
    foundation/
      color.css
      spacing.css
      decorate.css
      typography.css
      icons.js
      icons/
    component/
      button.css
      tab.css
      text_input.css
      textarea.css
      chip.css
      badge.css
      toggle.css
      select.css
      checkbox.css
      radio.css
```

HTML 기본 import 순서는 반드시 아래와 같이 유지한다.

```html
<link rel="stylesheet" href="./system/foundation/color.css" />
<link rel="stylesheet" href="./system/foundation/spacing.css" />
<link rel="stylesheet" href="./system/foundation/decorate.css" />
<link rel="stylesheet" href="./system/foundation/typography.css" />
<link rel="stylesheet" href="./global.css" />
<link rel="stylesheet" href="./layout.css" />
<link rel="stylesheet" href="./system/component/button.css" />
<link rel="stylesheet" href="./system/component/tab.css" />
<link rel="stylesheet" href="./system/component/text_input.css" />
<link rel="stylesheet" href="./system/component/textarea.css" />
<link rel="stylesheet" href="./system/component/chip.css" />
<link rel="stylesheet" href="./system/component/badge.css" />
<link rel="stylesheet" href="./system/component/toggle.css" />
<link rel="stylesheet" href="./system/component/select.css" />
<link rel="stylesheet" href="./system/component/checkbox.css" />
<link rel="stylesheet" href="./system/component/radio.css" />
```

## 3. 색상

색상은 의미 기반 semantic token을 우선 사용한다. atomic token은 semantic token에 없는 시각값이 꼭 필요할 때만 사용한다.

### 3.1 사용 우선순위

1. Semantic token: UI 의미가 명확한 기본 선택지
2. Status token: 성공, 경고, 오류 같은 상태 표현
3. Brand token: 브랜드 전용 화면이나 캠페인 화면
4. Atomic token: 색상 팔레트 자체를 보여주거나 semantic token으로 표현할 수 없는 경우

### 3.2 핵심 semantic token

텍스트:

- `--color-label-strong`: 가장 강한 제목, 핵심 수치
- `--color-label-normal`: 기본 본문
- `--color-label-neutral`: 보조 본문
- `--color-label-alternative`: 약한 설명
- `--color-label-assistive`: placeholder, hint
- `--color-label-disable`: 비활성 텍스트

배경:

- `--color-background-normal-normal`: 기본 흰 배경
- `--color-background-normal-alternative`: 약한 섹션 배경
- `--color-background-elevated-normal`: 떠 있는 면의 기본 배경
- `--color-background-elevated-alternative`: 떠 있는 면의 보조 배경
- `--color-inverse-background`: 어두운 반전 영역

면 채움:

- `--color-fill-normal`: 기본 filled control 배경
- `--color-fill-alternative`: 더 약한 filled 배경
- `--color-fill-strong`: focus 또는 강조된 filled 배경

라인:

- `--color-line-normal-alternative`: 매우 약한 구분선
- `--color-line-normal-neutral`: 보통 구분선
- `--color-line-normal-normal`: 기본 외곽선
- `--color-line-normal-strong`: 강한 구분선
- `--color-line-solid-normal`: solid 외곽선
- `--color-line-solid-strong`: 강한 solid 외곽선

상태:

- `--color-status-positive`: 성공
- `--color-status-cautionary`: 주의
- `--color-status-negative`: 오류
- `--color-interaction-disable`: 비활성 배경
- `--color-interaction-inactive`: 비활성 아이콘 또는 보조 상태

주요 액션:

- 기본 primary action은 `--color-blue-50`을 사용한다.
- hover/pressed 계열은 기존 컴포넌트의 `--color-blue-40` 패턴을 따른다.
- inverse UI에서는 `--color-inverse-primary`, `--color-inverse-label`을 사용한다.

### 3.3 금지 색상 사용

- CSS에 `#0066ff`, `#ffffff`, `rgb(...)` 같은 직접 값을 새로 쓰지 않는다.
- 기존 토큰과 같은 값이라도 하드코딩하지 않는다.
- 임의의 브랜드 색을 추가하지 않는다. 필요한 경우 `color.css`에 토큰 설계가 먼저 필요하다.
- 상태 색을 단순 장식용으로 쓰지 않는다. 빨강은 오류, 초록은 성공, 주황은 주의 의미를 가진다.

## 4. 폰트

기본 글꼴은 `global.css` 기준을 따른다.

```css
font-family: "Noto Sans KR", "Apple SD Gothic Neo", "Malgun Gothic", sans-serif;
```

### 4.1 타입 스케일

| Role | Class | Size | Line height | Weight |
| --- | --- | ---: | ---: | ---: |
| Display 1 | `.type-display_1` | 60px | 64px | 400 |
| Display 2 | `.type-display_2` | 48px | 52px | 400 |
| Display 3 | `.type-display_3` | 40px | 44px | 400 |
| Headline 1 | `.type-headline_1` | 32px | 40px | 400 |
| Headline 2 | `.type-headline_2` | 28px | 36px | 400 |
| Headline 3 | `.type-headline_3` | 24px | 32px | 400 |
| Title 1 | `.type-title_1` | 20px | 28px | 500 |
| Title 2 | `.type-title_2` | 18px | 26px | 500 |
| Body 1 | `.type-body_1` | 16px | 24px | 400 |
| Body 2 | `.type-body_2` | 15px | 22px | 400 |
| Label 1 | `.type-label_1` | 14px | 20px | 500 |
| Caption 1 | `.type-caption_1` | 12px | 16px | 500 |
| Caption 2 | `.type-caption_2` | 11px | 16px | 500 |
| Caption 3 | `.type-caption_3` | 10px | 14px | 500 |

### 4.2 폰트 사용 규칙

- 페이지 최상위 제목은 `Display` 또는 `Headline` 중 하나를 사용한다.
- 섹션 제목은 보통 `Headline_3`, `Title_1`, `Title_2`를 사용한다.
- 본문은 `Body_1` 또는 `Body_2`를 사용한다.
- 버튼, 탭, 칩, 폼 label은 기존 컴포넌트 클래스의 폰트 스타일을 따른다.
- 14px는 `Label_1`이다.
- 12px 이하 보조 정보는 `Caption_1`, `Caption_2`, `Caption_3`을 사용한다.
- 13px 폰트 토큰은 사용하지 않는다.
- `115px`, `13px`, `Label_2`, `Title_3`, `Body_3`, `Display_4` 타입은 만들지 않는다.

## 5. Spacing

간격은 `spacing.css` 토큰만 사용한다.

### 5.1 Padding token

- Horizontal: `--spacing-padding-horizontal-4`, `12`, `16`, `24`, `32`, `40`, `60`
- Vertical: `--spacing-padding-vertical-4`, `8`, `12`, `16`, `24`, `32`, `40`, `60`

### 5.2 Margin token

- Horizontal: `--spacing-margin-horizontal-4`, `12`, `16`, `24`, `32`, `40`, `60`
- Vertical: `--spacing-margin-vertical-4`, `8`, `12`, `16`, `24`, `32`, `40`, `60`

### 5.3 Gap token

- Horizontal: `--spacing-gap-horizontal-4`, `8`, `16`, `20`, `24`, `32`, `40`, `60`
- Vertical: `--spacing-gap-vertical-4`, `8`, `16`, `20`, `24`, `32`, `40`, `60`

### 5.4 간격 사용 규칙

- 인접한 작은 요소 간격은 4, 8을 사용한다.
- 폼 필드 내부와 버튼 내부 간격은 기존 컴포넌트 클래스를 우선한다.
- 카드 내부 padding은 16, 24, 32 중에서 선택한다.
- 페이지 섹션 간격은 40 또는 60을 우선한다.
- 화면 양옆 여백은 모바일 16, 태블릿 24, 데스크톱 32 또는 40을 우선한다.
- 임의의 `5px`, `10px`, `18px`, `30px` 같은 간격값을 새로 만들지 않는다.

## 6. Radius, Border, Shadow

Decoration token은 `decorate.css`를 따른다.

Radius:

- `--radius-0`: 각진 기본 컴포넌트
- `--radius-2`: 아주 작은 보정
- `--radius-8`: card, rounded field, rounded control
- `--radius-16`, `--radius-20`, `--radius-24`, `--radius-32`, `--radius-40`: 큰 표면 또는 특수 컨테이너
- `--radius-full`: chip, badge, full rounded button/input

Border:

- `--border-0-5`: 얇은 보조 라인
- `--border-1`: 기본 라인
- `--border-2`: focus 또는 강조 라인
- `--border-3`: 강한 강조가 필요한 경우

Shadow:

- `--shadow-1`: 아주 약한 elevation
- `--shadow-2`: 작은 floating surface 또는 small shadow button
- `--shadow-3`: medium floating surface 또는 medium shadow button
- `--shadow-4`: modal, popover, large elevated surface

## 7. 컴포넌트 규칙

### 7.1 공통 규칙

- 컴포넌트는 기존 CSS 클래스를 그대로 사용한다.
- 컴포넌트 내부의 색상, 높이, padding, radius를 화면 CSS에서 덮어쓰지 않는다.
- 상태는 class와 실제 HTML 속성을 함께 맞춘다. 예: disabled class를 쓰면 `disabled` 속성도 넣는다.
- icon variant는 기존 아이콘 mask 또는 background image 패턴을 따른다.
- 컴포넌트 크기 이름은 기존 체계를 사용한다: `small`, `medium`, `large`, 일부 폼은 `xlarge`.
- shape 이름은 기존 체계를 사용한다: 기본, `rounded`, `full_rounded`.
- state 이름은 기존 체계를 사용한다: `active`, `focus`, `complete`, `error`, `disabled`, `view`, `password`.

### 7.2 버튼

버튼은 `button.css` 클래스를 사용한다.

Primary button:

- Filled: `.btn_primary_filled_{size}`
- Outline: `.btn_primary_outline_{size}`
- Icon 포함: `.btn_primary_filled_icon_{size}`, `.btn_primary_outline_icon_{size}`
- Shadow 포함: `.btn_primary_filled_shadow_{size}`
- Rounded: `.btn_primary_filled_rounded_{size}`
- Full rounded: `.btn_primary_filled_full_rounded_{size}`
- Disabled: `.btn_primary_filled_disabled_{size}`와 `disabled` 속성을 함께 사용

Icon-only button:

- Filled: `.btn_icon_filled_{size}`
- Outline: `.btn_icon_outline_{size}`
- Bare: `.icon_button_bare_{size}`
- Disabled: class와 `disabled` 속성을 함께 사용

Text button:

- Text only: `.btn_text_small`, `.btn_text_medium`
- Text with icon: `.btn_text_icon_small`, `.btn_text_icon_medium`

버튼 크기 기준:

- Small: 32px height, 작은 보조 액션
- Medium: 40px height, 기본 액션
- Large: 48px height, 강조 액션
- XLarge: icon-only button 일부에서 사용

버튼 선택 규칙:

- 화면의 주 액션은 filled primary를 사용한다.
- 보조 액션은 outline 또는 text button을 사용한다.
- 같은 영역에서 primary filled 버튼을 여러 개 남발하지 않는다.
- shadow 버튼은 CTA나 떠 있는 액션에만 제한적으로 사용한다.
- 아이콘이 의미를 보완할 때만 icon variant를 쓴다. 장식용 아이콘은 넣지 않는다.

### 7.3 탭

탭은 `tab.css` 클래스를 사용한다.

- Filled: `.tab_filled_{size}`
- Outline: `.tab_outline_{size}`
- Gray line outline: `.tab_gray_line_outline_{size}`
- Active: `_active_`가 들어간 class 사용
- Disabled: `_disabled_`가 들어간 class와 `disabled` 속성 사용
- Icon: `_icon_` variant 사용
- Shape: `_rounded_`, `_full_rounded_` variant 사용

탭 규칙:

- 선택된 탭에는 `aria-selected="true"`를 넣는다.
- 탭 목록에는 `role="tablist"`, 개별 탭에는 `role="tab"` 사용을 권장한다.
- 탭은 같은 그룹 안에서 size와 shape를 섞지 않는다.

### 7.4 Text input

Text input은 `label` wrapper에 class를 주고 내부에 `input`을 둔다.

형식:

```html
<label class="text_input_filled_medium">
  <input type="text" placeholder="Placeholder" />
</label>
```

Variant:

- Fill: `text_input_filled_*`
- Outline: `text_input_outline_*`
- Shape: `_rounded_`, `_full_rounded_`
- State: `_focus_`, `_complete_`, `_error_`, `_disabled_`, `_view_`, `_password_`
- Size: `small`, `medium`, `large`, `xlarge`

폼 상태 규칙:

- Error 상태는 오류 메시지와 함께 사용한다.
- Disabled 상태는 `input disabled` 속성을 반드시 같이 넣는다.
- View 상태는 읽기 전용 표현이며 `readonly`를 같이 넣는다.
- Password variant는 `type="password"`와 함께 사용한다.

### 7.5 Textarea

Textarea는 class를 textarea 태그에 직접 적용한다.

- Filled: `.textarea_filled_{size}`
- Filled rounded: `.textarea_filled_rounded_{state}_{size}` 또는 현재 CSS의 attribute selector 패턴을 따른다.
- Outline: `.textarea_outline_{size}`
- Outline states: `.textarea_outline_focus_{size}`, `.textarea_outline_error_{size}`, `.textarea_outline_disabled_{size}`, `.textarea_outline_view_{size}`
- Size: `small`, `medium`, `large`

Textarea 규칙:

- 긴 본문 입력은 textarea를 사용하고 text input으로 대체하지 않는다.
- `resize: vertical` 기본 동작을 유지한다.
- Error, disabled, view 상태는 text input과 같은 의미로 사용한다.

### 7.6 Select

Select는 `select.css` 클래스를 select 태그에 직접 적용한다.

- Filled: `.select_filled_{size}`
- Outline: `.select_outline_{size}`
- Icon: `.select_filled_icon_{size}`
- Shape: `_rounded_`, `_full_rounded_`
- Disabled: `_disabled_` class와 `disabled` 속성 사용
- Size: `small`, `medium`, `large`

Select 규칙:

- 단일 선택에는 select를 사용한다.
- 검색, 다중 선택, 비동기 옵션이 필요하면 새 컴포넌트를 만들기 전에 기존 select 패턴을 확장할지 검토한다.
- native select arrow 스타일은 기존 CSS를 유지한다.

### 7.7 Chip, Badge

Chip:

- Filled: `.chip_filled_{size}`
- Outline: `.chip_outline_{size}`
- Gray line outline: `.chip_gray_line_outline_{size}`
- Disabled: `_disabled_` class와 `disabled` 속성 사용
- Size: `small`, `medium`, `large`

Badge:

- Filled: `.badge_filled_small`, `.badge_filled_medium`
- Outline: `.badge_outline_small`, `.badge_outline_medium`

사용 규칙:

- Chip은 선택, 필터, 토글 가능한 짧은 항목에 사용한다.
- Badge는 상태, 카운트, 분류 같은 읽기 전용 표식에 사용한다.
- Chip을 버튼처럼 주요 액션에 사용하지 않는다.
- Badge에 클릭 동작을 넣지 않는다.

### 7.8 Toggle, Checkbox, Radio

Toggle:

- Off: `.toggle_off_{size}`
- On: `.toggle_on_{size}`
- Disabled: `.toggle_disabled_{size}`
- Size: `small`, `medium`, `large`
- 내부에 `input type="checkbox"`를 둔다.

Checkbox:

- `.checkbox_small`, `.checkbox_medium`
- `.checkbox_disabled_small`, `.checkbox_disabled_medium`

Radio:

- `.radio_small`, `.radio_medium`
- `.radio_disabled_small`, `.radio_disabled_medium`

선택 컨트롤 규칙:

- Checkbox는 복수 선택 또는 독립 on/off에 사용한다.
- Radio는 같은 그룹 중 하나만 선택할 때 사용한다.
- Toggle은 즉시 적용되는 설정값에 사용한다.
- Disabled class를 쓸 때 실제 `disabled` 속성을 함께 넣는다.

## 8. 버튼, 카드, 폼, 테이블 패턴

### 8.1 버튼 패턴

단일 주요 액션:

```html
<button class="btn_primary_filled_medium" type="button">저장</button>
```

주요 액션과 보조 액션:

```html
<div class="action-row">
  <button class="btn_primary_outline_medium" type="button">취소</button>
  <button class="btn_primary_filled_medium" type="submit">저장</button>
</div>
```

```css
.action-row {
  display: flex;
  justify-content: flex-end;
  gap: var(--spacing-gap-horizontal-8);
}
```

### 8.2 카드 패턴

현재 별도 card component class는 없다. 카드는 파운데이션 토큰으로만 만든다.

권장 card 기본값:

```css
.card {
  padding: var(--spacing-padding-vertical-24) var(--spacing-padding-horizontal-24);
  border: var(--border-1) solid var(--color-line-normal-neutral);
  border-radius: var(--radius-8);
  background: var(--color-background-elevated-normal);
  box-shadow: var(--shadow-1);
}
```

카드 규칙:

- 카드 radius는 기본 `--radius-8`을 사용한다.
- 내부 여백은 16, 24, 32 중에서 선택한다.
- 카드 안에 또 다른 카드 형태의 큰 박스를 중첩하지 않는다.
- 목록형 카드는 같은 padding, 같은 border, 같은 heading scale을 유지한다.
- 클릭 가능한 카드라면 전체 카드에 focus 스타일을 제공한다.

### 8.3 폼 패턴

폼 기본 구조:

```html
<form class="form-stack">
  <div class="field">
    <label class="field-label" for="email">이메일</label>
    <label class="text_input_outline_medium">
      <input id="email" type="email" placeholder="name@example.com" />
    </label>
  </div>

  <div class="field">
    <label class="field-label" for="role">권한</label>
    <select id="role" class="select_outline_medium">
      <option>관리자</option>
      <option>멤버</option>
    </select>
  </div>

  <button class="btn_primary_filled_medium" type="submit">초대</button>
</form>
```

```css
.form-stack {
  display: grid;
  gap: var(--spacing-gap-vertical-16);
}

.field {
  display: grid;
  gap: var(--spacing-gap-vertical-8);
}

.field-label {
  color: var(--color-label-normal);
  font-size: var(--font-size-14);
  font-weight: var(--font-weight-500);
  line-height: var(--line-height-20);
}
```

폼 규칙:

- Label은 input 위에 두는 패턴을 기본으로 한다.
- Placeholder는 label 대체용으로 쓰지 않는다.
- 오류 메시지는 `--color-status-negative` 또는 `--color-red-40` 계열 의미를 유지한다.
- 필드 간 간격은 `--spacing-gap-vertical-16`을 기본으로 한다.
- 같은 폼 안에서 input/select/textarea size를 섞지 않는다. 특별한 이유가 없으면 `medium`을 기본으로 한다.

### 8.4 테이블 패턴

현재 별도 table component class는 없다. 테이블은 global reset과 파운데이션 토큰으로 만든다.

권장 table:

```html
<div class="table-wrap">
  <table class="data-table">
    <thead>
      <tr>
        <th scope="col">이름</th>
        <th scope="col">상태</th>
        <th scope="col">생성일</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>프로젝트 A</td>
        <td><span class="badge_filled_small">Active</span></td>
        <td>2026.04.27</td>
      </tr>
    </tbody>
  </table>
</div>
```

```css
.table-wrap {
  overflow-x: auto;
  border: var(--border-1) solid var(--color-line-normal-neutral);
  border-radius: var(--radius-8);
  background: var(--color-background-elevated-normal);
}

.data-table {
  width: 100%;
  min-width: 640px;
}

.data-table th,
.data-table td {
  padding: var(--spacing-padding-vertical-12) var(--spacing-padding-horizontal-16);
  border-bottom: var(--border-1) solid var(--color-line-normal-alternative);
  color: var(--color-label-normal);
  font-size: var(--font-size-14);
  line-height: var(--line-height-20);
  text-align: left;
  vertical-align: middle;
}

.data-table th {
  background: var(--color-background-normal-alternative);
  color: var(--color-label-neutral);
  font-weight: var(--font-weight-500);
}
```

테이블 규칙:

- 행 높이를 임의로 고정하지 말고 padding token으로 밀도를 조정한다.
- 상태값은 badge를 사용한다.
- 행 액션은 text button 또는 icon button을 사용한다.
- 좁은 화면에서는 `overflow-x: auto` wrapper를 사용한다.
- 테이블 안에서 카드 UI를 중첩하지 않는다.

## 9. 금지사항

- 디자인 시스템에 없는 색상, 폰트 크기, spacing, radius를 즉석에서 만들지 않는다.
- `13px`, `115px`, `Display_4`, `Title_3`, `Body_3`, `Label_2`를 새로 만들지 않는다.
- `small`, `medium` 대신 `_1`, `_2`를 써야 하는 타이포그래피 계층에 size 명칭을 섞지 않는다.
- 컴포넌트 class의 height, padding, color, radius를 화면 CSS에서 강제로 덮어쓰지 않는다.
- 버튼을 div로 만들지 않는다. 실제 button 또는 a를 사용한다.
- disabled처럼 보이는 class만 적용하고 실제 `disabled`, `readonly`, `aria-disabled` 처리를 빠뜨리지 않는다.
- placeholder를 label로 사용하지 않는다.
- 하나의 화면에서 rounded, full rounded, square 스타일을 무분별하게 섞지 않는다.
- shadow를 장식 목적으로 남발하지 않는다.
- 카드 안에 카드, 테이블 안에 카드처럼 면을 과하게 중첩하지 않는다.
- primary filled 버튼을 한 영역에 여러 개 배치하지 않는다.
- CSS에 `!important`를 쓰지 않는다.
- 아이콘 파일을 새로 그리기 전에 `system/foundation/icons`와 `icons.js` 목록을 먼저 확인한다.

## 10. 예시 코드

### 10.1 기본 페이지

```html
<main class="page">
  <section class="page-head">
    <p class="type-label_1">Dashboard</p>
    <h1 class="type-headline_1">프로젝트 현황</h1>
    <p class="type-body_1">최근 프로젝트 상태와 주요 지표를 확인합니다.</p>
  </section>

  <section class="card">
    <div class="section-head">
      <h2 class="type-title_1">최근 작업</h2>
      <button class="btn_primary_outline_small" type="button">전체 보기</button>
    </div>
  </section>
</main>
```

```css
.page {
  display: grid;
  gap: var(--spacing-gap-vertical-40);
  padding: var(--spacing-padding-vertical-40) var(--spacing-padding-horizontal-32);
  background: var(--color-background-normal-normal);
}

.page-head {
  display: grid;
  gap: var(--spacing-gap-vertical-8);
}

.page-head p {
  color: var(--color-label-neutral);
}

.section-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-gap-horizontal-16);
}
```

### 10.2 폼 카드

```html
<section class="card form-card">
  <header class="form-card-head">
    <h2 class="type-title_1">사용자 추가</h2>
    <p class="type-body_2">초대할 사용자의 정보를 입력하세요.</p>
  </header>

  <form class="form-stack">
    <div class="field">
      <label class="field-label" for="user-name">이름</label>
      <label class="text_input_outline_medium">
        <input id="user-name" type="text" placeholder="홍길동" />
      </label>
    </div>

    <div class="field">
      <label class="field-label" for="memo">메모</label>
      <textarea id="memo" class="textarea_outline_medium" placeholder="메모를 입력하세요"></textarea>
    </div>

    <div class="action-row">
      <button class="btn_primary_outline_medium" type="button">취소</button>
      <button class="btn_primary_filled_medium" type="submit">저장</button>
    </div>
  </form>
</section>
```

### 10.3 상태 목록

```html
<ul class="status-list">
  <li class="status-item">
    <div>
      <strong class="type-title_2">정산 요청</strong>
      <p class="type-body_2">승인 대기 중인 요청입니다.</p>
    </div>
    <span class="badge_outline_small">Pending</span>
  </li>
  <li class="status-item">
    <div>
      <strong class="type-title_2">배포 완료</strong>
      <p class="type-body_2">운영 환경에 반영되었습니다.</p>
    </div>
    <span class="badge_filled_small">Done</span>
  </li>
</ul>
```

```css
.status-list {
  display: grid;
  gap: var(--spacing-gap-vertical-12);
}

.status-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-gap-horizontal-16);
  padding: var(--spacing-padding-vertical-16) var(--spacing-padding-horizontal-16);
  border: var(--border-1) solid var(--color-line-normal-neutral);
  border-radius: var(--radius-8);
  background: var(--color-background-elevated-normal);
}

.status-item p {
  margin: var(--spacing-margin-vertical-4) 0 0;
  color: var(--color-label-neutral);
}
```

## 11. 프로젝트 생성 체크리스트

- `design-system.md`를 먼저 읽고 적용 범위를 정한다.
- CSS import 순서를 보일러 템플릿과 동일하게 둔다.
- 새 UI가 필요하면 기존 컴포넌트 class 목록에서 먼저 찾는다.
- 기존 컴포넌트가 없으면 파운데이션 토큰으로 pattern class를 만들고, 값은 모두 token으로 작성한다.
- 색상은 semantic token부터 고른다.
- 폰트는 type class 또는 typography token만 사용한다.
- spacing은 padding, margin, gap token 중 의미에 맞는 것을 쓴다.
- form, table, card는 이 문서의 패턴을 기본으로 시작한다.
- 구현 후 `13px`, `115px`, hardcoded hex, 임의 px 값, `!important`가 없는지 검색한다.
