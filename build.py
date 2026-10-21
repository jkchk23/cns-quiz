"""src/ → 배포 파일 생성.

  pharm/index.html  약리 객관식(박해정) (src/pharm + src/shared)
  cns/index.html    옛 주소 → pharm/ 로 이동
  micro/index.html  미생물 서술형     (src/micro + src/shared)
  index.html        시작 페이지: 마지막으로 연 과목으로 바로 이동
  sw.js, manifest.json  두 앱 공용 (홈 화면 아이콘 하나)
"""
import pathlib, json, datetime

root = pathlib.Path('.')
src = root / 'src'
shared_js = (src / 'shared' / 'hub.js').read_text()
shared_css = (src / 'shared' / 'hub.css').read_text()

APPS = {
    'pharm': ['data_units.js', 'q_cns1.js', 'q_cns2.js', 'q_cns3.js', 'q_lec1.js', 'q_lec2.js', 'q_extra.js', 'engine.js', 'ui.js'],
    'micro': ['data_essay.js', 'engine.js', 'ui.js'],
}

for app, files in APPS.items():
    js = f'const CURRENT_SUBJECT = "{app}";\n' + shared_js + '\n' + '\n'.join((src / app / f).read_text() for f in files)
    html = (src / app / 'template.html').read_text()
    html = html.replace('/*__HUBCSS__*/', shared_css).replace('/*__SCRIPT__*/', js)
    (root / app).mkdir(exist_ok=True)
    (root / app / 'index.html').write_text(html)
    print(app, len(html))

# 옛 CNS 주소 → 약리
(root / 'cns').mkdir(exist_ok=True)
(root / 'cns' / 'index.html').write_text('<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>약리학 객관식</title><script>location.replace("../pharm/")</script><a href="../pharm/">약리학 객관식으로 이동</a>')

# 시작 페이지 — 저장된 마지막 과목으로 즉시 이동 (기본 CNS)
(root / 'index.html').write_text("""<!doctype html>
<html lang="ko">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>약리·미생물 문제</title>
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-title" content="약리·미생물">
<link rel="apple-touch-icon" href="icon-180.png">
<link rel="icon" href="icon-180.png">
<link rel="manifest" href="manifest.json">
<script>
var last = "pharm";
try { var h = JSON.parse(localStorage.getItem("study-hub-v1")); if (h && h.last === "micro") last = "micro"; } catch (e) {}
location.replace(last + "/");
</script>
<style>
body{margin:0;font:17px/1.5 -apple-system,"Apple SD Gothic Neo",system-ui,sans-serif;background:#EEF1F4;color:#16212B;display:grid;place-items:center;min-height:100vh}
@media (prefers-color-scheme:dark){body{background:#14181D;color:#E7ECF0}}
a{display:block;margin:8px 0;padding:14px 22px;border-radius:12px;background:#2848A0;color:#fff;text-decoration:none;text-align:center}
</style>
</head>
<body><main><a href="pharm/">약리학 객관식</a><a href="micro/">미생물 서술형</a></main></body>
</html>
""")

ver = datetime.datetime.now().strftime('%Y%m%d%H%M')
(root / 'sw.js').write_text(f"""const CACHE = 'study-hub-{ver}';
const FILES = ['./', 'index.html', 'pharm/', 'pharm/index.html', 'cns/', 'cns/index.html', 'micro/', 'micro/index.html', 'manifest.json', 'icon-180.png', 'icon-512.png'];
// 설치 시 HTTP 캐시를 건너뛰고 서버에서 새로 받아 저장
self.addEventListener('install', e => {{
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES.map(f => new Request(f, {{ cache: 'reload' }})))));
  self.skipWaiting();
}});
self.addEventListener('activate', e => {{
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
}});
// 화면(HTML)은 네트워크 우선: 온라인이면 항상 최신, 오프라인이면 저장본
// 아이콘 등은 캐시 우선
function fallbackFor(url) {{
  const p = new URL(url).pathname;
  if (p.includes('/micro')) return 'micro/index.html';
  if (p.includes('/pharm') || p.includes('/cns')) return 'pharm/index.html';
  return 'index.html';
}}
self.addEventListener('fetch', e => {{
  const req = e.request;
  if (req.method !== 'GET') return;
  const isPage = req.mode === 'navigate' || req.destination === 'document';
  if (isPage) {{
    e.respondWith(
      fetch(req, {{ cache: 'no-store' }}).then(r => {{
        if (r.ok) {{ const cl = r.clone(); caches.open(CACHE).then(c => c.put(req, cl)); }}
        return r;
      }}).catch(() => caches.match(req, {{ ignoreSearch: true }}).then(h => h || caches.match(fallbackFor(req.url))))
    );
    return;
  }}
  e.respondWith(caches.match(req, {{ ignoreSearch: true }}).then(h => h || fetch(req).then(r => {{
    if (r.ok) {{ const cl = r.clone(); caches.open(CACHE).then(c => c.put(req, cl)); }}
    return r;
  }})));
}});
""")

(root / 'manifest.json').write_text(json.dumps({
    "name": "약리·미생물 문제", "short_name": "약리·미생물", "start_url": "./", "scope": "./", "display": "standalone",
    "background_color": "#EEF1F4", "theme_color": "#EEF1F4", "lang": "ko",
    "icons": [{"src": "icon-180.png", "sizes": "180x180", "type": "image/png"},
              {"src": "icon-512.png", "sizes": "512x512", "type": "image/png", "purpose": "any"}]
}, ensure_ascii=False, indent=1))
print('ok')
