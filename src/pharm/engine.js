// ───── 문항 정리
function hash(s) {
  let h = 5381;
  for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) | 0;
  return (h >>> 0).toString(36);
}
const ITEMS = Q.map(r => {
  const multi = Array.isArray(r[4]);
  const ans = (multi ? r[4] : [r[4]]).map(n => n - 1);
  const tags = r[1].split(/\s+/).filter(Boolean).filter(t => t !== "모두");
  if (multi) tags.push("모두");
  return { id: "p:" + hash(r[0] + "|" + r[2]), u: r[0], tags, multi, q: r[2], o: r[3], a: ans, e: r[5] || "", n: r[6] || [] };
});
const BYID = Object.fromEntries(ITEMS.map(it => [it.id, it]));

function shuffle(a) {
  a = a.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

// 단원·유형 필터. 유형을 하나도 고르지 않으면 전체
function poolOf(units, tags) {
  return ITEMS.filter(it => units.has(it.u) && (!tags.size || it.tags.some(t => tags.has(t))));
}

// 출제: 선지 순서를 섞고 정답 위치를 다시 계산
function materialize(it) {
  const order = shuffle([0, 1, 2, 3, 4]);
  return {
    it,
    opts: order.map(k => ({ t: it.o[k], note: it.n[k] || "", ok: it.a.includes(k) })),
    correct: order.map((k, i) => (it.a.includes(k) ? i : -1)).filter(i => i >= 0)
  };
}
function isRight(m, chosen) {
  const c = [...chosen].sort().join(",");
  return c === m.correct.slice().sort().join(",");
}

if (typeof module !== "undefined") module.exports = { ITEMS, UNITS, UNIT_GROUPS, TAGS, poolOf, materialize, isRight };
