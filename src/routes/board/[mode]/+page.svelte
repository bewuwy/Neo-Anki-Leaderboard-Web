<script>
	import Board from '$lib/Board.svelte';

    /** @type {import('./$types').PageData} */
    export let data;
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
                <li><a href="/board/today">Today</a></li>
                <li><a href="/board/week">Week</a></li>
                <li><a href="/board/month">Month</a></li>
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

<Board sort={data.sort} records={data.records} />
