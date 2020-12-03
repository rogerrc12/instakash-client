const CACHE_NAME = "version-1";
const urlsToCache = ["index.html", "offline.html"];

// Install SW
this.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache");
      return cache.addAll(urlsToCache);
    })
  );
});

// Listen for requests
this.addEventListener("fetch", (e) => {
  e.respondWith(caches.match(e.request).then(() => fetch(e.request).catch(() => caches.match("offline.html"))));
});

// Activate SW
this.addEventListener("activate", (e) => {
  const cacheWhiteList = [];
  cacheWhiteList.push(CACHE_NAME);

  e.waitUntil(
    caches
      .keys()
      .then((cacheNames) =>
        Promise.all(cacheNames.map((cacheName) => !cacheWhiteList.includes(cacheName) && caches.delete(cacheName)))
      )
  );
});
