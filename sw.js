const CACHE = 'study-hub-202610212344';
const FILES = ['./', 'index.html', 'pharm/', 'pharm/index.html', 'cns/', 'cns/index.html', 'micro/', 'micro/index.html', 'manifest.json', 'icon-180.png', 'icon-512.png'];
// 설치 시 HTTP 캐시를 건너뛰고 서버에서 새로 받아 저장
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES.map(f => new Request(f, { cache: 'reload' })))));
  self.skipWaiting();
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
// 화면(HTML)은 네트워크 우선: 온라인이면 항상 최신, 오프라인이면 저장본
// 아이콘 등은 캐시 우선
function fallbackFor(url) {
  const p = new URL(url).pathname;
  if (p.includes('/micro')) return 'micro/index.html';
  if (p.includes('/pharm') || p.includes('/cns')) return 'pharm/index.html';
  return 'index.html';
}
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const isPage = req.mode === 'navigate' || req.destination === 'document';
  if (isPage) {
    e.respondWith(
      fetch(req, { cache: 'no-store' }).then(r => {
        if (r.ok) { const cl = r.clone(); caches.open(CACHE).then(c => c.put(req, cl)); }
        return r;
      }).catch(() => caches.match(req, { ignoreSearch: true }).then(h => h || caches.match(fallbackFor(req.url))))
    );
    return;
  }
  e.respondWith(caches.match(req, { ignoreSearch: true }).then(h => h || fetch(req).then(r => {
    if (r.ok) { const cl = r.clone(); caches.open(CACHE).then(c => c.put(req, cl)); }
    return r;
  })));
});
