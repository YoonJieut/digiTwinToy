## 준비

- react 테스팅
- three 설치
  react-three/drei 호완성 문제 발견 : react 19 -> 18버전으로 다운그래이드 시도
- 시계열 데이터 준비 : 기상청 자료 개방실에서 자료 다운

## 3d 오브잭트 생성 및 업데이트

- 동적 로직과 cube 컴포넌트로 3x3 큐브 생성
- tooltip을 마우스 포인터에 따라 생성하는 로직 생성

- [연구]가데이터(csv 파일) 1시간~24시간 데이터를 어떻게 핸들링 할 지 고민

이 데이터는 api를 받아온다는 가정하에 진행할 것, 그리고 DB서버 없이 진행할 것이기 때문에 client에게 일임하도록 설계
api를 통해 받아오는 방법을 로컬로 바뀐 것 말고는 다를 것이 없다.

- [구현] 계획대로 로컬 파일을 읽고 파일 파싱하는 것으로 구현 완료, 파일이 깨져있어서 매니패스트 방식을 활용하였음. 파싱 방식은 규칙성이 없어 임의로 규칙성을 찾아 구현해보았음.

- 하단 슬라이드 바를 통해 1시간 ~ 24시간 표시, 이에 따라 데이터 업데이트

1. 슬라이드바 작성 X
2. 해석 로직 하나 x
3. Mesh에 반응하는 데이터기반 렌더링 로직 하나 x

## 1. tooltip이 나타나지 않는 오류가 발생 (기능 미구현 버그)

- 무엇이 원인인지 아직 모르겠다.

## 2. csv 파일 해석 오류로 로직 변경 필요 (우선 작동은 됨, 추후 로직 추가로 변경)

- 어느 때는 작동하고 어느 때는 작동하지 않는 모습이 보임 원인은 3시간 간격으로 작성됨

=> csv 파일은 예측 데이터를 포함한 데이터였으며, 한 차례의 과정을 통해 각 시간 별 온도를 예측할 수 있을 것으로 보인다.

## 3. 데이터 및 코드 최적화 (가장 나중에, 물론 조금씩 하는 것도 좋다.)

- 코드가 난잡하고 분리가 필요해보인다.
- 파일에 나타난 경로를 분리해야 한다.

## Github CI/CD 설정 및 배포

- 자료 출처 : https://data.kma.go.kr/cmmn/main.do
