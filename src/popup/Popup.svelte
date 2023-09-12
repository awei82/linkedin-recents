<script>
  import './popup.css'
  import ProfileList from './lib/ProfileList.svelte';
  import { searchProfiles, getRecents } from '/src/storage.js'

  let profiles
  getRecents().then(result => profiles = result)

  // console.log(profiles)

  // getRecents().then(profiles => {
  //   const template = document.getElementById('li_template');
  //   const elements = new Set();
  //   for (const profile of profiles) {
  //     console.log(profile)
  //     const element = template.content.firstElementChild.cloneNode(true);

  //     element.querySelector('.name').textContent = profile.name;
  //     element.querySelector('.headline').textContent = profile.headline;
  //     element.querySelector('a').href = `https://www.linkedin.com/in/${profile.linkedin_id}`
  //     element.querySelector('a').addEventListener("click", async () => {
  //       // await chrome.tabs.create({url: `https://www.linkedin.com/in/${profile.linkedin_id}`})
  //       // need to focus window as well as the active tab
  //       await chrome.tabs.update({url: `https://www.linkedin.com/in/${profile.linkedin_id}`})
  //     });
      
  //     element.querySelector('img').src = profile.photo_url
  //     elements.add(element);
  //   }
  //   document.querySelector('ul').append(...elements);
  // })

</script>

<main>
  <!-- <template id="li_template">
    <li>
      <a href="#" style="display: flex">
        <img style="width:32px;height:32px;">
        <div>
          <h3 class="name">Name</h3>
          <p class="headline truncated" style="width:250px">Headline</p>
        </div>
      </a>
    </li>
  </template> -->

  <h1>Recent profiles</h1>
  <!-- <ul></ul> -->

  <!-- <script src="./popup.js" type="module"></script> -->
  <ProfileList {profiles} />
</main>

<style>

</style>
