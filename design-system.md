# Hyo Design System

기준: 2026-10-02의 `designSystem-v3.html`에 표시된 최신 Foundation, Component, Design Rules. 원본 HTML이나 이전 MD가 없어도 적용할 수 있는 독립 디자인 시스템 명세다. 이전 MD의 수치·토큰·분류·보일러플레이트 지시는 사용하지 않는다.

## 1. 적용 계약

- 이 문서를 받은 웹·앱은 **Foundation·Component·Design Rules를 반드시 준수한다.** 프레임워크의 기본 수치나 AI의 취향으로 대체하지 않는다.
- 등록된 종류는 이 문서의 variant·size·state 중에서 선택한다. **색상과 font-family만 디자인 선택 사항**이다. 높이·너비·패딩·간격·반경·보더 두께·그림자 형상·글자 크기·굵기·행간·아이콘 크기는 선택한 규격을 따른다.
- 색상도 Atomic/Semantic 체계와 팔레트 확장 절차 안에서 처리한다. 예시의 검정·흰색·파랑을 모든 프로젝트에 강제하지 않는다.
- 규격의 **수치·관계·기본 표시 결과**가 기준이다. height/min-height, Flex/Grid, 태그, 클래스명, 공통 스타일 분리, CSS Modules, SCSS, CSS-in-JS, Tailwind 등 구현 방식은 자유다. 다른 구현으로 글자가 잘리거나 규격이 달라지는 것은 허용하지 않는다.
- 카탈로그의 완성형 클래스는 수동 복사를 위한 표현 방식이다. 실제 앱에서 한 클래스에 전부 작성하라는 뜻이 아니다. 공통 속성 분리와 컴포넌트 추상화는 가능하지만 선택한 수치를 바꾸거나 누락하면 안 된다.
- 시스템에 없는 오브젝트는 프로젝트에 맞게 만들 수 있다. 단, Foundation과 Design Rules를 지킨다. 기존 종류의 이름만 바꿔 미등록 오브젝트로 취급하지 않는다.
- 규격 이탈이 필요하거나 기존 종류를 전혀 다른 디자인으로 만들려면 **코드 작성 전에** 비준수 규칙, 사유, 적용 범위, 달라질 결과를 먼저 알린다. 사전 고지는 관련 없는 규칙까지 해제하는 허가가 아니며 이탈한 결과를 시스템 준수라고 표시하지 않는다.
- px는 설계 기준 단위다. 다른 환경에서는 일관되게 환산한다. 사용자 확대를 막거나 기존 루트 글자 크기를 환산 편의 때문에 바꾸지 않는다.

### 우선순위

1. 적용 계약과 Design Rules의 필수 규칙.
2. Foundation의 허용 값과 Typography 조합.
3. 선택한 Component의 종류·크기·상태별 수치.
4. 설명용 콘텐츠, 예시 색상, 구현 코드.

등록 컴포넌트의 내부 규격은 일반 컨테이너 규칙과 구분한다. 토글 내부 2px, 아이콘 공간의 비대칭 패딩, 맞닿는 내부 요소를 일반 대칭 패딩이나 독립 오브젝트 최소 간격을 이유로 바꾸지 않는다.

### 원본의 불일치 처리

현재 HTML의 `hashtag_small`, `hashtag_medium`, `hashtag_large`, `hashtag_xlarge`에는 행간 `1.8`이 남아 있다. 확정된 Rules가 모든 컴포넌트 텍스트에 Foundation 조합을 요구하므로 **이 MD의 Hashtag 행간은 모두 `1.5`**다. 원본 HTML을 수정했다는 뜻은 아니다. 나머지 수치는 현재 카탈로그의 개별 클래스 명세를 수록했다. 미사용 옛 CSS, Module 전용 CSS, 과거 소스 증거 데이터는 규격에서 제외했다.

## 2. 프로젝트 초기 적용

1. 활성 프로젝트의 프레임워크, 전역 CSS, Reset, 폰트, 단위 기준, 토큰·컴포넌트, 빌드·자산 경로를 확인한다. 문서 사이트의 UI를 앱에 이식하지 않는다.
2. 메인 색상, 선택 서브 색상, 사용할 폰트를 확인한다. 이미 정해진 설정이 있으면 사용하고, 미정이면 사용자에게 확인한다. 임의의 브랜드 색상을 확정하지 않는다.
3. 아래 색상·타이포그래피 변수를 전역 Foundation에 한 번 선언한다. 패딩·gap·반경·보더·그림자·아이콘 크기는 raw 규격을 사용한다. `--spacing-*`, `--radius-*`, `--size-*` 같은 변수 체계를 새로 만들 필요가 없다.
4. 전역 자간 0, 기본 본문 16px·400·행간 1.5, box-sizing 등을 설정한다. 기존 Reset이 있으면 통째로 중복 적용하지 않고 필요한 차이만 검토한다.
5. Typography 조합과 아이콘 크기 적용 수단을 준비한다. 유틸리티를 쓰면 시스템 값에 연결한다. 프레임워크의 기본 간격·폰트 스케일을 시스템 값으로 오인하지 않는다.
6. 필요한 컴포넌트만 구현한다. 전체 736개 규격의 실행 CSS를 미리 생성할 의무는 없다. 사용한 규격은 이름·수치·상태까지 추적할 수 있어야 한다.
7. 기본 상태, 키보드 포커스, 비활성, 긴 콘텐츠, 좁은 화면, 글자 확대를 검수하고 실제 수행 범위를 보고한다.

폴더 구조나 파일명은 강제하지 않는다. 토큰, Reset, 공통 컴포넌트, 페이지 스타일의 책임은 구분하고 프로젝트 로딩 방식에 맞춘다. 숫자 규격을 바꾸지 않고 파일·클래스·태그만 조정하는 것은 시스템 이탈이 아니다.

## 3. Foundation: 색상

### 3.1 사용 원칙

- 아래 Atomic 전체와 Semantic 역할·컴포넌트 의존 색상을 전역 Foundation에 제공한다. 현재 화면에 쓰지 않는 팔레트도 사용 가능한 범위다.
- Atomic은 색상 단계, Semantic은 역할이다. 같은 HEX가 역할별 별칭에 연결되는 것은 허용하지만 같은 변수의 중복 선언이나 팔레트의 불필요한 재생성은 하지 않는다.
- 브랜드명이 붙은 네 팔레트도 **현재 v3의 등록 색상 선택지**이므로 포함한다. 해당 브랜드 디자인이나 색상을 새 프로젝트에 강제하는 뜻은 아니다. 구 MD의 브랜드 팔레트 제외 정책을 적용하지 않는다.
- Neutral·Cool Neutral은 아래 실제 값을 그대로 사용한다. 95·97·99 및 추가 단계도 생략하지 않는다. 기존 회색을 서브 색상으로 선택하면 기존 토큰에 연결하고 중복 팔레트를 생성하지 않는다.
- `--color-common-0`은 현재 Cool Neutral 15를 가리키며 순수 검정이 아니다. 순수 검정은 `--color-static-black`이다. 이름만 보고 값을 추측하지 않는다.
- 색상 변경 시 대비, 상태 구분, 밝은 아이콘·비활성 아이콘도 확인한다. 테마 변경으로 보더 두께·패딩·크기를 바꾸지 않는다.

### 3.2 Atomic 및 의존 토큰

현재 Atomic 19개 팔레트의 222개 토큰과 Semantic/컴포넌트 참조에 필요한 의존성을 포함해 254개 색상 변수를 수록한다. 의존 별칭도 함께 선언해야 미정의 var 참조가 생기지 않는다.

```css
:root {

    /* Common */
    --color-common-100: #ffffff;
    --color-common-0: var(--color-cool-neutral-15);

    /* Neutral */
    --color-neutral-99: #f7f7f7;
    --color-neutral-97: #f0f0f0;
    --color-neutral-95: #dcdcdc;
    --color-neutral-90: #c4c4c4;
    --color-neutral-80: #b0b0b0;
    --color-neutral-70: #9b9b9b;
    --color-neutral-60: #8a8a8a;
    --color-neutral-50: #737373;
    --color-neutral-40: #5c5c5c;
    --color-neutral-30: #474747;
    --color-neutral-22: #303030;
    --color-neutral-20: #2a2a2a;
    --color-neutral-15: #1c1c1c;
    --color-neutral-10: #171717;
    --color-neutral-5: #0f0f0f;

    /* Cool Neutral */
    --color-cool-neutral-99: #f7f7f8;
    --color-cool-neutral-98: #f4f4f5;
    --color-cool-neutral-97: #eaebec;
    --color-cool-neutral-96: #e1e2e4;
    --color-cool-neutral-95: #dbdcdf;
    --color-cool-neutral-90: #c2c4c8;
    --color-cool-neutral-80: #aeb0b6;
    --color-cool-neutral-70: #989ba2;
    --color-cool-neutral-60: #878a93;
    --color-cool-neutral-50: #70737c;
    --color-cool-neutral-40: #5a5c63;
    --color-cool-neutral-30: #46474c;
    --color-cool-neutral-25: #37383c;
    --color-cool-neutral-23: #333438;
    --color-cool-neutral-22: #2e2f33;
    --color-cool-neutral-20: #292a2d;
    --color-cool-neutral-17: #212225;
    --color-cool-neutral-15: #1b1c1e;
    --color-cool-neutral-10: #171719;
    --color-cool-neutral-7: #141415;
    --color-cool-neutral-5: #0f0f10;

    /* Blue */
    --color-blue-99: #f7fbff;
    --color-blue-95: #eaf2fe;
    --color-blue-90: #c9defe;
    --color-blue-80: #9ec5ff;
    --color-blue-70: #69a5ff;
    --color-blue-65: #4f95ff;
    --color-blue-60: #3385ff;
    --color-blue-55: #1a75ff;
    --color-blue-50: #0066ff;
    --color-blue-45: #005eeb;
    --color-blue-40: #0054d1;
    --color-blue-30: #003e9c;
    --color-blue-20: #002966;
    --color-blue-10: #001536;

    /* Red */
    --color-red-99: #fffafa;
    --color-red-95: #feecec;
    --color-red-90: #fed5d5;
    --color-red-80: #ffb5b5;
    --color-red-70: #ff8c8c;
    --color-red-60: #ff6363;
    --color-red-50: #ff4242;
    --color-red-40: #e52222;
    --color-red-30: #b00c0c;
    --color-red-20: #730303;
    --color-red-10: #3b0101;

    /* Red Orange */
    --color-red-orange-99: #fffaf7;
    --color-red-orange-95: #feeee5;
    --color-red-orange-90: #fed9c4;
    --color-red-orange-80: #ffbd96;
    --color-red-orange-70: #ff9b61;
    --color-red-orange-60: #ff7b2e;
    --color-red-orange-50: #ff5e00;
    --color-red-orange-48: #f55a00;
    --color-red-orange-40: #c94a00;
    --color-red-orange-30: #913500;
    --color-red-orange-20: #592100;
    --color-red-orange-10: #290f00;

    /* Orange */
    --color-orange-99: #fffcf7;
    --color-orange-95: #fef4e6;
    --color-orange-90: #fee6c6;
    --color-orange-80: #ffd49c;
    --color-orange-70: #ffc06e;
    --color-orange-60: #ffa938;
    --color-orange-50: #ff9200;
    --color-orange-40: #d47800;
    --color-orange-39: #d17600;
    --color-orange-30: #9c5800;
    --color-orange-20: #663a00;
    --color-orange-10: #361e00;

    /* Yellow */
    --color-yellow-99: #fffffc;
    --color-yellow-95: #fffff0;
    --color-yellow-90: #ffffcc;
    --color-yellow-80: #ffff99;
    --color-yellow-70: #ffff66;
    --color-yellow-60: #ffff33;
    --color-yellow-50: #ffff00;
    --color-yellow-40: #e6e600;
    --color-yellow-30: #cccc00;
    --color-yellow-20: #999900;
    --color-yellow-10: #666600;

    /* Green */
    --color-green-99: #f2fff6;
    --color-green-95: #d9ffe6;
    --color-green-90: #acfcc7;
    --color-green-80: #7df5a5;
    --color-green-70: #49e57d;
    --color-green-60: #1ed45a;
    --color-green-50: #00bf40;
    --color-green-40: #009632;
    --color-green-30: #006e25;
    --color-green-20: #004517;
    --color-green-10: #00240c;

    /* Lime */
    --color-lime-99: #f8fff2;
    --color-lime-95: #e6ffd4;
    --color-lime-90: #ccfca9;
    --color-lime-80: #aef779;
    --color-lime-70: #88f03e;
    --color-lime-60: #6be016;
    --color-lime-50: #58cf04;
    --color-lime-40: #48ad00;
    --color-lime-37: #429e00;
    --color-lime-30: #347d00;
    --color-lime-20: #225200;
    --color-lime-10: #112900;

    /* Cyan */
    --color-cyan-99: #f7feff;
    --color-cyan-95: #defaff;
    --color-cyan-90: #b5f4ff;
    --color-cyan-80: #8aedff;
    --color-cyan-70: #57dff7;
    --color-cyan-60: #28d0ed;
    --color-cyan-50: #00bdde;
    --color-cyan-40: #0098b2;
    --color-cyan-30: #006f82;
    --color-cyan-20: #004854;
    --color-cyan-10: #00252b;

    /* Light Blue */
    --color-light-blue-99: #f7fdff;
    --color-light-blue-95: #e5f6fe;
    --color-light-blue-90: #c4ecfe;
    --color-light-blue-80: #a1e1ff;
    --color-light-blue-70: #70d2ff;
    --color-light-blue-60: #3dc2ff;
    --color-light-blue-50: #00aeff;
    --color-light-blue-40: #008dcf;
    --color-light-blue-30: #006796;
    --color-light-blue-20: #004261;
    --color-light-blue-10: #002130;

    /* Violet */
    --color-violet-99: #fbfaff;
    --color-violet-95: #f0ecfe;
    --color-violet-90: #dbd3fe;
    --color-violet-80: #c0b0ff;
    --color-violet-70: #9e86fc;
    --color-violet-60: #7d5ef7;
    --color-violet-50: #6541f2;
    --color-violet-45: #5b37ed;
    --color-violet-40: #4f29e5;
    --color-violet-30: #3a16c9;
    --color-violet-20: #23098f;
    --color-violet-10: #11024d;

    /* Purple */
    --color-purple-99: #fefbff;
    --color-purple-95: #f9edff;
    --color-purple-90: #f2d6ff;
    --color-purple-80: #e9baff;
    --color-purple-70: #de96ff;
    --color-purple-60: #d478ff;
    --color-purple-50: #cb59ff;
    --color-purple-40: #ad36e3;
    --color-purple-30: #861cb8;
    --color-purple-20: #580a7d;
    --color-purple-10: #290247;

    /* Pink */
    --color-pink-99: #fffafe;
    --color-pink-95: #feecfb;
    --color-pink-90: #fed3f7;
    --color-pink-80: #ffb8f3;
    --color-pink-70: #ff94ed;
    --color-pink-60: #fa73e3;
    --color-pink-50: #f553da;
    --color-pink-46: #e846cd;
    --color-pink-40: #d331b8;
    --color-pink-30: #a81690;
    --color-pink-20: #730560;
    --color-pink-10: #3d0133;

    /* Purple_newstant */
    --color-purple-99_newstant: var(--color-newsroll-purple-99);
    --color-purple-95_newstant: var(--color-newsroll-purple-95);
    --color-purple-90_newstant: var(--color-newsroll-purple-90);
    --color-purple-80_newstant: var(--color-newsroll-purple-80);
    --color-purple-70_newstant: var(--color-newsroll-purple-70);
    --color-purple-60_newstant: var(--color-newsroll-purple-60);
    --color-purple-50_newstant: var(--color-newsroll-purple-50);
    --color-purple-40_newstant: var(--color-newsroll-purple-40);
    --color-purple-30_newstant: var(--color-newsroll-purple-30);
    --color-purple-20_newstant: var(--color-newsroll-purple-20);
    --color-purple-10_newstant: var(--color-newsroll-purple-10);

    /* Yellow_artkorealab */
    --color-yellow-99_artkorealab: #fffffc;
    --color-yellow-95_artkorealab: #fffff0;
    --color-yellow-90_artkorealab: #feffe0;
    --color-yellow-80_artkorealab: #feffbe;
    --color-yellow-70_artkorealab: #feff99;
    --color-yellow-60_artkorealab: #feff6b;
    --color-yellow-50_artkorealab: #ffff00;
    --color-yellow-40_artkorealab: #bebe00;
    --color-yellow-30_artkorealab: #808000;
    --color-yellow-20_artkorealab: #484800;
    --color-yellow-10_artkorealab: #161600;

    /* Cyan_artkorealab */
    --color-cyan-99_artkorealab: #fcfefe;
    --color-cyan-95_artkorealab: #eefafb;
    --color-cyan-90_artkorealab: #ddf6f6;
    --color-cyan-80_artkorealab: #b9ecee;
    --color-cyan-70_artkorealab: #92e3e5;
    --color-cyan-60_artkorealab: #64d8dd;
    --color-cyan-50_artkorealab: #00ced4;
    --color-cyan-40_artkorealab: #00989d;
    --color-cyan-30_artkorealab: #006669;
    --color-cyan-20_artkorealab: #00383a;
    --color-cyan-10_artkorealab: #000f10;

    /* Purple_artkorealab */
    --color-purple-99_artkorealab: #fefdff;
    --color-purple-95_artkorealab: #fbf4ff;
    --color-purple-90_artkorealab: #f6e9ff;
    --color-purple-80_artkorealab: #eed4ff;
    --color-purple-70_artkorealab: #e5beff;
    --color-purple-60_artkorealab: #dca7ff;
    --color-purple-50_artkorealab: #d390ff;
    --color-purple-40_artkorealab: #9c6abe;
    --color-purple-30_artkorealab: #694580;
    --color-purple-20_artkorealab: #3a2448;
    --color-purple-10_artkorealab: #100716;

    /* Semantic dependencies */
    --color-common-0-alpha-52: color-mix(in srgb, var(--color-common-0) 52%, transparent);

    /* Semantic roles */
    --color-text-primary: var(--color-cool-neutral-17);
    --color-text-secondary: var(--color-neutral-40);
    --color-text-tertiary: var(--color-neutral-60);
    --color-text-disabled: var(--color-neutral-70);
    --color-text-inverse: var(--color-common-100);
    --color-focus-ring: var(--color-blue-50);
    --color-overlay-dimmer: var(--color-common-0-alpha-52);

    /* Component dependencies */
    --color-static-black: #000000;
    --color-interaction-disable: #f4f4f5;
    --color-label-disable: rgb(55 56 60 / 16%);
    --color-fill-normal: rgb(112 115 124 / 8%);
    --color-label-normal: #171719;
    --color-label-assistive: rgb(55 56 60 / 28%);
    --color-background-normal-alternative: #f7f7f8;
    --color-label-neutral: rgb(46 47 51 / 88%);
    --color-line-solid-0: #000000;
    --color-status-positive: #00bf40;
    --color-status-negative: #ff4242;
    --color-line-solid-normal: #e1e2e4;
    --color-line-solid-strong: #aeb0b6;

    /* Token dependencies */
    --color-newsroll-purple-10: #0d0816;
    --color-newsroll-purple-20: #322648;
    --color-newsroll-purple-30: #5c4980;
    --color-newsroll-purple-40: #896ebe;
    --color-newsroll-purple-50: #ba96ff;
    --color-newsroll-purple-60: #c7acff;
    --color-newsroll-purple-70: #d5c1ff;
    --color-newsroll-purple-80: #e2d6ff;
    --color-newsroll-purple-90: #f1eaff;
    --color-newsroll-purple-95: #f8f5ff;
    --color-newsroll-purple-99: #fefdff;
}
```

### 3.3 Semantic 역할

현재 Foundation의 의미 분류다. 같은 역할의 색상을 공통으로 연결한다. 컴포넌트가 참조하는 Label·Fill·Line 등의 의존 토큰도 앞의 CSS에 포함되어 있다.

| 분류 | 역할 | 기준 Atomic/색상 토큰 |
| --- | --- | --- |
| Status | Positive · 성공·검증 통과 | `--color-green-50` |
| Status | Cautionary · 주의·경고 | `--color-orange-50` |
| Status | Negative · 오류·실패 | `--color-red-50` |
| Status | Informative · 안내·올바른 예시 | `--color-blue-50` |
| Text | Primary · 본문 | `--color-cool-neutral-17` |
| Text | Secondary · 보조 설명 | `--color-neutral-40` |
| Text | Tertiary · 날짜·흐린 설명 | `--color-neutral-60` |
| Text | Disabled · 비활성 글자 | `--color-neutral-70` |
| Text | Inverse · 진한 배경 위 글자 | `--color-common-100` |
| Focus | Ring · 키보드 포커스 외곽선 | `--color-blue-50` |
| Overlay | Dimmer · 모달 뒤 화면 가림 | `--color-common-0-alpha-52` |

### 3.4 고유 메인·서브 색상 확장

고유 색상은 아래 공식 절차로 추가한다. 이 절차에 따른 추가는 규칙 이탈이 아니다. 메인과 서브에 같은 절차를 적용하고 선택하지 않은 서브 팔레트는 만들지 않는다.

| 단계 | 생성 기준 |
| --- | --- |
| 10 | 원본 20% + 검정 80% |
| 20 | 원본 40% + 검정 60% |
| 30 | 원본 60% + 검정 40% |
| 40 | 원본 80% + 검정 20% |
| 50 | 사용자 입력 원본 HEX/RGB 그대로 |
| 60 | 원본 80% + 흰색 20% |
| 70 | 원본 60% + 흰색 40% |
| 80 | 원본 40% + 흰색 60% |
| 90 | 원본 20% + 흰색 80% |
| 95 | 원본 10% + 흰색 90% |
| 99 | 원본 2% + 흰색 98% |

OKLCH 보간을 사용한다. 무채색 끝점의 hue 처리와 sRGB gamut 변환은 검증된 색상 변환 도구로 처리하고 결과를 유효한 정적 HEX/RGB 값으로 기록한다. 50의 원본은 변경하지 않는다. 반투명 입력은 합성 배경에 따라 달라지므로 기본 색상과 alpha의 의도를 확인한다. 기존 팔레트의 45·55·65 등 추가 단계는 삭제하지 않는다.

신규 이름 예시는 `--color-primary-10`~`--color-primary-99`, 선택 서브는 `--color-secondary-10`~`--color-secondary-99`다. 기존 프로젝트에 동등한 명명 규칙이 있으면 매핑한다. Primary 역할은 50에 연결하고 foreground는 배경 대비를 확인한 밝은/어두운 기존 토큰에 연결한다. 자동으로 흰색이 적합하다고 가정하지 않는다. 모든 단계에 color/background-color/border-color 연결을 제공한다. 입력이 같으면 동일 팔레트를 재사용한다.

## 4. Foundation: Typography

### 4.1 조합 규칙

최소 크기는 12px이다. **크기·굵기·행간을 한 조합**으로 선택한다. 같은 크기에 등록되지 않은 굵기나 행간을 임의로 붙이지 않는다. 일반 텍스트와 모든 컴포넌트 내부 텍스트에 적용한다.

계열 안에서 큰 크기부터, 같은 크기에서는 굵은 것부터 인덱스가 이어진다. 국문·영문 인덱스는 같다. 자간은 전역 기본값 `0`이며 별도 variant가 없다. 사용자 접근성 설정의 텍스트 간격 조정은 막지 않는다.

- 24px 이상: 행간 1.25.
- 24px 미만: 행간 1.5.
- 영문 115px `display_1`·`display_2`: 행간 1.2.
- 기본 본문: `body_1`, 16px·400·행간 1.5 = 24px.
- font-family는 자유다. 원본 국문 기본은 Pretendard 계열, 영문 표의 샘플은 Inter다. 특정 폰트 파일을 반드시 쓰라는 뜻은 아니다. 필요한 굵기가 실제로 제공되는지 확인한다.

| 규격 | 크기 | 굵기 | 국문 행간 / 기준 높이 | 영문 행간 / 기준 높이 |
| --- | --- | --- | --- | --- |
| display_1 | 115px | 600 | 1.25 / 143.75px | 1.2 / 138px |
| display_2 | 115px | 400 | 1.25 / 143.75px | 1.2 / 138px |
| display_3 | 90px | 400 | 1.25 / 112.5px | 1.25 / 112.5px |
| display_4 | 80px | 400 | 1.25 / 100px | 1.25 / 100px |
| display_5 | 60px | 400 | 1.25 / 75px | 1.25 / 75px |
| display_6 | 52px | 600 | 1.25 / 65px | 1.25 / 65px |
| display_7 | 52px | 400 | 1.25 / 65px | 1.25 / 65px |
| display_8 | 48px | 500 | 1.25 / 60px | 1.25 / 60px |
| display_9 | 48px | 400 | 1.25 / 60px | 1.25 / 60px |
| display_10 | 40px | 600 | 1.25 / 50px | 1.25 / 50px |
| display_11 | 40px | 400 | 1.25 / 50px | 1.25 / 50px |
| headline_1 | 32px | 700 | 1.25 / 40px | 1.25 / 40px |
| headline_2 | 32px | 600 | 1.25 / 40px | 1.25 / 40px |
| headline_3 | 32px | 400 | 1.25 / 40px | 1.25 / 40px |
| headline_4 | 28px | 600 | 1.25 / 35px | 1.25 / 35px |
| headline_5 | 28px | 500 | 1.25 / 35px | 1.25 / 35px |
| headline_6 | 28px | 400 | 1.25 / 35px | 1.25 / 35px |
| headline_7 | 26px | 600 | 1.25 / 32.5px | 1.25 / 32.5px |
| headline_8 | 24px | 700 | 1.25 / 30px | 1.25 / 30px |
| headline_9 | 24px | 600 | 1.25 / 30px | 1.25 / 30px |
| headline_10 | 24px | 400 | 1.25 / 30px | 1.25 / 30px |
| title_1 | 20px | 700 | 1.5 / 30px | 1.5 / 30px |
| title_2 | 20px | 600 | 1.5 / 30px | 1.5 / 30px |
| title_3 | 20px | 400 | 1.5 / 30px | 1.5 / 30px |
| title_4 | 18px | 700 | 1.5 / 27px | 1.5 / 27px |
| title_5 | 18px | 600 | 1.5 / 27px | 1.5 / 27px |
| title_6 | 18px | 400 | 1.5 / 27px | 1.5 / 27px |
| title_7 | 16px | 600 | 1.5 / 24px | 1.5 / 24px |
| title_8 | 16px | 500 | 1.5 / 24px | 1.5 / 24px |
| body_1 | 16px | 400 | 1.5 / 24px | 1.5 / 24px |
| body_2 | 15px | 500 | 1.5 / 22.5px | 1.5 / 22.5px |
| body_3 | 15px | 400 | 1.5 / 22.5px | 1.5 / 22.5px |
| label_1 | 14px | 700 | 1.5 / 21px | 1.5 / 21px |
| label_2 | 14px | 500 | 1.5 / 21px | 1.5 / 21px |
| label_3 | 14px | 400 | 1.5 / 21px | 1.5 / 21px |
| meta_1 | 13px | 500 | 1.5 / 19.5px | 1.5 / 19.5px |
| meta_2 | 13px | 400 | 1.5 / 19.5px | 1.5 / 19.5px |
| caption_1 | 12px | 500 | 1.5 / 18px | 1.5 / 18px |
| caption_2 | 12px | 400 | 1.5 / 18px | 1.5 / 18px |

### 4.2 전역 변수와 조합 클래스 예시

색상 변수와 함께 전역에 한 번 선언한다. 조합 클래스 대신 프로젝트의 Typography API를 써도 된다. 크기만 바꾸는 유틸리티로 굵기·행간 계약을 깨지 않는다. 영어 행간 예외는 실제 언어 범위에만 적용한다.

```css
:root {

    --font-sans: var(--font-pretendard, 'Pretendard Variable'), 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif;

    --font-size-12: 12px;

    --font-size-13: 13px;

    --font-size-14: 14px;

    --font-size-15: 15px;

    --font-size-16: 16px;

    --font-size-18: 18px;

    --font-size-20: 20px;

    --font-size-24: 24px;

    --font-size-26: 26px;

    --font-size-28: 28px;

    --font-size-32: 32px;

    --font-size-40: 40px;

    --font-size-48: 48px;

    --font-size-52: 52px;

    --font-size-60: 60px;

    --font-size-80: 80px;

    --font-size-90: 90px;

    --font-size-115: 115px;

    --font-weight-400: 400;

    --font-weight-500: 500;

    --font-weight-600: 600;

    --font-weight-700: 700;

}



.type-display_1 {
    font-size: var(--font-size-115);
    font-weight: var(--font-weight-600);
    line-height: 1.25;
    letter-spacing: 0;
}

.type-display_2 {
    font-size: var(--font-size-115);
    font-weight: var(--font-weight-400);
    line-height: 1.25;
    letter-spacing: 0;
}

.type-display_3 {
    font-size: var(--font-size-90);
    font-weight: var(--font-weight-400);
    line-height: 1.25;
    letter-spacing: 0;
}

.type-display_4 {
    font-size: var(--font-size-80);
    font-weight: var(--font-weight-400);
    line-height: 1.25;
    letter-spacing: 0;
}

.type-display_5 {
    font-size: var(--font-size-60);
    font-weight: var(--font-weight-400);
    line-height: 1.25;
    letter-spacing: 0;
}

.type-display_6 {
    font-size: var(--font-size-52);
    font-weight: var(--font-weight-600);
    line-height: 1.25;
    letter-spacing: 0;
}

.type-display_7 {
    font-size: var(--font-size-52);
    font-weight: var(--font-weight-400);
    line-height: 1.25;
    letter-spacing: 0;
}

.type-display_8 {
    font-size: var(--font-size-48);
    font-weight: var(--font-weight-500);
    line-height: 1.25;
    letter-spacing: 0;
}

.type-display_9 {
    font-size: var(--font-size-48);
    font-weight: var(--font-weight-400);
    line-height: 1.25;
    letter-spacing: 0;
}

.type-display_10 {
    font-size: var(--font-size-40);
    font-weight: var(--font-weight-600);
    line-height: 1.25;
    letter-spacing: 0;
}

.type-display_11 {
    font-size: var(--font-size-40);
    font-weight: var(--font-weight-400);
    line-height: 1.25;
    letter-spacing: 0;
}

.type-headline_1 {
    font-size: var(--font-size-32);
    font-weight: var(--font-weight-700);
    line-height: 1.25;
    letter-spacing: 0;
}

.type-headline_2 {
    font-size: var(--font-size-32);
    font-weight: var(--font-weight-600);
    line-height: 1.25;
    letter-spacing: 0;
}

.type-headline_3 {
    font-size: var(--font-size-32);
    font-weight: var(--font-weight-400);
    line-height: 1.25;
    letter-spacing: 0;
}

.type-headline_4 {
    font-size: var(--font-size-28);
    font-weight: var(--font-weight-600);
    line-height: 1.25;
    letter-spacing: 0;
}

.type-headline_5 {
    font-size: var(--font-size-28);
    font-weight: var(--font-weight-500);
    line-height: 1.25;
    letter-spacing: 0;
}

.type-headline_6 {
    font-size: var(--font-size-28);
    font-weight: var(--font-weight-400);
    line-height: 1.25;
    letter-spacing: 0;
}

.type-headline_7 {
    font-size: var(--font-size-26);
    font-weight: var(--font-weight-600);
    line-height: 1.25;
    letter-spacing: 0;
}

.type-headline_8 {
    font-size: var(--font-size-24);
    font-weight: var(--font-weight-700);
    line-height: 1.25;
    letter-spacing: 0;
}

.type-headline_9 {
    font-size: var(--font-size-24);
    font-weight: var(--font-weight-600);
    line-height: 1.25;
    letter-spacing: 0;
}

.type-headline_10 {
    font-size: var(--font-size-24);
    font-weight: var(--font-weight-400);
    line-height: 1.25;
    letter-spacing: 0;
}

.type-title_1 {
    font-size: var(--font-size-20);
    font-weight: var(--font-weight-700);
    line-height: 1.5;
    letter-spacing: 0;
}

.type-title_2 {
    font-size: var(--font-size-20);
    font-weight: var(--font-weight-600);
    line-height: 1.5;
    letter-spacing: 0;
}

.type-title_3 {
    font-size: var(--font-size-20);
    font-weight: var(--font-weight-400);
    line-height: 1.5;
    letter-spacing: 0;
}

.type-title_4 {
    font-size: var(--font-size-18);
    font-weight: var(--font-weight-700);
    line-height: 1.5;
    letter-spacing: 0;
}

.type-title_5 {
    font-size: var(--font-size-18);
    font-weight: var(--font-weight-600);
    line-height: 1.5;
    letter-spacing: 0;
}

.type-title_6 {
    font-size: var(--font-size-18);
    font-weight: var(--font-weight-400);
    line-height: 1.5;
    letter-spacing: 0;
}

.type-title_7 {
    font-size: var(--font-size-16);
    font-weight: var(--font-weight-600);
    line-height: 1.5;
    letter-spacing: 0;
}

.type-title_8 {
    font-size: var(--font-size-16);
    font-weight: var(--font-weight-500);
    line-height: 1.5;
    letter-spacing: 0;
}

.type-body_1 {
    font-size: var(--font-size-16);
    font-weight: var(--font-weight-400);
    line-height: 1.5;
    letter-spacing: 0;
}

.type-body_2 {
    font-size: var(--font-size-15);
    font-weight: var(--font-weight-500);
    line-height: 1.5;
    letter-spacing: 0;
}

.type-body_3 {
    font-size: var(--font-size-15);
    font-weight: var(--font-weight-400);
    line-height: 1.5;
    letter-spacing: 0;
}

.type-label_1 {
    font-size: var(--font-size-14);
    font-weight: var(--font-weight-700);
    line-height: 1.5;
    letter-spacing: 0;
}

.type-label_2 {
    font-size: var(--font-size-14);
    font-weight: var(--font-weight-500);
    line-height: 1.5;
    letter-spacing: 0;
}

.type-label_3 {
    font-size: var(--font-size-14);
    font-weight: var(--font-weight-400);
    line-height: 1.5;
    letter-spacing: 0;
}

.type-meta_1 {
    font-size: var(--font-size-13);
    font-weight: var(--font-weight-500);
    line-height: 1.5;
    letter-spacing: 0;
}

.type-meta_2 {
    font-size: var(--font-size-13);
    font-weight: var(--font-weight-400);
    line-height: 1.5;
    letter-spacing: 0;
}

.type-caption_1 {
    font-size: var(--font-size-12);
    font-weight: var(--font-weight-500);
    line-height: 1.5;
    letter-spacing: 0;
}

.type-caption_2 {
    font-size: var(--font-size-12);
    font-weight: var(--font-weight-400);
    line-height: 1.5;
    letter-spacing: 0;
}

:is(.type-display_1, .type-display_2):lang(en) {
    line-height: 1.2;
}
```

## 5. Foundation: Raw 규격

색상·타이포그래피 이외에는 아래 raw 값을 사용한다. px가 아닌 환경에서는 단위 환산 규칙을 적용한다. 컴포넌트 내부 크기는 개별 명세가 기준이며 일반 간격 스케일을 이유로 반올림하지 않는다.

| 항목 | 등록 값 | 적용 범위 |
| --- | --- | --- |
| Padding | 0px, 2px, 4px, 8px, 12px, 16px, 20px, 24px, 28px, 32px, 36px, 40px, 44px, 48px, 52px, 60px | 일반 컨테이너 양수 최소 4px; 2px은 등록된 토글 내부 전용 |
| Gap | 0px, 4px, 8px, 12px, 16px, 20px, 24px, 32px, 40px, 60px | 텍스트 블록 최소 4px; 독립 오브젝트 최소 8px; 컴포넌트 내부는 개별 규격 |
| Border Radius | 0px, 2px, 4px, 8px, 10px, 16px, 20px, 24px, 32px, 40px, 9999px | 선택한 variant의 반경 준수; full=9999px |
| Border Width | 0px, 0.5px, 1px, 2px, 3px | 0.5/1/2/3px도 등록 값; 4px 배수로 보정하지 않음 |

### 그림자

색상은 테마에 맞춰 바꿀 수 있지만 선택한 그림자의 offset·blur·spread·다중 레이어 구조는 유지한다. 그림자 Foundation이 있다고 모든 버튼에 그림자를 추가하지 않는다. 선택한 variant에 없는 그림자를 임의로 덧붙이지 않는다.

| 이름 | box-shadow 기준값 |
| --- | --- |
| shadow_1 | `0 8px 14px rgba(34, 34, 34, 0.18)` |
| shadow_2 | `8px 8px 20px rgb(33 34 37 / 0.2)` |
| shadow_3 | `0 0 2px 0 rgba(0, 0, 0, 0.08), 0 16px 24px 0 rgba(0, 0, 0, 0.12)` |
| shadow_4 | `0 24px 24px -4px rgba(34, 34, 34, 0.18)` |
| shadow_5 | `0 24px 40px rgba(0, 0, 0, 0.1)` |

### 아이콘

등록 너비는 **8, 12, 14, 16, 18, 20, 24, 28, 32, 40, 45, 80, 120, 180px**이다. 종횡비를 유지한다. `icon_16`의 기준 너비는 정확히 16px이다. 14·18·45를 4px 배수로 반올림하지 않는다.

아이콘 자체만 버튼인 경우와 테두리·배경이 있는 아이콘 버튼을 구분한다. 후자는 외곽과 내부 아이콘 크기가 다르다. 내부 `icon_18`을 이유로 버튼 외곽까지 18px로 줄이거나 아이콘을 외곽에 꽉 채우지 않는다. 내부 크기는 부록의 `icons` 배열을 따른다.

아이콘 종류·파일은 제공하지 않는다. 프로젝트 자산을 연결한다. img·inline SVG·아이콘 라이브러리는 가능하지만 크기·상태·종횡비를 지킨다. 외부 SVG img의 내부 stroke가 부모 color만으로 바뀐다고 가정하지 말고 밝은/어두운 자산, inline SVG, 명세의 filter 등 적합한 방식을 사용한다.

```css
.icon_8 {
    display: block;
    width: 8px;
    height: auto;
    flex-shrink: 0;
}
.icon_12 {
    display: block;
    width: 12px;
    height: auto;
    flex-shrink: 0;
}
.icon_14 {
    display: block;
    width: 14px;
    height: auto;
    flex-shrink: 0;
}
.icon_16 {
    display: block;
    width: 16px;
    height: auto;
    flex-shrink: 0;
}
.icon_18 {
    display: block;
    width: 18px;
    height: auto;
    flex-shrink: 0;
}
.icon_20 {
    display: block;
    width: 20px;
    height: auto;
    flex-shrink: 0;
}
.icon_24 {
    display: block;
    width: 24px;
    height: auto;
    flex-shrink: 0;
}
.icon_28 {
    display: block;
    width: 28px;
    height: auto;
    flex-shrink: 0;
}
.icon_32 {
    display: block;
    width: 32px;
    height: auto;
    flex-shrink: 0;
}
.icon_40 {
    display: block;
    width: 40px;
    height: auto;
    flex-shrink: 0;
}
.icon_45 {
    display: block;
    width: 45px;
    height: auto;
    flex-shrink: 0;
}
.icon_80 {
    display: block;
    width: 80px;
    height: auto;
    flex-shrink: 0;
}
.icon_120 {
    display: block;
    width: 120px;
    height: auto;
    flex-shrink: 0;
}
.icon_180 {
    display: block;
    width: 180px;
    height: auto;
    flex-shrink: 0;
}
```

## 6. 전역 기본값과 유틸리티

### 6.1 Reset

기존 Reset이 없는 신규 프로젝트의 기본 예시다. 기존 프로젝트에는 통째로 중복 삽입하지 않고 필요한 시스템 조건만 검토해 적용한다. 현재 시스템의 기본 표시 조건을 독립 프로젝트용으로 정리했으며 문서 화면 레이아웃은 포함하지 않았다.

```css
*, *::before, *::after {
    box-sizing: border-box;
    letter-spacing: 0;
}
html { font-size: 100%; }
body {
    margin: 0;
    font-family: var(--font-sans);
    font-size: var(--font-size-16);
    font-weight: var(--font-weight-400);
    line-height: 1.5;
    color: var(--color-text-primary);
}
button, input, select, textarea {
    margin: 0;
    font: inherit;
    color: inherit;
    letter-spacing: inherit;
}
button { border: 0; background: none; cursor: pointer; }
a { color: inherit; text-decoration: none; }
img, picture, video, canvas, svg { display: block; max-width: 100%; }
ul, ol { margin: 0; padding: 0; list-style: none; }
p, h1, h2, h3, h4, h5, h6 { margin: 0; }
h1, h2, h3, h4, h5, h6 {
    font-size: inherit;
    font-weight: inherit;
    line-height: inherit;
}
table { border-collapse: collapse; border-spacing: 0; }
fieldset { min-width: 0; margin: 0; padding: 0; border: 0; }
legend { padding: 0; }
```

루트 글자 크기는 프로젝트/사용자 기본값을 유지한다. `100%`는 루트를 억지로 16px이나 10px로 고정하라는 뜻이 아니다. rem 환경에서는 실제 기준 루트를 확인해 font-size 변수까지 환산한다. 헤딩은 의미론적 태그와 별개로 등록 조합을 명시한다. 스크롤바·브라우저 확대를 전역으로 숨기거나 차단하지 않는다. Checkbox·Radio·Toggle 외형은 Reset이 아니라 **선택한 등록 컴포넌트**에서 설정한다.

### 6.2 유틸리티 연결

유틸리티는 규격 적용 수단이지 새 스케일을 추가하는 수단이 아니다. 기존 체계가 있으면 동일 값에 매핑하고 중복 생성을 강제하지 않는다.

| 대상 | 연결 규칙 |
| --- | --- |
| 색상 | 토큰 이름에서 `--color-`를 빼고 하이픈을 밑줄로 바꾼다. `color_*`, `bg_*`, `border_color_*`가 각각 color/background-color/border-color에 원래 변수 연결 |
| Typography | `type-title_1` 등 위 표의 조합 전체 적용 |
| 아이콘 | 등록 `icon_숫자` 너비 적용 |
| 패딩 | 등록 값으로 `p_숫자`, 필요 시 `px_숫자`·`py_숫자` 제공. 상하/좌우 대칭. 2px은 등록 컴포넌트 내부 전용 |
| 간격 | 등록 Gap 값으로 `gap_숫자` 제공. 일반 텍스트 최소 4px, 독립 오브젝트 최소 8px |
| 반경·보더 | 등록 raw 값에 한해 적용. 보더 두께만으로 색상·스타일까지 결정하지 않음 |
| 그림자 | `shadow_1`~`shadow_5`의 전체 레이어 연결. 해당 variant가 허용할 때만 사용 |
| 배치 | Flex/Grid·정렬 유틸리티 허용. 컴포넌트 규격을 덮는 수단으로 쓰지 않음 |

```css
.color_blue_50 { color: var(--color-blue-50); }
.bg_blue_50 { background-color: var(--color-blue-50); }
.border_color_blue_50 { border-color: var(--color-blue-50); }
.p_16 { padding: 16px; }
.px_24 { padding-left: 24px; padding-right: 24px; }
.py_8 { padding-top: 8px; padding-bottom: 8px; }
.gap_8 { gap: 8px; }
.gap_16 { gap: 16px; }
.flex { display: flex; }
.inline_flex { display: inline-flex; }
.flex_col { flex-direction: column; }
.flex_row { flex-direction: row; }
.flex_wrap { flex-wrap: wrap; }
.items_start { align-items: flex-start; }
.items_center { align-items: center; }
.items_end { align-items: flex-end; }
.justify_start { justify-content: flex-start; }
.justify_center { justify-content: center; }
.justify_between { justify-content: space-between; }
.grid { display: grid; }
.min_w_0 { min-width: 0; }
.w_full { width: 100%; }
```

위는 연결 예시다. 유틸리티를 제공하는 프로젝트는 선택한 계열의 **등록 값 전체**에 대해 연결 누락을 검사한다. `px_24`의 px는 좌우 패딩을 뜻하며 px 단위 강제가 아니다. 프레임워크가 이미 `flex-col` 같은 동등한 유틸리티를 제공하면 사용한다.

## 7. Design Rules

현재 Rules의 전체 적용 기준, 16개 규칙, 적용·검수 안내다. `필수`는 규격 계약이고 `권장`은 프로젝트 환경을 우선하되 최대한 지킬 구현 방향이다. 예시 문구와 배치에는 복제 의무가 없다.

### 적용 기준

이 시스템에서 생성한 MD 파일을 받은 모든 앱과 웹은 Foundation·Component·Design Rules를 기본 규칙으로 반드시 따른다. Module 탭의 예시와 Foundation의 아이콘 종류 나열은 규정 대상이 아니며 MD의 시스템 규칙에서도 제외한다. 단, 아이콘 크기 규칙은 포함한다. 등록된 컴포넌트는 해당 종류·variant·size·상태의 수치를 사용하고, 등록되지 않은 오브젝트는 프로젝트에 맞게 만들되 Foundation의 허용 값과 Design Rules를 따른다. 색상과 font-family는 자유롭게 선택하되 색상 체계와 Typography 수치는 준수한다. 클래스·태그·CSS 분리 및 구현 방식은 동일한 규격을 구현하는 범위에서 프로젝트 환경에 맞춘다. 규칙 이탈이 필요하거나 등록된 컴포넌트를 전혀 다른 디자인으로 만들려면 구현 전에 해당 규칙·사유·변경 범위와 시스템 비준수 여부를 먼저 알린다. 사전 고지 없이 규칙을 우회하거나 다른 규격을 시스템 준수 컴포넌트로 표시하지 않는다. 아래 예시의 콘텐츠와 구도는 설명용이며 그대로 복제할 의무는 없다.

### 01 · 간격

필수: 서로 다른 텍스트 블록은 최소 4px, 버튼·입력·이미지 등 독립 오브젝트는 최소 8px 간격을 둔다. 양수 간격은 4px 단위로 선택하고 같은 역할에는 같은 값을 적용한다. 권장: 내부보다 그룹 사이, 그룹보다 섹션 사이의 간격을 크게 정해 반복 사용한다. 불필요한 바깥 간격은 0으로 둘 수 있으나 독립 요소 사이의 최소 간격은 유지한다. 텍스트 간격은 제목과 설명 같은 블록 사이를 뜻하며 글자·단어·행간에 더하는 값이 아니다. 컴포넌트 내부는 해당 규격을 따르고 글자 크기·행간·테두리·아이콘 도형을 4px 배수로 반올림하지 않는다.

설명 예시: 텍스트 4px / 오브젝트 8px / 그룹 24px

### 02 · 패딩 대칭

필수: 일반 컨테이너의 내부 여백은 필요한 경우에만 최소 4px부터 Foundation에 등록된 4px 단위 값을 사용한다. 상하끼리, 좌우끼리 같은 값을 적용하고 같은 역할의 컨테이너에 통일한다. 여백이 필요 없으면 0을 사용한다. 등록된 컴포넌트 내부는 해당 패딩 규격을 따르며, 기본 Filled 버튼 Medium의 상하 0px·좌우 24px이나 토글 내부 2px은 일반 컨테이너의 패딩 기준과 구분한다. 아이콘 공간의 비대칭도 등록된 컴포넌트 값만 사용하며 아이콘 너비와 텍스트 간격을 함께 반영한다. 패딩을 구현하는 CSS 작성 방식은 강제하지 않는다.

설명 예시: 상하 8px·좌우 16px / 상하 16px·좌우 24px

### 03 · 공통 정렬선

필수: 같은 콘텐츠 영역의 제목·본문·입력·목록은 시작선을 맞춘다. 반복 항목의 패딩과 간격을 통일하고 중첩 컨테이너에 같은 패딩을 중복 적용하지 않는다. 중앙 정렬이나 의도적인 들여쓰기는 허용하되 같은 그룹 안에서 정렬 방식이 이유 없이 섞이지 않게 한다.

설명 예시: 제목, 본문, 버튼의 시작선

### 04 · 텍스트 크기와 행간

필수: 최소 글자 크기는 12px이며 일반 텍스트와 모든 컴포넌트 내부 텍스트는 Foundation에 등록된 글자 크기·굵기·행간 조합을 사용한다. 기본 본문은 16px·행간 24px을 권장한다. 행간은 24px 이상 1.25, 그 미만 1.5이며 영문 115px의 1.2처럼 등록된 언어별 조합은 해당 값을 따른다. 컴포넌트만 별도 행간이나 굵기를 임의로 사용하지 않는다. 자간은 전역 Reset의 0으로 통일하며 스타일별 자간 변형을 만들지 않는다. font-family는 선택할 수 있으나 필요한 굵기가 실제로 제공되는지 확인한다. 12px Caption은 보조 정보용이며 수치만으로 가독성을 보장하지 않는다. 이 기준은 기본 표시 상태의 규격으로 사용자 확대·텍스트 간격 조정을 차단하지 않으며, 그 대응으로 규격을 벗어나야 한다면 사전에 알린다.

| 역할 | 최소 | 최대 | 등록된 크기 |
| --- | --- | --- | --- |
| Display · 큰 강조 문구 | 40px | 115px | 40, 48, 52, 60, 80, 90, 115px |
| Headline · 주요 제목 | 24px | 32px | 24, 26, 28, 32px |
| Title · 제목·부제목 | 16px | 20px | 16, 18, 20px |
| Body · 본문 | 15px | 16px | 15, 16px |
| Label · 레이블 | 14px | 14px | 14px |
| Meta · 부가 정보 | 13px | 13px | 13px |
| Caption · 보조 설명 | 12px | 12px | 12px |

설명 예시: 동일한 크기에는 일관된 행간

### 05 · 제목과 본문의 위계

필수: 제목·부제목은 본문보다 큰 글자 또는 강한 굵기로 구분한다. Foundation에 등록된 조합을 사용하고 같은 역할의 제목은 페이지 전체에서 통일한다. 본문이 16px·400이면 제목은 16px·600 또는 20px·600처럼 선택할 수 있다. 모든 제목을 무조건 가장 굵게 만들거나 색상 차이만으로 구분하지 않는다.

설명 예시: 24px·600 제목 / 16px·400 본문

### 06 · 버튼과 컴포넌트 규격

필수: 시스템에 등록된 종류의 컴포넌트는 해당 variant·size·상태를 골라 사용한다. 색상과 font-family를 제외한 반경·테두리·그림자·높이·패딩·글자 크기·굵기·행간·내부 간격·아이콘 크기는 등록 규격을 따른다. 컴포넌트의 모든 텍스트 조합은 Foundation과 일치해야 한다. 예를 들어 Rounded를 선택할 수는 있지만 선택한 Rounded의 반경 수치는 임의로 바꾸지 않는다. 아래는 기본 Filled 버튼의 기준이며 다른 종류에 일괄 적용하지 않는다. 수치와 화면 결과가 기준이며 height·min-height·Flex·Grid 등 구현 속성을 강제하지 않는다. 같은 내용과 크기에서는 포커스·비활성·로딩 전환으로 외곽 크기와 정렬이 흔들리지 않게 한다. 긴 내용은 배치를 조정해 수용한다. 등록되지 않은 오브젝트는 자유롭게 구성하되 Foundation과 Design Rules를 따른다. 이미 등록된 종류를 다른 이름으로 만들어 규칙을 피하거나, 새 디자인을 사전 고지 없이 기존 시스템 컴포넌트로 취급하지 않는다.

| 크기 | 높이 기준 | 패딩 상하 / 좌우 | 글자 / 굵기 / 행간 |
| --- | --- | --- | --- |
| Small | 44px | 0px / 20px | 15px / 500 / 1.5 |
| Medium | 56px | 0px / 24px | 16px / 500 / 1.5 |
| Large | 60px | 0px / 32px | 18px / 600 / 1.5 |
| Xlarge | 64px | 0px / 40px | 20px / 600 / 1.5 |

설명 예시: 같은 사이즈, 같은 규격

### 07 · 레이아웃과 반응형

필수: 콘텐츠 최대 너비·화면 좌우 패딩·열 수·열 간격·전환 기준과 데스크톱·모바일 간격표를 정하고 같은 페이지 유형에 공유한다. 모바일은 큰 섹션 여백을 줄이되 같은 역할의 간격과 4px 체계를 유지한다. 열 축소와 줄바꿈으로 겹침·잘림·페이지 전체의 가로 스크롤을 방지하고, 비교표처럼 이차원 구조가 필요한 영역만 내부 스크롤을 허용한다. 반복 이미지의 비율과 제목·액션 정렬을 통일하며 원본을 찌그러뜨리거나 필수 정보를 잘라내지 않는다. 일반 콘텐츠는 320 CSS px 너비와 200% 글자 확대에서도 정보·기능 유실을 검수한다. 특정 열 수나 최대 너비는 강제하지 않으며 아래 2행 3열·최대 960px·640px 전환은 예시다.

설명 예시: 넓은 화면 2행 3열, 좁은 화면 1열

### 08 · 배치 방식 권장사항

권장: 배치용 마진은 사용하지 않고 간격은 최대한 gap으로 조정하며 한 방향 배치는 Flexbox를 우선한다. 반복 콘텐츠가 2행 이상이면서 2열 이상이면 Grid를 우선하고 n행 1열이나 1행 n열은 제외한다. 반응형에서 달라지는 행·열 수에 맞게 선택한다. 위 방식은 프로젝트 환경에 맞춰 선택할 수 있는 구현 권장사항이며 동일한 Foundation 수치와 배치 규칙을 충족하면 다른 CSS 방식으로 구현할 수 있다. 불필요한 중첩이나 강제 구조 변경은 피하고 실제 데이터 표의 비교 구조는 유지한다. 기본 여백을 0으로 초기화하는 것은 배치용 마진 사용과 구분한다.

설명 예시: 한 방향의 버튼 배치

### 09 · 폼의 묶음과 입력 너비

필수: 레이블·설명·입력·오류를 한 그룹으로 묶고 오류는 해당 입력의 시작선에 맞춰 연결한다. 관련 선택 항목도 함께 묶으며 그룹 내부와 다음 그룹 사이의 간격을 구분한다. 권장: 모바일은 세로 배치를 기본으로 하고 입력 옆 액션은 공간이 부족하면 아래에 둔다. 입력 너비는 예상 내용 길이에 맞추되 화면 밖으로 넘치지 않게 한다. 이는 폼 배치 규칙이지 별도 Fixed Width 컴포넌트를 강제하는 규칙이 아니다.

설명 예시: 한 입력에 연결된 레이블과 안내

### 10 · 긴 본문의 읽기 너비

권장: 긴 본문 최대 너비는 전체 레이아웃 최대 너비와 구분한다. 넓은 화면에서도 장문을 끝까지 펼치지 않으며 언어·글자 크기·콘텐츠에 맞는 읽기 너비를 프로젝트 안에서 일관되게 사용한다. 특정 픽셀 값이나 영문 기준 글자 수를 모든 프로젝트와 국문 본문에 강제하지 않는다.

설명 예시: 페이지 안에서 제한된 본문 너비

### 11 · 텍스트 잘림 허용 범위

필수: 목록 제목과 미리보기의 말줄임은 전체 내용을 확인할 경로가 있을 때만 허용한다. 입력 레이블·오류·필수 안내는 말줄임이나 고정 높이로 자르지 않고 여러 줄로 표시한다. 특정 프로젝트의 2줄 말줄임 사례를 모든 제목에 강제하지 않으며 긴 내용을 맞추려고 최소 글자 크기보다 작게 줄이지 않는다.

설명 예시: 잘리지 않는 오류 안내

### 12 · 화면 순서와 읽기 순서

필수: 화면 표시·읽기·키보드 이동 순서는 논리적으로 일치해야 한다. 모바일에서도 설명을 읽고 입력한 뒤 액션을 실행하는 흐름을 유지한다. 독립적인 영역의 배치는 의미와 조작 순서가 유지되는 범위에서 조정할 수 있다.

설명 예시: 안내 다음 확인 동작

### 13 · 단위와 환경

필수: px는 강제 단위가 아닌 기본 환경의 설계 기준값이다. 프로젝트의 기준을 먼저 확인하고 Foundation과 Component의 길이 값을 일관되게 환산한다. 기준 루트 글자 크기가 16px이면 56px은 3.5rem, 10px이면 5.6rem이며 환산 편의를 위해 기존 루트 설정을 바꾸지 않는다. 4px 간격 체계도 환산된 값의 배수로 유지한다. em·%·vw 등은 요소·부모·화면 등 기준이 달라 일괄 환산하지 않는다. 단위 없는 행간·굵기·투명도·비율은 유지한다. 수치의 의미와 기본 화면 결과를 지키는 범위에서 height·min-height 등 구현 방법은 선택할 수 있으며 특정 CSS 속성을 강제하지 않는다. 얇은 테두리는 프로젝트 정책에 따라 px를 유지할 수 있다. 미디어쿼리의 rem/em은 페이지 루트 설정이 아닌 브라우저·사용자의 초기 글자 크기 기준이므로 분기점은 별도로 확인한다. 사용자 확대를 원래 px 크기로 고정하지 않으며 확대·반응형 대응으로 규격을 벗어나야 한다면 구현 전에 알린다. 아래는 1rem이 16px인 기준 환경의 환산 예시다.

설명 예시: 루트 글자 크기 16px 기준, 56px과 3.5rem 비교

### 14 · 색상과 폰트 선택

색상과 font-family는 프로젝트에 맞게 선택하되 임의의 스타일 수치를 추가하지 않는다. 색상은 기존 Atomic·Semantic 토큰을 우선 사용하고 같은 값은 재사용한다. 고유한 메인색은 원본을 50으로 두고 10·20·30·40·50·60·70·80·90·95·99 단계의 공식 팔레트로 등록한다. 10~40은 원본 비중 20·40·60·80%로 검정과, 60~99는 흰색 비중 20·40·60·80·90·98%로 원본과 OKLCH 보간한다. 결과는 sRGB 범위를 확인해 유효한 HEX/RGB로 기록하며 50의 입력 원본은 변경하지 않는다. 기존 팔레트의 추가 단계는 삭제하지 않는다. 새 팔레트는 글자색·배경색·테두리색 토큰과 유틸리티에 연결한다. 이 절차에 따른 색상 추가는 허용된 시스템 확장이며 규칙 이탈이 아니다. 배경과 글자의 대비 및 상태 구분을 검수하고, 폰트 변경 후에도 Foundation의 크기·굵기·행간·자간과 콘텐츠 표시를 유지한다.

### 15 · 아이콘 크기

아이콘 종류와 그림은 프로젝트에 맞게 선택하며 카탈로그의 목록 자체는 규칙이 아니다. 너비는 Foundation에 등록된 8·12·14·16·18·20·24·28·32·40·45·80·120·180px을 사용하고 원본 종횡비를 유지한다. 4px 배수 기반이지만 등록된 14·18·45px도 허용하며 임의로 반올림하지 않는다. icon_16은 기준 너비 16px처럼 클래스 이름과 적용 크기를 일치시킨다. 다른 단위 환경에서는 같은 기준 크기로 환산한다. 컴포넌트 내부 아이콘은 해당 variant와 size에 지정된 등록 크기를 따른다.

### 16 · 규칙 이탈과 사전 고지

기본 구현은 Foundation·Component·Design Rules를 반드시 준수한다. 사용자 확대나 접근성 대응 등으로 기본 규격을 벗어나야 한다면 AI는 코드 작성·변경 전에 어떤 규칙을 왜 벗어나며 적용 범위와 결과가 어떻게 달라지는지 먼저 알려야 한다. 시스템에 이미 있는 종류라도 사용자가 전혀 다른 디자인을 요청하면 구현 전에 시스템을 따르지 않는 별도 컴포넌트임을 명확히 알리고 해당 부분을 구분한다. 사전 고지를 시스템 전체의 규칙을 무시하는 근거로 삼지 않으며 관련 없는 규격은 계속 유지한다. 이탈한 결과를 시스템 준수 컴포넌트로 표시하지 않는다. 시스템에 없는 오브젝트가 Foundation과 Design Rules 안에서 만들어지거나 공식 절차로 색상을 추가하는 것은 규칙 이탈이 아니다. 사용자 확대 대응은 구현 단계에서 사전에 설명하며 실제 사용자가 확대할 때마다 AI가 개입하는 방식은 요구하지 않는다.

### 적용과 검수

MD로 전달할 때는 Foundation의 실제 값·아이콘 크기, Component의 종류별·크기별·상태별 규격, Design Rules와 초기 세팅 지침을 함께 포함한다. Module 예시와 아이콘 종류 목록은 시스템 규칙에서 제외하며 예시만으로 수치를 추측하지 않는다. 모든 컴포넌트의 글자 크기·굵기·행간이 Foundation과 일치하고 자간이 0인지, 색상 체계·간격·패딩·정렬·상태별 크기·모바일 줄바꿈·글자 확대가 기준을 따르는지 검수한다. 규칙 이탈과 기존 종류의 새로운 디자인은 구현 전에 비준수 내용·사유·범위를 고지했는지 확인하고 별도로 구분한다. 구현 방식 선택이나 단위 환산 자체는 규격 이탈이 아니다. 최소 12px과 4px 간격 체계는 이 시스템의 자체 기준이다.

## 8. Component 적용

### 8.1 선택과 네이밍

- 요청을 `종류 → variant → 크기 → 상태 → 아이콘 유무`로 해석한다. 종류가 다르면 같은 Small 이름이어도 수치가 다르다. 모든 컴포넌트를 버튼 높이에 맞추지 않는다.
- “Filled Xlarge 버튼”은 일반 Buttons/Filled의 `btn_primary_filled_xlarge`다. Rounded 요청이 없으면 Rounded나 Full Rounded를 임의로 붙이지 않는다. “아이콘 단독 버튼”과 “텍스트 버튼 + 아이콘”도 구분한다.
- 크기 미지정은 해당 표의 Medium을 기본으로 사용한다. Button+icon/Filled의 열은 외형 없는 아이콘 너비이므로 `width 8px` 같은 실제 열과 icons를 확인한다.
- 부록의 클래스명은 규격 식별자다. 그대로 사용하거나 프로젝트 규칙에 따라 분리·변환할 수 있지만 어떤 규격인지 추적 가능해야 한다.
- 동작은 button, 이동은 a/라우터 링크 등 적합한 태그로 같은 규격을 구현한다. input/select/textarea의 실제 입력 기능을 단순 div로 대체하지 않는다.
- 다른 규격 ID를 섞어 등록되지 않은 중간 수치를 만들지 않는다. 새 변형이 필요하면 먼저 시스템 이탈 또는 확장 여부를 알린다.

### 8.2 크기와 상태

부록의 CSS 속성은 수치 관계를 전달하는 명세다. `min-height: 56px`은 반드시 같은 CSS 속성을 쓰라는 뜻이 아니다. 같은 기준 결과와 콘텐츠 수용·확대 대응을 보장해야 한다. 높이만 맞추고 padding·border·font·line-height를 바꾸면 불일치다.

100%, auto, max-width 등 유동성도 규격의 일부다. Auto Height Text Area는 최소 높이와 내용에 따른 자동 증가를 함께 구현한다. field-sizing을 쓰지 못하는 환경에서는 동등한 동작을 제공한다.

Disabled·Focus·Error·View 등의 클래스는 시각 상태 명세다. 실제 disabled·readonly·검증·키보드 기능까지 자동 제공하는 것은 아니다. 같은 내용에서 상태 변경으로 외곽 크기와 정렬이 흔들리지 않게 검수한다. 크기 유지용 투명 보더도 제거하지 않는다.

Disabled는 계열별 Filled 비활성 외형을 기준으로 개별 명세에 반영되어 있다. 아이콘도 비활성 색으로 바꾼다. 색상 테마 변경은 가능하지만 상태 구분과 개별 크기·반경은 유지한다.

### 8.3 내부 요소와 기능

- Input은 래퍼뿐 아니라 실제 input의 min-width·padding·border·font 상속·placeholder까지 반영한다. Password 눈 아이콘에 표시/숨기기 기능을 붙일 때는 접근 가능한 액션으로 구현한다.
- Select는 래퍼, 내부 select, 앞 아이콘, 화살표를 구분한다. icons 배열은 DOM 순서이며 앞 아이콘과 화살표 크기를 같다고 추정하지 않는다. 실제 옵션·선택·비활성 상태와 접근 가능한 이름을 연결한다.
- Checkbox/Radio/Toggle은 native checked·disabled 또는 동등한 상태 모델을 사용한다. 같은 클래스의 Default와 Checked는 동일 규격의 상태 사례다.
- 실제 Tab은 선택 상태·패널 연결·키보드 이동을 제공한다. 별도 Active 행이 없다는 이유로 선택 상태 자체를 없애지 않는다. 미등록 새 외형이 필요하면 사전에 알린다.
- Chip/Badge/Hashtag가 정보 표시용이면 불필요한 button 역할을 부여하지 않는다. 추가 동작에는 접근 가능한 이름·조작을 제공한다.
- 장식 아이콘은 빈 alt/aria-hidden, 아이콘 단독 액션은 접근 가능한 이름을 제공한다.
- 링크에는 HTML disabled가 없으므로 비활성 링크는 aria-disabled 외에 이동·키보드·이벤트도 처리한다. 폼 안의 일반 액션은 submit 의도가 아니라면 `type="button"`을 지정한다.

### 8.4 대표 완성형 예시

부록 데이터를 CSS로 펼친 예다. 이 코드 구조를 강제하지 않는다. 색상은 테마에 맞춰 Foundation에 매핑할 수 있다.

#### btn_primary_filled_xlarge

```css
.btn_primary_filled_xlarge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    white-space: nowrap;
    appearance: none;
    cursor: pointer;
    min-height: 64px;
    padding: 0 40px;
    font-size: var(--font-size-20);
    line-height: 1.5;
    border: 0;
    border-radius: 0;
    background: var(--color-static-black);
    color: var(--color-common-100);
    box-sizing: border-box;
    font-family: inherit;
    text-decoration: none;
}

.btn_primary_filled_xlarge:hover {
    background: var(--color-static-black);
}
```

#### btn_primary_filled_rounded_small

```css
.btn_primary_filled_rounded_small {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-weight: 500;
    white-space: nowrap;
    appearance: none;
    cursor: pointer;
    min-height: 44px;
    padding: 0 20px;
    font-size: var(--font-size-15);
    line-height: 1.5;
    border: 0;
    border-radius: 8px;
    background: var(--color-static-black);
    color: var(--color-common-100);
    box-sizing: border-box;
    font-family: inherit;
    text-decoration: none;
}

.btn_primary_filled_rounded_small:hover {
    background: var(--color-static-black);
}
```

#### badge_filled_medium

```css
.badge_filled_medium {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0 16px;
    border: 0;
    border-radius: 9999px;
    background: var(--color-static-black);
    color: var(--color-common-100);
    font-size: var(--font-size-14);
    line-height: 1.5;
    font-weight: 500;
    white-space: nowrap;
    vertical-align: middle;
    min-height: 32px;
    box-sizing: border-box;
    font-family: inherit;
}
```

#### select_filled_rounded_icon_large

```css
.select_filled_rounded_icon_large {
    position: relative;
    display: block;
    width: 100%;
    min-width: 0;
    color: var(--color-label-normal);
    box-sizing: border-box;
    font-family: inherit;
}

.select_filled_rounded_icon_large > select {
    width: 100%;
    appearance: none;
    min-height: 52px;
    padding: 0 44px 0 48px;
    border: 0;
    border-radius: 8px;
    background-color: var(--color-fill-normal);
    color: var(--color-label-normal);
    font-size: var(--font-size-16);
    line-height: 1.5;
    cursor: pointer;
    font-weight: 400;
    box-sizing: border-box;
    font-family: inherit;
    display: block;
}

.select_filled_rounded_icon_large > img:first-of-type {
    position: absolute;
    left: 20px;
    top: 50%;
    height: auto;
    transform: translateY(-50%);
    pointer-events: none;
}

.select_filled_rounded_icon_large > img:last-of-type {
    position: absolute;
    right: 12px;
    top: 50%;
    display: block;
    height: auto;
    transform: translateY(-50%);
    pointer-events: none;
}
```

내부 아이콘 순서: icon_16, icon_12.

## 9. 환경 및 통합 검수

- 기존 Reset·UI 라이브러리·브라우저 기본값이 명세의 padding·border·line-height·appearance를 덮는지 확인한다. 매핑 불가능한 부분은 구현 전에 알린다.
- Tailwind Preflight 등 기존 Reset이 있으면 중복 삽입하지 않는다. 추가 Reset은 해당 프레임워크의 base layer에 두고 컴포넌트·유틸리티보다 약하게 적용되도록 한다. unlayered Reset의 `a { color: inherit; }` 등이 layered 컴포넌트를 덮지 않게 하고 모든 CSS에 !important를 붙여 해결하지 않는다. [Tailwind Preflight](https://tailwindcss.com/docs/preflight), [CSS Cascade](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascade/Introduction).
- 동적 클래스명은 빌드 결과에 스타일이 포함되는지 확인한다. CSS Modules·scoped CSS·Shadow DOM에서는 변수와 Reset 범위를 확인한다.
- SSR/Node에서는 DOM 접근을 서버 초기 실행에 넣지 않는다. 폰트·아이콘은 실제 빌드의 asset/public 규칙에 연결하고 원본 디스크 경로를 복사하지 않는다.
- 폰트·아이콘 로드, 지원 브라우저 동작, 긴 한글·영문·숫자, 좁은 화면, 글자 확대를 확인한다. MD 제공만으로 기능·반응형·접근성이 자동 검증되지는 않는다.
- 중복 Reset/변수, 미정의 var 참조, 잘못된 icon 크기, 옛 규격 잔존을 검사한다. 브라우저 검증을 못 했다면 정적 검수와 구분해 보고한다.

## 10. 전체 컴포넌트 규격 읽는 법

현재 카탈로그의 **70개 표, 736개 고유 규격, 748개 상태·크기 표시 사례**를 수록한다. Checked 행 등에서 같은 식별자가 반복될 수 있다.

각 JSON은 클래스 조합 지시가 아닌 **손실 없는 명세 압축**이다. 같은 표의 모든 사례에 동일한 속성은 shared, 개별 값은 variants[].rules에 기록한다. 구현은 프로젝트에 맞게 작성한다.

- `id`: 규격 식별자. `size`·`state`: 원본 표의 열·행.
- `shared`: 해당 표의 모든 규격에 포함할 공통 명세. 다른 표에는 상속하지 않는다.
- `rules`: 선택한 규격의 개별 값. 동일 selector/property는 shared보다 개별 값 우선.
- `&`: 선택한 컴포넌트 루트. `& > select`, `& input`, `&::after`, `&:hover`는 내부 요소·가상 요소·상태를 뜻한다. CSS nesting 문법 사용을 강제하지 않는다.
- `order`: shorthand/longhand 순서가 중요한 경우의 속성 순서. CSS로 펼칠 때 지킨다. 생략된 경우 shared와 개별 값을 병합한다.
- `selectors`: 상태 규칙의 원래 적용 순서가 필요한 경우의 selector 목록. 있으면 이 순서로 펼친다.
- `structure`: 같은 JSON의 structures에서 찾는 구조 예시. `{{component}}`에 ID, `{{icon_1_class}}` 등에 icons 값, `{{icon_1_src}}` 등에 실제 자산을 연결한다. 자리표시자를 그대로 배포하지 않는다.
- `icons`: HTML 순서의 등록 크기 클래스. 종횡비는 자산을 따른다.
- `url("{{active_icon_src}}")`: 눌림 상태 자산 교체 예시. 프로젝트 자산 또는 동등한 상태 렌더링으로 연결한다. 특정 그림은 강제하지 않는다.
- `var(...)`는 앞의 Foundation을 참조한다. inherit는 부모 속성 상속이며 최종 텍스트도 등록 조합이어야 한다.
- 같은 표의 여러 사례를 전부 더해 적용하지 않는다. **선택한 사례 하나의 shared+rules**와 실제 활성화된 상태 selector만 적용한다. native disabled/checked 등은 별도로 연결한다.

```js
function expandSpec(group, variant) {
  const selectors = variant.selectors ?? new Set([
    ...Object.keys(group.shared),
    ...Object.keys(variant.rules),
  ]);
  return [...selectors].map((selector) => {
    const properties = {
      ...group.shared[selector],
      ...variant.rules[selector],
    };
    const order = variant.order?.[selector] ?? Object.keys(properties);
    const body = order.map((name) => '  ' + name + ': ' + properties[name] + ';').join('\n');
    return selector.replaceAll('&', '.' + variant.id) + ' {\n' + body + '\n}';
  }).join('\n\n');
}
```

펼치기 예시는 수치·선택자를 복원하는 용도다. 색상·폰트 매핑, 단위 환산, 자산 경로, native 상태와 이벤트를 자동 완성하는 앱 코드는 아니다.

## 11. Component 전체 명세

### C01 Buttons / Filled

열: Small / Medium (Default) / Large / Xlarge.

```json
{
  "shared": {
    "&": {"display": "inline-flex", "align-items": "center", "justify-content": "center", "white-space": "nowrap", "appearance": "none", "line-height": "1.5", "border": "0", "border-radius": "0", "box-sizing": "border-box", "font-family": "inherit", "text-decoration": "none"}
  },
  "structures": {
    "s1": "<button class=\"{{component}}\" type=\"button\">Button</button>",
    "s2": "<button class=\"{{component}}\" type=\"button\" disabled>Button</button>"
  },
  "variants": [
    {"id": "btn_primary_filled_small", "size": "Small", "state": "Default", "structure": "s1", "rules": {"&": {"font-weight": "500", "cursor": "pointer", "min-height": "44px", "padding": "0 20px", "font-size": "var(--font-size-15)", "background": "var(--color-static-black)", "color": "var(--color-common-100)"}, "&:hover": {"background": "var(--color-static-black)"}}},
    {"id": "btn_primary_filled_medium", "size": "Medium (Default)", "state": "Default", "structure": "s1", "rules": {"&": {"font-weight": "500", "cursor": "pointer", "min-height": "56px", "padding": "0 24px", "font-size": "var(--font-size-16)", "background": "var(--color-static-black)", "color": "var(--color-common-100)"}, "&:hover": {"background": "var(--color-static-black)"}}},
    {"id": "btn_primary_filled_large", "size": "Large", "state": "Default", "structure": "s1", "rules": {"&": {"font-weight": "600", "cursor": "pointer", "min-height": "60px", "padding": "0 32px", "font-size": "var(--font-size-18)", "background": "var(--color-static-black)", "color": "var(--color-common-100)"}, "&:hover": {"background": "var(--color-static-black)"}}},
    {"id": "btn_primary_filled_xlarge", "size": "Xlarge", "state": "Default", "structure": "s1", "rules": {"&": {"font-weight": "600", "cursor": "pointer", "min-height": "64px", "padding": "0 40px", "font-size": "var(--font-size-20)", "background": "var(--color-static-black)", "color": "var(--color-common-100)"}, "&:hover": {"background": "var(--color-static-black)"}}},
    {"id": "btn_primary_filled_disabled_small", "size": "Small", "state": "disabled", "structure": "s2", "rules": {"&": {"font-weight": "500", "min-height": "44px", "padding": "0 20px", "font-size": "var(--font-size-15)", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "box-shadow": "none", "cursor": "default"}}},
    {"id": "btn_primary_filled_disabled_medium", "size": "Medium (Default)", "state": "disabled", "structure": "s2", "rules": {"&": {"font-weight": "500", "min-height": "56px", "padding": "0 24px", "font-size": "var(--font-size-16)", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "box-shadow": "none", "cursor": "default"}}},
    {"id": "btn_primary_filled_disabled_large", "size": "Large", "state": "disabled", "structure": "s2", "rules": {"&": {"font-weight": "600", "min-height": "60px", "padding": "0 32px", "font-size": "var(--font-size-18)", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "box-shadow": "none", "cursor": "default"}}},
    {"id": "btn_primary_filled_disabled_xlarge", "size": "Xlarge", "state": "disabled", "structure": "s2", "rules": {"&": {"font-weight": "600", "min-height": "64px", "padding": "0 40px", "font-size": "var(--font-size-20)", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "box-shadow": "none", "cursor": "default"}}}
  ]
}
```

### C02 Buttons / Filled+icon

열: Small / Medium (Default) / Large / Xlarge.

```json
{
  "shared": {
    "&": {"white-space": "nowrap", "appearance": "none", "display": "inline-flex", "align-items": "center", "justify-content": "center", "line-height": "1.5", "gap": "12px", "border": "0", "border-radius": "0", "box-sizing": "border-box", "font-family": "inherit", "text-decoration": "none"},
    "& > img": {"display": "block", "flex-shrink": "0", "height": "auto"}
  },
  "structures": {
    "s1": "<button class=\"{{component}}\" type=\"button\"><img class=\"{{icon_1_class}}\" src=\"{{icon_1_src}}\" alt=\"\" aria-hidden=\"true\">Button</button>",
    "s2": "<button class=\"{{component}}\" type=\"button\" disabled><img class=\"{{icon_1_class}}\" src=\"{{icon_1_src}}\" alt=\"\" aria-hidden=\"true\">Button</button>"
  },
  "variants": [
    {"id": "btn_primary_filled_icon_small", "size": "Small", "state": "Default", "structure": "s1", "icons": ["icon_12"], "rules": {"&": {"font-weight": "500", "cursor": "pointer", "min-height": "44px", "padding": "0 20px", "font-size": "var(--font-size-15)", "background": "var(--color-static-black)", "color": "var(--color-common-100)"}, "&:hover": {"background": "var(--color-static-black)"}, "& > img": {"filter": "brightness(0) invert(1)"}, "&:hover > img": {"filter": "brightness(0) invert(1)"}}, "selectors": ["&", "&:hover", "& > img", "&:hover > img"]},
    {"id": "btn_primary_filled_icon_medium", "size": "Medium (Default)", "state": "Default", "structure": "s1", "icons": ["icon_16"], "rules": {"&": {"font-weight": "500", "cursor": "pointer", "min-height": "56px", "padding": "0 24px", "font-size": "var(--font-size-16)", "background": "var(--color-static-black)", "color": "var(--color-common-100)"}, "&:hover": {"background": "var(--color-static-black)"}, "& > img": {"filter": "brightness(0) invert(1)"}, "&:hover > img": {"filter": "brightness(0) invert(1)"}}, "selectors": ["&", "&:hover", "& > img", "&:hover > img"]},
    {"id": "btn_primary_filled_icon_large", "size": "Large", "state": "Default", "structure": "s1", "icons": ["icon_18"], "rules": {"&": {"font-weight": "600", "cursor": "pointer", "min-height": "60px", "padding": "0 32px", "font-size": "var(--font-size-18)", "background": "var(--color-static-black)", "color": "var(--color-common-100)"}, "&:hover": {"background": "var(--color-static-black)"}, "& > img": {"filter": "brightness(0) invert(1)"}, "&:hover > img": {"filter": "brightness(0) invert(1)"}}, "selectors": ["&", "&:hover", "& > img", "&:hover > img"]},
    {"id": "btn_primary_filled_icon_xlarge", "size": "Xlarge", "state": "Default", "structure": "s1", "icons": ["icon_20"], "rules": {"&": {"font-weight": "600", "cursor": "pointer", "min-height": "64px", "padding": "0 40px", "font-size": "var(--font-size-20)", "background": "var(--color-static-black)", "color": "var(--color-common-100)"}, "&:hover": {"background": "var(--color-static-black)"}, "& > img": {"filter": "brightness(0) invert(1)"}, "&:hover > img": {"filter": "brightness(0) invert(1)"}}, "selectors": ["&", "&:hover", "& > img", "&:hover > img"]},
    {"id": "btn_primary_filled_icon_disabled_small", "size": "Small", "state": "disabled", "structure": "s2", "icons": ["icon_12"], "rules": {"&": {"font-weight": "500", "min-height": "44px", "padding": "0 20px", "font-size": "var(--font-size-15)", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "box-shadow": "none", "cursor": "default"}, "& > img": {"filter": "brightness(0) invert(22%)", "opacity": "0.16"}}},
    {"id": "btn_primary_filled_icon_disabled_medium", "size": "Medium (Default)", "state": "disabled", "structure": "s2", "icons": ["icon_16"], "rules": {"&": {"font-weight": "500", "min-height": "56px", "padding": "0 24px", "font-size": "var(--font-size-16)", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "box-shadow": "none", "cursor": "default"}, "& > img": {"filter": "brightness(0) invert(22%)", "opacity": "0.16"}}},
    {"id": "btn_primary_filled_icon_disabled_large", "size": "Large", "state": "disabled", "structure": "s2", "icons": ["icon_18"], "rules": {"&": {"font-weight": "600", "min-height": "60px", "padding": "0 32px", "font-size": "var(--font-size-18)", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "box-shadow": "none", "cursor": "default"}, "& > img": {"filter": "brightness(0) invert(22%)", "opacity": "0.16"}}},
    {"id": "btn_primary_filled_icon_disabled_xlarge", "size": "Xlarge", "state": "disabled", "structure": "s2", "icons": ["icon_20"], "rules": {"&": {"font-weight": "600", "min-height": "64px", "padding": "0 40px", "font-size": "var(--font-size-20)", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "box-shadow": "none", "cursor": "default"}, "& > img": {"filter": "brightness(0) invert(22%)", "opacity": "0.16"}}}
  ]
}
```

### C03 Buttons / Filled Rounded

열: Small / Medium (Default) / Large / Xlarge.

```json
{
  "shared": {
    "&": {"display": "inline-flex", "align-items": "center", "justify-content": "center", "white-space": "nowrap", "appearance": "none", "line-height": "1.5", "border": "0", "border-radius": "8px", "box-sizing": "border-box", "font-family": "inherit", "text-decoration": "none"}
  },
  "structures": {
    "s1": "<button class=\"{{component}}\" type=\"button\">Button</button>",
    "s2": "<button class=\"{{component}}\" type=\"button\" disabled>Button</button>"
  },
  "variants": [
    {"id": "btn_primary_filled_rounded_small", "size": "Small", "state": "Default", "structure": "s1", "rules": {"&": {"font-weight": "500", "cursor": "pointer", "min-height": "44px", "padding": "0 20px", "font-size": "var(--font-size-15)", "background": "var(--color-static-black)", "color": "var(--color-common-100)"}, "&:hover": {"background": "var(--color-static-black)"}}},
    {"id": "btn_primary_filled_rounded_medium", "size": "Medium (Default)", "state": "Default", "structure": "s1", "rules": {"&": {"font-weight": "500", "cursor": "pointer", "min-height": "56px", "padding": "0 24px", "font-size": "var(--font-size-16)", "background": "var(--color-static-black)", "color": "var(--color-common-100)"}, "&:hover": {"background": "var(--color-static-black)"}}},
    {"id": "btn_primary_filled_rounded_large", "size": "Large", "state": "Default", "structure": "s1", "rules": {"&": {"font-weight": "600", "cursor": "pointer", "min-height": "60px", "padding": "0 32px", "font-size": "var(--font-size-18)", "background": "var(--color-static-black)", "color": "var(--color-common-100)"}, "&:hover": {"background": "var(--color-static-black)"}}},
    {"id": "btn_primary_filled_rounded_xlarge", "size": "Xlarge", "state": "Default", "structure": "s1", "rules": {"&": {"font-weight": "600", "cursor": "pointer", "min-height": "64px", "padding": "0 40px", "font-size": "var(--font-size-20)", "background": "var(--color-static-black)", "color": "var(--color-common-100)"}, "&:hover": {"background": "var(--color-static-black)"}}},
    {"id": "btn_primary_filled_rounded_disabled_small", "size": "Small", "state": "disabled", "structure": "s2", "rules": {"&": {"font-weight": "500", "min-height": "44px", "padding": "0 20px", "font-size": "var(--font-size-15)", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "box-shadow": "none", "cursor": "default"}}},
    {"id": "btn_primary_filled_rounded_disabled_medium", "size": "Medium (Default)", "state": "disabled", "structure": "s2", "rules": {"&": {"font-weight": "500", "min-height": "56px", "padding": "0 24px", "font-size": "var(--font-size-16)", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "box-shadow": "none", "cursor": "default"}}},
    {"id": "btn_primary_filled_rounded_disabled_large", "size": "Large", "state": "disabled", "structure": "s2", "rules": {"&": {"font-weight": "600", "min-height": "60px", "padding": "0 32px", "font-size": "var(--font-size-18)", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "box-shadow": "none", "cursor": "default"}}},
    {"id": "btn_primary_filled_rounded_disabled_xlarge", "size": "Xlarge", "state": "disabled", "structure": "s2", "rules": {"&": {"font-weight": "600", "min-height": "64px", "padding": "0 40px", "font-size": "var(--font-size-20)", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "box-shadow": "none", "cursor": "default"}}}
  ]
}
```

### C04 Buttons / Filled Rounded+icon

열: Small / Medium (Default) / Large / Xlarge.

```json
{
  "shared": {
    "&": {"white-space": "nowrap", "appearance": "none", "display": "inline-flex", "align-items": "center", "justify-content": "center", "line-height": "1.5", "gap": "12px", "border": "0", "border-radius": "8px", "box-sizing": "border-box", "font-family": "inherit", "text-decoration": "none"},
    "& > img": {"display": "block", "flex-shrink": "0", "height": "auto"}
  },
  "structures": {
    "s1": "<button class=\"{{component}}\" type=\"button\"><img class=\"{{icon_1_class}}\" src=\"{{icon_1_src}}\" alt=\"\" aria-hidden=\"true\">Button</button>",
    "s2": "<button class=\"{{component}}\" type=\"button\" disabled><img class=\"{{icon_1_class}}\" src=\"{{icon_1_src}}\" alt=\"\" aria-hidden=\"true\">Button</button>"
  },
  "variants": [
    {"id": "btn_primary_filled_rounded_icon_small", "size": "Small", "state": "Default", "structure": "s1", "icons": ["icon_12"], "rules": {"&": {"font-weight": "500", "cursor": "pointer", "min-height": "44px", "padding": "0 20px", "font-size": "var(--font-size-15)", "background": "var(--color-static-black)", "color": "var(--color-common-100)"}, "&:hover": {"background": "var(--color-static-black)"}, "& > img": {"filter": "brightness(0) invert(1)"}, "&:hover > img": {"filter": "brightness(0) invert(1)"}}, "selectors": ["&", "&:hover", "& > img", "&:hover > img"]},
    {"id": "btn_primary_filled_rounded_icon_medium", "size": "Medium (Default)", "state": "Default", "structure": "s1", "icons": ["icon_16"], "rules": {"&": {"font-weight": "500", "cursor": "pointer", "min-height": "56px", "padding": "0 24px", "font-size": "var(--font-size-16)", "background": "var(--color-static-black)", "color": "var(--color-common-100)"}, "&:hover": {"background": "var(--color-static-black)"}, "& > img": {"filter": "brightness(0) invert(1)"}, "&:hover > img": {"filter": "brightness(0) invert(1)"}}, "selectors": ["&", "&:hover", "& > img", "&:hover > img"]},
    {"id": "btn_primary_filled_rounded_icon_large", "size": "Large", "state": "Default", "structure": "s1", "icons": ["icon_18"], "rules": {"&": {"font-weight": "600", "cursor": "pointer", "min-height": "60px", "padding": "0 32px", "font-size": "var(--font-size-18)", "background": "var(--color-static-black)", "color": "var(--color-common-100)"}, "&:hover": {"background": "var(--color-static-black)"}, "& > img": {"filter": "brightness(0) invert(1)"}, "&:hover > img": {"filter": "brightness(0) invert(1)"}}, "selectors": ["&", "&:hover", "& > img", "&:hover > img"]},
    {"id": "btn_primary_filled_rounded_icon_xlarge", "size": "Xlarge", "state": "Default", "structure": "s1", "icons": ["icon_20"], "rules": {"&": {"font-weight": "600", "cursor": "pointer", "min-height": "64px", "padding": "0 40px", "font-size": "var(--font-size-20)", "background": "var(--color-static-black)", "color": "var(--color-common-100)"}, "&:hover": {"background": "var(--color-static-black)"}, "& > img": {"filter": "brightness(0) invert(1)"}, "&:hover > img": {"filter": "brightness(0) invert(1)"}}, "selectors": ["&", "&:hover", "& > img", "&:hover > img"]},
    {"id": "btn_primary_filled_rounded_icon_disabled_small", "size": "Small", "state": "disabled", "structure": "s2", "icons": ["icon_12"], "rules": {"&": {"font-weight": "500", "min-height": "44px", "padding": "0 20px", "font-size": "var(--font-size-15)", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "box-shadow": "none", "cursor": "default"}, "& > img": {"filter": "brightness(0) invert(22%)", "opacity": "0.16"}}},
    {"id": "btn_primary_filled_rounded_icon_disabled_medium", "size": "Medium (Default)", "state": "disabled", "structure": "s2", "icons": ["icon_16"], "rules": {"&": {"font-weight": "500", "min-height": "56px", "padding": "0 24px", "font-size": "var(--font-size-16)", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "box-shadow": "none", "cursor": "default"}, "& > img": {"filter": "brightness(0) invert(22%)", "opacity": "0.16"}}},
    {"id": "btn_primary_filled_rounded_icon_disabled_large", "size": "Large", "state": "disabled", "structure": "s2", "icons": ["icon_18"], "rules": {"&": {"font-weight": "600", "min-height": "60px", "padding": "0 32px", "font-size": "var(--font-size-18)", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "box-shadow": "none", "cursor": "default"}, "& > img": {"filter": "brightness(0) invert(22%)", "opacity": "0.16"}}},
    {"id": "btn_primary_filled_rounded_icon_disabled_xlarge", "size": "Xlarge", "state": "disabled", "structure": "s2", "icons": ["icon_20"], "rules": {"&": {"font-weight": "600", "min-height": "64px", "padding": "0 40px", "font-size": "var(--font-size-20)", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "box-shadow": "none", "cursor": "default"}, "& > img": {"filter": "brightness(0) invert(22%)", "opacity": "0.16"}}}
  ]
}
```

### C05 Buttons / Filled Full Rounded

열: Small / Medium (Default) / Large / Xlarge.

```json
{
  "shared": {
    "&": {"display": "inline-flex", "align-items": "center", "justify-content": "center", "white-space": "nowrap", "appearance": "none", "line-height": "1.5", "border": "0", "border-radius": "9999px", "box-sizing": "border-box", "font-family": "inherit", "text-decoration": "none"}
  },
  "structures": {
    "s1": "<button class=\"{{component}}\" type=\"button\">Button</button>",
    "s2": "<button class=\"{{component}}\" type=\"button\" disabled>Button</button>"
  },
  "variants": [
    {"id": "btn_primary_filled_full_rounded_small", "size": "Small", "state": "Default", "structure": "s1", "rules": {"&": {"font-weight": "500", "cursor": "pointer", "min-height": "44px", "padding": "0 20px", "font-size": "var(--font-size-15)", "background": "var(--color-static-black)", "color": "var(--color-common-100)"}, "&:hover": {"background": "var(--color-static-black)"}}},
    {"id": "btn_primary_filled_full_rounded_medium", "size": "Medium (Default)", "state": "Default", "structure": "s1", "rules": {"&": {"font-weight": "500", "cursor": "pointer", "min-height": "56px", "padding": "0 24px", "font-size": "var(--font-size-16)", "background": "var(--color-static-black)", "color": "var(--color-common-100)"}, "&:hover": {"background": "var(--color-static-black)"}}},
    {"id": "btn_primary_filled_full_rounded_large", "size": "Large", "state": "Default", "structure": "s1", "rules": {"&": {"font-weight": "600", "cursor": "pointer", "min-height": "60px", "padding": "0 32px", "font-size": "var(--font-size-18)", "background": "var(--color-static-black)", "color": "var(--color-common-100)"}, "&:hover": {"background": "var(--color-static-black)"}}},
    {"id": "btn_primary_filled_full_rounded_xlarge", "size": "Xlarge", "state": "Default", "structure": "s1", "rules": {"&": {"font-weight": "600", "cursor": "pointer", "min-height": "64px", "padding": "0 40px", "font-size": "var(--font-size-20)", "background": "var(--color-static-black)", "color": "var(--color-common-100)"}, "&:hover": {"background": "var(--color-static-black)"}}},
    {"id": "btn_primary_filled_full_rounded_disabled_small", "size": "Small", "state": "disabled", "structure": "s2", "rules": {"&": {"font-weight": "500", "min-height": "44px", "padding": "0 20px", "font-size": "var(--font-size-15)", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "box-shadow": "none", "cursor": "default"}}},
    {"id": "btn_primary_filled_full_rounded_disabled_medium", "size": "Medium (Default)", "state": "disabled", "structure": "s2", "rules": {"&": {"font-weight": "500", "min-height": "56px", "padding": "0 24px", "font-size": "var(--font-size-16)", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "box-shadow": "none", "cursor": "default"}}},
    {"id": "btn_primary_filled_full_rounded_disabled_large", "size": "Large", "state": "disabled", "structure": "s2", "rules": {"&": {"font-weight": "600", "min-height": "60px", "padding": "0 32px", "font-size": "var(--font-size-18)", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "box-shadow": "none", "cursor": "default"}}},
    {"id": "btn_primary_filled_full_rounded_disabled_xlarge", "size": "Xlarge", "state": "disabled", "structure": "s2", "rules": {"&": {"font-weight": "600", "min-height": "64px", "padding": "0 40px", "font-size": "var(--font-size-20)", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "box-shadow": "none", "cursor": "default"}}}
  ]
}
```

### C06 Buttons / Filled Full Rounded+icon

열: Small / Medium (Default) / Large / Xlarge.

```json
{
  "shared": {
    "&": {"white-space": "nowrap", "appearance": "none", "display": "inline-flex", "align-items": "center", "justify-content": "center", "line-height": "1.5", "gap": "12px", "border": "0", "border-radius": "9999px", "box-sizing": "border-box", "font-family": "inherit", "text-decoration": "none"},
    "& > img": {"display": "block", "flex-shrink": "0", "height": "auto"}
  },
  "structures": {
    "s1": "<button class=\"{{component}}\" type=\"button\"><img class=\"{{icon_1_class}}\" src=\"{{icon_1_src}}\" alt=\"\" aria-hidden=\"true\">Button</button>",
    "s2": "<button class=\"{{component}}\" type=\"button\" disabled><img class=\"{{icon_1_class}}\" src=\"{{icon_1_src}}\" alt=\"\" aria-hidden=\"true\">Button</button>"
  },
  "variants": [
    {"id": "btn_primary_filled_full_rounded_icon_small", "size": "Small", "state": "Default", "structure": "s1", "icons": ["icon_12"], "rules": {"&": {"font-weight": "500", "cursor": "pointer", "min-height": "44px", "padding": "0 20px", "font-size": "var(--font-size-15)", "background": "var(--color-static-black)", "color": "var(--color-common-100)"}, "&:hover": {"background": "var(--color-static-black)"}, "& > img": {"filter": "brightness(0) invert(1)"}, "&:hover > img": {"filter": "brightness(0) invert(1)"}}, "selectors": ["&", "&:hover", "& > img", "&:hover > img"]},
    {"id": "btn_primary_filled_full_rounded_icon_medium", "size": "Medium (Default)", "state": "Default", "structure": "s1", "icons": ["icon_16"], "rules": {"&": {"font-weight": "500", "cursor": "pointer", "min-height": "56px", "padding": "0 24px", "font-size": "var(--font-size-16)", "background": "var(--color-static-black)", "color": "var(--color-common-100)"}, "&:hover": {"background": "var(--color-static-black)"}, "& > img": {"filter": "brightness(0) invert(1)"}, "&:hover > img": {"filter": "brightness(0) invert(1)"}}, "selectors": ["&", "&:hover", "& > img", "&:hover > img"]},
    {"id": "btn_primary_filled_full_rounded_icon_large", "size": "Large", "state": "Default", "structure": "s1", "icons": ["icon_18"], "rules": {"&": {"font-weight": "600", "cursor": "pointer", "min-height": "60px", "padding": "0 32px", "font-size": "var(--font-size-18)", "background": "var(--color-static-black)", "color": "var(--color-common-100)"}, "&:hover": {"background": "var(--color-static-black)"}, "& > img": {"filter": "brightness(0) invert(1)"}, "&:hover > img": {"filter": "brightness(0) invert(1)"}}, "selectors": ["&", "&:hover", "& > img", "&:hover > img"]},
    {"id": "btn_primary_filled_full_rounded_icon_xlarge", "size": "Xlarge", "state": "Default", "structure": "s1", "icons": ["icon_20"], "rules": {"&": {"font-weight": "600", "cursor": "pointer", "min-height": "64px", "padding": "0 40px", "font-size": "var(--font-size-20)", "background": "var(--color-static-black)", "color": "var(--color-common-100)"}, "&:hover": {"background": "var(--color-static-black)"}, "& > img": {"filter": "brightness(0) invert(1)"}, "&:hover > img": {"filter": "brightness(0) invert(1)"}}, "selectors": ["&", "&:hover", "& > img", "&:hover > img"]},
    {"id": "btn_primary_filled_full_rounded_icon_disabled_small", "size": "Small", "state": "disabled", "structure": "s2", "icons": ["icon_12"], "rules": {"&": {"font-weight": "500", "min-height": "44px", "padding": "0 20px", "font-size": "var(--font-size-15)", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "box-shadow": "none", "cursor": "default"}, "& > img": {"filter": "brightness(0) invert(22%)", "opacity": "0.16"}}},
    {"id": "btn_primary_filled_full_rounded_icon_disabled_medium", "size": "Medium (Default)", "state": "disabled", "structure": "s2", "icons": ["icon_16"], "rules": {"&": {"font-weight": "500", "min-height": "56px", "padding": "0 24px", "font-size": "var(--font-size-16)", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "box-shadow": "none", "cursor": "default"}, "& > img": {"filter": "brightness(0) invert(22%)", "opacity": "0.16"}}},
    {"id": "btn_primary_filled_full_rounded_icon_disabled_large", "size": "Large", "state": "disabled", "structure": "s2", "icons": ["icon_18"], "rules": {"&": {"font-weight": "600", "min-height": "60px", "padding": "0 32px", "font-size": "var(--font-size-18)", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "box-shadow": "none", "cursor": "default"}, "& > img": {"filter": "brightness(0) invert(22%)", "opacity": "0.16"}}},
    {"id": "btn_primary_filled_full_rounded_icon_disabled_xlarge", "size": "Xlarge", "state": "disabled", "structure": "s2", "icons": ["icon_20"], "rules": {"&": {"font-weight": "600", "min-height": "64px", "padding": "0 40px", "font-size": "var(--font-size-20)", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "box-shadow": "none", "cursor": "default"}, "& > img": {"filter": "brightness(0) invert(22%)", "opacity": "0.16"}}}
  ]
}
```

### C07 Buttons / Outline

열: Small / Medium (Default) / Large / Xlarge.

```json
{
  "shared": {
    "&": {"display": "inline-flex", "align-items": "center", "justify-content": "center", "white-space": "nowrap", "appearance": "none", "line-height": "1.5", "border-radius": "0", "box-sizing": "border-box", "font-family": "inherit", "text-decoration": "none"}
  },
  "structures": {
    "s1": "<button class=\"{{component}}\" type=\"button\">Button</button>",
    "s2": "<button class=\"{{component}}\" type=\"button\" disabled>Button</button>"
  },
  "variants": [
    {"id": "btn_primary_outline_small", "size": "Small", "state": "Default", "structure": "s1", "rules": {"&": {"font-weight": "500", "cursor": "pointer", "min-height": "44px", "padding": "0 20px", "font-size": "var(--font-size-15)", "border": "1px solid var(--color-static-black)", "background": "var(--color-common-100)", "color": "var(--color-static-black)"}, "&:hover": {"border-color": "var(--color-static-black)", "background": "var(--color-static-black)", "color": "var(--color-common-100)"}}},
    {"id": "btn_primary_outline_medium", "size": "Medium (Default)", "state": "Default", "structure": "s1", "rules": {"&": {"font-weight": "500", "cursor": "pointer", "min-height": "56px", "padding": "0 24px", "font-size": "var(--font-size-16)", "border": "1px solid var(--color-static-black)", "background": "var(--color-common-100)", "color": "var(--color-static-black)"}, "&:hover": {"border-color": "var(--color-static-black)", "background": "var(--color-static-black)", "color": "var(--color-common-100)"}}},
    {"id": "btn_primary_outline_large", "size": "Large", "state": "Default", "structure": "s1", "rules": {"&": {"font-weight": "600", "cursor": "pointer", "min-height": "60px", "padding": "0 32px", "font-size": "var(--font-size-18)", "border": "1px solid var(--color-static-black)", "background": "var(--color-common-100)", "color": "var(--color-static-black)"}, "&:hover": {"border-color": "var(--color-static-black)", "background": "var(--color-static-black)", "color": "var(--color-common-100)"}}},
    {"id": "btn_primary_outline_xlarge", "size": "Xlarge", "state": "Default", "structure": "s1", "rules": {"&": {"font-weight": "600", "cursor": "pointer", "min-height": "64px", "padding": "0 40px", "font-size": "var(--font-size-20)", "border": "1px solid var(--color-static-black)", "background": "var(--color-common-100)", "color": "var(--color-static-black)"}, "&:hover": {"border-color": "var(--color-static-black)", "background": "var(--color-static-black)", "color": "var(--color-common-100)"}}},
    {"id": "btn_primary_outline_disabled_small", "size": "Small", "state": "disabled", "structure": "s2", "rules": {"&": {"font-weight": "500", "min-height": "44px", "padding": "0 20px", "font-size": "var(--font-size-15)", "border": "1px solid transparent", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "box-shadow": "none", "cursor": "default"}}},
    {"id": "btn_primary_outline_disabled_medium", "size": "Medium (Default)", "state": "disabled", "structure": "s2", "rules": {"&": {"font-weight": "500", "min-height": "56px", "padding": "0 24px", "font-size": "var(--font-size-16)", "border": "1px solid transparent", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "box-shadow": "none", "cursor": "default"}}},
    {"id": "btn_primary_outline_disabled_large", "size": "Large", "state": "disabled", "structure": "s2", "rules": {"&": {"font-weight": "600", "min-height": "60px", "padding": "0 32px", "font-size": "var(--font-size-18)", "border": "1px solid transparent", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "box-shadow": "none", "cursor": "default"}}},
    {"id": "btn_primary_outline_disabled_xlarge", "size": "Xlarge", "state": "disabled", "structure": "s2", "rules": {"&": {"font-weight": "600", "min-height": "64px", "padding": "0 40px", "font-size": "var(--font-size-20)", "border": "1px solid transparent", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "box-shadow": "none", "cursor": "default"}}}
  ]
}
```

### C08 Buttons / Outline+icon

열: Small / Medium (Default) / Large / Xlarge.

```json
{
  "shared": {
    "&": {"white-space": "nowrap", "appearance": "none", "display": "inline-flex", "align-items": "center", "justify-content": "center", "line-height": "1.5", "gap": "12px", "border-radius": "0", "box-sizing": "border-box", "font-family": "inherit", "text-decoration": "none"},
    "& > img": {"display": "block", "flex-shrink": "0", "height": "auto"}
  },
  "structures": {
    "s1": "<button class=\"{{component}}\" type=\"button\"><img class=\"{{icon_1_class}}\" src=\"{{icon_1_src}}\" alt=\"\" aria-hidden=\"true\">Button</button>",
    "s2": "<button class=\"{{component}}\" type=\"button\" disabled><img class=\"{{icon_1_class}}\" src=\"{{icon_1_src}}\" alt=\"\" aria-hidden=\"true\">Button</button>"
  },
  "variants": [
    {"id": "btn_primary_outline_icon_small", "size": "Small", "state": "Default", "structure": "s1", "icons": ["icon_12"], "rules": {"&": {"font-weight": "500", "cursor": "pointer", "min-height": "44px", "padding": "0 20px", "font-size": "var(--font-size-15)", "border": "1px solid var(--color-static-black)", "background": "var(--color-common-100)", "color": "var(--color-static-black)"}, "&:hover": {"border-color": "var(--color-static-black)", "background": "var(--color-static-black)", "color": "var(--color-common-100)"}, "&:hover > img": {"filter": "brightness(0) invert(1)"}}, "selectors": ["&", "&:hover", "& > img", "&:hover > img"]},
    {"id": "btn_primary_outline_icon_medium", "size": "Medium (Default)", "state": "Default", "structure": "s1", "icons": ["icon_16"], "rules": {"&": {"font-weight": "500", "cursor": "pointer", "min-height": "56px", "padding": "0 24px", "font-size": "var(--font-size-16)", "border": "1px solid var(--color-static-black)", "background": "var(--color-common-100)", "color": "var(--color-static-black)"}, "&:hover": {"border-color": "var(--color-static-black)", "background": "var(--color-static-black)", "color": "var(--color-common-100)"}, "&:hover > img": {"filter": "brightness(0) invert(1)"}}, "selectors": ["&", "&:hover", "& > img", "&:hover > img"]},
    {"id": "btn_primary_outline_icon_large", "size": "Large", "state": "Default", "structure": "s1", "icons": ["icon_18"], "rules": {"&": {"font-weight": "600", "cursor": "pointer", "min-height": "60px", "padding": "0 32px", "font-size": "var(--font-size-18)", "border": "1px solid var(--color-static-black)", "background": "var(--color-common-100)", "color": "var(--color-static-black)"}, "&:hover": {"border-color": "var(--color-static-black)", "background": "var(--color-static-black)", "color": "var(--color-common-100)"}, "&:hover > img": {"filter": "brightness(0) invert(1)"}}, "selectors": ["&", "&:hover", "& > img", "&:hover > img"]},
    {"id": "btn_primary_outline_icon_xlarge", "size": "Xlarge", "state": "Default", "structure": "s1", "icons": ["icon_20"], "rules": {"&": {"font-weight": "600", "cursor": "pointer", "min-height": "64px", "padding": "0 40px", "font-size": "var(--font-size-20)", "border": "1px solid var(--color-static-black)", "background": "var(--color-common-100)", "color": "var(--color-static-black)"}, "&:hover": {"border-color": "var(--color-static-black)", "background": "var(--color-static-black)", "color": "var(--color-common-100)"}, "&:hover > img": {"filter": "brightness(0) invert(1)"}}, "selectors": ["&", "&:hover", "& > img", "&:hover > img"]},
    {"id": "btn_primary_outline_icon_disabled_small", "size": "Small", "state": "disabled", "structure": "s2", "icons": ["icon_12"], "rules": {"&": {"font-weight": "500", "min-height": "44px", "padding": "0 20px", "font-size": "var(--font-size-15)", "border": "1px solid transparent", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "box-shadow": "none", "cursor": "default"}, "& > img": {"filter": "brightness(0) invert(22%)", "opacity": "0.16"}}},
    {"id": "btn_primary_outline_icon_disabled_medium", "size": "Medium (Default)", "state": "disabled", "structure": "s2", "icons": ["icon_16"], "rules": {"&": {"font-weight": "500", "min-height": "56px", "padding": "0 24px", "font-size": "var(--font-size-16)", "border": "1px solid transparent", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "box-shadow": "none", "cursor": "default"}, "& > img": {"filter": "brightness(0) invert(22%)", "opacity": "0.16"}}},
    {"id": "btn_primary_outline_icon_disabled_large", "size": "Large", "state": "disabled", "structure": "s2", "icons": ["icon_18"], "rules": {"&": {"font-weight": "600", "min-height": "60px", "padding": "0 32px", "font-size": "var(--font-size-18)", "border": "1px solid transparent", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "box-shadow": "none", "cursor": "default"}, "& > img": {"filter": "brightness(0) invert(22%)", "opacity": "0.16"}}},
    {"id": "btn_primary_outline_icon_disabled_xlarge", "size": "Xlarge", "state": "disabled", "structure": "s2", "icons": ["icon_20"], "rules": {"&": {"font-weight": "600", "min-height": "64px", "padding": "0 40px", "font-size": "var(--font-size-20)", "border": "1px solid transparent", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "box-shadow": "none", "cursor": "default"}, "& > img": {"filter": "brightness(0) invert(22%)", "opacity": "0.16"}}}
  ]
}
```

### C09 Buttons / Outline Rounded

열: Small / Medium (Default) / Large / Xlarge.

```json
{
  "shared": {
    "&": {"display": "inline-flex", "align-items": "center", "justify-content": "center", "white-space": "nowrap", "appearance": "none", "line-height": "1.5", "border-radius": "8px", "box-sizing": "border-box", "font-family": "inherit", "text-decoration": "none"}
  },
  "structures": {
    "s1": "<button class=\"{{component}}\" type=\"button\">Button</button>",
    "s2": "<button class=\"{{component}}\" type=\"button\" disabled>Button</button>"
  },
  "variants": [
    {"id": "btn_primary_outline_rounded_small", "size": "Small", "state": "Default", "structure": "s1", "rules": {"&": {"font-weight": "500", "cursor": "pointer", "min-height": "44px", "padding": "0 20px", "font-size": "var(--font-size-15)", "border": "1px solid var(--color-static-black)", "background": "var(--color-common-100)", "color": "var(--color-static-black)"}, "&:hover": {"border-color": "var(--color-static-black)", "background": "var(--color-static-black)", "color": "var(--color-common-100)"}}},
    {"id": "btn_primary_outline_rounded_medium", "size": "Medium (Default)", "state": "Default", "structure": "s1", "rules": {"&": {"font-weight": "500", "cursor": "pointer", "min-height": "56px", "padding": "0 24px", "font-size": "var(--font-size-16)", "border": "1px solid var(--color-static-black)", "background": "var(--color-common-100)", "color": "var(--color-static-black)"}, "&:hover": {"border-color": "var(--color-static-black)", "background": "var(--color-static-black)", "color": "var(--color-common-100)"}}},
    {"id": "btn_primary_outline_rounded_large", "size": "Large", "state": "Default", "structure": "s1", "rules": {"&": {"font-weight": "600", "cursor": "pointer", "min-height": "60px", "padding": "0 32px", "font-size": "var(--font-size-18)", "border": "1px solid var(--color-static-black)", "background": "var(--color-common-100)", "color": "var(--color-static-black)"}, "&:hover": {"border-color": "var(--color-static-black)", "background": "var(--color-static-black)", "color": "var(--color-common-100)"}}},
    {"id": "btn_primary_outline_rounded_xlarge", "size": "Xlarge", "state": "Default", "structure": "s1", "rules": {"&": {"font-weight": "600", "cursor": "pointer", "min-height": "64px", "padding": "0 40px", "font-size": "var(--font-size-20)", "border": "1px solid var(--color-static-black)", "background": "var(--color-common-100)", "color": "var(--color-static-black)"}, "&:hover": {"border-color": "var(--color-static-black)", "background": "var(--color-static-black)", "color": "var(--color-common-100)"}}},
    {"id": "btn_primary_outline_rounded_disabled_small", "size": "Small", "state": "disabled", "structure": "s2", "rules": {"&": {"font-weight": "500", "min-height": "44px", "padding": "0 20px", "font-size": "var(--font-size-15)", "border": "1px solid transparent", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "box-shadow": "none", "cursor": "default"}}},
    {"id": "btn_primary_outline_rounded_disabled_medium", "size": "Medium (Default)", "state": "disabled", "structure": "s2", "rules": {"&": {"font-weight": "500", "min-height": "56px", "padding": "0 24px", "font-size": "var(--font-size-16)", "border": "1px solid transparent", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "box-shadow": "none", "cursor": "default"}}},
    {"id": "btn_primary_outline_rounded_disabled_large", "size": "Large", "state": "disabled", "structure": "s2", "rules": {"&": {"font-weight": "600", "min-height": "60px", "padding": "0 32px", "font-size": "var(--font-size-18)", "border": "1px solid transparent", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "box-shadow": "none", "cursor": "default"}}},
    {"id": "btn_primary_outline_rounded_disabled_xlarge", "size": "Xlarge", "state": "disabled", "structure": "s2", "rules": {"&": {"font-weight": "600", "min-height": "64px", "padding": "0 40px", "font-size": "var(--font-size-20)", "border": "1px solid transparent", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "box-shadow": "none", "cursor": "default"}}}
  ]
}
```

### C10 Buttons / Outline Rounded+icon

열: Small / Medium (Default) / Large / Xlarge.

```json
{
  "shared": {
    "&": {"white-space": "nowrap", "appearance": "none", "display": "inline-flex", "align-items": "center", "justify-content": "center", "line-height": "1.5", "gap": "12px", "border-radius": "8px", "box-sizing": "border-box", "font-family": "inherit", "text-decoration": "none"},
    "& > img": {"display": "block", "flex-shrink": "0", "height": "auto"}
  },
  "structures": {
    "s1": "<button class=\"{{component}}\" type=\"button\"><img class=\"{{icon_1_class}}\" src=\"{{icon_1_src}}\" alt=\"\" aria-hidden=\"true\">Button</button>",
    "s2": "<button class=\"{{component}}\" type=\"button\" disabled><img class=\"{{icon_1_class}}\" src=\"{{icon_1_src}}\" alt=\"\" aria-hidden=\"true\">Button</button>"
  },
  "variants": [
    {"id": "btn_primary_outline_rounded_icon_small", "size": "Small", "state": "Default", "structure": "s1", "icons": ["icon_12"], "rules": {"&": {"font-weight": "500", "cursor": "pointer", "min-height": "44px", "padding": "0 20px", "font-size": "var(--font-size-15)", "border": "1px solid var(--color-static-black)", "background": "var(--color-common-100)", "color": "var(--color-static-black)"}, "&:hover": {"border-color": "var(--color-static-black)", "background": "var(--color-static-black)", "color": "var(--color-common-100)"}, "&:hover > img": {"filter": "brightness(0) invert(1)"}}, "selectors": ["&", "&:hover", "& > img", "&:hover > img"]},
    {"id": "btn_primary_outline_rounded_icon_medium", "size": "Medium (Default)", "state": "Default", "structure": "s1", "icons": ["icon_16"], "rules": {"&": {"font-weight": "500", "cursor": "pointer", "min-height": "56px", "padding": "0 24px", "font-size": "var(--font-size-16)", "border": "1px solid var(--color-static-black)", "background": "var(--color-common-100)", "color": "var(--color-static-black)"}, "&:hover": {"border-color": "var(--color-static-black)", "background": "var(--color-static-black)", "color": "var(--color-common-100)"}, "&:hover > img": {"filter": "brightness(0) invert(1)"}}, "selectors": ["&", "&:hover", "& > img", "&:hover > img"]},
    {"id": "btn_primary_outline_rounded_icon_large", "size": "Large", "state": "Default", "structure": "s1", "icons": ["icon_18"], "rules": {"&": {"font-weight": "600", "cursor": "pointer", "min-height": "60px", "padding": "0 32px", "font-size": "var(--font-size-18)", "border": "1px solid var(--color-static-black)", "background": "var(--color-common-100)", "color": "var(--color-static-black)"}, "&:hover": {"border-color": "var(--color-static-black)", "background": "var(--color-static-black)", "color": "var(--color-common-100)"}, "&:hover > img": {"filter": "brightness(0) invert(1)"}}, "selectors": ["&", "&:hover", "& > img", "&:hover > img"]},
    {"id": "btn_primary_outline_rounded_icon_xlarge", "size": "Xlarge", "state": "Default", "structure": "s1", "icons": ["icon_20"], "rules": {"&": {"font-weight": "600", "cursor": "pointer", "min-height": "64px", "padding": "0 40px", "font-size": "var(--font-size-20)", "border": "1px solid var(--color-static-black)", "background": "var(--color-common-100)", "color": "var(--color-static-black)"}, "&:hover": {"border-color": "var(--color-static-black)", "background": "var(--color-static-black)", "color": "var(--color-common-100)"}, "&:hover > img": {"filter": "brightness(0) invert(1)"}}, "selectors": ["&", "&:hover", "& > img", "&:hover > img"]},
    {"id": "btn_primary_outline_rounded_icon_disabled_small", "size": "Small", "state": "disabled", "structure": "s2", "icons": ["icon_12"], "rules": {"&": {"font-weight": "500", "min-height": "44px", "padding": "0 20px", "font-size": "var(--font-size-15)", "border": "1px solid transparent", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "box-shadow": "none", "cursor": "default"}, "& > img": {"filter": "brightness(0) invert(22%)", "opacity": "0.16"}}},
    {"id": "btn_primary_outline_rounded_icon_disabled_medium", "size": "Medium (Default)", "state": "disabled", "structure": "s2", "icons": ["icon_16"], "rules": {"&": {"font-weight": "500", "min-height": "56px", "padding": "0 24px", "font-size": "var(--font-size-16)", "border": "1px solid transparent", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "box-shadow": "none", "cursor": "default"}, "& > img": {"filter": "brightness(0) invert(22%)", "opacity": "0.16"}}},
    {"id": "btn_primary_outline_rounded_icon_disabled_large", "size": "Large", "state": "disabled", "structure": "s2", "icons": ["icon_18"], "rules": {"&": {"font-weight": "600", "min-height": "60px", "padding": "0 32px", "font-size": "var(--font-size-18)", "border": "1px solid transparent", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "box-shadow": "none", "cursor": "default"}, "& > img": {"filter": "brightness(0) invert(22%)", "opacity": "0.16"}}},
    {"id": "btn_primary_outline_rounded_icon_disabled_xlarge", "size": "Xlarge", "state": "disabled", "structure": "s2", "icons": ["icon_20"], "rules": {"&": {"font-weight": "600", "min-height": "64px", "padding": "0 40px", "font-size": "var(--font-size-20)", "border": "1px solid transparent", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "box-shadow": "none", "cursor": "default"}, "& > img": {"filter": "brightness(0) invert(22%)", "opacity": "0.16"}}}
  ]
}
```

### C11 Buttons / Outline Full Rounded

열: Small / Medium (Default) / Large / Xlarge.

```json
{
  "shared": {
    "&": {"display": "inline-flex", "align-items": "center", "justify-content": "center", "white-space": "nowrap", "appearance": "none", "line-height": "1.5", "border-radius": "9999px", "box-sizing": "border-box", "font-family": "inherit", "text-decoration": "none"}
  },
  "structures": {
    "s1": "<button class=\"{{component}}\" type=\"button\">Button</button>",
    "s2": "<button class=\"{{component}}\" type=\"button\" disabled>Button</button>"
  },
  "variants": [
    {"id": "btn_primary_outline_full_rounded_small", "size": "Small", "state": "Default", "structure": "s1", "rules": {"&": {"font-weight": "500", "cursor": "pointer", "min-height": "44px", "padding": "0 20px", "font-size": "var(--font-size-15)", "border": "1px solid var(--color-static-black)", "background": "var(--color-common-100)", "color": "var(--color-static-black)"}, "&:hover": {"border-color": "var(--color-static-black)", "background": "var(--color-static-black)", "color": "var(--color-common-100)"}}},
    {"id": "btn_primary_outline_full_rounded_medium", "size": "Medium (Default)", "state": "Default", "structure": "s1", "rules": {"&": {"font-weight": "500", "cursor": "pointer", "min-height": "56px", "padding": "0 24px", "font-size": "var(--font-size-16)", "border": "1px solid var(--color-static-black)", "background": "var(--color-common-100)", "color": "var(--color-static-black)"}, "&:hover": {"border-color": "var(--color-static-black)", "background": "var(--color-static-black)", "color": "var(--color-common-100)"}}},
    {"id": "btn_primary_outline_full_rounded_large", "size": "Large", "state": "Default", "structure": "s1", "rules": {"&": {"font-weight": "600", "cursor": "pointer", "min-height": "60px", "padding": "0 32px", "font-size": "var(--font-size-18)", "border": "1px solid var(--color-static-black)", "background": "var(--color-common-100)", "color": "var(--color-static-black)"}, "&:hover": {"border-color": "var(--color-static-black)", "background": "var(--color-static-black)", "color": "var(--color-common-100)"}}},
    {"id": "btn_primary_outline_full_rounded_xlarge", "size": "Xlarge", "state": "Default", "structure": "s1", "rules": {"&": {"font-weight": "600", "cursor": "pointer", "min-height": "64px", "padding": "0 40px", "font-size": "var(--font-size-20)", "border": "1px solid var(--color-static-black)", "background": "var(--color-common-100)", "color": "var(--color-static-black)"}, "&:hover": {"border-color": "var(--color-static-black)", "background": "var(--color-static-black)", "color": "var(--color-common-100)"}}},
    {"id": "btn_primary_outline_full_rounded_disabled_small", "size": "Small", "state": "disabled", "structure": "s2", "rules": {"&": {"font-weight": "500", "min-height": "44px", "padding": "0 20px", "font-size": "var(--font-size-15)", "border": "1px solid transparent", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "box-shadow": "none", "cursor": "default"}}},
    {"id": "btn_primary_outline_full_rounded_disabled_medium", "size": "Medium (Default)", "state": "disabled", "structure": "s2", "rules": {"&": {"font-weight": "500", "min-height": "56px", "padding": "0 24px", "font-size": "var(--font-size-16)", "border": "1px solid transparent", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "box-shadow": "none", "cursor": "default"}}},
    {"id": "btn_primary_outline_full_rounded_disabled_large", "size": "Large", "state": "disabled", "structure": "s2", "rules": {"&": {"font-weight": "600", "min-height": "60px", "padding": "0 32px", "font-size": "var(--font-size-18)", "border": "1px solid transparent", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "box-shadow": "none", "cursor": "default"}}},
    {"id": "btn_primary_outline_full_rounded_disabled_xlarge", "size": "Xlarge", "state": "disabled", "structure": "s2", "rules": {"&": {"font-weight": "600", "min-height": "64px", "padding": "0 40px", "font-size": "var(--font-size-20)", "border": "1px solid transparent", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "box-shadow": "none", "cursor": "default"}}}
  ]
}
```

### C12 Buttons / Outline Full Rounded+icon

열: Small / Medium (Default) / Large / Xlarge.

```json
{
  "shared": {
    "&": {"white-space": "nowrap", "appearance": "none", "display": "inline-flex", "align-items": "center", "justify-content": "center", "line-height": "1.5", "gap": "12px", "border-radius": "9999px", "box-sizing": "border-box", "font-family": "inherit", "text-decoration": "none"},
    "& > img": {"display": "block", "flex-shrink": "0", "height": "auto"}
  },
  "structures": {
    "s1": "<button class=\"{{component}}\" type=\"button\"><img class=\"{{icon_1_class}}\" src=\"{{icon_1_src}}\" alt=\"\" aria-hidden=\"true\">Button</button>",
    "s2": "<button class=\"{{component}}\" type=\"button\" disabled><img class=\"{{icon_1_class}}\" src=\"{{icon_1_src}}\" alt=\"\" aria-hidden=\"true\">Button</button>"
  },
  "variants": [
    {"id": "btn_primary_outline_full_rounded_icon_small", "size": "Small", "state": "Default", "structure": "s1", "icons": ["icon_12"], "rules": {"&": {"font-weight": "500", "cursor": "pointer", "min-height": "44px", "padding": "0 20px", "font-size": "var(--font-size-15)", "border": "1px solid var(--color-static-black)", "background": "var(--color-common-100)", "color": "var(--color-static-black)"}, "&:hover": {"border-color": "var(--color-static-black)", "background": "var(--color-static-black)", "color": "var(--color-common-100)"}, "&:hover > img": {"filter": "brightness(0) invert(1)"}}, "selectors": ["&", "&:hover", "& > img", "&:hover > img"]},
    {"id": "btn_primary_outline_full_rounded_icon_medium", "size": "Medium (Default)", "state": "Default", "structure": "s1", "icons": ["icon_16"], "rules": {"&": {"font-weight": "500", "cursor": "pointer", "min-height": "56px", "padding": "0 24px", "font-size": "var(--font-size-16)", "border": "1px solid var(--color-static-black)", "background": "var(--color-common-100)", "color": "var(--color-static-black)"}, "&:hover": {"border-color": "var(--color-static-black)", "background": "var(--color-static-black)", "color": "var(--color-common-100)"}, "&:hover > img": {"filter": "brightness(0) invert(1)"}}, "selectors": ["&", "&:hover", "& > img", "&:hover > img"]},
    {"id": "btn_primary_outline_full_rounded_icon_large", "size": "Large", "state": "Default", "structure": "s1", "icons": ["icon_18"], "rules": {"&": {"font-weight": "600", "cursor": "pointer", "min-height": "60px", "padding": "0 32px", "font-size": "var(--font-size-18)", "border": "1px solid var(--color-static-black)", "background": "var(--color-common-100)", "color": "var(--color-static-black)"}, "&:hover": {"border-color": "var(--color-static-black)", "background": "var(--color-static-black)", "color": "var(--color-common-100)"}, "&:hover > img": {"filter": "brightness(0) invert(1)"}}, "selectors": ["&", "&:hover", "& > img", "&:hover > img"]},
    {"id": "btn_primary_outline_full_rounded_icon_xlarge", "size": "Xlarge", "state": "Default", "structure": "s1", "icons": ["icon_20"], "rules": {"&": {"font-weight": "600", "cursor": "pointer", "min-height": "64px", "padding": "0 40px", "font-size": "var(--font-size-20)", "border": "1px solid var(--color-static-black)", "background": "var(--color-common-100)", "color": "var(--color-static-black)"}, "&:hover": {"border-color": "var(--color-static-black)", "background": "var(--color-static-black)", "color": "var(--color-common-100)"}, "&:hover > img": {"filter": "brightness(0) invert(1)"}}, "selectors": ["&", "&:hover", "& > img", "&:hover > img"]},
    {"id": "btn_primary_outline_full_rounded_icon_disabled_small", "size": "Small", "state": "disabled", "structure": "s2", "icons": ["icon_12"], "rules": {"&": {"font-weight": "500", "min-height": "44px", "padding": "0 20px", "font-size": "var(--font-size-15)", "border": "1px solid transparent", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "box-shadow": "none", "cursor": "default"}, "& > img": {"filter": "brightness(0) invert(22%)", "opacity": "0.16"}}},
    {"id": "btn_primary_outline_full_rounded_icon_disabled_medium", "size": "Medium (Default)", "state": "disabled", "structure": "s2", "icons": ["icon_16"], "rules": {"&": {"font-weight": "500", "min-height": "56px", "padding": "0 24px", "font-size": "var(--font-size-16)", "border": "1px solid transparent", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "box-shadow": "none", "cursor": "default"}, "& > img": {"filter": "brightness(0) invert(22%)", "opacity": "0.16"}}},
    {"id": "btn_primary_outline_full_rounded_icon_disabled_large", "size": "Large", "state": "disabled", "structure": "s2", "icons": ["icon_18"], "rules": {"&": {"font-weight": "600", "min-height": "60px", "padding": "0 32px", "font-size": "var(--font-size-18)", "border": "1px solid transparent", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "box-shadow": "none", "cursor": "default"}, "& > img": {"filter": "brightness(0) invert(22%)", "opacity": "0.16"}}},
    {"id": "btn_primary_outline_full_rounded_icon_disabled_xlarge", "size": "Xlarge", "state": "disabled", "structure": "s2", "icons": ["icon_20"], "rules": {"&": {"font-weight": "600", "min-height": "64px", "padding": "0 40px", "font-size": "var(--font-size-20)", "border": "1px solid transparent", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "box-shadow": "none", "cursor": "default"}, "& > img": {"filter": "brightness(0) invert(22%)", "opacity": "0.16"}}}
  ]
}
```

### C13 Buttons / Button+icon / Filled

열: width 8px / width 12px / width 16px / width 20px / width 24px / width 28px / width 32px / width 40px.

```json
{
  "shared": {
    "&": {"display": "inline-flex", "align-items": "center", "justify-content": "center", "font-weight": "500", "white-space": "nowrap", "appearance": "none", "padding": "0", "border": "0", "border-radius": "0", "background": "transparent", "box-shadow": "none", "box-sizing": "border-box", "font-family": "inherit", "text-decoration": "none"}
  },
  "structures": {
    "s1": "<button class=\"{{component}}\" type=\"button\" aria-label=\"예시\"><img class=\"{{icon_1_class}}\" src=\"{{icon_1_src}}\" alt=\"\" aria-hidden=\"true\"></button>",
    "s2": "<button class=\"{{component}}\" type=\"button\" aria-label=\"예시\" disabled><img class=\"{{icon_1_class}}\" src=\"{{icon_1_src}}\" alt=\"\" aria-hidden=\"true\"></button>"
  },
  "variants": [
    {"id": "btn_icon_filled_small", "size": "width 8px", "state": "Default", "structure": "s1", "icons": ["icon_8"], "rules": {"&": {"cursor": "pointer", "color": "var(--color-static-black)", "min-width": "8px", "min-height": "8px", "height": "8px", "width": "8px"}, "&:active > img": {"content": "url(\"{{active_icon_src}}\")"}}},
    {"id": "btn_icon_filled_12", "size": "width 12px", "state": "Default", "structure": "s1", "icons": ["icon_12"], "rules": {"&": {"cursor": "pointer", "color": "var(--color-static-black)", "min-width": "12px", "min-height": "12px", "height": "12px", "width": "12px"}, "&:active > img": {"content": "url(\"{{active_icon_src}}\")"}}},
    {"id": "btn_icon_filled_medium", "size": "width 16px", "state": "Default", "structure": "s1", "icons": ["icon_16"], "rules": {"&": {"cursor": "pointer", "color": "var(--color-static-black)", "min-width": "16px", "min-height": "16px", "height": "16px", "width": "16px"}, "&:active > img": {"content": "url(\"{{active_icon_src}}\")"}}},
    {"id": "btn_icon_filled_20", "size": "width 20px", "state": "Default", "structure": "s1", "icons": ["icon_20"], "rules": {"&": {"cursor": "pointer", "color": "var(--color-static-black)", "min-width": "20px", "min-height": "20px", "height": "20px", "width": "20px"}, "&:active > img": {"content": "url(\"{{active_icon_src}}\")"}}},
    {"id": "btn_icon_filled_large", "size": "width 24px", "state": "Default", "structure": "s1", "icons": ["icon_24"], "rules": {"&": {"cursor": "pointer", "color": "var(--color-static-black)", "min-width": "24px", "min-height": "24px", "height": "24px", "width": "24px"}, "&:active > img": {"content": "url(\"{{active_icon_src}}\")"}}},
    {"id": "btn_icon_filled_28", "size": "width 28px", "state": "Default", "structure": "s1", "icons": ["icon_28"], "rules": {"&": {"cursor": "pointer", "color": "var(--color-static-black)", "min-width": "28px", "min-height": "28px", "height": "28px", "width": "28px"}, "&:active > img": {"content": "url(\"{{active_icon_src}}\")"}}},
    {"id": "btn_icon_filled_32", "size": "width 32px", "state": "Default", "structure": "s1", "icons": ["icon_32"], "rules": {"&": {"cursor": "pointer", "color": "var(--color-static-black)", "min-width": "32px", "min-height": "32px", "height": "32px", "width": "32px"}, "&:active > img": {"content": "url(\"{{active_icon_src}}\")"}}},
    {"id": "btn_icon_filled_xlarge", "size": "width 40px", "state": "Default", "structure": "s1", "icons": ["icon_40"], "rules": {"&": {"cursor": "pointer", "color": "var(--color-static-black)", "min-width": "40px", "min-height": "40px", "height": "40px", "width": "40px"}, "&:active > img": {"content": "url(\"{{active_icon_src}}\")"}}},
    {"id": "btn_icon_filled_disabled_small", "size": "width 8px", "state": "disabled", "structure": "s2", "icons": ["icon_8"], "rules": {"&": {"color": "var(--color-label-disable)", "cursor": "default", "min-width": "8px", "min-height": "8px", "height": "8px", "width": "8px", "opacity": "1"}, "& > img": {"filter": "brightness(0) invert(22%)", "opacity": "0.16"}}},
    {"id": "btn_icon_filled_disabled_12", "size": "width 12px", "state": "disabled", "structure": "s2", "icons": ["icon_12"], "rules": {"&": {"color": "var(--color-label-disable)", "cursor": "default", "min-width": "12px", "min-height": "12px", "height": "12px", "width": "12px", "opacity": "1"}, "& > img": {"filter": "brightness(0) invert(22%)", "opacity": "0.16"}}},
    {"id": "btn_icon_filled_disabled_medium", "size": "width 16px", "state": "disabled", "structure": "s2", "icons": ["icon_16"], "rules": {"&": {"color": "var(--color-label-disable)", "cursor": "default", "min-width": "16px", "min-height": "16px", "height": "16px", "width": "16px", "opacity": "1"}, "& > img": {"filter": "brightness(0) invert(22%)", "opacity": "0.16"}}},
    {"id": "btn_icon_filled_disabled_20", "size": "width 20px", "state": "disabled", "structure": "s2", "icons": ["icon_20"], "rules": {"&": {"color": "var(--color-label-disable)", "cursor": "default", "min-width": "20px", "min-height": "20px", "height": "20px", "width": "20px", "opacity": "1"}, "& > img": {"filter": "brightness(0) invert(22%)", "opacity": "0.16"}}},
    {"id": "btn_icon_filled_disabled_large", "size": "width 24px", "state": "disabled", "structure": "s2", "icons": ["icon_24"], "rules": {"&": {"color": "var(--color-label-disable)", "cursor": "default", "min-width": "24px", "min-height": "24px", "height": "24px", "width": "24px", "opacity": "1"}, "& > img": {"filter": "brightness(0) invert(22%)", "opacity": "0.16"}}},
    {"id": "btn_icon_filled_disabled_28", "size": "width 28px", "state": "disabled", "structure": "s2", "icons": ["icon_28"], "rules": {"&": {"color": "var(--color-label-disable)", "cursor": "default", "min-width": "28px", "min-height": "28px", "height": "28px", "width": "28px", "opacity": "1"}, "& > img": {"filter": "brightness(0) invert(22%)", "opacity": "0.16"}}},
    {"id": "btn_icon_filled_disabled_32", "size": "width 32px", "state": "disabled", "structure": "s2", "icons": ["icon_32"], "rules": {"&": {"color": "var(--color-label-disable)", "cursor": "default", "min-width": "32px", "min-height": "32px", "height": "32px", "width": "32px", "opacity": "1"}, "& > img": {"filter": "brightness(0) invert(22%)", "opacity": "0.16"}}},
    {"id": "btn_icon_filled_disabled_xlarge", "size": "width 40px", "state": "disabled", "structure": "s2", "icons": ["icon_40"], "rules": {"&": {"color": "var(--color-label-disable)", "cursor": "default", "min-width": "40px", "min-height": "40px", "height": "40px", "width": "40px", "opacity": "1"}, "& > img": {"filter": "brightness(0) invert(22%)", "opacity": "0.16"}}}
  ]
}
```

### C14 Buttons / Button+icon / Outline

열: Small / Medium / Large / Xlarge.

```json
{
  "shared": {
    "&": {"display": "inline-flex", "align-items": "center", "justify-content": "center", "padding": "0", "border-radius": "0", "font-family": "inherit", "line-height": "1", "appearance": "none", "box-sizing": "border-box", "flex-shrink": "0", "text-decoration": "none", "vertical-align": "middle", "transition": "background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease"},
    "& > img": {"display": "block", "height": "auto", "flex-shrink": "0"}
  },
  "structures": {
    "s1": "<button class=\"{{component}}\" type=\"button\" aria-label=\"예시\"><img class=\"{{icon_1_class}}\" src=\"{{icon_1_src}}\" alt=\"\" aria-hidden=\"true\"></button>",
    "s2": "<button class=\"{{component}}\" type=\"button\" aria-label=\"예시\" disabled><img class=\"{{icon_1_class}}\" src=\"{{icon_1_src}}\" alt=\"\" aria-hidden=\"true\"></button>"
  },
  "variants": [
    {"id": "btn_icon_outline_small", "size": "Small", "state": "Default", "structure": "s1", "icons": ["icon_12"], "rules": {"&": {"width": "32px", "height": "32px", "min-width": "32px", "min-height": "32px", "border": "1px solid var(--color-static-black)", "background": "var(--color-common-100)", "color": "var(--color-static-black)", "cursor": "pointer"}, "&:not(:disabled):hover": {"background": "var(--color-static-black)", "color": "var(--color-common-100)", "border-color": "transparent"}, "&:not(:disabled):focus-visible": {"background": "var(--color-static-black)", "color": "var(--color-common-100)", "border-color": "transparent", "outline": "2px solid var(--color-static-black)", "outline-offset": "2px"}, "&:not(:disabled):focus-visible > img": {"filter": "brightness(0) invert(1)"}, "&:not(:disabled):hover > img": {"filter": "brightness(0) invert(1)"}}, "order": {"&:not(:disabled):focus-visible": ["background", "color", "border-color", "outline", "outline-offset"]}},
    {"id": "btn_icon_outline_medium", "size": "Medium", "state": "Default", "structure": "s1", "icons": ["icon_16"], "rules": {"&": {"width": "40px", "height": "40px", "min-width": "40px", "min-height": "40px", "border": "1px solid var(--color-static-black)", "background": "var(--color-common-100)", "color": "var(--color-static-black)", "cursor": "pointer"}, "&:not(:disabled):hover": {"background": "var(--color-static-black)", "color": "var(--color-common-100)", "border-color": "transparent"}, "&:not(:disabled):focus-visible": {"background": "var(--color-static-black)", "color": "var(--color-common-100)", "border-color": "transparent", "outline": "2px solid var(--color-static-black)", "outline-offset": "2px"}, "&:not(:disabled):focus-visible > img": {"filter": "brightness(0) invert(1)"}, "&:not(:disabled):hover > img": {"filter": "brightness(0) invert(1)"}}, "order": {"&:not(:disabled):focus-visible": ["background", "color", "border-color", "outline", "outline-offset"]}},
    {"id": "btn_icon_outline_large", "size": "Large", "state": "Default", "structure": "s1", "icons": ["icon_18"], "rules": {"&": {"width": "48px", "height": "48px", "min-width": "48px", "min-height": "48px", "border": "1px solid var(--color-static-black)", "background": "var(--color-common-100)", "color": "var(--color-static-black)", "cursor": "pointer"}, "&:not(:disabled):hover": {"background": "var(--color-static-black)", "color": "var(--color-common-100)", "border-color": "transparent"}, "&:not(:disabled):focus-visible": {"background": "var(--color-static-black)", "color": "var(--color-common-100)", "border-color": "transparent", "outline": "2px solid var(--color-static-black)", "outline-offset": "2px"}, "&:not(:disabled):focus-visible > img": {"filter": "brightness(0) invert(1)"}, "&:not(:disabled):hover > img": {"filter": "brightness(0) invert(1)"}}, "order": {"&:not(:disabled):focus-visible": ["background", "color", "border-color", "outline", "outline-offset"]}},
    {"id": "btn_icon_outline_xlarge", "size": "Xlarge", "state": "Default", "structure": "s1", "icons": ["icon_20"], "rules": {"&": {"width": "56px", "height": "56px", "min-width": "56px", "min-height": "56px", "border": "1px solid var(--color-static-black)", "background": "var(--color-common-100)", "color": "var(--color-static-black)", "cursor": "pointer"}, "&:not(:disabled):hover": {"background": "var(--color-static-black)", "color": "var(--color-common-100)", "border-color": "transparent"}, "&:not(:disabled):focus-visible": {"background": "var(--color-static-black)", "color": "var(--color-common-100)", "border-color": "transparent", "outline": "2px solid var(--color-static-black)", "outline-offset": "2px"}, "&:not(:disabled):focus-visible > img": {"filter": "brightness(0) invert(1)"}, "&:not(:disabled):hover > img": {"filter": "brightness(0) invert(1)"}}, "order": {"&:not(:disabled):focus-visible": ["background", "color", "border-color", "outline", "outline-offset"]}},
    {"id": "btn_icon_outline_disabled_small", "size": "Small", "state": "disabled", "structure": "s2", "icons": ["icon_12"], "rules": {"&": {"width": "32px", "height": "32px", "min-width": "32px", "min-height": "32px", "border": "0", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "cursor": "default"}, "& > img": {"filter": "brightness(0) invert(22%)", "opacity": "0.16"}}},
    {"id": "btn_icon_outline_disabled_medium", "size": "Medium", "state": "disabled", "structure": "s2", "icons": ["icon_16"], "rules": {"&": {"width": "40px", "height": "40px", "min-width": "40px", "min-height": "40px", "border": "0", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "cursor": "default"}, "& > img": {"filter": "brightness(0) invert(22%)", "opacity": "0.16"}}},
    {"id": "btn_icon_outline_disabled_large", "size": "Large", "state": "disabled", "structure": "s2", "icons": ["icon_18"], "rules": {"&": {"width": "48px", "height": "48px", "min-width": "48px", "min-height": "48px", "border": "0", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "cursor": "default"}, "& > img": {"filter": "brightness(0) invert(22%)", "opacity": "0.16"}}},
    {"id": "btn_icon_outline_disabled_xlarge", "size": "Xlarge", "state": "disabled", "structure": "s2", "icons": ["icon_20"], "rules": {"&": {"width": "56px", "height": "56px", "min-width": "56px", "min-height": "56px", "border": "0", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "cursor": "default"}, "& > img": {"filter": "brightness(0) invert(22%)", "opacity": "0.16"}}}
  ]
}
```

### C15 Buttons / Button+icon / Outline Rounded

열: Small / Medium / Large / Xlarge.

```json
{
  "shared": {
    "&": {"display": "inline-flex", "align-items": "center", "justify-content": "center", "padding": "0", "font-family": "inherit", "line-height": "1", "appearance": "none", "box-sizing": "border-box", "flex-shrink": "0", "text-decoration": "none", "vertical-align": "middle", "transition": "background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease"},
    "& > img": {"display": "block", "height": "auto", "flex-shrink": "0"}
  },
  "structures": {
    "s1": "<button class=\"{{component}}\" type=\"button\" aria-label=\"예시\"><img class=\"{{icon_1_class}}\" src=\"{{icon_1_src}}\" alt=\"\" aria-hidden=\"true\"></button>",
    "s2": "<button class=\"{{component}}\" type=\"button\" aria-label=\"예시\" disabled><img class=\"{{icon_1_class}}\" src=\"{{icon_1_src}}\" alt=\"\" aria-hidden=\"true\"></button>"
  },
  "variants": [
    {"id": "btn_icon_outline_rounded_small", "size": "Small", "state": "Default", "structure": "s1", "icons": ["icon_12"], "rules": {"&": {"width": "32px", "height": "32px", "min-width": "32px", "min-height": "32px", "border": "1px solid var(--color-static-black)", "border-radius": "8px", "background": "var(--color-common-100)", "color": "var(--color-static-black)", "cursor": "pointer"}, "&:not(:disabled):hover": {"background": "var(--color-static-black)", "color": "var(--color-common-100)", "border-color": "transparent"}, "&:not(:disabled):focus-visible": {"background": "var(--color-static-black)", "color": "var(--color-common-100)", "border-color": "transparent", "outline": "2px solid var(--color-static-black)", "outline-offset": "2px"}, "&:not(:disabled):focus-visible > img": {"filter": "brightness(0) invert(1)"}, "&:not(:disabled):hover > img": {"filter": "brightness(0) invert(1)"}}, "order": {"&:not(:disabled):focus-visible": ["background", "color", "border-color", "outline", "outline-offset"]}},
    {"id": "btn_icon_outline_rounded_medium", "size": "Medium", "state": "Default", "structure": "s1", "icons": ["icon_16"], "rules": {"&": {"width": "40px", "height": "40px", "min-width": "40px", "min-height": "40px", "border": "1px solid var(--color-static-black)", "border-radius": "10px", "background": "var(--color-common-100)", "color": "var(--color-static-black)", "cursor": "pointer"}, "&:not(:disabled):hover": {"background": "var(--color-static-black)", "color": "var(--color-common-100)", "border-color": "transparent"}, "&:not(:disabled):focus-visible": {"background": "var(--color-static-black)", "color": "var(--color-common-100)", "border-color": "transparent", "outline": "2px solid var(--color-static-black)", "outline-offset": "2px"}, "&:not(:disabled):focus-visible > img": {"filter": "brightness(0) invert(1)"}, "&:not(:disabled):hover > img": {"filter": "brightness(0) invert(1)"}}, "order": {"&:not(:disabled):focus-visible": ["background", "color", "border-color", "outline", "outline-offset"]}},
    {"id": "btn_icon_outline_rounded_large", "size": "Large", "state": "Default", "structure": "s1", "icons": ["icon_18"], "rules": {"&": {"width": "48px", "height": "48px", "min-width": "48px", "min-height": "48px", "border": "1px solid var(--color-static-black)", "border-radius": "10px", "background": "var(--color-common-100)", "color": "var(--color-static-black)", "cursor": "pointer"}, "&:not(:disabled):hover": {"background": "var(--color-static-black)", "color": "var(--color-common-100)", "border-color": "transparent"}, "&:not(:disabled):focus-visible": {"background": "var(--color-static-black)", "color": "var(--color-common-100)", "border-color": "transparent", "outline": "2px solid var(--color-static-black)", "outline-offset": "2px"}, "&:not(:disabled):focus-visible > img": {"filter": "brightness(0) invert(1)"}, "&:not(:disabled):hover > img": {"filter": "brightness(0) invert(1)"}}, "order": {"&:not(:disabled):focus-visible": ["background", "color", "border-color", "outline", "outline-offset"]}},
    {"id": "btn_icon_outline_rounded_xlarge", "size": "Xlarge", "state": "Default", "structure": "s1", "icons": ["icon_20"], "rules": {"&": {"width": "56px", "height": "56px", "min-width": "56px", "min-height": "56px", "border": "1px solid var(--color-static-black)", "border-radius": "10px", "background": "var(--color-common-100)", "color": "var(--color-static-black)", "cursor": "pointer"}, "&:not(:disabled):hover": {"background": "var(--color-static-black)", "color": "var(--color-common-100)", "border-color": "transparent"}, "&:not(:disabled):focus-visible": {"background": "var(--color-static-black)", "color": "var(--color-common-100)", "border-color": "transparent", "outline": "2px solid var(--color-static-black)", "outline-offset": "2px"}, "&:not(:disabled):focus-visible > img": {"filter": "brightness(0) invert(1)"}, "&:not(:disabled):hover > img": {"filter": "brightness(0) invert(1)"}}, "order": {"&:not(:disabled):focus-visible": ["background", "color", "border-color", "outline", "outline-offset"]}},
    {"id": "btn_icon_outline_rounded_disabled_small", "size": "Small", "state": "disabled", "structure": "s2", "icons": ["icon_12"], "rules": {"&": {"width": "32px", "height": "32px", "min-width": "32px", "min-height": "32px", "border": "0", "border-radius": "8px", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "cursor": "default"}, "& > img": {"filter": "brightness(0) invert(22%)", "opacity": "0.16"}}},
    {"id": "btn_icon_outline_rounded_disabled_medium", "size": "Medium", "state": "disabled", "structure": "s2", "icons": ["icon_16"], "rules": {"&": {"width": "40px", "height": "40px", "min-width": "40px", "min-height": "40px", "border": "0", "border-radius": "10px", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "cursor": "default"}, "& > img": {"filter": "brightness(0) invert(22%)", "opacity": "0.16"}}},
    {"id": "btn_icon_outline_rounded_disabled_large", "size": "Large", "state": "disabled", "structure": "s2", "icons": ["icon_18"], "rules": {"&": {"width": "48px", "height": "48px", "min-width": "48px", "min-height": "48px", "border": "0", "border-radius": "10px", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "cursor": "default"}, "& > img": {"filter": "brightness(0) invert(22%)", "opacity": "0.16"}}},
    {"id": "btn_icon_outline_rounded_disabled_xlarge", "size": "Xlarge", "state": "disabled", "structure": "s2", "icons": ["icon_20"], "rules": {"&": {"width": "56px", "height": "56px", "min-width": "56px", "min-height": "56px", "border": "0", "border-radius": "10px", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "cursor": "default"}, "& > img": {"filter": "brightness(0) invert(22%)", "opacity": "0.16"}}}
  ]
}
```

### C16 Buttons / Button+icon / Outline Full Rounded

열: Small / Medium / Large / Xlarge.

```json
{
  "shared": {
    "&": {"display": "inline-flex", "align-items": "center", "justify-content": "center", "padding": "0", "border-radius": "9999px", "font-family": "inherit", "line-height": "1", "appearance": "none", "box-sizing": "border-box", "flex-shrink": "0", "text-decoration": "none", "vertical-align": "middle", "transition": "background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease"},
    "& > img": {"display": "block", "height": "auto", "flex-shrink": "0"}
  },
  "structures": {
    "s1": "<button class=\"{{component}}\" type=\"button\" aria-label=\"예시\"><img class=\"{{icon_1_class}}\" src=\"{{icon_1_src}}\" alt=\"\" aria-hidden=\"true\"></button>",
    "s2": "<button class=\"{{component}}\" type=\"button\" aria-label=\"예시\" disabled><img class=\"{{icon_1_class}}\" src=\"{{icon_1_src}}\" alt=\"\" aria-hidden=\"true\"></button>"
  },
  "variants": [
    {"id": "btn_icon_outline_full_rounded_small", "size": "Small", "state": "Default", "structure": "s1", "icons": ["icon_12"], "rules": {"&": {"width": "32px", "height": "32px", "min-width": "32px", "min-height": "32px", "border": "1px solid var(--color-static-black)", "background": "var(--color-common-100)", "color": "var(--color-static-black)", "cursor": "pointer"}, "&:not(:disabled):hover": {"background": "var(--color-static-black)", "color": "var(--color-common-100)", "border-color": "transparent"}, "&:not(:disabled):focus-visible": {"background": "var(--color-static-black)", "color": "var(--color-common-100)", "border-color": "transparent", "outline": "2px solid var(--color-static-black)", "outline-offset": "2px"}, "&:not(:disabled):focus-visible > img": {"filter": "brightness(0) invert(1)"}, "&:not(:disabled):hover > img": {"filter": "brightness(0) invert(1)"}}, "order": {"&:not(:disabled):focus-visible": ["background", "color", "border-color", "outline", "outline-offset"]}},
    {"id": "btn_icon_outline_full_rounded_medium", "size": "Medium", "state": "Default", "structure": "s1", "icons": ["icon_16"], "rules": {"&": {"width": "40px", "height": "40px", "min-width": "40px", "min-height": "40px", "border": "1px solid var(--color-static-black)", "background": "var(--color-common-100)", "color": "var(--color-static-black)", "cursor": "pointer"}, "&:not(:disabled):hover": {"background": "var(--color-static-black)", "color": "var(--color-common-100)", "border-color": "transparent"}, "&:not(:disabled):focus-visible": {"background": "var(--color-static-black)", "color": "var(--color-common-100)", "border-color": "transparent", "outline": "2px solid var(--color-static-black)", "outline-offset": "2px"}, "&:not(:disabled):focus-visible > img": {"filter": "brightness(0) invert(1)"}, "&:not(:disabled):hover > img": {"filter": "brightness(0) invert(1)"}}, "order": {"&:not(:disabled):focus-visible": ["background", "color", "border-color", "outline", "outline-offset"]}},
    {"id": "btn_icon_outline_full_rounded_large", "size": "Large", "state": "Default", "structure": "s1", "icons": ["icon_18"], "rules": {"&": {"width": "48px", "height": "48px", "min-width": "48px", "min-height": "48px", "border": "1px solid var(--color-static-black)", "background": "var(--color-common-100)", "color": "var(--color-static-black)", "cursor": "pointer"}, "&:not(:disabled):hover": {"background": "var(--color-static-black)", "color": "var(--color-common-100)", "border-color": "transparent"}, "&:not(:disabled):focus-visible": {"background": "var(--color-static-black)", "color": "var(--color-common-100)", "border-color": "transparent", "outline": "2px solid var(--color-static-black)", "outline-offset": "2px"}, "&:not(:disabled):focus-visible > img": {"filter": "brightness(0) invert(1)"}, "&:not(:disabled):hover > img": {"filter": "brightness(0) invert(1)"}}, "order": {"&:not(:disabled):focus-visible": ["background", "color", "border-color", "outline", "outline-offset"]}},
    {"id": "btn_icon_outline_full_rounded_xlarge", "size": "Xlarge", "state": "Default", "structure": "s1", "icons": ["icon_20"], "rules": {"&": {"width": "56px", "height": "56px", "min-width": "56px", "min-height": "56px", "border": "1px solid var(--color-static-black)", "background": "var(--color-common-100)", "color": "var(--color-static-black)", "cursor": "pointer"}, "&:not(:disabled):hover": {"background": "var(--color-static-black)", "color": "var(--color-common-100)", "border-color": "transparent"}, "&:not(:disabled):focus-visible": {"background": "var(--color-static-black)", "color": "var(--color-common-100)", "border-color": "transparent", "outline": "2px solid var(--color-static-black)", "outline-offset": "2px"}, "&:not(:disabled):focus-visible > img": {"filter": "brightness(0) invert(1)"}, "&:not(:disabled):hover > img": {"filter": "brightness(0) invert(1)"}}, "order": {"&:not(:disabled):focus-visible": ["background", "color", "border-color", "outline", "outline-offset"]}},
    {"id": "btn_icon_outline_full_rounded_disabled_small", "size": "Small", "state": "disabled", "structure": "s2", "icons": ["icon_12"], "rules": {"&": {"width": "32px", "height": "32px", "min-width": "32px", "min-height": "32px", "border": "0", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "cursor": "default"}, "& > img": {"filter": "brightness(0) invert(22%)", "opacity": "0.16"}}},
    {"id": "btn_icon_outline_full_rounded_disabled_medium", "size": "Medium", "state": "disabled", "structure": "s2", "icons": ["icon_16"], "rules": {"&": {"width": "40px", "height": "40px", "min-width": "40px", "min-height": "40px", "border": "0", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "cursor": "default"}, "& > img": {"filter": "brightness(0) invert(22%)", "opacity": "0.16"}}},
    {"id": "btn_icon_outline_full_rounded_disabled_large", "size": "Large", "state": "disabled", "structure": "s2", "icons": ["icon_18"], "rules": {"&": {"width": "48px", "height": "48px", "min-width": "48px", "min-height": "48px", "border": "0", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "cursor": "default"}, "& > img": {"filter": "brightness(0) invert(22%)", "opacity": "0.16"}}},
    {"id": "btn_icon_outline_full_rounded_disabled_xlarge", "size": "Xlarge", "state": "disabled", "structure": "s2", "icons": ["icon_20"], "rules": {"&": {"width": "56px", "height": "56px", "min-width": "56px", "min-height": "56px", "border": "0", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "cursor": "default"}, "& > img": {"filter": "brightness(0) invert(22%)", "opacity": "0.16"}}}
  ]
}
```

### C17 Buttons / Button+text / Text

열: Small / Medium (Default) / Large / Xlarge.

```json
{
  "shared": {
    "&": {"font-weight": "400", "white-space": "nowrap", "appearance": "none", "cursor": "pointer", "display": "inline-flex", "align-items": "center", "justify-content": "center", "min-height": "0", "padding": "0", "line-height": "1.5", "border": "0", "border-radius": "0", "background": "none", "color": "var(--color-static-black)", "text-decoration": "none", "box-sizing": "border-box", "font-family": "inherit"}
  },
  "structures": {
    "s1": "<a class=\"{{component}}\" href=\"#\">Link</a>"
  },
  "variants": [
    {"id": "btn_text_small", "size": "Small", "state": "Default", "structure": "s1", "rules": {"&": {"font-size": "var(--font-size-14)"}, "&:hover": {"text-decoration": "underline", "text-underline-offset": "0.12em"}}},
    {"id": "btn_text_medium", "size": "Medium (Default)", "state": "Default", "structure": "s1", "rules": {"&": {"font-size": "var(--font-size-15)"}, "&:hover": {"text-decoration": "underline", "text-underline-offset": "0.12em"}}},
    {"id": "btn_text_large", "size": "Large", "state": "Default", "structure": "s1", "rules": {"&": {"font-size": "var(--font-size-16)"}}},
    {"id": "btn_text_xlarge", "size": "Xlarge", "state": "Default", "structure": "s1", "rules": {"&": {"font-size": "var(--font-size-18)"}, "&:hover": {"text-decoration": "underline", "text-underline-offset": "0.12em"}}}
  ]
}
```

### C18 Buttons / Button+text / Text+icon

열: Small / Medium (Default) / Large / Xlarge.

```json
{
  "shared": {
    "&": {"font-weight": "400", "white-space": "nowrap", "appearance": "none", "cursor": "pointer", "display": "inline-flex", "align-items": "center", "justify-content": "center", "min-height": "0", "padding": "0", "line-height": "1.5", "gap": "16px", "border": "0", "border-radius": "0", "background": "none", "color": "var(--color-static-black)", "text-decoration": "none", "box-sizing": "border-box", "font-family": "inherit"},
    "& > img": {"display": "block", "flex-shrink": "0", "height": "auto"}
  },
  "structures": {
    "s1": "<a class=\"{{component}}\" href=\"#\">Link<img class=\"{{icon_1_class}}\" src=\"{{icon_1_src}}\" alt=\"\" aria-hidden=\"true\"></a>"
  },
  "variants": [
    {"id": "btn_text_icon_small", "size": "Small", "state": "Default", "structure": "s1", "icons": ["icon_8"], "rules": {"&": {"font-size": "var(--font-size-14)"}, "&:hover": {"text-decoration": "underline", "text-underline-offset": "0.12em"}}, "selectors": ["&", "&:hover", "& > img"]},
    {"id": "btn_text_icon_medium", "size": "Medium (Default)", "state": "Default", "structure": "s1", "icons": ["icon_8"], "rules": {"&": {"font-size": "var(--font-size-15)"}, "&:hover": {"text-decoration": "underline", "text-underline-offset": "0.12em"}}, "selectors": ["&", "&:hover", "& > img"]},
    {"id": "btn_text_icon_large", "size": "Large", "state": "Default", "structure": "s1", "icons": ["icon_12"], "rules": {"&": {"font-size": "var(--font-size-16)"}}},
    {"id": "btn_text_icon_xlarge", "size": "Xlarge", "state": "Default", "structure": "s1", "icons": ["icon_12"], "rules": {"&": {"font-size": "var(--font-size-18)"}, "&:hover": {"text-decoration": "underline", "text-underline-offset": "0.12em"}}, "selectors": ["&", "&:hover", "& > img"]}
  ]
}
```

### C19 Tab / Filled

열: Small / Medium (Default) / Large / XLarge.

```json
{
  "shared": {
    "&": {"display": "inline-flex", "align-items": "center", "justify-content": "center", "white-space": "nowrap", "appearance": "none", "border": "0", "border-radius": "0", "line-height": "1.5", "box-sizing": "border-box", "font-family": "inherit", "text-decoration": "none"}
  },
  "structures": {
    "s1": "<button class=\"{{component}}\" type=\"button\">Tab</button>",
    "s2": "<button class=\"{{component}}\" type=\"button\" disabled>Tab</button>"
  },
  "variants": [
    {"id": "tab_filled_small", "size": "Small", "state": "Default", "structure": "s1", "rules": {"&": {"font-weight": "500", "cursor": "pointer", "min-height": "36px", "padding": "0 16px", "background": "var(--color-static-black)", "color": "var(--color-common-100)", "font-size": "var(--font-size-14)"}}},
    {"id": "tab_filled_medium", "size": "Medium (Default)", "state": "Default", "structure": "s1", "rules": {"&": {"font-weight": "500", "cursor": "pointer", "min-height": "44px", "padding": "0 24px", "background": "var(--color-static-black)", "color": "var(--color-common-100)", "font-size": "var(--font-size-16)"}}},
    {"id": "tab_filled_large", "size": "Large", "state": "Default", "structure": "s1", "rules": {"&": {"font-weight": "500", "cursor": "pointer", "min-height": "52px", "padding": "0 28px", "background": "var(--color-static-black)", "color": "var(--color-common-100)", "font-size": "var(--font-size-16)"}}},
    {"id": "tab_filled_xlarge", "size": "XLarge", "state": "Default", "structure": "s1", "rules": {"&": {"font-weight": "600", "cursor": "pointer", "min-height": "60px", "padding": "0 32px", "background": "var(--color-static-black)", "color": "var(--color-common-100)", "font-size": "var(--font-size-18)"}}},
    {"id": "tab_filled_disabled_small", "size": "Small", "state": "Disabled", "structure": "s2", "rules": {"&": {"font-weight": "500", "min-height": "36px", "padding": "0 16px", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "font-size": "var(--font-size-14)", "cursor": "default"}}},
    {"id": "tab_filled_disabled_medium", "size": "Medium (Default)", "state": "Disabled", "structure": "s2", "rules": {"&": {"font-weight": "500", "min-height": "44px", "padding": "0 24px", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "font-size": "var(--font-size-16)", "cursor": "default"}}},
    {"id": "tab_filled_disabled_large", "size": "Large", "state": "Disabled", "structure": "s2", "rules": {"&": {"font-weight": "500", "min-height": "52px", "padding": "0 28px", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "font-size": "var(--font-size-16)", "cursor": "default"}}},
    {"id": "tab_filled_disabled_xlarge", "size": "XLarge", "state": "Disabled", "structure": "s2", "rules": {"&": {"font-weight": "600", "min-height": "60px", "padding": "0 32px", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "font-size": "var(--font-size-18)", "cursor": "default"}}}
  ]
}
```

### C20 Tab / Filled+icon

열: Small / Medium (Default) / Large / XLarge.

```json
{
  "shared": {
    "&": {"display": "inline-flex", "align-items": "center", "justify-content": "center", "white-space": "nowrap", "appearance": "none", "gap": "12px", "border": "0", "border-radius": "0", "line-height": "1.5", "box-sizing": "border-box", "font-family": "inherit", "text-decoration": "none"},
    "& > img": {"flex-shrink": "0", "display": "block", "height": "auto"}
  },
  "structures": {
    "s1": "<button class=\"{{component}}\" type=\"button\"><img class=\"{{icon_1_class}}\" src=\"{{icon_1_src}}\" alt=\"\" aria-hidden=\"true\">Tab</button>",
    "s2": "<button class=\"{{component}}\" type=\"button\" disabled><img class=\"{{icon_1_class}}\" src=\"{{icon_1_src}}\" alt=\"\" aria-hidden=\"true\">Tab</button>"
  },
  "variants": [
    {"id": "tab_filled_icon_small", "size": "Small", "state": "Default", "structure": "s1", "icons": ["icon_16"], "rules": {"&": {"font-weight": "500", "cursor": "pointer", "min-height": "36px", "padding": "0 16px", "background": "var(--color-static-black)", "color": "var(--color-common-100)", "font-size": "var(--font-size-14)"}, "& > img": {"filter": "brightness(0) invert(1)"}}},
    {"id": "tab_filled_icon_medium", "size": "Medium (Default)", "state": "Default", "structure": "s1", "icons": ["icon_16"], "rules": {"&": {"font-weight": "500", "cursor": "pointer", "min-height": "44px", "padding": "0 24px", "background": "var(--color-static-black)", "color": "var(--color-common-100)", "font-size": "var(--font-size-16)"}, "& > img": {"filter": "brightness(0) invert(1)"}}},
    {"id": "tab_filled_icon_large", "size": "Large", "state": "Default", "structure": "s1", "icons": ["icon_20"], "rules": {"&": {"font-weight": "500", "cursor": "pointer", "min-height": "52px", "padding": "0 28px", "background": "var(--color-static-black)", "color": "var(--color-common-100)", "font-size": "var(--font-size-16)"}, "& > img": {"filter": "brightness(0) invert(1)"}}},
    {"id": "tab_filled_icon_xlarge", "size": "XLarge", "state": "Default", "structure": "s1", "icons": ["icon_20"], "rules": {"&": {"font-weight": "600", "cursor": "pointer", "min-height": "60px", "padding": "0 32px", "background": "var(--color-static-black)", "color": "var(--color-common-100)", "font-size": "var(--font-size-18)"}, "& > img": {"filter": "brightness(0) invert(1)"}}},
    {"id": "tab_filled_icon_disabled_small", "size": "Small", "state": "Disabled", "structure": "s2", "icons": ["icon_16"], "rules": {"&": {"font-weight": "500", "min-height": "36px", "padding": "0 16px", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "font-size": "var(--font-size-14)", "cursor": "default"}, "& > img": {"filter": "brightness(0) invert(22%)", "opacity": "0.16"}}},
    {"id": "tab_filled_icon_disabled_medium", "size": "Medium (Default)", "state": "Disabled", "structure": "s2", "icons": ["icon_16"], "rules": {"&": {"font-weight": "500", "min-height": "44px", "padding": "0 24px", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "font-size": "var(--font-size-16)", "cursor": "default"}, "& > img": {"filter": "brightness(0) invert(22%)", "opacity": "0.16"}}},
    {"id": "tab_filled_icon_disabled_large", "size": "Large", "state": "Disabled", "structure": "s2", "icons": ["icon_20"], "rules": {"&": {"font-weight": "500", "min-height": "52px", "padding": "0 28px", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "font-size": "var(--font-size-16)", "cursor": "default"}, "& > img": {"filter": "brightness(0) invert(22%)", "opacity": "0.16"}}},
    {"id": "tab_filled_icon_disabled_xlarge", "size": "XLarge", "state": "Disabled", "structure": "s2", "icons": ["icon_20"], "rules": {"&": {"font-weight": "600", "min-height": "60px", "padding": "0 32px", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "font-size": "var(--font-size-18)", "cursor": "default"}, "& > img": {"filter": "brightness(0) invert(22%)", "opacity": "0.16"}}}
  ]
}
```

### C21 Tab / Filled Rounded

열: Small / Medium (Default) / Large / XLarge.

```json
{
  "shared": {
    "&": {"display": "inline-flex", "align-items": "center", "justify-content": "center", "white-space": "nowrap", "appearance": "none", "border": "0", "border-radius": "8px", "line-height": "1.5", "box-sizing": "border-box", "font-family": "inherit", "text-decoration": "none"}
  },
  "structures": {
    "s1": "<button class=\"{{component}}\" type=\"button\">Tab</button>",
    "s2": "<button class=\"{{component}}\" type=\"button\" disabled>Tab</button>"
  },
  "variants": [
    {"id": "tab_filled_rounded_small", "size": "Small", "state": "Default", "structure": "s1", "rules": {"&": {"font-weight": "500", "cursor": "pointer", "min-height": "36px", "padding": "0 16px", "background": "var(--color-static-black)", "color": "var(--color-common-100)", "font-size": "var(--font-size-14)"}}},
    {"id": "tab_filled_rounded_medium", "size": "Medium (Default)", "state": "Default", "structure": "s1", "rules": {"&": {"font-weight": "500", "cursor": "pointer", "min-height": "44px", "padding": "0 24px", "background": "var(--color-static-black)", "color": "var(--color-common-100)", "font-size": "var(--font-size-16)"}}},
    {"id": "tab_filled_rounded_large", "size": "Large", "state": "Default", "structure": "s1", "rules": {"&": {"font-weight": "500", "cursor": "pointer", "min-height": "52px", "padding": "0 28px", "background": "var(--color-static-black)", "color": "var(--color-common-100)", "font-size": "var(--font-size-16)"}}},
    {"id": "tab_filled_rounded_xlarge", "size": "XLarge", "state": "Default", "structure": "s1", "rules": {"&": {"font-weight": "600", "cursor": "pointer", "min-height": "60px", "padding": "0 32px", "background": "var(--color-static-black)", "color": "var(--color-common-100)", "font-size": "var(--font-size-18)"}}},
    {"id": "tab_filled_rounded_disabled_small", "size": "Small", "state": "Disabled", "structure": "s2", "rules": {"&": {"font-weight": "500", "min-height": "36px", "padding": "0 16px", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "font-size": "var(--font-size-14)", "cursor": "default"}}},
    {"id": "tab_filled_rounded_disabled_medium", "size": "Medium (Default)", "state": "Disabled", "structure": "s2", "rules": {"&": {"font-weight": "500", "min-height": "44px", "padding": "0 24px", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "font-size": "var(--font-size-16)", "cursor": "default"}}},
    {"id": "tab_filled_rounded_disabled_large", "size": "Large", "state": "Disabled", "structure": "s2", "rules": {"&": {"font-weight": "500", "min-height": "52px", "padding": "0 28px", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "font-size": "var(--font-size-16)", "cursor": "default"}}},
    {"id": "tab_filled_rounded_disabled_xlarge", "size": "XLarge", "state": "Disabled", "structure": "s2", "rules": {"&": {"font-weight": "600", "min-height": "60px", "padding": "0 32px", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "font-size": "var(--font-size-18)", "cursor": "default"}}}
  ]
}
```

### C22 Tab / Filled Rounded+icon

열: Small / Medium (Default) / Large / XLarge.

```json
{
  "shared": {
    "&": {"display": "inline-flex", "align-items": "center", "justify-content": "center", "white-space": "nowrap", "appearance": "none", "gap": "12px", "border": "0", "border-radius": "8px", "line-height": "1.5", "box-sizing": "border-box", "font-family": "inherit", "text-decoration": "none"},
    "& > img": {"flex-shrink": "0", "display": "block", "height": "auto"}
  },
  "structures": {
    "s1": "<button class=\"{{component}}\" type=\"button\"><img class=\"{{icon_1_class}}\" src=\"{{icon_1_src}}\" alt=\"\" aria-hidden=\"true\">Tab</button>",
    "s2": "<button class=\"{{component}}\" type=\"button\" disabled><img class=\"{{icon_1_class}}\" src=\"{{icon_1_src}}\" alt=\"\" aria-hidden=\"true\">Tab</button>"
  },
  "variants": [
    {"id": "tab_filled_rounded_icon_small", "size": "Small", "state": "Default", "structure": "s1", "icons": ["icon_16"], "rules": {"&": {"font-weight": "500", "cursor": "pointer", "min-height": "36px", "padding": "0 16px", "background": "var(--color-static-black)", "color": "var(--color-common-100)", "font-size": "var(--font-size-14)"}, "& > img": {"filter": "brightness(0) invert(1)"}}},
    {"id": "tab_filled_rounded_icon_medium", "size": "Medium (Default)", "state": "Default", "structure": "s1", "icons": ["icon_16"], "rules": {"&": {"font-weight": "500", "cursor": "pointer", "min-height": "44px", "padding": "0 24px", "background": "var(--color-static-black)", "color": "var(--color-common-100)", "font-size": "var(--font-size-16)"}, "& > img": {"filter": "brightness(0) invert(1)"}}},
    {"id": "tab_filled_rounded_icon_large", "size": "Large", "state": "Default", "structure": "s1", "icons": ["icon_20"], "rules": {"&": {"font-weight": "500", "cursor": "pointer", "min-height": "52px", "padding": "0 28px", "background": "var(--color-static-black)", "color": "var(--color-common-100)", "font-size": "var(--font-size-16)"}, "& > img": {"filter": "brightness(0) invert(1)"}}},
    {"id": "tab_filled_rounded_icon_xlarge", "size": "XLarge", "state": "Default", "structure": "s1", "icons": ["icon_20"], "rules": {"&": {"font-weight": "600", "cursor": "pointer", "min-height": "60px", "padding": "0 32px", "background": "var(--color-static-black)", "color": "var(--color-common-100)", "font-size": "var(--font-size-18)"}, "& > img": {"filter": "brightness(0) invert(1)"}}},
    {"id": "tab_filled_rounded_icon_disabled_small", "size": "Small", "state": "Disabled", "structure": "s2", "icons": ["icon_16"], "rules": {"&": {"font-weight": "500", "min-height": "36px", "padding": "0 16px", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "font-size": "var(--font-size-14)", "cursor": "default"}, "& > img": {"filter": "brightness(0) invert(22%)", "opacity": "0.16"}}},
    {"id": "tab_filled_rounded_icon_disabled_medium", "size": "Medium (Default)", "state": "Disabled", "structure": "s2", "icons": ["icon_16"], "rules": {"&": {"font-weight": "500", "min-height": "44px", "padding": "0 24px", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "font-size": "var(--font-size-16)", "cursor": "default"}, "& > img": {"filter": "brightness(0) invert(22%)", "opacity": "0.16"}}},
    {"id": "tab_filled_rounded_icon_disabled_large", "size": "Large", "state": "Disabled", "structure": "s2", "icons": ["icon_20"], "rules": {"&": {"font-weight": "500", "min-height": "52px", "padding": "0 28px", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "font-size": "var(--font-size-16)", "cursor": "default"}, "& > img": {"filter": "brightness(0) invert(22%)", "opacity": "0.16"}}},
    {"id": "tab_filled_rounded_icon_disabled_xlarge", "size": "XLarge", "state": "Disabled", "structure": "s2", "icons": ["icon_20"], "rules": {"&": {"font-weight": "600", "min-height": "60px", "padding": "0 32px", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "font-size": "var(--font-size-18)", "cursor": "default"}, "& > img": {"filter": "brightness(0) invert(22%)", "opacity": "0.16"}}}
  ]
}
```

### C23 Tab / Filled Full Rounded

열: Small / Medium (Default) / Large / XLarge.

```json
{
  "shared": {
    "&": {"display": "inline-flex", "align-items": "center", "justify-content": "center", "white-space": "nowrap", "appearance": "none", "border": "0", "border-radius": "9999px", "line-height": "1.5", "box-sizing": "border-box", "font-family": "inherit", "text-decoration": "none"}
  },
  "structures": {
    "s1": "<button class=\"{{component}}\" type=\"button\">Tab</button>",
    "s2": "<button class=\"{{component}}\" type=\"button\" disabled>Tab</button>"
  },
  "variants": [
    {"id": "tab_filled_full_rounded_small", "size": "Small", "state": "Default", "structure": "s1", "rules": {"&": {"font-weight": "500", "cursor": "pointer", "min-height": "36px", "padding": "0 16px", "background": "var(--color-static-black)", "color": "var(--color-common-100)", "font-size": "var(--font-size-14)"}}},
    {"id": "tab_filled_full_rounded_medium", "size": "Medium (Default)", "state": "Default", "structure": "s1", "rules": {"&": {"font-weight": "500", "cursor": "pointer", "min-height": "44px", "padding": "0 24px", "background": "var(--color-static-black)", "color": "var(--color-common-100)", "font-size": "var(--font-size-16)"}}},
    {"id": "tab_filled_full_rounded_large", "size": "Large", "state": "Default", "structure": "s1", "rules": {"&": {"font-weight": "500", "cursor": "pointer", "min-height": "52px", "padding": "0 28px", "background": "var(--color-static-black)", "color": "var(--color-common-100)", "font-size": "var(--font-size-16)"}}},
    {"id": "tab_filled_full_rounded_xlarge", "size": "XLarge", "state": "Default", "structure": "s1", "rules": {"&": {"font-weight": "600", "cursor": "pointer", "min-height": "60px", "padding": "0 32px", "background": "var(--color-static-black)", "color": "var(--color-common-100)", "font-size": "var(--font-size-18)"}}},
    {"id": "tab_filled_full_rounded_disabled_small", "size": "Small", "state": "Disabled", "structure": "s2", "rules": {"&": {"font-weight": "500", "min-height": "36px", "padding": "0 16px", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "font-size": "var(--font-size-14)", "cursor": "default"}}},
    {"id": "tab_filled_full_rounded_disabled_medium", "size": "Medium (Default)", "state": "Disabled", "structure": "s2", "rules": {"&": {"font-weight": "500", "min-height": "44px", "padding": "0 24px", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "font-size": "var(--font-size-16)", "cursor": "default"}}},
    {"id": "tab_filled_full_rounded_disabled_large", "size": "Large", "state": "Disabled", "structure": "s2", "rules": {"&": {"font-weight": "500", "min-height": "52px", "padding": "0 28px", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "font-size": "var(--font-size-16)", "cursor": "default"}}},
    {"id": "tab_filled_full_rounded_disabled_xlarge", "size": "XLarge", "state": "Disabled", "structure": "s2", "rules": {"&": {"font-weight": "600", "min-height": "60px", "padding": "0 32px", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "font-size": "var(--font-size-18)", "cursor": "default"}}}
  ]
}
```

### C24 Tab / Filled Full Rounded+icon

열: Small / Medium (Default) / Large / XLarge.

```json
{
  "shared": {
    "&": {"display": "inline-flex", "align-items": "center", "justify-content": "center", "white-space": "nowrap", "appearance": "none", "gap": "12px", "border": "0", "border-radius": "9999px", "line-height": "1.5", "box-sizing": "border-box", "font-family": "inherit", "text-decoration": "none"},
    "& > img": {"flex-shrink": "0", "display": "block", "height": "auto"}
  },
  "structures": {
    "s1": "<button class=\"{{component}}\" type=\"button\"><img class=\"{{icon_1_class}}\" src=\"{{icon_1_src}}\" alt=\"\" aria-hidden=\"true\">Tab</button>",
    "s2": "<button class=\"{{component}}\" type=\"button\" disabled><img class=\"{{icon_1_class}}\" src=\"{{icon_1_src}}\" alt=\"\" aria-hidden=\"true\">Tab</button>"
  },
  "variants": [
    {"id": "tab_filled_full_rounded_icon_small", "size": "Small", "state": "Default", "structure": "s1", "icons": ["icon_16"], "rules": {"&": {"font-weight": "500", "cursor": "pointer", "min-height": "36px", "padding": "0 16px", "background": "var(--color-static-black)", "color": "var(--color-common-100)", "font-size": "var(--font-size-14)"}, "& > img": {"filter": "brightness(0) invert(1)"}}},
    {"id": "tab_filled_full_rounded_icon_medium", "size": "Medium (Default)", "state": "Default", "structure": "s1", "icons": ["icon_16"], "rules": {"&": {"font-weight": "500", "cursor": "pointer", "min-height": "44px", "padding": "0 24px", "background": "var(--color-static-black)", "color": "var(--color-common-100)", "font-size": "var(--font-size-16)"}, "& > img": {"filter": "brightness(0) invert(1)"}}},
    {"id": "tab_filled_full_rounded_icon_large", "size": "Large", "state": "Default", "structure": "s1", "icons": ["icon_20"], "rules": {"&": {"font-weight": "500", "cursor": "pointer", "min-height": "52px", "padding": "0 28px", "background": "var(--color-static-black)", "color": "var(--color-common-100)", "font-size": "var(--font-size-16)"}, "& > img": {"filter": "brightness(0) invert(1)"}}},
    {"id": "tab_filled_full_rounded_icon_xlarge", "size": "XLarge", "state": "Default", "structure": "s1", "icons": ["icon_20"], "rules": {"&": {"font-weight": "600", "cursor": "pointer", "min-height": "60px", "padding": "0 32px", "background": "var(--color-static-black)", "color": "var(--color-common-100)", "font-size": "var(--font-size-18)"}, "& > img": {"filter": "brightness(0) invert(1)"}}},
    {"id": "tab_filled_full_rounded_icon_disabled_small", "size": "Small", "state": "Disabled", "structure": "s2", "icons": ["icon_16"], "rules": {"&": {"font-weight": "500", "min-height": "36px", "padding": "0 16px", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "font-size": "var(--font-size-14)", "cursor": "default"}, "& > img": {"filter": "brightness(0) invert(22%)", "opacity": "0.16"}}},
    {"id": "tab_filled_full_rounded_icon_disabled_medium", "size": "Medium (Default)", "state": "Disabled", "structure": "s2", "icons": ["icon_16"], "rules": {"&": {"font-weight": "500", "min-height": "44px", "padding": "0 24px", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "font-size": "var(--font-size-16)", "cursor": "default"}, "& > img": {"filter": "brightness(0) invert(22%)", "opacity": "0.16"}}},
    {"id": "tab_filled_full_rounded_icon_disabled_large", "size": "Large", "state": "Disabled", "structure": "s2", "icons": ["icon_20"], "rules": {"&": {"font-weight": "500", "min-height": "52px", "padding": "0 28px", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "font-size": "var(--font-size-16)", "cursor": "default"}, "& > img": {"filter": "brightness(0) invert(22%)", "opacity": "0.16"}}},
    {"id": "tab_filled_full_rounded_icon_disabled_xlarge", "size": "XLarge", "state": "Disabled", "structure": "s2", "icons": ["icon_20"], "rules": {"&": {"font-weight": "600", "min-height": "60px", "padding": "0 32px", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "font-size": "var(--font-size-18)", "cursor": "default"}, "& > img": {"filter": "brightness(0) invert(22%)", "opacity": "0.16"}}}
  ]
}
```

### C25 Tab / Outline

열: Small / Medium (Default) / Large / XLarge.

```json
{
  "shared": {
    "&": {"display": "inline-flex", "align-items": "center", "justify-content": "center", "white-space": "nowrap", "appearance": "none", "border-radius": "0", "line-height": "1.5", "box-sizing": "border-box", "font-family": "inherit", "text-decoration": "none"}
  },
  "structures": {
    "s1": "<button class=\"{{component}}\" type=\"button\">Tab</button>",
    "s2": "<button class=\"{{component}}\" type=\"button\" disabled>Tab</button>"
  },
  "variants": [
    {"id": "tab_outline_small", "size": "Small", "state": "Default", "structure": "s1", "rules": {"&": {"font-weight": "500", "cursor": "pointer", "min-height": "36px", "padding": "0 16px", "border": "1px solid var(--color-static-black)", "background": "var(--color-common-100)", "color": "var(--color-static-black)", "font-size": "var(--font-size-14)"}}},
    {"id": "tab_outline_medium", "size": "Medium (Default)", "state": "Default", "structure": "s1", "rules": {"&": {"font-weight": "500", "cursor": "pointer", "min-height": "44px", "padding": "0 24px", "border": "1px solid var(--color-static-black)", "background": "var(--color-common-100)", "color": "var(--color-static-black)", "font-size": "var(--font-size-16)"}}},
    {"id": "tab_outline_large", "size": "Large", "state": "Default", "structure": "s1", "rules": {"&": {"font-weight": "500", "cursor": "pointer", "min-height": "52px", "padding": "0 28px", "border": "1px solid var(--color-static-black)", "background": "var(--color-common-100)", "color": "var(--color-static-black)", "font-size": "var(--font-size-16)"}}},
    {"id": "tab_outline_xlarge", "size": "XLarge", "state": "Default", "structure": "s1", "rules": {"&": {"font-weight": "600", "cursor": "pointer", "min-height": "60px", "padding": "0 32px", "border": "1px solid var(--color-static-black)", "background": "var(--color-common-100)", "color": "var(--color-static-black)", "font-size": "var(--font-size-18)"}}},
    {"id": "tab_outline_disabled_small", "size": "Small", "state": "Disabled", "structure": "s2", "rules": {"&": {"font-weight": "500", "min-height": "36px", "padding": "0 16px", "border": "1px solid transparent", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "box-shadow": "none", "font-size": "var(--font-size-14)", "cursor": "default"}}},
    {"id": "tab_outline_disabled_medium", "size": "Medium (Default)", "state": "Disabled", "structure": "s2", "rules": {"&": {"font-weight": "500", "min-height": "44px", "padding": "0 24px", "border": "1px solid transparent", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "box-shadow": "none", "font-size": "var(--font-size-16)", "cursor": "default"}}},
    {"id": "tab_outline_disabled_large", "size": "Large", "state": "Disabled", "structure": "s2", "rules": {"&": {"font-weight": "500", "min-height": "52px", "padding": "0 28px", "border": "1px solid transparent", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "box-shadow": "none", "font-size": "var(--font-size-16)", "cursor": "default"}}},
    {"id": "tab_outline_disabled_xlarge", "size": "XLarge", "state": "Disabled", "structure": "s2", "rules": {"&": {"font-weight": "600", "min-height": "60px", "padding": "0 32px", "border": "1px solid transparent", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "box-shadow": "none", "font-size": "var(--font-size-18)", "cursor": "default"}}}
  ]
}
```

### C26 Tab / Outline+icon

열: Small / Medium (Default) / Large / XLarge.

```json
{
  "shared": {
    "&": {"display": "inline-flex", "align-items": "center", "justify-content": "center", "white-space": "nowrap", "appearance": "none", "gap": "12px", "border-radius": "0", "line-height": "1.5", "box-sizing": "border-box", "font-family": "inherit", "text-decoration": "none"},
    "& > img": {"flex-shrink": "0", "display": "block", "height": "auto"}
  },
  "structures": {
    "s1": "<button class=\"{{component}}\" type=\"button\"><img class=\"{{icon_1_class}}\" src=\"{{icon_1_src}}\" alt=\"\" aria-hidden=\"true\">Tab</button>",
    "s2": "<button class=\"{{component}}\" type=\"button\" disabled><img class=\"{{icon_1_class}}\" src=\"{{icon_1_src}}\" alt=\"\" aria-hidden=\"true\">Tab</button>"
  },
  "variants": [
    {"id": "tab_outline_icon_small", "size": "Small", "state": "Default", "structure": "s1", "icons": ["icon_16"], "rules": {"&": {"font-weight": "500", "cursor": "pointer", "min-height": "36px", "padding": "0 16px", "border": "1px solid var(--color-static-black)", "background": "var(--color-common-100)", "color": "var(--color-static-black)", "font-size": "var(--font-size-14)"}}},
    {"id": "tab_outline_icon_medium", "size": "Medium (Default)", "state": "Default", "structure": "s1", "icons": ["icon_16"], "rules": {"&": {"font-weight": "500", "cursor": "pointer", "min-height": "44px", "padding": "0 24px", "border": "1px solid var(--color-static-black)", "background": "var(--color-common-100)", "color": "var(--color-static-black)", "font-size": "var(--font-size-16)"}}},
    {"id": "tab_outline_icon_large", "size": "Large", "state": "Default", "structure": "s1", "icons": ["icon_16"], "rules": {"&": {"font-weight": "500", "cursor": "pointer", "min-height": "52px", "padding": "0 28px", "border": "1px solid var(--color-static-black)", "background": "var(--color-common-100)", "color": "var(--color-static-black)", "font-size": "var(--font-size-16)"}}},
    {"id": "tab_outline_icon_xlarge", "size": "XLarge", "state": "Default", "structure": "s1", "icons": ["icon_16"], "rules": {"&": {"font-weight": "600", "cursor": "pointer", "min-height": "60px", "padding": "0 32px", "border": "1px solid var(--color-static-black)", "background": "var(--color-common-100)", "color": "var(--color-static-black)", "font-size": "var(--font-size-18)"}}},
    {"id": "tab_outline_icon_disabled_small", "size": "Small", "state": "Disabled", "structure": "s2", "icons": ["icon_16"], "rules": {"&": {"font-weight": "500", "min-height": "36px", "padding": "0 16px", "border": "1px solid transparent", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "box-shadow": "none", "font-size": "var(--font-size-14)", "cursor": "default"}, "& > img": {"filter": "brightness(0) invert(22%)", "opacity": "0.16"}}},
    {"id": "tab_outline_icon_disabled_medium", "size": "Medium (Default)", "state": "Disabled", "structure": "s2", "icons": ["icon_16"], "rules": {"&": {"font-weight": "500", "min-height": "44px", "padding": "0 24px", "border": "1px solid transparent", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "box-shadow": "none", "font-size": "var(--font-size-16)", "cursor": "default"}, "& > img": {"filter": "brightness(0) invert(22%)", "opacity": "0.16"}}},
    {"id": "tab_outline_icon_disabled_large", "size": "Large", "state": "Disabled", "structure": "s2", "icons": ["icon_16"], "rules": {"&": {"font-weight": "500", "min-height": "52px", "padding": "0 28px", "border": "1px solid transparent", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "box-shadow": "none", "font-size": "var(--font-size-16)", "cursor": "default"}, "& > img": {"filter": "brightness(0) invert(22%)", "opacity": "0.16"}}},
    {"id": "tab_outline_icon_disabled_xlarge", "size": "XLarge", "state": "Disabled", "structure": "s2", "icons": ["icon_16"], "rules": {"&": {"font-weight": "600", "min-height": "60px", "padding": "0 32px", "border": "1px solid transparent", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "box-shadow": "none", "font-size": "var(--font-size-18)", "cursor": "default"}, "& > img": {"filter": "brightness(0) invert(22%)", "opacity": "0.16"}}}
  ]
}
```

### C27 Tab / Outline Rounded

열: Small / Medium (Default) / Large / XLarge.

```json
{
  "shared": {
    "&": {"display": "inline-flex", "align-items": "center", "justify-content": "center", "white-space": "nowrap", "appearance": "none", "border-radius": "8px", "line-height": "1.5", "box-sizing": "border-box", "font-family": "inherit", "text-decoration": "none"}
  },
  "structures": {
    "s1": "<button class=\"{{component}}\" type=\"button\">Tab</button>",
    "s2": "<button class=\"{{component}}\" type=\"button\" disabled>Tab</button>"
  },
  "variants": [
    {"id": "tab_outline_rounded_small", "size": "Small", "state": "Default", "structure": "s1", "rules": {"&": {"font-weight": "500", "cursor": "pointer", "min-height": "36px", "padding": "0 16px", "border": "1px solid var(--color-static-black)", "background": "var(--color-common-100)", "color": "var(--color-static-black)", "font-size": "var(--font-size-14)"}}},
    {"id": "tab_outline_rounded_medium", "size": "Medium (Default)", "state": "Default", "structure": "s1", "rules": {"&": {"font-weight": "500", "cursor": "pointer", "min-height": "44px", "padding": "0 24px", "border": "1px solid var(--color-static-black)", "background": "var(--color-common-100)", "color": "var(--color-static-black)", "font-size": "var(--font-size-16)"}}},
    {"id": "tab_outline_rounded_large", "size": "Large", "state": "Default", "structure": "s1", "rules": {"&": {"font-weight": "500", "cursor": "pointer", "min-height": "52px", "padding": "0 28px", "border": "1px solid var(--color-static-black)", "background": "var(--color-common-100)", "color": "var(--color-static-black)", "font-size": "var(--font-size-16)"}}},
    {"id": "tab_outline_rounded_xlarge", "size": "XLarge", "state": "Default", "structure": "s1", "rules": {"&": {"font-weight": "600", "cursor": "pointer", "min-height": "60px", "padding": "0 32px", "border": "1px solid var(--color-static-black)", "background": "var(--color-common-100)", "color": "var(--color-static-black)", "font-size": "var(--font-size-18)"}}},
    {"id": "tab_outline_rounded_disabled_small", "size": "Small", "state": "Disabled", "structure": "s2", "rules": {"&": {"font-weight": "500", "min-height": "36px", "padding": "0 16px", "border": "1px solid transparent", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "box-shadow": "none", "font-size": "var(--font-size-14)", "cursor": "default"}}},
    {"id": "tab_outline_rounded_disabled_medium", "size": "Medium (Default)", "state": "Disabled", "structure": "s2", "rules": {"&": {"font-weight": "500", "min-height": "44px", "padding": "0 24px", "border": "1px solid transparent", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "box-shadow": "none", "font-size": "var(--font-size-16)", "cursor": "default"}}},
    {"id": "tab_outline_rounded_disabled_large", "size": "Large", "state": "Disabled", "structure": "s2", "rules": {"&": {"font-weight": "500", "min-height": "52px", "padding": "0 28px", "border": "1px solid transparent", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "box-shadow": "none", "font-size": "var(--font-size-16)", "cursor": "default"}}},
    {"id": "tab_outline_rounded_disabled_xlarge", "size": "XLarge", "state": "Disabled", "structure": "s2", "rules": {"&": {"font-weight": "600", "min-height": "60px", "padding": "0 32px", "border": "1px solid transparent", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "box-shadow": "none", "font-size": "var(--font-size-18)", "cursor": "default"}}}
  ]
}
```

### C28 Tab / Outline Rounded+icon

열: Small / Medium (Default) / Large / XLarge.

```json
{
  "shared": {
    "&": {"display": "inline-flex", "align-items": "center", "justify-content": "center", "white-space": "nowrap", "appearance": "none", "gap": "12px", "border-radius": "8px", "line-height": "1.5", "box-sizing": "border-box", "font-family": "inherit", "text-decoration": "none"},
    "& > img": {"flex-shrink": "0", "display": "block", "height": "auto"}
  },
  "structures": {
    "s1": "<button class=\"{{component}}\" type=\"button\"><img class=\"{{icon_1_class}}\" src=\"{{icon_1_src}}\" alt=\"\" aria-hidden=\"true\">Tab</button>",
    "s2": "<button class=\"{{component}}\" type=\"button\" disabled><img class=\"{{icon_1_class}}\" src=\"{{icon_1_src}}\" alt=\"\" aria-hidden=\"true\">Tab</button>"
  },
  "variants": [
    {"id": "tab_outline_rounded_icon_small", "size": "Small", "state": "Default", "structure": "s1", "icons": ["icon_16"], "rules": {"&": {"font-weight": "500", "cursor": "pointer", "min-height": "36px", "padding": "0 16px", "border": "1px solid var(--color-static-black)", "background": "var(--color-common-100)", "color": "var(--color-static-black)", "font-size": "var(--font-size-14)"}}},
    {"id": "tab_outline_rounded_icon_medium", "size": "Medium (Default)", "state": "Default", "structure": "s1", "icons": ["icon_16"], "rules": {"&": {"font-weight": "500", "cursor": "pointer", "min-height": "44px", "padding": "0 24px", "border": "1px solid var(--color-static-black)", "background": "var(--color-common-100)", "color": "var(--color-static-black)", "font-size": "var(--font-size-16)"}}},
    {"id": "tab_outline_rounded_icon_large", "size": "Large", "state": "Default", "structure": "s1", "icons": ["icon_16"], "rules": {"&": {"font-weight": "500", "cursor": "pointer", "min-height": "52px", "padding": "0 28px", "border": "1px solid var(--color-static-black)", "background": "var(--color-common-100)", "color": "var(--color-static-black)", "font-size": "var(--font-size-16)"}}},
    {"id": "tab_outline_rounded_icon_xlarge", "size": "XLarge", "state": "Default", "structure": "s1", "icons": ["icon_16"], "rules": {"&": {"font-weight": "600", "cursor": "pointer", "min-height": "60px", "padding": "0 32px", "border": "1px solid var(--color-static-black)", "background": "var(--color-common-100)", "color": "var(--color-static-black)", "font-size": "var(--font-size-18)"}}},
    {"id": "tab_outline_rounded_icon_disabled_small", "size": "Small", "state": "Disabled", "structure": "s2", "icons": ["icon_16"], "rules": {"&": {"font-weight": "500", "min-height": "36px", "padding": "0 16px", "border": "1px solid transparent", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "box-shadow": "none", "font-size": "var(--font-size-14)", "cursor": "default"}, "& > img": {"filter": "brightness(0) invert(22%)", "opacity": "0.16"}}},
    {"id": "tab_outline_rounded_icon_disabled_medium", "size": "Medium (Default)", "state": "Disabled", "structure": "s2", "icons": ["icon_16"], "rules": {"&": {"font-weight": "500", "min-height": "44px", "padding": "0 24px", "border": "1px solid transparent", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "box-shadow": "none", "font-size": "var(--font-size-16)", "cursor": "default"}, "& > img": {"filter": "brightness(0) invert(22%)", "opacity": "0.16"}}},
    {"id": "tab_outline_rounded_icon_disabled_large", "size": "Large", "state": "Disabled", "structure": "s2", "icons": ["icon_16"], "rules": {"&": {"font-weight": "500", "min-height": "52px", "padding": "0 28px", "border": "1px solid transparent", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "box-shadow": "none", "font-size": "var(--font-size-16)", "cursor": "default"}, "& > img": {"filter": "brightness(0) invert(22%)", "opacity": "0.16"}}},
    {"id": "tab_outline_rounded_icon_disabled_xlarge", "size": "XLarge", "state": "Disabled", "structure": "s2", "icons": ["icon_16"], "rules": {"&": {"font-weight": "600", "min-height": "60px", "padding": "0 32px", "border": "1px solid transparent", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "box-shadow": "none", "font-size": "var(--font-size-18)", "cursor": "default"}, "& > img": {"filter": "brightness(0) invert(22%)", "opacity": "0.16"}}}
  ]
}
```

### C29 Tab / Outline Full Rounded

열: Small / Medium (Default) / Large / XLarge.

```json
{
  "shared": {
    "&": {"display": "inline-flex", "align-items": "center", "justify-content": "center", "white-space": "nowrap", "appearance": "none", "border-radius": "9999px", "line-height": "1.5", "box-sizing": "border-box", "font-family": "inherit", "text-decoration": "none"}
  },
  "structures": {
    "s1": "<button class=\"{{component}}\" type=\"button\">Tab</button>",
    "s2": "<button class=\"{{component}}\" type=\"button\" disabled>Tab</button>"
  },
  "variants": [
    {"id": "tab_outline_full_rounded_small", "size": "Small", "state": "Default", "structure": "s1", "rules": {"&": {"font-weight": "500", "cursor": "pointer", "min-height": "36px", "padding": "0 16px", "border": "1px solid var(--color-static-black)", "background": "var(--color-common-100)", "color": "var(--color-static-black)", "font-size": "var(--font-size-14)"}}},
    {"id": "tab_outline_full_rounded_medium", "size": "Medium (Default)", "state": "Default", "structure": "s1", "rules": {"&": {"font-weight": "500", "cursor": "pointer", "min-height": "44px", "padding": "0 24px", "border": "1px solid var(--color-static-black)", "background": "var(--color-common-100)", "color": "var(--color-static-black)", "font-size": "var(--font-size-16)"}}},
    {"id": "tab_outline_full_rounded_large", "size": "Large", "state": "Default", "structure": "s1", "rules": {"&": {"font-weight": "500", "cursor": "pointer", "min-height": "52px", "padding": "0 28px", "border": "1px solid var(--color-static-black)", "background": "var(--color-common-100)", "color": "var(--color-static-black)", "font-size": "var(--font-size-16)"}}},
    {"id": "tab_outline_full_rounded_xlarge", "size": "XLarge", "state": "Default", "structure": "s1", "rules": {"&": {"font-weight": "600", "cursor": "pointer", "min-height": "60px", "padding": "0 32px", "border": "1px solid var(--color-static-black)", "background": "var(--color-common-100)", "color": "var(--color-static-black)", "font-size": "var(--font-size-18)"}}},
    {"id": "tab_outline_full_rounded_disabled_small", "size": "Small", "state": "Disabled", "structure": "s2", "rules": {"&": {"font-weight": "500", "min-height": "36px", "padding": "0 16px", "border": "1px solid transparent", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "box-shadow": "none", "font-size": "var(--font-size-14)", "cursor": "default"}}},
    {"id": "tab_outline_full_rounded_disabled_medium", "size": "Medium (Default)", "state": "Disabled", "structure": "s2", "rules": {"&": {"font-weight": "500", "min-height": "44px", "padding": "0 24px", "border": "1px solid transparent", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "box-shadow": "none", "font-size": "var(--font-size-16)", "cursor": "default"}}},
    {"id": "tab_outline_full_rounded_disabled_large", "size": "Large", "state": "Disabled", "structure": "s2", "rules": {"&": {"font-weight": "500", "min-height": "52px", "padding": "0 28px", "border": "1px solid transparent", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "box-shadow": "none", "font-size": "var(--font-size-16)", "cursor": "default"}}},
    {"id": "tab_outline_full_rounded_disabled_xlarge", "size": "XLarge", "state": "Disabled", "structure": "s2", "rules": {"&": {"font-weight": "600", "min-height": "60px", "padding": "0 32px", "border": "1px solid transparent", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "box-shadow": "none", "font-size": "var(--font-size-18)", "cursor": "default"}}}
  ]
}
```

### C30 Tab / Outline Full Rounded+icon

열: Small / Medium (Default) / Large / XLarge.

```json
{
  "shared": {
    "&": {"display": "inline-flex", "align-items": "center", "justify-content": "center", "white-space": "nowrap", "appearance": "none", "gap": "12px", "border-radius": "9999px", "line-height": "1.5", "box-sizing": "border-box", "font-family": "inherit", "text-decoration": "none"},
    "& > img": {"flex-shrink": "0", "display": "block", "height": "auto"}
  },
  "structures": {
    "s1": "<button class=\"{{component}}\" type=\"button\"><img class=\"{{icon_1_class}}\" src=\"{{icon_1_src}}\" alt=\"\" aria-hidden=\"true\">Tab</button>",
    "s2": "<button class=\"{{component}}\" type=\"button\" disabled><img class=\"{{icon_1_class}}\" src=\"{{icon_1_src}}\" alt=\"\" aria-hidden=\"true\">Tab</button>"
  },
  "variants": [
    {"id": "tab_outline_full_rounded_icon_small", "size": "Small", "state": "Default", "structure": "s1", "icons": ["icon_16"], "rules": {"&": {"font-weight": "500", "cursor": "pointer", "min-height": "36px", "padding": "0 16px", "border": "1px solid var(--color-static-black)", "background": "var(--color-common-100)", "color": "var(--color-static-black)", "font-size": "var(--font-size-14)"}}},
    {"id": "tab_outline_full_rounded_icon_medium", "size": "Medium (Default)", "state": "Default", "structure": "s1", "icons": ["icon_16"], "rules": {"&": {"font-weight": "500", "cursor": "pointer", "min-height": "44px", "padding": "0 24px", "border": "1px solid var(--color-static-black)", "background": "var(--color-common-100)", "color": "var(--color-static-black)", "font-size": "var(--font-size-16)"}}},
    {"id": "tab_outline_full_rounded_icon_large", "size": "Large", "state": "Default", "structure": "s1", "icons": ["icon_16"], "rules": {"&": {"font-weight": "500", "cursor": "pointer", "min-height": "52px", "padding": "0 28px", "border": "1px solid var(--color-static-black)", "background": "var(--color-common-100)", "color": "var(--color-static-black)", "font-size": "var(--font-size-16)"}}},
    {"id": "tab_outline_full_rounded_icon_xlarge", "size": "XLarge", "state": "Default", "structure": "s1", "icons": ["icon_16"], "rules": {"&": {"font-weight": "600", "cursor": "pointer", "min-height": "60px", "padding": "0 32px", "border": "1px solid var(--color-static-black)", "background": "var(--color-common-100)", "color": "var(--color-static-black)", "font-size": "var(--font-size-18)"}}},
    {"id": "tab_outline_full_rounded_icon_disabled_small", "size": "Small", "state": "Disabled", "structure": "s2", "icons": ["icon_16"], "rules": {"&": {"font-weight": "500", "min-height": "36px", "padding": "0 16px", "border": "1px solid transparent", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "box-shadow": "none", "font-size": "var(--font-size-14)", "cursor": "default"}, "& > img": {"filter": "brightness(0) invert(22%)", "opacity": "0.16"}}},
    {"id": "tab_outline_full_rounded_icon_disabled_medium", "size": "Medium (Default)", "state": "Disabled", "structure": "s2", "icons": ["icon_16"], "rules": {"&": {"font-weight": "500", "min-height": "44px", "padding": "0 24px", "border": "1px solid transparent", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "box-shadow": "none", "font-size": "var(--font-size-16)", "cursor": "default"}, "& > img": {"filter": "brightness(0) invert(22%)", "opacity": "0.16"}}},
    {"id": "tab_outline_full_rounded_icon_disabled_large", "size": "Large", "state": "Disabled", "structure": "s2", "icons": ["icon_16"], "rules": {"&": {"font-weight": "500", "min-height": "52px", "padding": "0 28px", "border": "1px solid transparent", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "box-shadow": "none", "font-size": "var(--font-size-16)", "cursor": "default"}, "& > img": {"filter": "brightness(0) invert(22%)", "opacity": "0.16"}}},
    {"id": "tab_outline_full_rounded_icon_disabled_xlarge", "size": "XLarge", "state": "Disabled", "structure": "s2", "icons": ["icon_16"], "rules": {"&": {"font-weight": "600", "min-height": "60px", "padding": "0 32px", "border": "1px solid transparent", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "box-shadow": "none", "font-size": "var(--font-size-18)", "cursor": "default"}, "& > img": {"filter": "brightness(0) invert(22%)", "opacity": "0.16"}}}
  ]
}
```

### C31 Tab / Gray Line Outline

열: Small / Medium (Default) / Large / XLarge.

```json
{
  "shared": {
    "&": {"display": "inline-flex", "align-items": "center", "justify-content": "center", "white-space": "nowrap", "appearance": "none", "border-radius": "0", "line-height": "1.5", "box-sizing": "border-box", "font-family": "inherit", "text-decoration": "none"}
  },
  "structures": {
    "s1": "<button class=\"{{component}}\" type=\"button\">Tab</button>",
    "s2": "<button class=\"{{component}}\" type=\"button\" disabled>Tab</button>"
  },
  "variants": [
    {"id": "tab_gray_line_outline_small", "size": "Small", "state": "Default", "structure": "s1", "rules": {"&": {"font-weight": "500", "cursor": "pointer", "min-height": "36px", "padding": "0 16px", "border": "1px solid var(--color-static-black)", "background": "var(--color-common-100)", "color": "var(--color-static-black)", "font-size": "var(--font-size-14)"}}},
    {"id": "tab_gray_line_outline_medium", "size": "Medium (Default)", "state": "Default", "structure": "s1", "rules": {"&": {"font-weight": "500", "cursor": "pointer", "min-height": "44px", "padding": "0 24px", "border": "1px solid var(--color-static-black)", "background": "var(--color-common-100)", "color": "var(--color-static-black)", "font-size": "var(--font-size-16)"}}},
    {"id": "tab_gray_line_outline_large", "size": "Large", "state": "Default", "structure": "s1", "rules": {"&": {"font-weight": "500", "cursor": "pointer", "min-height": "52px", "padding": "0 28px", "border": "1px solid var(--color-static-black)", "background": "var(--color-common-100)", "color": "var(--color-static-black)", "font-size": "var(--font-size-16)"}}},
    {"id": "tab_gray_line_outline_xlarge", "size": "XLarge", "state": "Default", "structure": "s1", "rules": {"&": {"font-weight": "600", "cursor": "pointer", "min-height": "60px", "padding": "0 32px", "border": "1px solid var(--color-static-black)", "background": "var(--color-common-100)", "color": "var(--color-static-black)", "font-size": "var(--font-size-18)"}}},
    {"id": "tab_gray_line_outline_disabled_small", "size": "Small", "state": "Disabled", "structure": "s2", "rules": {"&": {"font-weight": "500", "min-height": "36px", "padding": "0 16px", "border": "1px solid transparent", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "font-size": "var(--font-size-14)", "box-shadow": "none", "cursor": "default"}}},
    {"id": "tab_gray_line_outline_disabled_medium", "size": "Medium (Default)", "state": "Disabled", "structure": "s2", "rules": {"&": {"font-weight": "500", "min-height": "44px", "padding": "0 24px", "border": "1px solid transparent", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "font-size": "var(--font-size-16)", "box-shadow": "none", "cursor": "default"}}},
    {"id": "tab_gray_line_outline_disabled_large", "size": "Large", "state": "Disabled", "structure": "s2", "rules": {"&": {"font-weight": "500", "min-height": "52px", "padding": "0 28px", "border": "1px solid transparent", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "font-size": "var(--font-size-16)", "box-shadow": "none", "cursor": "default"}}},
    {"id": "tab_gray_line_outline_disabled_xlarge", "size": "XLarge", "state": "Disabled", "structure": "s2", "rules": {"&": {"font-weight": "600", "min-height": "60px", "padding": "0 32px", "border": "1px solid transparent", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "font-size": "var(--font-size-18)", "box-shadow": "none", "cursor": "default"}}}
  ]
}
```

### C32 Tab / Gray Line Outline+icon

열: Small / Medium (Default) / Large / XLarge.

```json
{
  "shared": {
    "&": {"display": "inline-flex", "align-items": "center", "justify-content": "center", "white-space": "nowrap", "appearance": "none", "gap": "12px", "border-radius": "0", "line-height": "1.5", "box-sizing": "border-box", "font-family": "inherit", "text-decoration": "none"},
    "& > img": {"flex-shrink": "0", "display": "block", "height": "auto"}
  },
  "structures": {
    "s1": "<button class=\"{{component}}\" type=\"button\"><img class=\"{{icon_1_class}}\" src=\"{{icon_1_src}}\" alt=\"\" aria-hidden=\"true\">Tab</button>",
    "s2": "<button class=\"{{component}}\" type=\"button\" disabled><img class=\"{{icon_1_class}}\" src=\"{{icon_1_src}}\" alt=\"\" aria-hidden=\"true\">Tab</button>"
  },
  "variants": [
    {"id": "tab_gray_line_outline_icon_small", "size": "Small", "state": "Default", "structure": "s1", "icons": ["icon_16"], "rules": {"&": {"font-weight": "500", "cursor": "pointer", "min-height": "36px", "padding": "0 16px", "border": "1px solid var(--color-static-black)", "background": "var(--color-common-100)", "color": "var(--color-static-black)", "font-size": "var(--font-size-14)"}}},
    {"id": "tab_gray_line_outline_icon_medium", "size": "Medium (Default)", "state": "Default", "structure": "s1", "icons": ["icon_16"], "rules": {"&": {"font-weight": "500", "cursor": "pointer", "min-height": "44px", "padding": "0 24px", "border": "1px solid var(--color-static-black)", "background": "var(--color-common-100)", "color": "var(--color-static-black)", "font-size": "var(--font-size-16)"}}},
    {"id": "tab_gray_line_outline_icon_large", "size": "Large", "state": "Default", "structure": "s1", "icons": ["icon_16"], "rules": {"&": {"font-weight": "500", "cursor": "pointer", "min-height": "52px", "padding": "0 28px", "border": "1px solid var(--color-static-black)", "background": "var(--color-common-100)", "color": "var(--color-static-black)", "font-size": "var(--font-size-16)"}}},
    {"id": "tab_gray_line_outline_icon_xlarge", "size": "XLarge", "state": "Default", "structure": "s1", "icons": ["icon_16"], "rules": {"&": {"font-weight": "600", "cursor": "pointer", "min-height": "60px", "padding": "0 32px", "border": "1px solid var(--color-static-black)", "background": "var(--color-common-100)", "color": "var(--color-static-black)", "font-size": "var(--font-size-18)"}}},
    {"id": "tab_gray_line_outline_icon_disabled_small", "size": "Small", "state": "Disabled", "structure": "s2", "icons": ["icon_16"], "rules": {"&": {"font-weight": "500", "min-height": "36px", "padding": "0 16px", "border": "1px solid transparent", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "font-size": "var(--font-size-14)", "box-shadow": "none", "cursor": "default"}, "& > img": {"filter": "brightness(0) invert(22%)", "opacity": "0.16"}}},
    {"id": "tab_gray_line_outline_icon_disabled_medium", "size": "Medium (Default)", "state": "Disabled", "structure": "s2", "icons": ["icon_16"], "rules": {"&": {"font-weight": "500", "min-height": "44px", "padding": "0 24px", "border": "1px solid transparent", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "font-size": "var(--font-size-16)", "box-shadow": "none", "cursor": "default"}, "& > img": {"filter": "brightness(0) invert(22%)", "opacity": "0.16"}}},
    {"id": "tab_gray_line_outline_icon_disabled_large", "size": "Large", "state": "Disabled", "structure": "s2", "icons": ["icon_16"], "rules": {"&": {"font-weight": "500", "min-height": "52px", "padding": "0 28px", "border": "1px solid transparent", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "font-size": "var(--font-size-16)", "box-shadow": "none", "cursor": "default"}, "& > img": {"filter": "brightness(0) invert(22%)", "opacity": "0.16"}}},
    {"id": "tab_gray_line_outline_icon_disabled_xlarge", "size": "XLarge", "state": "Disabled", "structure": "s2", "icons": ["icon_16"], "rules": {"&": {"font-weight": "600", "min-height": "60px", "padding": "0 32px", "border": "1px solid transparent", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "font-size": "var(--font-size-18)", "box-shadow": "none", "cursor": "default"}, "& > img": {"filter": "brightness(0) invert(22%)", "opacity": "0.16"}}}
  ]
}
```

### C33 Tab / Gray Line Outline Rounded

열: Small / Medium (Default) / Large / XLarge.

```json
{
  "shared": {
    "&": {"display": "inline-flex", "align-items": "center", "justify-content": "center", "white-space": "nowrap", "appearance": "none", "border-radius": "8px", "line-height": "1.5", "box-sizing": "border-box", "font-family": "inherit", "text-decoration": "none"}
  },
  "structures": {
    "s1": "<button class=\"{{component}}\" type=\"button\">Tab</button>",
    "s2": "<button class=\"{{component}}\" type=\"button\" disabled>Tab</button>"
  },
  "variants": [
    {"id": "tab_gray_line_outline_rounded_small", "size": "Small", "state": "Default", "structure": "s1", "rules": {"&": {"font-weight": "500", "cursor": "pointer", "min-height": "36px", "padding": "0 16px", "border": "1px solid var(--color-static-black)", "background": "var(--color-common-100)", "color": "var(--color-static-black)", "font-size": "var(--font-size-14)"}}},
    {"id": "tab_gray_line_outline_rounded_medium", "size": "Medium (Default)", "state": "Default", "structure": "s1", "rules": {"&": {"font-weight": "500", "cursor": "pointer", "min-height": "44px", "padding": "0 24px", "border": "1px solid var(--color-static-black)", "background": "var(--color-common-100)", "color": "var(--color-static-black)", "font-size": "var(--font-size-16)"}}},
    {"id": "tab_gray_line_outline_rounded_large", "size": "Large", "state": "Default", "structure": "s1", "rules": {"&": {"font-weight": "500", "cursor": "pointer", "min-height": "52px", "padding": "0 28px", "border": "1px solid var(--color-static-black)", "background": "var(--color-common-100)", "color": "var(--color-static-black)", "font-size": "var(--font-size-16)"}}},
    {"id": "tab_gray_line_outline_rounded_xlarge", "size": "XLarge", "state": "Default", "structure": "s1", "rules": {"&": {"font-weight": "600", "cursor": "pointer", "min-height": "60px", "padding": "0 32px", "border": "1px solid var(--color-static-black)", "background": "var(--color-common-100)", "color": "var(--color-static-black)", "font-size": "var(--font-size-18)"}}},
    {"id": "tab_gray_line_outline_rounded_disabled_small", "size": "Small", "state": "Disabled", "structure": "s2", "rules": {"&": {"font-weight": "500", "min-height": "36px", "padding": "0 16px", "border": "1px solid transparent", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "font-size": "var(--font-size-14)", "box-shadow": "none", "cursor": "default"}}},
    {"id": "tab_gray_line_outline_rounded_disabled_medium", "size": "Medium (Default)", "state": "Disabled", "structure": "s2", "rules": {"&": {"font-weight": "500", "min-height": "44px", "padding": "0 24px", "border": "1px solid transparent", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "font-size": "var(--font-size-16)", "box-shadow": "none", "cursor": "default"}}},
    {"id": "tab_gray_line_outline_rounded_disabled_large", "size": "Large", "state": "Disabled", "structure": "s2", "rules": {"&": {"font-weight": "500", "min-height": "52px", "padding": "0 28px", "border": "1px solid transparent", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "font-size": "var(--font-size-16)", "box-shadow": "none", "cursor": "default"}}},
    {"id": "tab_gray_line_outline_rounded_disabled_xlarge", "size": "XLarge", "state": "Disabled", "structure": "s2", "rules": {"&": {"font-weight": "600", "min-height": "60px", "padding": "0 32px", "border": "1px solid transparent", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "font-size": "var(--font-size-18)", "box-shadow": "none", "cursor": "default"}}}
  ]
}
```

### C34 Tab / Gray Line Outline Rounded+icon

열: Small / Medium (Default) / Large / XLarge.

```json
{
  "shared": {
    "&": {"display": "inline-flex", "align-items": "center", "justify-content": "center", "white-space": "nowrap", "appearance": "none", "gap": "12px", "border-radius": "8px", "line-height": "1.5", "box-sizing": "border-box", "font-family": "inherit", "text-decoration": "none"},
    "& > img": {"flex-shrink": "0", "display": "block", "height": "auto"}
  },
  "structures": {
    "s1": "<button class=\"{{component}}\" type=\"button\"><img class=\"{{icon_1_class}}\" src=\"{{icon_1_src}}\" alt=\"\" aria-hidden=\"true\">Tab</button>",
    "s2": "<button class=\"{{component}}\" type=\"button\" disabled><img class=\"{{icon_1_class}}\" src=\"{{icon_1_src}}\" alt=\"\" aria-hidden=\"true\">Tab</button>"
  },
  "variants": [
    {"id": "tab_gray_line_outline_rounded_icon_small", "size": "Small", "state": "Default", "structure": "s1", "icons": ["icon_16"], "rules": {"&": {"font-weight": "500", "cursor": "pointer", "min-height": "36px", "padding": "0 16px", "border": "1px solid var(--color-static-black)", "background": "var(--color-common-100)", "color": "var(--color-static-black)", "font-size": "var(--font-size-14)"}}},
    {"id": "tab_gray_line_outline_rounded_icon_medium", "size": "Medium (Default)", "state": "Default", "structure": "s1", "icons": ["icon_16"], "rules": {"&": {"font-weight": "500", "cursor": "pointer", "min-height": "44px", "padding": "0 24px", "border": "1px solid var(--color-static-black)", "background": "var(--color-common-100)", "color": "var(--color-static-black)", "font-size": "var(--font-size-16)"}}},
    {"id": "tab_gray_line_outline_rounded_icon_large", "size": "Large", "state": "Default", "structure": "s1", "icons": ["icon_16"], "rules": {"&": {"font-weight": "500", "cursor": "pointer", "min-height": "52px", "padding": "0 28px", "border": "1px solid var(--color-static-black)", "background": "var(--color-common-100)", "color": "var(--color-static-black)", "font-size": "var(--font-size-16)"}}},
    {"id": "tab_gray_line_outline_rounded_icon_xlarge", "size": "XLarge", "state": "Default", "structure": "s1", "icons": ["icon_16"], "rules": {"&": {"font-weight": "600", "cursor": "pointer", "min-height": "60px", "padding": "0 32px", "border": "1px solid var(--color-static-black)", "background": "var(--color-common-100)", "color": "var(--color-static-black)", "font-size": "var(--font-size-18)"}}},
    {"id": "tab_gray_line_outline_rounded_icon_disabled_small", "size": "Small", "state": "Disabled", "structure": "s2", "icons": ["icon_16"], "rules": {"&": {"font-weight": "500", "min-height": "36px", "padding": "0 16px", "border": "1px solid transparent", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "font-size": "var(--font-size-14)", "box-shadow": "none", "cursor": "default"}, "& > img": {"filter": "brightness(0) invert(22%)", "opacity": "0.16"}}},
    {"id": "tab_gray_line_outline_rounded_icon_disabled_medium", "size": "Medium (Default)", "state": "Disabled", "structure": "s2", "icons": ["icon_16"], "rules": {"&": {"font-weight": "500", "min-height": "44px", "padding": "0 24px", "border": "1px solid transparent", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "font-size": "var(--font-size-16)", "box-shadow": "none", "cursor": "default"}, "& > img": {"filter": "brightness(0) invert(22%)", "opacity": "0.16"}}},
    {"id": "tab_gray_line_outline_rounded_icon_disabled_large", "size": "Large", "state": "Disabled", "structure": "s2", "icons": ["icon_16"], "rules": {"&": {"font-weight": "500", "min-height": "52px", "padding": "0 28px", "border": "1px solid transparent", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "font-size": "var(--font-size-16)", "box-shadow": "none", "cursor": "default"}, "& > img": {"filter": "brightness(0) invert(22%)", "opacity": "0.16"}}},
    {"id": "tab_gray_line_outline_rounded_icon_disabled_xlarge", "size": "XLarge", "state": "Disabled", "structure": "s2", "icons": ["icon_16"], "rules": {"&": {"font-weight": "600", "min-height": "60px", "padding": "0 32px", "border": "1px solid transparent", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "font-size": "var(--font-size-18)", "box-shadow": "none", "cursor": "default"}, "& > img": {"filter": "brightness(0) invert(22%)", "opacity": "0.16"}}}
  ]
}
```

### C35 Tab / Gray Line Outline Full Rounded

열: Small / Medium (Default) / Large / XLarge.

```json
{
  "shared": {
    "&": {"display": "inline-flex", "align-items": "center", "justify-content": "center", "white-space": "nowrap", "appearance": "none", "border-radius": "9999px", "line-height": "1.5", "box-sizing": "border-box", "font-family": "inherit", "text-decoration": "none"}
  },
  "structures": {
    "s1": "<button class=\"{{component}}\" type=\"button\">Tab</button>",
    "s2": "<button class=\"{{component}}\" type=\"button\" disabled>Tab</button>"
  },
  "variants": [
    {"id": "tab_gray_line_outline_full_rounded_small", "size": "Small", "state": "Default", "structure": "s1", "rules": {"&": {"font-weight": "500", "cursor": "pointer", "min-height": "36px", "padding": "0 16px", "border": "1px solid var(--color-static-black)", "background": "var(--color-common-100)", "color": "var(--color-static-black)", "font-size": "var(--font-size-14)"}}},
    {"id": "tab_gray_line_outline_full_rounded_medium", "size": "Medium (Default)", "state": "Default", "structure": "s1", "rules": {"&": {"font-weight": "500", "cursor": "pointer", "min-height": "44px", "padding": "0 24px", "border": "1px solid var(--color-static-black)", "background": "var(--color-common-100)", "color": "var(--color-static-black)", "font-size": "var(--font-size-16)"}}},
    {"id": "tab_gray_line_outline_full_rounded_large", "size": "Large", "state": "Default", "structure": "s1", "rules": {"&": {"font-weight": "500", "cursor": "pointer", "min-height": "52px", "padding": "0 28px", "border": "1px solid var(--color-static-black)", "background": "var(--color-common-100)", "color": "var(--color-static-black)", "font-size": "var(--font-size-16)"}}},
    {"id": "tab_gray_line_outline_full_rounded_xlarge", "size": "XLarge", "state": "Default", "structure": "s1", "rules": {"&": {"font-weight": "600", "cursor": "pointer", "min-height": "60px", "padding": "0 32px", "border": "1px solid var(--color-static-black)", "background": "var(--color-common-100)", "color": "var(--color-static-black)", "font-size": "var(--font-size-18)"}}},
    {"id": "tab_gray_line_outline_full_rounded_disabled_small", "size": "Small", "state": "Disabled", "structure": "s2", "rules": {"&": {"font-weight": "500", "min-height": "36px", "padding": "0 16px", "border": "1px solid transparent", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "font-size": "var(--font-size-14)", "box-shadow": "none", "cursor": "default"}}},
    {"id": "tab_gray_line_outline_full_rounded_disabled_medium", "size": "Medium (Default)", "state": "Disabled", "structure": "s2", "rules": {"&": {"font-weight": "500", "min-height": "44px", "padding": "0 24px", "border": "1px solid transparent", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "font-size": "var(--font-size-16)", "box-shadow": "none", "cursor": "default"}}},
    {"id": "tab_gray_line_outline_full_rounded_disabled_large", "size": "Large", "state": "Disabled", "structure": "s2", "rules": {"&": {"font-weight": "500", "min-height": "52px", "padding": "0 28px", "border": "1px solid transparent", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "font-size": "var(--font-size-16)", "box-shadow": "none", "cursor": "default"}}},
    {"id": "tab_gray_line_outline_full_rounded_disabled_xlarge", "size": "XLarge", "state": "Disabled", "structure": "s2", "rules": {"&": {"font-weight": "600", "min-height": "60px", "padding": "0 32px", "border": "1px solid transparent", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "font-size": "var(--font-size-18)", "box-shadow": "none", "cursor": "default"}}}
  ]
}
```

### C36 Tab / Gray Line Outline Full Rounded+icon

열: Small / Medium (Default) / Large / XLarge.

```json
{
  "shared": {
    "&": {"display": "inline-flex", "align-items": "center", "justify-content": "center", "white-space": "nowrap", "appearance": "none", "gap": "12px", "border-radius": "9999px", "line-height": "1.5", "box-sizing": "border-box", "font-family": "inherit", "text-decoration": "none"},
    "& > img": {"flex-shrink": "0", "display": "block", "height": "auto"}
  },
  "structures": {
    "s1": "<button class=\"{{component}}\" type=\"button\"><img class=\"{{icon_1_class}}\" src=\"{{icon_1_src}}\" alt=\"\" aria-hidden=\"true\">Tab</button>",
    "s2": "<button class=\"{{component}}\" type=\"button\" disabled><img class=\"{{icon_1_class}}\" src=\"{{icon_1_src}}\" alt=\"\" aria-hidden=\"true\">Tab</button>"
  },
  "variants": [
    {"id": "tab_gray_line_outline_full_rounded_icon_small", "size": "Small", "state": "Default", "structure": "s1", "icons": ["icon_16"], "rules": {"&": {"font-weight": "500", "cursor": "pointer", "min-height": "36px", "padding": "0 16px", "border": "1px solid var(--color-static-black)", "background": "var(--color-common-100)", "color": "var(--color-static-black)", "font-size": "var(--font-size-14)"}}},
    {"id": "tab_gray_line_outline_full_rounded_icon_medium", "size": "Medium (Default)", "state": "Default", "structure": "s1", "icons": ["icon_16"], "rules": {"&": {"font-weight": "500", "cursor": "pointer", "min-height": "44px", "padding": "0 24px", "border": "1px solid var(--color-static-black)", "background": "var(--color-common-100)", "color": "var(--color-static-black)", "font-size": "var(--font-size-16)"}}},
    {"id": "tab_gray_line_outline_full_rounded_icon_large", "size": "Large", "state": "Default", "structure": "s1", "icons": ["icon_16"], "rules": {"&": {"font-weight": "500", "cursor": "pointer", "min-height": "52px", "padding": "0 28px", "border": "1px solid var(--color-static-black)", "background": "var(--color-common-100)", "color": "var(--color-static-black)", "font-size": "var(--font-size-16)"}}},
    {"id": "tab_gray_line_outline_full_rounded_icon_xlarge", "size": "XLarge", "state": "Default", "structure": "s1", "icons": ["icon_16"], "rules": {"&": {"font-weight": "600", "cursor": "pointer", "min-height": "60px", "padding": "0 32px", "border": "1px solid var(--color-static-black)", "background": "var(--color-common-100)", "color": "var(--color-static-black)", "font-size": "var(--font-size-18)"}}},
    {"id": "tab_gray_line_outline_full_rounded_icon_disabled_small", "size": "Small", "state": "Disabled", "structure": "s2", "icons": ["icon_16"], "rules": {"&": {"font-weight": "500", "min-height": "36px", "padding": "0 16px", "border": "1px solid transparent", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "font-size": "var(--font-size-14)", "box-shadow": "none", "cursor": "default"}, "& > img": {"filter": "brightness(0) invert(22%)", "opacity": "0.16"}}},
    {"id": "tab_gray_line_outline_full_rounded_icon_disabled_medium", "size": "Medium (Default)", "state": "Disabled", "structure": "s2", "icons": ["icon_16"], "rules": {"&": {"font-weight": "500", "min-height": "44px", "padding": "0 24px", "border": "1px solid transparent", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "font-size": "var(--font-size-16)", "box-shadow": "none", "cursor": "default"}, "& > img": {"filter": "brightness(0) invert(22%)", "opacity": "0.16"}}},
    {"id": "tab_gray_line_outline_full_rounded_icon_disabled_large", "size": "Large", "state": "Disabled", "structure": "s2", "icons": ["icon_16"], "rules": {"&": {"font-weight": "500", "min-height": "52px", "padding": "0 28px", "border": "1px solid transparent", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "font-size": "var(--font-size-16)", "box-shadow": "none", "cursor": "default"}, "& > img": {"filter": "brightness(0) invert(22%)", "opacity": "0.16"}}},
    {"id": "tab_gray_line_outline_full_rounded_icon_disabled_xlarge", "size": "XLarge", "state": "Disabled", "structure": "s2", "icons": ["icon_16"], "rules": {"&": {"font-weight": "600", "min-height": "60px", "padding": "0 32px", "border": "1px solid transparent", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "font-size": "var(--font-size-18)", "box-shadow": "none", "cursor": "default"}, "& > img": {"filter": "brightness(0) invert(22%)", "opacity": "0.16"}}}
  ]
}
```

### C37 Text Input / Filled

열: Small / Medium (Default) / Large / XLarge.

```json
{
  "shared": {
    "&": {"display": "inline-flex", "align-items": "center", "width": "100%", "min-width": "0", "border-radius": "0", "line-height": "1.5", "font-weight": "400", "box-sizing": "border-box", "font-family": "inherit"},
    "& input": {"width": "100%", "min-width": "0", "border": "0", "outline": "0", "background": "transparent", "font-family": "inherit", "font-size": "inherit", "font-weight": "inherit", "line-height": "inherit", "color": "inherit", "padding": "0", "box-sizing": "border-box"},
    "& input::placeholder": {"color": "var(--color-label-assistive)"}
  },
  "structures": {
    "s1": "<label class=\"{{component}}\"><input type=\"text\" aria-label=\"예시\" placeholder=\"예시\"></label>",
    "s2": "<label class=\"{{component}}\"><input type=\"text\" aria-label=\"예시\" value=\"Focused\"></label>",
    "s3": "<label class=\"{{component}}\"><input type=\"text\" aria-label=\"예시\" value=\"Completed\"><img class=\"{{icon_1_class}}\" src=\"{{icon_1_src}}\" alt=\"\" aria-hidden=\"true\"></label>",
    "s4": "<label class=\"{{component}}\"><input type=\"text\" aria-label=\"예시\" value=\"Error\"></label>",
    "s5": "<label class=\"{{component}}\"><input type=\"text\" aria-label=\"예시\" value=\"Disabled\" disabled></label>",
    "s6": "<label class=\"{{component}}\"><input type=\"text\" aria-label=\"예시\" value=\"Read only\" readonly></label>",
    "s7": "<label class=\"{{component}}\"><input type=\"password\" aria-label=\"예시\" value=\"password\"><img class=\"{{icon_1_class}}\" src=\"{{icon_1_src}}\" alt=\"\" aria-hidden=\"true\"></label>"
  },
  "variants": [
    {"id": "text_input_filled_small", "size": "Small", "state": "Default", "structure": "s1", "rules": {"&": {"cursor": "text", "min-height": "40px", "padding": "0 12px", "border": "0", "background": "var(--color-fill-normal)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-14)"}}},
    {"id": "text_input_filled_medium", "size": "Medium (Default)", "state": "Default", "structure": "s1", "rules": {"&": {"cursor": "text", "min-height": "52px", "padding": "0 12px", "border": "0", "background": "var(--color-fill-normal)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-16)"}}},
    {"id": "text_input_filled_large", "size": "Large", "state": "Default", "structure": "s1", "rules": {"&": {"cursor": "text", "min-height": "56px", "padding": "0 16px", "border": "0", "background": "var(--color-fill-normal)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-16)"}}},
    {"id": "text_input_filled_xlarge", "size": "XLarge", "state": "Default", "structure": "s1", "rules": {"&": {"cursor": "text", "min-height": "64px", "padding": "0 20px", "border": "0", "background": "var(--color-fill-normal)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-18)"}}},
    {"id": "text_input_filled_focus_small", "size": "Small", "state": "Focus", "structure": "s2", "rules": {"&": {"cursor": "text", "min-height": "40px", "padding": "0 12px", "border": "2px solid var(--color-blue-50)", "background": "var(--color-fill-normal)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-14)"}}},
    {"id": "text_input_filled_focus_medium", "size": "Medium (Default)", "state": "Focus", "structure": "s2", "rules": {"&": {"cursor": "text", "min-height": "52px", "padding": "0 12px", "border": "2px solid var(--color-blue-50)", "background": "var(--color-fill-normal)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-16)"}}},
    {"id": "text_input_filled_focus_large", "size": "Large", "state": "Focus", "structure": "s2", "rules": {"&": {"cursor": "text", "min-height": "56px", "padding": "0 16px", "border": "2px solid var(--color-blue-50)", "background": "var(--color-fill-normal)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-16)"}}},
    {"id": "text_input_filled_focus_xlarge", "size": "XLarge", "state": "Focus", "structure": "s2", "rules": {"&": {"cursor": "text", "min-height": "64px", "padding": "0 20px", "border": "2px solid var(--color-blue-50)", "background": "var(--color-fill-normal)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-18)"}}},
    {"id": "text_input_filled_complete_small", "size": "Small", "state": "Complete", "structure": "s3", "icons": ["icon_16"], "rules": {"&": {"cursor": "text", "min-height": "40px", "padding": "0 12px", "border": "0", "background": "var(--color-fill-normal)", "color": "var(--color-label-normal)", "column-gap": "8px", "font-size": "var(--font-size-14)"}, "& > img": {"display": "block", "height": "auto", "flex-shrink": "0"}}},
    {"id": "text_input_filled_complete_medium", "size": "Medium (Default)", "state": "Complete", "structure": "s3", "icons": ["icon_18"], "rules": {"&": {"cursor": "text", "min-height": "52px", "padding": "0 12px", "border": "0", "background": "var(--color-fill-normal)", "color": "var(--color-label-normal)", "column-gap": "8px", "font-size": "var(--font-size-16)"}, "& > img": {"display": "block", "height": "auto", "flex-shrink": "0"}}},
    {"id": "text_input_filled_complete_large", "size": "Large", "state": "Complete", "structure": "s3", "icons": ["icon_20"], "rules": {"&": {"cursor": "text", "min-height": "56px", "padding": "0 16px", "border": "0", "background": "var(--color-fill-normal)", "color": "var(--color-label-normal)", "column-gap": "8px", "font-size": "var(--font-size-16)"}, "& > img": {"display": "block", "height": "auto", "flex-shrink": "0"}}},
    {"id": "text_input_filled_complete_xlarge", "size": "XLarge", "state": "Complete", "structure": "s3", "icons": ["icon_20"], "rules": {"&": {"cursor": "text", "min-height": "64px", "padding": "0 20px", "border": "0", "background": "var(--color-fill-normal)", "color": "var(--color-label-normal)", "column-gap": "8px", "font-size": "var(--font-size-18)"}, "& > img": {"display": "block", "height": "auto", "flex-shrink": "0"}}},
    {"id": "text_input_filled_error_small", "size": "Small", "state": "Error", "structure": "s4", "rules": {"&": {"cursor": "text", "min-height": "40px", "padding": "0 12px", "border": "0", "background": "var(--color-red-95)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-14)"}}},
    {"id": "text_input_filled_error_medium", "size": "Medium (Default)", "state": "Error", "structure": "s4", "rules": {"&": {"cursor": "text", "min-height": "52px", "padding": "0 12px", "border": "0", "background": "var(--color-red-95)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-16)"}}},
    {"id": "text_input_filled_error_large", "size": "Large", "state": "Error", "structure": "s4", "rules": {"&": {"cursor": "text", "min-height": "56px", "padding": "0 16px", "border": "0", "background": "var(--color-red-95)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-16)"}}},
    {"id": "text_input_filled_error_xlarge", "size": "XLarge", "state": "Error", "structure": "s4", "rules": {"&": {"cursor": "text", "min-height": "64px", "padding": "0 20px", "border": "0", "background": "var(--color-red-95)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-18)"}}},
    {"id": "text_input_filled_disabled_small", "size": "Small", "state": "Disabled", "structure": "s5", "rules": {"&": {"cursor": "default", "min-height": "40px", "padding": "0 12px", "border": "0", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "font-size": "var(--font-size-14)"}, "& input": {"cursor": "default"}}},
    {"id": "text_input_filled_disabled_medium", "size": "Medium (Default)", "state": "Disabled", "structure": "s5", "rules": {"&": {"cursor": "default", "min-height": "52px", "padding": "0 12px", "border": "0", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "font-size": "var(--font-size-16)"}, "& input": {"cursor": "default"}}},
    {"id": "text_input_filled_disabled_large", "size": "Large", "state": "Disabled", "structure": "s5", "rules": {"&": {"cursor": "default", "min-height": "56px", "padding": "0 16px", "border": "0", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "font-size": "var(--font-size-16)"}, "& input": {"cursor": "default"}}},
    {"id": "text_input_filled_disabled_xlarge", "size": "XLarge", "state": "Disabled", "structure": "s5", "rules": {"&": {"cursor": "default", "min-height": "64px", "padding": "0 20px", "border": "0", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "font-size": "var(--font-size-18)"}, "& input": {"cursor": "default"}}},
    {"id": "text_input_filled_view_small", "size": "Small", "state": "View", "structure": "s6", "rules": {"&": {"cursor": "text", "min-height": "40px", "padding": "0 12px", "border": "0", "background": "var(--color-background-normal-alternative)", "color": "var(--color-label-neutral)", "font-size": "var(--font-size-14)"}}},
    {"id": "text_input_filled_view_medium", "size": "Medium (Default)", "state": "View", "structure": "s6", "rules": {"&": {"cursor": "text", "min-height": "52px", "padding": "0 12px", "border": "0", "background": "var(--color-background-normal-alternative)", "color": "var(--color-label-neutral)", "font-size": "var(--font-size-16)"}}},
    {"id": "text_input_filled_view_large", "size": "Large", "state": "View", "structure": "s6", "rules": {"&": {"cursor": "text", "min-height": "56px", "padding": "0 16px", "border": "0", "background": "var(--color-background-normal-alternative)", "color": "var(--color-label-neutral)", "font-size": "var(--font-size-16)"}}},
    {"id": "text_input_filled_view_xlarge", "size": "XLarge", "state": "View", "structure": "s6", "rules": {"&": {"cursor": "text", "min-height": "64px", "padding": "0 20px", "border": "0", "background": "var(--color-background-normal-alternative)", "color": "var(--color-label-neutral)", "font-size": "var(--font-size-18)"}}},
    {"id": "text_input_filled_password_small", "size": "Small", "state": "Password", "structure": "s7", "icons": ["icon_16"], "rules": {"&": {"cursor": "text", "min-height": "40px", "padding": "0 12px", "border": "0", "background": "var(--color-fill-normal)", "color": "var(--color-label-normal)", "column-gap": "8px", "font-size": "var(--font-size-14)"}, "& > img": {"display": "block", "height": "auto", "flex-shrink": "0"}}},
    {"id": "text_input_filled_password_medium", "size": "Medium (Default)", "state": "Password", "structure": "s7", "icons": ["icon_18"], "rules": {"&": {"cursor": "text", "min-height": "52px", "padding": "0 12px", "border": "0", "background": "var(--color-fill-normal)", "color": "var(--color-label-normal)", "column-gap": "8px", "font-size": "var(--font-size-16)"}, "& > img": {"display": "block", "height": "auto", "flex-shrink": "0"}}},
    {"id": "text_input_filled_password_large", "size": "Large", "state": "Password", "structure": "s7", "icons": ["icon_20"], "rules": {"&": {"cursor": "text", "min-height": "56px", "padding": "0 16px", "border": "0", "background": "var(--color-fill-normal)", "color": "var(--color-label-normal)", "column-gap": "8px", "font-size": "var(--font-size-16)"}, "& > img": {"display": "block", "height": "auto", "flex-shrink": "0"}}},
    {"id": "text_input_filled_password_xlarge", "size": "XLarge", "state": "Password", "structure": "s7", "icons": ["icon_20"], "rules": {"&": {"cursor": "text", "min-height": "64px", "padding": "0 20px", "border": "0", "background": "var(--color-fill-normal)", "color": "var(--color-label-normal)", "column-gap": "8px", "font-size": "var(--font-size-18)"}, "& > img": {"display": "block", "height": "auto", "flex-shrink": "0"}}}
  ]
}
```

### C38 Text Input / Filled Rounded

열: Small / Medium (Default) / Large / XLarge.

```json
{
  "shared": {
    "&": {"display": "inline-flex", "align-items": "center", "width": "100%", "min-width": "0", "border-radius": "8px", "line-height": "1.5", "font-weight": "400", "box-sizing": "border-box", "font-family": "inherit"},
    "& input": {"width": "100%", "min-width": "0", "border": "0", "outline": "0", "background": "transparent", "font-family": "inherit", "font-size": "inherit", "font-weight": "inherit", "line-height": "inherit", "color": "inherit", "padding": "0", "box-sizing": "border-box"},
    "& input::placeholder": {"color": "var(--color-label-assistive)"}
  },
  "structures": {
    "s1": "<label class=\"{{component}}\"><input type=\"text\" aria-label=\"예시\" placeholder=\"예시\"></label>",
    "s2": "<label class=\"{{component}}\"><input type=\"text\" aria-label=\"예시\" value=\"Focused\"></label>",
    "s3": "<label class=\"{{component}}\"><input type=\"text\" aria-label=\"예시\" value=\"Completed\"><img class=\"{{icon_1_class}}\" src=\"{{icon_1_src}}\" alt=\"\" aria-hidden=\"true\"></label>",
    "s4": "<label class=\"{{component}}\"><input type=\"text\" aria-label=\"예시\" value=\"Error\"></label>",
    "s5": "<label class=\"{{component}}\"><input type=\"text\" aria-label=\"예시\" value=\"Disabled\" disabled></label>",
    "s6": "<label class=\"{{component}}\"><input type=\"text\" aria-label=\"예시\" value=\"Read only\" readonly></label>",
    "s7": "<label class=\"{{component}}\"><input type=\"password\" aria-label=\"예시\" value=\"password\"><img class=\"{{icon_1_class}}\" src=\"{{icon_1_src}}\" alt=\"\" aria-hidden=\"true\"></label>"
  },
  "variants": [
    {"id": "text_input_filled_rounded_small", "size": "Small", "state": "Default", "structure": "s1", "rules": {"&": {"cursor": "text", "min-height": "40px", "padding": "0 12px", "border": "0", "background": "var(--color-fill-normal)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-14)"}}},
    {"id": "text_input_filled_rounded_medium", "size": "Medium (Default)", "state": "Default", "structure": "s1", "rules": {"&": {"cursor": "text", "min-height": "52px", "padding": "0 12px", "border": "0", "background": "var(--color-fill-normal)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-16)"}}},
    {"id": "text_input_filled_rounded_large", "size": "Large", "state": "Default", "structure": "s1", "rules": {"&": {"cursor": "text", "min-height": "56px", "padding": "0 16px", "border": "0", "background": "var(--color-fill-normal)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-16)"}}},
    {"id": "text_input_filled_rounded_xlarge", "size": "XLarge", "state": "Default", "structure": "s1", "rules": {"&": {"cursor": "text", "min-height": "64px", "padding": "0 20px", "border": "0", "background": "var(--color-fill-normal)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-18)"}}},
    {"id": "text_input_filled_rounded_focus_small", "size": "Small", "state": "Focus", "structure": "s2", "rules": {"&": {"cursor": "text", "min-height": "40px", "padding": "0 12px", "border": "2px solid var(--color-blue-50)", "background": "var(--color-fill-normal)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-14)"}}},
    {"id": "text_input_filled_rounded_focus_medium", "size": "Medium (Default)", "state": "Focus", "structure": "s2", "rules": {"&": {"cursor": "text", "min-height": "52px", "padding": "0 12px", "border": "2px solid var(--color-blue-50)", "background": "var(--color-fill-normal)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-16)"}}},
    {"id": "text_input_filled_rounded_focus_large", "size": "Large", "state": "Focus", "structure": "s2", "rules": {"&": {"cursor": "text", "min-height": "56px", "padding": "0 16px", "border": "2px solid var(--color-blue-50)", "background": "var(--color-fill-normal)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-16)"}}},
    {"id": "text_input_filled_rounded_focus_xlarge", "size": "XLarge", "state": "Focus", "structure": "s2", "rules": {"&": {"cursor": "text", "min-height": "64px", "padding": "0 20px", "border": "2px solid var(--color-blue-50)", "background": "var(--color-fill-normal)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-18)"}}},
    {"id": "text_input_filled_rounded_complete_small", "size": "Small", "state": "Complete", "structure": "s3", "icons": ["icon_16"], "rules": {"&": {"cursor": "text", "min-height": "40px", "padding": "0 12px", "border": "0", "background": "var(--color-fill-normal)", "color": "var(--color-label-normal)", "column-gap": "8px", "font-size": "var(--font-size-14)"}, "& > img": {"display": "block", "height": "auto", "flex-shrink": "0"}}},
    {"id": "text_input_filled_rounded_complete_medium", "size": "Medium (Default)", "state": "Complete", "structure": "s3", "icons": ["icon_18"], "rules": {"&": {"cursor": "text", "min-height": "52px", "padding": "0 12px", "border": "0", "background": "var(--color-fill-normal)", "color": "var(--color-label-normal)", "column-gap": "8px", "font-size": "var(--font-size-16)"}, "& > img": {"display": "block", "height": "auto", "flex-shrink": "0"}}},
    {"id": "text_input_filled_rounded_complete_large", "size": "Large", "state": "Complete", "structure": "s3", "icons": ["icon_20"], "rules": {"&": {"cursor": "text", "min-height": "56px", "padding": "0 16px", "border": "0", "background": "var(--color-fill-normal)", "color": "var(--color-label-normal)", "column-gap": "8px", "font-size": "var(--font-size-16)"}, "& > img": {"display": "block", "height": "auto", "flex-shrink": "0"}}},
    {"id": "text_input_filled_rounded_complete_xlarge", "size": "XLarge", "state": "Complete", "structure": "s3", "icons": ["icon_20"], "rules": {"&": {"cursor": "text", "min-height": "64px", "padding": "0 20px", "border": "0", "background": "var(--color-fill-normal)", "color": "var(--color-label-normal)", "column-gap": "8px", "font-size": "var(--font-size-18)"}, "& > img": {"display": "block", "height": "auto", "flex-shrink": "0"}}},
    {"id": "text_input_filled_rounded_error_small", "size": "Small", "state": "Error", "structure": "s4", "rules": {"&": {"cursor": "text", "min-height": "40px", "padding": "0 12px", "border": "0", "background": "var(--color-red-95)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-14)"}}},
    {"id": "text_input_filled_rounded_error_medium", "size": "Medium (Default)", "state": "Error", "structure": "s4", "rules": {"&": {"cursor": "text", "min-height": "52px", "padding": "0 12px", "border": "0", "background": "var(--color-red-95)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-16)"}}},
    {"id": "text_input_filled_rounded_error_large", "size": "Large", "state": "Error", "structure": "s4", "rules": {"&": {"cursor": "text", "min-height": "56px", "padding": "0 16px", "border": "0", "background": "var(--color-red-95)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-16)"}}},
    {"id": "text_input_filled_rounded_error_xlarge", "size": "XLarge", "state": "Error", "structure": "s4", "rules": {"&": {"cursor": "text", "min-height": "64px", "padding": "0 20px", "border": "0", "background": "var(--color-red-95)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-18)"}}},
    {"id": "text_input_filled_rounded_disabled_small", "size": "Small", "state": "Disabled", "structure": "s5", "rules": {"&": {"cursor": "default", "min-height": "40px", "padding": "0 12px", "border": "0", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "font-size": "var(--font-size-14)"}, "& input": {"cursor": "default"}}},
    {"id": "text_input_filled_rounded_disabled_medium", "size": "Medium (Default)", "state": "Disabled", "structure": "s5", "rules": {"&": {"cursor": "default", "min-height": "52px", "padding": "0 12px", "border": "0", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "font-size": "var(--font-size-16)"}, "& input": {"cursor": "default"}}},
    {"id": "text_input_filled_rounded_disabled_large", "size": "Large", "state": "Disabled", "structure": "s5", "rules": {"&": {"cursor": "default", "min-height": "56px", "padding": "0 16px", "border": "0", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "font-size": "var(--font-size-16)"}, "& input": {"cursor": "default"}}},
    {"id": "text_input_filled_rounded_disabled_xlarge", "size": "XLarge", "state": "Disabled", "structure": "s5", "rules": {"&": {"cursor": "default", "min-height": "64px", "padding": "0 20px", "border": "0", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "font-size": "var(--font-size-18)"}, "& input": {"cursor": "default"}}},
    {"id": "text_input_filled_rounded_view_small", "size": "Small", "state": "View", "structure": "s6", "rules": {"&": {"cursor": "text", "min-height": "40px", "padding": "0 12px", "border": "0", "background": "var(--color-background-normal-alternative)", "color": "var(--color-label-neutral)", "font-size": "var(--font-size-14)"}}},
    {"id": "text_input_filled_rounded_view_medium", "size": "Medium (Default)", "state": "View", "structure": "s6", "rules": {"&": {"cursor": "text", "min-height": "52px", "padding": "0 12px", "border": "0", "background": "var(--color-background-normal-alternative)", "color": "var(--color-label-neutral)", "font-size": "var(--font-size-16)"}}},
    {"id": "text_input_filled_rounded_view_large", "size": "Large", "state": "View", "structure": "s6", "rules": {"&": {"cursor": "text", "min-height": "56px", "padding": "0 16px", "border": "0", "background": "var(--color-background-normal-alternative)", "color": "var(--color-label-neutral)", "font-size": "var(--font-size-16)"}}},
    {"id": "text_input_filled_rounded_view_xlarge", "size": "XLarge", "state": "View", "structure": "s6", "rules": {"&": {"cursor": "text", "min-height": "64px", "padding": "0 20px", "border": "0", "background": "var(--color-background-normal-alternative)", "color": "var(--color-label-neutral)", "font-size": "var(--font-size-18)"}}},
    {"id": "text_input_filled_rounded_password_small", "size": "Small", "state": "Password", "structure": "s7", "icons": ["icon_16"], "rules": {"&": {"cursor": "text", "min-height": "40px", "padding": "0 12px", "border": "0", "background": "var(--color-fill-normal)", "color": "var(--color-label-normal)", "column-gap": "8px", "font-size": "var(--font-size-14)"}, "& > img": {"display": "block", "height": "auto", "flex-shrink": "0"}}},
    {"id": "text_input_filled_rounded_password_medium", "size": "Medium (Default)", "state": "Password", "structure": "s7", "icons": ["icon_18"], "rules": {"&": {"cursor": "text", "min-height": "52px", "padding": "0 12px", "border": "0", "background": "var(--color-fill-normal)", "color": "var(--color-label-normal)", "column-gap": "8px", "font-size": "var(--font-size-16)"}, "& > img": {"display": "block", "height": "auto", "flex-shrink": "0"}}},
    {"id": "text_input_filled_rounded_password_large", "size": "Large", "state": "Password", "structure": "s7", "icons": ["icon_20"], "rules": {"&": {"cursor": "text", "min-height": "56px", "padding": "0 16px", "border": "0", "background": "var(--color-fill-normal)", "color": "var(--color-label-normal)", "column-gap": "8px", "font-size": "var(--font-size-16)"}, "& > img": {"display": "block", "height": "auto", "flex-shrink": "0"}}},
    {"id": "text_input_filled_rounded_password_xlarge", "size": "XLarge", "state": "Password", "structure": "s7", "icons": ["icon_20"], "rules": {"&": {"cursor": "text", "min-height": "64px", "padding": "0 20px", "border": "0", "background": "var(--color-fill-normal)", "color": "var(--color-label-normal)", "column-gap": "8px", "font-size": "var(--font-size-18)"}, "& > img": {"display": "block", "height": "auto", "flex-shrink": "0"}}}
  ]
}
```

### C39 Text Input / Filled Full Rounded

열: Small / Medium (Default) / Large / XLarge.

```json
{
  "shared": {
    "&": {"display": "inline-flex", "align-items": "center", "width": "100%", "min-width": "0", "border-radius": "9999px", "line-height": "1.5", "font-weight": "400", "box-sizing": "border-box", "font-family": "inherit"},
    "& input": {"width": "100%", "min-width": "0", "border": "0", "outline": "0", "background": "transparent", "font-family": "inherit", "font-size": "inherit", "font-weight": "inherit", "line-height": "inherit", "color": "inherit", "padding": "0", "box-sizing": "border-box"},
    "& input::placeholder": {"color": "var(--color-label-assistive)"}
  },
  "structures": {
    "s1": "<label class=\"{{component}}\"><input type=\"text\" aria-label=\"예시\" placeholder=\"예시\"></label>",
    "s2": "<label class=\"{{component}}\"><input type=\"text\" aria-label=\"예시\" value=\"Focused\"></label>",
    "s3": "<label class=\"{{component}}\"><input type=\"text\" aria-label=\"예시\" value=\"Completed\"><img class=\"{{icon_1_class}}\" src=\"{{icon_1_src}}\" alt=\"\" aria-hidden=\"true\"></label>",
    "s4": "<label class=\"{{component}}\"><input type=\"text\" aria-label=\"예시\" value=\"Error\"></label>",
    "s5": "<label class=\"{{component}}\"><input type=\"text\" aria-label=\"예시\" value=\"Disabled\" disabled></label>",
    "s6": "<label class=\"{{component}}\"><input type=\"text\" aria-label=\"예시\" value=\"Read only\" readonly></label>",
    "s7": "<label class=\"{{component}}\"><input type=\"password\" aria-label=\"예시\" value=\"password\"><img class=\"{{icon_1_class}}\" src=\"{{icon_1_src}}\" alt=\"\" aria-hidden=\"true\"></label>"
  },
  "variants": [
    {"id": "text_input_filled_full_rounded_small", "size": "Small", "state": "Default", "structure": "s1", "rules": {"&": {"cursor": "text", "min-height": "40px", "padding": "0 12px", "border": "0", "background": "var(--color-fill-normal)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-14)"}}},
    {"id": "text_input_filled_full_rounded_medium", "size": "Medium (Default)", "state": "Default", "structure": "s1", "rules": {"&": {"cursor": "text", "min-height": "52px", "padding": "0 12px", "border": "0", "background": "var(--color-fill-normal)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-16)"}}},
    {"id": "text_input_filled_full_rounded_large", "size": "Large", "state": "Default", "structure": "s1", "rules": {"&": {"cursor": "text", "min-height": "56px", "padding": "0 16px", "border": "0", "background": "var(--color-fill-normal)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-16)"}}},
    {"id": "text_input_filled_full_rounded_xlarge", "size": "XLarge", "state": "Default", "structure": "s1", "rules": {"&": {"cursor": "text", "min-height": "64px", "padding": "0 20px", "border": "0", "background": "var(--color-fill-normal)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-18)"}}},
    {"id": "text_input_filled_full_rounded_focus_small", "size": "Small", "state": "Focus", "structure": "s2", "rules": {"&": {"cursor": "text", "min-height": "40px", "padding": "0 12px", "border": "2px solid var(--color-blue-50)", "background": "var(--color-fill-normal)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-14)"}}},
    {"id": "text_input_filled_full_rounded_focus_medium", "size": "Medium (Default)", "state": "Focus", "structure": "s2", "rules": {"&": {"cursor": "text", "min-height": "52px", "padding": "0 12px", "border": "2px solid var(--color-blue-50)", "background": "var(--color-fill-normal)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-16)"}}},
    {"id": "text_input_filled_full_rounded_focus_large", "size": "Large", "state": "Focus", "structure": "s2", "rules": {"&": {"cursor": "text", "min-height": "56px", "padding": "0 16px", "border": "2px solid var(--color-blue-50)", "background": "var(--color-fill-normal)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-16)"}}},
    {"id": "text_input_filled_full_rounded_focus_xlarge", "size": "XLarge", "state": "Focus", "structure": "s2", "rules": {"&": {"cursor": "text", "min-height": "64px", "padding": "0 20px", "border": "2px solid var(--color-blue-50)", "background": "var(--color-fill-normal)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-18)"}}},
    {"id": "text_input_filled_full_rounded_complete_small", "size": "Small", "state": "Complete", "structure": "s3", "icons": ["icon_16"], "rules": {"&": {"cursor": "text", "min-height": "40px", "padding": "0 12px", "border": "0", "background": "var(--color-fill-normal)", "color": "var(--color-label-normal)", "column-gap": "8px", "font-size": "var(--font-size-14)"}, "& > img": {"display": "block", "height": "auto", "flex-shrink": "0"}}},
    {"id": "text_input_filled_full_rounded_complete_medium", "size": "Medium (Default)", "state": "Complete", "structure": "s3", "icons": ["icon_18"], "rules": {"&": {"cursor": "text", "min-height": "52px", "padding": "0 12px", "border": "0", "background": "var(--color-fill-normal)", "color": "var(--color-label-normal)", "column-gap": "8px", "font-size": "var(--font-size-16)"}, "& > img": {"display": "block", "height": "auto", "flex-shrink": "0"}}},
    {"id": "text_input_filled_full_rounded_complete_large", "size": "Large", "state": "Complete", "structure": "s3", "icons": ["icon_20"], "rules": {"&": {"cursor": "text", "min-height": "56px", "padding": "0 16px", "border": "0", "background": "var(--color-fill-normal)", "color": "var(--color-label-normal)", "column-gap": "8px", "font-size": "var(--font-size-16)"}, "& > img": {"display": "block", "height": "auto", "flex-shrink": "0"}}},
    {"id": "text_input_filled_full_rounded_complete_xlarge", "size": "XLarge", "state": "Complete", "structure": "s3", "icons": ["icon_20"], "rules": {"&": {"cursor": "text", "min-height": "64px", "padding": "0 20px", "border": "0", "background": "var(--color-fill-normal)", "color": "var(--color-label-normal)", "column-gap": "8px", "font-size": "var(--font-size-18)"}, "& > img": {"display": "block", "height": "auto", "flex-shrink": "0"}}},
    {"id": "text_input_filled_full_rounded_error_small", "size": "Small", "state": "Error", "structure": "s4", "rules": {"&": {"cursor": "text", "min-height": "40px", "padding": "0 12px", "border": "0", "background": "var(--color-red-95)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-14)"}}},
    {"id": "text_input_filled_full_rounded_error_medium", "size": "Medium (Default)", "state": "Error", "structure": "s4", "rules": {"&": {"cursor": "text", "min-height": "52px", "padding": "0 12px", "border": "0", "background": "var(--color-red-95)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-16)"}}},
    {"id": "text_input_filled_full_rounded_error_large", "size": "Large", "state": "Error", "structure": "s4", "rules": {"&": {"cursor": "text", "min-height": "56px", "padding": "0 16px", "border": "0", "background": "var(--color-red-95)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-16)"}}},
    {"id": "text_input_filled_full_rounded_error_xlarge", "size": "XLarge", "state": "Error", "structure": "s4", "rules": {"&": {"cursor": "text", "min-height": "64px", "padding": "0 20px", "border": "0", "background": "var(--color-red-95)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-18)"}}},
    {"id": "text_input_filled_full_rounded_disabled_small", "size": "Small", "state": "Disabled", "structure": "s5", "rules": {"&": {"cursor": "default", "min-height": "40px", "padding": "0 12px", "border": "0", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "font-size": "var(--font-size-14)"}, "& input": {"cursor": "default"}}},
    {"id": "text_input_filled_full_rounded_disabled_medium", "size": "Medium (Default)", "state": "Disabled", "structure": "s5", "rules": {"&": {"cursor": "default", "min-height": "52px", "padding": "0 12px", "border": "0", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "font-size": "var(--font-size-16)"}, "& input": {"cursor": "default"}}},
    {"id": "text_input_filled_full_rounded_disabled_large", "size": "Large", "state": "Disabled", "structure": "s5", "rules": {"&": {"cursor": "default", "min-height": "56px", "padding": "0 16px", "border": "0", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "font-size": "var(--font-size-16)"}, "& input": {"cursor": "default"}}},
    {"id": "text_input_filled_full_rounded_disabled_xlarge", "size": "XLarge", "state": "Disabled", "structure": "s5", "rules": {"&": {"cursor": "default", "min-height": "64px", "padding": "0 20px", "border": "0", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "font-size": "var(--font-size-18)"}, "& input": {"cursor": "default"}}},
    {"id": "text_input_filled_full_rounded_view_small", "size": "Small", "state": "View", "structure": "s6", "rules": {"&": {"cursor": "text", "min-height": "40px", "padding": "0 12px", "border": "0", "background": "var(--color-background-normal-alternative)", "color": "var(--color-label-neutral)", "font-size": "var(--font-size-14)"}}},
    {"id": "text_input_filled_full_rounded_view_medium", "size": "Medium (Default)", "state": "View", "structure": "s6", "rules": {"&": {"cursor": "text", "min-height": "52px", "padding": "0 12px", "border": "0", "background": "var(--color-background-normal-alternative)", "color": "var(--color-label-neutral)", "font-size": "var(--font-size-16)"}}},
    {"id": "text_input_filled_full_rounded_view_large", "size": "Large", "state": "View", "structure": "s6", "rules": {"&": {"cursor": "text", "min-height": "56px", "padding": "0 16px", "border": "0", "background": "var(--color-background-normal-alternative)", "color": "var(--color-label-neutral)", "font-size": "var(--font-size-16)"}}},
    {"id": "text_input_filled_full_rounded_view_xlarge", "size": "XLarge", "state": "View", "structure": "s6", "rules": {"&": {"cursor": "text", "min-height": "64px", "padding": "0 20px", "border": "0", "background": "var(--color-background-normal-alternative)", "color": "var(--color-label-neutral)", "font-size": "var(--font-size-18)"}}},
    {"id": "text_input_filled_full_rounded_password_small", "size": "Small", "state": "Password", "structure": "s7", "icons": ["icon_16"], "rules": {"&": {"cursor": "text", "min-height": "40px", "padding": "0 12px", "border": "0", "background": "var(--color-fill-normal)", "color": "var(--color-label-normal)", "column-gap": "8px", "font-size": "var(--font-size-14)"}, "& > img": {"display": "block", "height": "auto", "flex-shrink": "0"}}},
    {"id": "text_input_filled_full_rounded_password_medium", "size": "Medium (Default)", "state": "Password", "structure": "s7", "icons": ["icon_18"], "rules": {"&": {"cursor": "text", "min-height": "52px", "padding": "0 12px", "border": "0", "background": "var(--color-fill-normal)", "color": "var(--color-label-normal)", "column-gap": "8px", "font-size": "var(--font-size-16)"}, "& > img": {"display": "block", "height": "auto", "flex-shrink": "0"}}},
    {"id": "text_input_filled_full_rounded_password_large", "size": "Large", "state": "Password", "structure": "s7", "icons": ["icon_20"], "rules": {"&": {"cursor": "text", "min-height": "56px", "padding": "0 16px", "border": "0", "background": "var(--color-fill-normal)", "color": "var(--color-label-normal)", "column-gap": "8px", "font-size": "var(--font-size-16)"}, "& > img": {"display": "block", "height": "auto", "flex-shrink": "0"}}},
    {"id": "text_input_filled_full_rounded_password_xlarge", "size": "XLarge", "state": "Password", "structure": "s7", "icons": ["icon_20"], "rules": {"&": {"cursor": "text", "min-height": "64px", "padding": "0 20px", "border": "0", "background": "var(--color-fill-normal)", "color": "var(--color-label-normal)", "column-gap": "8px", "font-size": "var(--font-size-18)"}, "& > img": {"display": "block", "height": "auto", "flex-shrink": "0"}}}
  ]
}
```

### C40 Text Input / Outline

열: Small / Medium (Default) / Large / XLarge.

```json
{
  "shared": {
    "&": {"display": "inline-flex", "align-items": "center", "width": "100%", "min-width": "0", "border-radius": "0", "line-height": "1.5", "font-weight": "400", "box-sizing": "border-box", "font-family": "inherit"},
    "& input": {"width": "100%", "min-width": "0", "border": "0", "outline": "0", "background": "transparent", "font-family": "inherit", "font-size": "inherit", "font-weight": "inherit", "line-height": "inherit", "color": "inherit", "padding": "0", "box-sizing": "border-box"},
    "& input::placeholder": {"color": "var(--color-label-assistive)"}
  },
  "structures": {
    "s1": "<label class=\"{{component}}\"><input type=\"text\" aria-label=\"예시\" placeholder=\"예시\"></label>",
    "s2": "<label class=\"{{component}}\"><input type=\"text\" aria-label=\"예시\" value=\"Focused\"></label>",
    "s3": "<label class=\"{{component}}\"><input type=\"text\" aria-label=\"예시\" value=\"Completed\"><img class=\"{{icon_1_class}}\" src=\"{{icon_1_src}}\" alt=\"\" aria-hidden=\"true\"></label>",
    "s4": "<label class=\"{{component}}\"><input type=\"text\" aria-label=\"예시\" value=\"Error\"></label>",
    "s5": "<label class=\"{{component}}\"><input type=\"text\" aria-label=\"예시\" value=\"Disabled\" disabled></label>",
    "s6": "<label class=\"{{component}}\"><input type=\"text\" aria-label=\"예시\" value=\"Read only\" readonly></label>",
    "s7": "<label class=\"{{component}}\"><input type=\"password\" aria-label=\"예시\" value=\"password\"><img class=\"{{icon_1_class}}\" src=\"{{icon_1_src}}\" alt=\"\" aria-hidden=\"true\"></label>"
  },
  "variants": [
    {"id": "text_input_outline_small", "size": "Small", "state": "Default", "structure": "s1", "rules": {"&": {"cursor": "text", "min-height": "40px", "padding": "0 12px", "border": "1px solid var(--color-line-solid-0)", "background": "var(--color-common-100)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-14)"}}},
    {"id": "text_input_outline_medium", "size": "Medium (Default)", "state": "Default", "structure": "s1", "rules": {"&": {"cursor": "text", "min-height": "52px", "padding": "0 12px", "border": "1px solid var(--color-line-solid-0)", "background": "var(--color-common-100)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-16)"}}},
    {"id": "text_input_outline_large", "size": "Large", "state": "Default", "structure": "s1", "rules": {"&": {"cursor": "text", "min-height": "56px", "padding": "0 16px", "border": "1px solid var(--color-line-solid-0)", "background": "var(--color-common-100)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-16)"}}},
    {"id": "text_input_outline_xlarge", "size": "XLarge", "state": "Default", "structure": "s1", "rules": {"&": {"cursor": "text", "min-height": "64px", "padding": "0 20px", "border": "1px solid var(--color-line-solid-0)", "background": "var(--color-common-100)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-18)"}}},
    {"id": "text_input_outline_focus_small", "size": "Small", "state": "Focus", "structure": "s2", "rules": {"&": {"cursor": "text", "min-height": "40px", "padding": "0 12px", "border": "2px solid var(--color-blue-50)", "background": "var(--color-common-100)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-14)"}}},
    {"id": "text_input_outline_focus_medium", "size": "Medium (Default)", "state": "Focus", "structure": "s2", "rules": {"&": {"cursor": "text", "min-height": "52px", "padding": "0 12px", "border": "2px solid var(--color-blue-50)", "background": "var(--color-common-100)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-16)"}}},
    {"id": "text_input_outline_focus_large", "size": "Large", "state": "Focus", "structure": "s2", "rules": {"&": {"cursor": "text", "min-height": "56px", "padding": "0 16px", "border": "2px solid var(--color-blue-50)", "background": "var(--color-common-100)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-16)"}}},
    {"id": "text_input_outline_focus_xlarge", "size": "XLarge", "state": "Focus", "structure": "s2", "rules": {"&": {"cursor": "text", "min-height": "64px", "padding": "0 20px", "border": "2px solid var(--color-blue-50)", "background": "var(--color-common-100)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-18)"}}},
    {"id": "text_input_outline_complete_small", "size": "Small", "state": "Complete", "structure": "s3", "icons": ["icon_16"], "rules": {"&": {"cursor": "text", "min-height": "40px", "padding": "0 12px", "border": "1px solid var(--color-status-positive)", "background": "var(--color-common-100)", "color": "var(--color-label-normal)", "column-gap": "8px", "font-size": "var(--font-size-14)"}, "& > img": {"display": "block", "height": "auto", "flex-shrink": "0"}}},
    {"id": "text_input_outline_complete_medium", "size": "Medium (Default)", "state": "Complete", "structure": "s3", "icons": ["icon_18"], "rules": {"&": {"cursor": "text", "min-height": "52px", "padding": "0 12px", "border": "1px solid var(--color-status-positive)", "background": "var(--color-common-100)", "color": "var(--color-label-normal)", "column-gap": "8px", "font-size": "var(--font-size-16)"}, "& > img": {"display": "block", "height": "auto", "flex-shrink": "0"}}},
    {"id": "text_input_outline_complete_large", "size": "Large", "state": "Complete", "structure": "s3", "icons": ["icon_20"], "rules": {"&": {"cursor": "text", "min-height": "56px", "padding": "0 16px", "border": "1px solid var(--color-status-positive)", "background": "var(--color-common-100)", "color": "var(--color-label-normal)", "column-gap": "8px", "font-size": "var(--font-size-16)"}, "& > img": {"display": "block", "height": "auto", "flex-shrink": "0"}}},
    {"id": "text_input_outline_complete_xlarge", "size": "XLarge", "state": "Complete", "structure": "s3", "icons": ["icon_20"], "rules": {"&": {"cursor": "text", "min-height": "64px", "padding": "0 20px", "border": "1px solid var(--color-status-positive)", "background": "var(--color-common-100)", "color": "var(--color-label-normal)", "column-gap": "8px", "font-size": "var(--font-size-18)"}, "& > img": {"display": "block", "height": "auto", "flex-shrink": "0"}}},
    {"id": "text_input_outline_error_small", "size": "Small", "state": "Error", "structure": "s4", "rules": {"&": {"cursor": "text", "min-height": "40px", "padding": "0 12px", "border": "2px solid var(--color-status-negative)", "background": "var(--color-common-100)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-14)"}}},
    {"id": "text_input_outline_error_medium", "size": "Medium (Default)", "state": "Error", "structure": "s4", "rules": {"&": {"cursor": "text", "min-height": "52px", "padding": "0 12px", "border": "2px solid var(--color-status-negative)", "background": "var(--color-common-100)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-16)"}}},
    {"id": "text_input_outline_error_large", "size": "Large", "state": "Error", "structure": "s4", "rules": {"&": {"cursor": "text", "min-height": "56px", "padding": "0 16px", "border": "2px solid var(--color-status-negative)", "background": "var(--color-common-100)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-16)"}}},
    {"id": "text_input_outline_error_xlarge", "size": "XLarge", "state": "Error", "structure": "s4", "rules": {"&": {"cursor": "text", "min-height": "64px", "padding": "0 20px", "border": "2px solid var(--color-status-negative)", "background": "var(--color-common-100)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-18)"}}},
    {"id": "text_input_outline_disabled_small", "size": "Small", "state": "Disabled", "structure": "s5", "rules": {"&": {"cursor": "default", "min-height": "40px", "padding": "0 12px", "border": "0", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "font-size": "var(--font-size-14)"}, "& input": {"cursor": "default"}}},
    {"id": "text_input_outline_disabled_medium", "size": "Medium (Default)", "state": "Disabled", "structure": "s5", "rules": {"&": {"cursor": "default", "min-height": "52px", "padding": "0 12px", "border": "0", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "font-size": "var(--font-size-16)"}, "& input": {"cursor": "default"}}},
    {"id": "text_input_outline_disabled_large", "size": "Large", "state": "Disabled", "structure": "s5", "rules": {"&": {"cursor": "default", "min-height": "56px", "padding": "0 16px", "border": "0", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "font-size": "var(--font-size-16)"}, "& input": {"cursor": "default"}}},
    {"id": "text_input_outline_disabled_xlarge", "size": "XLarge", "state": "Disabled", "structure": "s5", "rules": {"&": {"cursor": "default", "min-height": "64px", "padding": "0 20px", "border": "0", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "font-size": "var(--font-size-18)"}, "& input": {"cursor": "default"}}},
    {"id": "text_input_outline_view_small", "size": "Small", "state": "View", "structure": "s6", "rules": {"&": {"cursor": "text", "min-height": "40px", "padding": "0 12px", "border": "1px solid var(--color-line-solid-normal)", "background": "var(--color-background-normal-alternative)", "color": "var(--color-label-neutral)", "font-size": "var(--font-size-14)"}}},
    {"id": "text_input_outline_view_medium", "size": "Medium (Default)", "state": "View", "structure": "s6", "rules": {"&": {"cursor": "text", "min-height": "52px", "padding": "0 12px", "border": "1px solid var(--color-line-solid-normal)", "background": "var(--color-background-normal-alternative)", "color": "var(--color-label-neutral)", "font-size": "var(--font-size-16)"}}},
    {"id": "text_input_outline_view_large", "size": "Large", "state": "View", "structure": "s6", "rules": {"&": {"cursor": "text", "min-height": "56px", "padding": "0 16px", "border": "1px solid var(--color-line-solid-normal)", "background": "var(--color-background-normal-alternative)", "color": "var(--color-label-neutral)", "font-size": "var(--font-size-16)"}}},
    {"id": "text_input_outline_view_xlarge", "size": "XLarge", "state": "View", "structure": "s6", "rules": {"&": {"cursor": "text", "min-height": "64px", "padding": "0 20px", "border": "1px solid var(--color-line-solid-normal)", "background": "var(--color-background-normal-alternative)", "color": "var(--color-label-neutral)", "font-size": "var(--font-size-18)"}}},
    {"id": "text_input_outline_password_small", "size": "Small", "state": "Password", "structure": "s7", "icons": ["icon_16"], "rules": {"&": {"cursor": "text", "min-height": "40px", "padding": "0 12px", "border": "1px solid var(--color-line-solid-0)", "background": "var(--color-common-100)", "color": "var(--color-label-normal)", "column-gap": "8px", "font-size": "var(--font-size-14)"}, "& > img": {"display": "block", "height": "auto", "flex-shrink": "0"}}},
    {"id": "text_input_outline_password_medium", "size": "Medium (Default)", "state": "Password", "structure": "s7", "icons": ["icon_18"], "rules": {"&": {"cursor": "text", "min-height": "52px", "padding": "0 12px", "border": "1px solid var(--color-line-solid-0)", "background": "var(--color-common-100)", "color": "var(--color-label-normal)", "column-gap": "8px", "font-size": "var(--font-size-16)"}, "& > img": {"display": "block", "height": "auto", "flex-shrink": "0"}}},
    {"id": "text_input_outline_password_large", "size": "Large", "state": "Password", "structure": "s7", "icons": ["icon_20"], "rules": {"&": {"cursor": "text", "min-height": "56px", "padding": "0 16px", "border": "1px solid var(--color-line-solid-0)", "background": "var(--color-common-100)", "color": "var(--color-label-normal)", "column-gap": "8px", "font-size": "var(--font-size-16)"}, "& > img": {"display": "block", "height": "auto", "flex-shrink": "0"}}},
    {"id": "text_input_outline_password_xlarge", "size": "XLarge", "state": "Password", "structure": "s7", "icons": ["icon_20"], "rules": {"&": {"cursor": "text", "min-height": "64px", "padding": "0 20px", "border": "1px solid var(--color-line-solid-0)", "background": "var(--color-common-100)", "color": "var(--color-label-normal)", "column-gap": "8px", "font-size": "var(--font-size-18)"}, "& > img": {"display": "block", "height": "auto", "flex-shrink": "0"}}}
  ]
}
```

### C41 Text Input / Outline Rounded

열: Small / Medium (Default) / Large / XLarge.

```json
{
  "shared": {
    "&": {"display": "inline-flex", "align-items": "center", "width": "100%", "min-width": "0", "border-radius": "8px", "line-height": "1.5", "font-weight": "400", "box-sizing": "border-box", "font-family": "inherit"},
    "& input": {"width": "100%", "min-width": "0", "border": "0", "outline": "0", "background": "transparent", "font-family": "inherit", "font-size": "inherit", "font-weight": "inherit", "line-height": "inherit", "color": "inherit", "padding": "0", "box-sizing": "border-box"},
    "& input::placeholder": {"color": "var(--color-label-assistive)"}
  },
  "structures": {
    "s1": "<label class=\"{{component}}\"><input type=\"text\" aria-label=\"예시\" placeholder=\"예시\"></label>",
    "s2": "<label class=\"{{component}}\"><input type=\"text\" aria-label=\"예시\" value=\"Focused\"></label>",
    "s3": "<label class=\"{{component}}\"><input type=\"text\" aria-label=\"예시\" value=\"Completed\"><img class=\"{{icon_1_class}}\" src=\"{{icon_1_src}}\" alt=\"\" aria-hidden=\"true\"></label>",
    "s4": "<label class=\"{{component}}\"><input type=\"text\" aria-label=\"예시\" value=\"Error\"></label>",
    "s5": "<label class=\"{{component}}\"><input type=\"text\" aria-label=\"예시\" value=\"Disabled\" disabled></label>",
    "s6": "<label class=\"{{component}}\"><input type=\"text\" aria-label=\"예시\" value=\"Read only\" readonly></label>",
    "s7": "<label class=\"{{component}}\"><input type=\"password\" aria-label=\"예시\" value=\"password\"><img class=\"{{icon_1_class}}\" src=\"{{icon_1_src}}\" alt=\"\" aria-hidden=\"true\"></label>"
  },
  "variants": [
    {"id": "text_input_outline_rounded_small", "size": "Small", "state": "Default", "structure": "s1", "rules": {"&": {"cursor": "text", "min-height": "40px", "padding": "0 12px", "border": "1px solid var(--color-line-solid-0)", "background": "var(--color-common-100)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-14)"}}},
    {"id": "text_input_outline_rounded_medium", "size": "Medium (Default)", "state": "Default", "structure": "s1", "rules": {"&": {"cursor": "text", "min-height": "52px", "padding": "0 12px", "border": "1px solid var(--color-line-solid-0)", "background": "var(--color-common-100)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-16)"}}},
    {"id": "text_input_outline_rounded_large", "size": "Large", "state": "Default", "structure": "s1", "rules": {"&": {"cursor": "text", "min-height": "56px", "padding": "0 16px", "border": "1px solid var(--color-line-solid-0)", "background": "var(--color-common-100)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-16)"}}},
    {"id": "text_input_outline_rounded_xlarge", "size": "XLarge", "state": "Default", "structure": "s1", "rules": {"&": {"cursor": "text", "min-height": "64px", "padding": "0 20px", "border": "1px solid var(--color-line-solid-0)", "background": "var(--color-common-100)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-18)"}}},
    {"id": "text_input_outline_rounded_focus_small", "size": "Small", "state": "Focus", "structure": "s2", "rules": {"&": {"cursor": "text", "min-height": "40px", "padding": "0 12px", "border": "2px solid var(--color-blue-50)", "background": "var(--color-common-100)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-14)"}}},
    {"id": "text_input_outline_rounded_focus_medium", "size": "Medium (Default)", "state": "Focus", "structure": "s2", "rules": {"&": {"cursor": "text", "min-height": "52px", "padding": "0 12px", "border": "2px solid var(--color-blue-50)", "background": "var(--color-common-100)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-16)"}}},
    {"id": "text_input_outline_rounded_focus_large", "size": "Large", "state": "Focus", "structure": "s2", "rules": {"&": {"cursor": "text", "min-height": "56px", "padding": "0 16px", "border": "2px solid var(--color-blue-50)", "background": "var(--color-common-100)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-16)"}}},
    {"id": "text_input_outline_rounded_focus_xlarge", "size": "XLarge", "state": "Focus", "structure": "s2", "rules": {"&": {"cursor": "text", "min-height": "64px", "padding": "0 20px", "border": "2px solid var(--color-blue-50)", "background": "var(--color-common-100)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-18)"}}},
    {"id": "text_input_outline_rounded_complete_small", "size": "Small", "state": "Complete", "structure": "s3", "icons": ["icon_16"], "rules": {"&": {"cursor": "text", "min-height": "40px", "padding": "0 12px", "border": "1px solid var(--color-status-positive)", "background": "var(--color-common-100)", "color": "var(--color-label-normal)", "column-gap": "8px", "font-size": "var(--font-size-14)"}, "& > img": {"display": "block", "height": "auto", "flex-shrink": "0"}}},
    {"id": "text_input_outline_rounded_complete_medium", "size": "Medium (Default)", "state": "Complete", "structure": "s3", "icons": ["icon_18"], "rules": {"&": {"cursor": "text", "min-height": "52px", "padding": "0 12px", "border": "1px solid var(--color-status-positive)", "background": "var(--color-common-100)", "color": "var(--color-label-normal)", "column-gap": "8px", "font-size": "var(--font-size-16)"}, "& > img": {"display": "block", "height": "auto", "flex-shrink": "0"}}},
    {"id": "text_input_outline_rounded_complete_large", "size": "Large", "state": "Complete", "structure": "s3", "icons": ["icon_20"], "rules": {"&": {"cursor": "text", "min-height": "56px", "padding": "0 16px", "border": "1px solid var(--color-status-positive)", "background": "var(--color-common-100)", "color": "var(--color-label-normal)", "column-gap": "8px", "font-size": "var(--font-size-16)"}, "& > img": {"display": "block", "height": "auto", "flex-shrink": "0"}}},
    {"id": "text_input_outline_rounded_complete_xlarge", "size": "XLarge", "state": "Complete", "structure": "s3", "icons": ["icon_20"], "rules": {"&": {"cursor": "text", "min-height": "64px", "padding": "0 20px", "border": "1px solid var(--color-status-positive)", "background": "var(--color-common-100)", "color": "var(--color-label-normal)", "column-gap": "8px", "font-size": "var(--font-size-18)"}, "& > img": {"display": "block", "height": "auto", "flex-shrink": "0"}}},
    {"id": "text_input_outline_rounded_error_small", "size": "Small", "state": "Error", "structure": "s4", "rules": {"&": {"cursor": "text", "min-height": "40px", "padding": "0 12px", "border": "2px solid var(--color-status-negative)", "background": "var(--color-common-100)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-14)"}}},
    {"id": "text_input_outline_rounded_error_medium", "size": "Medium (Default)", "state": "Error", "structure": "s4", "rules": {"&": {"cursor": "text", "min-height": "52px", "padding": "0 12px", "border": "2px solid var(--color-status-negative)", "background": "var(--color-common-100)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-16)"}}},
    {"id": "text_input_outline_rounded_error_large", "size": "Large", "state": "Error", "structure": "s4", "rules": {"&": {"cursor": "text", "min-height": "56px", "padding": "0 16px", "border": "2px solid var(--color-status-negative)", "background": "var(--color-common-100)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-16)"}}},
    {"id": "text_input_outline_rounded_error_xlarge", "size": "XLarge", "state": "Error", "structure": "s4", "rules": {"&": {"cursor": "text", "min-height": "64px", "padding": "0 20px", "border": "2px solid var(--color-status-negative)", "background": "var(--color-common-100)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-18)"}}},
    {"id": "text_input_outline_rounded_disabled_small", "size": "Small", "state": "Disabled", "structure": "s5", "rules": {"&": {"cursor": "default", "min-height": "40px", "padding": "0 12px", "border": "0", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "font-size": "var(--font-size-14)"}, "& input": {"cursor": "default"}}},
    {"id": "text_input_outline_rounded_disabled_medium", "size": "Medium (Default)", "state": "Disabled", "structure": "s5", "rules": {"&": {"cursor": "default", "min-height": "52px", "padding": "0 12px", "border": "0", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "font-size": "var(--font-size-16)"}, "& input": {"cursor": "default"}}},
    {"id": "text_input_outline_rounded_disabled_large", "size": "Large", "state": "Disabled", "structure": "s5", "rules": {"&": {"cursor": "default", "min-height": "56px", "padding": "0 16px", "border": "0", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "font-size": "var(--font-size-16)"}, "& input": {"cursor": "default"}}},
    {"id": "text_input_outline_rounded_disabled_xlarge", "size": "XLarge", "state": "Disabled", "structure": "s5", "rules": {"&": {"cursor": "default", "min-height": "64px", "padding": "0 20px", "border": "0", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "font-size": "var(--font-size-18)"}, "& input": {"cursor": "default"}}},
    {"id": "text_input_outline_rounded_view_small", "size": "Small", "state": "View", "structure": "s6", "rules": {"&": {"cursor": "text", "min-height": "40px", "padding": "0 12px", "border": "1px solid var(--color-line-solid-normal)", "background": "var(--color-background-normal-alternative)", "color": "var(--color-label-neutral)", "font-size": "var(--font-size-14)"}}},
    {"id": "text_input_outline_rounded_view_medium", "size": "Medium (Default)", "state": "View", "structure": "s6", "rules": {"&": {"cursor": "text", "min-height": "52px", "padding": "0 12px", "border": "1px solid var(--color-line-solid-normal)", "background": "var(--color-background-normal-alternative)", "color": "var(--color-label-neutral)", "font-size": "var(--font-size-16)"}}},
    {"id": "text_input_outline_rounded_view_large", "size": "Large", "state": "View", "structure": "s6", "rules": {"&": {"cursor": "text", "min-height": "56px", "padding": "0 16px", "border": "1px solid var(--color-line-solid-normal)", "background": "var(--color-background-normal-alternative)", "color": "var(--color-label-neutral)", "font-size": "var(--font-size-16)"}}},
    {"id": "text_input_outline_rounded_view_xlarge", "size": "XLarge", "state": "View", "structure": "s6", "rules": {"&": {"cursor": "text", "min-height": "64px", "padding": "0 20px", "border": "1px solid var(--color-line-solid-normal)", "background": "var(--color-background-normal-alternative)", "color": "var(--color-label-neutral)", "font-size": "var(--font-size-18)"}}},
    {"id": "text_input_outline_rounded_password_small", "size": "Small", "state": "Password", "structure": "s7", "icons": ["icon_16"], "rules": {"&": {"cursor": "text", "min-height": "40px", "padding": "0 12px", "border": "1px solid var(--color-line-solid-0)", "background": "var(--color-common-100)", "color": "var(--color-label-normal)", "column-gap": "8px", "font-size": "var(--font-size-14)"}, "& > img": {"display": "block", "height": "auto", "flex-shrink": "0"}}},
    {"id": "text_input_outline_rounded_password_medium", "size": "Medium (Default)", "state": "Password", "structure": "s7", "icons": ["icon_18"], "rules": {"&": {"cursor": "text", "min-height": "52px", "padding": "0 12px", "border": "1px solid var(--color-line-solid-0)", "background": "var(--color-common-100)", "color": "var(--color-label-normal)", "column-gap": "8px", "font-size": "var(--font-size-16)"}, "& > img": {"display": "block", "height": "auto", "flex-shrink": "0"}}},
    {"id": "text_input_outline_rounded_password_large", "size": "Large", "state": "Password", "structure": "s7", "icons": ["icon_20"], "rules": {"&": {"cursor": "text", "min-height": "56px", "padding": "0 16px", "border": "1px solid var(--color-line-solid-0)", "background": "var(--color-common-100)", "color": "var(--color-label-normal)", "column-gap": "8px", "font-size": "var(--font-size-16)"}, "& > img": {"display": "block", "height": "auto", "flex-shrink": "0"}}},
    {"id": "text_input_outline_rounded_password_xlarge", "size": "XLarge", "state": "Password", "structure": "s7", "icons": ["icon_20"], "rules": {"&": {"cursor": "text", "min-height": "64px", "padding": "0 20px", "border": "1px solid var(--color-line-solid-0)", "background": "var(--color-common-100)", "color": "var(--color-label-normal)", "column-gap": "8px", "font-size": "var(--font-size-18)"}, "& > img": {"display": "block", "height": "auto", "flex-shrink": "0"}}}
  ]
}
```

### C42 Text Input / Outline Full Rounded

열: Small / Medium (Default) / Large / XLarge.

```json
{
  "shared": {
    "&": {"display": "inline-flex", "align-items": "center", "width": "100%", "min-width": "0", "border-radius": "9999px", "line-height": "1.5", "font-weight": "400", "box-sizing": "border-box", "font-family": "inherit"},
    "& input": {"width": "100%", "min-width": "0", "border": "0", "outline": "0", "background": "transparent", "font-family": "inherit", "font-size": "inherit", "font-weight": "inherit", "line-height": "inherit", "color": "inherit", "padding": "0", "box-sizing": "border-box"},
    "& input::placeholder": {"color": "var(--color-label-assistive)"}
  },
  "structures": {
    "s1": "<label class=\"{{component}}\"><input type=\"text\" aria-label=\"예시\" placeholder=\"예시\"></label>",
    "s2": "<label class=\"{{component}}\"><input type=\"text\" aria-label=\"예시\" value=\"Focused\"></label>",
    "s3": "<label class=\"{{component}}\"><input type=\"text\" aria-label=\"예시\" value=\"Completed\"><img class=\"{{icon_1_class}}\" src=\"{{icon_1_src}}\" alt=\"\" aria-hidden=\"true\"></label>",
    "s4": "<label class=\"{{component}}\"><input type=\"text\" aria-label=\"예시\" value=\"Error\"></label>",
    "s5": "<label class=\"{{component}}\"><input type=\"text\" aria-label=\"예시\" value=\"Disabled\" disabled></label>",
    "s6": "<label class=\"{{component}}\"><input type=\"text\" aria-label=\"예시\" value=\"Read only\" readonly></label>",
    "s7": "<label class=\"{{component}}\"><input type=\"password\" aria-label=\"예시\" value=\"password\"><img class=\"{{icon_1_class}}\" src=\"{{icon_1_src}}\" alt=\"\" aria-hidden=\"true\"></label>"
  },
  "variants": [
    {"id": "text_input_outline_full_rounded_small", "size": "Small", "state": "Default", "structure": "s1", "rules": {"&": {"cursor": "text", "min-height": "40px", "padding": "0 12px", "border": "1px solid var(--color-line-solid-0)", "background": "var(--color-common-100)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-14)"}}},
    {"id": "text_input_outline_full_rounded_medium", "size": "Medium (Default)", "state": "Default", "structure": "s1", "rules": {"&": {"cursor": "text", "min-height": "52px", "padding": "0 12px", "border": "1px solid var(--color-line-solid-0)", "background": "var(--color-common-100)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-16)"}}},
    {"id": "text_input_outline_full_rounded_large", "size": "Large", "state": "Default", "structure": "s1", "rules": {"&": {"cursor": "text", "min-height": "56px", "padding": "0 16px", "border": "1px solid var(--color-line-solid-0)", "background": "var(--color-common-100)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-16)"}}},
    {"id": "text_input_outline_full_rounded_xlarge", "size": "XLarge", "state": "Default", "structure": "s1", "rules": {"&": {"cursor": "text", "min-height": "64px", "padding": "0 20px", "border": "1px solid var(--color-line-solid-0)", "background": "var(--color-common-100)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-18)"}}},
    {"id": "text_input_outline_full_rounded_focus_small", "size": "Small", "state": "Focus", "structure": "s2", "rules": {"&": {"cursor": "text", "min-height": "40px", "padding": "0 12px", "border": "2px solid var(--color-blue-50)", "background": "var(--color-common-100)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-14)"}}},
    {"id": "text_input_outline_full_rounded_focus_medium", "size": "Medium (Default)", "state": "Focus", "structure": "s2", "rules": {"&": {"cursor": "text", "min-height": "52px", "padding": "0 12px", "border": "2px solid var(--color-blue-50)", "background": "var(--color-common-100)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-16)"}}},
    {"id": "text_input_outline_full_rounded_focus_large", "size": "Large", "state": "Focus", "structure": "s2", "rules": {"&": {"cursor": "text", "min-height": "56px", "padding": "0 16px", "border": "2px solid var(--color-blue-50)", "background": "var(--color-common-100)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-16)"}}},
    {"id": "text_input_outline_full_rounded_focus_xlarge", "size": "XLarge", "state": "Focus", "structure": "s2", "rules": {"&": {"cursor": "text", "min-height": "64px", "padding": "0 20px", "border": "2px solid var(--color-blue-50)", "background": "var(--color-common-100)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-18)"}}},
    {"id": "text_input_outline_full_rounded_complete_small", "size": "Small", "state": "Complete", "structure": "s3", "icons": ["icon_16"], "rules": {"&": {"cursor": "text", "min-height": "40px", "padding": "0 12px", "border": "1px solid var(--color-status-positive)", "background": "var(--color-common-100)", "color": "var(--color-label-normal)", "column-gap": "8px", "font-size": "var(--font-size-14)"}, "& > img": {"display": "block", "height": "auto", "flex-shrink": "0"}}},
    {"id": "text_input_outline_full_rounded_complete_medium", "size": "Medium (Default)", "state": "Complete", "structure": "s3", "icons": ["icon_18"], "rules": {"&": {"cursor": "text", "min-height": "52px", "padding": "0 12px", "border": "1px solid var(--color-status-positive)", "background": "var(--color-common-100)", "color": "var(--color-label-normal)", "column-gap": "8px", "font-size": "var(--font-size-16)"}, "& > img": {"display": "block", "height": "auto", "flex-shrink": "0"}}},
    {"id": "text_input_outline_full_rounded_complete_large", "size": "Large", "state": "Complete", "structure": "s3", "icons": ["icon_20"], "rules": {"&": {"cursor": "text", "min-height": "56px", "padding": "0 16px", "border": "1px solid var(--color-status-positive)", "background": "var(--color-common-100)", "color": "var(--color-label-normal)", "column-gap": "8px", "font-size": "var(--font-size-16)"}, "& > img": {"display": "block", "height": "auto", "flex-shrink": "0"}}},
    {"id": "text_input_outline_full_rounded_complete_xlarge", "size": "XLarge", "state": "Complete", "structure": "s3", "icons": ["icon_20"], "rules": {"&": {"cursor": "text", "min-height": "64px", "padding": "0 20px", "border": "1px solid var(--color-status-positive)", "background": "var(--color-common-100)", "color": "var(--color-label-normal)", "column-gap": "8px", "font-size": "var(--font-size-18)"}, "& > img": {"display": "block", "height": "auto", "flex-shrink": "0"}}},
    {"id": "text_input_outline_full_rounded_error_small", "size": "Small", "state": "Error", "structure": "s4", "rules": {"&": {"cursor": "text", "min-height": "40px", "padding": "0 12px", "border": "2px solid var(--color-status-negative)", "background": "var(--color-common-100)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-14)"}}},
    {"id": "text_input_outline_full_rounded_error_medium", "size": "Medium (Default)", "state": "Error", "structure": "s4", "rules": {"&": {"cursor": "text", "min-height": "52px", "padding": "0 12px", "border": "2px solid var(--color-status-negative)", "background": "var(--color-common-100)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-16)"}}},
    {"id": "text_input_outline_full_rounded_error_large", "size": "Large", "state": "Error", "structure": "s4", "rules": {"&": {"cursor": "text", "min-height": "56px", "padding": "0 16px", "border": "2px solid var(--color-status-negative)", "background": "var(--color-common-100)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-16)"}}},
    {"id": "text_input_outline_full_rounded_error_xlarge", "size": "XLarge", "state": "Error", "structure": "s4", "rules": {"&": {"cursor": "text", "min-height": "64px", "padding": "0 20px", "border": "2px solid var(--color-status-negative)", "background": "var(--color-common-100)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-18)"}}},
    {"id": "text_input_outline_full_rounded_disabled_small", "size": "Small", "state": "Disabled", "structure": "s5", "rules": {"&": {"cursor": "default", "min-height": "40px", "padding": "0 12px", "border": "0", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "font-size": "var(--font-size-14)"}, "& input": {"cursor": "default"}}},
    {"id": "text_input_outline_full_rounded_disabled_medium", "size": "Medium (Default)", "state": "Disabled", "structure": "s5", "rules": {"&": {"cursor": "default", "min-height": "52px", "padding": "0 12px", "border": "0", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "font-size": "var(--font-size-16)"}, "& input": {"cursor": "default"}}},
    {"id": "text_input_outline_full_rounded_disabled_large", "size": "Large", "state": "Disabled", "structure": "s5", "rules": {"&": {"cursor": "default", "min-height": "56px", "padding": "0 16px", "border": "0", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "font-size": "var(--font-size-16)"}, "& input": {"cursor": "default"}}},
    {"id": "text_input_outline_full_rounded_disabled_xlarge", "size": "XLarge", "state": "Disabled", "structure": "s5", "rules": {"&": {"cursor": "default", "min-height": "64px", "padding": "0 20px", "border": "0", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "font-size": "var(--font-size-18)"}, "& input": {"cursor": "default"}}},
    {"id": "text_input_outline_full_rounded_view_small", "size": "Small", "state": "View", "structure": "s6", "rules": {"&": {"cursor": "text", "min-height": "40px", "padding": "0 12px", "border": "1px solid var(--color-line-solid-normal)", "background": "var(--color-background-normal-alternative)", "color": "var(--color-label-neutral)", "font-size": "var(--font-size-14)"}}},
    {"id": "text_input_outline_full_rounded_view_medium", "size": "Medium (Default)", "state": "View", "structure": "s6", "rules": {"&": {"cursor": "text", "min-height": "52px", "padding": "0 12px", "border": "1px solid var(--color-line-solid-normal)", "background": "var(--color-background-normal-alternative)", "color": "var(--color-label-neutral)", "font-size": "var(--font-size-16)"}}},
    {"id": "text_input_outline_full_rounded_view_large", "size": "Large", "state": "View", "structure": "s6", "rules": {"&": {"cursor": "text", "min-height": "56px", "padding": "0 16px", "border": "1px solid var(--color-line-solid-normal)", "background": "var(--color-background-normal-alternative)", "color": "var(--color-label-neutral)", "font-size": "var(--font-size-16)"}}},
    {"id": "text_input_outline_full_rounded_view_xlarge", "size": "XLarge", "state": "View", "structure": "s6", "rules": {"&": {"cursor": "text", "min-height": "64px", "padding": "0 20px", "border": "1px solid var(--color-line-solid-normal)", "background": "var(--color-background-normal-alternative)", "color": "var(--color-label-neutral)", "font-size": "var(--font-size-18)"}}},
    {"id": "text_input_outline_full_rounded_password_small", "size": "Small", "state": "Password", "structure": "s7", "icons": ["icon_16"], "rules": {"&": {"cursor": "text", "min-height": "40px", "padding": "0 12px", "border": "1px solid var(--color-line-solid-0)", "background": "var(--color-common-100)", "color": "var(--color-label-normal)", "column-gap": "8px", "font-size": "var(--font-size-14)"}, "& > img": {"display": "block", "height": "auto", "flex-shrink": "0"}}},
    {"id": "text_input_outline_full_rounded_password_medium", "size": "Medium (Default)", "state": "Password", "structure": "s7", "icons": ["icon_18"], "rules": {"&": {"cursor": "text", "min-height": "52px", "padding": "0 12px", "border": "1px solid var(--color-line-solid-0)", "background": "var(--color-common-100)", "color": "var(--color-label-normal)", "column-gap": "8px", "font-size": "var(--font-size-16)"}, "& > img": {"display": "block", "height": "auto", "flex-shrink": "0"}}},
    {"id": "text_input_outline_full_rounded_password_large", "size": "Large", "state": "Password", "structure": "s7", "icons": ["icon_20"], "rules": {"&": {"cursor": "text", "min-height": "56px", "padding": "0 16px", "border": "1px solid var(--color-line-solid-0)", "background": "var(--color-common-100)", "color": "var(--color-label-normal)", "column-gap": "8px", "font-size": "var(--font-size-16)"}, "& > img": {"display": "block", "height": "auto", "flex-shrink": "0"}}},
    {"id": "text_input_outline_full_rounded_password_xlarge", "size": "XLarge", "state": "Password", "structure": "s7", "icons": ["icon_20"], "rules": {"&": {"cursor": "text", "min-height": "64px", "padding": "0 20px", "border": "1px solid var(--color-line-solid-0)", "background": "var(--color-common-100)", "color": "var(--color-label-normal)", "column-gap": "8px", "font-size": "var(--font-size-18)"}, "& > img": {"display": "block", "height": "auto", "flex-shrink": "0"}}}
  ]
}
```

### C43 Underline Text Input

열: Small / Medium / Large / Xlarge.

```json
{
  "shared": {
    "&": {"display": "block", "width": "100%", "min-width": "0", "border": "0", "border-bottom": "1px solid var(--color-neutral-60)", "border-radius": "0", "background": "transparent", "color": "var(--color-label-normal)", "font-family": "inherit", "line-height": "1.5", "appearance": "none", "box-sizing": "border-box"},
    "&::placeholder": {"color": "var(--color-label-assistive)", "font-weight": "400"}
  },
  "structures": {
    "s1": "<input class=\"{{component}}\" type=\"text\" placeholder=\"예시\" aria-label=\"예시\">",
    "s2": "<input class=\"{{component}}\" type=\"search\" placeholder=\"예시\" aria-label=\"예시\">"
  },
  "variants": [
    {"id": "text_input_underline_small", "size": "Small", "state": "Responsive", "structure": "s1", "rules": {"&": {"min-height": "40px", "padding": "0 8px", "font-size": "var(--font-size-14)", "font-weight": "500"}, "&::placeholder": {"font-size": "var(--font-size-14)"}}, "order": {"&": ["display", "width", "min-width", "min-height", "padding", "border", "border-bottom", "border-radius", "background", "color", "font-size", "font-weight", "font-family", "line-height", "appearance", "box-sizing"]}},
    {"id": "text_input_underline_medium", "size": "Medium", "state": "Responsive", "structure": "s1", "rules": {"&": {"min-height": "44px", "padding": "0 8px", "font-size": "var(--font-size-16)", "font-weight": "500"}, "&::placeholder": {"font-size": "var(--font-size-15)"}}, "order": {"&": ["display", "width", "min-width", "min-height", "padding", "border", "border-bottom", "border-radius", "background", "color", "font-size", "font-weight", "font-family", "line-height", "appearance", "box-sizing"]}},
    {"id": "text_input_underline_large", "size": "Large", "state": "Responsive", "structure": "s1", "rules": {"&": {"min-height": "52px", "padding": "0 8px", "font-size": "var(--font-size-16)", "font-weight": "500"}, "&::placeholder": {"font-size": "var(--font-size-15)"}}, "order": {"&": ["display", "width", "min-width", "min-height", "padding", "border", "border-bottom", "border-radius", "background", "color", "font-size", "font-weight", "font-family", "line-height", "appearance", "box-sizing"]}},
    {"id": "text_input_underline_xlarge", "size": "Xlarge", "state": "Responsive", "structure": "s1", "rules": {"&": {"min-height": "60px", "padding": "0 8px", "font-size": "var(--font-size-18)", "font-weight": "600"}, "&::placeholder": {"font-size": "var(--font-size-16)"}}, "order": {"&": ["display", "width", "min-width", "min-height", "padding", "border", "border-bottom", "border-radius", "background", "color", "font-size", "font-weight", "font-family", "line-height", "appearance", "box-sizing"]}},
    {"id": "text_input_underline_fixed_small", "size": "Small", "state": "Fixed", "structure": "s1", "rules": {"&": {"min-height": "40px", "padding": "0 8px", "font-size": "var(--font-size-14)", "font-weight": "500", "max-width": "340px"}, "&::placeholder": {"font-size": "var(--font-size-14)"}}, "order": {"&": ["display", "width", "min-width", "min-height", "padding", "border", "border-bottom", "border-radius", "background", "color", "font-size", "font-weight", "font-family", "line-height", "appearance", "box-sizing", "max-width"]}},
    {"id": "text_input_underline_fixed_medium", "size": "Medium", "state": "Fixed", "structure": "s1", "rules": {"&": {"min-height": "44px", "padding": "0 8px", "font-size": "var(--font-size-16)", "font-weight": "500", "max-width": "340px"}, "&::placeholder": {"font-size": "var(--font-size-15)"}}, "order": {"&": ["display", "width", "min-width", "min-height", "padding", "border", "border-bottom", "border-radius", "background", "color", "font-size", "font-weight", "font-family", "line-height", "appearance", "box-sizing", "max-width"]}},
    {"id": "text_input_underline_fixed_large", "size": "Large", "state": "Fixed", "structure": "s1", "rules": {"&": {"min-height": "52px", "padding": "0 8px", "font-size": "var(--font-size-16)", "font-weight": "500", "max-width": "340px"}, "&::placeholder": {"font-size": "var(--font-size-15)"}}, "order": {"&": ["display", "width", "min-width", "min-height", "padding", "border", "border-bottom", "border-radius", "background", "color", "font-size", "font-weight", "font-family", "line-height", "appearance", "box-sizing", "max-width"]}},
    {"id": "text_input_underline_fixed_xlarge", "size": "Xlarge", "state": "Fixed", "structure": "s1", "rules": {"&": {"min-height": "60px", "padding": "0 8px", "font-size": "var(--font-size-18)", "font-weight": "600", "max-width": "340px"}, "&::placeholder": {"font-size": "var(--font-size-16)"}}, "order": {"&": ["display", "width", "min-width", "min-height", "padding", "border", "border-bottom", "border-radius", "background", "color", "font-size", "font-weight", "font-family", "line-height", "appearance", "box-sizing", "max-width"]}},
    {"id": "text_input_underline_search_small", "size": "Small", "state": "Search", "structure": "s2", "rules": {"&": {"min-height": "40px", "padding": "0 40px 0 8px", "font-size": "var(--font-size-14)", "font-weight": "500", "max-width": "340px"}, "&::placeholder": {"font-size": "var(--font-size-14)"}}, "order": {"&": ["display", "width", "min-width", "min-height", "padding", "border", "border-bottom", "border-radius", "background", "color", "font-size", "font-weight", "font-family", "line-height", "appearance", "box-sizing", "max-width"]}},
    {"id": "text_input_underline_search_medium", "size": "Medium", "state": "Search", "structure": "s2", "rules": {"&": {"min-height": "44px", "padding": "0 40px 0 8px", "font-size": "var(--font-size-16)", "font-weight": "500", "max-width": "340px"}, "&::placeholder": {"font-size": "var(--font-size-15)"}}, "order": {"&": ["display", "width", "min-width", "min-height", "padding", "border", "border-bottom", "border-radius", "background", "color", "font-size", "font-weight", "font-family", "line-height", "appearance", "box-sizing", "max-width"]}},
    {"id": "text_input_underline_search_large", "size": "Large", "state": "Search", "structure": "s2", "rules": {"&": {"min-height": "52px", "padding": "0 40px 0 8px", "font-size": "var(--font-size-16)", "font-weight": "500", "max-width": "340px"}, "&::placeholder": {"font-size": "var(--font-size-15)"}}, "order": {"&": ["display", "width", "min-width", "min-height", "padding", "border", "border-bottom", "border-radius", "background", "color", "font-size", "font-weight", "font-family", "line-height", "appearance", "box-sizing", "max-width"]}},
    {"id": "text_input_underline_search_xlarge", "size": "Xlarge", "state": "Search", "structure": "s2", "rules": {"&": {"min-height": "60px", "padding": "0 40px 0 8px", "font-size": "var(--font-size-18)", "font-weight": "600", "max-width": "340px"}, "&::placeholder": {"font-size": "var(--font-size-16)"}}, "order": {"&": ["display", "width", "min-width", "min-height", "padding", "border", "border-bottom", "border-radius", "background", "color", "font-size", "font-weight", "font-family", "line-height", "appearance", "box-sizing", "max-width"]}},
    {"id": "text_input_underline_search_wide_small", "size": "Small", "state": "Search Wide", "structure": "s2", "rules": {"&": {"min-height": "44px", "padding": "0 40px 0 8px", "font-size": "var(--font-size-16)", "font-weight": "400", "max-width": "800px"}, "&::placeholder": {"font-size": "var(--font-size-16)"}}, "order": {"&": ["display", "width", "min-width", "min-height", "padding", "border", "border-bottom", "border-radius", "background", "color", "font-size", "font-weight", "font-family", "line-height", "appearance", "box-sizing", "max-width"]}},
    {"id": "text_input_underline_search_wide_medium", "size": "Medium", "state": "Search Wide", "structure": "s2", "rules": {"&": {"min-height": "56px", "padding": "0 40px 0 8px", "font-size": "var(--font-size-18)", "font-weight": "400", "max-width": "800px"}, "&::placeholder": {"font-size": "var(--font-size-18)"}}, "order": {"&": ["display", "width", "min-width", "min-height", "padding", "border", "border-bottom", "border-radius", "background", "color", "font-size", "font-weight", "font-family", "line-height", "appearance", "box-sizing", "max-width"]}},
    {"id": "text_input_underline_search_wide_large", "size": "Large", "state": "Search Wide", "structure": "s2", "rules": {"&": {"min-height": "60px", "padding": "0 40px 0 8px", "font-size": "var(--font-size-18)", "font-weight": "400", "max-width": "800px"}, "&::placeholder": {"font-size": "var(--font-size-18)"}}, "order": {"&": ["display", "width", "min-width", "min-height", "padding", "border", "border-bottom", "border-radius", "background", "color", "font-size", "font-weight", "font-family", "line-height", "appearance", "box-sizing", "max-width"]}},
    {"id": "text_input_underline_search_wide_xlarge", "size": "Xlarge", "state": "Search Wide", "structure": "s2", "rules": {"&": {"min-height": "64px", "padding": "0 40px 0 8px", "font-size": "var(--font-size-20)", "font-weight": "400", "max-width": "800px"}, "&::placeholder": {"font-size": "var(--font-size-20)"}}, "order": {"&": ["display", "width", "min-width", "min-height", "padding", "border", "border-bottom", "border-radius", "background", "color", "font-size", "font-weight", "font-family", "line-height", "appearance", "box-sizing", "max-width"]}}
  ]
}
```

### C44 Text Area / Filled

열: Small / Medium (Default) / Large / Xlarge.

```json
{
  "shared": {
    "&": {"display": "block", "width": "100%", "outline": "0", "border-radius": "0", "line-height": "1.5", "font-weight": "400", "box-sizing": "border-box", "font-family": "inherit"},
    "&::placeholder": {"color": "var(--color-label-assistive)"}
  },
  "structures": {
    "s1": "<textarea class=\"{{component}}\" aria-label=\"예시\" placeholder=\"예시\"></textarea>",
    "s2": "<textarea class=\"{{component}}\" aria-label=\"예시\">Error text</textarea>",
    "s3": "<textarea class=\"{{component}}\" aria-label=\"예시\" placeholder=\"예시\" disabled></textarea>",
    "s4": "<textarea class=\"{{component}}\" aria-label=\"예시\" readonly>Read only text</textarea>"
  },
  "variants": [
    {"id": "textarea_filled_small", "size": "Small", "state": "Default", "structure": "s1", "rules": {"&": {"resize": "vertical", "min-height": "96px", "padding": "12px", "border": "0", "background-color": "var(--color-fill-normal)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-14)", "cursor": "text"}}},
    {"id": "textarea_filled_medium", "size": "Medium (Default)", "state": "Default", "structure": "s1", "rules": {"&": {"resize": "vertical", "min-height": "128px", "padding": "12px", "border": "0", "background-color": "var(--color-fill-normal)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-16)", "cursor": "text"}}},
    {"id": "textarea_filled_large", "size": "Large", "state": "Default", "structure": "s1", "rules": {"&": {"resize": "vertical", "min-height": "160px", "padding": "16px", "border": "0", "background-color": "var(--color-fill-normal)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-16)", "cursor": "text"}}},
    {"id": "textarea_filled_xlarge", "size": "Xlarge", "state": "Default", "structure": "s1", "rules": {"&": {"resize": "vertical", "min-height": "196px", "padding": "20px", "border": "0", "background-color": "var(--color-fill-normal)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-18)", "cursor": "text"}}},
    {"id": "textarea_filled_focus_small", "size": "Small", "state": "Focus", "structure": "s1", "rules": {"&": {"resize": "vertical", "min-height": "96px", "padding": "12px", "border": "2px solid var(--color-blue-50)", "background-color": "var(--color-fill-normal)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-14)", "cursor": "text"}}},
    {"id": "textarea_filled_focus_medium", "size": "Medium (Default)", "state": "Focus", "structure": "s1", "rules": {"&": {"resize": "vertical", "min-height": "128px", "padding": "12px", "border": "2px solid var(--color-blue-50)", "background-color": "var(--color-fill-normal)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-16)", "cursor": "text"}}},
    {"id": "textarea_filled_focus_large", "size": "Large", "state": "Focus", "structure": "s1", "rules": {"&": {"resize": "vertical", "min-height": "160px", "padding": "16px", "border": "2px solid var(--color-blue-50)", "background-color": "var(--color-fill-normal)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-16)", "cursor": "text"}}},
    {"id": "textarea_filled_focus_xlarge", "size": "Xlarge", "state": "Focus", "structure": "s1", "rules": {"&": {"resize": "vertical", "min-height": "196px", "padding": "20px", "border": "2px solid var(--color-blue-50)", "background-color": "var(--color-fill-normal)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-18)", "cursor": "text"}}},
    {"id": "textarea_filled_error_small", "size": "Small", "state": "Error", "structure": "s2", "rules": {"&": {"resize": "vertical", "min-height": "96px", "padding": "12px", "border": "0", "background-color": "var(--color-red-95)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-14)", "cursor": "text"}}},
    {"id": "textarea_filled_error_medium", "size": "Medium (Default)", "state": "Error", "structure": "s2", "rules": {"&": {"resize": "vertical", "min-height": "128px", "padding": "12px", "border": "0", "background-color": "var(--color-red-95)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-16)", "cursor": "text"}}},
    {"id": "textarea_filled_error_large", "size": "Large", "state": "Error", "structure": "s2", "rules": {"&": {"resize": "vertical", "min-height": "160px", "padding": "16px", "border": "0", "background-color": "var(--color-red-95)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-16)", "cursor": "text"}}},
    {"id": "textarea_filled_error_xlarge", "size": "Xlarge", "state": "Error", "structure": "s2", "rules": {"&": {"resize": "vertical", "min-height": "196px", "padding": "20px", "border": "0", "background-color": "var(--color-red-95)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-18)", "cursor": "text"}}},
    {"id": "textarea_filled_disabled_small", "size": "Small", "state": "Disabled", "structure": "s3", "rules": {"&": {"resize": "vertical", "min-height": "96px", "padding": "12px", "border": "0", "background-color": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "font-size": "var(--font-size-14)", "cursor": "default"}}},
    {"id": "textarea_filled_disabled_medium", "size": "Medium (Default)", "state": "Disabled", "structure": "s3", "rules": {"&": {"resize": "vertical", "min-height": "128px", "padding": "12px", "border": "0", "background-color": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "font-size": "var(--font-size-16)", "cursor": "default"}}},
    {"id": "textarea_filled_disabled_large", "size": "Large", "state": "Disabled", "structure": "s3", "rules": {"&": {"resize": "vertical", "min-height": "160px", "padding": "16px", "border": "0", "background-color": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "font-size": "var(--font-size-16)", "cursor": "default"}}},
    {"id": "textarea_filled_disabled_xlarge", "size": "Xlarge", "state": "Disabled", "structure": "s3", "rules": {"&": {"resize": "vertical", "min-height": "196px", "padding": "20px", "border": "0", "background-color": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "font-size": "var(--font-size-18)", "cursor": "default"}}},
    {"id": "textarea_filled_view_small", "size": "Small", "state": "View", "structure": "s4", "rules": {"&": {"resize": "vertical", "min-height": "96px", "padding": "12px", "border": "0", "background-color": "var(--color-background-normal-alternative)", "color": "var(--color-label-neutral)", "font-size": "var(--font-size-14)", "cursor": "text"}}},
    {"id": "textarea_filled_view_medium", "size": "Medium (Default)", "state": "View", "structure": "s4", "rules": {"&": {"resize": "vertical", "min-height": "128px", "padding": "12px", "border": "0", "background-color": "var(--color-background-normal-alternative)", "color": "var(--color-label-neutral)", "font-size": "var(--font-size-16)", "cursor": "text"}}},
    {"id": "textarea_filled_view_large", "size": "Large", "state": "View", "structure": "s4", "rules": {"&": {"resize": "vertical", "min-height": "160px", "padding": "16px", "border": "0", "background-color": "var(--color-background-normal-alternative)", "color": "var(--color-label-neutral)", "font-size": "var(--font-size-16)", "cursor": "text"}}},
    {"id": "textarea_filled_view_xlarge", "size": "Xlarge", "state": "View", "structure": "s4", "rules": {"&": {"resize": "vertical", "min-height": "196px", "padding": "20px", "border": "0", "background-color": "var(--color-background-normal-alternative)", "color": "var(--color-label-neutral)", "font-size": "var(--font-size-18)", "cursor": "text"}}},
    {"id": "textarea_filled_inquiry_small", "size": "Small", "state": "Inquiry", "structure": "s1", "rules": {"&": {"resize": "none", "min-height": "96px", "padding": "12px", "border": "0", "background-color": "var(--color-fill-normal)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-14)", "cursor": "text"}}},
    {"id": "textarea_filled_inquiry_medium", "size": "Medium (Default)", "state": "Inquiry", "structure": "s1", "rules": {"&": {"resize": "none", "min-height": "128px", "padding": "12px", "border": "0", "background-color": "var(--color-fill-normal)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-16)", "cursor": "text"}}},
    {"id": "textarea_filled_inquiry_large", "size": "Large", "state": "Inquiry", "structure": "s1", "rules": {"&": {"resize": "none", "min-height": "160px", "padding": "16px", "border": "0", "background-color": "var(--color-fill-normal)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-16)", "cursor": "text"}}},
    {"id": "textarea_filled_inquiry_xlarge", "size": "Xlarge", "state": "Inquiry", "structure": "s1", "rules": {"&": {"resize": "none", "min-height": "196px", "padding": "20px", "border": "0", "background-color": "var(--color-fill-normal)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-18)", "cursor": "text"}}}
  ]
}
```

### C45 Text Area / Filled Rounded

열: Small / Medium (Default) / Large / Xlarge.

```json
{
  "shared": {
    "&": {"display": "block", "width": "100%", "outline": "0", "border-radius": "8px", "line-height": "1.5", "font-weight": "400", "box-sizing": "border-box", "font-family": "inherit"},
    "&::placeholder": {"color": "var(--color-label-assistive)"}
  },
  "structures": {
    "s1": "<textarea class=\"{{component}}\" aria-label=\"예시\" placeholder=\"예시\"></textarea>",
    "s2": "<textarea class=\"{{component}}\" aria-label=\"예시\">Error text</textarea>",
    "s3": "<textarea class=\"{{component}}\" aria-label=\"예시\" placeholder=\"예시\" disabled></textarea>",
    "s4": "<textarea class=\"{{component}}\" aria-label=\"예시\" readonly>Read only text</textarea>"
  },
  "variants": [
    {"id": "textarea_filled_rounded_small", "size": "Small", "state": "Default", "structure": "s1", "rules": {"&": {"resize": "vertical", "min-height": "96px", "padding": "12px", "border": "0", "background-color": "var(--color-fill-normal)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-14)", "cursor": "text"}}},
    {"id": "textarea_filled_rounded_medium", "size": "Medium (Default)", "state": "Default", "structure": "s1", "rules": {"&": {"resize": "vertical", "min-height": "128px", "padding": "12px", "border": "0", "background-color": "var(--color-fill-normal)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-16)", "cursor": "text"}}},
    {"id": "textarea_filled_rounded_large", "size": "Large", "state": "Default", "structure": "s1", "rules": {"&": {"resize": "vertical", "min-height": "160px", "padding": "16px", "border": "0", "background-color": "var(--color-fill-normal)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-16)", "cursor": "text"}}},
    {"id": "textarea_filled_rounded_xlarge", "size": "Xlarge", "state": "Default", "structure": "s1", "rules": {"&": {"resize": "vertical", "min-height": "196px", "padding": "20px", "border": "0", "background-color": "var(--color-fill-normal)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-18)", "cursor": "text"}}},
    {"id": "textarea_filled_rounded_focus_small", "size": "Small", "state": "Focus", "structure": "s1", "rules": {"&": {"resize": "vertical", "min-height": "96px", "padding": "12px", "border": "2px solid var(--color-blue-50)", "background-color": "var(--color-fill-normal)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-14)", "cursor": "text"}}},
    {"id": "textarea_filled_rounded_focus_medium", "size": "Medium (Default)", "state": "Focus", "structure": "s1", "rules": {"&": {"resize": "vertical", "min-height": "128px", "padding": "12px", "border": "2px solid var(--color-blue-50)", "background-color": "var(--color-fill-normal)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-16)", "cursor": "text"}}},
    {"id": "textarea_filled_rounded_focus_large", "size": "Large", "state": "Focus", "structure": "s1", "rules": {"&": {"resize": "vertical", "min-height": "160px", "padding": "16px", "border": "2px solid var(--color-blue-50)", "background-color": "var(--color-fill-normal)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-16)", "cursor": "text"}}},
    {"id": "textarea_filled_rounded_focus_xlarge", "size": "Xlarge", "state": "Focus", "structure": "s1", "rules": {"&": {"resize": "vertical", "min-height": "196px", "padding": "20px", "border": "2px solid var(--color-blue-50)", "background-color": "var(--color-fill-normal)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-18)", "cursor": "text"}}},
    {"id": "textarea_filled_rounded_error_small", "size": "Small", "state": "Error", "structure": "s2", "rules": {"&": {"resize": "vertical", "min-height": "96px", "padding": "12px", "border": "0", "background-color": "var(--color-red-95)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-14)", "cursor": "text"}}},
    {"id": "textarea_filled_rounded_error_medium", "size": "Medium (Default)", "state": "Error", "structure": "s2", "rules": {"&": {"resize": "vertical", "min-height": "128px", "padding": "12px", "border": "0", "background-color": "var(--color-red-95)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-16)", "cursor": "text"}}},
    {"id": "textarea_filled_rounded_error_large", "size": "Large", "state": "Error", "structure": "s2", "rules": {"&": {"resize": "vertical", "min-height": "160px", "padding": "16px", "border": "0", "background-color": "var(--color-red-95)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-16)", "cursor": "text"}}},
    {"id": "textarea_filled_rounded_error_xlarge", "size": "Xlarge", "state": "Error", "structure": "s2", "rules": {"&": {"resize": "vertical", "min-height": "196px", "padding": "20px", "border": "0", "background-color": "var(--color-red-95)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-18)", "cursor": "text"}}},
    {"id": "textarea_filled_rounded_disabled_small", "size": "Small", "state": "Disabled", "structure": "s3", "rules": {"&": {"resize": "vertical", "min-height": "96px", "padding": "12px", "border": "0", "background-color": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "font-size": "var(--font-size-14)", "cursor": "default"}}},
    {"id": "textarea_filled_rounded_disabled_medium", "size": "Medium (Default)", "state": "Disabled", "structure": "s3", "rules": {"&": {"resize": "vertical", "min-height": "128px", "padding": "12px", "border": "0", "background-color": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "font-size": "var(--font-size-16)", "cursor": "default"}}},
    {"id": "textarea_filled_rounded_disabled_large", "size": "Large", "state": "Disabled", "structure": "s3", "rules": {"&": {"resize": "vertical", "min-height": "160px", "padding": "16px", "border": "0", "background-color": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "font-size": "var(--font-size-16)", "cursor": "default"}}},
    {"id": "textarea_filled_rounded_disabled_xlarge", "size": "Xlarge", "state": "Disabled", "structure": "s3", "rules": {"&": {"resize": "vertical", "min-height": "196px", "padding": "20px", "border": "0", "background-color": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "font-size": "var(--font-size-18)", "cursor": "default"}}},
    {"id": "textarea_filled_rounded_view_small", "size": "Small", "state": "View", "structure": "s4", "rules": {"&": {"resize": "vertical", "min-height": "96px", "padding": "12px", "border": "0", "background-color": "var(--color-background-normal-alternative)", "color": "var(--color-label-neutral)", "font-size": "var(--font-size-14)", "cursor": "text"}}},
    {"id": "textarea_filled_rounded_view_medium", "size": "Medium (Default)", "state": "View", "structure": "s4", "rules": {"&": {"resize": "vertical", "min-height": "128px", "padding": "12px", "border": "0", "background-color": "var(--color-background-normal-alternative)", "color": "var(--color-label-neutral)", "font-size": "var(--font-size-16)", "cursor": "text"}}},
    {"id": "textarea_filled_rounded_view_large", "size": "Large", "state": "View", "structure": "s4", "rules": {"&": {"resize": "vertical", "min-height": "160px", "padding": "16px", "border": "0", "background-color": "var(--color-background-normal-alternative)", "color": "var(--color-label-neutral)", "font-size": "var(--font-size-16)", "cursor": "text"}}},
    {"id": "textarea_filled_rounded_view_xlarge", "size": "Xlarge", "state": "View", "structure": "s4", "rules": {"&": {"resize": "vertical", "min-height": "196px", "padding": "20px", "border": "0", "background-color": "var(--color-background-normal-alternative)", "color": "var(--color-label-neutral)", "font-size": "var(--font-size-18)", "cursor": "text"}}},
    {"id": "textarea_filled_rounded_inquiry_small", "size": "Small", "state": "Inquiry", "structure": "s1", "rules": {"&": {"resize": "none", "min-height": "96px", "padding": "12px", "border": "0", "background-color": "var(--color-fill-normal)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-14)", "cursor": "text"}}},
    {"id": "textarea_filled_rounded_inquiry_medium", "size": "Medium (Default)", "state": "Inquiry", "structure": "s1", "rules": {"&": {"resize": "none", "min-height": "128px", "padding": "12px", "border": "0", "background-color": "var(--color-fill-normal)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-16)", "cursor": "text"}}},
    {"id": "textarea_filled_rounded_inquiry_large", "size": "Large", "state": "Inquiry", "structure": "s1", "rules": {"&": {"resize": "none", "min-height": "160px", "padding": "16px", "border": "0", "background-color": "var(--color-fill-normal)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-16)", "cursor": "text"}}},
    {"id": "textarea_filled_rounded_inquiry_xlarge", "size": "Xlarge", "state": "Inquiry", "structure": "s1", "rules": {"&": {"resize": "none", "min-height": "196px", "padding": "20px", "border": "0", "background-color": "var(--color-fill-normal)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-18)", "cursor": "text"}}}
  ]
}
```

### C46 Text Area / Outline

열: Small / Medium / Large / Xlarge.

```json
{
  "shared": {
    "&": {"display": "block", "width": "100%", "outline": "0", "border-radius": "0", "line-height": "1.5", "font-weight": "400", "box-sizing": "border-box", "font-family": "inherit"},
    "&::placeholder": {"color": "var(--color-label-assistive)"}
  },
  "structures": {
    "s1": "<textarea class=\"{{component}}\" aria-label=\"예시\" placeholder=\"예시\"></textarea>",
    "s2": "<textarea class=\"{{component}}\" aria-label=\"예시\">Error text</textarea>",
    "s3": "<textarea class=\"{{component}}\" aria-label=\"예시\" placeholder=\"예시\" disabled></textarea>",
    "s4": "<textarea class=\"{{component}}\" aria-label=\"예시\" readonly>Read only text</textarea>"
  },
  "variants": [
    {"id": "textarea_outline_small", "size": "Small", "state": "Default", "structure": "s1", "rules": {"&": {"resize": "vertical", "min-height": "96px", "padding": "12px", "border": "1px solid var(--color-line-solid-0)", "background": "var(--color-common-100)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-14)"}}},
    {"id": "textarea_outline_medium", "size": "Medium", "state": "Default", "structure": "s1", "rules": {"&": {"resize": "vertical", "min-height": "128px", "padding": "12px", "border": "1px solid var(--color-line-solid-0)", "background": "var(--color-common-100)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-16)"}}},
    {"id": "textarea_outline_large", "size": "Large", "state": "Default", "structure": "s1", "rules": {"&": {"resize": "vertical", "min-height": "160px", "padding": "16px", "border": "1px solid var(--color-line-solid-0)", "background": "var(--color-common-100)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-16)"}}},
    {"id": "textarea_outline_xlarge", "size": "Xlarge", "state": "Default", "structure": "s1", "rules": {"&": {"resize": "vertical", "min-height": "196px", "padding": "20px", "border": "1px solid var(--color-line-solid-0)", "background": "var(--color-common-100)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-18)"}}},
    {"id": "textarea_outline_focus_small", "size": "Small", "state": "Focus", "structure": "s1", "rules": {"&": {"resize": "vertical", "min-height": "96px", "padding": "12px", "border": "2px solid var(--color-blue-50)", "background": "var(--color-common-100)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-14)"}}},
    {"id": "textarea_outline_focus_medium", "size": "Medium", "state": "Focus", "structure": "s1", "rules": {"&": {"resize": "vertical", "min-height": "128px", "padding": "12px", "border": "2px solid var(--color-blue-50)", "background": "var(--color-common-100)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-16)"}}},
    {"id": "textarea_outline_focus_large", "size": "Large", "state": "Focus", "structure": "s1", "rules": {"&": {"resize": "vertical", "min-height": "160px", "padding": "16px", "border": "2px solid var(--color-blue-50)", "background": "var(--color-common-100)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-16)"}}},
    {"id": "textarea_outline_focus_xlarge", "size": "Xlarge", "state": "Focus", "structure": "s1", "rules": {"&": {"resize": "vertical", "min-height": "196px", "padding": "20px", "border": "2px solid var(--color-blue-50)", "background": "var(--color-common-100)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-18)"}}},
    {"id": "textarea_outline_error_small", "size": "Small", "state": "Error", "structure": "s2", "rules": {"&": {"resize": "vertical", "min-height": "96px", "padding": "12px", "border": "2px solid var(--color-status-negative)", "background": "var(--color-common-100)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-14)"}}},
    {"id": "textarea_outline_error_medium", "size": "Medium", "state": "Error", "structure": "s2", "rules": {"&": {"resize": "vertical", "min-height": "128px", "padding": "12px", "border": "2px solid var(--color-status-negative)", "background": "var(--color-common-100)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-16)"}}},
    {"id": "textarea_outline_error_large", "size": "Large", "state": "Error", "structure": "s2", "rules": {"&": {"resize": "vertical", "min-height": "160px", "padding": "16px", "border": "2px solid var(--color-status-negative)", "background": "var(--color-common-100)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-16)"}}},
    {"id": "textarea_outline_error_xlarge", "size": "Xlarge", "state": "Error", "structure": "s2", "rules": {"&": {"resize": "vertical", "min-height": "196px", "padding": "20px", "border": "2px solid var(--color-status-negative)", "background": "var(--color-common-100)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-18)"}}},
    {"id": "textarea_outline_disabled_small", "size": "Small", "state": "Disabled", "structure": "s3", "rules": {"&": {"resize": "vertical", "min-height": "96px", "padding": "12px", "border": "0", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "font-size": "var(--font-size-14)", "cursor": "default"}}},
    {"id": "textarea_outline_disabled_medium", "size": "Medium", "state": "Disabled", "structure": "s3", "rules": {"&": {"resize": "vertical", "min-height": "128px", "padding": "12px", "border": "0", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "font-size": "var(--font-size-16)", "cursor": "default"}}},
    {"id": "textarea_outline_disabled_large", "size": "Large", "state": "Disabled", "structure": "s3", "rules": {"&": {"resize": "vertical", "min-height": "160px", "padding": "16px", "border": "0", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "font-size": "var(--font-size-16)", "cursor": "default"}}},
    {"id": "textarea_outline_disabled_xlarge", "size": "Xlarge", "state": "Disabled", "structure": "s3", "rules": {"&": {"resize": "vertical", "min-height": "196px", "padding": "20px", "border": "0", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "font-size": "var(--font-size-18)", "cursor": "default"}}},
    {"id": "textarea_outline_view_small", "size": "Small", "state": "View", "structure": "s4", "rules": {"&": {"resize": "vertical", "min-height": "96px", "padding": "12px", "border": "1px solid var(--color-line-solid-normal)", "background": "var(--color-background-normal-alternative)", "color": "var(--color-label-neutral)", "font-size": "var(--font-size-14)"}}},
    {"id": "textarea_outline_view_medium", "size": "Medium", "state": "View", "structure": "s4", "rules": {"&": {"resize": "vertical", "min-height": "128px", "padding": "12px", "border": "1px solid var(--color-line-solid-normal)", "background": "var(--color-background-normal-alternative)", "color": "var(--color-label-neutral)", "font-size": "var(--font-size-16)"}}},
    {"id": "textarea_outline_view_large", "size": "Large", "state": "View", "structure": "s4", "rules": {"&": {"resize": "vertical", "min-height": "160px", "padding": "16px", "border": "1px solid var(--color-line-solid-normal)", "background": "var(--color-background-normal-alternative)", "color": "var(--color-label-neutral)", "font-size": "var(--font-size-16)"}}},
    {"id": "textarea_outline_view_xlarge", "size": "Xlarge", "state": "View", "structure": "s4", "rules": {"&": {"resize": "vertical", "min-height": "196px", "padding": "20px", "border": "1px solid var(--color-line-solid-normal)", "background": "var(--color-background-normal-alternative)", "color": "var(--color-label-neutral)", "font-size": "var(--font-size-18)"}}},
    {"id": "textarea_outline_inquiry_small", "size": "Small", "state": "Inquiry", "structure": "s1", "rules": {"&": {"resize": "none", "min-height": "96px", "padding": "12px", "border": "1px solid var(--color-line-solid-0)", "background": "var(--color-common-100)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-14)"}}},
    {"id": "textarea_outline_inquiry_medium", "size": "Medium", "state": "Inquiry", "structure": "s1", "rules": {"&": {"resize": "none", "min-height": "128px", "padding": "12px", "border": "1px solid var(--color-line-solid-0)", "background": "var(--color-common-100)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-16)"}}},
    {"id": "textarea_outline_inquiry_large", "size": "Large", "state": "Inquiry", "structure": "s1", "rules": {"&": {"resize": "none", "min-height": "160px", "padding": "16px", "border": "1px solid var(--color-line-solid-0)", "background": "var(--color-common-100)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-16)"}}},
    {"id": "textarea_outline_inquiry_xlarge", "size": "Xlarge", "state": "Inquiry", "structure": "s1", "rules": {"&": {"resize": "none", "min-height": "196px", "padding": "20px", "border": "1px solid var(--color-line-solid-0)", "background": "var(--color-common-100)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-18)"}}}
  ]
}
```

### C47 Text Area / Outline Rounded

열: Small / Medium (Default) / Large / Xlarge.

```json
{
  "shared": {
    "&": {"display": "block", "width": "100%", "outline": "0", "border-radius": "8px", "line-height": "1.5", "font-weight": "400", "box-sizing": "border-box", "font-family": "inherit"},
    "&::placeholder": {"color": "var(--color-label-assistive)"}
  },
  "structures": {
    "s1": "<textarea class=\"{{component}}\" aria-label=\"예시\" placeholder=\"예시\"></textarea>",
    "s2": "<textarea class=\"{{component}}\" aria-label=\"예시\">Error text</textarea>",
    "s3": "<textarea class=\"{{component}}\" aria-label=\"예시\" placeholder=\"예시\" disabled></textarea>",
    "s4": "<textarea class=\"{{component}}\" aria-label=\"예시\" readonly>Read only text</textarea>"
  },
  "variants": [
    {"id": "textarea_outline_rounded_small", "size": "Small", "state": "Default", "structure": "s1", "rules": {"&": {"resize": "vertical", "min-height": "96px", "padding": "12px", "border": "1px solid var(--color-line-solid-0)", "background": "var(--color-common-100)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-14)"}}},
    {"id": "textarea_outline_rounded_medium", "size": "Medium (Default)", "state": "Default", "structure": "s1", "rules": {"&": {"resize": "vertical", "min-height": "128px", "padding": "12px", "border": "1px solid var(--color-line-solid-0)", "background": "var(--color-common-100)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-16)"}}},
    {"id": "textarea_outline_rounded_large", "size": "Large", "state": "Default", "structure": "s1", "rules": {"&": {"resize": "vertical", "min-height": "160px", "padding": "16px", "border": "1px solid var(--color-line-solid-0)", "background": "var(--color-common-100)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-16)"}}},
    {"id": "textarea_outline_rounded_xlarge", "size": "Xlarge", "state": "Default", "structure": "s1", "rules": {"&": {"resize": "vertical", "min-height": "196px", "padding": "20px", "border": "1px solid var(--color-line-solid-0)", "background": "var(--color-common-100)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-18)"}}},
    {"id": "textarea_outline_rounded_focus_small", "size": "Small", "state": "Focus", "structure": "s1", "rules": {"&": {"resize": "vertical", "min-height": "96px", "padding": "12px", "border": "2px solid var(--color-blue-50)", "background": "var(--color-common-100)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-14)"}}},
    {"id": "textarea_outline_rounded_focus_medium", "size": "Medium (Default)", "state": "Focus", "structure": "s1", "rules": {"&": {"resize": "vertical", "min-height": "128px", "padding": "12px", "border": "2px solid var(--color-blue-50)", "background": "var(--color-common-100)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-16)"}}},
    {"id": "textarea_outline_rounded_focus_large", "size": "Large", "state": "Focus", "structure": "s1", "rules": {"&": {"resize": "vertical", "min-height": "160px", "padding": "16px", "border": "2px solid var(--color-blue-50)", "background": "var(--color-common-100)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-16)"}}},
    {"id": "textarea_outline_rounded_focus_xlarge", "size": "Xlarge", "state": "Focus", "structure": "s1", "rules": {"&": {"resize": "vertical", "min-height": "196px", "padding": "20px", "border": "2px solid var(--color-blue-50)", "background": "var(--color-common-100)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-18)"}}},
    {"id": "textarea_outline_rounded_error_small", "size": "Small", "state": "Error", "structure": "s2", "rules": {"&": {"resize": "vertical", "min-height": "96px", "padding": "12px", "border": "2px solid var(--color-status-negative)", "background": "var(--color-common-100)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-14)"}}},
    {"id": "textarea_outline_rounded_error_medium", "size": "Medium (Default)", "state": "Error", "structure": "s2", "rules": {"&": {"resize": "vertical", "min-height": "128px", "padding": "12px", "border": "2px solid var(--color-status-negative)", "background": "var(--color-common-100)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-16)"}}},
    {"id": "textarea_outline_rounded_error_large", "size": "Large", "state": "Error", "structure": "s2", "rules": {"&": {"resize": "vertical", "min-height": "160px", "padding": "16px", "border": "2px solid var(--color-status-negative)", "background": "var(--color-common-100)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-16)"}}},
    {"id": "textarea_outline_rounded_error_xlarge", "size": "Xlarge", "state": "Error", "structure": "s2", "rules": {"&": {"resize": "vertical", "min-height": "196px", "padding": "20px", "border": "2px solid var(--color-status-negative)", "background": "var(--color-common-100)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-18)"}}},
    {"id": "textarea_outline_rounded_disabled_small", "size": "Small", "state": "Disabled", "structure": "s3", "rules": {"&": {"resize": "vertical", "min-height": "96px", "padding": "12px", "border": "0", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "font-size": "var(--font-size-14)", "cursor": "default"}}},
    {"id": "textarea_outline_rounded_disabled_medium", "size": "Medium (Default)", "state": "Disabled", "structure": "s3", "rules": {"&": {"resize": "vertical", "min-height": "128px", "padding": "12px", "border": "0", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "font-size": "var(--font-size-16)", "cursor": "default"}}},
    {"id": "textarea_outline_rounded_disabled_large", "size": "Large", "state": "Disabled", "structure": "s3", "rules": {"&": {"resize": "vertical", "min-height": "160px", "padding": "16px", "border": "0", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "font-size": "var(--font-size-16)", "cursor": "default"}}},
    {"id": "textarea_outline_rounded_disabled_xlarge", "size": "Xlarge", "state": "Disabled", "structure": "s3", "rules": {"&": {"resize": "vertical", "min-height": "196px", "padding": "20px", "border": "0", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "font-size": "var(--font-size-18)", "cursor": "default"}}},
    {"id": "textarea_outline_rounded_view_small", "size": "Small", "state": "View", "structure": "s4", "rules": {"&": {"resize": "vertical", "min-height": "96px", "padding": "12px", "border": "1px solid var(--color-line-solid-normal)", "background": "var(--color-background-normal-alternative)", "color": "var(--color-label-neutral)", "font-size": "var(--font-size-14)"}}},
    {"id": "textarea_outline_rounded_view_medium", "size": "Medium (Default)", "state": "View", "structure": "s4", "rules": {"&": {"resize": "vertical", "min-height": "128px", "padding": "12px", "border": "1px solid var(--color-line-solid-normal)", "background": "var(--color-background-normal-alternative)", "color": "var(--color-label-neutral)", "font-size": "var(--font-size-16)"}}},
    {"id": "textarea_outline_rounded_view_large", "size": "Large", "state": "View", "structure": "s4", "rules": {"&": {"resize": "vertical", "min-height": "160px", "padding": "16px", "border": "1px solid var(--color-line-solid-normal)", "background": "var(--color-background-normal-alternative)", "color": "var(--color-label-neutral)", "font-size": "var(--font-size-16)"}}},
    {"id": "textarea_outline_rounded_view_xlarge", "size": "Xlarge", "state": "View", "structure": "s4", "rules": {"&": {"resize": "vertical", "min-height": "196px", "padding": "20px", "border": "1px solid var(--color-line-solid-normal)", "background": "var(--color-background-normal-alternative)", "color": "var(--color-label-neutral)", "font-size": "var(--font-size-18)"}}},
    {"id": "textarea_outline_rounded_inquiry_small", "size": "Small", "state": "Inquiry", "structure": "s1", "rules": {"&": {"resize": "none", "min-height": "96px", "padding": "12px", "border": "1px solid var(--color-line-solid-0)", "background": "var(--color-common-100)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-14)"}}},
    {"id": "textarea_outline_rounded_inquiry_medium", "size": "Medium (Default)", "state": "Inquiry", "structure": "s1", "rules": {"&": {"resize": "none", "min-height": "128px", "padding": "12px", "border": "1px solid var(--color-line-solid-0)", "background": "var(--color-common-100)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-16)"}}},
    {"id": "textarea_outline_rounded_inquiry_large", "size": "Large", "state": "Inquiry", "structure": "s1", "rules": {"&": {"resize": "none", "min-height": "160px", "padding": "16px", "border": "1px solid var(--color-line-solid-0)", "background": "var(--color-common-100)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-16)"}}},
    {"id": "textarea_outline_rounded_inquiry_xlarge", "size": "Xlarge", "state": "Inquiry", "structure": "s1", "rules": {"&": {"resize": "none", "min-height": "196px", "padding": "20px", "border": "1px solid var(--color-line-solid-0)", "background": "var(--color-common-100)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-18)"}}}
  ]
}
```

### C48 Auto Height Text Area

열: Small / Medium (Default) / Large / Xlarge.

```json
{
  "shared": {
    "&": {"display": "block", "width": "100%", "border": "0", "border-bottom": "1px solid var(--color-line-solid-normal)", "border-radius": "0", "outline": "0", "resize": "none", "background": "transparent", "color": "var(--color-label-normal)", "font-weight": "400", "line-height": "1.5", "height": "auto", "overflow": "hidden", "field-sizing": "content", "box-sizing": "border-box", "font-family": "inherit"}
  },
  "structures": {
    "s1": "<textarea class=\"{{component}}\" aria-label=\"예시\" placeholder=\"예시\"></textarea>"
  },
  "variants": [
    {"id": "textarea_auto_small", "size": "Small", "state": "Default", "structure": "s1", "rules": {"&": {"min-height": "40px", "padding": "8px 8px", "font-size": "var(--font-size-14)"}}, "order": {"&": ["display", "width", "min-height", "padding", "border", "border-bottom", "border-radius", "outline", "resize", "background", "color", "font-size", "font-weight", "line-height", "height", "overflow", "field-sizing", "box-sizing", "font-family"]}},
    {"id": "textarea_auto_medium", "size": "Medium (Default)", "state": "Default", "structure": "s1", "rules": {"&": {"min-height": "44px", "padding": "12px 8px", "font-size": "var(--font-size-16)"}}, "order": {"&": ["display", "width", "min-height", "padding", "border", "border-bottom", "border-radius", "outline", "resize", "background", "color", "font-size", "font-weight", "line-height", "height", "overflow", "field-sizing", "box-sizing", "font-family"]}},
    {"id": "textarea_auto_large", "size": "Large", "state": "Default", "structure": "s1", "rules": {"&": {"min-height": "52px", "padding": "12px 8px", "font-size": "var(--font-size-16)"}}, "order": {"&": ["display", "width", "min-height", "padding", "border", "border-bottom", "border-radius", "outline", "resize", "background", "color", "font-size", "font-weight", "line-height", "height", "overflow", "field-sizing", "box-sizing", "font-family"]}},
    {"id": "textarea_auto_xlarge", "size": "Xlarge", "state": "Default", "structure": "s1", "rules": {"&": {"min-height": "60px", "padding": "16px 8px", "font-size": "var(--font-size-18)"}}, "order": {"&": ["display", "width", "min-height", "padding", "border", "border-bottom", "border-radius", "outline", "resize", "background", "color", "font-size", "font-weight", "line-height", "height", "overflow", "field-sizing", "box-sizing", "font-family"]}}
  ]
}
```

### C49 Select / Filled

열: Small / Medium / Large / Xlarge.

```json
{
  "shared": {
    "&": {"position": "relative", "display": "block", "width": "100%", "min-width": "0", "box-sizing": "border-box", "font-family": "inherit"},
    "& > select": {"width": "100%", "appearance": "none", "border": "0", "border-radius": "0", "line-height": "1.5", "font-weight": "400", "box-sizing": "border-box", "font-family": "inherit", "display": "block"},
    "& > img": {"position": "absolute", "right": "12px", "top": "50%", "display": "block", "height": "auto", "transform": "translateY(-50%)", "pointer-events": "none"}
  },
  "structures": {
    "s1": "<span class=\"{{component}}\"><select aria-label=\"예시\"><option value=\"1\">Option 1</option><option value=\"2\">Option 2</option><option value=\"3\">Option 3</option></select><img class=\"{{icon_1_class}}\" src=\"{{icon_1_src}}\" alt=\"\" aria-hidden=\"true\"></span>",
    "s2": "<span class=\"{{component}}\"><select aria-label=\"예시\" disabled><option value=\"1\">Option 1</option><option value=\"2\">Option 2</option><option value=\"3\">Option 3</option></select><img class=\"{{icon_1_class}}\" src=\"{{icon_1_src}}\" alt=\"\" aria-hidden=\"true\"></span>"
  },
  "variants": [
    {"id": "select_filled_small", "size": "Small", "state": "Default", "structure": "s1", "icons": ["icon_12"], "rules": {"&": {"color": "var(--color-label-normal)"}, "& > select": {"min-height": "40px", "padding": "0 36px 0 12px", "background-color": "var(--color-fill-normal)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-14)", "cursor": "pointer"}}},
    {"id": "select_filled_medium", "size": "Medium", "state": "Default", "structure": "s1", "icons": ["icon_12"], "rules": {"&": {"color": "var(--color-label-normal)"}, "& > select": {"min-height": "44px", "padding": "0 40px 0 16px", "background-color": "var(--color-fill-normal)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-16)", "cursor": "pointer"}}},
    {"id": "select_filled_large", "size": "Large", "state": "Default", "structure": "s1", "icons": ["icon_12"], "rules": {"&": {"color": "var(--color-label-normal)"}, "& > select": {"min-height": "52px", "padding": "0 44px 0 20px", "background-color": "var(--color-fill-normal)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-16)", "cursor": "pointer"}}},
    {"id": "select_filled_xlarge", "size": "Xlarge", "state": "Default", "structure": "s1", "icons": ["icon_12"], "rules": {"&": {"color": "var(--color-label-normal)"}, "& > select": {"min-height": "60px", "padding": "0 48px 0 24px", "background-color": "var(--color-fill-normal)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-18)", "cursor": "pointer"}}},
    {"id": "select_filled_disabled_small", "size": "Small", "state": "Disabled", "structure": "s2", "icons": ["icon_12"], "rules": {"&": {"color": "var(--color-label-disable)"}, "& > select": {"min-height": "40px", "padding": "0 36px 0 12px", "background-color": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "font-size": "var(--font-size-14)", "cursor": "default"}, "& > img": {"filter": "brightness(0) invert(22%)", "opacity": "0.16"}}},
    {"id": "select_filled_disabled_medium", "size": "Medium", "state": "Disabled", "structure": "s2", "icons": ["icon_12"], "rules": {"&": {"color": "var(--color-label-disable)"}, "& > select": {"min-height": "44px", "padding": "0 40px 0 16px", "background-color": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "font-size": "var(--font-size-16)", "cursor": "default"}, "& > img": {"filter": "brightness(0) invert(22%)", "opacity": "0.16"}}},
    {"id": "select_filled_disabled_large", "size": "Large", "state": "Disabled", "structure": "s2", "icons": ["icon_12"], "rules": {"&": {"color": "var(--color-label-disable)"}, "& > select": {"min-height": "52px", "padding": "0 44px 0 20px", "background-color": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "font-size": "var(--font-size-16)", "cursor": "default"}, "& > img": {"filter": "brightness(0) invert(22%)", "opacity": "0.16"}}},
    {"id": "select_filled_disabled_xlarge", "size": "Xlarge", "state": "Disabled", "structure": "s2", "icons": ["icon_12"], "rules": {"&": {"color": "var(--color-label-disable)"}, "& > select": {"min-height": "60px", "padding": "0 48px 0 24px", "background-color": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "font-size": "var(--font-size-18)", "cursor": "default"}, "& > img": {"filter": "brightness(0) invert(22%)", "opacity": "0.16"}}}
  ]
}
```

### C50 Select / Filled+icon

열: Small / Medium (Default) / Large / Xlarge.

```json
{
  "shared": {
    "&": {"position": "relative", "display": "block", "width": "100%", "min-width": "0", "box-sizing": "border-box", "font-family": "inherit"},
    "& > select": {"width": "100%", "appearance": "none", "border": "0", "border-radius": "0", "line-height": "1.5", "font-weight": "400", "box-sizing": "border-box", "font-family": "inherit", "display": "block"},
    "& > img:first-of-type": {"position": "absolute", "top": "50%", "height": "auto", "transform": "translateY(-50%)", "pointer-events": "none"},
    "& > img:last-of-type": {"position": "absolute", "right": "12px", "top": "50%", "display": "block", "height": "auto", "transform": "translateY(-50%)", "pointer-events": "none"}
  },
  "structures": {
    "s1": "<span class=\"{{component}}\"><select aria-label=\"예시\"><option value=\"1\">Option 1</option><option value=\"2\">Option 2</option><option value=\"3\">Option 3</option></select><img class=\"{{icon_1_class}}\" src=\"{{icon_1_src}}\" alt=\"\" aria-hidden=\"true\"><img class=\"{{icon_2_class}}\" src=\"{{icon_2_src}}\" alt=\"\" aria-hidden=\"true\"></span>",
    "s2": "<span class=\"{{component}}\"><select aria-label=\"예시\" disabled><option value=\"1\">Option 1</option><option value=\"2\">Option 2</option><option value=\"3\">Option 3</option></select><img class=\"{{icon_1_class}}\" src=\"{{icon_1_src}}\" alt=\"\" aria-hidden=\"true\"><img class=\"{{icon_2_class}}\" src=\"{{icon_2_src}}\" alt=\"\" aria-hidden=\"true\"></span>"
  },
  "variants": [
    {"id": "select_filled_icon_small", "size": "Small", "state": "Default", "structure": "s1", "icons": ["icon_12", "icon_12"], "rules": {"&": {"color": "var(--color-label-normal)"}, "& > select": {"min-height": "40px", "padding": "0 36px 0 36px", "background-color": "var(--color-fill-normal)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-14)", "cursor": "pointer"}, "& > img:first-of-type": {"left": "12px"}}},
    {"id": "select_filled_icon_medium", "size": "Medium (Default)", "state": "Default", "structure": "s1", "icons": ["icon_12", "icon_12"], "rules": {"&": {"color": "var(--color-label-normal)"}, "& > select": {"min-height": "44px", "padding": "0 40px 0 40px", "background-color": "var(--color-fill-normal)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-16)", "cursor": "pointer"}, "& > img:first-of-type": {"left": "16px"}}},
    {"id": "select_filled_icon_large", "size": "Large", "state": "Default", "structure": "s1", "icons": ["icon_16", "icon_12"], "rules": {"&": {"color": "var(--color-label-normal)"}, "& > select": {"min-height": "52px", "padding": "0 44px 0 48px", "background-color": "var(--color-fill-normal)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-16)", "cursor": "pointer"}, "& > img:first-of-type": {"left": "20px"}}},
    {"id": "select_filled_icon_xlarge", "size": "Xlarge", "state": "Default", "structure": "s1", "icons": ["icon_16", "icon_12"], "rules": {"&": {"color": "var(--color-label-normal)"}, "& > select": {"min-height": "60px", "padding": "0 48px 0 52px", "background-color": "var(--color-fill-normal)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-18)", "cursor": "pointer"}, "& > img:first-of-type": {"left": "24px"}}},
    {"id": "select_filled_icon_disabled_small", "size": "Small", "state": "Disabled", "structure": "s2", "icons": ["icon_12", "icon_12"], "rules": {"&": {"color": "var(--color-label-disable)"}, "& > select": {"min-height": "40px", "padding": "0 36px 0 36px", "background-color": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "font-size": "var(--font-size-14)", "cursor": "default"}, "& > img:first-of-type": {"left": "12px", "filter": "brightness(0) invert(22%)", "opacity": "0.16"}, "& > img:last-of-type": {"filter": "brightness(0) invert(22%)", "opacity": "0.16"}}},
    {"id": "select_filled_icon_disabled_medium", "size": "Medium (Default)", "state": "Disabled", "structure": "s2", "icons": ["icon_12", "icon_12"], "rules": {"&": {"color": "var(--color-label-disable)"}, "& > select": {"min-height": "44px", "padding": "0 40px 0 40px", "background-color": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "font-size": "var(--font-size-16)", "cursor": "default"}, "& > img:first-of-type": {"left": "16px", "filter": "brightness(0) invert(22%)", "opacity": "0.16"}, "& > img:last-of-type": {"filter": "brightness(0) invert(22%)", "opacity": "0.16"}}},
    {"id": "select_filled_icon_disabled_large", "size": "Large", "state": "Disabled", "structure": "s2", "icons": ["icon_16", "icon_12"], "rules": {"&": {"color": "var(--color-label-disable)"}, "& > select": {"min-height": "52px", "padding": "0 44px 0 48px", "background-color": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "font-size": "var(--font-size-16)", "cursor": "default"}, "& > img:first-of-type": {"left": "20px", "filter": "brightness(0) invert(22%)", "opacity": "0.16"}, "& > img:last-of-type": {"filter": "brightness(0) invert(22%)", "opacity": "0.16"}}},
    {"id": "select_filled_icon_disabled_xlarge", "size": "Xlarge", "state": "Disabled", "structure": "s2", "icons": ["icon_16", "icon_12"], "rules": {"&": {"color": "var(--color-label-disable)"}, "& > select": {"min-height": "60px", "padding": "0 48px 0 52px", "background-color": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "font-size": "var(--font-size-18)", "cursor": "default"}, "& > img:first-of-type": {"left": "24px", "filter": "brightness(0) invert(22%)", "opacity": "0.16"}, "& > img:last-of-type": {"filter": "brightness(0) invert(22%)", "opacity": "0.16"}}}
  ]
}
```

### C51 Select / Filled Rounded

열: Small / Medium (Default) / Large / Xlarge.

```json
{
  "shared": {
    "&": {"position": "relative", "display": "block", "width": "100%", "min-width": "0", "box-sizing": "border-box", "font-family": "inherit"},
    "& > select": {"width": "100%", "appearance": "none", "border": "0", "border-radius": "8px", "line-height": "1.5", "font-weight": "400", "box-sizing": "border-box", "font-family": "inherit", "display": "block"},
    "& > img": {"position": "absolute", "right": "12px", "top": "50%", "display": "block", "height": "auto", "transform": "translateY(-50%)", "pointer-events": "none"}
  },
  "structures": {
    "s1": "<span class=\"{{component}}\"><select aria-label=\"예시\"><option value=\"1\">Option 1</option><option value=\"2\">Option 2</option><option value=\"3\">Option 3</option></select><img class=\"{{icon_1_class}}\" src=\"{{icon_1_src}}\" alt=\"\" aria-hidden=\"true\"></span>",
    "s2": "<span class=\"{{component}}\"><select aria-label=\"예시\" disabled><option value=\"1\">Option 1</option><option value=\"2\">Option 2</option><option value=\"3\">Option 3</option></select><img class=\"{{icon_1_class}}\" src=\"{{icon_1_src}}\" alt=\"\" aria-hidden=\"true\"></span>"
  },
  "variants": [
    {"id": "select_filled_rounded_small", "size": "Small", "state": "Default", "structure": "s1", "icons": ["icon_12"], "rules": {"&": {"color": "var(--color-label-normal)"}, "& > select": {"min-height": "40px", "padding": "0 36px 0 12px", "background-color": "var(--color-fill-normal)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-14)", "cursor": "pointer"}}},
    {"id": "select_filled_rounded_medium", "size": "Medium (Default)", "state": "Default", "structure": "s1", "icons": ["icon_12"], "rules": {"&": {"color": "var(--color-label-normal)"}, "& > select": {"min-height": "44px", "padding": "0 40px 0 16px", "background-color": "var(--color-fill-normal)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-16)", "cursor": "pointer"}}},
    {"id": "select_filled_rounded_large", "size": "Large", "state": "Default", "structure": "s1", "icons": ["icon_12"], "rules": {"&": {"color": "var(--color-label-normal)"}, "& > select": {"min-height": "52px", "padding": "0 44px 0 20px", "background-color": "var(--color-fill-normal)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-16)", "cursor": "pointer"}}},
    {"id": "select_filled_rounded_xlarge", "size": "Xlarge", "state": "Default", "structure": "s1", "icons": ["icon_12"], "rules": {"&": {"color": "var(--color-label-normal)"}, "& > select": {"min-height": "60px", "padding": "0 48px 0 24px", "background-color": "var(--color-fill-normal)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-18)", "cursor": "pointer"}}},
    {"id": "select_filled_rounded_disabled_small", "size": "Small", "state": "Disabled", "structure": "s2", "icons": ["icon_12"], "rules": {"&": {"color": "var(--color-label-disable)"}, "& > select": {"min-height": "40px", "padding": "0 36px 0 12px", "background-color": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "font-size": "var(--font-size-14)", "cursor": "default"}, "& > img": {"filter": "brightness(0) invert(22%)", "opacity": "0.16"}}},
    {"id": "select_filled_rounded_disabled_medium", "size": "Medium (Default)", "state": "Disabled", "structure": "s2", "icons": ["icon_12"], "rules": {"&": {"color": "var(--color-label-disable)"}, "& > select": {"min-height": "44px", "padding": "0 40px 0 16px", "background-color": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "font-size": "var(--font-size-16)", "cursor": "default"}, "& > img": {"filter": "brightness(0) invert(22%)", "opacity": "0.16"}}},
    {"id": "select_filled_rounded_disabled_large", "size": "Large", "state": "Disabled", "structure": "s2", "icons": ["icon_12"], "rules": {"&": {"color": "var(--color-label-disable)"}, "& > select": {"min-height": "52px", "padding": "0 44px 0 20px", "background-color": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "font-size": "var(--font-size-16)", "cursor": "default"}, "& > img": {"filter": "brightness(0) invert(22%)", "opacity": "0.16"}}},
    {"id": "select_filled_rounded_disabled_xlarge", "size": "Xlarge", "state": "Disabled", "structure": "s2", "icons": ["icon_12"], "rules": {"&": {"color": "var(--color-label-disable)"}, "& > select": {"min-height": "60px", "padding": "0 48px 0 24px", "background-color": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "font-size": "var(--font-size-18)", "cursor": "default"}, "& > img": {"filter": "brightness(0) invert(22%)", "opacity": "0.16"}}}
  ]
}
```

### C52 Select / Filled Rounded+icon

열: Small / Medium (Default) / Large / Xlarge.

```json
{
  "shared": {
    "&": {"position": "relative", "display": "block", "width": "100%", "min-width": "0", "box-sizing": "border-box", "font-family": "inherit"},
    "& > select": {"width": "100%", "appearance": "none", "border": "0", "border-radius": "8px", "line-height": "1.5", "font-weight": "400", "box-sizing": "border-box", "font-family": "inherit", "display": "block"},
    "& > img:first-of-type": {"position": "absolute", "top": "50%", "height": "auto", "transform": "translateY(-50%)", "pointer-events": "none"},
    "& > img:last-of-type": {"position": "absolute", "right": "12px", "top": "50%", "display": "block", "height": "auto", "transform": "translateY(-50%)", "pointer-events": "none"}
  },
  "structures": {
    "s1": "<span class=\"{{component}}\"><select aria-label=\"예시\"><option value=\"1\">Option 1</option><option value=\"2\">Option 2</option><option value=\"3\">Option 3</option></select><img class=\"{{icon_1_class}}\" src=\"{{icon_1_src}}\" alt=\"\" aria-hidden=\"true\"><img class=\"{{icon_2_class}}\" src=\"{{icon_2_src}}\" alt=\"\" aria-hidden=\"true\"></span>",
    "s2": "<span class=\"{{component}}\"><select aria-label=\"예시\" disabled><option value=\"1\">Option 1</option><option value=\"2\">Option 2</option><option value=\"3\">Option 3</option></select><img class=\"{{icon_1_class}}\" src=\"{{icon_1_src}}\" alt=\"\" aria-hidden=\"true\"><img class=\"{{icon_2_class}}\" src=\"{{icon_2_src}}\" alt=\"\" aria-hidden=\"true\"></span>"
  },
  "variants": [
    {"id": "select_filled_rounded_icon_small", "size": "Small", "state": "Default", "structure": "s1", "icons": ["icon_12", "icon_12"], "rules": {"&": {"color": "var(--color-label-normal)"}, "& > select": {"min-height": "40px", "padding": "0 36px 0 36px", "background-color": "var(--color-fill-normal)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-14)", "cursor": "pointer"}, "& > img:first-of-type": {"left": "12px"}}},
    {"id": "select_filled_rounded_icon_medium", "size": "Medium (Default)", "state": "Default", "structure": "s1", "icons": ["icon_12", "icon_12"], "rules": {"&": {"color": "var(--color-label-normal)"}, "& > select": {"min-height": "44px", "padding": "0 40px 0 40px", "background-color": "var(--color-fill-normal)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-16)", "cursor": "pointer"}, "& > img:first-of-type": {"left": "16px"}}},
    {"id": "select_filled_rounded_icon_large", "size": "Large", "state": "Default", "structure": "s1", "icons": ["icon_16", "icon_12"], "rules": {"&": {"color": "var(--color-label-normal)"}, "& > select": {"min-height": "52px", "padding": "0 44px 0 48px", "background-color": "var(--color-fill-normal)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-16)", "cursor": "pointer"}, "& > img:first-of-type": {"left": "20px"}}},
    {"id": "select_filled_rounded_icon_xlarge", "size": "Xlarge", "state": "Default", "structure": "s1", "icons": ["icon_16", "icon_12"], "rules": {"&": {"color": "var(--color-label-normal)"}, "& > select": {"min-height": "60px", "padding": "0 48px 0 52px", "background-color": "var(--color-fill-normal)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-18)", "cursor": "pointer"}, "& > img:first-of-type": {"left": "24px"}}},
    {"id": "select_filled_rounded_icon_disabled_small", "size": "Small", "state": "Disabled", "structure": "s2", "icons": ["icon_12", "icon_12"], "rules": {"&": {"color": "var(--color-label-disable)"}, "& > select": {"min-height": "40px", "padding": "0 36px 0 36px", "background-color": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "font-size": "var(--font-size-14)", "cursor": "default"}, "& > img:first-of-type": {"left": "12px", "filter": "brightness(0) invert(22%)", "opacity": "0.16"}, "& > img:last-of-type": {"filter": "brightness(0) invert(22%)", "opacity": "0.16"}}},
    {"id": "select_filled_rounded_icon_disabled_medium", "size": "Medium (Default)", "state": "Disabled", "structure": "s2", "icons": ["icon_12", "icon_12"], "rules": {"&": {"color": "var(--color-label-disable)"}, "& > select": {"min-height": "44px", "padding": "0 40px 0 40px", "background-color": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "font-size": "var(--font-size-16)", "cursor": "default"}, "& > img:first-of-type": {"left": "16px", "filter": "brightness(0) invert(22%)", "opacity": "0.16"}, "& > img:last-of-type": {"filter": "brightness(0) invert(22%)", "opacity": "0.16"}}},
    {"id": "select_filled_rounded_icon_disabled_large", "size": "Large", "state": "Disabled", "structure": "s2", "icons": ["icon_16", "icon_12"], "rules": {"&": {"color": "var(--color-label-disable)"}, "& > select": {"min-height": "52px", "padding": "0 44px 0 48px", "background-color": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "font-size": "var(--font-size-16)", "cursor": "default"}, "& > img:first-of-type": {"left": "20px", "filter": "brightness(0) invert(22%)", "opacity": "0.16"}, "& > img:last-of-type": {"filter": "brightness(0) invert(22%)", "opacity": "0.16"}}},
    {"id": "select_filled_rounded_icon_disabled_xlarge", "size": "Xlarge", "state": "Disabled", "structure": "s2", "icons": ["icon_16", "icon_12"], "rules": {"&": {"color": "var(--color-label-disable)"}, "& > select": {"min-height": "60px", "padding": "0 48px 0 52px", "background-color": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "font-size": "var(--font-size-18)", "cursor": "default"}, "& > img:first-of-type": {"left": "24px", "filter": "brightness(0) invert(22%)", "opacity": "0.16"}, "& > img:last-of-type": {"filter": "brightness(0) invert(22%)", "opacity": "0.16"}}}
  ]
}
```

### C53 Select / Filled Full Rounded

열: Small / Medium (Default) / Large / Xlarge.

```json
{
  "shared": {
    "&": {"position": "relative", "display": "block", "width": "100%", "min-width": "0", "box-sizing": "border-box", "font-family": "inherit"},
    "& > select": {"width": "100%", "appearance": "none", "border": "0", "border-radius": "9999px", "line-height": "1.5", "font-weight": "400", "box-sizing": "border-box", "font-family": "inherit", "display": "block"},
    "& > img": {"position": "absolute", "right": "12px", "top": "50%", "display": "block", "height": "auto", "transform": "translateY(-50%)", "pointer-events": "none"}
  },
  "structures": {
    "s1": "<span class=\"{{component}}\"><select aria-label=\"예시\"><option value=\"1\">Option 1</option><option value=\"2\">Option 2</option><option value=\"3\">Option 3</option></select><img class=\"{{icon_1_class}}\" src=\"{{icon_1_src}}\" alt=\"\" aria-hidden=\"true\"></span>",
    "s2": "<span class=\"{{component}}\"><select aria-label=\"예시\" disabled><option value=\"1\">Option 1</option><option value=\"2\">Option 2</option><option value=\"3\">Option 3</option></select><img class=\"{{icon_1_class}}\" src=\"{{icon_1_src}}\" alt=\"\" aria-hidden=\"true\"></span>"
  },
  "variants": [
    {"id": "select_filled_full_rounded_small", "size": "Small", "state": "Default", "structure": "s1", "icons": ["icon_12"], "rules": {"&": {"color": "var(--color-label-normal)"}, "& > select": {"min-height": "40px", "padding": "0 36px 0 12px", "background-color": "var(--color-fill-normal)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-14)", "cursor": "pointer"}}},
    {"id": "select_filled_full_rounded_medium", "size": "Medium (Default)", "state": "Default", "structure": "s1", "icons": ["icon_12"], "rules": {"&": {"color": "var(--color-label-normal)"}, "& > select": {"min-height": "44px", "padding": "0 40px 0 16px", "background-color": "var(--color-fill-normal)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-16)", "cursor": "pointer"}}},
    {"id": "select_filled_full_rounded_large", "size": "Large", "state": "Default", "structure": "s1", "icons": ["icon_12"], "rules": {"&": {"color": "var(--color-label-normal)"}, "& > select": {"min-height": "52px", "padding": "0 44px 0 20px", "background-color": "var(--color-fill-normal)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-16)", "cursor": "pointer"}}},
    {"id": "select_filled_full_rounded_xlarge", "size": "Xlarge", "state": "Default", "structure": "s1", "icons": ["icon_12"], "rules": {"&": {"color": "var(--color-label-normal)"}, "& > select": {"min-height": "60px", "padding": "0 48px 0 24px", "background-color": "var(--color-fill-normal)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-18)", "cursor": "pointer"}}},
    {"id": "select_filled_full_rounded_disabled_small", "size": "Small", "state": "Disabled", "structure": "s2", "icons": ["icon_12"], "rules": {"&": {"color": "var(--color-label-disable)"}, "& > select": {"min-height": "40px", "padding": "0 36px 0 12px", "background-color": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "font-size": "var(--font-size-14)", "cursor": "default"}, "& > img": {"filter": "brightness(0) invert(22%)", "opacity": "0.16"}}},
    {"id": "select_filled_full_rounded_disabled_medium", "size": "Medium (Default)", "state": "Disabled", "structure": "s2", "icons": ["icon_12"], "rules": {"&": {"color": "var(--color-label-disable)"}, "& > select": {"min-height": "44px", "padding": "0 40px 0 16px", "background-color": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "font-size": "var(--font-size-16)", "cursor": "default"}, "& > img": {"filter": "brightness(0) invert(22%)", "opacity": "0.16"}}},
    {"id": "select_filled_full_rounded_disabled_large", "size": "Large", "state": "Disabled", "structure": "s2", "icons": ["icon_12"], "rules": {"&": {"color": "var(--color-label-disable)"}, "& > select": {"min-height": "52px", "padding": "0 44px 0 20px", "background-color": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "font-size": "var(--font-size-16)", "cursor": "default"}, "& > img": {"filter": "brightness(0) invert(22%)", "opacity": "0.16"}}},
    {"id": "select_filled_full_rounded_disabled_xlarge", "size": "Xlarge", "state": "Disabled", "structure": "s2", "icons": ["icon_12"], "rules": {"&": {"color": "var(--color-label-disable)"}, "& > select": {"min-height": "60px", "padding": "0 48px 0 24px", "background-color": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "font-size": "var(--font-size-18)", "cursor": "default"}, "& > img": {"filter": "brightness(0) invert(22%)", "opacity": "0.16"}}}
  ]
}
```

### C54 Select / Filled Full Rounded+icon

열: Small / Medium (Default) / Large / Xlarge.

```json
{
  "shared": {
    "&": {"position": "relative", "display": "block", "width": "100%", "min-width": "0", "box-sizing": "border-box", "font-family": "inherit"},
    "& > select": {"width": "100%", "appearance": "none", "border": "0", "border-radius": "9999px", "line-height": "1.5", "font-weight": "400", "box-sizing": "border-box", "font-family": "inherit", "display": "block"},
    "& > img:first-of-type": {"position": "absolute", "top": "50%", "height": "auto", "transform": "translateY(-50%)", "pointer-events": "none"},
    "& > img:last-of-type": {"position": "absolute", "right": "12px", "top": "50%", "display": "block", "height": "auto", "transform": "translateY(-50%)", "pointer-events": "none"}
  },
  "structures": {
    "s1": "<span class=\"{{component}}\"><select aria-label=\"예시\"><option value=\"1\">Option 1</option><option value=\"2\">Option 2</option><option value=\"3\">Option 3</option></select><img class=\"{{icon_1_class}}\" src=\"{{icon_1_src}}\" alt=\"\" aria-hidden=\"true\"><img class=\"{{icon_2_class}}\" src=\"{{icon_2_src}}\" alt=\"\" aria-hidden=\"true\"></span>",
    "s2": "<span class=\"{{component}}\"><select aria-label=\"예시\" disabled><option value=\"1\">Option 1</option><option value=\"2\">Option 2</option><option value=\"3\">Option 3</option></select><img class=\"{{icon_1_class}}\" src=\"{{icon_1_src}}\" alt=\"\" aria-hidden=\"true\"><img class=\"{{icon_2_class}}\" src=\"{{icon_2_src}}\" alt=\"\" aria-hidden=\"true\"></span>"
  },
  "variants": [
    {"id": "select_filled_full_rounded_icon_small", "size": "Small", "state": "Default", "structure": "s1", "icons": ["icon_12", "icon_12"], "rules": {"&": {"color": "var(--color-label-normal)"}, "& > select": {"min-height": "40px", "padding": "0 36px 0 36px", "background-color": "var(--color-fill-normal)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-14)", "cursor": "pointer"}, "& > img:first-of-type": {"left": "12px"}}},
    {"id": "select_filled_full_rounded_icon_medium", "size": "Medium (Default)", "state": "Default", "structure": "s1", "icons": ["icon_12", "icon_12"], "rules": {"&": {"color": "var(--color-label-normal)"}, "& > select": {"min-height": "44px", "padding": "0 40px 0 40px", "background-color": "var(--color-fill-normal)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-16)", "cursor": "pointer"}, "& > img:first-of-type": {"left": "16px"}}},
    {"id": "select_filled_full_rounded_icon_large", "size": "Large", "state": "Default", "structure": "s1", "icons": ["icon_16", "icon_12"], "rules": {"&": {"color": "var(--color-label-normal)"}, "& > select": {"min-height": "52px", "padding": "0 44px 0 48px", "background-color": "var(--color-fill-normal)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-16)", "cursor": "pointer"}, "& > img:first-of-type": {"left": "20px"}}},
    {"id": "select_filled_full_rounded_icon_xlarge", "size": "Xlarge", "state": "Default", "structure": "s1", "icons": ["icon_16", "icon_12"], "rules": {"&": {"color": "var(--color-label-normal)"}, "& > select": {"min-height": "60px", "padding": "0 48px 0 52px", "background-color": "var(--color-fill-normal)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-18)", "cursor": "pointer"}, "& > img:first-of-type": {"left": "24px"}}},
    {"id": "select_filled_full_rounded_icon_disabled_small", "size": "Small", "state": "Disabled", "structure": "s2", "icons": ["icon_12", "icon_12"], "rules": {"&": {"color": "var(--color-label-disable)"}, "& > select": {"min-height": "40px", "padding": "0 36px 0 36px", "background-color": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "font-size": "var(--font-size-14)", "cursor": "default"}, "& > img:first-of-type": {"left": "12px", "filter": "brightness(0) invert(22%)", "opacity": "0.16"}, "& > img:last-of-type": {"filter": "brightness(0) invert(22%)", "opacity": "0.16"}}},
    {"id": "select_filled_full_rounded_icon_disabled_medium", "size": "Medium (Default)", "state": "Disabled", "structure": "s2", "icons": ["icon_12", "icon_12"], "rules": {"&": {"color": "var(--color-label-disable)"}, "& > select": {"min-height": "44px", "padding": "0 40px 0 40px", "background-color": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "font-size": "var(--font-size-16)", "cursor": "default"}, "& > img:first-of-type": {"left": "16px", "filter": "brightness(0) invert(22%)", "opacity": "0.16"}, "& > img:last-of-type": {"filter": "brightness(0) invert(22%)", "opacity": "0.16"}}},
    {"id": "select_filled_full_rounded_icon_disabled_large", "size": "Large", "state": "Disabled", "structure": "s2", "icons": ["icon_16", "icon_12"], "rules": {"&": {"color": "var(--color-label-disable)"}, "& > select": {"min-height": "52px", "padding": "0 44px 0 48px", "background-color": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "font-size": "var(--font-size-16)", "cursor": "default"}, "& > img:first-of-type": {"left": "20px", "filter": "brightness(0) invert(22%)", "opacity": "0.16"}, "& > img:last-of-type": {"filter": "brightness(0) invert(22%)", "opacity": "0.16"}}},
    {"id": "select_filled_full_rounded_icon_disabled_xlarge", "size": "Xlarge", "state": "Disabled", "structure": "s2", "icons": ["icon_16", "icon_12"], "rules": {"&": {"color": "var(--color-label-disable)"}, "& > select": {"min-height": "60px", "padding": "0 48px 0 52px", "background-color": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "font-size": "var(--font-size-18)", "cursor": "default"}, "& > img:first-of-type": {"left": "24px", "filter": "brightness(0) invert(22%)", "opacity": "0.16"}, "& > img:last-of-type": {"filter": "brightness(0) invert(22%)", "opacity": "0.16"}}}
  ]
}
```

### C55 Select / Outline

열: Small / Medium / Large / Xlarge.

```json
{
  "shared": {
    "&": {"position": "relative", "display": "block", "width": "100%", "min-width": "0", "box-sizing": "border-box", "font-family": "inherit"},
    "& > select": {"width": "100%", "appearance": "none", "border-radius": "0", "line-height": "1.5", "font-weight": "400", "box-sizing": "border-box", "font-family": "inherit", "display": "block"},
    "& > img": {"position": "absolute", "right": "12px", "top": "50%", "display": "block", "height": "auto", "transform": "translateY(-50%)", "pointer-events": "none"}
  },
  "structures": {
    "s1": "<span class=\"{{component}}\"><select aria-label=\"예시\"><option value=\"1\">Option 1</option><option value=\"2\">Option 2</option><option value=\"3\">Option 3</option></select><img class=\"{{icon_1_class}}\" src=\"{{icon_1_src}}\" alt=\"\" aria-hidden=\"true\"></span>",
    "s2": "<span class=\"{{component}}\"><select aria-label=\"예시\" disabled><option value=\"1\">Option 1</option><option value=\"2\">Option 2</option><option value=\"3\">Option 3</option></select><img class=\"{{icon_1_class}}\" src=\"{{icon_1_src}}\" alt=\"\" aria-hidden=\"true\"></span>"
  },
  "variants": [
    {"id": "select_outline_small", "size": "Small", "state": "Default", "structure": "s1", "icons": ["icon_12"], "rules": {"&": {"color": "var(--color-label-normal)"}, "& > select": {"min-height": "40px", "padding": "0 36px 0 12px", "border": "1px solid var(--color-line-solid-0)", "background-color": "var(--color-common-100)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-14)", "cursor": "pointer"}}},
    {"id": "select_outline_medium", "size": "Medium", "state": "Default", "structure": "s1", "icons": ["icon_12"], "rules": {"&": {"color": "var(--color-label-normal)"}, "& > select": {"min-height": "44px", "padding": "0 40px 0 16px", "border": "1px solid var(--color-line-solid-0)", "background-color": "var(--color-common-100)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-16)", "cursor": "pointer"}}},
    {"id": "select_outline_large", "size": "Large", "state": "Default", "structure": "s1", "icons": ["icon_12"], "rules": {"&": {"color": "var(--color-label-normal)"}, "& > select": {"min-height": "52px", "padding": "0 44px 0 20px", "border": "1px solid var(--color-line-solid-0)", "background-color": "var(--color-common-100)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-16)", "cursor": "pointer"}}},
    {"id": "select_outline_xlarge", "size": "Xlarge", "state": "Default", "structure": "s1", "icons": ["icon_12"], "rules": {"&": {"color": "var(--color-label-normal)"}, "& > select": {"min-height": "60px", "padding": "0 48px 0 24px", "border": "1px solid var(--color-line-solid-0)", "background-color": "var(--color-common-100)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-18)", "cursor": "pointer"}}},
    {"id": "select_outline_disabled_small", "size": "Small", "state": "Disabled", "structure": "s2", "icons": ["icon_12"], "rules": {"&": {"color": "var(--color-label-disable)"}, "& > select": {"min-height": "40px", "padding": "0 36px 0 12px", "border": "0", "background-color": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "font-size": "var(--font-size-14)", "cursor": "default"}, "& > img": {"filter": "brightness(0) invert(22%)", "opacity": "0.16"}}},
    {"id": "select_outline_disabled_medium", "size": "Medium", "state": "Disabled", "structure": "s2", "icons": ["icon_12"], "rules": {"&": {"color": "var(--color-label-disable)"}, "& > select": {"min-height": "44px", "padding": "0 40px 0 16px", "border": "0", "background-color": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "font-size": "var(--font-size-16)", "cursor": "default"}, "& > img": {"filter": "brightness(0) invert(22%)", "opacity": "0.16"}}},
    {"id": "select_outline_disabled_large", "size": "Large", "state": "Disabled", "structure": "s2", "icons": ["icon_12"], "rules": {"&": {"color": "var(--color-label-disable)"}, "& > select": {"min-height": "52px", "padding": "0 44px 0 20px", "border": "0", "background-color": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "font-size": "var(--font-size-16)", "cursor": "default"}, "& > img": {"filter": "brightness(0) invert(22%)", "opacity": "0.16"}}},
    {"id": "select_outline_disabled_xlarge", "size": "Xlarge", "state": "Disabled", "structure": "s2", "icons": ["icon_12"], "rules": {"&": {"color": "var(--color-label-disable)"}, "& > select": {"min-height": "60px", "padding": "0 48px 0 24px", "border": "0", "background-color": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "font-size": "var(--font-size-18)", "cursor": "default"}, "& > img": {"filter": "brightness(0) invert(22%)", "opacity": "0.16"}}}
  ]
}
```

### C56 Select / Outline+icon

열: Small / Medium (Default) / Large / Xlarge.

```json
{
  "shared": {
    "&": {"position": "relative", "display": "block", "width": "100%", "min-width": "0", "box-sizing": "border-box", "font-family": "inherit"},
    "& > select": {"width": "100%", "appearance": "none", "border-radius": "0", "line-height": "1.5", "font-weight": "400", "box-sizing": "border-box", "font-family": "inherit", "display": "block"},
    "& > img:first-of-type": {"position": "absolute", "top": "50%", "height": "auto", "transform": "translateY(-50%)", "pointer-events": "none"},
    "& > img:last-of-type": {"position": "absolute", "right": "12px", "top": "50%", "display": "block", "height": "auto", "transform": "translateY(-50%)", "pointer-events": "none"}
  },
  "structures": {
    "s1": "<span class=\"{{component}}\"><select aria-label=\"예시\"><option value=\"1\">Option 1</option><option value=\"2\">Option 2</option><option value=\"3\">Option 3</option></select><img class=\"{{icon_1_class}}\" src=\"{{icon_1_src}}\" alt=\"\" aria-hidden=\"true\"><img class=\"{{icon_2_class}}\" src=\"{{icon_2_src}}\" alt=\"\" aria-hidden=\"true\"></span>",
    "s2": "<span class=\"{{component}}\"><select aria-label=\"예시\" disabled><option value=\"1\">Option 1</option><option value=\"2\">Option 2</option><option value=\"3\">Option 3</option></select><img class=\"{{icon_1_class}}\" src=\"{{icon_1_src}}\" alt=\"\" aria-hidden=\"true\"><img class=\"{{icon_2_class}}\" src=\"{{icon_2_src}}\" alt=\"\" aria-hidden=\"true\"></span>"
  },
  "variants": [
    {"id": "select_outline_icon_small", "size": "Small", "state": "Default", "structure": "s1", "icons": ["icon_12", "icon_12"], "rules": {"&": {"color": "var(--color-label-normal)"}, "& > select": {"min-height": "40px", "padding": "0 36px 0 36px", "border": "1px solid var(--color-line-solid-0)", "background-color": "var(--color-common-100)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-14)", "cursor": "pointer"}, "& > img:first-of-type": {"left": "12px"}}},
    {"id": "select_outline_icon_medium", "size": "Medium (Default)", "state": "Default", "structure": "s1", "icons": ["icon_12", "icon_12"], "rules": {"&": {"color": "var(--color-label-normal)"}, "& > select": {"min-height": "44px", "padding": "0 40px 0 40px", "border": "1px solid var(--color-line-solid-0)", "background-color": "var(--color-common-100)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-16)", "cursor": "pointer"}, "& > img:first-of-type": {"left": "16px"}}},
    {"id": "select_outline_icon_large", "size": "Large", "state": "Default", "structure": "s1", "icons": ["icon_16", "icon_12"], "rules": {"&": {"color": "var(--color-label-normal)"}, "& > select": {"min-height": "52px", "padding": "0 44px 0 48px", "border": "1px solid var(--color-line-solid-0)", "background-color": "var(--color-common-100)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-16)", "cursor": "pointer"}, "& > img:first-of-type": {"left": "20px"}}},
    {"id": "select_outline_icon_xlarge", "size": "Xlarge", "state": "Default", "structure": "s1", "icons": ["icon_16", "icon_12"], "rules": {"&": {"color": "var(--color-label-normal)"}, "& > select": {"min-height": "60px", "padding": "0 48px 0 52px", "border": "1px solid var(--color-line-solid-0)", "background-color": "var(--color-common-100)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-18)", "cursor": "pointer"}, "& > img:first-of-type": {"left": "24px"}}},
    {"id": "select_outline_icon_disabled_small", "size": "Small", "state": "Disabled", "structure": "s2", "icons": ["icon_12", "icon_12"], "rules": {"&": {"color": "var(--color-label-disable)"}, "& > select": {"min-height": "40px", "padding": "0 36px 0 36px", "border": "0", "background-color": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "font-size": "var(--font-size-14)", "cursor": "default"}, "& > img:first-of-type": {"left": "12px", "filter": "brightness(0) invert(22%)", "opacity": "0.16"}, "& > img:last-of-type": {"filter": "brightness(0) invert(22%)", "opacity": "0.16"}}},
    {"id": "select_outline_icon_disabled_medium", "size": "Medium (Default)", "state": "Disabled", "structure": "s2", "icons": ["icon_12", "icon_12"], "rules": {"&": {"color": "var(--color-label-disable)"}, "& > select": {"min-height": "44px", "padding": "0 40px 0 40px", "border": "0", "background-color": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "font-size": "var(--font-size-16)", "cursor": "default"}, "& > img:first-of-type": {"left": "16px", "filter": "brightness(0) invert(22%)", "opacity": "0.16"}, "& > img:last-of-type": {"filter": "brightness(0) invert(22%)", "opacity": "0.16"}}},
    {"id": "select_outline_icon_disabled_large", "size": "Large", "state": "Disabled", "structure": "s2", "icons": ["icon_16", "icon_12"], "rules": {"&": {"color": "var(--color-label-disable)"}, "& > select": {"min-height": "52px", "padding": "0 44px 0 48px", "border": "0", "background-color": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "font-size": "var(--font-size-16)", "cursor": "default"}, "& > img:first-of-type": {"left": "20px", "filter": "brightness(0) invert(22%)", "opacity": "0.16"}, "& > img:last-of-type": {"filter": "brightness(0) invert(22%)", "opacity": "0.16"}}},
    {"id": "select_outline_icon_disabled_xlarge", "size": "Xlarge", "state": "Disabled", "structure": "s2", "icons": ["icon_16", "icon_12"], "rules": {"&": {"color": "var(--color-label-disable)"}, "& > select": {"min-height": "60px", "padding": "0 48px 0 52px", "border": "0", "background-color": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "font-size": "var(--font-size-18)", "cursor": "default"}, "& > img:first-of-type": {"left": "24px", "filter": "brightness(0) invert(22%)", "opacity": "0.16"}, "& > img:last-of-type": {"filter": "brightness(0) invert(22%)", "opacity": "0.16"}}}
  ]
}
```

### C57 Select / Outline Rounded

열: Small / Medium (Default) / Large / Xlarge.

```json
{
  "shared": {
    "&": {"position": "relative", "display": "block", "width": "100%", "min-width": "0", "box-sizing": "border-box", "font-family": "inherit"},
    "& > select": {"width": "100%", "appearance": "none", "border-radius": "8px", "line-height": "1.5", "font-weight": "400", "box-sizing": "border-box", "font-family": "inherit", "display": "block"},
    "& > img": {"position": "absolute", "right": "12px", "top": "50%", "display": "block", "height": "auto", "transform": "translateY(-50%)", "pointer-events": "none"}
  },
  "structures": {
    "s1": "<span class=\"{{component}}\"><select aria-label=\"예시\"><option value=\"1\">Option 1</option><option value=\"2\">Option 2</option><option value=\"3\">Option 3</option></select><img class=\"{{icon_1_class}}\" src=\"{{icon_1_src}}\" alt=\"\" aria-hidden=\"true\"></span>",
    "s2": "<span class=\"{{component}}\"><select aria-label=\"예시\" disabled><option value=\"1\">Option 1</option><option value=\"2\">Option 2</option><option value=\"3\">Option 3</option></select><img class=\"{{icon_1_class}}\" src=\"{{icon_1_src}}\" alt=\"\" aria-hidden=\"true\"></span>"
  },
  "variants": [
    {"id": "select_outline_rounded_small", "size": "Small", "state": "Default", "structure": "s1", "icons": ["icon_12"], "rules": {"&": {"color": "var(--color-label-normal)"}, "& > select": {"min-height": "40px", "padding": "0 36px 0 12px", "border": "1px solid var(--color-line-solid-0)", "background-color": "var(--color-common-100)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-14)", "cursor": "pointer"}}},
    {"id": "select_outline_rounded_medium", "size": "Medium (Default)", "state": "Default", "structure": "s1", "icons": ["icon_12"], "rules": {"&": {"color": "var(--color-label-normal)"}, "& > select": {"min-height": "44px", "padding": "0 40px 0 16px", "border": "1px solid var(--color-line-solid-0)", "background-color": "var(--color-common-100)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-16)", "cursor": "pointer"}}},
    {"id": "select_outline_rounded_large", "size": "Large", "state": "Default", "structure": "s1", "icons": ["icon_12"], "rules": {"&": {"color": "var(--color-label-normal)"}, "& > select": {"min-height": "52px", "padding": "0 44px 0 20px", "border": "1px solid var(--color-line-solid-0)", "background-color": "var(--color-common-100)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-16)", "cursor": "pointer"}}},
    {"id": "select_outline_rounded_xlarge", "size": "Xlarge", "state": "Default", "structure": "s1", "icons": ["icon_12"], "rules": {"&": {"color": "var(--color-label-normal)"}, "& > select": {"min-height": "60px", "padding": "0 48px 0 24px", "border": "1px solid var(--color-line-solid-0)", "background-color": "var(--color-common-100)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-18)", "cursor": "pointer"}}},
    {"id": "select_outline_rounded_disabled_small", "size": "Small", "state": "Disabled", "structure": "s2", "icons": ["icon_12"], "rules": {"&": {"color": "var(--color-label-disable)"}, "& > select": {"min-height": "40px", "padding": "0 36px 0 12px", "border": "0", "background-color": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "font-size": "var(--font-size-14)", "cursor": "default"}, "& > img": {"filter": "brightness(0) invert(22%)", "opacity": "0.16"}}},
    {"id": "select_outline_rounded_disabled_medium", "size": "Medium (Default)", "state": "Disabled", "structure": "s2", "icons": ["icon_12"], "rules": {"&": {"color": "var(--color-label-disable)"}, "& > select": {"min-height": "44px", "padding": "0 40px 0 16px", "border": "0", "background-color": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "font-size": "var(--font-size-16)", "cursor": "default"}, "& > img": {"filter": "brightness(0) invert(22%)", "opacity": "0.16"}}},
    {"id": "select_outline_rounded_disabled_large", "size": "Large", "state": "Disabled", "structure": "s2", "icons": ["icon_12"], "rules": {"&": {"color": "var(--color-label-disable)"}, "& > select": {"min-height": "52px", "padding": "0 44px 0 20px", "border": "0", "background-color": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "font-size": "var(--font-size-16)", "cursor": "default"}, "& > img": {"filter": "brightness(0) invert(22%)", "opacity": "0.16"}}},
    {"id": "select_outline_rounded_disabled_xlarge", "size": "Xlarge", "state": "Disabled", "structure": "s2", "icons": ["icon_12"], "rules": {"&": {"color": "var(--color-label-disable)"}, "& > select": {"min-height": "60px", "padding": "0 48px 0 24px", "border": "0", "background-color": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "font-size": "var(--font-size-18)", "cursor": "default"}, "& > img": {"filter": "brightness(0) invert(22%)", "opacity": "0.16"}}}
  ]
}
```

### C58 Select / Outline Rounded+icon

열: Small / Medium (Default) / Large / Xlarge.

```json
{
  "shared": {
    "&": {"position": "relative", "display": "block", "width": "100%", "min-width": "0", "box-sizing": "border-box", "font-family": "inherit"},
    "& > select": {"width": "100%", "appearance": "none", "border-radius": "8px", "line-height": "1.5", "font-weight": "400", "box-sizing": "border-box", "font-family": "inherit", "display": "block"},
    "& > img:first-of-type": {"position": "absolute", "top": "50%", "height": "auto", "transform": "translateY(-50%)", "pointer-events": "none"},
    "& > img:last-of-type": {"position": "absolute", "right": "12px", "top": "50%", "display": "block", "height": "auto", "transform": "translateY(-50%)", "pointer-events": "none"}
  },
  "structures": {
    "s1": "<span class=\"{{component}}\"><select aria-label=\"예시\"><option value=\"1\">Option 1</option><option value=\"2\">Option 2</option><option value=\"3\">Option 3</option></select><img class=\"{{icon_1_class}}\" src=\"{{icon_1_src}}\" alt=\"\" aria-hidden=\"true\"><img class=\"{{icon_2_class}}\" src=\"{{icon_2_src}}\" alt=\"\" aria-hidden=\"true\"></span>",
    "s2": "<span class=\"{{component}}\"><select aria-label=\"예시\" disabled><option value=\"1\">Option 1</option><option value=\"2\">Option 2</option><option value=\"3\">Option 3</option></select><img class=\"{{icon_1_class}}\" src=\"{{icon_1_src}}\" alt=\"\" aria-hidden=\"true\"><img class=\"{{icon_2_class}}\" src=\"{{icon_2_src}}\" alt=\"\" aria-hidden=\"true\"></span>"
  },
  "variants": [
    {"id": "select_outline_rounded_icon_small", "size": "Small", "state": "Default", "structure": "s1", "icons": ["icon_12", "icon_12"], "rules": {"&": {"color": "var(--color-label-normal)"}, "& > select": {"min-height": "40px", "padding": "0 36px 0 36px", "border": "1px solid var(--color-line-solid-0)", "background-color": "var(--color-common-100)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-14)", "cursor": "pointer"}, "& > img:first-of-type": {"left": "12px"}}},
    {"id": "select_outline_rounded_icon_medium", "size": "Medium (Default)", "state": "Default", "structure": "s1", "icons": ["icon_12", "icon_12"], "rules": {"&": {"color": "var(--color-label-normal)"}, "& > select": {"min-height": "44px", "padding": "0 40px 0 40px", "border": "1px solid var(--color-line-solid-0)", "background-color": "var(--color-common-100)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-16)", "cursor": "pointer"}, "& > img:first-of-type": {"left": "16px"}}},
    {"id": "select_outline_rounded_icon_large", "size": "Large", "state": "Default", "structure": "s1", "icons": ["icon_16", "icon_12"], "rules": {"&": {"color": "var(--color-label-normal)"}, "& > select": {"min-height": "52px", "padding": "0 44px 0 48px", "border": "1px solid var(--color-line-solid-0)", "background-color": "var(--color-common-100)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-16)", "cursor": "pointer"}, "& > img:first-of-type": {"left": "20px"}}},
    {"id": "select_outline_rounded_icon_xlarge", "size": "Xlarge", "state": "Default", "structure": "s1", "icons": ["icon_16", "icon_12"], "rules": {"&": {"color": "var(--color-label-normal)"}, "& > select": {"min-height": "60px", "padding": "0 48px 0 52px", "border": "1px solid var(--color-line-solid-0)", "background-color": "var(--color-common-100)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-18)", "cursor": "pointer"}, "& > img:first-of-type": {"left": "24px"}}},
    {"id": "select_outline_rounded_icon_disabled_small", "size": "Small", "state": "Disabled", "structure": "s2", "icons": ["icon_12", "icon_12"], "rules": {"&": {"color": "var(--color-label-disable)"}, "& > select": {"min-height": "40px", "padding": "0 36px 0 36px", "border": "0", "background-color": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "font-size": "var(--font-size-14)", "cursor": "default"}, "& > img:first-of-type": {"left": "12px", "filter": "brightness(0) invert(22%)", "opacity": "0.16"}, "& > img:last-of-type": {"filter": "brightness(0) invert(22%)", "opacity": "0.16"}}},
    {"id": "select_outline_rounded_icon_disabled_medium", "size": "Medium (Default)", "state": "Disabled", "structure": "s2", "icons": ["icon_12", "icon_12"], "rules": {"&": {"color": "var(--color-label-disable)"}, "& > select": {"min-height": "44px", "padding": "0 40px 0 40px", "border": "0", "background-color": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "font-size": "var(--font-size-16)", "cursor": "default"}, "& > img:first-of-type": {"left": "16px", "filter": "brightness(0) invert(22%)", "opacity": "0.16"}, "& > img:last-of-type": {"filter": "brightness(0) invert(22%)", "opacity": "0.16"}}},
    {"id": "select_outline_rounded_icon_disabled_large", "size": "Large", "state": "Disabled", "structure": "s2", "icons": ["icon_16", "icon_12"], "rules": {"&": {"color": "var(--color-label-disable)"}, "& > select": {"min-height": "52px", "padding": "0 44px 0 48px", "border": "0", "background-color": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "font-size": "var(--font-size-16)", "cursor": "default"}, "& > img:first-of-type": {"left": "20px", "filter": "brightness(0) invert(22%)", "opacity": "0.16"}, "& > img:last-of-type": {"filter": "brightness(0) invert(22%)", "opacity": "0.16"}}},
    {"id": "select_outline_rounded_icon_disabled_xlarge", "size": "Xlarge", "state": "Disabled", "structure": "s2", "icons": ["icon_16", "icon_12"], "rules": {"&": {"color": "var(--color-label-disable)"}, "& > select": {"min-height": "60px", "padding": "0 48px 0 52px", "border": "0", "background-color": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "font-size": "var(--font-size-18)", "cursor": "default"}, "& > img:first-of-type": {"left": "24px", "filter": "brightness(0) invert(22%)", "opacity": "0.16"}, "& > img:last-of-type": {"filter": "brightness(0) invert(22%)", "opacity": "0.16"}}}
  ]
}
```

### C59 Select / Outline Full Rounded

열: Small / Medium (Default) / Large / Xlarge.

```json
{
  "shared": {
    "&": {"position": "relative", "display": "block", "width": "100%", "min-width": "0", "box-sizing": "border-box", "font-family": "inherit"},
    "& > select": {"width": "100%", "appearance": "none", "border-radius": "9999px", "line-height": "1.5", "font-weight": "400", "box-sizing": "border-box", "font-family": "inherit", "display": "block"},
    "& > img": {"position": "absolute", "right": "12px", "top": "50%", "display": "block", "height": "auto", "transform": "translateY(-50%)", "pointer-events": "none"}
  },
  "structures": {
    "s1": "<span class=\"{{component}}\"><select aria-label=\"예시\"><option value=\"1\">Option 1</option><option value=\"2\">Option 2</option><option value=\"3\">Option 3</option></select><img class=\"{{icon_1_class}}\" src=\"{{icon_1_src}}\" alt=\"\" aria-hidden=\"true\"></span>",
    "s2": "<span class=\"{{component}}\"><select aria-label=\"예시\" disabled><option value=\"1\">Option 1</option><option value=\"2\">Option 2</option><option value=\"3\">Option 3</option></select><img class=\"{{icon_1_class}}\" src=\"{{icon_1_src}}\" alt=\"\" aria-hidden=\"true\"></span>"
  },
  "variants": [
    {"id": "select_outline_full_rounded_small", "size": "Small", "state": "Default", "structure": "s1", "icons": ["icon_12"], "rules": {"&": {"color": "var(--color-label-normal)"}, "& > select": {"min-height": "40px", "padding": "0 36px 0 12px", "border": "1px solid var(--color-line-solid-0)", "background-color": "var(--color-common-100)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-14)", "cursor": "pointer"}}},
    {"id": "select_outline_full_rounded_medium", "size": "Medium (Default)", "state": "Default", "structure": "s1", "icons": ["icon_12"], "rules": {"&": {"color": "var(--color-label-normal)"}, "& > select": {"min-height": "44px", "padding": "0 40px 0 16px", "border": "1px solid var(--color-line-solid-0)", "background-color": "var(--color-common-100)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-16)", "cursor": "pointer"}}},
    {"id": "select_outline_full_rounded_large", "size": "Large", "state": "Default", "structure": "s1", "icons": ["icon_12"], "rules": {"&": {"color": "var(--color-label-normal)"}, "& > select": {"min-height": "52px", "padding": "0 44px 0 20px", "border": "1px solid var(--color-line-solid-0)", "background-color": "var(--color-common-100)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-16)", "cursor": "pointer"}}},
    {"id": "select_outline_full_rounded_xlarge", "size": "Xlarge", "state": "Default", "structure": "s1", "icons": ["icon_12"], "rules": {"&": {"color": "var(--color-label-normal)"}, "& > select": {"min-height": "60px", "padding": "0 48px 0 24px", "border": "1px solid var(--color-line-solid-0)", "background-color": "var(--color-common-100)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-18)", "cursor": "pointer"}}},
    {"id": "select_outline_full_rounded_disabled_small", "size": "Small", "state": "Disabled", "structure": "s2", "icons": ["icon_12"], "rules": {"&": {"color": "var(--color-label-disable)"}, "& > select": {"min-height": "40px", "padding": "0 36px 0 12px", "border": "0", "background-color": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "font-size": "var(--font-size-14)", "cursor": "default"}, "& > img": {"filter": "brightness(0) invert(22%)", "opacity": "0.16"}}},
    {"id": "select_outline_full_rounded_disabled_medium", "size": "Medium (Default)", "state": "Disabled", "structure": "s2", "icons": ["icon_12"], "rules": {"&": {"color": "var(--color-label-disable)"}, "& > select": {"min-height": "44px", "padding": "0 40px 0 16px", "border": "0", "background-color": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "font-size": "var(--font-size-16)", "cursor": "default"}, "& > img": {"filter": "brightness(0) invert(22%)", "opacity": "0.16"}}},
    {"id": "select_outline_full_rounded_disabled_large", "size": "Large", "state": "Disabled", "structure": "s2", "icons": ["icon_12"], "rules": {"&": {"color": "var(--color-label-disable)"}, "& > select": {"min-height": "52px", "padding": "0 44px 0 20px", "border": "0", "background-color": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "font-size": "var(--font-size-16)", "cursor": "default"}, "& > img": {"filter": "brightness(0) invert(22%)", "opacity": "0.16"}}},
    {"id": "select_outline_full_rounded_disabled_xlarge", "size": "Xlarge", "state": "Disabled", "structure": "s2", "icons": ["icon_12"], "rules": {"&": {"color": "var(--color-label-disable)"}, "& > select": {"min-height": "60px", "padding": "0 48px 0 24px", "border": "0", "background-color": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "font-size": "var(--font-size-18)", "cursor": "default"}, "& > img": {"filter": "brightness(0) invert(22%)", "opacity": "0.16"}}}
  ]
}
```

### C60 Select / Outline Full Rounded+icon

열: Small / Medium (Default) / Large / Xlarge.

```json
{
  "shared": {
    "&": {"position": "relative", "display": "block", "width": "100%", "min-width": "0", "box-sizing": "border-box", "font-family": "inherit"},
    "& > select": {"width": "100%", "appearance": "none", "border-radius": "9999px", "line-height": "1.5", "font-weight": "400", "box-sizing": "border-box", "font-family": "inherit", "display": "block"},
    "& > img:first-of-type": {"position": "absolute", "top": "50%", "height": "auto", "transform": "translateY(-50%)", "pointer-events": "none"},
    "& > img:last-of-type": {"position": "absolute", "right": "12px", "top": "50%", "display": "block", "height": "auto", "transform": "translateY(-50%)", "pointer-events": "none"}
  },
  "structures": {
    "s1": "<span class=\"{{component}}\"><select aria-label=\"예시\"><option value=\"1\">Option 1</option><option value=\"2\">Option 2</option><option value=\"3\">Option 3</option></select><img class=\"{{icon_1_class}}\" src=\"{{icon_1_src}}\" alt=\"\" aria-hidden=\"true\"><img class=\"{{icon_2_class}}\" src=\"{{icon_2_src}}\" alt=\"\" aria-hidden=\"true\"></span>",
    "s2": "<span class=\"{{component}}\"><select aria-label=\"예시\" disabled><option value=\"1\">Option 1</option><option value=\"2\">Option 2</option><option value=\"3\">Option 3</option></select><img class=\"{{icon_1_class}}\" src=\"{{icon_1_src}}\" alt=\"\" aria-hidden=\"true\"><img class=\"{{icon_2_class}}\" src=\"{{icon_2_src}}\" alt=\"\" aria-hidden=\"true\"></span>"
  },
  "variants": [
    {"id": "select_outline_full_rounded_icon_small", "size": "Small", "state": "Default", "structure": "s1", "icons": ["icon_12", "icon_12"], "rules": {"&": {"color": "var(--color-label-normal)"}, "& > select": {"min-height": "40px", "padding": "0 36px 0 36px", "border": "1px solid var(--color-line-solid-0)", "background-color": "var(--color-common-100)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-14)", "cursor": "pointer"}, "& > img:first-of-type": {"left": "12px"}}},
    {"id": "select_outline_full_rounded_icon_medium", "size": "Medium (Default)", "state": "Default", "structure": "s1", "icons": ["icon_12", "icon_12"], "rules": {"&": {"color": "var(--color-label-normal)"}, "& > select": {"min-height": "44px", "padding": "0 40px 0 40px", "border": "1px solid var(--color-line-solid-0)", "background-color": "var(--color-common-100)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-16)", "cursor": "pointer"}, "& > img:first-of-type": {"left": "16px"}}},
    {"id": "select_outline_full_rounded_icon_large", "size": "Large", "state": "Default", "structure": "s1", "icons": ["icon_16", "icon_12"], "rules": {"&": {"color": "var(--color-label-normal)"}, "& > select": {"min-height": "52px", "padding": "0 44px 0 48px", "border": "1px solid var(--color-line-solid-0)", "background-color": "var(--color-common-100)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-16)", "cursor": "pointer"}, "& > img:first-of-type": {"left": "20px"}}},
    {"id": "select_outline_full_rounded_icon_xlarge", "size": "Xlarge", "state": "Default", "structure": "s1", "icons": ["icon_16", "icon_12"], "rules": {"&": {"color": "var(--color-label-normal)"}, "& > select": {"min-height": "60px", "padding": "0 48px 0 52px", "border": "1px solid var(--color-line-solid-0)", "background-color": "var(--color-common-100)", "color": "var(--color-label-normal)", "font-size": "var(--font-size-18)", "cursor": "pointer"}, "& > img:first-of-type": {"left": "24px"}}},
    {"id": "select_outline_full_rounded_icon_disabled_small", "size": "Small", "state": "Disabled", "structure": "s2", "icons": ["icon_12", "icon_12"], "rules": {"&": {"color": "var(--color-label-disable)"}, "& > select": {"min-height": "40px", "padding": "0 36px 0 36px", "border": "0", "background-color": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "font-size": "var(--font-size-14)", "cursor": "default"}, "& > img:first-of-type": {"left": "12px", "filter": "brightness(0) invert(22%)", "opacity": "0.16"}, "& > img:last-of-type": {"filter": "brightness(0) invert(22%)", "opacity": "0.16"}}},
    {"id": "select_outline_full_rounded_icon_disabled_medium", "size": "Medium (Default)", "state": "Disabled", "structure": "s2", "icons": ["icon_12", "icon_12"], "rules": {"&": {"color": "var(--color-label-disable)"}, "& > select": {"min-height": "44px", "padding": "0 40px 0 40px", "border": "0", "background-color": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "font-size": "var(--font-size-16)", "cursor": "default"}, "& > img:first-of-type": {"left": "16px", "filter": "brightness(0) invert(22%)", "opacity": "0.16"}, "& > img:last-of-type": {"filter": "brightness(0) invert(22%)", "opacity": "0.16"}}},
    {"id": "select_outline_full_rounded_icon_disabled_large", "size": "Large", "state": "Disabled", "structure": "s2", "icons": ["icon_16", "icon_12"], "rules": {"&": {"color": "var(--color-label-disable)"}, "& > select": {"min-height": "52px", "padding": "0 44px 0 48px", "border": "0", "background-color": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "font-size": "var(--font-size-16)", "cursor": "default"}, "& > img:first-of-type": {"left": "20px", "filter": "brightness(0) invert(22%)", "opacity": "0.16"}, "& > img:last-of-type": {"filter": "brightness(0) invert(22%)", "opacity": "0.16"}}},
    {"id": "select_outline_full_rounded_icon_disabled_xlarge", "size": "Xlarge", "state": "Disabled", "structure": "s2", "icons": ["icon_16", "icon_12"], "rules": {"&": {"color": "var(--color-label-disable)"}, "& > select": {"min-height": "60px", "padding": "0 48px 0 52px", "border": "0", "background-color": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "font-size": "var(--font-size-18)", "cursor": "default"}, "& > img:first-of-type": {"left": "24px", "filter": "brightness(0) invert(22%)", "opacity": "0.16"}, "& > img:last-of-type": {"filter": "brightness(0) invert(22%)", "opacity": "0.16"}}}
  ]
}
```

### C61 Chip / Filled

열: Small / Medium / Large / Xlarge.

```json
{
  "shared": {
    "&": {"display": "inline-flex", "align-items": "center", "justify-content": "center", "border": "0", "border-radius": "9999px", "line-height": "1.5", "font-weight": "500", "white-space": "nowrap", "box-sizing": "border-box", "font-family": "inherit", "text-decoration": "none", "appearance": "none"}
  },
  "structures": {
    "s1": "<button class=\"{{component}}\" type=\"button\">Chip</button>",
    "s2": "<button class=\"{{component}}\" type=\"button\" disabled>Chip</button>"
  },
  "variants": [
    {"id": "chip_filled_small", "size": "Small", "state": "Default", "structure": "s1", "rules": {"&": {"min-height": "24px", "padding": "0 12px", "background": "var(--color-static-black)", "color": "var(--color-common-100)", "font-size": "var(--font-size-12)", "cursor": "pointer"}, "&:active": {"border": "0", "background": "var(--color-static-black)", "color": "var(--color-common-100)"}, "&[aria-pressed=\"true\"]": {"background": "var(--color-static-black)", "color": "var(--color-common-100)"}}},
    {"id": "chip_filled_medium", "size": "Medium", "state": "Default", "structure": "s1", "rules": {"&": {"min-height": "32px", "padding": "0 16px", "background": "var(--color-static-black)", "color": "var(--color-common-100)", "font-size": "var(--font-size-14)", "cursor": "pointer"}, "&:active": {"border": "0", "background": "var(--color-static-black)", "color": "var(--color-common-100)"}, "&[aria-pressed=\"true\"]": {"background": "var(--color-static-black)", "color": "var(--color-common-100)"}}},
    {"id": "chip_filled_large", "size": "Large", "state": "Default", "structure": "s1", "rules": {"&": {"min-height": "40px", "padding": "0 20px", "background": "var(--color-static-black)", "color": "var(--color-common-100)", "font-size": "var(--font-size-16)", "cursor": "pointer"}, "&:active": {"border": "0", "background": "var(--color-static-black)", "color": "var(--color-common-100)"}, "&[aria-pressed=\"true\"]": {"background": "var(--color-static-black)", "color": "var(--color-common-100)"}}},
    {"id": "chip_filled_xlarge", "size": "Xlarge", "state": "Default", "structure": "s1", "rules": {"&": {"min-height": "48px", "padding": "0 20px", "background": "var(--color-static-black)", "color": "var(--color-common-100)", "font-size": "var(--font-size-16)", "cursor": "pointer"}, "&:active": {"border": "0", "background": "var(--color-static-black)", "color": "var(--color-common-100)"}, "&[aria-pressed=\"true\"]": {"background": "var(--color-static-black)", "color": "var(--color-common-100)"}}},
    {"id": "chip_filled_disabled_small", "size": "Small", "state": "Disabled", "structure": "s2", "rules": {"&": {"min-height": "24px", "padding": "0 12px", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "font-size": "var(--font-size-12)", "cursor": "default"}}},
    {"id": "chip_filled_disabled_medium", "size": "Medium", "state": "Disabled", "structure": "s2", "rules": {"&": {"min-height": "32px", "padding": "0 16px", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "font-size": "var(--font-size-14)", "cursor": "default"}}},
    {"id": "chip_filled_disabled_large", "size": "Large", "state": "Disabled", "structure": "s2", "rules": {"&": {"min-height": "40px", "padding": "0 20px", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "font-size": "var(--font-size-16)", "cursor": "default"}}},
    {"id": "chip_filled_disabled_xlarge", "size": "Xlarge", "state": "Disabled", "structure": "s2", "rules": {"&": {"min-height": "48px", "padding": "0 20px", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "font-size": "var(--font-size-16)", "cursor": "default"}}}
  ]
}
```

### C62 Chip / Outline

열: Small / Medium / Large / Xlarge.

```json
{
  "shared": {
    "&": {"display": "inline-flex", "align-items": "center", "justify-content": "center", "border-radius": "9999px", "line-height": "1.5", "font-weight": "500", "white-space": "nowrap", "box-sizing": "border-box", "font-family": "inherit", "text-decoration": "none", "appearance": "none"}
  },
  "structures": {
    "s1": "<button class=\"{{component}}\" type=\"button\">Chip</button>",
    "s2": "<button class=\"{{component}}\" type=\"button\" disabled>Chip</button>"
  },
  "variants": [
    {"id": "chip_outline_small", "size": "Small", "state": "Default", "structure": "s1", "rules": {"&": {"min-height": "24px", "padding": "0 12px", "border": "1px solid var(--color-static-black)", "background": "var(--color-common-100)", "color": "var(--color-static-black)", "font-size": "var(--font-size-12)", "cursor": "pointer"}, "&:active": {"border": "1px solid var(--color-static-black)", "background": "var(--color-static-black)", "color": "var(--color-common-100)"}, "&[aria-pressed=\"true\"]": {"background": "var(--color-static-black)", "color": "var(--color-common-100)"}}},
    {"id": "chip_outline_medium", "size": "Medium", "state": "Default", "structure": "s1", "rules": {"&": {"min-height": "32px", "padding": "0 16px", "border": "1px solid var(--color-static-black)", "background": "var(--color-common-100)", "color": "var(--color-static-black)", "font-size": "var(--font-size-14)", "cursor": "pointer"}, "&:active": {"border": "1px solid var(--color-static-black)", "background": "var(--color-static-black)", "color": "var(--color-common-100)"}, "&[aria-pressed=\"true\"]": {"background": "var(--color-static-black)", "color": "var(--color-common-100)"}}},
    {"id": "chip_outline_large", "size": "Large", "state": "Default", "structure": "s1", "rules": {"&": {"min-height": "40px", "padding": "0 20px", "border": "1px solid var(--color-static-black)", "background": "var(--color-common-100)", "color": "var(--color-static-black)", "font-size": "var(--font-size-16)", "cursor": "pointer"}, "&:active": {"border": "1px solid var(--color-static-black)", "background": "var(--color-static-black)", "color": "var(--color-common-100)"}, "&[aria-pressed=\"true\"]": {"background": "var(--color-static-black)", "color": "var(--color-common-100)"}}},
    {"id": "chip_outline_xlarge", "size": "Xlarge", "state": "Default", "structure": "s1", "rules": {"&": {"min-height": "48px", "padding": "0 20px", "border": "1px solid var(--color-static-black)", "background": "var(--color-common-100)", "color": "var(--color-static-black)", "font-size": "var(--font-size-16)", "cursor": "pointer"}, "&:active": {"border": "1px solid var(--color-static-black)", "background": "var(--color-static-black)", "color": "var(--color-common-100)"}, "&[aria-pressed=\"true\"]": {"background": "var(--color-static-black)", "color": "var(--color-common-100)"}}},
    {"id": "chip_outline_disabled_small", "size": "Small", "state": "Disabled", "structure": "s2", "rules": {"&": {"min-height": "24px", "padding": "0 12px", "border": "1px solid transparent", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "font-size": "var(--font-size-12)", "cursor": "default"}}},
    {"id": "chip_outline_disabled_medium", "size": "Medium", "state": "Disabled", "structure": "s2", "rules": {"&": {"min-height": "32px", "padding": "0 16px", "border": "1px solid transparent", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "font-size": "var(--font-size-14)", "cursor": "default"}}},
    {"id": "chip_outline_disabled_large", "size": "Large", "state": "Disabled", "structure": "s2", "rules": {"&": {"min-height": "40px", "padding": "0 20px", "border": "1px solid transparent", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "font-size": "var(--font-size-16)", "cursor": "default"}}},
    {"id": "chip_outline_disabled_xlarge", "size": "Xlarge", "state": "Disabled", "structure": "s2", "rules": {"&": {"min-height": "48px", "padding": "0 20px", "border": "1px solid transparent", "background": "var(--color-interaction-disable)", "color": "var(--color-label-disable)", "font-size": "var(--font-size-16)", "cursor": "default"}}}
  ]
}
```

### C63 Chip / Content Tag

열: Small / Medium / Large / Xlarge.

```json
{
  "shared": {
    "&": {"display": "inline-flex", "align-items": "center", "justify-content": "center", "align-self": "flex-start", "max-width": "100%", "border": "0", "border-radius": "9999px", "background": "var(--color-static-black)", "color": "var(--color-common-100)", "font-weight": "600", "font-family": "inherit", "white-space": "nowrap", "box-sizing": "border-box", "text-decoration": "none", "appearance": "none"}
  },
  "structures": {
    "s1": "<span class=\"{{component}}\">Content Tag</span>"
  },
  "variants": [
    {"id": "chip_content_small", "size": "Small", "state": "Default", "structure": "s1", "rules": {"&": {"padding": "12px 20px", "font-size": "var(--font-size-16)", "line-height": "1.5"}}},
    {"id": "chip_content_medium", "size": "Medium", "state": "Default", "structure": "s1", "rules": {"&": {"padding": "16px 24px", "font-size": "var(--font-size-18)", "line-height": "1.5"}}},
    {"id": "chip_content_large", "size": "Large", "state": "Default", "structure": "s1", "rules": {"&": {"padding": "20px 28px", "font-size": "var(--font-size-20)", "line-height": "1.5"}}},
    {"id": "chip_content_xlarge", "size": "Xlarge", "state": "Default", "structure": "s1", "rules": {"&": {"padding": "24px 32px", "font-size": "var(--font-size-24)", "line-height": "1.25"}}}
  ]
}
```

### C64 Hashtag

열: Small / Medium (Default) / Large / Xlarge.

```json
{
  "shared": {
    "&": {"display": "inline-flex", "align-items": "center", "color": "var(--color-label-neutral)", "font-weight": "var(--font-weight-400)", "line-height": "1.5", "white-space": "nowrap", "box-sizing": "border-box", "font-family": "inherit"}
  },
  "structures": {
    "s1": "<span class=\"{{component}}\">#Hashtag</span>"
  },
  "variants": [
    {"id": "hashtag_small", "size": "Small", "state": "Default", "structure": "s1", "rules": {"&": {"font-size": "var(--font-size-14)"}}},
    {"id": "hashtag_medium", "size": "Medium (Default)", "state": "Default", "structure": "s1", "rules": {"&": {"font-size": "var(--font-size-16)"}}},
    {"id": "hashtag_large", "size": "Large", "state": "Default", "structure": "s1", "rules": {"&": {"font-size": "var(--font-size-18)"}}},
    {"id": "hashtag_xlarge", "size": "Xlarge", "state": "Default", "structure": "s1", "rules": {"&": {"font-size": "var(--font-size-20)"}}}
  ]
}
```

### C65 Badge / Filled

열: Small / Medium / Large / Xlarge.

```json
{
  "shared": {
    "&": {"display": "inline-flex", "align-items": "center", "justify-content": "center", "border": "0", "border-radius": "9999px", "background": "var(--color-static-black)", "color": "var(--color-common-100)", "line-height": "1.5", "font-weight": "500", "white-space": "nowrap", "vertical-align": "middle", "box-sizing": "border-box", "font-family": "inherit"}
  },
  "structures": {
    "s1": "<span class=\"{{component}}\">Badge</span>"
  },
  "variants": [
    {"id": "badge_filled_small", "size": "Small", "state": "Default", "structure": "s1", "rules": {"&": {"padding": "0 12px", "font-size": "var(--font-size-12)", "min-height": "24px"}}},
    {"id": "badge_filled_medium", "size": "Medium", "state": "Default", "structure": "s1", "rules": {"&": {"padding": "0 16px", "font-size": "var(--font-size-14)", "min-height": "32px"}}},
    {"id": "badge_filled_large", "size": "Large", "state": "Default", "structure": "s1", "rules": {"&": {"padding": "0 20px", "font-size": "var(--font-size-16)", "min-height": "40px"}}},
    {"id": "badge_filled_xlarge", "size": "Xlarge", "state": "Default", "structure": "s1", "rules": {"&": {"padding": "0 20px", "font-size": "var(--font-size-16)", "min-height": "48px"}}}
  ]
}
```

### C66 Badge / Outline

열: Small / Medium / Large / Xlarge.

```json
{
  "shared": {
    "&": {"display": "inline-flex", "align-items": "center", "justify-content": "center", "border": "1px solid var(--color-static-black)", "border-radius": "9999px", "background": "var(--color-common-100)", "color": "var(--color-static-black)", "line-height": "1.5", "font-weight": "500", "white-space": "nowrap", "vertical-align": "middle", "box-sizing": "border-box", "font-family": "inherit"}
  },
  "structures": {
    "s1": "<span class=\"{{component}}\">Badge</span>"
  },
  "variants": [
    {"id": "badge_outline_small", "size": "Small", "state": "Default", "structure": "s1", "rules": {"&": {"padding": "0 12px", "font-size": "var(--font-size-12)", "min-height": "24px"}}},
    {"id": "badge_outline_medium", "size": "Medium", "state": "Default", "structure": "s1", "rules": {"&": {"padding": "0 16px", "font-size": "var(--font-size-14)", "min-height": "32px"}}},
    {"id": "badge_outline_large", "size": "Large", "state": "Default", "structure": "s1", "rules": {"&": {"padding": "0 20px", "font-size": "var(--font-size-16)", "min-height": "40px"}}},
    {"id": "badge_outline_xlarge", "size": "Xlarge", "state": "Default", "structure": "s1", "rules": {"&": {"padding": "0 20px", "font-size": "var(--font-size-16)", "min-height": "48px"}}}
  ]
}
```

### C67 Toggle

열: Small / Medium / Large / Xlarge.

```json
{
  "shared": {
    "&": {"position": "relative", "display": "inline-flex", "align-items": "center", "padding": "2px", "border": "0", "border-radius": "9999px", "box-sizing": "border-box", "font-family": "inherit"},
    "& input": {"position": "absolute", "inset": "0", "opacity": "0", "width": "100%", "height": "100%", "padding": "0", "border": "0", "z-index": "1"},
    "&::after": {"border-radius": "9999px", "content": "\"\"", "pointer-events": "none"}
  },
  "structures": {
    "s1": "<label class=\"{{component}}\"><input type=\"checkbox\" aria-label=\"예시\" checked></label>",
    "s2": "<label class=\"{{component}}\"><input type=\"checkbox\" aria-label=\"예시\"></label>",
    "s3": "<label class=\"{{component}}\"><input type=\"checkbox\" aria-label=\"예시\" disabled></label>"
  },
  "variants": [
    {"id": "toggle_on_small", "size": "Small", "state": "On", "structure": "s1", "rules": {"&": {"width": "36px", "height": "20px", "background": "var(--color-static-black)", "cursor": "pointer"}, "& input": {"cursor": "pointer"}, "&::after": {"width": "16px", "height": "16px", "background": "var(--color-common-100)", "transform": "translateX(16px)"}, "&:has(input:checked)": {"background": "var(--color-static-black)"}, "&:has(input:not(:checked))": {"background": "var(--color-line-solid-strong)"}, "&:has(input:checked)::after": {"width": "16px", "height": "16px", "border-radius": "9999px", "background": "var(--color-common-100)", "transform": "translateX(16px)", "content": "\"\"", "pointer-events": "none"}, "&:has(input:not(:checked))::after": {"width": "16px", "height": "16px", "border-radius": "9999px", "background": "var(--color-common-100)", "transform": "translateX(0)", "content": "\"\"", "pointer-events": "none"}, "&:has(input:focus-visible)": {"outline": "2px solid var(--color-static-black)", "outline-offset": "2px"}}, "order": {"&:has(input:focus-visible)": ["outline", "outline-offset"]}},
    {"id": "toggle_on_medium", "size": "Medium", "state": "On", "structure": "s1", "rules": {"&": {"width": "44px", "height": "24px", "background": "var(--color-static-black)", "cursor": "pointer"}, "& input": {"cursor": "pointer"}, "&::after": {"width": "20px", "height": "20px", "background": "var(--color-common-100)", "transform": "translateX(20px)"}, "&:has(input:checked)": {"background": "var(--color-static-black)"}, "&:has(input:not(:checked))": {"background": "var(--color-line-solid-strong)"}, "&:has(input:checked)::after": {"width": "20px", "height": "20px", "border-radius": "9999px", "background": "var(--color-common-100)", "transform": "translateX(20px)", "content": "\"\"", "pointer-events": "none"}, "&:has(input:not(:checked))::after": {"width": "20px", "height": "20px", "border-radius": "9999px", "background": "var(--color-common-100)", "transform": "translateX(0)", "content": "\"\"", "pointer-events": "none"}, "&:has(input:focus-visible)": {"outline": "2px solid var(--color-static-black)", "outline-offset": "2px"}}, "order": {"&:has(input:focus-visible)": ["outline", "outline-offset"]}},
    {"id": "toggle_on_large", "size": "Large", "state": "On", "structure": "s1", "rules": {"&": {"width": "52px", "height": "28px", "background": "var(--color-static-black)", "cursor": "pointer"}, "& input": {"cursor": "pointer"}, "&::after": {"width": "24px", "height": "24px", "background": "var(--color-common-100)", "transform": "translateX(24px)"}, "&:has(input:checked)": {"background": "var(--color-static-black)"}, "&:has(input:not(:checked))": {"background": "var(--color-line-solid-strong)"}, "&:has(input:checked)::after": {"width": "24px", "height": "24px", "border-radius": "9999px", "background": "var(--color-common-100)", "transform": "translateX(24px)", "content": "\"\"", "pointer-events": "none"}, "&:has(input:not(:checked))::after": {"width": "24px", "height": "24px", "border-radius": "9999px", "background": "var(--color-common-100)", "transform": "translateX(0)", "content": "\"\"", "pointer-events": "none"}, "&:has(input:focus-visible)": {"outline": "2px solid var(--color-static-black)", "outline-offset": "2px"}}, "order": {"&:has(input:focus-visible)": ["outline", "outline-offset"]}},
    {"id": "toggle_on_xlarge", "size": "Xlarge", "state": "On", "structure": "s1", "rules": {"&": {"width": "60px", "height": "32px", "background": "var(--color-static-black)", "cursor": "pointer"}, "& input": {"cursor": "pointer"}, "&::after": {"width": "28px", "height": "28px", "background": "var(--color-common-100)", "transform": "translateX(28px)"}, "&:has(input:checked)": {"background": "var(--color-static-black)"}, "&:has(input:not(:checked))": {"background": "var(--color-line-solid-strong)"}, "&:has(input:checked)::after": {"width": "28px", "height": "28px", "border-radius": "9999px", "background": "var(--color-common-100)", "transform": "translateX(28px)", "content": "\"\"", "pointer-events": "none"}, "&:has(input:not(:checked))::after": {"width": "28px", "height": "28px", "border-radius": "9999px", "background": "var(--color-common-100)", "transform": "translateX(0)", "content": "\"\"", "pointer-events": "none"}, "&:has(input:focus-visible)": {"outline": "2px solid var(--color-static-black)", "outline-offset": "2px"}}, "order": {"&:has(input:focus-visible)": ["outline", "outline-offset"]}},
    {"id": "toggle_off_small", "size": "Small", "state": "Off", "structure": "s2", "rules": {"&": {"width": "36px", "height": "20px", "background": "var(--color-line-solid-strong)", "cursor": "pointer"}, "& input": {"cursor": "pointer"}, "&::after": {"width": "16px", "height": "16px", "background": "var(--color-common-100)", "transform": "translateX(0px)"}, "&:has(input:checked)": {"background": "var(--color-static-black)"}, "&:has(input:not(:checked))": {"background": "var(--color-line-solid-strong)"}, "&:has(input:checked)::after": {"width": "16px", "height": "16px", "border-radius": "9999px", "background": "var(--color-common-100)", "transform": "translateX(16px)", "content": "\"\"", "pointer-events": "none"}, "&:has(input:not(:checked))::after": {"width": "16px", "height": "16px", "border-radius": "9999px", "background": "var(--color-common-100)", "transform": "translateX(0)", "content": "\"\"", "pointer-events": "none"}, "&:has(input:focus-visible)": {"outline": "2px solid var(--color-static-black)", "outline-offset": "2px"}}, "order": {"&:has(input:focus-visible)": ["outline", "outline-offset"]}},
    {"id": "toggle_off_medium", "size": "Medium", "state": "Off", "structure": "s2", "rules": {"&": {"width": "44px", "height": "24px", "background": "var(--color-line-solid-strong)", "cursor": "pointer"}, "& input": {"cursor": "pointer"}, "&::after": {"width": "20px", "height": "20px", "background": "var(--color-common-100)", "transform": "translateX(0px)"}, "&:has(input:checked)": {"background": "var(--color-static-black)"}, "&:has(input:not(:checked))": {"background": "var(--color-line-solid-strong)"}, "&:has(input:checked)::after": {"width": "20px", "height": "20px", "border-radius": "9999px", "background": "var(--color-common-100)", "transform": "translateX(20px)", "content": "\"\"", "pointer-events": "none"}, "&:has(input:not(:checked))::after": {"width": "20px", "height": "20px", "border-radius": "9999px", "background": "var(--color-common-100)", "transform": "translateX(0)", "content": "\"\"", "pointer-events": "none"}, "&:has(input:focus-visible)": {"outline": "2px solid var(--color-static-black)", "outline-offset": "2px"}}, "order": {"&:has(input:focus-visible)": ["outline", "outline-offset"]}},
    {"id": "toggle_off_large", "size": "Large", "state": "Off", "structure": "s2", "rules": {"&": {"width": "52px", "height": "28px", "background": "var(--color-line-solid-strong)", "cursor": "pointer"}, "& input": {"cursor": "pointer"}, "&::after": {"width": "24px", "height": "24px", "background": "var(--color-common-100)", "transform": "translateX(0px)"}, "&:has(input:checked)": {"background": "var(--color-static-black)"}, "&:has(input:not(:checked))": {"background": "var(--color-line-solid-strong)"}, "&:has(input:checked)::after": {"width": "24px", "height": "24px", "border-radius": "9999px", "background": "var(--color-common-100)", "transform": "translateX(24px)", "content": "\"\"", "pointer-events": "none"}, "&:has(input:not(:checked))::after": {"width": "24px", "height": "24px", "border-radius": "9999px", "background": "var(--color-common-100)", "transform": "translateX(0)", "content": "\"\"", "pointer-events": "none"}, "&:has(input:focus-visible)": {"outline": "2px solid var(--color-static-black)", "outline-offset": "2px"}}, "order": {"&:has(input:focus-visible)": ["outline", "outline-offset"]}},
    {"id": "toggle_off_xlarge", "size": "Xlarge", "state": "Off", "structure": "s2", "rules": {"&": {"width": "60px", "height": "32px", "background": "var(--color-line-solid-strong)", "cursor": "pointer"}, "& input": {"cursor": "pointer"}, "&::after": {"width": "28px", "height": "28px", "background": "var(--color-common-100)", "transform": "translateX(0px)"}, "&:has(input:checked)": {"background": "var(--color-static-black)"}, "&:has(input:not(:checked))": {"background": "var(--color-line-solid-strong)"}, "&:has(input:checked)::after": {"width": "28px", "height": "28px", "border-radius": "9999px", "background": "var(--color-common-100)", "transform": "translateX(28px)", "content": "\"\"", "pointer-events": "none"}, "&:has(input:not(:checked))::after": {"width": "28px", "height": "28px", "border-radius": "9999px", "background": "var(--color-common-100)", "transform": "translateX(0)", "content": "\"\"", "pointer-events": "none"}, "&:has(input:focus-visible)": {"outline": "2px solid var(--color-static-black)", "outline-offset": "2px"}}, "order": {"&:has(input:focus-visible)": ["outline", "outline-offset"]}},
    {"id": "toggle_disabled_small", "size": "Small", "state": "Disabled", "structure": "s3", "rules": {"&": {"width": "36px", "height": "20px", "background": "var(--color-interaction-disable)", "cursor": "default", "color": "var(--color-label-disable)"}, "& input": {"cursor": "default"}, "&::after": {"width": "16px", "height": "16px", "background": "var(--color-label-disable)", "transform": "translateX(0px)"}}},
    {"id": "toggle_disabled_medium", "size": "Medium", "state": "Disabled", "structure": "s3", "rules": {"&": {"width": "44px", "height": "24px", "background": "var(--color-interaction-disable)", "cursor": "default", "color": "var(--color-label-disable)"}, "& input": {"cursor": "default"}, "&::after": {"width": "20px", "height": "20px", "background": "var(--color-label-disable)", "transform": "translateX(0px)"}}},
    {"id": "toggle_disabled_large", "size": "Large", "state": "Disabled", "structure": "s3", "rules": {"&": {"width": "52px", "height": "28px", "background": "var(--color-interaction-disable)", "cursor": "default", "color": "var(--color-label-disable)"}, "& input": {"cursor": "default"}, "&::after": {"width": "24px", "height": "24px", "background": "var(--color-label-disable)", "transform": "translateX(0px)"}}},
    {"id": "toggle_disabled_xlarge", "size": "Xlarge", "state": "Disabled", "structure": "s3", "rules": {"&": {"width": "60px", "height": "32px", "background": "var(--color-interaction-disable)", "cursor": "default", "color": "var(--color-label-disable)"}, "& input": {"cursor": "default"}, "&::after": {"width": "28px", "height": "28px", "background": "var(--color-label-disable)", "transform": "translateX(0px)"}}}
  ]
}
```

### C68 Checkbox

열: Small / Medium / Large / Xlarge.

```json
{
  "shared": {
    "&": {"position": "relative", "appearance": "none", "border-radius": "2px", "padding": "0", "box-sizing": "border-box", "font-family": "inherit"}
  },
  "structures": {
    "s1": "<label class=\"{{component}}\"><input type=\"checkbox\" aria-label=\"예시\"><img class=\"{{icon_1_class}}\" src=\"{{icon_1_src}}\" alt=\"\" aria-hidden=\"true\"></label>",
    "s2": "<label class=\"{{component}}\"><input type=\"checkbox\" aria-label=\"예시\" checked><img class=\"{{icon_1_class}}\" src=\"{{icon_1_src}}\" alt=\"\" aria-hidden=\"true\"></label>",
    "s3": "<input class=\"{{component}}\" type=\"checkbox\" aria-label=\"예시\" disabled>"
  },
  "variants": [
    {"id": "checkbox_small", "size": "Small", "state": "Default", "structure": "s1", "icons": ["icon_8"], "rules": {"&": {"width": "16px", "height": "16px", "border": "2px solid var(--color-static-black)", "background": "var(--color-common-100)", "cursor": "pointer", "flex": "0 0 16px", "display": "inline-grid", "place-items": "center"}, "&:has(input:checked)": {"border-color": "var(--color-static-black)", "background": "var(--color-static-black)"}, "& > img": {"display": "none", "height": "auto", "pointer-events": "none"}, "&:has(input:focus-visible)": {"outline": "2px solid var(--color-static-black)", "outline-offset": "2px"}, "& > input": {"position": "absolute", "inset": "0", "width": "100%", "height": "100%", "opacity": "0", "padding": "0", "border": "0", "cursor": "inherit", "z-index": "1"}, "&:has(input:checked) > img": {"display": "block", "filter": "brightness(0) invert(1)"}}, "order": {"&:has(input:focus-visible)": ["outline", "outline-offset"]}},
    {"id": "checkbox_medium", "size": "Medium", "state": "Default", "structure": "s1", "icons": ["icon_12"], "rules": {"&": {"width": "20px", "height": "20px", "border": "2px solid var(--color-static-black)", "background": "var(--color-common-100)", "cursor": "pointer", "flex": "0 0 20px", "display": "inline-grid", "place-items": "center"}, "&:has(input:checked)": {"border-color": "var(--color-static-black)", "background": "var(--color-static-black)"}, "& > img": {"display": "none", "height": "auto", "pointer-events": "none"}, "&:has(input:focus-visible)": {"outline": "2px solid var(--color-static-black)", "outline-offset": "2px"}, "& > input": {"position": "absolute", "inset": "0", "width": "100%", "height": "100%", "opacity": "0", "padding": "0", "border": "0", "cursor": "inherit", "z-index": "1"}, "&:has(input:checked) > img": {"display": "block", "filter": "brightness(0) invert(1)"}}, "order": {"&:has(input:focus-visible)": ["outline", "outline-offset"]}},
    {"id": "checkbox_large", "size": "Large", "state": "Default", "structure": "s1", "icons": ["icon_16"], "rules": {"&": {"width": "24px", "height": "24px", "border": "2px solid var(--color-static-black)", "background": "var(--color-common-100)", "cursor": "pointer", "flex": "0 0 24px", "display": "inline-grid", "place-items": "center"}, "&:has(input:checked)": {"border-color": "var(--color-static-black)", "background": "var(--color-static-black)"}, "& > img": {"display": "none", "height": "auto", "pointer-events": "none"}, "&:has(input:focus-visible)": {"outline": "2px solid var(--color-static-black)", "outline-offset": "2px"}, "& > input": {"position": "absolute", "inset": "0", "width": "100%", "height": "100%", "opacity": "0", "padding": "0", "border": "0", "cursor": "inherit", "z-index": "1"}, "&:has(input:checked) > img": {"display": "block", "filter": "brightness(0) invert(1)"}}, "order": {"&:has(input:focus-visible)": ["outline", "outline-offset"]}},
    {"id": "checkbox_xlarge", "size": "Xlarge", "state": "Default", "structure": "s1", "icons": ["icon_20"], "rules": {"&": {"width": "28px", "height": "28px", "border": "2px solid var(--color-static-black)", "background": "var(--color-common-100)", "cursor": "pointer", "flex": "0 0 28px", "display": "inline-grid", "place-items": "center"}, "&:has(input:checked)": {"border-color": "var(--color-static-black)", "background": "var(--color-static-black)"}, "& > img": {"display": "none", "height": "auto", "pointer-events": "none"}, "&:has(input:focus-visible)": {"outline": "2px solid var(--color-static-black)", "outline-offset": "2px"}, "& > input": {"position": "absolute", "inset": "0", "width": "100%", "height": "100%", "opacity": "0", "padding": "0", "border": "0", "cursor": "inherit", "z-index": "1"}, "&:has(input:checked) > img": {"display": "block", "filter": "brightness(0) invert(1)"}}, "order": {"&:has(input:focus-visible)": ["outline", "outline-offset"]}},
    {"id": "checkbox_small", "size": "Small", "state": "Checked", "structure": "s2", "icons": ["icon_8"], "rules": {"&": {"width": "16px", "height": "16px", "border": "2px solid var(--color-static-black)", "background": "var(--color-common-100)", "cursor": "pointer", "flex": "0 0 16px", "display": "inline-grid", "place-items": "center"}, "&:has(input:checked)": {"border-color": "var(--color-static-black)", "background": "var(--color-static-black)"}, "& > img": {"display": "none", "height": "auto", "pointer-events": "none"}, "&:has(input:focus-visible)": {"outline": "2px solid var(--color-static-black)", "outline-offset": "2px"}, "& > input": {"position": "absolute", "inset": "0", "width": "100%", "height": "100%", "opacity": "0", "padding": "0", "border": "0", "cursor": "inherit", "z-index": "1"}, "&:has(input:checked) > img": {"display": "block", "filter": "brightness(0) invert(1)"}}, "order": {"&:has(input:focus-visible)": ["outline", "outline-offset"]}},
    {"id": "checkbox_medium", "size": "Medium", "state": "Checked", "structure": "s2", "icons": ["icon_12"], "rules": {"&": {"width": "20px", "height": "20px", "border": "2px solid var(--color-static-black)", "background": "var(--color-common-100)", "cursor": "pointer", "flex": "0 0 20px", "display": "inline-grid", "place-items": "center"}, "&:has(input:checked)": {"border-color": "var(--color-static-black)", "background": "var(--color-static-black)"}, "& > img": {"display": "none", "height": "auto", "pointer-events": "none"}, "&:has(input:focus-visible)": {"outline": "2px solid var(--color-static-black)", "outline-offset": "2px"}, "& > input": {"position": "absolute", "inset": "0", "width": "100%", "height": "100%", "opacity": "0", "padding": "0", "border": "0", "cursor": "inherit", "z-index": "1"}, "&:has(input:checked) > img": {"display": "block", "filter": "brightness(0) invert(1)"}}, "order": {"&:has(input:focus-visible)": ["outline", "outline-offset"]}},
    {"id": "checkbox_large", "size": "Large", "state": "Checked", "structure": "s2", "icons": ["icon_16"], "rules": {"&": {"width": "24px", "height": "24px", "border": "2px solid var(--color-static-black)", "background": "var(--color-common-100)", "cursor": "pointer", "flex": "0 0 24px", "display": "inline-grid", "place-items": "center"}, "&:has(input:checked)": {"border-color": "var(--color-static-black)", "background": "var(--color-static-black)"}, "& > img": {"display": "none", "height": "auto", "pointer-events": "none"}, "&:has(input:focus-visible)": {"outline": "2px solid var(--color-static-black)", "outline-offset": "2px"}, "& > input": {"position": "absolute", "inset": "0", "width": "100%", "height": "100%", "opacity": "0", "padding": "0", "border": "0", "cursor": "inherit", "z-index": "1"}, "&:has(input:checked) > img": {"display": "block", "filter": "brightness(0) invert(1)"}}, "order": {"&:has(input:focus-visible)": ["outline", "outline-offset"]}},
    {"id": "checkbox_xlarge", "size": "Xlarge", "state": "Checked", "structure": "s2", "icons": ["icon_20"], "rules": {"&": {"width": "28px", "height": "28px", "border": "2px solid var(--color-static-black)", "background": "var(--color-common-100)", "cursor": "pointer", "flex": "0 0 28px", "display": "inline-grid", "place-items": "center"}, "&:has(input:checked)": {"border-color": "var(--color-static-black)", "background": "var(--color-static-black)"}, "& > img": {"display": "none", "height": "auto", "pointer-events": "none"}, "&:has(input:focus-visible)": {"outline": "2px solid var(--color-static-black)", "outline-offset": "2px"}, "& > input": {"position": "absolute", "inset": "0", "width": "100%", "height": "100%", "opacity": "0", "padding": "0", "border": "0", "cursor": "inherit", "z-index": "1"}, "&:has(input:checked) > img": {"display": "block", "filter": "brightness(0) invert(1)"}}, "order": {"&:has(input:focus-visible)": ["outline", "outline-offset"]}},
    {"id": "checkbox_disabled_small", "size": "Small", "state": "Disabled", "structure": "s3", "rules": {"&": {"width": "16px", "height": "16px", "border": "0", "background": "var(--color-interaction-disable)", "cursor": "default", "flex": "0 0 16px", "color": "var(--color-label-disable)"}, "&:focus-visible": {"outline": "2px solid var(--color-blue-50)", "outline-offset": "2px"}}, "order": {"&:focus-visible": ["outline", "outline-offset"]}},
    {"id": "checkbox_disabled_medium", "size": "Medium", "state": "Disabled", "structure": "s3", "rules": {"&": {"width": "20px", "height": "20px", "border": "0", "background": "var(--color-interaction-disable)", "cursor": "default", "flex": "0 0 20px", "color": "var(--color-label-disable)"}, "&:focus-visible": {"outline": "2px solid var(--color-blue-50)", "outline-offset": "2px"}}, "order": {"&:focus-visible": ["outline", "outline-offset"]}},
    {"id": "checkbox_disabled_large", "size": "Large", "state": "Disabled", "structure": "s3", "rules": {"&": {"width": "24px", "height": "24px", "border": "0", "background": "var(--color-interaction-disable)", "cursor": "default", "flex": "0 0 24px", "color": "var(--color-label-disable)"}, "&:focus-visible": {"outline": "2px solid var(--color-blue-50)", "outline-offset": "2px"}}, "order": {"&:focus-visible": ["outline", "outline-offset"]}},
    {"id": "checkbox_disabled_xlarge", "size": "Xlarge", "state": "Disabled", "structure": "s3", "rules": {"&": {"width": "28px", "height": "28px", "border": "0", "background": "var(--color-interaction-disable)", "cursor": "default", "flex": "0 0 28px", "color": "var(--color-label-disable)"}, "&:focus-visible": {"outline": "2px solid var(--color-blue-50)", "outline-offset": "2px"}}, "order": {"&:focus-visible": ["outline", "outline-offset"]}}
  ]
}
```

### C69 Checkbox / Round

열: Small / Medium / Large / Xlarge.

```json
{
  "shared": {
    "&": {"position": "relative", "appearance": "none", "border-radius": "9999px", "padding": "0", "box-sizing": "border-box", "font-family": "inherit"}
  },
  "structures": {
    "s1": "<label class=\"{{component}}\"><input type=\"checkbox\" aria-label=\"예시\"><img class=\"{{icon_1_class}}\" src=\"{{icon_1_src}}\" alt=\"\" aria-hidden=\"true\"></label>",
    "s2": "<label class=\"{{component}}\"><input type=\"checkbox\" aria-label=\"예시\" checked><img class=\"{{icon_1_class}}\" src=\"{{icon_1_src}}\" alt=\"\" aria-hidden=\"true\"></label>",
    "s3": "<input class=\"{{component}}\" type=\"checkbox\" aria-label=\"예시\" disabled>"
  },
  "variants": [
    {"id": "checkbox_round_small", "size": "Small", "state": "Default", "structure": "s1", "icons": ["icon_8"], "rules": {"&": {"width": "16px", "height": "16px", "border": "1px solid var(--color-static-black)", "background": "var(--color-common-100)", "cursor": "pointer", "flex": "0 0 16px", "display": "inline-grid", "place-items": "center"}, "&:has(input:checked)": {"border-color": "var(--color-static-black)", "background": "var(--color-static-black)"}, "& > img": {"display": "none", "height": "auto", "pointer-events": "none"}, "&:has(input:focus-visible)": {"outline": "2px solid var(--color-static-black)", "outline-offset": "2px"}, "& > input": {"position": "absolute", "inset": "0", "width": "100%", "height": "100%", "opacity": "0", "padding": "0", "border": "0", "cursor": "inherit", "z-index": "1"}, "&:has(input:checked) > img": {"display": "block", "filter": "brightness(0) invert(1)"}}, "order": {"&:has(input:focus-visible)": ["outline", "outline-offset"]}},
    {"id": "checkbox_round_medium", "size": "Medium", "state": "Default", "structure": "s1", "icons": ["icon_12"], "rules": {"&": {"width": "20px", "height": "20px", "border": "1px solid var(--color-static-black)", "background": "var(--color-common-100)", "cursor": "pointer", "flex": "0 0 20px", "display": "inline-grid", "place-items": "center"}, "&:has(input:checked)": {"border-color": "var(--color-static-black)", "background": "var(--color-static-black)"}, "& > img": {"display": "none", "height": "auto", "pointer-events": "none"}, "&:has(input:focus-visible)": {"outline": "2px solid var(--color-static-black)", "outline-offset": "2px"}, "& > input": {"position": "absolute", "inset": "0", "width": "100%", "height": "100%", "opacity": "0", "padding": "0", "border": "0", "cursor": "inherit", "z-index": "1"}, "&:has(input:checked) > img": {"display": "block", "filter": "brightness(0) invert(1)"}}, "order": {"&:has(input:focus-visible)": ["outline", "outline-offset"]}},
    {"id": "checkbox_round_large", "size": "Large", "state": "Default", "structure": "s1", "icons": ["icon_16"], "rules": {"&": {"width": "24px", "height": "24px", "border": "1px solid var(--color-static-black)", "background": "var(--color-common-100)", "cursor": "pointer", "flex": "0 0 24px", "display": "inline-grid", "place-items": "center"}, "&:has(input:checked)": {"border-color": "var(--color-static-black)", "background": "var(--color-static-black)"}, "& > img": {"display": "none", "height": "auto", "pointer-events": "none"}, "&:has(input:focus-visible)": {"outline": "2px solid var(--color-static-black)", "outline-offset": "2px"}, "& > input": {"position": "absolute", "inset": "0", "width": "100%", "height": "100%", "opacity": "0", "padding": "0", "border": "0", "cursor": "inherit", "z-index": "1"}, "&:has(input:checked) > img": {"display": "block", "filter": "brightness(0) invert(1)"}}, "order": {"&:has(input:focus-visible)": ["outline", "outline-offset"]}},
    {"id": "checkbox_round_xlarge", "size": "Xlarge", "state": "Default", "structure": "s1", "icons": ["icon_20"], "rules": {"&": {"width": "28px", "height": "28px", "border": "1px solid var(--color-static-black)", "background": "var(--color-common-100)", "cursor": "pointer", "flex": "0 0 28px", "display": "inline-grid", "place-items": "center"}, "&:has(input:checked)": {"border-color": "var(--color-static-black)", "background": "var(--color-static-black)"}, "& > img": {"display": "none", "height": "auto", "pointer-events": "none"}, "&:has(input:focus-visible)": {"outline": "2px solid var(--color-static-black)", "outline-offset": "2px"}, "& > input": {"position": "absolute", "inset": "0", "width": "100%", "height": "100%", "opacity": "0", "padding": "0", "border": "0", "cursor": "inherit", "z-index": "1"}, "&:has(input:checked) > img": {"display": "block", "filter": "brightness(0) invert(1)"}}, "order": {"&:has(input:focus-visible)": ["outline", "outline-offset"]}},
    {"id": "checkbox_round_small", "size": "Small", "state": "Checked", "structure": "s2", "icons": ["icon_8"], "rules": {"&": {"width": "16px", "height": "16px", "border": "1px solid var(--color-static-black)", "background": "var(--color-common-100)", "cursor": "pointer", "flex": "0 0 16px", "display": "inline-grid", "place-items": "center"}, "&:has(input:checked)": {"border-color": "var(--color-static-black)", "background": "var(--color-static-black)"}, "& > img": {"display": "none", "height": "auto", "pointer-events": "none"}, "&:has(input:focus-visible)": {"outline": "2px solid var(--color-static-black)", "outline-offset": "2px"}, "& > input": {"position": "absolute", "inset": "0", "width": "100%", "height": "100%", "opacity": "0", "padding": "0", "border": "0", "cursor": "inherit", "z-index": "1"}, "&:has(input:checked) > img": {"display": "block", "filter": "brightness(0) invert(1)"}}, "order": {"&:has(input:focus-visible)": ["outline", "outline-offset"]}},
    {"id": "checkbox_round_medium", "size": "Medium", "state": "Checked", "structure": "s2", "icons": ["icon_12"], "rules": {"&": {"width": "20px", "height": "20px", "border": "1px solid var(--color-static-black)", "background": "var(--color-common-100)", "cursor": "pointer", "flex": "0 0 20px", "display": "inline-grid", "place-items": "center"}, "&:has(input:checked)": {"border-color": "var(--color-static-black)", "background": "var(--color-static-black)"}, "& > img": {"display": "none", "height": "auto", "pointer-events": "none"}, "&:has(input:focus-visible)": {"outline": "2px solid var(--color-static-black)", "outline-offset": "2px"}, "& > input": {"position": "absolute", "inset": "0", "width": "100%", "height": "100%", "opacity": "0", "padding": "0", "border": "0", "cursor": "inherit", "z-index": "1"}, "&:has(input:checked) > img": {"display": "block", "filter": "brightness(0) invert(1)"}}, "order": {"&:has(input:focus-visible)": ["outline", "outline-offset"]}},
    {"id": "checkbox_round_large", "size": "Large", "state": "Checked", "structure": "s2", "icons": ["icon_16"], "rules": {"&": {"width": "24px", "height": "24px", "border": "1px solid var(--color-static-black)", "background": "var(--color-common-100)", "cursor": "pointer", "flex": "0 0 24px", "display": "inline-grid", "place-items": "center"}, "&:has(input:checked)": {"border-color": "var(--color-static-black)", "background": "var(--color-static-black)"}, "& > img": {"display": "none", "height": "auto", "pointer-events": "none"}, "&:has(input:focus-visible)": {"outline": "2px solid var(--color-static-black)", "outline-offset": "2px"}, "& > input": {"position": "absolute", "inset": "0", "width": "100%", "height": "100%", "opacity": "0", "padding": "0", "border": "0", "cursor": "inherit", "z-index": "1"}, "&:has(input:checked) > img": {"display": "block", "filter": "brightness(0) invert(1)"}}, "order": {"&:has(input:focus-visible)": ["outline", "outline-offset"]}},
    {"id": "checkbox_round_xlarge", "size": "Xlarge", "state": "Checked", "structure": "s2", "icons": ["icon_20"], "rules": {"&": {"width": "28px", "height": "28px", "border": "1px solid var(--color-static-black)", "background": "var(--color-common-100)", "cursor": "pointer", "flex": "0 0 28px", "display": "inline-grid", "place-items": "center"}, "&:has(input:checked)": {"border-color": "var(--color-static-black)", "background": "var(--color-static-black)"}, "& > img": {"display": "none", "height": "auto", "pointer-events": "none"}, "&:has(input:focus-visible)": {"outline": "2px solid var(--color-static-black)", "outline-offset": "2px"}, "& > input": {"position": "absolute", "inset": "0", "width": "100%", "height": "100%", "opacity": "0", "padding": "0", "border": "0", "cursor": "inherit", "z-index": "1"}, "&:has(input:checked) > img": {"display": "block", "filter": "brightness(0) invert(1)"}}, "order": {"&:has(input:focus-visible)": ["outline", "outline-offset"]}},
    {"id": "checkbox_round_disabled_small", "size": "Small", "state": "Disabled", "structure": "s3", "rules": {"&": {"width": "16px", "height": "16px", "border": "0", "background": "var(--color-interaction-disable)", "cursor": "default", "flex": "0 0 16px", "color": "var(--color-label-disable)"}, "&:focus-visible": {"outline": "2px solid var(--color-blue-50)", "outline-offset": "2px"}}, "order": {"&:focus-visible": ["outline", "outline-offset"]}},
    {"id": "checkbox_round_disabled_medium", "size": "Medium", "state": "Disabled", "structure": "s3", "rules": {"&": {"width": "20px", "height": "20px", "border": "0", "background": "var(--color-interaction-disable)", "cursor": "default", "flex": "0 0 20px", "color": "var(--color-label-disable)"}, "&:focus-visible": {"outline": "2px solid var(--color-blue-50)", "outline-offset": "2px"}}, "order": {"&:focus-visible": ["outline", "outline-offset"]}},
    {"id": "checkbox_round_disabled_large", "size": "Large", "state": "Disabled", "structure": "s3", "rules": {"&": {"width": "24px", "height": "24px", "border": "0", "background": "var(--color-interaction-disable)", "cursor": "default", "flex": "0 0 24px", "color": "var(--color-label-disable)"}, "&:focus-visible": {"outline": "2px solid var(--color-blue-50)", "outline-offset": "2px"}}, "order": {"&:focus-visible": ["outline", "outline-offset"]}},
    {"id": "checkbox_round_disabled_xlarge", "size": "Xlarge", "state": "Disabled", "structure": "s3", "rules": {"&": {"width": "28px", "height": "28px", "border": "0", "background": "var(--color-interaction-disable)", "cursor": "default", "flex": "0 0 28px", "color": "var(--color-label-disable)"}, "&:focus-visible": {"outline": "2px solid var(--color-blue-50)", "outline-offset": "2px"}}, "order": {"&:focus-visible": ["outline", "outline-offset"]}}
  ]
}
```

### C70 Radio Button

열: Small / Medium / Large / Xlarge.

```json
{
  "shared": {
    "&": {"position": "relative", "appearance": "none", "border-radius": "9999px", "padding": "0", "box-sizing": "border-box", "font-family": "inherit"},
    "&:focus-visible": {"outline": "2px solid var(--color-blue-50)", "outline-offset": "2px"}
  },
  "structures": {
    "s1": "<input class=\"{{component}}\" type=\"radio\" name=\"radio-default-small\" aria-label=\"예시\">",
    "s2": "<input class=\"{{component}}\" type=\"radio\" name=\"radio-default-medium\" aria-label=\"예시\">",
    "s3": "<input class=\"{{component}}\" type=\"radio\" name=\"radio-default-large\" aria-label=\"예시\">",
    "s4": "<input class=\"{{component}}\" type=\"radio\" name=\"radio-default-xlarge\" aria-label=\"예시\">",
    "s5": "<input class=\"{{component}}\" type=\"radio\" name=\"radio-checked-small\" aria-label=\"예시\" checked>",
    "s6": "<input class=\"{{component}}\" type=\"radio\" name=\"radio-checked-medium\" aria-label=\"예시\" checked>",
    "s7": "<input class=\"{{component}}\" type=\"radio\" name=\"radio-checked-large\" aria-label=\"예시\" checked>",
    "s8": "<input class=\"{{component}}\" type=\"radio\" name=\"radio-checked-xlarge\" aria-label=\"예시\" checked>",
    "s9": "<input class=\"{{component}}\" type=\"radio\" name=\"radio-disabled-small\" aria-label=\"예시\" disabled>",
    "s10": "<input class=\"{{component}}\" type=\"radio\" name=\"radio-disabled-medium\" aria-label=\"예시\" disabled>",
    "s11": "<input class=\"{{component}}\" type=\"radio\" name=\"radio-disabled-large\" aria-label=\"예시\" disabled>",
    "s12": "<input class=\"{{component}}\" type=\"radio\" name=\"radio-disabled-xlarge\" aria-label=\"예시\" disabled>"
  },
  "variants": [
    {"id": "radio_small", "size": "Small", "state": "Default", "structure": "s1", "rules": {"&": {"width": "16px", "height": "16px", "border": "2px solid var(--color-blue-50)", "background": "var(--color-common-100)", "cursor": "pointer", "flex": "0 0 16px"}, "&:checked": {"border-color": "var(--color-blue-50)"}, "&:checked::after": {"position": "absolute", "top": "50%", "left": "50%", "width": "8px", "height": "8px", "border-radius": "9999px", "background": "var(--color-blue-50)", "transform": "translate(-50%, -50%)", "content": "\"\""}}, "order": {"&:focus-visible": ["outline", "outline-offset"]}, "selectors": ["&", "&:checked", "&:checked::after", "&:focus-visible"]},
    {"id": "radio_medium", "size": "Medium", "state": "Default", "structure": "s2", "rules": {"&": {"width": "20px", "height": "20px", "border": "2px solid var(--color-blue-50)", "background": "var(--color-common-100)", "cursor": "pointer", "flex": "0 0 20px"}, "&:checked": {"border-color": "var(--color-blue-50)"}, "&:checked::after": {"position": "absolute", "top": "50%", "left": "50%", "width": "10px", "height": "10px", "border-radius": "9999px", "background": "var(--color-blue-50)", "transform": "translate(-50%, -50%)", "content": "\"\""}}, "order": {"&:focus-visible": ["outline", "outline-offset"]}, "selectors": ["&", "&:checked", "&:checked::after", "&:focus-visible"]},
    {"id": "radio_large", "size": "Large", "state": "Default", "structure": "s3", "rules": {"&": {"width": "24px", "height": "24px", "border": "2px solid var(--color-blue-50)", "background": "var(--color-common-100)", "cursor": "pointer", "flex": "0 0 24px"}, "&:checked": {"border-color": "var(--color-blue-50)"}, "&:checked::after": {"position": "absolute", "top": "50%", "left": "50%", "width": "12px", "height": "12px", "border-radius": "9999px", "background": "var(--color-blue-50)", "transform": "translate(-50%, -50%)", "content": "\"\""}}, "order": {"&:focus-visible": ["outline", "outline-offset"]}, "selectors": ["&", "&:checked", "&:checked::after", "&:focus-visible"]},
    {"id": "radio_xlarge", "size": "Xlarge", "state": "Default", "structure": "s4", "rules": {"&": {"width": "28px", "height": "28px", "border": "2px solid var(--color-blue-50)", "background": "var(--color-common-100)", "cursor": "pointer", "flex": "0 0 28px"}, "&:checked": {"border-color": "var(--color-blue-50)"}, "&:checked::after": {"position": "absolute", "top": "50%", "left": "50%", "width": "14px", "height": "14px", "border-radius": "9999px", "background": "var(--color-blue-50)", "transform": "translate(-50%, -50%)", "content": "\"\""}}, "order": {"&:focus-visible": ["outline", "outline-offset"]}, "selectors": ["&", "&:checked", "&:checked::after", "&:focus-visible"]},
    {"id": "radio_small", "size": "Small", "state": "Checked", "structure": "s5", "rules": {"&": {"width": "16px", "height": "16px", "border": "2px solid var(--color-blue-50)", "background": "var(--color-common-100)", "cursor": "pointer", "flex": "0 0 16px"}, "&:checked": {"border-color": "var(--color-blue-50)"}, "&:checked::after": {"position": "absolute", "top": "50%", "left": "50%", "width": "8px", "height": "8px", "border-radius": "9999px", "background": "var(--color-blue-50)", "transform": "translate(-50%, -50%)", "content": "\"\""}}, "order": {"&:focus-visible": ["outline", "outline-offset"]}, "selectors": ["&", "&:checked", "&:checked::after", "&:focus-visible"]},
    {"id": "radio_medium", "size": "Medium", "state": "Checked", "structure": "s6", "rules": {"&": {"width": "20px", "height": "20px", "border": "2px solid var(--color-blue-50)", "background": "var(--color-common-100)", "cursor": "pointer", "flex": "0 0 20px"}, "&:checked": {"border-color": "var(--color-blue-50)"}, "&:checked::after": {"position": "absolute", "top": "50%", "left": "50%", "width": "10px", "height": "10px", "border-radius": "9999px", "background": "var(--color-blue-50)", "transform": "translate(-50%, -50%)", "content": "\"\""}}, "order": {"&:focus-visible": ["outline", "outline-offset"]}, "selectors": ["&", "&:checked", "&:checked::after", "&:focus-visible"]},
    {"id": "radio_large", "size": "Large", "state": "Checked", "structure": "s7", "rules": {"&": {"width": "24px", "height": "24px", "border": "2px solid var(--color-blue-50)", "background": "var(--color-common-100)", "cursor": "pointer", "flex": "0 0 24px"}, "&:checked": {"border-color": "var(--color-blue-50)"}, "&:checked::after": {"position": "absolute", "top": "50%", "left": "50%", "width": "12px", "height": "12px", "border-radius": "9999px", "background": "var(--color-blue-50)", "transform": "translate(-50%, -50%)", "content": "\"\""}}, "order": {"&:focus-visible": ["outline", "outline-offset"]}, "selectors": ["&", "&:checked", "&:checked::after", "&:focus-visible"]},
    {"id": "radio_xlarge", "size": "Xlarge", "state": "Checked", "structure": "s8", "rules": {"&": {"width": "28px", "height": "28px", "border": "2px solid var(--color-blue-50)", "background": "var(--color-common-100)", "cursor": "pointer", "flex": "0 0 28px"}, "&:checked": {"border-color": "var(--color-blue-50)"}, "&:checked::after": {"position": "absolute", "top": "50%", "left": "50%", "width": "14px", "height": "14px", "border-radius": "9999px", "background": "var(--color-blue-50)", "transform": "translate(-50%, -50%)", "content": "\"\""}}, "order": {"&:focus-visible": ["outline", "outline-offset"]}, "selectors": ["&", "&:checked", "&:checked::after", "&:focus-visible"]},
    {"id": "radio_disabled_small", "size": "Small", "state": "Disabled", "structure": "s9", "rules": {"&": {"width": "16px", "height": "16px", "border": "0", "background": "var(--color-interaction-disable)", "cursor": "default", "flex": "0 0 16px", "color": "var(--color-label-disable)"}}, "order": {"&:focus-visible": ["outline", "outline-offset"]}},
    {"id": "radio_disabled_medium", "size": "Medium", "state": "Disabled", "structure": "s10", "rules": {"&": {"width": "20px", "height": "20px", "border": "0", "background": "var(--color-interaction-disable)", "cursor": "default", "flex": "0 0 20px", "color": "var(--color-label-disable)"}}, "order": {"&:focus-visible": ["outline", "outline-offset"]}},
    {"id": "radio_disabled_large", "size": "Large", "state": "Disabled", "structure": "s11", "rules": {"&": {"width": "24px", "height": "24px", "border": "0", "background": "var(--color-interaction-disable)", "cursor": "default", "flex": "0 0 24px", "color": "var(--color-label-disable)"}}, "order": {"&:focus-visible": ["outline", "outline-offset"]}},
    {"id": "radio_disabled_xlarge", "size": "Xlarge", "state": "Disabled", "structure": "s12", "rules": {"&": {"width": "28px", "height": "28px", "border": "0", "background": "var(--color-interaction-disable)", "cursor": "default", "flex": "0 0 28px", "color": "var(--color-label-disable)"}}, "order": {"&:focus-visible": ["outline", "outline-offset"]}}
  ]
}
```

## 12. 완료 조건

- Atomic 전체, Semantic 역할, 의존 색상, Typography 39개 조합, 아이콘 14개 너비가 누락 없이 제공되어 있다.
- 컴포넌트 선택이 명확하며 개별 수치·내부 요소·아이콘·상태를 빠짐없이 구현했다.
- 모든 텍스트가 등록 크기·굵기·행간이고 기본 자간 0이다. 국문·영문 115px 행간 예외를 혼동하지 않는다.
- 16개 Design Rules의 간격·대칭 패딩·정렬·위계·반응형·읽기 순서·긴 텍스트 처리를 검수했다.
- 색상·폰트 이외 임의 수치, 옛 시스템 토큰·규격, 문서 사이트 UI의 여백을 섞지 않았다.
- 중복 Reset, 미정의 변수, 자산 자리표시자, 폰트 실패, 유틸리티 수치 불일치가 없다.
- 키보드, disabled/readonly/checked, 좁은 화면, 확대, 상태 전환을 확인했다. 미수행 테스트는 별도로 보고한다.
- 이탈·기존 종류의 새 디자인은 구현 전에 설명했고 범위를 구분했다. 단위 환산·클래스 분리·태그 선택만 바뀐 것을 이탈로 잘못 분류하지 않았다.

### 출처와 범위

직접 기준은 최신 `designSystem-v3.html`의 표시 항목과 개별 컴포넌트 CSS다. 구 MD, v1/v2, 브랜드별 과거 규격을 새 기준처럼 사용하지 않는다. 실제 적용 값이 이 MD에 있으므로 원본 HTML을 추가로 받아야만 사용할 수 있는 문서가 아니다.

원본에 기록된 참고 시스템은 Wanted, Toss, Gmarket, [KRDS](https://www.krds.go.kr/html/site/style/style_01.html), [USWDS](https://designsystem.digital.gov/components/form/), [GOV.UK Design System](https://design-system.service.gov.uk/styles/layout/), [W3C WCAG 2.2](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html)다. 최소 12px, 간격 4px, 개별 버튼 크기 등은 **자체 설계 기준**이지 외부 기관의 일률적 의무 수치가 아니다. 참고 사이트의 다른 수치로 이 문서의 규격을 덮지 않는다.

### 추출 범위 기록

```json
{
  "source": "designSystem-v3.html",
  "sourceSha256": "f64833677e898cf684a133d31d31519cc8e7dbf31993f2367b0b403524bcf76d",
  "atomicPalettes": 19,
  "atomicTokens": 222,
  "colorTokensWithDependencies": 254,
  "typographyStylesPerLanguage": 39,
  "iconWidths": [
    8,
    12,
    14,
    16,
    18,
    20,
    24,
    28,
    32,
    40,
    45,
    80,
    120,
    180
  ],
  "designRules": 16,
  "componentTables": 70,
  "componentIds": 736,
  "componentExamples": 748,
  "excluded": [
    "Module",
    "Icon artwork catalog",
    "Documentation layout",
    "Unused legacy CSS"
  ],
  "normalization": {
    "hashtag_line_height": "1.8 -> 1.5 (Foundation and Design Rules)"
  }
}
```
