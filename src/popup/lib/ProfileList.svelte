<script>
  export let profiles = []

  function updateTab(url) {
    chrome.tabs.update({url: url})
  }
</script>

<ul>
  {#each profiles as profile}
    <li>
      {profile.photo_url}
      <a href="https://www.linkedin.com/in/{profile.linkedin_id}" style="display: flex" onclick={() => updateTab(`https://www.linkedin.com/in/${profile.linkedin_id}`)}>
        <img style="width:32px;height:32px;" alt="" src={profile.photo_url}>
        <div>
          <h3 class="name">{profile.name}</h3>
          <p class="headline truncated" style="width:250px">{profile.headline}</p>
        </div>
      </a>
    </li>
  {/each}
</ul>

<img width="20" title="Victor L." src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" >
