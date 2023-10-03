<script>
  export let profile

  function updateTab() {
    chrome.tabs.update({url: profile.linkedin_url})
    window.close();
  }
</script>


<a id={profile.linkedin_id} href={profile.linkedin_url} style="display: flex" on:click={updateTab}>
  <img style="width:32px;height:32px;" alt="" src={profile.photo_url}>
  <div>
    <h3 class="name">{profile.name}</h3>
    <p class="headline truncated" style="width:250px">{profile.headline}</p>
  </div>
</a>

<style>
  img {
    margin-right: 4px;
  }
</style>
