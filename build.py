import pathlib, json, datetime
src = pathlib.Path('src'); out = pathlib.Path('.')
js = "\n".join((src/f).read_text() for f in ['data_drugs.js','data_curated.js','engine.js','ui.js'])
html = (src/'template.html').read_text().replace('/*__SCRIPT__*/', js)
(out/'index.html').write_text(html)
ver = datetime.datetime.now().strftime('%Y%m%d%H%M')
(out/'sw.js').write_text(f"""const CACHE = 'cns-quiz-{ver}';
const FILES = ['./', 'index.html', 'manifest.json', 'icon-180.png', 'icon-512.png'];
self.addEventListener('install', e => {{ e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES))); self.skipWaiting(); }});
self.addEventListener('activate', e => {{ e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))); self.clients.claim(); }});
// 캐시 우선 + 백그라운드 갱신: 오프라인에서도 열리고, 온라인이면 다음 실행 때 새 버전 반영
self.addEventListener('fetch', e => {{
  if (e.request.method !== 'GET') return;
  e.respondWith(caches.open(CACHE).then(async c => {{
    const hit = await c.match(e.request, {{ ignoreSearch: true }});
    const net = fetch(e.request).then(r => {{ if (r.ok) c.put(e.request, r.clone()); return r; }}).catch(() => hit);
    return hit || net;
  }}));
}});
""")
(out/'manifest.json').write_text(json.dumps({
 "name":"CNS 약물 퀴즈","short_name":"CNS 퀴즈","start_url":"./","scope":"./","display":"standalone",
 "background_color":"#EEF1F4","theme_color":"#EEF1F4","lang":"ko",
 "icons":[{"src":"icon-180.png","sizes":"180x180","type":"image/png"},{"src":"icon-512.png","sizes":"512x512","type":"image/png","purpose":"any"}]
}, ensure_ascii=False, indent=1))
print('ok', len(html))
