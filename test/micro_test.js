// 미생물: 모범답안을 넣으면 100점, 엉뚱한 답은 0점이 나오는지 확인
const fs = require("fs");
const src = ["data_essay.js", "engine.js"].map(f => fs.readFileSync("src/micro/" + f, "utf8")).join("\n");
const m = {}; new Function("module", src)(m);
const { ESSAYS, gradeText, scoreOf } = m.exports;
let bad = 0;
for (const q of ESSAYS) {
  const full = scoreOf(q, gradeText(q, q.model.replace(/<[^>]+>/g, " ")));
  const none = scoreOf(q, gradeText(q, "잘 모르겠습니다. 바이러스입니다."));
  const ids = new Set(); if (ids.has(q.id)) bad++; ids.add(q.id);
  console.log(q.id.padEnd(10), "모범답안", full, "· 빈 답", none);
  if (full !== 100 || none !== 0) bad++;
}
if (bad) { console.error("검증 실패", bad); process.exit(1); }
console.log("ok", ESSAYS.length, "문항");
