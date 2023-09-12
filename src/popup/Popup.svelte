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

  onMount(async() => profiles = await Storage.recent())
</script>

<main>
  <!-- svelte-ignore a11y-autofocus -->
  <input type="text" placeholder="Search.." autofocus bind:value={q} on:input={search}>

  {#if q.trim().length == 0}
    <h2>Recent profiles</h2>
  {/if}
  <ProfileList bind:profiles />
</main>

<style>
</style>
