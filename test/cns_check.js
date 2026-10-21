// CNS: 모든 문항에서 보기 중복·정답 누락이 없는지 확인
const fs = require('fs');
const src = ['data_drugs.js','data_curated.js','engine.js'].map(f => fs.readFileSync('src/cns/' + f, 'utf8')).join('\n');
const mod = { exports: {} }; new Function('module', src)(mod); const E = mod.exports;
const units = new Set(Object.keys(E.UNITS).map(Number));
const types = new Set(Object.keys(E.TYPES));
const pool = E.buildPool(units, types);
const byKind = {}; pool.forEach(p => byKind[p.kind] = (byKind[p.kind]||0)+1);
console.log('pool', pool.length, byKind, 'drugs', E.DRUGS.length, 'curated', E.CUR.length);
const ids = new Set(); pool.forEach(p=>{ if(ids.has(p.id)) console.log('DUP ID', p.id); ids.add(p.id); });
let issues = 0; const optCount = {};
for (const it of pool) for (let k=0;k<40;k++) {
  const m = E.materialize(it);
  const texts = m.options.map(o=>o.t);
  if (new Set(texts).size !== texts.length) { issues++; console.log('dup opt', it.id, texts); break; }
  if (m.correct < 0 || m.correct >= texts.length) { issues++; console.log('bad correct', it.id); break; }
  if (texts.some(t=>!t)) { issues++; console.log('empty', it.id); break; }
  optCount[it.kind+':'+texts.length] = (optCount[it.kind+':'+texts.length]||0)+1;
}
console.log('issues', issues, optCount);
if (issues) process.exit(1);
// curated per unit
const cu={}; E.CUR.forEach(c=>cu[c.u]=(cu[c.u]||0)+1); console.log('curated/unit', cu);
// curated: distractor count
E.CUR.forEach(c=>{ if(c.d.length!==4) console.log('cur d!=4', c.q); if(c.d.includes(c.a)) console.log('ans in d', c.q); });
// drugs with x referencing unknown names
const names=new Set(E.DRUGS.map(d=>d.n)); E.DRUGS.forEach(d=>d.x.forEach(x=>{if(!names.has(x))console.log('unknown x',d.n,x)}));
// duplicate names
const seen=new Set(); E.DRUGS.forEach(d=>{if(seen.has(d.n))console.log('dup drug',d.n);seen.add(d.n)});
// class question option counts
E.DRUGS.filter(d=>[1,4,5,6,7,8,9,10].includes(d.u)&&!d.nc).forEach(d=>{const n=E.classOptions(d).length; if(n<4) console.log('class opts <4', d.n, d.u, n)});
