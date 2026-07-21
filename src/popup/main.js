import { mount } from 'svelte';
import Popup from './Popup.svelte'
import { mount } from "svelte";

const app = mount(Popup, {
  target: document.getElementById('app'),
})

export default app
