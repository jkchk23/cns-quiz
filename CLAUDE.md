# 약리·미생물 문제 (iPad 웹앱, GitHub Pages)

배포: https://jkchk23.github.io/cns-quiz/ — main 브랜치 루트가 그대로 서비스됨.
한 저장소에 두 과목 앱이 있고, 각 앱 첫 화면 맨 위의 전환 메뉴로 오간다. 홈 화면 아이콘은 하나.
(미생물은 원래 jkchk23/micro-essay에 있었고 여기로 합쳐짐. 이후 수정은 이 저장소에서만 한다.)

| 경로 | 앱 | 원본 |
|---|---|---|
| `pharm/` | 약리학 객관식 (박해정 교수님 CNS 7–10강 + 17–21강) | `src/pharm/` |
| `cns/` | 옛 주소 — `pharm/`으로 이동만 함 | `build.py` 안 |
| `micro/` | 미생물 서술형 | `src/micro/` |
| `index.html` | 시작 페이지 — 마지막으로 연 과목으로 즉시 이동 | `build.py` 안 |

## 구조
- `src/shared/hub.js`, `hub.css` — 과목 전환 메뉴(`subjectSwitcher()`), 화면 색(`getTheme`/`setTheme`), 마지막 과목, 서비스워커 등록. 두 앱에 똑같이 들어감
  - 새 과목을 추가하려면 `SUBJECTS`에 한 줄, `build.py`의 `APPS`에 한 줄, `src/<id>/` 폴더 추가. 시작 페이지·sw의 과목 목록도 함께 고칠 것
- 약리 (`src/pharm/`) — 2026-10 옛 CNS 자동생성 퀴즈를 폐기하고 강의록 + 2017–2025 기출 스타일로 새로 씀
  - `data_units.js` — 단원(`UNITS`, `UNIT_GROUPS`), 유형 태그(`TAGS`), 빈 문항 배열 `Q`
  - `q_cns1.js`(개론·진정수면·알코올·항전간) `q_cns2.js`(근이완·PD/AD·항정신병·항우울) `q_cns3.js`(마취·opioid·남용) `q_lec1.js`(이상지질·autacoid) `q_lec2.js`(NSAID·RA·통풍·호흡기·소화기) `q_extra.js`(보강)
  - 문항 형식: `[단원, "태그", 문제, [선지 5개], 정답, 해설, [선지별 메모 5개]]`
    - 정답은 1부터. 배열이면 '모두 고르시오'(복수 선택 UI) — 문제에 '모두'를 꼭 넣을 것
    - 태그: 증례 · 짝 · 부정 · 계산 · 빈출 ('모두'는 자동). 메모: 오답이면 왜 틀렸는지
    - 근거는 2025 강의록. 기출(프로젝트의 박해정_기출정리)과 답이 다르게 읽힐 선지는 피할 것
  - `engine.js` — 선지 섞기·채점 / `ui.js`, `template.html` — 화면
- 미생물 (`src/micro/`)
  - `data_essay.js` — `UNITS`(조정제 교수님 17~20강), 서술형 문항 `ESSAYS`
    - `rubric`: 채점 항목 `{t: 설명, w: 가중치, k: [[대안…],[대안…]]}` → 각 묶음에서 하나 이상 답안에 있으면 인정(AND of OR)
    - 키워드는 공백·문장부호를 지우고 소문자로 비교(`engine.js`의 `norm`). 너무 짧은 키워드(예: 'na')는 오인식되니 피할 것
    - `model`: 모범답안 HTML, `tip`: 족보 해설·교수님 강조, `jokbo`: 족보 출처
  - `engine.js` — 채점 / `ui.js`, `template.html` — 화면
- `build.py` — src를 합쳐 `pharm/index.html`, `micro/index.html`, `cns/index.html`(이동용), 루트 `index.html`·`sw.js`(화면은 네트워크 우선 → 온라인이면 즉시 최신 반영)·`manifest.json` 생성

## 수정 절차
1. `src/`만 고친다 (`pharm/`, `micro/`, `cns/`, 루트 `index.html` 직접 수정 금지)
2. `python3 build.py`
3. `node test/pharm_check.js` (구조·정답 위치) · `node test/micro_test.js` (모범답안 100점, 빈 답 0점)
4. 커밋 후 main에 push

## 저장 (localStorage, 같은 저장공간을 두 앱이 공유)
- `study-hub-v1` — 공용: `theme`, `last`(마지막 과목)
- `pharm-quiz-v1` — 약리 기록: `q`(id → [맞음, 틀림, 시각]), `wrong`(오답노트), `set`. id = 단원+문제 텍스트 해시 → 문제 문구를 바꾸면 그 문항 기록은 초기화됨 (선지·해설만 고치면 유지)
- `cns-quiz-v1` — 폐기된 옛 CNS 기록. 약리 앱이 처음 열릴 때 지움
- `micro-essay-v1` — 미생물 기록: `q`(id → 점수 기록), `draft`(작성 중 답안), `set`(설정)
- 각 앱 `state.set.theme`은 옛 값(첫 실행 때 `study-hub-v1`로 옮겨짐). 화면 색은 `getTheme()`만 쓸 것
