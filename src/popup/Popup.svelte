<script>
  import './popup.css'

  import { onMount } from "svelte";
  import ProfileList from './lib/ProfileList.svelte';
  import { searchProfiles, getRecents } from '/src/storage.js'

  let profiles = []
  let q = ''

  async function search() {
    if (q.trim().length === 0) return
    profiles = await searchProfiles(q.trim())
  }

  onMount(async() => profiles = await getRecents())
</script>

<main>
  <input type="text" placeholder="Search.." bind:value={q} on:input={search}>

  {#if q.trim().length == 0}
    <h2>Recent profiles</h2>
  {/if}
  <ProfileList bind:profiles />
</main>

<style>
</style>
