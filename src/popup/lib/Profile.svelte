<script>
  import linkedin_anonymous_photo from '../assets/linkedin_anonymous_photo.png'

  export let profile

  function updateTab() {
    chrome.tabs.update({url: profile.linkedin_url})
    window.close();
  }
</script>


<a id={profile.linkedin_id} href={profile.linkedin_url} style="display: flex" on:click={updateTab}>
  {#if profile.photo_url.startsWith('https://')}
    <img style="width:32px;height:32px;" alt="" src={profile.photo_url}>
  {:else}
    <img style="width:32px;height:32px;" alt="" src={linkedin_anonymous_photo}>
  {/if}
  <div>
    <h3 class="name">{profile.name}</h3>
    <p class="headline truncated" style="width:250px">{profile.headline}</p>
  </div>
</a>

<style>
  img {
    margin-right: 4px;
  }

  h3,
  p {
    margin: 0;
  }

  a:link {
    color: rgba(0, 0, 0, 0.9);
    text-decoration:none;
  }

  a:hover {
    color: #0a66c2;
    text-decoration:underline;
  }

  .truncated {
    display: block;
    white-space: nowrap; /* forces text to single line */
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
