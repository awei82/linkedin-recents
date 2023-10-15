<script>
  import { onMount } from "svelte";
  import Profile from './lib/Profile.svelte';
  import * as Storage from '../storage.js'

  let profiles = []
  let q = ''

  async function search() {
    profiles = await Storage.search(q.trim())
  }

  // Select first profile in list
  // If no matches found, open linkedin search in a new tab
  function submit() {
    if (profiles.length === 0 || q.trim().length === 0) {
      chrome.tabs.update({url: `https://www.linkedin.com/search/results/all/?keywords=${q.trim()}`})
    } else {
      chrome.tabs.update({url: profiles[0].linkedin_url})
    }
    window.close();
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

    <button on:click={openDialog}>
      <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/></svg>
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
            <button on:click={() => deleteProfile(profile)} style="height:2em;">
              <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"/></svg>
            </button>
          </div>
        </li>
      {/each}
    </ul>
  {/if}
</main>

<dialog bind:this={dialogEl}>
  <h3>Linkedin Recents</h3>
  <p>Use the 'Ctrl + Period' ('Cmd + Period' on macOS) shortcut to access the extension.</p>
  <form method="dialog">
    <button>OK</button>
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
</style>
