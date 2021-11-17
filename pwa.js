const fs = require('fs');
require('dotenv').config();

const generate_pwa = decodeURIComponent(`'use strict';

/**
 * Service Worker of PWA
 */

const cacheName = 'pwa-0.0.1';
const startPage = '${process.env.URL}/';
const offlinePage = '${process.env.URL}/offline';
const filesToCache = [startPage, offlinePage, '${process.env.URL}/icons/Icon-192.png'];
const neverCacheUrls = [/\\/download/, /preview=true/];

// Install
self.addEventListener('install', function(e) {
    console.log('PWA service worker installation');
    e.waitUntil(
        caches.open(cacheName).then(function(cache) {
            console.log('PWA service worker caching dependencies');
            filesToCache.map(function(url) {
                return cache.add(url).catch(function(reason) {
                    return console.log('PWA: ' + String(reason) + ' ' + url);
                });
            });
        })
    );
});

// Activate
self.addEventListener('activate', function(e) {
    console.log('PWA service worker activation');
    e.waitUntil(
        caches.keys().then(function(keyList) {
            return Promise.all(keyList.map(function(key) {
                if (key !== cacheName) {
                    console.log('PWA old cache removed', key);
                    return caches.delete(key);
                }
            }));
        })
    );
    return self.clients.claim();
});

// Fetch
self.addEventListener('fetch', function(e) {

    // Return if the current request url is in the never cache list
    if (!neverCacheUrls.every(checkNeverCacheList, e.request.url)) {
        console.log('PWA: Current request is excluded from cache.');
        return;
    }

    // Return if request url protocal isn't http or https
    if (!e.request.url.match(/^(http|https):\\/\\//i))
        return;

    // Return if request url is from an external domain.
    if (new URL(e.request.url).origin !== location.origin)
        return;

    // For POST requests, do not use the cache. Serve offline page if offline.
    if (e.request.method !== 'GET') {
        e.respondWith(
            fetch(e.request).catch(function() {
                return caches.match(offlinePage);
            })
        );
        return;
    }

    // Revving strategy
    if (e.request.mode === 'navigate' && navigator.onLine) {
        e.respondWith(
            fetch(e.request).then(function(response) {
                return caches.open(cacheName).then(function(cache) {
                    cache.put(e.request, response.clone());
                    return response;
                });
            })
        );
        return;
    }

    e.respondWith(
        caches.match(e.request).then(function(response) {
            return response || fetch(e.request).then(function(response) {
                return caches.open(cacheName).then(function(cache) {
                    cache.put(e.request, response.clone());
                    return response;
                });
            });
        }).catch(function() {
            return caches.match(offlinePage);
        })
    );
});

// Check if current url is in the neverCacheUrls list
function checkNeverCacheList(url) {
    if (this.match(url)) {
        return false;
    }
    return true;
};`)

fs.writeFile("./public/sw.js", generate_pwa,
  {
    encoding: "utf8",
    flag: "w",
    mode: 0o666
  },
  (err) => {
    if (err)
      console.log(err);
    else {
      console.log("File written successfully\n");
      console.log("The written has the following contents:");
    }
});