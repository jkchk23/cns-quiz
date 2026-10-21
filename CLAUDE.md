# 약리·미생물 문제 (iPad 웹앱, GitHub Pages)

배포: https://jkchk23.github.io/cns-quiz/ — main 브랜치 루트가 그대로 서비스됨.
한 저장소에 두 과목 앱이 있고, 각 앱 첫 화면 맨 위의 전환 메뉴로 오간다. 홈 화면 아이콘은 하나.
(미생물은 원래 jkchk23/micro-essay에 있었고 여기로 합쳐짐. 이후 수정은 이 저장소에서만 한다.)

| 경로 | 앱 | 원본 |
|---|---|---|
| `cns/` | CNS 약리 객관식 | `src/cns/` |
| `micro/` | 미생물 서술형 | `src/micro/` |
| `index.html` | 시작 페이지 — 마지막으로 연 과목으로 즉시 이동 | `build.py` 안 |

## 구조
- `src/shared/hub.js`, `hub.css` — 과목 전환 메뉴(`subjectSwitcher()`), 화면 색(`getTheme`/`setTheme`), 마지막 과목, 서비스워커 등록. 두 앱에 똑같이 들어감
  - 새 과목을 추가하려면 `SUBJECTS`에 한 줄, `build.py`의 `APPS`에 한 줄, `src/<id>/` 폴더 추가. 시작 페이지·sw의 과목 목록도 함께 고칠 것
- CNS (`src/cns/`)
  - `data_drugs.js` — 약물 표 `DRUG_ROWS`: [이름, 단원, 분류, 기전, 기전그룹, 용도, 특징, 플래그(nc/nm), 특징문제 제외약]
    - 기전그룹이 겹치는 약끼리는 자동 문제의 오답 보기로 쓰이지 않음 → 새 약 추가 시 그룹을 정확히 넣을 것
    - 특징(sig)은 같은 단원에서 그 약에만 해당해야 함. 다른 약도 해당하면 9번째 칸에 제외 목록 추가
  - `data_curated.js` — 개념 문제 `CURATED`: [단원, 문제, 정답, [오답 4개], 해설]
  - `engine.js` — 문제 풀 생성·보기 생성 규칙 / `ui.js`, `template.html` — 화면
- 미생물 (`src/micro/`)
  - `data_essay.js` — `UNITS`(조정제 교수님 17~20강), 서술형 문항 `ESSAYS`
    - `rubric`: 채점 항목 `{t: 설명, w: 가중치, k: [[대안…],[대안…]]}` → 각 묶음에서 하나 이상 답안에 있으면 인정(AND of OR)
    - 키워드는 공백·문장부호를 지우고 소문자로 비교(`engine.js`의 `norm`). 너무 짧은 키워드(예: 'na')는 오인식되니 피할 것
    - `model`: 모범답안 HTML, `tip`: 족보 해설·교수님 강조, `jokbo`: 족보 출처
  - `engine.js` — 채점 / `ui.js`, `template.html` — 화면
- `build.py` — src를 합쳐 `cns/index.html`, `micro/index.html`, 루트 `index.html`·`sw.js`(화면은 네트워크 우선 → 온라인이면 즉시 최신 반영)·`manifest.json` 생성

## 수정 절차
1. `src/`만 고친다 (`cns/`, `micro/`, 루트 `index.html` 직접 수정 금지)
2. `python3 build.py`
3. `node test/cns_check.js` (보기 중복·정답 누락 없음) · `node test/micro_test.js` (모범답안 100점, 빈 답 0점)
4. 커밋 후 main에 push

## 저장 (localStorage, 같은 저장공간을 두 앱이 공유)
- `study-hub-v1` — 공용: `theme`, `last`(마지막 과목)
- `cns-quiz-v1` — CNS 기록. 문제 id로 저장. 개념 문제 id는 문제+정답 텍스트 해시라, 문구를 바꾸면 그 문항 기록은 초기화됨
- `micro-essay-v1` — 미생물 기록: `q`(id → 점수 기록), `draft`(작성 중 답안), `set`(설정)
- 각 앱 `state.set.theme`은 옛 값(첫 실행 때 `study-hub-v1`로 옮겨짐). 화면 색은 `getTheme()`만 쓸 것
