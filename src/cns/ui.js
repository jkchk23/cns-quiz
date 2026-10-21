// ───── 저장
const STORE_KEY = "cns-quiz-v1";
const state = loadState();
function loadState() {
  let s = null;
  try { s = JSON.parse(localStorage.getItem(STORE_KEY)); } catch (e) {}
  s = s || {};
  s.q = s.q || {};          // id → [맞음, 틀림, 마지막시각]
  s.wrong = s.wrong || {};  // id → 시각
  s.set = Object.assign({ units: [1,2,3,4,5,6,7,8,9,10,11], types: ["cur","mech","rmech","class","sig"], count: 20, prio: true, theme: "auto" }, s.set || {});
  return s;
}
function save() { try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch (e) {} }

const ALL_UNITS = Object.keys(UNITS).map(Number);
const ALL_POOL = buildPool(new Set(ALL_UNITS), new Set(Object.keys(TYPES)));
const POOL_BY_ID = Object.fromEntries(ALL_POOL.map(p => [p.id, p]));
// 오답노트에 남아 있지만 문제 은행에서 사라진 id 정리
Object.keys(state.wrong).forEach(id => { if (!POOL_BY_ID[id]) delete state.wrong[id]; });

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

// ───── 홈
function renderHome() {
  session = null;
  const s = state.set;
  const units = new Set(s.units), types = new Set(s.types);
  const pool = buildPool(units, types);
  const wrongN = Object.keys(state.wrong).length;
  const seen = Object.keys(state.q).length;

  const unitBtns = ALL_UNITS.map(u => {
    const n = buildPool(new Set([u]), types).length;
    return `<button class="unit ${units.has(u) ? "on" : ""}" data-u="${u}" aria-pressed="${units.has(u)}">
      <span class="pill"><i>${u}</i></span><span class="uname">${UNITS[u]}</span><span class="ucount">${n}</span></button>`;
  }).join("");

  const typeRows = Object.entries(TYPES).map(([k, t]) => {
    const n = buildPool(units, new Set([k])).length;
    return `<button class="trow ${types.has(k) ? "on" : ""}" data-t="${k}" aria-pressed="${types.has(k)}">
      <span class="check" aria-hidden="true"></span>
      <span class="tl"><b>${t.label}</b><small>${t.desc}</small></span><span class="tc">${n}</span></button>`;
  }).join("");

  const counts = [10, 20, 30, 50, 0].map(c =>
    `<button class="seg ${s.count === c ? "on" : ""}" data-c="${c}">${c || "전체"}</button>`).join("");

  app().innerHTML = `
  ${subjectSwitcher()}
  <header class="home-head">
    <h1>CNS 약물<br>객관식 문제</h1>
    <p class="lede">강의록 기반 문항 ${CUR.length}개와 약물 ${DRUGS.length}개로 만든 자동 문항. 보기는 풀 때마다 새로 섞입니다.</p>
  </header>

  <section class="block">
    <div class="bhead"><h2>단원</h2>
      <span class="links"><button class="link" id="allU">전체 선택</button><button class="link" id="noneU">모두 해제</button></span></div>
    <div class="units">${unitBtns}</div>
  </section>

  <section class="block">
    <div class="bhead"><h2>문제 유형</h2></div>
    <div class="types">${typeRows}</div>
  </section>

  <section class="block">
    <div class="bhead"><h2>문제 수</h2></div>
    <div class="segs">${counts}</div>
    <label class="toggle"><input type="checkbox" id="prio" ${s.prio ? "checked" : ""}><span>틀린 문제와 안 푼 문제를 먼저 내기</span></label>
  </section>

  <div class="actions">
    <button class="primary" id="start" ${pool.length ? "" : "disabled"}>${pool.length ? `${s.count && s.count < pool.length ? s.count : pool.length}문제 풀기` : "단원과 유형을 골라 주세요"}</button>
    <div class="row2">
      <button class="secondary" id="wrongBtn" ${wrongN ? "" : "disabled"}>오답노트 <b>${wrongN}</b></button>
      <button class="secondary" id="dictBtn">약물 사전</button>
    </div>
  </div>

  <section class="block">
    <div class="bhead"><h2>화면 색</h2></div>
    <div class="themes">${THEMES.map(([k, label, c]) => `<button class="th ${getTheme() === k ? "on" : ""}" data-th="${k}" aria-pressed="${getTheme() === k}">
      <span class="sw">${c ? `<i style="background:${c[0]}"></i><i style="background:${c[1]}"></i>` : `<i style="background:#EEF1F4"></i><i style="background:#14181D"></i>`}</span>${label}</button>`).join("")}</div>
  </section>

  ${renderStats()}

  <footer class="foot">
    <span>푼 문제 ${seen} / ${ALL_POOL.length}</span>
    <button class="link danger" id="reset">학습 기록 지우기</button>
  </footer>`;

  app().querySelectorAll(".unit").forEach(b => b.onclick = () => {
    const u = +b.dataset.u; const set = new Set(state.set.units);
    set.has(u) ? set.delete(u) : set.add(u);
    state.set.units = [...set].sort((a, b) => a - b); save(); renderHome();
  });
  app().querySelectorAll(".trow").forEach(b => b.onclick = () => {
    const t = b.dataset.t; const set = new Set(state.set.types);
    set.has(t) ? set.delete(t) : set.add(t);
    state.set.types = [...set]; save(); renderHome();
  });
  app().querySelectorAll(".seg").forEach(b => b.onclick = () => { state.set.count = +b.dataset.c; save(); renderHome(); });
  app().querySelectorAll(".th").forEach(b => b.onclick = () => { setTheme(b.dataset.th); applyTheme(); renderHome(); });
  $("#allU").onclick = () => { state.set.units = ALL_UNITS.slice(); save(); renderHome(); };
  $("#noneU").onclick = () => { state.set.units = []; save(); renderHome(); };
  $("#prio").onchange = e => { state.set.prio = e.target.checked; save(); renderHome(); };
  $("#start").onclick = () => startQuiz(pool, "normal");
  $("#wrongBtn").onclick = () => startQuiz(Object.keys(state.wrong).map(id => POOL_BY_ID[id]).filter(Boolean), "wrong");
  $("#dictBtn").onclick = () => renderDict();
  $("#reset").onclick = () => {
    if (confirm("맞힌·틀린 기록과 오답노트를 모두 지울까요? 설정은 유지됩니다.")) { state.q = {}; state.wrong = {}; save(); renderHome(); }
  };
  window.scrollTo(0, 0);
}

