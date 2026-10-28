# Field와 폼

Field 안에 TextInput·UnderlineTextInput·TextArea·AutoHeightTextArea·Select 중 하나를 넣습니다. 복제된 TextInputField는 없습니다.

```tsx
<Field label="이메일" error={errorMessage} description="이메일을 입력하세요." messageColor="red">
  <TextInput type="email" name="email" required />
</Field>
```

검증 기준·시점·문구는 프로젝트가 정합니다. error가 있으면 오류, 없으면 description을 표시하고 둘 다 없으면 빈 하단 간격을 만들지 않습니다. required/pattern 등 폼 제약과 표시용 error는 구분됩니다. 프로젝트 오류로 제출도 차단하려면 입력의 setCustomValidity(message)를 사용합니다.

Field 자체는 왼쪽 정렬, gap은 var(--h_designSystem-unit-16)입니다. 문구 red·green·blue는 Status Negative·Positive·Informative와 연결합니다. 기본 오류는 빨강, 안내는 파랑이며 색상과 오류 여부는 독립입니다.

라벨 클릭은 입력을 focus합니다. Context로 이름·설명을 입력 Shadow DOM 내부에 연결합니다. 기존 aria-label/aria-labelledby를 우선하고 aria-describedby의 설명 텍스트와 Field 문구를 병합합니다. htmlFor(HTML의 for)는 대상 선택에 사용하며 입력 id 생성은 필수가 아닙니다.

TextInput·TextArea는 기존 오류 외형을 사용합니다. 다른 입력에 없던 오류 테두리나 배경은 추가하지 않습니다. Filled 오류 배경 red-95와 placeholder red-70을 유지합니다.

ElementInternals로 FormData·reset·외부 form·fieldset disabled·네이티브 제약 검증에 참여합니다. 제출 버튼은 name/value를 포함하는 네이티브 submitter를 사용합니다. input은 입력 시, change는 변경 확정 시 전달하며 외부 값 변경은 이벤트를 만들지 않습니다.
