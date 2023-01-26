<script lang="ts">
	import Board from '$lib/Board.svelte';
  import NavBoard from '$lib/NavBoard.svelte';
	import type { PageData } from './$types';

  export let data: PageData;

  // function changeMode(event: Event) {
  //   event.preventDefault();
  //   const target = event?.target as HTMLAnchorElement;

  //   let new_url;

  //   switch (target.id) {
  //     case "m-today":
  //       new_url = "/board/today";
  //       break;
  //     case "m-week":
  //       new_url = "/board/week";
  //       break;
  //     case "m-month":
  //       new_url = "/board/month";
  //       break;
  //     case "m-all":
  //       new_url = "/board/all";
  //       break;
  //   }

  //   // history replace with new url
  //   window.history.replaceState({}, "", new_url);
  // }
</script>

<title>{data.lb_mode.charAt(0).toUpperCase() + data.lb_mode.slice(1) } | Neo Anki Leaderboard</title>

<NavBoard loggedIn={data.loggedIn} lb_mode={data.lb_mode} />

<Board sort={data.sort} records={data.records} lb_mode={data.lb_mode} />
