export const linkedin_profile_url = 'https://www.linkedin.com/in/';
export const linkedin_company_url = 'https://www.linkedin.com/company/';

// Grabs the linkedin id from a profile url
// https://www.linkedin.com/in/someguy -> someguy
function getLinkedinId(url) {
  return url.split('/')[4]
}

export function getProfileInfo() {
  if (location.href.startsWith(linkedin_profile_url)) {
    return getUserInfo()
  } else if (location.href.startsWith(linkedin_company_url)) {
    return getCompanyInfo()
  }
}

function getUserInfo() {
  const profileEl = document.querySelector('[data-member-id]')

  if (!profileEl) {
    return null
  }

  // console.log(profileEl)

  const photo_url = getPhotoUrl(profileEl) //profileEl.querySelector('.pv-top-card-profile-picture__image--show')?.src
  // console.log(photo_url)

  const name = profileEl.querySelector('h1').innerText
  const linkedin_id = getLinkedinId(location.href)

  return {
    type: 'in',
    linkedin_id: linkedin_id,
    name: name,
    photo_url: photo_url,
    degree: profileEl.querySelector('.dist-value')?.innerText || '',
    headline: profileEl.querySelector('div.text-body-medium.break-words')?.innerText || '',
    visited_at: Date.now(),
    search_string: `${name.toLowerCase()} ${linkedin_id}`,
    linkedin_url: location.href.split('/').slice(0,5).join('/')
  }
}

function getPhotoUrl(profileEl) {
  const images = profileEl.querySelectorAll('img')
  // console.log(images.length)

  if (images.length == 1) {
    return images[0]?.src
  } else if (images.length >= 2) {
    return images[1]?.src
  } else {
    return undefined
  }
}

function getCompanyInfo() {
  const profileEl = document.querySelector('div.org-top-card__primary-content')

  if (!profileEl) {
    return null
  }

  const name = profileEl.querySelector('.org-top-card-summary__title')?.title
  const linkedin_id = getLinkedinId(location.href)

  return {
    type: 'company',
    linkedin_id: linkedin_id,
    name: name,
    photo_url: profileEl.querySelector('.org-top-card-primary-content__logo-container img')?.src,
    headline: profileEl.querySelector('.org-top-card-summary__tagline')?.innerText || '',
    visited_at: Date.now(),
    search_string: `${name.toLowerCase()} ${linkedin_id}`,
    linkedin_url: location.href.split('/').slice(0,5).join('/')
  }
}
