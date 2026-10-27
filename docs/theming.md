# 테마

색상 변수는 --h_designSystem-color-*입니다. 패키지 CSS는 h_designSystem 레이어에 있으며 프로젝트는 레이어 밖의 규칙이나 이후 레이어에서 재정의할 수 있습니다.

폰트는 프로젝트의 font-family를 상속합니다. 폰트 파일은 제공하지 않습니다.

4배수 수치는 --h_designSystem-unit-16 같은 변수를 사용합니다. 숫자는 px 값이며 순번이 아닙니다. 크기·여백 변경을 색상 테마와 함께 수행하지 않습니다.

컴포넌트별 테마는 해당 클래스 범위에서 색상 변수를 재정의할 수 있습니다. 예: .h_designSystem-Button { --h_designSystem-color-static-black: #0054d1; } 이 변경은 다른 컴포넌트에 영향을 주지 않습니다.
