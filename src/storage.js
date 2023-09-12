export async function addProfile(data) {
  let result = await chrome.storage.local.get('profiles')
  let profiles = result.profiles

  if (profiles === undefined) {
    profiles = [data]
  } else {
    if (profiles.filter((p) => p.linkedin_id === data.linkedin_id).length > 0) {
      profiles = profiles.map(p => p.linkedin_id === data.linkedin_id ? data : p);
    } else {
      profiles.push(data)
    }
  }

  // TODO: order list by recency

  chrome.storage.local.set({ profiles: profiles })
}

export async function searchProfiles(q) {
  let result = await chrome.storage.local.get('profiles')
  let profiles = result.profiles

  return profiles.filter((p) => p.search_string.includes(q.toLowerCase()))
}


export async function getRecents() {
  let result = await chrome.storage.local.get('profiles')
  let profiles = result.profiles

  return profiles.slice(-10).reverse();
}
