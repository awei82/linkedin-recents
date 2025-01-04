export async function insert(data) {
  const result = await chrome.storage.local.get('profiles')
  let profiles = result.profiles

  if (profiles === undefined) {
    profiles = [data]
  } else {
    // Remove the old profile if found (it'll be replaced with the new record at the front)
    const idx = profiles.map(p => p.linkedin_id).indexOf(data.linkedin_id)
    if (idx >= 0) {
      profiles.splice(idx, 1)
    }

    profiles.unshift(data)
  }

  chrome.storage.local.set({ profiles: profiles.slice(0, 9999) })
}

export async function search(q) {
  const result = await chrome.storage.local.get('profiles')

  if (result.profiles === undefined) return;

  return result.profiles.filter(p => p.search_string.includes(q.toLowerCase())).slice(0, 10)
}

/**
 * Returns the 10 most recently viewed profiles.
 */
export async function recent() {
  const result = await chrome.storage.local.get('profiles')

  if (result.profiles === undefined) return [];

  return result.profiles.slice(0, 10)
}

export async function remove(data) {
  const result = await chrome.storage.local.get('profiles')
  const profiles = result.profiles

  if (result.profiles === undefined) return;

  chrome.storage.local.set({ profiles: profiles.filter(p => p.linkedin_id !== data.linkedin_id) })
}

export async function clear() {
  await chrome.storage.local.clear()
}
