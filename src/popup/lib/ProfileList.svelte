<script>
  export let profiles = []

  function updateTab(url) {
    chrome.tabs.update({url: url})
    window.close();
  }
</script>

<ul id="profile-list">
  {#each profiles as profile}
    <li>
      <a id={profile.linkedin_id} href="https://www.linkedin.com/in/{profile.linkedin_id}" style="display: flex" on:click={() => updateTab(`https://www.linkedin.com/in/${profile.linkedin_id}`)}>
        <img style="width:32px;height:32px;" alt="" src={profile.photo_url}>
        <div>
          <h3 class="name">{profile.name}</h3>
          <p class="headline truncated" style="width:250px">{profile.headline}</p>
        </div>
      </a>
    </li>
  {/each}
</ul>