function renderStats() {
  const rows = ALL_UNITS.map(u => {
    let c = 0, w = 0;
    for (const [id, v] of Object.entries(state.q)) { const p = POOL_BY_ID[id]; if (p && p.u === u) { c += v[0]; w += v[1]; } }
    return { u, c, w, t: c + w };
  }).filter(r => r.t > 0);
  if (!rows.length) return "";
  return `<section class="block">
    <div class="bhead"><h2>단원별 정답률</h2></div>
    <div class="stats">${rows.map(r => {
      const p = Math.round(r.c / r.t * 100);
      return `<div class="srow"><span class="sname">${r.u}. ${UNITS[r.u]}</span>
        <span class="bar"><span style="width:${p}%"></span></span><span class="sp">${p}%</span><span class="sn">${r.t}회</span></div>`;
    }).join("")}</div></section>`;
}

// ───── 퀴즈
function startQuiz(pool, mode) {
  if (!pool.length) return;
  let list;
  if (mode === "wrong" || mode === "retry") list = shuffle(pool);
  else if (state.set.prio) {
    list = pool.map(p => {
      const r = state.q[p.id];
      const rank = state.wrong[p.id] ? 0 : !r ? 1 : 2;
      return { p, k: rank + Math.random() * 0.9 };
    }).sort((a, b) => a.k - b.k).map(x => x.p);
  } else list = shuffle(pool);
  const n = mode === "normal" && state.set.count ? Math.min(state.set.count, list.length) : list.length;
  session = { mode, items: list.slice(0, n), i: 0, log: [], cur: null, answered: false };
  nextQ();
}

