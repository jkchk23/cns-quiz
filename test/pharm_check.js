// 약리: 문항 구조 검사 + 모든 문항을 여러 번 섞어 정답 위치가 맞는지 확인
const fs = require('fs');
const files = ['data_units.js','q_cns1.js','q_cns2.js','q_cns3.js','q_lec1.js','q_lec2.js','q_extra.js','engine.js'];
const src = files.map(f => fs.readFileSync('src/pharm/' + f, 'utf8')).join('\n');
const mod = { exports: {} }; new Function('module', src)(mod);
const { ITEMS, UNITS, TAGS, materialize, isRight } = mod.exports;
let bad = 0; const ids = new Set(); const perUnit = {}, perTag = {};
for (const it of ITEMS) {
  const where = it.u + ' ' + it.q.slice(0, 40);
  if (!UNITS[it.u]) { bad++; console.log('단원 없음', where); }
  if (ids.has(it.id)) { bad++; console.log('중복 문항', where); } ids.add(it.id);
  if (it.o.length !== 5) { bad++; console.log('선지 5개 아님', where); }
  if (it.n.length !== 5) { bad++; console.log('메모 5개 아님', where); }
  if (new Set(it.o).size !== 5) { bad++; console.log('선지 중복', where); }
  if (!it.a.length || it.a.some(a => a < 0 || a > 4)) { bad++; console.log('정답 범위', where); }
  if (it.multi && !/모두/.test(it.q)) { bad++; console.log('복수정답인데 문제에 "모두" 없음', where); }
  if (!it.multi && /모두 고르/.test(it.q)) { bad++; console.log('"모두 고르시오"인데 단일정답', where); }
  if (!it.e) { bad++; console.log('해설 없음', where); }
  it.tags.forEach(t => { if (!TAGS[t]) { bad++; console.log('모르는 태그', t, where); } perTag[t] = (perTag[t] || 0) + 1; });
  perUnit[it.u] = (perUnit[it.u] || 0) + 1;
  for (let k = 0; k < 20; k++) {
    const m = materialize(it);
    const want = new Set(it.a.map(i => it.o[i]));
    const got = new Set(m.correct.map(i => m.opts[i].t));
    if ([...want].some(x => !got.has(x)) || want.size !== got.size || !isRight(m, new Set(m.correct))) { bad++; console.log('섞기 오류', where); break; }
  }
}
console.log('문항', ITEMS.length, perUnit, perTag);
if (bad) { console.error('검증 실패', bad); process.exit(1); }
console.log('ok');
