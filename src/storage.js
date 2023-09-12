export async function insert(data) {
  let result = await chrome.storage.local.get('profiles')
  let profiles = result.profiles

  if (profiles === undefined) {
    profiles = [data]
  } else {
    // Remove the old profile if found (it'll be replace with the new record at the front)
    const idx = profiles.map(p => p.linkedin_id).indexOf(data.linkedin_id)
    if (idx >= 0) {
      profiles.splice(idx, 1)
    }

    profiles.unshift(data)
  }

  chrome.storage.local.set({ profiles: profiles.slice(0, 10000) })
}

export async function search(q) {
  let result = await chrome.storage.local.get('profiles')
  let profiles = result.profiles

  return profiles.filter((p) => p.search_string.includes(q.toLowerCase())).slice(0, 10)
}


export async function recent() {
  let result = await chrome.storage.local.get('profiles')
  return result.profiles.slice(0, 10)
}
