<title>Today | Neo Anki Leaderboard</title>

<script>
    /** @type {import('./$types').PageData} */
    export let data;
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
<table role="grid">
    <thead>
        <tr>
            <th>#</th>
            <th>Name</th>
            <th>Reviews</th>
        </tr>
    </thead>
    <tbody>
        {#each data.leaderboard as record, i}
            <tr>
                <td>{#if record.username === data.user?.username}<b>{i+1}.</b>{:else}{i+1}.{/if}</td>
                <td>{#if record.username === data.user?.username}<b><u><a style="color: hsl(205deg, 16%, 77%);" href={ "/user/" + record.user_id }>{record.username}</a></u></b>{:else}<a style="color: hsl(205deg, 16%, 77%);" href={ "/user/" + record.user_id }>{record.username}</a>{/if}</td>
                <td>{#if record.username === data.user?.username}<b>{record.score}</b>{:else}{record.score}{/if}</td>
            </tr>
        {/each}
    </tbody>
</table>

<footer class="grid">
    <a href="https://github.com/bewuwy" target="_blank" rel="noopener noreferrer" role="button" class="outline secondary">Made by bewu</a>
    <a href="https://ankiweb.net/shared/info/1894428367" target="_blank" rel="noopener noreferrer" role="button" class="outline">Anki addon page</a>
</footer>
