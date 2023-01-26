<script lang="ts">
	import Board from '$lib/Board.svelte';
  import NavBoard from '$lib/NavBoard.svelte';
	import type { PageData } from './$types';

  export let data: PageData;
</script>

<title>{data.lb_mode.charAt(0).toUpperCase() + data.lb_mode.slice(1) } | Neo Anki Leaderboard</title>

<NavBoard loggedIn={data.loggedIn} lb_mode={data.lb_mode} />

<Board sort={data.sort} records={data.records} lb_mode={data.lb_mode} />
