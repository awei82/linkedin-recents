
console.log('test')
console.log(window.location.href)

const linkedin_profile = 'https://linkedin.com/in/';

if (window.location.href.startsWith(linkedin_profile)) {
  key = getLinkedinId(window.location.href)
  /*
    Data to get:
    time/date
    name
    title
    degree
  */
   chrome.storage.local.set({ [key]: value }).then(() => {
    console.log("Value is set");
  });
  
  chrome.storage.local.get([key]).then((result) => {
    console.log("Value currently is " + result.key);
  });

  indexedDBExample()
}

function getLinkedinId(url) {
  return url.split('/')[4]
}

function userDetails() {
  return document.getElementsByClassName('pv-text-details__left-panel')[0]
}

function indexedDBExample() {
  let db;
  const DBOpenRequest = indexedDB.open("MyTestDatabase");
  DBOpenRequest.onerror = (event) => {
    console.error("Why didn't you allow my web app to use IndexedDB?!");
  };
  DBOpenRequest.onsuccess = (event) => {
    db = event.target.result;
  };
  DBOpenRequest.onupgradeneeded = (event) => {
    db = event.target.result;

    // Create an objectStore for this database
    const objectStore = db.createObjectStore('profiles', { keyPath: 'linkedin_id' });

    // Define what data items the objectStore will contain
    objectStore.createIndex('visited_at', 'visited_at', { unique: false });
    objectStore.createIndex('name', 'name', { unique: false });
    objectStore.createIndex('headline', 'headline', { unique: false });
    objectStore.createIndex('photo_url', 'photo_url', { unique: false });
  };

  
}