import { linkedin_profile_url, getProfileInfo } from '/scripts/linkedin_helpers.js'
import { addProfile } from '/scripts/storage.js'

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function saveProfile() {
    console.log('saveProfile')

    await sleep(2000)
    
    const data = getProfileInfo()

    console.log(data)

    if (data === null) { return null }

    addProfile(data)
}

// handle navigation events
let previousUrl = location.href

function navigationHandler() {
  if ((location.href !== previousUrl) && location.href.startsWith(linkedin_profile_url)) {
    console.log(`navigated: ${location.href}`)
    previousUrl = location.href
    saveProfile()
  }
}


export function main() {
  if (window.location.href.startsWith(linkedin_profile_url)) {
    saveProfile();
  }

  // Observe network requests (when user navigates via link clicks)
  let requestObserver = new PerformanceObserver((_) => { navigationHandler() })
  requestObserver.observe({ type: 'resource' })
}