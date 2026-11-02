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
  tf: { label: "T/F 함정 문항", desc: `요약본의 ${TFS.length}문항, O/X로 바로 채점` }
};

// ───── 저장
const STORE_KEY = "drugs-study-v1";
const state = (() => {
  let s = null;
  try { s = JSON.parse(localStorage.getItem(STORE_KEY)); } catch (e) {}
  s = s || {};
  s.k = s.k || {};      // 카드 id → 1(알았음) / 0(다시)
  s.tf = s.tf || {};    // T/F id → [맞음, 틀림]
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
function poolFor(mode) { return mode === "pair" ? pairPool() : mode === "tf" ? tfPool() : filt(CARDS); }

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
  $("#reset").onclick = () => { if (confirm("외운 카드·T/F 기록을 모두 지울까요? 설정은 유지됩니다.")) { state.k = {}; state.tf = {}; save(); renderHome(); } };
  view = "home";
  window.scrollTo(0, keepY);
}

// ───── 시작
function start(mode) {
  if (mode === "browse") return renderBrowse();
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

renderHome();
registerSW();
