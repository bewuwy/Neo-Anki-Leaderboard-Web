<script>
  import '@picocss/pico'
  import '../app.css'

  import Footer from '$lib/Footer.svelte';

  import {Toaster} from 'svelte-french-toast';
</script>

<Toaster position="bottom-center" />

<main class="container">
  <section>
    <slot />
  </section>

  <section>
    <Footer />
  </section>
</main>
