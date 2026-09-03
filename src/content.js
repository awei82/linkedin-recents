// LinkedIn uses client-side navigation, so URL changes do not indicate that a
// profile has finished rendering. DOM mutations trigger navigation checks, and
// each save waits up to 15 seconds for the target profile's name to appear. If
// the URL changes while waiting, the pending save is discarded.

import { linkedin_profile_url, linkedin_company_url, getProfileInfo } from './linkedin_helpers.js'
import * as Storage from './storage.js'

const PROFILE_TIMEOUT_MS = 15_000

function getProfileReadiness(url) {
  if (url.startsWith(linkedin_profile_url)) {
    return () => document.querySelector('div[componentKey^="com.linkedin.sdui.profile.card"] h2')?.innerText.trim()
  }

  if (url.startsWith(linkedin_company_url)) {
    return () => document.querySelector('div.org-top-card__primary-content .org-top-card-summary__title')?.title.trim()
  }

  return null
}

function waitForProfile(readinessCheck, timeoutMs = PROFILE_TIMEOUT_MS) {
  return new Promise((resolve) => {
    if (readinessCheck()) {
      resolve(true)
      return
    }

    const observer = new MutationObserver(() => {
      if (readinessCheck()) {
        observer.disconnect()
        clearTimeout(timeout)
        resolve(true)
      }
    })

    observer.observe(document.documentElement, {
      childList: true,
      subtree: true
    })

    const timeout = setTimeout(() => {
      observer.disconnect()
      resolve(false)
    }, timeoutMs)
  })
}

async function saveProfile(targetUrl = location.href) {
  // console.log(`saveProfile: ${targetUrl}`)
  const readinessCheck = getProfileReadiness(targetUrl)
  if (!readinessCheck) return

  const isReady = await waitForProfile(readinessCheck)

  // console.log(`saveProfile: isReady=${isReady}`)

  // The user may have navigated elsewhere while the profile was loading.
  if (!isReady || location.href !== targetUrl) return

  const data = getProfileInfo()
  if (!data) return

  await Storage.insert(data)
}

let previousUrl = location.href
let navigationTimer

function navigationHandler() {
  if (location.href === previousUrl) return

  previousUrl = location.href
  const targetUrl = location.href

  clearTimeout(navigationTimer)
  navigationTimer = setTimeout(() => {
    saveProfile(targetUrl)
  }, 100)
}

saveProfile(location.href)

// LinkedIn is an SPA, so watch DOM updates for URL changes instead of
// treating individual resource requests as completed navigation.
const navigationObserver = new MutationObserver(navigationHandler)
navigationObserver.observe(document.documentElement, {
  childList: true,
  subtree: true
})
