// ───── 채점 엔진
const SHORT = { hpv: "HPV 백신", vzv: "VZV 발병기전", cmv: "CMV 감염원", exanthem: "소아 발진 질환", paramyxo: "Paramyxo 특징", influenza: "Influenza 특징·증식", rsv: "RSV 연령별 질환" };
const BYID = Object.fromEntries(ESSAYS.map(q => [q.id, q]));

// 공백·문장부호 제거, 소문자화 — 키워드도 같은 방식으로 정규화해서 비교
function norm(s) {
  return String(s || "").toLowerCase()
    .replace(/[−–—]/g, "-")
    .replace(/\s+/g, "")
    .replace(/[.,·•:;'"`!?\[\]{}<>~]/g, "");
}
function hitRubric(item, text) {
  return item.k.every(group => group.some(alt => text.includes(norm(alt))));
}
function gradeText(q, raw) {
  const t = norm(raw);
  return q.rubric.map(r => hitRubric(r, t));
}
function totalW(q) { return q.rubric.reduce((a, r) => a + r.w, 0); }
function scoreOf(q, hits) {
  const got = q.rubric.reduce((a, r, i) => a + (hits[i] ? r.w : 0), 0);
  return Math.round(got / totalW(q) * 100);
}
function toPts(q, s) { return q.pts ? (Math.round(s / 100 * q.pts * 2) / 2).toFixed(1) : null; }
function band(s) { return s >= 80 ? "hi" : s >= 50 ? "mid" : "lo"; }
function rubricHint(r) { return r.k.map(g => g.slice(0, 3).join(" / ")).join(" + "); }

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

if (typeof module !== "undefined") module.exports = { ESSAYS, UNITS, norm, gradeText, scoreOf, toPts };
