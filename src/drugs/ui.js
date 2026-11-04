// ───── 데이터 정리
function hash(s) {
  let h = 5381;
  for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) | 0;
  return (h >>> 0).toString(36);
}
const CARDS = DRUGS.map(r => ({
  id: "d:" + hash(r[0] + "|" + r[1]), kind: "drug", u: r[0], name: r[1], cls: r[2], mech: r[3], use: r[4], ae: r[5], pt: r[6],
  star: r[7].includes("★"), jok: r[7].includes("족"), mic: r[7].includes("🎙")
}));
const PAIR_CARDS = PAIRS.map(r => ({
  id: "p:" + hash(r[1] + "|" + r[2]), kind: "pair", u: r[0], set: r[1], front: r[2], back: r[3], memo: r[4],
  star: /★/.test(r[4]), jok: /개년|매년|중간|기말|서술|%/.test(r[4]), mic: false
}));
const TFS = TF.map(r => ({ id: "t:" + r[1], u: r[0], n: r[1], q: r[2], t: r[3], e: r[4] }));
const BYID = Object.fromEntries([...CARDS, ...PAIR_CARDS, ...TFS].map(c => [c.id, c]));
const ALL_UNITS = Object.keys(SECTIONS);

const MODES = {
  browse: { label: "약물 카드 훑어보기", desc: "단원별 약물 프로필 — 검색 가능" },
  d2i: { label: "약물 → 정보", desc: "약 이름을 보고 기전·용도·부작용 떠올리기" },
  i2d: { label: "기전·용도 → 약물", desc: "단서를 보고 약 이름 맞히기" },
  pair: { label: "핵심 짝 카드", desc: "시험 직전 30초 · 상황→약 · 부작용·해독제 역검색" },
  tf: { label: "T/F 함정 문항", desc: `요약본의 ${TFS.length}문항, O/X로 바로 채점` },
  type: { label: "약물 리스트 타이핑", desc: "종류별 약물 리스트의 빈칸에 약 이름을 직접 입력" }
};

// ───── 저장
const STORE_KEY = "drugs-study-v1";
const state = (() => {
  let s = null;
  try { s = JSON.parse(localStorage.getItem(STORE_KEY)); } catch (e) {}
  s = s || {};
  s.k = s.k || {};      // 카드 id → 1(알았음) / 0(다시)
  s.tf = s.tf || {};    // T/F id → [맞음, 틀림]
  s.ty = s.ty || {};    // 타이핑 칸 id → 1(맞힘) / 0(틀림·힌트)
  s.tyb = s.tyb || {};  // 타이핑 단원 → [맞힘, 전체, 시각]
  s.set = Object.assign({ units: ALL_UNITS.slice(), only: "", count: 20, sets: Object.keys(PAIR_SETS) }, s.set || {});
  s.set.units = s.set.units.filter(u => SECTIONS[u]);
  return s;
})();
function save() { try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch (e) {} }

// ───── 화면 색
const THEMES = [
  ["auto", "자동", null], ["light", "밝게", ["#EEF1F4", "#2848A0"]], ["dark", "어둡게", ["#14181D", "#6F8EF0"]],
  ["mint", "민트", ["#E6F2EE", "#1D7A63"]], ["lavender", "라벤더", ["#EEECF7", "#5847C2"]], ["paper", "종이", ["#F2EBDD", "#8A5528"]]
];
function applyTheme() {
  const t = getTheme();
  if (t === "auto") delete document.documentElement.dataset.theme;
  else document.documentElement.dataset.theme = t;
  const bg = getComputedStyle(document.documentElement).getPropertyValue("--bg").trim();
  document.querySelectorAll('meta[name="theme-color"]').forEach(m => {
    if (!m.dataset.orig) m.dataset.orig = m.getAttribute("content");
    m.setAttribute("content", t === "auto" ? m.dataset.orig : bg);
  });
}
applyTheme();

