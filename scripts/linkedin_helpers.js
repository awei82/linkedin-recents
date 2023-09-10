export const linkedin_profile_url = 'https://www.linkedin.com/in/';

// Grabs the linkedin id from a profile url
// https://www.linkedin.com/in/someguy -> someguy
function getLinkedinId(url) {
  return url.split('/')[4]
}

export function getProfileInfo() {
  let profileEl = document.querySelector('[data-member-id]')

  if (profileEl === null) {
    return null
  }

  let photo_url = profileEl.querySelector('.pv-top-card-profile-picture').querySelector('img').src
  let name = document.querySelector('[data-member-id] h1').innerText
  let linkedin_id = getLinkedinId(location.href)

  return {
    linkedin_id: linkedin_id,
    name: name,
    photo_url: photo_url,
    degree: profileEl.querySelector('.dist-value')?.innerText,
    headline: profileEl.querySelector('.pv-text-details__left-panel .text-body-medium').innerText,
    visited_at: Date.now(),
    search_string: `${name.toLowerCase()} ${linkedin_id}`
  }
}

