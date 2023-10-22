# [LinkedIn Recents](https://chrome.google.com/webstore/detail/linkedin-recents/bcfkipkjopehjmgikgmnjamdhkhgkfec)
A simple Chrome extension for quickly accessing your most-visited LinkedIn connections.

## Quickstart
```
npm install
npm run build
```  

[Load the extension](https://developer.chrome.com/docs/extensions/mv3/getstarted/development-basics/#load-unpacked) from the `dist` directory

The extension is built with Svelte and uses the [CRXJS Vite plugin](https://crxjs.dev/vite-plugin) to build the exension from source.

Do not run the Vite dev server - CRXJS will force page reloads with every save, and if you have multiple LinkedIn pages open during development, LinkedIn will flag your account for bot activity.