function nextQ() {
  if (session.i >= session.items.length) return renderResult();
  const item = session.items[session.i];
  session.cur = { item, m: materialize(item) };
  session.answered = false;
  renderQ();
}

const NUMS = ["①","②","③","④","⑤"];
function renderQ() {
  const { item, m } = session.cur;
  const total = session.items.length, idx = session.i;
  const right = session.log.filter(l => l.ok).length;
  const kindLabel = TYPES[item.kind].label;
  app().innerHTML = `
  <div class="qtop">
    <button class="icon" id="quit" aria-label="그만 풀기">✕</button>
    <div class="prog" role="progressbar" aria-valuemin="0" aria-valuemax="${total}" aria-valuenow="${idx}"><span style="width:${idx / total * 100}%"></span></div>
    <span class="count">${idx + 1}<small>/${total}</small></span>
  </div>
  <article class="qcard">
    <div class="qmeta"><span class="pill sm"><i>${item.u}</i></span><span>${UNITS[item.u]}</span><span class="kind">${kindLabel}</span>${session.mode === "wrong" ? `<span class="kind w">오답노트</span>` : ""}</div>
    <h2 class="stem">${m.stem}</h2>
    <ol class="opts">${m.options.map((o, i) =>
      `<li><button class="opt" data-i="${i}"><span class="num">${NUMS[i]}</span><span class="ot">${esc(o.t)}</span></button></li>`).join("")}</ol>
    <div id="fb"></div>
  </article>
  <div class="score">맞힌 문제 ${right} / ${idx}</div>`;
  app().querySelectorAll(".opt").forEach(b => b.onclick = () => answer(+b.dataset.i));
  $("#quit").onclick = () => {
    if (!session.log.length || confirm("지금까지 푼 기록은 저장돼요. 그만 풀까요?")) session.log.length ? renderResult() : renderHome();
  };
  window.scrollTo(0, 0);
}

function answer(i) {
  if (session.answered) return;
  session.answered = true;
  const { item, m } = session.cur;
  const ok = i === m.correct;
  const r = state.q[item.id] || [0, 0, 0];
  ok ? r[0]++ : r[1]++; r[2] = Date.now();
  state.q[item.id] = r;
  if (ok) delete state.wrong[item.id]; else state.wrong[item.id] = Date.now();
  save();
  session.log.push({ item, m, chosen: i, ok });

  app().querySelectorAll(".opt").forEach((b, k) => {
    b.disabled = true;
    if (k === m.correct) b.classList.add("correct");
    else if (k === i) b.classList.add("wrong");
    else b.classList.add("dim");
  });
  const sc = app().querySelector(".score");
  if (sc) sc.textContent = `맞힌 문제 ${session.log.filter(l => l.ok).length} / ${session.log.length}`;
  const last = session.i + 1 >= session.items.length;
  $("#fb").innerHTML = `
    <div class="verdict ${ok ? "ok" : "no"}">${ok ? "정답" : `오답 — 정답은 ${NUMS[m.correct]}`}</div>
    ${explain(item, m, i)}
    <button class="primary next" id="next">${last ? "결과 보기" : "다음 문제"}</button>`;
  $("#next").onclick = () => { session.i++; nextQ(); };
  $("#next").focus({ preventScroll: true });
  $("#fb").scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "nearest" });
}

function drugCard(d, title) {
  return `<div class="dcard">
    ${title ? `<div class="dtitle">${title}</div>` : ""}
    <div class="dname">${esc(d.n)} <span class="pill sm"><i>${d.u}</i></span></div>
    <dl>
      <dt>분류</dt><dd>${esc(d.c)}</dd>
      ${d.m ? `<dt>기전</dt><dd>${esc(d.m)}</dd>` : ""}
      ${d.use && d.use !== "—" ? `<dt>용도</dt><dd>${esc(d.use)}</dd>` : ""}
      ${d.s ? `<dt>특징</dt><dd>${esc(d.s)}</dd>` : ""}
    </dl></div>`;
}

