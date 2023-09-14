<script>
  import './popup.css'

  import { onMount } from "svelte";
  import ProfileList from './lib/ProfileList.svelte';
  import * as Storage from '/src/storage.js'

  let profiles = []
  let q = ''

  async function search() {
    profiles = await Storage.search(q.trim())
  }

  function selectProfile() {
    if (profiles.length === 0 || q.trim().length === 0) return
    console.log('selectProfile')
    chrome.tabs.update({url: `https://www.linkedin.com/in/${profiles[0].linkedin_id}`})
    window.close();
  }

  onMount(async() => profiles = await Storage.recent())
</script>

<main>
  <!-- svelte-ignore a11y-autofocus -->
  <form on:submit|preventDefault={selectProfile}>
    <input type="text" placeholder="Search.." autofocus bind:value={q} on:input={search}>
  </form>

  {#if q.trim().length == 0}
    <h2>Recent profiles</h2>
  {/if}
  <ProfileList bind:profiles />
</main>

<style>
</style>
