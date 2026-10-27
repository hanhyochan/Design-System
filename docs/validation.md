# 안내·오류 문구

Field 안에 TextInput, UnderlineTextInput, TextArea, AutoHeightTextArea, Select 중 하나를 넣습니다. label과 htmlFor, description과 error를 받습니다. 입력 id는 htmlFor와 맞추거나 생략해 Field 값을 상속합니다.

검증 기준·실행 시점·문구는 프로젝트가 결정합니다. Field는 검증을 실행하지 않습니다. 오류가 있으면 안내 대신 오류를 표시하며 오류가 없으면 안내를 표시합니다. 둘 다 없으면 하단 간격을 만들지 않습니다. aria-describedby는 기존 값과 병합하고 aria-invalid는 Field 오류와 연결합니다.

기본값: 세로 gap은 `var(--h_designSystem-unit-16)`(16px), 레이블 14px/500/1.5, 문구 14px/400/1.5입니다. `messageColor="red" | "green" | "blue"`로 문구 색상을 선택합니다. 각각 Status의 Negative·Positive·Informative 토큰을 사용합니다. 생략하면 오류는 빨강, 안내는 파랑입니다. 색상은 표시만 바꾸며, 오류 여부와 `aria-invalid`는 `error`로 결정합니다.

```tsx
<Field label="이메일" description="사용할 수 있는 이메일입니다." messageColor="green">
  <TextInput type="email" />
</Field>
```

일반 TextInput·TextArea는 기존 오류 외형도 연결합니다. 나머지 입력 계열은 미등록 보더를 추가하지 않고 문구·접근성 상태만 연결합니다.
