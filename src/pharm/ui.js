// ───── 저장
const STORE_KEY = "pharm-quiz-v1";
try { localStorage.removeItem("cns-quiz-v1"); } catch (e) {} // 폐기된 옛 CNS 퀴즈 기록
const ALL_UNITS = Object.keys(UNITS);
const state = loadState();
function loadState() {
  let s = null;
  try { s = JSON.parse(localStorage.getItem(STORE_KEY)); } catch (e) {}
  s = s || {};
  s.q = s.q || {};          // id → [맞음, 틀림, 마지막시각]
  s.wrong = s.wrong || {};  // id → 시각
  s.set = Object.assign({ units: ALL_UNITS.slice(), tags: [], count: 20, prio: true }, s.set || {});
  s.set.units = s.set.units.filter(u => UNITS[u]);
  s.set.tags = s.set.tags.filter(t => TAGS[t]);
  Object.keys(s.wrong).forEach(id => { if (!BYID[id]) delete s.wrong[id]; });
  return s;
}
function save() { try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch (e) {} }

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
let session = null;
const NUMS = ["①", "②", "③", "④", "⑤"];
const smooth = () => (matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth");

// ───── 홈
function renderHome() {
  session = null;
  const s = state.set;
  const units = new Set(s.units), tags = new Set(s.tags);
  const pool = poolOf(units, tags);
  const wrongN = Object.keys(state.wrong).length;
  const seen = Object.keys(state.q).length;

  const groups = UNIT_GROUPS.map(g => {
    const allOn = g.units.every(u => units.has(u));
    return `<div class="ugroup">
      <div class="ghead"><span>${g.label}</span><button class="link" data-g="${g.units.join(",")}" data-on="${allOn}">${allOn ? "이 묶음 해제" : "이 묶음 선택"}</button></div>
      <div class="units">${g.units.map(u => {
        const n = poolOf(new Set([u]), tags).length;
        return `<button class="unit ${units.has(u) ? "on" : ""}" data-u="${u}" aria-pressed="${units.has(u)}">
          <span class="uname">${UNITS[u]}</span><span class="ucount">${n}</span></button>`;
      }).join("")}</div></div>`;
  }).join("");

  const tagChips = [["", "전체 유형"], ...Object.entries(TAGS)].map(([k, label]) => {
    const on = k ? tags.has(k) : !tags.size;
    const n = k ? poolOf(units, new Set([k])).length : poolOf(units, new Set()).length;
    return `<button class="chip ${on ? "on" : ""}" data-t="${k}" aria-pressed="${on}">${label} <small>${n}</small></button>`;
  }).join("");

  const counts = [10, 20, 30, 50, 0].map(c =>
    `<button class="seg ${s.count === c ? "on" : ""}" data-c="${c}">${c || "전체"}</button>`).join("");
  const n = s.count && s.count < pool.length ? s.count : pool.length;

  app().innerHTML = `
  ${subjectSwitcher()}
  <header class="home-head">
    <h1>약리학<br>객관식 문제</h1>
    <p class="lede">박해정 교수님 강의록(CNS 7–10강, 17–21강)과 2017–2025 기출 출제 스타일로 만든 ${ITEMS.length}문항. 증례형·짝 맞추기·모두 고르시오가 기출 비율대로 섞여 있어요.</p>
  </header>

  <section class="block">
    <div class="bhead"><h2>단원</h2>
      <span class="links"><button class="link" id="allU">전체 선택</button><button class="link" id="noneU">모두 해제</button></span></div>
    ${groups}
  </section>

  <section class="block">
    <div class="bhead"><h2>문제 유형</h2><span class="hint">여러 개 고르면 하나라도 해당하는 문제</span></div>
    <div class="chips wrap">${tagChips}</div>
  </section>

  <section class="block">
    <div class="bhead"><h2>문제 수</h2></div>
    <div class="segs">${counts}</div>
    <label class="toggle"><input type="checkbox" id="prio" ${s.prio ? "checked" : ""}><span>틀린 문제와 안 푼 문제를 먼저 내기</span></label>
  </section>

  <div class="actions">
    <button class="primary" id="start" ${pool.length ? "" : "disabled"}>${pool.length ? `${n}문제 풀기` : "단원을 골라 주세요"}</button>
    <div class="row2">
      <button class="secondary" id="wrongBtn" ${wrongN ? "" : "disabled"}>오답노트 <b>${wrongN}</b></button>
      <button class="secondary" id="browseBtn">문항 훑어보기</button>
    </div>
  </div>

  ${renderStats()}

  <section class="block">
    <div class="bhead"><h2>화면 색</h2></div>
    <div class="themes">${THEMES.map(([k, label, c]) => `<button class="th ${getTheme() === k ? "on" : ""}" data-th="${k}" aria-pressed="${getTheme() === k}">
      <span class="sw">${c ? `<i style="background:${c[0]}"></i><i style="background:${c[1]}"></i>` : `<i style="background:#EEF1F4"></i><i style="background:#14181D"></i>`}</span>${label}</button>`).join("")}</div>
  </section>

  <footer class="foot">
    <span>푼 문제 ${seen} / ${ITEMS.length}</span>
    <button class="link danger" id="reset">학습 기록 지우기</button>
  </footer>`;

  app().querySelectorAll(".unit").forEach(b => b.onclick = () => {
    const u = b.dataset.u, set = new Set(state.set.units);
    set.has(u) ? set.delete(u) : set.add(u);
    state.set.units = ALL_UNITS.filter(x => set.has(x)); save(); renderHome();
  });
  app().querySelectorAll("[data-g]").forEach(b => b.onclick = () => {
    const us = b.dataset.g.split(","), set = new Set(state.set.units);
    us.forEach(u => (b.dataset.on === "true" ? set.delete(u) : set.add(u)));
    state.set.units = ALL_UNITS.filter(x => set.has(x)); save(); renderHome();
  });
  app().querySelectorAll(".chip").forEach(b => b.onclick = () => {
    const t = b.dataset.t;
    if (!t) state.set.tags = [];
    else { const set = new Set(state.set.tags); set.has(t) ? set.delete(t) : set.add(t); state.set.tags = [...set]; }
    save(); renderHome();
  });
  app().querySelectorAll(".seg").forEach(b => b.onclick = () => { state.set.count = +b.dataset.c; save(); renderHome(); });
  app().querySelectorAll(".th").forEach(b => b.onclick = () => { setTheme(b.dataset.th); applyTheme(); renderHome(); });
  $("#allU").onclick = () => { state.set.units = ALL_UNITS.slice(); save(); renderHome(); };
  $("#noneU").onclick = () => { state.set.units = []; save(); renderHome(); };
  $("#prio").onchange = e => { state.set.prio = e.target.checked; save(); renderHome(); };
  $("#start").onclick = () => startQuiz(pool, "normal");
  $("#wrongBtn").onclick = () => startQuiz(Object.keys(state.wrong).map(id => BYID[id]).filter(Boolean), "wrong");
  $("#browseBtn").onclick = () => renderBrowse();
  $("#reset").onclick = () => {
    if (confirm("맞힌·틀린 기록과 오답노트를 모두 지울까요? 설정은 유지됩니다.")) { state.q = {}; state.wrong = {}; save(); renderHome(); }
  };
  window.scrollTo(0, 0);
}

function renderStats() {
  const rows = ALL_UNITS.map(u => {
    let c = 0, w = 0;
    for (const [id, v] of Object.entries(state.q)) { const it = BYID[id]; if (it && it.u === u) { c += v[0]; w += v[1]; } }
    return { u, c, w, t: c + w };
  }).filter(r => r.t > 0);
  if (!rows.length) return "";
  return `<section class="block">
    <div class="bhead"><h2>단원별 정답률</h2></div>
    <div class="stats">${rows.map(r => {
      const p = Math.round(r.c / r.t * 100);
      return `<div class="srow"><span class="sname">${UNITS[r.u]}</span>
        <span class="bar"><span style="width:${p}%"></span></span><span class="sp">${p}%</span><span class="sn">${r.t}회</span></div>`;
    }).join("")}</div></section>`;
}

// ───── 퀴즈
function startQuiz(pool, mode) {
  if (!pool.length) return;
  let list;
  if (mode === "normal" && state.set.prio) {
    list = pool.map(it => {
      const r = state.q[it.id];
      const rank = state.wrong[it.id] ? 0 : !r ? 1 : 2;
      return { it, k: rank + Math.random() * 0.9 };
    }).sort((a, b) => a.k - b.k).map(x => x.it);
  } else list = shuffle(pool);
  const n = mode === "normal" && state.set.count ? Math.min(state.set.count, list.length) : list.length;
  session = { mode, items: list.slice(0, n), i: 0, log: [], cur: null, chosen: new Set(), answered: false };
  nextQ();
}

function nextQ() {
  if (session.i >= session.items.length) return renderResult();
  session.cur = materialize(session.items[session.i]);
  session.chosen = new Set();
  session.answered = false;
  renderQ();
}

function tagLine(it) {
  return it.tags.filter(t => t !== "빈출").map(t => `<span class="kind">${TAGS[t]}</span>`).join("") +
    (it.tags.includes("빈출") ? `<span class="kind hot">빈출</span>` : "");
}

function renderQ() {
  const m = session.cur, it = m.it;
  const total = session.items.length, idx = session.i;
  const right = session.log.filter(l => l.ok).length;
  app().innerHTML = `
  <div class="qtop">
    <button class="icon" id="quit" aria-label="그만 풀기">✕</button>
    <div class="prog" role="progressbar" aria-valuemin="0" aria-valuemax="${total}" aria-valuenow="${idx}"><span style="width:${idx / total * 100}%"></span></div>
    <span class="count">${idx + 1}<small>/${total}</small></span>
  </div>
  <article class="qcard">
    <div class="qmeta"><span class="uname-sm">${UNITS[it.u]}</span>${tagLine(it)}${session.mode === "wrong" ? `<span class="kind w">오답노트</span>` : ""}</div>
    <h2 class="stem">${esc(it.q)}</h2>
    ${it.multi ? `<p class="mhint">정답이 몇 개인지 알려 주지 않아요. 맞는 것을 모두 고른 뒤 ‘정답 확인’을 누르세요.</p>` : ""}
    <ol class="opts ${it.multi ? "multi" : ""}">${m.opts.map((o, i) =>
      `<li><button class="opt" data-i="${i}" ${it.multi ? `aria-pressed="false"` : ""}><span class="num">${NUMS[i]}</span><span class="ot">${esc(o.t)}<span class="onote"></span></span>${it.multi ? `<span class="box" aria-hidden="true"></span>` : ""}</button></li>`).join("")}</ol>
    ${it.multi ? `<button class="primary checkbtn" id="check" disabled>정답 확인</button>` : ""}
    <div id="fb"></div>
  </article>
  <div class="score">맞힌 문제 ${right} / ${idx}</div>`;
  app().querySelectorAll(".opt").forEach(b => b.onclick = () => pick(+b.dataset.i));
  if (it.multi) $("#check").onclick = () => grade();
  $("#quit").onclick = () => {
    if (!session.log.length || confirm("지금까지 푼 기록은 저장돼요. 그만 풀까요?")) session.log.length ? renderResult() : renderHome();
  };
  window.scrollTo(0, 0);
}

function pick(i) {
  if (session.answered) return;
  const it = session.cur.it;
  if (!it.multi) { session.chosen = new Set([i]); return grade(); }
  session.chosen.has(i) ? session.chosen.delete(i) : session.chosen.add(i);
  app().querySelectorAll(".opt").forEach((b, k) => {
    const on = session.chosen.has(k);
    b.classList.toggle("sel", on); b.setAttribute("aria-pressed", on);
  });
  $("#check").disabled = !session.chosen.size;
}

function grade() {
  if (session.answered || !session.chosen.size) return;
  session.answered = true;
  const m = session.cur, it = m.it;
  const ok = isRight(m, session.chosen);
  const r = state.q[it.id] || [0, 0, 0];
  ok ? r[0]++ : r[1]++; r[2] = Date.now();
  state.q[it.id] = r;
  if (ok) delete state.wrong[it.id]; else state.wrong[it.id] = Date.now();
  save();
  session.log.push({ m, chosen: new Set(session.chosen), ok });

  app().querySelectorAll(".opt").forEach((b, k) => {
    b.disabled = true;
    const o = m.opts[k], picked = session.chosen.has(k);
    if (o.ok) b.classList.add("correct");
    if (picked && !o.ok) b.classList.add("wrong");
    if (!o.ok && !picked) b.classList.add("dim");
    if (o.ok && !picked && it.multi) b.classList.add("missed");
    const note = b.querySelector(".onote");
    if (o.note.trim()) note.textContent = (o.ok ? "✓ " : "✗ ") + o.note;
  });
  const ch = $("#check"); if (ch) ch.remove();
  const sc = app().querySelector(".score");
  if (sc) sc.textContent = `맞힌 문제 ${session.log.filter(l => l.ok).length} / ${session.log.length}`;
  const last = session.i + 1 >= session.items.length;
  const ans = m.correct.map(i => NUMS[i]).join(", ");
  $("#fb").innerHTML = `
    <div class="verdict ${ok ? "ok" : "no"}">${ok ? "정답" : `오답 — 정답은 ${ans}`}</div>
    ${it.e ? `<div class="expl">${esc(it.e)}</div>` : ""}
    <button class="primary next" id="next">${last ? "결과 보기" : "다음 문제"}</button>`;
  $("#next").onclick = () => { session.i++; nextQ(); };
  $("#next").focus({ preventScroll: true });
  $("#fb").scrollIntoView({ behavior: smooth(), block: "nearest" });
}

// ───── 결과
function renderResult() {
  const log = session.log;
  const right = log.filter(l => l.ok).length;
  const wrongs = log.filter(l => !l.ok);
  const p = log.length ? Math.round(right / log.length * 100) : 0;
  app().innerHTML = `
  <header class="res-head">
    <div class="big">${right}<small>/${log.length}</small></div>
    <p>정답률 ${p}%${wrongs.length ? ` · 틀린 ${wrongs.length}문제는 오답노트에 들어갔어요.` : " · 모두 맞혔어요."}</p>
  </header>
  <div class="actions">
    ${wrongs.length ? `<button class="primary" id="retryW">틀린 ${wrongs.length}문제 다시 풀기</button>` : ""}
    <div class="row2">
      <button class="secondary" id="again">새 문제 풀기</button>
      <button class="secondary" id="home">처음으로</button>
    </div>
  </div>
  ${wrongs.length ? `<section class="block"><div class="bhead"><h2>틀린 문제</h2></div>
    <ol class="wlist">${wrongs.map(l => `<li>
      <div class="wq"><span class="uname-sm">${UNITS[l.m.it.u]}</span> ${esc(l.m.it.q)}</div>
      <div class="wa"><span class="tag no">고른 답</span>${[...l.chosen].sort().map(i => esc(l.m.opts[i].t)).join(" / ")}</div>
      <div class="wa"><span class="tag ok">정답</span>${l.m.correct.map(i => esc(l.m.opts[i].t)).join(" / ")}</div>
    </li>`).join("")}</ol></section>` : ""}`;
  const rw = $("#retryW");
  if (rw) rw.onclick = () => startQuiz(wrongs.map(l => l.m.it), "retry");
  $("#again").onclick = () => startQuiz(poolOf(new Set(state.set.units), new Set(state.set.tags)), "normal");
  $("#home").onclick = () => renderHome();
  window.scrollTo(0, 0);
}

// ───── 문항 훑어보기 (검색 + 정답·해설)
let brUnit = "", brQ = "";
function renderBrowse() {
  session = null;
  const chips = ["", ...ALL_UNITS].map(u =>
    `<button class="chip ${brUnit === u ? "on" : ""}" data-u="${u}">${u ? UNITS[u] : "전체"}</button>`).join("");
  app().innerHTML = `
  <div class="qtop"><button class="icon" id="back" aria-label="처음으로">✕</button><h2 class="dhead">문항 훑어보기</h2></div>
  <input class="search" id="q" type="search" placeholder="약 이름·기전·부작용으로 찾기 (예: dantrolene, QT)" value="${esc(brQ)}" autocomplete="off" autocapitalize="off" spellcheck="false">
  <div class="chips">${chips}</div>
  <div id="blist" class="dlist"></div>`;
  $("#back").onclick = () => renderHome();
  app().querySelectorAll(".chip").forEach(b => b.onclick = () => { brUnit = b.dataset.u; renderBrowse(); });
  const q = $("#q");
  q.oninput = () => { brQ = q.value; fillBrowse(); };
  fillBrowse();
}
function fillBrowse() {
  const t = brQ.trim().toLowerCase();
  const list = ITEMS.filter(it => (!brUnit || it.u === brUnit) &&
    (!t || [it.q, it.e, ...it.o, ...it.n].join(" ").toLowerCase().includes(t)));
  $("#blist").innerHTML = list.length ? `<p class="note">${list.length}문항</p>` + list.map(it => `
    <article class="dcard">
      <div class="qmeta"><span class="uname-sm">${UNITS[it.u]}</span>${tagLine(it)}</div>
      <div class="bq">${esc(it.q)}</div>
      <ol class="blist-o">${it.o.map((o, k) => `<li class="${it.a.includes(k) ? "ans" : ""}">${NUMS[k]} ${esc(o)}</li>`).join("")}</ol>
      <details class="bexp"><summary>정답·해설</summary><p><b>정답 ${it.a.map(k => NUMS[k]).join(", ")}</b></p><p>${esc(it.e)}</p></details>
      <button class="secondary solo" data-id="${it.id}">이 문제 풀기</button>
    </article>`).join("")
    : `<p class="empty">“${esc(brQ)}”가 들어간 문항이 없어요. 철자를 바꾸거나 단원을 ‘전체’로 바꿔 보세요.</p>`;
  app().querySelectorAll(".solo").forEach(b => b.onclick = () => startQuiz([BYID[b.dataset.id]], "one"));
}

// ───── 키보드 (아이패드 키보드 연결 시)
document.addEventListener("keydown", e => {
  if (!session || !session.cur) return;
  if (e.target && e.target.tagName === "INPUT") return;
  const k = e.key;
  if (e.target && e.target.tagName === "BUTTON" && (k === "Enter" || k === " ")) return;
  if (!session.answered && /^[1-5]$/.test(k)) pick(+k - 1);
  else if (!session.answered && k === "Enter" && session.cur.it.multi) { e.preventDefault(); grade(); }
  else if (session.answered && (k === "Enter" || k === " ")) { e.preventDefault(); session.i++; nextQ(); }
});

renderHome();
registerSW();
