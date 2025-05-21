# [LinkedIn Searchbar](https://chromewebstore.google.com/detail/linkedin-searchbar/cdpcbmkmbimiadfdeckebnaendhadjhm)
A simple Chrome extension for quickly accessing your most-visited LinkedIn connections.

![lr](https://github.com/awei82/linkedin-recents/assets/1923128/b65093da-e626-4870-93d4-46f4e5b692be)

## Quickstart
```
npm install
npm run build
```  

[Load the extension](https://developer.chrome.com/docs/extensions/mv3/getstarted/development-basics/#load-unpacked) from the `dist` directory

The extension is built with Svelte and uses the [CRXJS Vite plugin](https://crxjs.dev/vite-plugin) to build the exension from source.

Do not run the Vite dev server - CRXJS will force page reloads with every save, and if you have multiple LinkedIn pages open during development, LinkedIn will flag your account for bot activity.
