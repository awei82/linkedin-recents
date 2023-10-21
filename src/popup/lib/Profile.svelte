<script>
  import linkedin_anonymous_photo from '../assets/linkedin_anonymous_photo.png'

  export let profile

  $: profile_photo_url = profile.photo_url.startsWith('https://') ? profile.photo_url :linkedin_anonymous_photo;

  function updateTab() {
    chrome.tabs.update({url: profile.linkedin_url})
    window.close();
  }
</script>


<a id={profile.linkedin_id} href={profile.linkedin_url} on:click={updateTab}>
  <img style="width:32px;height:32px; align-self: center; " alt="" src={profile_photo_url}>
  <div style="width: 230px; align-self: center;">
    <div style="display: flex;">
      <h3>{profile.name}</h3>
      {#if profile.degree}
        <p style="align-self: center; color: #484848;">&nbsp;&#x2022; {profile.degree}</p>
      {/if}
    </div>
    <p class="headline truncated">{profile.headline}</p>
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

  a {
    display: flex;
    width: 266px;
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
