# 기본 색상과 프로젝트 색상

패키지의 기본 색상은 유지합니다. 지정하지 않으면 기존 디자인 그대로 표시됩니다. 프로젝트는 공개 변수로 배경색·글자색을 변경합니다.

```css
h-button.brand-button {
  --h_designSystem-component-bg: purple;
  --h_designSystem-component-text: white;
}
```

```tsx
<Button className="brand-button">확인</Button>
```

HTML·Vue·Svelte는 같은 태그에 class="brand-button"을 사용합니다. 기본 규칙은 기존 색상 토큰을 fallback으로 제공합니다. 오류·disabled·readonly 등 상태별 표현은 유지합니다. 체크/토글 손잡이와 Field 상태 문구를 배경색 변수로 함께 덮어쓰지 않습니다. Field 문구는 messageColor로 선택합니다.

CSS 변수는 Shadow DOM 안으로 상속됩니다. 외부의 내부 클래스 선택자는 Shadow DOM에 닿지 않습니다. 크기·반경·패딩을 바꾸는 공개 테마 변수는 없으며 size·shape·variant의 등록 규격을 선택합니다.

SVG의 고정 fill은 글자색과 자동 동기화되지 않습니다. 원하는 색 SVG 또는 currentColor를 쓰는 자체 SVG를 슬롯으로 전달합니다. 기본 아이콘의 상태 표현은 유지합니다.
