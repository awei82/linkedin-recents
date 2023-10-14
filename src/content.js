import { linkedin_profile_url, linkedin_company_url, getProfileInfo } from './linkedin_helpers.js'
import * as Storage from './storage.js'

async function saveProfile() {
  if (location.href.startsWith(linkedin_profile_url) || location.href.startsWith(linkedin_company_url)) {
    // console.log('saveProfile')
  
    const data = getProfileInfo()
    // console.log(data)

    if (data === null) return null

    Storage.insert(data)
  }
}

// handle navigation events
let previousUrl = location.href

function navigationHandler() {
  if ((location.href !== previousUrl)) {
    // console.log(`navigated: ${location.href}`)
    previousUrl = location.href
    saveProfile()
  }
}

saveProfile();

// Observe network requests (when user navigates via link clicks)
let requestObserver = new PerformanceObserver((_) => { navigationHandler() })
requestObserver.observe({ type: 'resource' })
