import { linkedin_profile_url, getProfileInfo } from 'src/linkedin_helpers.js'
import { addProfile } from 'src/storage.js'

async function saveProfile() {
  console.log('saveProfile')
  
  const data = getProfileInfo()
  console.log(data)

  if (data === null) { return null }

  addProfile(data)
}

// handle navigation events
let previousUrl = location.href

function navigationHandler() {
  if ((location.href !== previousUrl)) {
    console.log(`navigated: ${location.href}`)
    previousUrl = location.href
    saveProfile()
  }
}

saveProfile();

// Observe network requests (when user navigates via link clicks)
let requestObserver = new PerformanceObserver((_) => { navigationHandler() })
requestObserver.observe({ type: 'resource' })
