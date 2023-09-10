import { searchProfiles, getRecents } from '/scripts/storage.js'

let profiles = await getRecents()

console.log(profiles)


const template = document.getElementById('li_template');
const elements = new Set();
for (const profile of profiles) {
  const element = template.content.firstElementChild.cloneNode(true);

  element.querySelector('.name').textContent = profile.name;
  element.querySelector('a').href = `https://www.linkedin.com/in/${profile.linkedin_id}`
  element.querySelector('a').addEventListener("click", async () => {
    // await chrome.tabs.create({url: `https://www.linkedin.com/in/${profile.linkedin_id}`})
    // need to focus window as well as the active tab
    await chrome.tabs.update({url: `https://www.linkedin.com/in/${profile.linkedin_id}`})
  });
  
  element.querySelector('img').src = profile.photo_url
  elements.add(element);
}
document.querySelector('ul').append(...elements);
