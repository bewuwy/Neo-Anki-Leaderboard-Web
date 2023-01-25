<script lang="ts">
	import Board from '$lib/Board.svelte';
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

<hgroup>
    <h1>Neo Anki Leaderboard</h1>
    
    <nav>
        <ul>
          <li><strong>Leaderboard</strong></li>
          <li>
            <details role="list" dir="rtl">
              <summary aria-haspopup="listbox" role="link">{data.lb_mode.charAt(0).toUpperCase() + data.lb_mode.slice(1) }</summary>
              <ul role="listbox">
                <li><a id="m-today" href="/board/today">Today</a></li>
                <li><a id='m-week' href="/board/week">Week</a></li>
                <li><a id='m-month' href="/board/month">Month</a></li>
                <!-- <li><a href="/board/all">All time</a></li> -->
              </ul>
            </details>
          </li>
        </ul>
        <ul>
            <li><a href='/login' role="button" class="outline">{ data.loggedIn? "Logout": "Login" }</a></li>
            <li><a href={ data.loggedIn? "/profile": "/register" } role="button" class="outline">{ data.loggedIn? "Profile": "Register" }</a></li>
        </ul>
    </nav>
</hgroup>

<Board sort={data.sort} records={data.records} lb_mode={data.lb_mode} />
