const CACHE_PREFIX = "stellar-atlas-";
const CACHE_VERSION = "2026-07-12-v2";
const STATIC_CACHE = `${CACHE_PREFIX}${CACHE_VERSION}`;

const CORE_ASSETS = [
  "./",
  "./index.html",
  "./atlas.html",
  "./observe.html",
  "./stories.html",
  "./404.html",
  "./styles.css",
  "./site.webmanifest",
  "./assets/mark.svg",
  "./assets/icon-192.png",
  "./assets/icon-512.png",
  "./assets/social-preview.png",
  "./assets/vendor/d3-7.9.0.min.js",
  "./assets/vendor/astronomy-engine-2.1.19.min.js",
  "./data/constellations.js",
  "./data/observing-data.js",
  "./data/sky-atlas.js",
  "./data/story-topics.js",
  "./data/story-topics-extra.js",
  "./sky-map.js",
  "./observing.js",
  "./story-library.js",
  "./app.js"
];

const STATIC_DESTINATIONS = new Set([
  "audio",
  "font",
  "image",
  "manifest",
  "script",
  "style",
  "video",
  "worker"
]);

const STATIC_EXTENSIONS = /\.(?:avif|css|gif|ico|jpe?g|js|json|mjs|png|svg|webmanifest|webp|woff2?|xml)$/i;

function scopeUrl(relativePath) {
  return new URL(relativePath, self.registration.scope).toString();
}

function isOpenMeteoRequest(url) {
  return url.hostname === "open-meteo.com" || url.hostname.endsWith(".open-meteo.com");
}

function isCacheable(response) {
  return response
    && response.status === 200
    && (response.type === "basic" || response.type === "default");
}

async function networkFirst(request) {
  const cache = await caches.open(STATIC_CACHE);

  try {
    const response = await fetch(request);
    if (isCacheable(response)) {
      await cache.put(request, response.clone());
    }
    return response;
  } catch {
    const cachedResponse = await cache.match(request, { ignoreSearch: true });
    if (cachedResponse) return cachedResponse;

    return (await cache.match(scopeUrl("./index.html")))
      || (await cache.match(scopeUrl("./404.html")))
      || Response.error();
  }
}

function staleWhileRevalidate(request, event) {
  const cachePromise = caches.open(STATIC_CACHE);
  const networkUpdate = cachePromise
    .then(async (cache) => {
      const response = await fetch(request);
      if (isCacheable(response)) {
        await cache.put(request, response.clone());
      }
      return response;
    })
    .catch(() => null);

  event.waitUntil(networkUpdate);

  return cachePromise.then(async (cache) => {
    const cachedResponse = await cache.match(request, { ignoreSearch: true });
    return cachedResponse || (await networkUpdate) || Response.error();
  });
}

self.addEventListener("install", (event) => {
  const requests = CORE_ASSETS.map((asset) => new Request(scopeUrl(asset), { cache: "reload" }));
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => cache.addAll(requests))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys
          .filter((key) => key.startsWith(CACHE_PREFIX) && key !== STATIC_CACHE)
          .map((key) => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (isOpenMeteoRequest(url)) return;
  if (url.origin !== self.location.origin) return;

  const acceptsHtml = request.headers.get("accept")?.includes("text/html");
  if (request.mode === "navigate" || request.destination === "document" || acceptsHtml) {
    event.respondWith(networkFirst(request));
    return;
  }

  if (STATIC_DESTINATIONS.has(request.destination) || STATIC_EXTENSIONS.test(url.pathname)) {
    event.respondWith(staleWhileRevalidate(request, event));
  }
});
