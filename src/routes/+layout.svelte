<script>
  import '@picocss/pico'
  import '../app.css'

  import Footer from '$lib/Footer.svelte';
</script>

<main class="container">
  <section>
    <slot />
  </section>

  <section>
    <Footer />
  </section>
</main>
