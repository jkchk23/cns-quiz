// ───── 저장
const STORE_KEY = "micro-essay-v1";
const state = loadState();
function loadState() {
  let s = null;
  try { s = JSON.parse(localStorage.getItem(STORE_KEY)); } catch (e) {}
  s = s || {};
  s.q = s.q || {};        // id → [{s: 점수, t: 시각}]
  s.draft = s.draft || {}; // id → 작성 중 답안
  s.set = Object.assign({ units: [17, 18, 19, 20], order: "seq", theme: "auto" }, s.set || {});
  return s;
}
function save() { try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch (e) {} }
const best = id => { const h = state.q[id] || []; return h.length ? Math.max(...h.map(x => x.s)) : null; };
const last = id => { const h = state.q[id] || []; return h.length ? h[h.length - 1].s : null; };

// ───── 화면 색
const THEMES = [
  ["auto", "자동", null],
  ["light", "밝게", ["#EEF1F4", "#2848A0"]],
  ["dark", "어둡게", ["#14181D", "#6F8EF0"]],
  ["mint", "민트", ["#E6F2EE", "#1D7A63"]],
  ["lavender", "라벤더", ["#EEECF7", "#5847C2"]],
  ["paper", "종이", ["#F2EBDD", "#8A5528"]]
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
const ALL_UNITS = Object.keys(UNITS).map(Number);
let session = null;
let view = ""; // 지금 보이는 화면 — 홈 안에서 다시 그릴 때는 스크롤 위치를 유지
const smooth = () => matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";

// ───── 홈
function poolFor(units) { return ESSAYS.filter(q => units.has(q.lec)); }
function renderHome() {
  const keepY = view === "home" ? window.scrollY : 0;
  session = null;
  const s = state.set;
  const units = new Set(s.units);
  const pool = poolFor(units);
  const low = ESSAYS.filter(q => { const b = best(q.id); return b !== null && b < 80; });
  const done = ESSAYS.filter(q => best(q.id) !== null).length;

  const unitBtns = ALL_UNITS.map(u => {
    const n = ESSAYS.filter(q => q.lec === u).length;
    return `<button class="unit ${units.has(u) ? "on" : ""}" data-u="${u}" aria-pressed="${units.has(u)}" ${n ? "" : "disabled"}>
      <span class="pill"><i>${u}</i></span><span class="uname">${UNITS[u]}</span><span class="ucount">${n || "출제 없음"}</span></button>`;
  }).join("");

  const qrows = pool.map(q => {
    const b = best(q.id);
    return `<button class="trow qrow" data-id="${q.id}">
      <span class="pill sm"><i>${q.lec}</i></span>
      <span class="tl"><b>${esc(SHORT[q.id])} <span class="qno">${q.no}${q.pts ? ` · ${q.pts}점` : ""}</span></b><small>${esc(q.stem)}</small></span>
      <span class="qbest ${b === null ? "" : band(b)}">${b === null ? "—" : b}</span></button>`;
  }).join("");

  const orders = [["seq", "순서대로"], ["rand", "무작위"], ["low", "낮은 점수 먼저"]].map(([k, l]) =>
    `<button class="seg ${s.order === k ? "on" : ""}" data-o="${k}">${l}</button>`).join("");

  app().innerHTML = `
  ${subjectSwitcher()}
  <header class="home-head">
    <h1>미생물<br>서술형 문제</h1>
    <p class="lede">조정제 교수님 기말 서술형 족보 ${ESSAYS.length}문항. 답을 직접 타이핑하면 강의록 핵심 키워드로 채점하고, 빠진 항목과 모범답안을 보여 줍니다.</p>
  </header>

  <section class="block">
    <div class="bhead"><h2>단원</h2>
      <span class="links"><button class="link" id="allU">전체 선택</button><button class="link" id="noneU">모두 해제</button></span></div>
    <div class="units">${unitBtns}</div>
  </section>

  <section class="block">
    <div class="bhead"><h2>문항</h2><span class="hint">최고점 · 눌러서 한 문항만 풀기</span></div>
    <div class="types">${qrows || `<p class="empty">단원을 골라 주세요.</p>`}</div>
  </section>

  <section class="block">
    <div class="bhead"><h2>푸는 순서</h2></div>
    <div class="segs">${orders}</div>
  </section>

  <div class="actions">
    <button class="primary" id="start" ${pool.length ? "" : "disabled"}>${pool.length ? `${pool.length}문항 풀기` : "단원을 골라 주세요"}</button>
    <div class="row2">
      <button class="secondary" id="lowBtn" ${low.length ? "" : "disabled"}>80점 미만 다시 <b>${low.length}</b></button>
      <button class="secondary" id="dictBtn">모범답안 모음</button>
    </div>
  </div>

  <section class="block">
    <div class="bhead"><h2>화면 색</h2></div>
    <div class="themes">${THEMES.map(([k, label, c]) => `<button class="th ${getTheme() === k ? "on" : ""}" data-th="${k}" aria-pressed="${getTheme() === k}">
      <span class="sw">${c ? `<i style="background:${c[0]}"></i><i style="background:${c[1]}"></i>` : `<i style="background:#EEF1F4"></i><i style="background:#14181D"></i>`}</span>${label}</button>`).join("")}</div>
  </section>

  ${renderStats()}

  <footer class="foot">
    <span>풀어 본 문항 ${done} / ${ESSAYS.length}</span>
    <button class="link danger" id="reset">학습 기록 지우기</button>
  </footer>`;

  app().querySelectorAll(".unit").forEach(b => b.onclick = () => {
    const u = +b.dataset.u; const set = new Set(state.set.units);
    set.has(u) ? set.delete(u) : set.add(u);
    state.set.units = [...set].sort((a, b) => a - b); save(); renderHome();
  });
  app().querySelectorAll(".qrow").forEach(b => b.onclick = () => startQuiz([BYID[b.dataset.id]], "one"));
  app().querySelectorAll(".seg").forEach(b => b.onclick = () => { state.set.order = b.dataset.o; save(); renderHome(); });
  app().querySelectorAll(".th").forEach(b => b.onclick = () => { setTheme(b.dataset.th); applyTheme(); renderHome(); });
  $("#allU").onclick = () => { state.set.units = ALL_UNITS.slice(); save(); renderHome(); };
  $("#noneU").onclick = () => { state.set.units = []; save(); renderHome(); };
  $("#start").onclick = () => startQuiz(pool, "normal");
  $("#lowBtn").onclick = () => startQuiz(low, "low");
  $("#dictBtn").onclick = () => renderDict();
  $("#reset").onclick = () => {
    if (confirm("채점 기록을 모두 지울까요? 작성 중인 답안과 설정은 남아요.")) { state.q = {}; save(); renderHome(); }
  };
  view = "home";
  window.scrollTo(0, keepY);
}

function renderStats() {
  const rows = ALL_UNITS.map(u => {
    const qs = ESSAYS.filter(q => q.lec === u && best(q.id) !== null);
    if (!qs.length) return null;
    const avg = Math.round(qs.reduce((a, q) => a + best(q.id), 0) / qs.length);
    const n = qs.reduce((a, q) => a + state.q[q.id].length, 0);
    return { u, avg, n };
  }).filter(Boolean);
  if (!rows.length) return "";
  return `<section class="block">
    <div class="bhead"><h2>단원별 최고점 평균</h2></div>
    <div class="stats">${rows.map(r => `<div class="srow"><span class="sname">${r.u}. ${UNITS[r.u]}</span>
      <span class="bar"><span style="width:${r.avg}%"></span></span><span class="sp">${r.avg}</span><span class="sn">${r.n}회</span></div>`).join("")}</div></section>`;
}

// ───── 문제 풀기
function startQuiz(list, mode) {
  if (!list.length) return;
  let items = list.slice();
  if (mode === "normal") {
    if (state.set.order === "rand") items = shuffle(items);
    else if (state.set.order === "low") items = items.map(q => ({ q, k: (best(q.id) ?? -1) + Math.random() })).sort((a, b) => a.k - b.k).map(x => x.q);
  }
  session = { mode, items, i: 0, log: [], graded: null };
  renderQ();
}

function renderQ() {
  view = "quiz";
  if (session.i >= session.items.length) return renderResult();
  const q = session.items[session.i];
  const total = session.items.length, idx = session.i;
  session.graded = null;
  const b = best(q.id);
  app().innerHTML = `
  <div class="qtop">
    <button class="icon" id="quit" aria-label="그만 풀기">✕</button>
    <div class="prog" role="progressbar" aria-valuemin="0" aria-valuemax="${total}" aria-valuenow="${idx}"><span style="width:${idx / total * 100}%"></span></div>
    <span class="count">${idx + 1}<small>/${total}</small></span>
  </div>
  <article class="qcard">
    <div class="qmeta"><span class="pill sm"><i>${q.lec}</i></span><span>${UNITS[q.lec]}</span><span class="kind">서술 ${q.no}</span><span class="kind">${esc(q.jokbo.split(" · ")[0])}</span>${b !== null ? `<span class="kind">최고 ${b}</span>` : ""}</div>
    <h2 class="stem">${esc(q.stem)}${q.pts ? ` <span class="pts">(${q.pts}점)</span>` : ""}</h2>
    <p class="jok">${esc(q.jokbo)}</p>
    <label class="sr" for="ans">내 답안</label>
    <textarea id="ans" class="ans" placeholder="시험장에서 쓰듯 적어 보세요. 의학용어는 영어·한글 모두 인식해요." autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false">${esc(state.draft[q.id] || "")}</textarea>
    <div class="ameta"><span id="cc">0자</span><span>자동 저장 · ⌘/Ctrl + Enter로 채점</span></div>
    <div class="row2 gbtns">
      <button class="primary" id="grade">채점하기</button>
      <button class="secondary" id="peek">모범답안 보기</button>
    </div>
    <div id="fb"></div>
  </article>`;
  const ta = $("#ans"), cc = $("#cc");
  const upd = () => { cc.textContent = ta.value.replace(/\s/g, "").length + "자"; };
  upd();
  ta.oninput = () => { state.draft[q.id] = ta.value; save(); upd(); };
  $("#grade").onclick = () => grade(q);
  $("#peek").onclick = () => showFeedback(q, null);
  $("#quit").onclick = () => {
    if (!session.log.length || confirm("지금까지 채점한 기록은 저장돼요. 그만 풀까요?")) session.log.length ? renderResult() : renderHome();
  };
  window.scrollTo(0, 0);
}

function grade(q) {
  const raw = $("#ans").value;
  if (!raw.trim()) { $("#fb").innerHTML = `<p class="note">답안을 먼저 적어 주세요. 모르겠으면 ‘모범답안 보기’를 누르세요.</p>`; return; }
  const hits = gradeText(q, raw);
  const s = scoreOf(q, hits);
  const h = state.q[q.id] || (state.q[q.id] = []);
  if (session.graded && session.graded.q === q) h[h.length - 1] = { s, t: Date.now() };
  else h.push({ s, t: Date.now() });
  if (h.length > 30) state.q[q.id] = h.slice(-30);
  save();
  session.graded = { q, auto: hits.slice(), cur: hits.slice() };
  const logged = session.log.find(l => l.q === q);
  if (logged) logged.s = s; else session.log.push({ q, s });
  showFeedback(q, session.graded);
}

function showFeedback(q, g) {
  const lastQ = session.i + 1 >= session.items.length;
  let top = "";
  if (g) {
    const s = scoreOf(q, g.cur), autoS = scoreOf(q, g.auto);
    const miss = g.cur.filter(x => !x).length;
    top = `
    <div class="sbox">
      <div class="sval ${band(s)}">${s}<small>/100</small></div>
      <div class="smeta">
        <div class="bar big"><span class="${band(s)}" style="width:${s}%"></span></div>
        <p>${miss ? `빠진 항목 ${miss}개` : "모든 채점 항목 포함"}${q.pts ? ` · ${q.pts}점 만점 환산 <b>${toPts(q, s)}점</b>` : ""}${s !== autoS ? ` · 자동 채점 ${autoS}점에서 수정` : ""}</p>
      </div>
    </div>
    <div class="bhead rh"><h2>채점 항목</h2><span class="hint">뜻이 맞으면 눌러서 인정 / 취소</span></div>
    <ul class="rubs">${q.rubric.map((r, i) => `<li><button class="rub ${g.cur[i] ? "hit" : ""} ${g.cur[i] !== g.auto[i] ? "man" : ""}" data-i="${i}" aria-pressed="${g.cur[i]}">
      <span class="mk">${g.cur[i] ? "✓" : "✕"}</span>
      <span class="rt">${esc(r.t)}${g.cur[i] ? "" : `<small>인식 키워드: ${esc(rubricHint(r))}</small>`}</span>
      <span class="rw">${r.w}</span></button></li>`).join("")}</ul>`;
  }
  $("#fb").innerHTML = `${top}
    <details class="model" ${g ? "" : "open"}><summary>모범답안 · 해설</summary>
      <div class="mbody">${q.model}<div class="tipbox">💡 ${esc(q.tip)}</div></div></details>
    <div class="row2 nbtns">
      ${g ? `<button class="secondary" id="regrade">답안 고쳐서 다시 채점</button>` : `<button class="secondary" id="backAns">답안 쓰러 가기</button>`}
      <button class="primary" id="next">${lastQ ? "결과 보기" : "다음 문항"}</button>
    </div>`;
  if (g) app().querySelectorAll(".rub").forEach(b => b.onclick = () => {
    const i = +b.dataset.i; g.cur[i] = !g.cur[i];
    const s = scoreOf(q, g.cur);
    const h = state.q[q.id]; if (h && h.length) { h[h.length - 1].s = s; save(); }
    const l = session.log.find(x => x.q === q); if (l) l.s = s;
    const open = $("#fb details.model").open, y = window.scrollY;
    showFeedback(q, g);
    $("#fb details.model").open = open; window.scrollTo(0, y);
  });
  const rg = $("#regrade"), ba = $("#backAns");
  if (rg) rg.onclick = () => { const ta = $("#ans"); ta.focus(); ta.scrollIntoView({ behavior: smooth(), block: "center" }); };
  if (ba) ba.onclick = () => { const ta = $("#ans"); ta.focus(); ta.scrollIntoView({ behavior: smooth(), block: "center" }); };
  $("#next").onclick = () => { if (!session.log.find(l => l.q === q)) session.log.push({ q, s: null }); session.i++; renderQ(); };
  $("#fb").scrollIntoView({ behavior: smooth(), block: "start" });
}

// ───── 결과
function renderResult() {
  view = "result";
  const log = session.log;
  const scored = log.filter(l => l.s !== null);
  const avg = scored.length ? Math.round(scored.reduce((a, l) => a + l.s, 0) / scored.length) : 0;
  const lows = log.filter(l => l.s === null || l.s < 80).map(l => l.q);
  app().innerHTML = `
  <header class="res-head">
    <div class="big">${scored.length ? avg : "—"}<small>${scored.length ? "/100" : ""}</small></div>
    <p>${scored.length ? `채점한 ${scored.length}문항 평균` : "채점한 문항이 없어요"}${lows.length ? ` · 80점 미만·미채점 ${lows.length}문항` : " · 모두 80점 이상"}</p>
  </header>
  <div class="actions">
    ${lows.length ? `<button class="primary" id="retry">${lows.length}문항 다시 쓰기</button>` : ""}
    <div class="row2">
      <button class="secondary" id="again">처음부터 다시</button>
      <button class="secondary" id="home">처음으로</button>
    </div>
  </div>
  <section class="block"><div class="bhead"><h2>이번 점수</h2></div>
    <ol class="wlist">${log.map(l => `<li>
      <div class="wq"><span class="pill sm"><i>${l.q.lec}</i></span> ${esc(l.q.stem)}</div>
      <div class="wa"><span class="tag ${l.s === null ? "no" : l.s >= 80 ? "ok" : "no"}">${l.s === null ? "미채점" : l.s + "점"}</span>${l.q.pts && l.s !== null ? `${l.q.pts}점 만점 환산 ${toPts(l.q, l.s)}점 · ` : ""}최고 ${best(l.q.id) ?? "—"}</div>
    </li>`).join("")}</ol></section>`;
  const r = $("#retry");
  if (r) r.onclick = () => startQuiz(lows, "retry");
  $("#again").onclick = () => startQuiz(session.items, session.mode === "one" ? "one" : "normal");
  $("#home").onclick = () => renderHome();
  window.scrollTo(0, 0);
}

// ───── 모범답안 모음
let dictUnit = 0, dictQ = "";
function renderDict() {
  view = "dict";
  session = null;
  const chips = [0, ...ALL_UNITS.filter(u => ESSAYS.some(q => q.lec === u))].map(u =>
    `<button class="chip ${dictUnit === u ? "on" : ""}" data-u="${u}">${u ? u + ". " + UNITS[u] : "전체"}</button>`).join("");
  app().innerHTML = `
  <div class="qtop"><button class="icon" id="back" aria-label="처음으로">✕</button><h2 class="dhead">모범답안 모음</h2></div>
  <input class="search" id="q" type="search" placeholder="문항·키워드로 찾기 (예: syncytia, 가다실)" value="${esc(dictQ)}" autocomplete="off" autocapitalize="off" spellcheck="false">
  <div class="chips">${chips}</div>
  <div id="dlist" class="dlist"></div>`;
  $("#back").onclick = () => renderHome();
  app().querySelectorAll(".chip").forEach(b => b.onclick = () => { dictUnit = +b.dataset.u; renderDict(); });
  const q = $("#q");
  q.oninput = () => { dictQ = q.value; fillDict(); };
  fillDict();
}
function fillDict() {
  const t = dictQ.trim().toLowerCase();
  const list = ESSAYS.filter(q => (!dictUnit || q.lec === dictUnit) &&
    (!t || [q.stem, q.model.replace(/<[^>]+>/g, " "), q.rubric.map(r => r.t).join(" ")].join(" ").toLowerCase().includes(t)));
  $("#dlist").innerHTML = list.length ? list.map(q => `
    <article class="dcard">
      <div class="qmeta"><span class="pill sm"><i>${q.lec}</i></span><span>${UNITS[q.lec]}</span><span class="kind">서술 ${q.no}</span>${q.pts ? `<span class="kind">${q.pts}점</span>` : ""}</div>
      <div class="dname">${esc(q.stem)}</div>
      <p class="jok">${esc(q.jokbo)}</p>
      <details class="model"><summary>모범답안 · 해설</summary><div class="mbody">${q.model}<div class="tipbox">💡 ${esc(q.tip)}</div></div></details>
      <details class="model"><summary>채점 항목 ${q.rubric.length}개</summary><div class="mbody"><ol>${q.rubric.map(r => `<li>${esc(r.t)} <span class="rw">· ${r.w}</span></li>`).join("")}</ol></div></details>
      <button class="secondary solo" data-id="${q.id}">이 문항 풀기</button>
    </article>`).join("")
    : `<p class="empty">“${esc(dictQ)}”가 들어간 문항이 없어요. 다른 키워드나 ‘전체’ 단원으로 찾아 보세요.</p>`;
  app().querySelectorAll(".solo").forEach(b => b.onclick = () => startQuiz([BYID[b.dataset.id]], "one"));
}

// ───── 키보드 (아이패드 키보드 연결 시)
document.addEventListener("keydown", e => {
  if (!session) return;
  if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
    e.preventDefault();
    const q = session.items[session.i];
    if (!q) return;
    if (document.activeElement && document.activeElement.id === "ans") grade(q);
    else if ($("#next")) $("#next").click();
  }
});

renderHome();

registerSW();
