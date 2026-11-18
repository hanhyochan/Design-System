# 디자인 시스템 사이즈 규격

토큰, 파운데이션, 컴포넌트 순서로 실제 적용값을 정리했습니다. 길이·글자 크기는 px, 행간은 글자 크기의 배수입니다. 패딩의 ‘좌우 12’는 왼쪽과 오른쪽이 각각 12px이라는 뜻입니다.

[단위 토큰](#단위-토큰) · [파운데이션](#파운데이션) · [타이포그래피](#타이포그래피) · [버튼과 탭](#버튼과-탭) · [입력과 선택](#입력과-선택) · [칩과 배지](#칩과-배지) · [토글과 체크](#토글과-체크) · [SVG 원본](icon-sizes.md)

## 단위 토큰

변수 이름의 끝 숫자가 px 값입니다. 예를 들어 `var(--h_designSystem-unit-16)`은 16px입니다. 아래는 `@h_designsystem/tokens`에 선언된 24개 전체입니다. [토큰 원본](../packages/tokens/src/unit.css)

| 변수 이름 | 등록된 숫자 |
|---|---|
| `--h_designSystem-unit-숫자` | 4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 80, 96, 128, 160, 196, 340, 360, 800 |

등록된 길이는 해당 변수를 사용합니다. 1px 테두리, 2px 토글 패딩, 15px 글자, 18px 아이콘처럼 기존 규격에만 있는 값은 CSS에 직접 씁니다. 색상 토큰 끝의 숫자는 팔레트 단계입니다.

## 파운데이션

| 항목 | Storybook에 제공하는 값(px) |
|---|---|
| Padding | 0, 2, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 60 |
| Gap | 0, 4, 8, 12, 16, 20, 24, 28, 32, 40, 60 |
| Border Radius | 0, 2, 4, 8, 10, 12, 16, 20, 24, 32, 40, 9999 |
| Border Width | 0, 0.5, 1, 2, 3 |

위 표는 항목별 견본입니다. 예를 들어 56px은 단위 토큰에 있고 버튼 높이에 쓰이지만 Padding 견본의 목록은 52 다음이 60입니다. [파운데이션 견본 원본](../apps/storybook/stories/foundation/FoundationGallery.tsx)

| Shadow 견본 | CSS `box-shadow` 적용값 |
|---|---|
| shadow_1 | `0 8px 14px rgba(34, 34, 34, 0.18)` |
| shadow_2 | `8px 8px 20px rgb(33 34 37 / 0.2)` |
| shadow_3 | `0 0 2px 0 rgba(0, 0, 0, 0.08), 0 16px 24px 0 rgba(0, 0, 0, 0.12)` |
| shadow_4 | `0 24px 24px -4px rgba(34, 34, 34, 0.18)` |
| shadow_5 | `0 24px 40px rgba(0, 0, 0, 0.1)` |

**아이콘**은 파일마다 원본 비율이 다릅니다. 갤러리의 견본 너비와 컴포넌트가 지정하는 아이콘 너비는 각각 따로 확인할 수 있습니다. [SVG 394개 원본·견본 규격표](icon-sizes.md)

## 타이포그래피

`Text`의 기본값은 `body_16_400`입니다. 아래 41종 모두 자간은 0이고 같은 행의 이름과 굵기는 왼쪽부터 차례로 대응합니다. 국문과 영문에서 행간이 다른 항목은 Display 115의 두 굵기입니다. [공개 이름](../packages/ui/src/components/Text/typography.ts) · [크기·굵기·행간 원본](../packages/foundation/src/style/typography/)

| typography 이름 | 크기 | 굵기 | 국문 행간 | 영문 행간 |
|---|---:|---|---:|---:|
| `display_115_600` · `display_115_400` | 115 | 600 · 400 | 1.25 | 1.2 |
| `display_90_400` | 90 | 400 | 1.25 | 1.25 |
| `display_80_600` · `display_80_400` | 80 | 600 · 400 | 1.25 | 1.25 |
| `display_60_600` · `display_60_400` | 60 | 600 · 400 | 1.25 | 1.25 |
| `display_52_600` · `display_52_400` | 52 | 600 · 400 | 1.25 | 1.25 |
| `display_48_500` · `display_48_400` | 48 | 500 · 400 | 1.25 | 1.25 |
| `display_40_600` · `display_40_400` | 40 | 600 · 400 | 1.25 | 1.25 |
| `headline_32_700` · `headline_32_600` · `headline_32_400` | 32 | 700 · 600 · 400 | 1.25 | 1.25 |
| `headline_28_600` · `headline_28_500` · `headline_28_400` | 28 | 600 · 500 · 400 | 1.25 | 1.25 |
| `headline_26_600` | 26 | 600 | 1.25 | 1.25 |
| `headline_24_700` · `headline_24_600` · `headline_24_400` | 24 | 700 · 600 · 400 | 1.25 | 1.25 |
| `title_20_700` · `title_20_600` · `title_20_400` | 20 | 700 · 600 · 400 | 1.5 | 1.5 |
| `title_18_700` · `title_18_600` · `title_18_400` | 18 | 700 · 600 · 400 | 1.5 | 1.5 |
| `title_16_600` · `title_16_500` | 16 | 600 · 500 | 1.5 | 1.5 |
| `body_16_400` | 16 | 400 | 1.5 | 1.5 |
| `body_15_500` · `body_15_400` | 15 | 500 · 400 | 1.5 | 1.5 |
| `label_14_700` · `label_14_500` · `label_14_400` | 14 | 700 · 500 · 400 | 1.5 | 1.5 |
| `meta_13_500` · `meta_13_400` | 13 | 500 · 400 | 1.5 | 1.5 |
| `caption_12_500` · `caption_12_400` | 12 | 500 · 400 | 1.5 | 1.5 |

## 크기 선택

- `size`를 받는 일반 컴포넌트는 생략 시 `medium`입니다. Filled IconButton은 숫자 `16`, Text는 `typography`로 선택합니다.
- `size="large"`는 고정입니다. `size={{ base: 'large', mobile: 'small' }}`은 프로젝트가 정한 모바일 구간에서 small의 **전체 규격**을 사용합니다. 현재 구간 값, `base`, 컴포넌트 기본값 순으로 선택합니다.
- 프로젝트에서 설정한 기준 너비를 사용합니다. Storybook의 모바일 768px 이하·태블릿 992px 이하는 견본 설정입니다. [화면 구간 설정과 예시](responsive.md)

아래 표의 ‘최소 높이’는 `min-height`입니다. 예를 들어 medium Button은 최소 52px이고, medium outline IconButton은 너비와 높이가 각각 52px인 정사각형입니다. [공통 크기 규칙](../packages/foundation/src/style/components/common/size.scss) · [컴포넌트별 CSS](../packages/foundation/src/style/components/)

## 버튼과 탭

| 컴포넌트와 측정 항목 | small | medium | large | xlarge |
|---|---:|---:|---:|---:|
| Button · 최소 높이 | 40 | 52 | 56 | 64 |
| Button · 좌우 패딩 | 20 | 24 | 32 | 40 |
| Button · 글자 | 15 | 16 | 18 | 20 |
| Button · 아이콘 너비 | 12 | 16 | 18 | 20 |
| IconButton outline · 정사각형 한 변 | 40 | 52 | 56 | 64 |
| IconButton outline · 내부 아이콘 너비 | 12 | 16 | 18 | 20 |
| IconButton outline · rounded 반경 | 8 | 10 | 10 | 10 |
| TextButton · 글자 | 14 | 15 | 16 | 18 |
| TextButton · 아이콘 너비 | 8 | 8 | 12 | 12 |
| Tab · 최소 높이 | 40 | 52 | 56 | 64 |
| Tab · 좌우 패딩 | 16 | 24 | 28 | 32 |
| Tab · 글자 | 14 | 16 | 16 | 18 |
| Tab filled · 아이콘 너비 | 16 | 16 | 20 | 20 |
| Tab outline / gray-line-outline · 아이콘 너비 | 16 | 16 | 16 | 16 |

- **Button·Tab**의 상하 패딩은 0, 아이콘과 글자 사이 간격은 12입니다. 글자 굵기 500, 행간 1.5입니다. 반경은 `square` 0, `rounded` 8, `full-rounded` 9999입니다. 기본 테두리는 filled 0, outline 계열 1입니다. 선택된 Tab의 하단 표시는 안쪽 2px입니다.
- **IconButton**은 기본이 outline입니다. 패딩은 0이며 outline의 테두리는 기본 1, 비활성 0입니다. outline의 `square` 반경은 0, `full-rounded`는 9999입니다. **Filled는 숫자 8, 12, 16, 18, 20, 24, 28, 32, 40 중 하나**를 받습니다. 지정값이 외곽 정사각형의 한 변이며 아이콘 영역 너비는 100%입니다. 예를 들어 `variant="filled" size={18}`은 18×18입니다. 테두리와 반경은 0입니다.
- **TextButton**은 글줄과 아이콘이 높이를 결정합니다. 최소 높이·패딩·테두리·반경은 0, 아이콘과 글자 사이 간격은 16, 굵기 500, 행간 1.5입니다. hover 밑줄 오프셋은 small·medium·xlarge에서 0.12em입니다.
- **Tabs·TabList·TabPanel**은 별도 크기 단계가 없습니다. TabList 안의 탭 사이에는 가로·세로 모두 8px 간격이 있습니다. 목록과 TabPanel 사이의 여백은 프로젝트가 정합니다.

## 입력과 선택

TextInput의 안쪽 `input`은 바깥 컨테이너의 글자 크기를 상속하고 자체 패딩은 0입니다. Select에서는 실제 `select`에 패딩을 적용해 오른쪽 화살표와 텍스트가 겹치지 않게 합니다. 다섯 입력 컴포넌트의 기본 너비는 부모의 100%입니다.

| 컴포넌트와 측정 항목 | small | medium | large | xlarge |
|---|---:|---:|---:|---:|
| TextInput · 최소 높이 | 40 | 52 | 56 | 64 |
| TextInput · 좌우 패딩 | 12 | 12 | 16 | 20 |
| TextInput · 완료 표시 / 비밀번호 아이콘 너비 | 16 | 18 | 20 | 20 |
| UnderlineTextInput · 최소 높이 | 40 | 52 | 56 | 64 |
| TextArea · 최소 높이 | 96 | 128 | 160 | 196 |
| TextArea · 네 방향 패딩 | 12 | 12 | 16 | 20 |
| AutoHeightTextArea · 최소 높이 | 40 | 52 | 56 | 64 |
| AutoHeightTextArea · 상하 패딩 | 8 | 12 | 12 | 16 |
| AutoHeightTextArea · 좌우 패딩 | 8 | 8 | 8 | 8 |
| Select · 최소 높이 | 40 | 52 | 56 | 64 |
| Select · 왼쪽 패딩(기본) | 12 | 16 | 20 | 24 |
| Select · 왼쪽 패딩(앞 아이콘 사용) | 36 | 40 | 48 | 52 |
| Select · 오른쪽 패딩(공통) | 36 | 40 | 44 | 48 |
| Select · 앞 아이콘의 왼쪽 위치 | 12 | 16 | 20 | 24 |
| Select · 앞 아이콘 너비 | 12 | 12 | 16 | 16 |
| Select · 오른쪽 화살표 너비 | 12 | 12 | 12 | 12 |

TextInput·UnderlineTextInput·Select의 상하 패딩은 0입니다. TextInput의 완료·비밀번호 아이콘과 입력값 사이 간격은 8입니다. Select 화살표는 오른쪽에서 12px, 세로 중앙에 위치합니다. TextArea의 높이는 최솟값이며 일반형은 세로로 조절할 수 있습니다. `inquiry`에서는 수동 조절을 막습니다. AutoHeightTextArea는 기본 한 줄에서 입력 내용에 따라 높이가 늘어납니다.

| 입력 글자 규격 | small | medium | large | xlarge | 굵기(small부터) |
|---|---:|---:|---:|---:|---|
| TextInput·TextArea·AutoHeightTextArea·Select | 14 | 16 | 16 | 18 | 400 |
| UnderlineTextInput 일반 입력값 | 14 | 16 | 16 | 18 | 500 / 500 / 500 / 600 |
| UnderlineTextInput 일반 placeholder | 14 | 15 | 15 | 16 | 400 |
| UnderlineTextInput search-wide 입력값·placeholder | 16 | 18 | 18 | 20 | 400 |

입력 글자의 행간은 모두 1.5입니다. 아래 밑줄형의 너비와 좌우 패딩은 네 크기에 공통입니다.

| UnderlineTextInput variant | 최대 너비 | 왼쪽 패딩 | 오른쪽 패딩 |
|---|---:|---:|---:|
| fluid | 부모 너비 | 8 | 8 |
| fixed | 340 | 8 | 8 |
| search | 340 | 8 | 40 |
| search-wide | 800 | 8 | 40 |

**모양과 상태별 테두리**

| 대상 | 반경 | 테두리 두께 |
|---|---|---|
| TextInput·Select | square 0, rounded 8, full-rounded 9999 | 기본 filled 0, outline 1. disabled 0 |
| TextArea | square 0, rounded 8 | 기본·inquiry에서 filled 0, outline 1. disabled 0 |
| TextInput·TextArea의 상태 | 선택한 반경 유지 | focus는 두 종류 모두 2. error는 filled 0, outline 2. readonly는 filled 0, outline 1 |
| TextInput 완료 | 선택한 반경 유지 | filled 0, outline 1 |
| UnderlineTextInput·AutoHeightTextArea | 0 | 아래쪽 1, 나머지 면 0 |

**Field**에는 크기 단계가 없습니다. 라벨·입력·안내 또는 오류 문구를 왼쪽 정렬하고, 표시되는 행 사이에 16px 간격을 둡니다. 라벨은 14px·500, 문구는 14px·400이며 행간은 모두 1.5입니다. 문구가 비어 있으면 해당 행의 간격도 사라집니다. [Field 조합 사용법](validation.md)

## 칩과 배지

| 컴포넌트와 측정 항목 | small | medium | large | xlarge |
|---|---:|---:|---:|---:|
| Chip·Badge · 최소 높이 | 32 | 32 | 40 | 48 |
| Chip·Badge · 좌우 패딩 | 12 | 16 | 20 | 20 |
| Chip·Badge · 글자 | 12 | 14 | 16 | 16 |
| ContentTag · 상하 패딩 | 12 | 16 | 20 | 24 |
| ContentTag · 좌우 패딩 | 20 | 24 | 28 | 32 |
| ContentTag · 글자 | 16 | 18 | 20 | 24 |
| ContentTag · 행간 | 1.5 | 1.5 | 1.5 | 1.25 |
| Hashtag · 글자 | 14 | 16 | 18 | 20 |

- **Chip·Badge**는 상하 패딩 0, 반경 9999, 글자 굵기 500, 행간 1.5입니다. 테두리는 filled 0, outline 1입니다.
- **ContentTag**는 글자와 패딩으로 높이가 정해집니다. 최대 너비 100%, 반경 9999, 테두리 0, 굵기 600입니다.
- **Hashtag**는 자체 패딩·고정 높이 없이 글자의 행간으로 높이가 정해집니다. 굵기 400, 행간 1.8입니다.

## 토글과 체크

| 컴포넌트와 측정 항목 | small | medium | large | xlarge |
|---|---:|---:|---:|---:|
| Toggle · 트랙 너비 × 높이 | 36×20 | 44×24 | 52×28 | 60×32 |
| Toggle · 손잡이 지름 | 16 | 20 | 24 | 28 |
| Toggle · 켰을 때 이동 거리 | 16 | 20 | 24 | 28 |
| Checkbox·Radio · 외곽 한 변 | 16 | 20 | 24 | 28 |
| Checkbox · 체크 아이콘 너비 | 8 | 12 | 16 | 20 |
| Radio · 선택 점 지름 | 8 | 10 | 12 | 14 |

- **Toggle**의 트랙 패딩은 2, 테두리는 0입니다. 트랙과 손잡이는 반경 9999이며 꺼짐·비활성 상태의 손잡이 이동량은 0입니다.
- **Checkbox**의 기본형은 반경 2·테두리 2, `round`는 반경 9999·테두리 1입니다. **Radio**는 반경 9999·테두리 2이며 선택 점을 정중앙에 표시합니다. 둘 다 패딩은 0이며 비활성 테두리는 0입니다.

## 키보드 포커스

컴포넌트 CSS가 키보드 포커스 링을 그리는 Button·TextButton·outline IconButton·Tab·Chip·Toggle·Checkbox·Radio·UnderlineTextInput·AutoHeightTextArea·Select·비밀번호 표시 버튼은 두께 2px, 외곽과의 간격 2px입니다. TextInput·TextArea의 일반 입력 포커스는 위의 2px 테두리를 사용하고, 오류 입력에 키보드로 포커스하면 외곽 링도 표시합니다. [포커스 규칙](../packages/foundation/src/style/components/common/states/focus.css)

## 페이지 구성 규칙

- 컴포넌트 내부 수치는 패키지가 담당합니다. 페이지 간격·정렬·읽기 순서는 프로젝트가 담당합니다.
- 등록된 4배수 길이는 `--h_designSystem-unit-*`를 사용합니다. 그 외 원본 길이는 직접 작성합니다.
- margin 대신 gap·padding을 사용합니다.
- 크기 이름이 같아도 모든 요소의 실제 크기가 같지는 않습니다.
- 긴 문구·좁은 화면·글자 확대를 확인하고 의미 있는 HTML 태그와 레이블을 유지합니다.
- 등록된 크기·반경·패딩을 바꾸는 경우 규격 확장으로 구분합니다.
- 미완성 Module은 패키지에서 제외합니다.
