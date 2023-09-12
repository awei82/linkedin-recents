<script>
  import './popup.css'

  import { onMount } from "svelte";
  import ProfileList from './lib/ProfileList.svelte';
  import { searchProfiles, getRecents } from 'src/storage.js'

  let profiles

  onMount(async() => profiles = await getRecents())
</script>

<main>
  <h2>Recent profiles</h2>
  <ProfileList {profiles} />
</main>

<style>

</style>