const $ = s => document.querySelector(s);
const app = () => $("#app");
let session = null;
let view = "";
function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
function shuffle(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
// 요약본 기호 강조: ★ → 노란 별, 🎙 → 예시 표시
function rich(s) {
  return esc(s).replace(/\b(GABA|N)_([A-Z])\b/g, "$1<sub>$2</sub>").replace(/★/g, '<span class="st">★</span>').replace(/🎙/g, '<span class="mic">🎙</span>');
}

// 필터
function filt(list) {
  const units = new Set(state.set.units), only = state.set.only;
  return list.filter(c => units.has(c.u) && (!only || (only === "star" && c.star) || (only === "jok" && c.jok) || (only === "again" && state.k[c.id] === 0)));
}
function pairPool() { const sets = new Set(state.set.sets); return filt(PAIR_CARDS).filter(c => sets.has(c.set)); }
function tfPool() {
  const units = new Set(state.set.units), only = state.set.only;
  return TFS.filter(t => (units.has(t.u) || (t.u === "x" && units.size === ALL_UNITS.length)) &&
    (only !== "again" || (state.tf[t.id] && state.tf[t.id][1] > 0 && state.tf[t.id][2] === 0)));
}
function poolFor(mode) { if (mode === "type") return TY_CELLS; return mode === "pair" ? pairPool() : mode === "tf" ? tfPool() : filt(CARDS); }

// ───── 홈
function renderHome() {
  const keepY = view === "home" ? window.scrollY : 0;
  session = null;
  const s = state.set, units = new Set(s.units);
  const known = Object.values(state.k).filter(v => v === 1).length;
  const again = Object.values(state.k).filter(v => v === 0).length;
  const tfDone = Object.keys(state.tf).length;
  const tfRight = Object.values(state.tf).filter(v => v[2] === 1).length;

  const groups = SECTION_GROUPS.map(g => {
    const allOn = g.units.every(u => units.has(u));
    return `<div class="ugroup">
      <div class="ghead"><span>${g.label}</span><button class="link" data-g="${g.units.join(",")}" data-on="${allOn}">${allOn ? "이 묶음 해제" : "이 묶음 선택"}</button></div>
      <div class="units">${g.units.map(u => `<button class="unit ${units.has(u) ? "on" : ""}" data-u="${u}" aria-pressed="${units.has(u)}">
        <span class="uname">${SECTIONS[u]}</span><span class="ucount">${CARDS.filter(c => c.u === u).length}</span></button>`).join("")}</div></div>`;
  }).join("");

  const onlyChips = [["", "전체"], ["star", "★ 교수님 강조만"], ["jok", "족보 출제만"], ["again", "다시 볼 것만"]]
    .map(([k, l]) => `<button class="chip ${s.only === k ? "on" : ""}" data-only="${k}">${l}</button>`).join("");

  const modes = Object.entries(MODES).map(([k, m]) => {
    const n = poolFor(k).length;
    return `<button class="mode" data-m="${k}" ${n ? "" : "disabled"}><span class="ml"><b>${m.label}</b><small>${m.desc}</small></span><span class="mn">${n}</span></button>`;
  }).join("");

  const setChips = Object.entries(PAIR_SETS).map(([k, l]) =>
    `<button class="chip ${s.sets.includes(k) ? "on" : ""}" data-set="${k}">${l}</button>`).join("");

  const counts = [10, 20, 40, 0].map(c => `<button class="seg ${s.count === c ? "on" : ""}" data-c="${c}">${c || "전체"}</button>`).join("");

  app().innerHTML = `
  ${subjectSwitcher()}
  <header class="home-head">
    <h1>CNS 약물<br>암기 카드</h1>
    <p class="lede">박해정 교수님 CNS 1–4 최종 요약본으로 만든 약물 ${CARDS.length}종, 핵심 짝 ${PAIR_CARDS.length}장, T/F ${TFS.length}문항. <span class="st">★</span> 교수님 강조, <span class="jk">족보</span> 기출 근거, <span class="mic">🎙</span> 교수님 예시.</p>
  </header>

  <section class="block">
    <div class="bhead"><h2>단원</h2>
      <span class="links"><button class="link" id="allU">전체 선택</button><button class="link" id="noneU">모두 해제</button></span></div>
    ${groups}
  </section>

  <section class="block">
    <div class="bhead"><h2>범위</h2></div>
    <div class="chips wrap">${onlyChips}</div>
  </section>

  <section class="block">
    <div class="bhead"><h2>공부 방법</h2><span class="hint">한 번에 ${s.count || "전부"}장</span></div>
    <div class="modes">${modes}</div>
    <div class="segs" style="margin-top:10px">${counts}</div>
  </section>

  <section class="block">
    <div class="bhead"><h2>핵심 짝 카드 묶음</h2></div>
    <div class="chips wrap">${setChips}</div>
  </section>

  <section class="block">
    <div class="bhead"><h2>진도</h2></div>
    <div class="prog3">
      <div><b>${known}</b><small>외운 카드</small></div>
      <div><b>${again}</b><small>다시 볼 카드</small></div>
      <div><b>${tfDone ? Math.round(tfRight / tfDone * 100) + "%" : "—"}</b><small>T/F 최근 정답률 (${tfDone}문항)</small></div>
    </div>
  </section>

  <section class="block">
    <div class="bhead"><h2>화면 색</h2></div>
    <div class="themes">${THEMES.map(([k, label, c]) => `<button class="th ${getTheme() === k ? "on" : ""}" data-th="${k}">
      <span class="sw">${c ? `<i style="background:${c[0]}"></i><i style="background:${c[1]}"></i>` : `<i style="background:#EEF1F4"></i><i style="background:#14181D"></i>`}</span>${label}</button>`).join("")}</div>
  </section>

  <footer class="foot"><span>출처: 약리학_7-10_CNS Drugs 1-4 최종 요약본</span><button class="link danger" id="reset">학습 기록 지우기</button></footer>`;

  app().querySelectorAll(".unit").forEach(b => b.onclick = () => {
    const set = new Set(state.set.units); set.has(b.dataset.u) ? set.delete(b.dataset.u) : set.add(b.dataset.u);
    state.set.units = ALL_UNITS.filter(x => set.has(x)); save(); renderHome();
  });
  app().querySelectorAll("[data-g]").forEach(b => b.onclick = () => {
    const set = new Set(state.set.units);
    b.dataset.g.split(",").forEach(u => (b.dataset.on === "true" ? set.delete(u) : set.add(u)));
    state.set.units = ALL_UNITS.filter(x => set.has(x)); save(); renderHome();
  });
  app().querySelectorAll("[data-only]").forEach(b => b.onclick = () => { state.set.only = b.dataset.only; save(); renderHome(); });
  app().querySelectorAll("[data-set]").forEach(b => b.onclick = () => {
    const set = new Set(state.set.sets); set.has(b.dataset.set) ? set.delete(b.dataset.set) : set.add(b.dataset.set);
    state.set.sets = Object.keys(PAIR_SETS).filter(x => set.has(x)); save(); renderHome();
  });
  app().querySelectorAll(".seg").forEach(b => b.onclick = () => { state.set.count = +b.dataset.c; save(); renderHome(); });
  app().querySelectorAll(".th").forEach(b => b.onclick = () => { setTheme(b.dataset.th); applyTheme(); renderHome(); });
  app().querySelectorAll(".mode").forEach(b => b.onclick = () => start(b.dataset.m));
  $("#allU").onclick = () => { state.set.units = ALL_UNITS.slice(); save(); renderHome(); };
  $("#noneU").onclick = () => { state.set.units = []; save(); renderHome(); };
  $("#reset").onclick = () => { if (confirm("외운 카드·T/F·타이핑 기록을 모두 지울까요? 설정은 유지됩니다.")) { state.k = {}; state.tf = {}; state.ty = {}; state.tyb = {}; save(); renderHome(); } };
  view = "home";
  window.scrollTo(0, keepY);
}

// ───── 시작
function start(mode) {
  if (mode === "browse") return renderBrowse();
  if (mode === "type") { if (location.hash !== "#type") history.pushState(null, "", "#type"); return renderType(); }
  let pool = poolFor(mode);
  if (!pool.length) return;
  // 다시 볼 것 → 안 본 것 → 외운 것 순
  const key = c => mode === "tf" ? (state.tf[c.id] ? (state.tf[c.id][2] === 0 ? 0 : 2) : 1) : (state.k[c.id] === 0 ? 0 : state.k[c.id] === undefined ? 1 : 2);
  pool = pool.map(c => ({ c, k: key(c) + Math.random() * 0.9 })).sort((a, b) => a.k - b.k).map(x => x.c);
  pool.forEach(c => (c._re = 0));
  const n = state.set.count ? Math.min(state.set.count, pool.length) : pool.length;
  session = { mode, queue: pool.slice(0, n), total: n, done: 0, knew: 0, missed: [], flipped: false, answered: false };
  next();
}

function next() {
  if (!session.queue.length) return renderEnd();
  session.cur = session.queue[0];
  session.flipped = false; session.answered = false;
  session.mode === "tf" ? renderTF() : renderFlash();
}

function topBar() {
  const s = session;
  return `<div class="qtop">
    <button class="icon" id="quit" aria-label="그만하기">✕</button>
    <div class="prog" role="progressbar" aria-valuemin="0" aria-valuemax="${s.total}" aria-valuenow="${s.done}"><span style="width:${s.done / s.total * 100}%"></span></div>
    <span class="count">${Math.min(s.done + 1, s.total)}<small>/${s.total}</small></span></div>`;
}
function bindQuit() {
  $("#quit").onclick = () => { if (!session.done || confirm("여기까지 기록은 저장돼요. 그만할까요?")) session.done ? renderEnd() : renderHome(); };
}
function badges(c) {
  return `${c.star ? '<span class="bd st-b">★ 강조</span>' : ""}${c.jok ? '<span class="bd jk-b">족보</span>' : ""}${c.mic ? '<span class="bd mic-b">🎙 예시</span>' : ""}`;
}

// 약물 카드 본문
function drugBody(c, hideName) {
  const row = (k, v) => v && v !== "—" ? `<div class="r"><dt>${k}</dt><dd>${rich(v)}</dd></div>` : "";
  return `<dl class="dl">${row("분류", c.cls)}${row("기전", c.mech)}${row("용도", c.use)}${row("부작용·주의", c.ae)}${row("포인트", hideName ? c.pt.replace(new RegExp(c.name.split(/[ ·(]/)[0], "gi"), "○○") : c.pt)}</dl>`;
}

// ───── 플래시카드
function renderFlash() {
  const s = session, c = s.cur, m = s.mode;
  let front, back;
  if (m === "d2i") {
    front = `<div class="fmeta">${SECTIONS[c.u]}</div><div class="fname">${esc(c.name)}</div><p class="fhint">기전 · 용도 · 부작용을 떠올린 뒤 카드를 누르세요</p>`;
    back = `<div class="fmeta">${SECTIONS[c.u]} ${badges(c)}</div><div class="fname sm">${esc(c.name)}</div>${drugBody(c)}`;
  } else if (m === "i2d") {
    const clue = [["분류", c.cls], ["기전", c.mech], ["용도", c.use]].filter(x => x[1] && x[1] !== "—");
    front = `<div class="fmeta">${SECTIONS[c.u]} · 어떤 약일까요?</div><dl class="dl">${clue.map(([k, v]) => `<div class="r"><dt>${k}</dt><dd>${rich(v)}</dd></div>`).join("")}</dl><p class="fhint">약 이름을 떠올린 뒤 카드를 누르세요</p>`;
    back = `<div class="fmeta">${SECTIONS[c.u]} ${badges(c)}</div><div class="fname sm">${esc(c.name)}</div>${drugBody(c)}`;
  } else {
    front = `<div class="fmeta">${PAIR_SETS[c.set]}</div><div class="fq">${rich(c.front)}</div><p class="fhint">답을 떠올린 뒤 카드를 누르세요</p>`;
    back = `<div class="fmeta">${PAIR_SETS[c.set]} ${badges(c)}</div><div class="fq sm">${rich(c.front)}</div><div class="fa">${rich(c.back)}</div>${c.memo ? `<p class="fmemo">${rich(c.memo)}</p>` : ""}`;
  }
  app().innerHTML = `${topBar()}
  <div class="flash ${s.flipped ? "flipped" : ""}" id="card" role="button" tabindex="0" aria-label="${s.flipped ? "카드 뒷면" : "카드 뒤집기"}">
    <div class="face">${s.flipped ? back : front}</div>
  </div>
  <div class="fbtns ${s.flipped ? "" : "hidden"}">
    <button class="secondary again" id="again">다시 볼래요</button>
    <button class="primary" id="knew">알았어요</button>
  </div>
  <p class="score">${s.flipped ? "키보드: 1 다시 · 2 알았음" : "카드를 누르거나 스페이스바로 뒤집기"}</p>`;
  $("#card").onclick = () => { if (!s.flipped) { s.flipped = true; renderFlash(); } };
  if (s.flipped) { $("#again").onclick = () => grade(false); $("#knew").onclick = () => grade(true); }
  bindQuit();
  window.scrollTo(0, 0);
}
function grade(ok) {
  const s = session, c = s.cur;
  state.k[c.id] = ok ? 1 : 0; save();
  s.queue.shift();
  if (ok) { s.done++; s.knew++; }
  else {
    if (!s.missed.includes(c)) s.missed.push(c);
    // 몰랐던 카드는 3–5장 뒤에 한 번 더
    const pos = Math.min(s.queue.length, 3 + Math.floor(Math.random() * 3));
    if (!c._re) { c._re = 1; s.queue.splice(pos, 0, c); } else { s.done++; c._re = 0; }
  }
  next();
}

// ───── T/F
function renderTF() {
  const s = session, t = s.cur;
  app().innerHTML = `${topBar()}
  <article class="qcard">
    <div class="qmeta"><span class="uname-sm">${t.u === "x" ? "단원 교차" : SECTIONS[t.u]}</span><span class="kind">요약본 T/F ${t.n}</span></div>
    <h2 class="stem">${rich(t.q)}</h2>
    <div class="ox">
      <button class="oxb" data-v="1">O<small>맞다</small></button>
      <button class="oxb" data-v="0">X<small>틀리다</small></button>
    </div>
    <div id="fb"></div>
  </article>
  <p class="score">키보드: O / X (또는 1 / 2)</p>`;
  app().querySelectorAll(".oxb").forEach(b => b.onclick = () => answerTF(b.dataset.v === "1"));
  bindQuit();
  window.scrollTo(0, 0);
}
function answerTF(v) {
  const s = session, t = s.cur;
  if (s.answered) return;
  s.answered = true;
  const ok = v === t.t;
  const r = state.tf[t.id] || [0, 0, 0];
  ok ? r[0]++ : r[1]++; r[2] = ok ? 1 : 0;
  state.tf[t.id] = r; save();
  s.done++; if (ok) s.knew++; else s.missed.push(t);
  app().querySelectorAll(".oxb").forEach(b => {
    b.disabled = true;
    const bv = b.dataset.v === "1";
    if (bv === t.t) b.classList.add("correct"); else if (bv === v) b.classList.add("wrong"); else b.classList.add("dim");
  });
  $("#fb").innerHTML = `<div class="verdict ${ok ? "ok" : "no"}">${ok ? "정답" : "오답"} — ${t.t ? "T (맞는 문장)" : "F (틀린 문장)"}</div>
    ${t.e ? `<div class="expl">${rich(t.e)}</div>` : ""}
    <button class="primary next" id="next">${s.queue.length > 1 ? "다음 문항" : "결과 보기"}</button>`;
  $("#next").onclick = () => { s.queue.shift(); next(); };
  $("#next").focus({ preventScroll: true });
}

// ───── 끝
function renderEnd() {
  const s = session;
  view = "end";
  const isTF = s.mode === "tf";
  const label = c => c.kind === "drug" ? c.name : c.kind === "pair" ? c.front : c.q;
  app().innerHTML = `
  <header class="res-head">
    <div class="big">${s.knew}<small>/${s.done}</small></div>
    <p>${MODES[s.mode].label} · ${isTF ? "정답" : "알았어요"} ${s.knew}개${s.missed.length ? ` · ${isTF ? "틀린" : "다시 볼"} ${s.missed.length}개` : ""}</p>
  </header>
  <div class="actions">
    ${s.missed.length ? `<button class="primary" id="redo">${isTF ? "틀린" : "다시 볼"} ${s.missed.length}개만 다시</button>` : ""}
    <div class="row2"><button class="secondary" id="again">새로 ${MODES[s.mode].label}</button><button class="secondary" id="home">처음으로</button></div>
  </div>
  ${s.missed.length ? `<section class="block"><div class="bhead"><h2>${isTF ? "틀린 문항" : "다시 볼 카드"}</h2></div>
    <ol class="wlist">${s.missed.map(c => `<li><div class="wq">${rich(label(c))}</div>${c.kind === "drug" ? `<div class="wa">${rich(c.mech)}</div>` : c.kind === "pair" ? `<div class="wa">${rich(c.back)}</div>` : `<div class="wa"><span class="tag ${c.t ? "ok" : "no"}">${c.t ? "T" : "F"}</span>${rich(c.e || "")}</div>`}</li>`).join("")}</ol></section>` : ""}`;
  const mode = s.mode, missed = s.missed.slice();
  const rd = $("#redo");
  if (rd) rd.onclick = () => { missed.forEach(c => (c._re = 0)); session = { mode, queue: shuffle(missed), total: missed.length, done: 0, knew: 0, missed: [] }; next(); };
  $("#again").onclick = () => start(mode);
  $("#home").onclick = () => renderHome();
  window.scrollTo(0, 0);
}

// ───── 약물 카드 훑어보기
let brUnit = "", brQ = "";
function renderBrowse() {
  view = "browse"; session = null;
  const chips = ["", ...ALL_UNITS].map(u => `<button class="chip ${brUnit === u ? "on" : ""}" data-u="${u}">${u ? SECTIONS[u] : "전체"}</button>`).join("");
  app().innerHTML = `
  <div class="qtop"><button class="icon" id="back" aria-label="처음으로">✕</button><h2 class="dhead">약물 카드</h2></div>
  <input class="search" id="q" type="search" placeholder="약 이름·기전·부작용으로 찾기 (예: GABA, 간독성, flumazenil)" value="${esc(brQ)}" autocomplete="off" autocapitalize="off" spellcheck="false">
  <div class="chips">${chips}</div>
  <div id="blist" class="dlist"></div>`;
  $("#back").onclick = () => renderHome();
  app().querySelectorAll(".chip").forEach(b => b.onclick = () => { brUnit = b.dataset.u; renderBrowse(); });
  const q = $("#q"); q.oninput = () => { brQ = q.value; fillBrowse(); };
  fillBrowse();
}
function fillBrowse() {
  const t = brQ.trim().toLowerCase(), only = state.set.only;
  const list = CARDS.filter(c => (!brUnit || c.u === brUnit) && (!only || (only === "star" && c.star) || (only === "jok" && c.jok) || (only === "again" && state.k[c.id] === 0)) &&
    (!t || [c.name, c.cls, c.mech, c.use, c.ae, c.pt].join(" ").toLowerCase().includes(t)));
  const pairs = t ? PAIR_CARDS.filter(c => (!brUnit || c.u === brUnit) && [c.front, c.back].join(" ").toLowerCase().includes(t)) : [];
  $("#blist").innerHTML = (list.length || pairs.length)
    ? `<p class="note">약물 ${list.length}종${pairs.length ? ` · 핵심 짝 ${pairs.length}장` : ""}${only ? " (범위 필터 적용 중)" : ""}</p>` +
      list.map(c => `<article class="dcard dc ${state.k[c.id] === 0 ? "againc" : ""}">
        <div class="fmeta">${SECTIONS[c.u]} ${badges(c)}${state.k[c.id] === 1 ? '<span class="bd ok-b">외움</span>' : state.k[c.id] === 0 ? '<span class="bd no-b">다시</span>' : ""}</div>
        <div class="fname sm">${esc(c.name)}</div>${drugBody(c)}</article>`).join("") +
      pairs.map(c => `<article class="dcard"><div class="fmeta">${PAIR_SETS[c.set]}</div><div class="fq sm">${rich(c.front)}</div><div class="fa">${rich(c.back)}</div></article>`).join("")
    : `<p class="empty">“${esc(brQ)}”가 들어간 약물이 없어요. 철자를 바꾸거나 단원을 ‘전체’로 바꿔 보세요.</p>`;
}


// ───── 약물 리스트 타이핑 (PDF 'CNS Drugs 1-4 약물 리스트'의 빈칸본과 같은 배치)
// 칸 id = 단원 + 줄 번호 + 칸 번호 → 같은 약이 여러 줄에 나와도 따로 기록
const TY_CELLS = [];
// 중분류(진정수면제, Alcohols …) = 분류명 줄(l 0)부터 다음 분류명 전까지 → g: "단원:번호"
// 특징 글씨가 없는 칸끼리는 같은 줄·같은 '/' 묶음 안에서 순서 상관없이 정답 → pk(묶음 키)
LIST_SECS.forEach((sec, si) => { let gi = -1; sec.r.forEach((row, ri) => { if (row.l === 0) gi++; let seg = 0; row.i.forEach((it, ii) => {
  if (it === "/") seg++;
  if (it && it.a) TY_CELLS.push({ id: "y:" + hash(sec.t + "|" + ri + "|" + ii + "|" + it.a), si, g: si + ":" + gi, a: it.a, n: it.n || "", p: it.p || "",
    pk: !it.n && !it.p ? si + "|" + ri + "|" + seg : "" });
}); }); });
const TY_BYPOS = {};
TY_CELLS.forEach(c => (TY_BYPOS[c.id] = c));
function tyNorm(s) { return String(s).normalize("NFKC").toLowerCase().replace(/<[^>]+>/g, "").replace(/[\s\-–·,.'’()]/g, ""); }
// 정답: 전체 이름 · 괄호 앞 이름 · 괄호 속 약어(N₂O, THC, PCP, ecstasy) 모두 인정
function tyAnswers(a) {
  const set = new Set([tyNorm(a)]);
  const m = a.match(/^(.*?)\((.*)\)$/);
  if (m) { set.add(tyNorm(m[1])); set.add(tyNorm(m[2])); }
  if (a === "gum") set.add("nicotinegum");
  return set;
}
let ty = null;   // { si: 단원 번호 | -1 전체, val: {id: 입력}, st: {id: "ok"|"no"|"hint"|"show"}, notes, checked }
// 이 칸에 들어갈 수 있는 정답들: 순서 자유 묶음이면 다른 칸이 아직 안 쓴 약 이름 전부(제자리 약을 맨 앞에)
function tyPoolAns(id) {
  const c = TY_BYPOS[id];
  if (!c.pk) return [c.a];
  const mem = TY_CELLS.filter(m => m.pk === c.pk);
  const used = new Set(mem.filter(m => m.id !== id && ty.ans[m.id]).map(m => ty.ans[m.id]));
  return [c.a, ...mem.map(m => m.a).filter(a => a !== c.a)].filter(a => !used.has(a));
}
function tyMatch(id, v) { const n = tyNorm(v); return n ? tyPoolAns(id).find(a => tyAnswers(a).has(n)) : undefined; }
function tyIds() { return TY_CELLS.filter(c => ty.si < 0 || c.si === ty.si).map(c => c.id); }
function tyNew(si) {
  const prev = ty;
  ty = { si, val: {}, st: {}, ans: {}, notes: prev ? prev.notes : (state.set.tyNotes !== false), checked: false, onlyWrong: false };
}
function renderType() {
  view = "type"; session = null;
  if (!ty) tyNew(state.set.tySec ?? 0);
  const secs = ty.si < 0 ? LIST_SECS.map((s, i) => i) : [ty.si];
  const chips = [...LIST_SECS.map((s, i) => [i, s.t]), [-1, "전체"]].map(([i, l]) => {
    const b = state.tyb[i];
    return `<button class="chip ${ty.si === i ? "on" : ""}" data-si="${i}">${l}${b ? `<small>${b[0]}/${b[1]}</small>` : ""}</button>`;
  }).join("");
  let html = "";
  secs.forEach(si => {
    const sec = LIST_SECS[si];
    html += `<section class="ty-sec"><div class="ty-sh"><b>${sec.t}</b><span>${esc(sec.s)}</span></div>`;
    let open = 0, gi = -1;
    const close = to => { while (open > to) { html += "</ul>"; open--; } };
    sec.r.forEach((row, ri) => {
      if (row.l === 0) gi++;
      const pcs = [];   // 쉼표 등은 앞 칸에 붙여 줄바꿈 때 혼자 떨어지지 않게
      row.i.forEach((it, ii) => {
        if (typeof it === "string") { const sp = `<span class="ty-sep">${esc(it)}</span>`; pcs.length ? (pcs[pcs.length - 1] += sp) : pcs.push(sp); return; }
        if (Array.isArray(it)) { pcs.push(`<span class="ty-txt">${it[0]}</span>`); return; }
        const id = "y:" + hash(sec.t + "|" + ri + "|" + ii + "|" + it.a);
        const st = ty.st[id] || "", v = ty.val[id] || "";
        const w = Math.max(it.a.length, 4) + 1.5;
        const was = state.ty[id] === 0 ? " was-no" : "";
        pcs.push(`<span class="ty-cell">${it.p ? `<span class="ty-pre">${esc(it.p)}</span>` : ""}<span class="ty-col2">
          <input class="ty-in ${st}${was}" data-id="${id}" style="width:${w}ch" value="${esc(st === "show" ? (ty.ans[id] || it.a) : v)}" ${st === "ok" || st === "show" ? "readonly" : ""}
            autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" enterkeyhint="next" aria-label="빈칸${it.n ? " — " + esc(it.n) : ""}">
          ${st === "show" && v ? `<s class="ty-mine">${esc(v)}</s>` : ""}
          ${it.n && ty.notes ? `<span class="ty-note">${esc(it.n)}</span>` : ""}</span></span>`);
      });
      const line = (row.k ? `<span class="ty-k">${row.k}</span><span class="ty-col"> : </span>` : "") + pcs.map(x => `<span class="ty-grp">${x}</span>`).join(" ");
      if (row.l === 0) {
        close(0);
        const g = si + ":" + gi, gids = TY_CELLS.filter(c => c.g === g).map(c => c.id);
        const gok = gids.filter(i => ty.st[i] === "ok").length, gdone = gids.some(i => ty.st[i] === "show" || ty.st[i] === "hint");
        html += `<div class="ty-cat" data-gh="${g}"><span>${line}</span>${gids.length ? `<span class="ty-gs">${gok}/${gids.length}</span>
          <button class="ty-gb" data-gc="${g}">채점</button><button class="ty-gb ghost" data-gw="${g}" ${gids.some(i => ty.st[i] === "show" || ty.st[i] === "hint" || (ty.val[i] && ty.st[i] !== "ok")) ? "" : "disabled"}>틀린 것만 초기화</button><button class="ty-gb ghost" data-gr="${g}">초기화</button>` : ""}</div>`;
      }
      else { while (open < row.l) { html += "<ul class=ty-ul>"; open++; } close(row.l); html += `<li>${line}</li>`; }
    });
    close(0);
    html += "</section>";
  });
  const ids = tyIds(), ok = ids.filter(i => ty.st[i] === "ok").length;
  app().innerHTML = `
  ${subjectSwitcher()}
  <div class="qtop"><button class="icon" id="back" aria-label="처음으로">✕</button><h2 class="dhead">약물 리스트 타이핑</h2></div>
  <div class="chips">${chips}</div>
  <div class="ty-bar">
    <div class="ty-prog"><b id="tyOk">${ok}</b><small>/${ids.length}</small></div>
    <button class="secondary sm" id="tyHint">힌트 한 글자</button>
    <button class="primary sm" id="tyCheck">${ty.checked ? "다시 채점" : "채점·정답"}</button>
  </div>
  <label class="ty-tg"><input type="checkbox" id="tyNotes" ${ty.notes ? "checked" : ""}> 약 이름 밑 특징 글씨 보기</label>
  <p class="note ty-res" id="tyRes"></p>
  <p class="note ty-help">약 이름을 치면 맞는 순간 초록색으로 바뀌고 다음 칸으로 넘어가요. 대소문자·띄어쓰기·하이픈은 상관없어요. 지난번에 틀린 칸은 왼쪽에 빨간 줄이 있어요.</p>
  <div class="ty-list">${html}</div>
  <div class="ty-actions">
    <div class="row2"><button class="secondary" id="tyWrong" ${ids.some(i => ty.st[i] === "show" || ty.st[i] === "hint") ? "" : "disabled"}>틀린 칸만 다시</button><button class="secondary" id="tyReset">처음부터</button></div>
  </div>`;
  $("#back").onclick = () => tyLeave();
  app().querySelectorAll("[data-si]").forEach(b => b.onclick = () => {
    const si = +b.dataset.si;
    if (si === ty.si) return;
    if (Object.values(ty.val).some(v => v) && !ty.checked && !confirm("입력한 내용이 지워져요. 다른 단원으로 갈까요?")) return;
    state.set.tySec = si; save(); tyNew(si); renderType(); window.scrollTo(0, 0);
  });
  $("#tyNotes").onchange = e => { ty.notes = e.target.checked; state.set.tyNotes = ty.notes; save(); tyKeep(renderType); };
  app().querySelectorAll(".ty-in").forEach(inp => {
    inp.oninput = () => tyInput(inp);
    inp.onkeydown = e => {
      if (e.key === "Enter") { e.preventDefault(); tyCheckOne(inp, true); tyFocusNext(inp); }
    };
    inp.onblur = () => tyCheckOne(inp, false);
  });
  // 힌트·채점 버튼을 눌러도 입력칸 포커스를 잃지 않게
  ["#tyHint"].forEach(sel => $(sel).addEventListener("pointerdown", e => e.preventDefault()));
  $("#tyHint").onclick = tyHint;
  $("#tyCheck").onclick = () => tyCheck();
  app().querySelectorAll("[data-gc]").forEach(b => b.onclick = () => tyCheck(b.dataset.gc));
  app().querySelectorAll("[data-gr], [data-gw]").forEach(b => b.onclick = () => {
    const g = b.dataset.gr || b.dataset.gw, onlyWrong = !!b.dataset.gw;
    // 틀린 것만: 맞힌(초록) 칸은 두고 정답 공개·힌트·잘못 친 칸만 비움
    TY_CELLS.filter(c => c.g === g && (!onlyWrong || ty.st[c.id] !== "ok")).forEach(c => { delete ty.st[c.id]; delete ty.val[c.id]; delete ty.ans[c.id]; });
    if (!tyIds().some(i => ty.st[i] === "show")) ty.checked = false;
    tyKeep(renderType);
    const f = app().querySelector(`[data-gh="${g}"]`);
    const first = f && TY_CELLS.find(c => c.g === g && ty.st[c.id] !== "ok");
    const el = first && app().querySelector(`.ty-in[data-id="${first.id}"]`);
    if (el) el.focus({ preventScroll: true });
  });
  $("#tyWrong").onclick = () => {
    tyIds().forEach(i => { if (ty.st[i] === "show" || ty.st[i] === "hint") { delete ty.st[i]; ty.val[i] = ""; delete ty.ans[i]; } });
    ty.checked = false; renderType();
    const f = app().querySelector(".ty-in:not([readonly])"); if (f) { f.focus(); f.scrollIntoView({ block: "center" }); }
  };
  $("#tyReset").onclick = () => { if (confirm("이 단원 입력을 모두 지우고 처음부터 할까요?")) { tyNew(ty.si); renderType(); window.scrollTo(0, 0); } };
  if (!ty.checked && !Object.values(ty.val).some(v => v)) { const f = app().querySelector(".ty-in"); if (f) f.focus({ preventScroll: true }); }
}
function tyLeave() { if (location.hash === "#type") history.pushState(null, "", location.pathname + location.search); renderHome(); }
// 위 탭(drugs/#type)·뒤로가기로 오갈 때
window.addEventListener("hashchange", tyRoute);
window.addEventListener("popstate", tyRoute);
function tyRoute() {
  if (location.hash === "#type") { if (view !== "type") { renderType(); window.scrollTo(0, 0); } }
  else if (view === "type") renderHome();
}
let tyLast = null;
function tyKeep(fn) {
  const y = window.scrollY, f = document.activeElement && document.activeElement.dataset ? document.activeElement.dataset.id : null;
  fn(); window.scrollTo(0, y);
  if (f) { const el = app().querySelector(`.ty-in[data-id="${f}"]`); if (el) el.focus({ preventScroll: true }); }
}
function tyInput(inp) {
  const id = inp.dataset.id, c = TY_BYPOS[id];
  ty.val[id] = inp.value; tyLast = inp;
  inp.classList.remove("no");
  const m = tyMatch(id, inp.value);
  if (m) {
    if (ty.st[id] !== "hint") ty.st[id] = "ok";
    ty.ans[id] = m; inp.value = m; ty.val[id] = m;
    inp.classList.add(ty.st[id]); inp.readOnly = true;
    if (ty.st[id] === "ok") state.ty[id] = 1;
    save();
    $("#tyOk").textContent = tyIds().filter(i => ty.st[i] === "ok").length;
    const gh = app().querySelector(`[data-gh="${c.g}"] .ty-gs`);
    if (gh) { const gids = TY_CELLS.filter(x => x.g === c.g); gh.textContent = gids.filter(x => ty.st[x.id] === "ok").length + "/" + gids.length; }
    tyFocusNext(inp);
  }
}
function tyCheckOne(inp, strict) {
  const id = inp.dataset.id;
  if (inp.readOnly || !inp.value.trim()) return;
  if (!tyMatch(id, inp.value) && strict) inp.classList.add("no");
}
function tyFocusNext(inp) {
  const all = [...app().querySelectorAll(".ty-in")];
  const i = all.indexOf(inp);
  const nx = all.slice(i + 1).find(x => !x.readOnly) || all.slice(0, i).find(x => !x.readOnly);
  if (nx) { nx.focus({ preventScroll: true }); const r = nx.getBoundingClientRect(); if (r.top < 80 || r.bottom > window.innerHeight - 160) nx.scrollIntoView({ block: "center", behavior: "smooth" }); }
  else inp.blur();
}
function tyHint() {
  let inp = document.activeElement && document.activeElement.classList.contains("ty-in") ? document.activeElement : tyLast;
  if (!inp || inp.readOnly || !document.body.contains(inp)) inp = app().querySelector(".ty-in:not([readonly])");
  if (!inp) return;
  const id = inp.dataset.id, v = inp.value;
  // 순서 자유 칸이면 지금까지 친 글자로 시작하는 약을 고름 → 이미 맞게 친 앞부분 다음 글자 하나를 채움
  const cands = tyPoolAns(id);
  const a = cands.find(x => x.toLowerCase().startsWith(v.toLowerCase())) || cands[0];
  let k = 0;
  while (k < v.length && k < a.length && v[k].toLowerCase() === a[k].toLowerCase()) k++;
  inp.value = a.slice(0, k + 1);
  ty.st[id] = "hint"; state.ty[id] = 0; save();
  inp.classList.add("hint");
  inp.focus({ preventScroll: true });
  tyInput(inp);
}
// g 가 있으면 그 중분류만 채점
function tyCheck(g) {
  const ids = g ? TY_CELLS.filter(c => c.g === g).map(c => c.id) : tyIds();
  let ok = 0;
  const miss = [];
  ids.forEach(id => {
    const v = ty.val[id] || "";
    if (ty.st[id] === "ok") { ok++; state.ty[id] = 1; return; }
    if (ty.st[id] === "hint" && ty.ans[id]) { state.ty[id] = 0; return; }
    const m = tyMatch(id, v);
    if (m && ty.st[id] !== "hint") { ty.st[id] = "ok"; ty.ans[id] = m; ok++; state.ty[id] = 1; return; }
    if (m) { ty.ans[id] = m; state.ty[id] = 0; return; }
    delete ty.ans[id]; miss.push(id);
  });
  // 못 맞힌 칸에는 그 묶음에서 아직 안 나온 약을 차례로 보여 줌
  miss.forEach(id => { ty.st[id] = "show"; state.ty[id] = 0; ty.ans[id] = tyPoolAns(id)[0] || TY_BYPOS[id].a; });
  if (!g) { ty.checked = true; state.tyb[ty.si] = [ok, ids.length, Date.now()]; }
  save();
  if (g) {
    // 그 중분류 제목 위치를 그대로 두고 다시 그림
    const h0 = app().querySelector(`[data-gh="${g}"]`), top0 = h0 ? h0.getBoundingClientRect().top : 0;
    renderType();
    const h1 = app().querySelector(`[data-gh="${g}"]`);
    if (h1) window.scrollBy(0, h1.getBoundingClientRect().top - top0);
    const gs = h1 && h1.querySelector(".ty-gs");
    if (gs) gs.classList.add(ok === ids.length ? "all" : "some");
    return;
  }
  renderType();
  const first = app().querySelector(".ty-in.show, .ty-in.hint");
  if (first) first.scrollIntoView({ block: "center" }); else window.scrollTo(0, 0);
  $("#tyRes").textContent = ok === ids.length ? "전부 맞혔어요!" : `틀림·힌트 ${ids.length - ok}칸 — 빨간 글씨가 정답, 노란 글씨는 힌트를 쓴 칸이에요.`;
}

// ───── 키보드
document.addEventListener("keydown", e => {
  if (!session || !session.cur) return;
  if (e.target && e.target.tagName === "INPUT") return;
  const k = e.key.toLowerCase();
  if (session.mode === "tf") {
    if (!session.answered && (k === "o" || k === "1")) answerTF(true);
    else if (!session.answered && (k === "x" || k === "2")) answerTF(false);
    else if (session.answered && (k === "enter" || k === " ")) { e.preventDefault(); session.queue.shift(); next(); }
    return;
  }
  if (!session.flipped && (k === " " || k === "enter")) { e.preventDefault(); session.flipped = true; renderFlash(); }
  else if (session.flipped && k === "1") grade(false);
  else if (session.flipped && (k === "2" || k === "enter")) grade(true);
});

location.hash === "#type" ? renderType() : renderHome();
registerSW();
