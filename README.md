# Three.js Time Series 프로젝트

## 프로젝트 목표:

React와 three.js를 사용하여 한국 관련 시계열 데이터를 기반으로 3D 오브젝트(큐브)를 시각적으로 업데이트하고, GitHub Actions를 통해 CI/CD 자동 배포를 구현합니다.

### 주요 기능:

- 시계열 데이터 로딩 및 시각적 반영
- React와 three.js를 이용한 3D 오브젝트 생성 및 업데이트
- 간단한 CI/CD 파이프라인 설정 및 자동 배포

### 스택 :

- three.js
- python
- react
- papaparse
  ...

## 개발 환경 설정

### 프론트엔드 (React)

1. **의존성 설치:**

   ```bash
   npm install
   ```

2. **개발 서버 실행:**
   ```bash
   npm start
   ```

### 백엔드/스크립트 (Python)

1. **가상 환경 생성 및 활성화:**

   ```bash
   python -m venv venv
   source venv/bin/activate    # macOS/Linux
   venv\Scripts\activate       # Windows
   ```

2. **의존성 설치:**

   ```bash
   pip install -r requirements.txt
   ```

3. **스크립트 실행:**
   ```bash
   python scripts/convert_excel_to_csv.py
   ```
