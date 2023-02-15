
//Assets we want to cache immediately
const cacheAssets = [
    '/offline',
 
    
    //js files
    '/js/HTTPClient.js',
    '/js/admin.js',
    '/js/coach.js',
    '/js/common.js',
    '/js/APIClient.js',
    '/js/createuser.js',
    '/js/injuries.js',
    '/js/login.js',
    '/js/matchups.js',
    '/js/player.js',
    '/js/PopulateInjuries.js',
    '/js/PopulatePlayers.js',
    '/js/team.js',

    //css
    '/css/cards.css',
    '/css/admin.css',
    '/css/offline.css',
    '/css/createuser.css',
    '/css/injuries.css',
    '/css/login.css',
    '/css/player.css',
    '/css/styles.css',

    //Images
    '/img/logo.png'
    
];

function log(...data) {
    console.log("RedkicksSW_v1: ", ...data);
  }
  
  log("script executing");
  
  
  const STATIC_CACHE_NAME = 'Redkicks_v2';
  
  self.addEventListener('install', event => {
    log('install', event);
    event.waitUntil(
      caches.open(STATIC_CACHE_NAME).then(cache => {
        return cache.addAll(cacheAssets);
      })
    );
  });
  
  self.addEventListener('activate', event => {
    openDB();
    log('activate', event);
    event.waitUntil(
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.filter(cacheName => {
            return cacheName.startsWith('Redkicks_') && cacheName != STATIC_CACHE_NAME;
          }).map(cacheName => {
            return caches.delete(cacheName);
          })
        );
      })
    );
  });
  
  //handle fetch requests
  self.addEventListener('fetch', event => {
    //get URL
    var requestUrl = new URL(event.request.url);
       //Only intercept (and cache) GET API requests
      if(event.request.method === "GET") {       
        event.respondWith(
          cacheFirst(event.request)
        );
      } 
  });
  
//First try to fetch the requ\st, if fails then try to retrieve a cached page, if fails go to offline page
  function cacheFirst(request) {
    return fetchAndCache(request).catch(error => {
        return caches.match(request).then(response => {
            
            if (response) {
                return response
            }
            else {
                return caches.match('/offline');

            }


        })
       
         
      
    })
    
  }
  
  
  
  function fetchAndCache(request) {
    return fetch(request).then(response => {
      if(response.ok) {
        caches.open(STATIC_CACHE_NAME).then((cache) => {
          cache.put(request, response);
        });
      }
    
      return response.clone();
    });
  }
  
  
  
  self.addEventListener('message', event => {
    log('message', event.data);
    if(event.data.action === 'skipWaiting') {
      self.skipWaiting();
    }
  });


  const openDB = (callback) => {
    let req = indexedDB.open('colorDB', version);
    req.onerror = (err) => {
      //could not open db
      console.warn(err);
      DB = null;
    };
    req.onupgradeneeded = (ev) => {
      let db = ev.target.result;
      if (!db.objectStoreNames.contains('colorStore')) {
        db.createObjectStore('colorStore', {
          keyPath: 'id',
        });
      }
    };
    req.onsuccess = (ev) => {
      DB = ev.target.result;
      console.log('db opened and upgraded as needed');
      if (callback) {
        callback();
      }
    };
  };
  