function explain(item, m, chosen) {
  if (item.kind === "cur") return m.expl ? `<div class="expl">${m.expl}</div>` : "";
  let h = drugCard(m.drug, "정답 약물");
  if (m.also && m.also.length) h += `<p class="note">같은 기전: ${m.also.map(esc).join(", ")}</p>`;
  if (chosen !== m.correct) {
    const o = m.options[chosen];
    if (o.drug && item.kind !== "mech") h += drugCard(o.drug, "고른 약물");
    else if (o.drug && item.kind === "mech") {
      const owners = DRUGS.filter(d => d.m === o.t).map(d => d.n);
      h += `<p class="note">고른 보기는 ${esc(owners.slice(0, 4).join(", "))}${owners.length > 4 ? " 등" : ""}의 기전입니다.</p>`;
    } else if (o.cls) {
      const ex = DRUGS.filter(d => d.c === o.cls).map(d => d.n);
      h += `<p class="note">${esc(o.cls)}: ${esc(ex.slice(0, 5).join(", "))}${ex.length > 5 ? " 등" : ""}</p>`;
    }
  }
  return h;
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
      <div class="wq">${l.m.stem}</div>
      <div class="wa"><span class="tag no">고른 답</span>${esc(l.m.options[l.chosen].t)}</div>
      <div class="wa"><span class="tag ok">정답</span>${esc(l.m.options[l.m.correct].t)}</div>
    </li>`).join("")}</ol></section>` : ""}`;
  const again = $("#again"), home = $("#home"), rw = $("#retryW");
  if (rw) rw.onclick = () => startQuiz(wrongs.map(l => l.item), "retry");
  again.onclick = () => startQuiz(buildPool(new Set(state.set.units), new Set(state.set.types)), "normal");
  home.onclick = () => renderHome();
  window.scrollTo(0, 0);
}

// ───── 약물 사전
let dictUnit = 0, dictQ = "";
function renderDict() {
  session = null;
  const chips = [0, ...ALL_UNITS.filter(u => u <= 10)].map(u =>
    `<button class="chip ${dictUnit === u ? "on" : ""}" data-u="${u}">${u ? u + ". " + UNITS[u] : "전체"}</button>`).join("");
  app().innerHTML = `
  <div class="qtop"><button class="icon" id="back" aria-label="처음으로">✕</button><h2 class="dhead">약물 사전</h2></div>
  <input class="search" id="q" type="search" placeholder="약 이름, 기전, 부작용으로 찾기" value="${esc(dictQ)}" autocomplete="off" autocapitalize="off" spellcheck="false">
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
  const list = DRUGS.filter(d => (!dictUnit || d.u === dictUnit) &&
    (!t || [d.n, d.c, d.m, d.use, d.s].join(" ").toLowerCase().includes(t)));
  $("#dlist").innerHTML = list.length
    ? list.map(d => drugCard(d)).join("")
    : `<p class="empty">“${esc(dictQ)}”에 맞는 약이 없어요. 철자를 바꾸거나 단원을 ‘전체’로 바꿔 보세요.</p>`;
}

// ───── 키보드 (아이패드 키보드 연결 시)
document.addEventListener("keydown", e => {
  if (!session || !session.cur) return;
  if (e.target && e.target.tagName === "INPUT") return;
  const k = e.key;
  if (e.target && e.target.tagName === "BUTTON" && (k === "Enter" || k === " ")) return; // 버튼 자체 클릭으로 처리
  if (!session.answered && /^[1-5]$/.test(k)) { const i = +k - 1; if (i < session.cur.m.options.length) answer(i); }
  else if (session.answered && (k === "Enter" || k === " ")) { e.preventDefault(); session.i++; nextQ(); }
});

renderHome();

registerSW();
