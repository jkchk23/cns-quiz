# CNS 약물 퀴즈 (iPad 웹앱, GitHub Pages)

배포: https://jkchk23.github.io/cns-quiz/ — main 브랜치 루트가 그대로 서비스됨.

## 구조
- `src/data_drugs.js` — 약물 표 `DRUG_ROWS`: [이름, 단원, 분류, 기전, 기전그룹, 용도, 특징, 플래그(nc/nm), 특징문제 제외약]
  - 기전그룹이 겹치는 약끼리는 자동 문제의 오답 보기로 쓰이지 않음 → 새 약 추가 시 그룹을 정확히 넣을 것
  - 특징(sig)은 같은 단원에서 그 약에만 해당해야 함. 다른 약도 해당하면 9번째 칸에 제외 목록 추가
- `src/data_curated.js` — 개념 문제 `CURATED`: [단원, 문제, 정답, [오답 4개], 해설]
- `src/engine.js` — 문제 풀 생성·보기 생성 규칙
- `src/ui.js`, `src/template.html` — 화면
- `build.py` — src를 합쳐 루트의 `index.html`, `sw.js`(화면은 네트워크 우선 → 온라인이면 즉시 최신 반영), `manifest.json` 생성

## 수정 절차
1. `src/`만 고친다 (루트 `index.html` 직접 수정 금지)
2. `python3 build.py`
3. 검증: 모든 문항에서 보기 중복·정답 누락이 없는지 node로 확인
4. 커밋 후 main에 push

학습 기록은 localStorage(`cns-quiz-v1`)에 문제 id로 저장됨. 개념 문제 id는 문제+정답 텍스트 해시라, 문구를 바꾸면 그 문항의 기록은 초기화됨.
