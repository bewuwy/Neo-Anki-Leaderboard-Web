<title>Today | Neo Anki Leaderboard</title>

<script>
  /** @type {import('./$types').PageData} */
  export let data;

  import Board from '$lib/Board.svelte';
	import NavBoard from '$lib/NavBoard.svelte';
</script>

<NavBoard loggedIn={data.loggedIn} lb_mode={"today"} />

<!-- create table from leaderboad -->
<Board sort={data.sort} records={data.records} lb_mode={"day"} />
