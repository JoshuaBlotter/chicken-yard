/* Service worker so the Barnyard toys run fully offline once opened (or
   installed to the home screen) at least once.
   - HTML pages load NETWORK-FIRST, so UI updates show up on the next launch
     when online, and fall back to cache when offline.
   - Static assets (icons, manifest) stay CACHE-FIRST for speed.
   Bump CACHE whenever assets change so old caches are cleared on update. */
const CACHE = "barnyard-v4";
const ASSETS = [
  "./",
  "./index.html",
  "./chicken-yard.html",
  "./duck-pond.html",
  "./garden.html",
  "./manifest.webmanifest",
  "./icon-192.png",
  "./icon-512.png",
  "./apple-touch-icon.png",
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

function cachePut(req, res) {
  // cache same-origin successful responses for next time
  if (res.ok && new URL(req.url).origin === location.origin) {
    const copy = res.clone();
    caches.open(CACHE).then(c => c.put(req, copy));
  }
  return res;
}

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const isHTML = req.mode === "navigate" ||
    (req.headers.get("accept") || "").includes("text/html");

  if (isHTML) {
    // network-first: always try for the freshest page, fall back to cache offline
    e.respondWith(
      fetch(req).then(res => cachePut(req, res))
        .catch(() => caches.match(req).then(hit => hit || caches.match("./index.html")))
    );
    return;
  }
  // cache-first for everything else (icons, manifest, images)
  e.respondWith(
    caches.match(req).then(hit =>
      hit || fetch(req).then(res => cachePut(req, res)).catch(() => hit)
    )
  );
});
