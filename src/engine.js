// ───── 데이터 정리
const DRUGS = DRUG_ROWS.map(r => {
  const f = r[7] || "";
  return {
    n: r[0], u: r[1], c: r[2], m: r[3] || "",
    g: (r[4] || "").split(/\s+/).filter(Boolean),
    use: r[5] || "", s: r[6] || "",
    nm: f.includes("nm") || !r[3],
    nc: f.includes("nc"),
    x: (r[8] || "").split(",").map(s => s.trim()).filter(Boolean)
  };
});
const BYNAME = Object.fromEntries(DRUGS.map(d => [d.n, d]));

function hash(s) {
  let h = 5381;
  for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) | 0;
  return (h >>> 0).toString(36);
}
const CUR = CURATED.map(r => ({ id: "c:" + hash(r[1] + "|" + r[2]), u: r[0], q: r[1], a: r[2], d: r[3], e: r[4] || "" }));

const TYPES = {
  cur:   { label: "개념 문제", desc: "강의록 기반 문항" },
  mech:  { label: "약 → 기전", desc: "이 약의 기전은?" },
  rmech: { label: "기전 → 약", desc: "이 기전을 가진 약은?" },
  class: { label: "분류 맞히기", desc: "어느 계열?" },
  sig:   { label: "특징 → 약", desc: "부작용·특징으로 약 찾기" }
};

function shuffle(a) {
  a = a.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
// BZD / Barbiturate / Z-drug의 결합 subunit 설명은 서로 배타적이라 함정 보기로 허용
const TRIO = new Set([BZD_M, BRT_M, Z_M]);
const shares = (a, b) => {
  if (TRIO.has(a.m) && TRIO.has(b.m) && a.m !== b.m) return a.g.some(x => x !== "GABAA" && b.g.includes(x));
  return a.g.some(x => b.g.includes(x));
};
const conflict = (a, b) => a.x.includes(b.n) || b.x.includes(a.n);

// 같은 단원 → 다른 단원 순으로 후보 정렬
function tiered(cands, unit, firstTier) {
  const t0 = firstTier ? shuffle(cands.filter(firstTier)) : [];
  const rest = cands.filter(c => !t0.includes(c));
  return t0.concat(shuffle(rest.filter(c => c.u === unit)), shuffle(rest.filter(c => c.u !== unit)));
}
function takeDistinct(list, keyFn, n, used) {
  const out = [];
  const seen = new Set(used || []);
  for (const it of list) {
    const k = keyFn(it);
    if (seen.has(k)) continue;
    seen.add(k);
    out.push(it);
    if (out.length >= n) break;
  }
  return out;
}

// ───── 문제 풀(pool) 만들기 — 문제의 '틀'만 만들고 보기는 출제 시점에 랜덤 생성
function buildPool(units, types) {
  const P = [];
  if (types.has("cur")) CUR.forEach(c => { if (units.has(c.u)) P.push({ id: c.id, u: c.u, kind: "cur", ref: c }); });
  const ds = DRUGS.filter(d => units.has(d.u));
  if (types.has("mech")) ds.forEach(d => { if (!d.nm) P.push({ id: "am:" + d.n, u: d.u, kind: "mech", ref: d }); });
  if (types.has("rmech")) {
    const groups = new Map();
    ds.forEach(d => {
      if (d.nm) return;
      const k = d.u + "|" + d.m;
      if (!groups.has(k)) groups.set(k, []);
      groups.get(k).push(d);
    });
    for (const [k, arr] of groups) P.push({ id: "ar:" + hash(k), u: arr[0].u, kind: "rmech", ref: arr });
  }
  if (types.has("class")) ds.forEach(d => {
    if (CLASSQ_UNITS.includes(d.u) && !d.nc && classOptions(d).length >= 2) P.push({ id: "ac:" + d.n, u: d.u, kind: "class", ref: d });
  });
  if (types.has("sig")) ds.forEach(d => { if (d.s) P.push({ id: "as:" + d.n, u: d.u, kind: "sig", ref: d }); });
  return P;
}

function classOptions(d) {
  const set = new Set(DRUGS.filter(o => o.u === d.u && !o.nc && o.c !== d.c).map(o => o.c));
  return [...set];
}

// ───── 출제: 실제 보기 생성
// 반환: {stem, options:[{t, info}], correct(index), expl, drug}
function materialize(item) {
  if (item.kind === "cur") {
    const c = item.ref;
    const opts = shuffle([c.a, ...c.d]);
    return { stem: esc(c.q), options: opts.map(t => ({ t })), correct: opts.indexOf(c.a), expl: c.e ? esc(c.e) : "" };
  }
  if (item.kind === "mech") {
    const d = item.ref;
    const cands = DRUGS.filter(o => !o.nm && o.n !== d.n && !shares(o, d) && o.m !== d.m);
    const picks = takeDistinct(tiered(cands, d.u), o => o.m, 4, [d.m]);
    const opts = shuffle([{ t: d.m, drug: d }, ...picks.map(o => ({ t: o.m, drug: o, mechOf: true }))]);
    return {
      stem: `<b class="dn">${esc(d.n)}</b>의 기전은?`,
      options: opts, correct: opts.findIndex(o => o.drug === d), drug: d
    };
  }
  if (item.kind === "rmech") {
    const arr = item.ref;
    const ans = arr[Math.floor(Math.random() * arr.length)];
    const cands = DRUGS.filter(o => !o.nm && !arr.includes(o) && !shares(o, ans) && o.m !== ans.m);
    const picks = takeDistinct(tiered(cands, ans.u), o => o.n, 4, [ans.n]);
    const opts = shuffle([{ t: ans.n, drug: ans }, ...picks.map(o => ({ t: o.n, drug: o }))]);
    return {
      stem: `기전이 <span class="hl">${esc(ans.m)}</span>인 약물은?`,
      options: opts, correct: opts.findIndex(o => o.drug === ans), drug: ans,
      also: arr.length > 1 ? arr.filter(o => o !== ans).map(o => o.n) : null
    };
  }
  if (item.kind === "class") {
    const d = item.ref;
    const others = shuffle(classOptions(d)).slice(0, 4);
    const opts = shuffle([d.c, ...others]).map(t => ({ t, cls: t }));
    return {
      stem: `<b class="dn">${esc(d.n)}</b>의 분류는?`,
      options: opts, correct: opts.findIndex(o => o.t === d.c), drug: d
    };
  }
  if (item.kind === "sig") {
    const d = item.ref;
    const cands = DRUGS.filter(o => o.n !== d.n && !conflict(o, d) && o.s !== d.s);
    const sameClass = shuffle(cands.filter(o => o.c === d.c)).slice(0, 2);
    const rest = tiered(cands.filter(o => !sameClass.includes(o)), d.u);
    const picks = takeDistinct(sameClass.concat(rest), o => o.n, 4, [d.n]);
    const opts = shuffle([{ t: d.n, drug: d }, ...picks.map(o => ({ t: o.n, drug: o }))]);
    return {
      stem: `다음 특징에 해당하는 약물은?<span class="sig">${esc(d.s)}</span>`,
      options: opts, correct: opts.findIndex(o => o.drug === d), drug: d
    };
  }
}

function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

if (typeof module !== "undefined") module.exports = { DRUGS, CUR, buildPool, materialize, UNITS, TYPES, classOptions };
