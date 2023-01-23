<title>Today | Neo Anki Leaderboard</title>

<script>
    /** @type {import('./$types').PageData} */
    export let data;

    import Board from '$lib/Board.svelte';
</script>

<hgroup>
    <h1>Neo Anki Leaderboard</h1>
    
    <nav>
        <ul>
          <li><strong>Leaderboard</strong></li>
          <li>
            <details role="list" dir="rtl">
              <summary aria-haspopup="listbox" role="link">Today</summary>
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
            <li><a href={ data.loggedIn? "profile": "register" } role="button" class="outline">{ data.loggedIn? "Profile": "Register" }</a></li>
        </ul>
    </nav>
</hgroup>

<!-- create table from leaderboad -->
<Board sort={data.sort} records={data.records} user={data.user} />
