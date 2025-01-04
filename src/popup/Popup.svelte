<script>
  import { onMount } from "svelte";
  import Profile from './lib/Profile.svelte';
  import * as Storage from '../storage.js'

  let profiles = []
  let q = ''

  const extension_url = "https://chrome.google.com/webstore/detail/linkedin-recents/bcfkipkjopehjmgikgmnjamdhkhgkfec"

  async function search() {
    profiles = (await Storage.search(q.trim())) || []
  }

  // Select first profile in list
  // If no matches found, open linkedin search in a new tab
  function submit() {
    if (profiles.length === 0 || q.trim().length === 0) {
      navigate(`https://www.linkedin.com/search/results/all/?keywords=${q.trim()}`)
    } else {
      navigate(profiles[0].linkedin_url)
    }
  }

  function navigate(url) {
    chrome.tabs.create({url: url})
    window.close()
  }

  let dialogEl

  function openDialog() {
    dialogEl.showModal()
  }

  async function deleteProfile(profile) {
    await Storage.remove(profile);
    search();
  }

  onMount(async() => profiles = await Storage.recent())
</script>


<main>
  <div style="display:flex; justify-content: space-between;">
    <!-- svelte-ignore a11y-autofocus -->
    <form on:submit|preventDefault={submit}>
      <input type="text" placeholder="Search..." autofocus bind:value={q} on:input={search}>
    </form>

    <button class="btn-info" style="margin-top: .2em;" on:click={openDialog}>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle" viewBox="0 0 16 16">
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
        <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
      </svg>
    </button>
  </div>

  {#if q.trim().length > 0 && profiles.length == 0}
    <p>No matches from recents. Hit 'Enter' to search on LinkedIn</p>
  {:else}
    <h2>Recent</h2>
    <ul id="profile-list">
      {#each profiles as profile}
        <li>
          <div style="display: flex; align-items: center;">
            <Profile {profile} />
            <button class="btn-close" style="height:2em;" on:click={() => deleteProfile(profile)}></button>
          </div>
        </li>
      {/each}
    </ul>
  {/if}
</main>

<dialog bind:this={dialogEl}>
  <h3>Linkedin Recents</h3>
  <p>
    Use the <b>Ctrl+Period</b> (<b>Cmd+Period</b> on macOS) shortcut to access the extension.
    <a on:click={()=> navigate(extension_url)} href={extension_url}>Learn more</a>
  </p>
  <form method="dialog">
    <!-- svelte-ignore a11y-autofocus -->
    <button autofocus>OK</button>
  </form>
</dialog>


<style>
  main {
    width: 300px;
  }

  h2 {
    margin: 0.25rem;
  }

  ul {
    list-style-type: none;
    padding-inline-start: 0;
    margin: 0.25rem 0;
  }

  li {
    padding: 0.25rem;
  }
  li:nth-child(odd) {
    background: #80808030;
  }
  li:nth-child(even) {
    background: #ffffff;
  }

  /* From bootstrap */
  .btn-close {
    --bs-btn-close-color: #000;
    --bs-btn-close-bg: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23000'%3e%3cpath d='M.293.293a1 1 0 0 1 1.414 0L8 6.586 14.293.293a1 1 0 1 1 1.414 1.414L9.414 8l6.293 6.293a1 1 0 0 1-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 0 1-1.414-1.414L6.586 8 .293 1.707a1 1 0 0 1 0-1.414z'/%3e%3c/svg%3e");
    --bs-btn-close-opacity: 0.5;
    --bs-btn-close-hover-opacity: 0.75;
    --bs-btn-close-focus-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
    --bs-btn-close-focus-opacity: 1;
    --bs-btn-close-disabled-opacity: 0.25;
    --bs-btn-close-white-filter: invert(1) grayscale(100%) brightness(200%);
    box-sizing: content-box;
    width: 1em;
    height: 1em;
    padding: 0.25em 0.25em;
    color: var(--bs-btn-close-color);
    background: transparent var(--bs-btn-close-bg) center/1em auto no-repeat;
    border: 0;
    border-radius: 0.375rem;
    opacity: var(--bs-btn-close-opacity);
  }

  .btn-close:hover {
    color: var(--bs-btn-close-color);
    text-decoration: none;
    opacity: var(--bs-btn-close-hover-opacity);
  }

  .btn-info {
    background: transparent;
    border: 0;
    opacity: 0.5;
  }

  .btn-info:hover {
    opacity: 1;
  }

</style>
