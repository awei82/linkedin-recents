<script>
  import './popup.css'

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

  onMount(async() => profiles = await Storage.recent())
</script>

<main>
  <!-- svelte-ignore a11y-autofocus -->
  <form on:submit|preventDefault={submit}>
    <input type="text" placeholder="Search..." autofocus bind:value={q} on:input={search}>
  </form>

  {#if q.trim().length > 0 && profiles.length == 0}
    <p>No matches from recents. Hit 'Enter' to search on LinkedIn</p>
  {:else}
    <h2>Recent</h2>
    <ul id="profile-list">
      {#each profiles as profile}
        <li>
          <Profile {profile} />
        </li>
      {/each}
    </ul>
  {/if}
</main>

<style>
</style>
