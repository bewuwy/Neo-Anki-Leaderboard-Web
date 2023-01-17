<title>Today | Neo Anki Leaderboard</title>

<script>
    /** @type {import('./$types').PageData} */
    export let data;
</script>

<hgroup>
    <h1 class="text-red-500 w-full font-bold text-2xl">Neo Anki Leaderboard</h1>
    
    <nav>
        <ul>
          <li><strong>Leaderboard</strong></li>
          <li>
            <details role="list" dir="rtl">
              <summary aria-haspopup="listbox" role="link">Today</summary>
              <ul role="listbox">
                <li><a href="/week">Week</a></li>
                <li><a href="/month">Month</a></li>
                <li><a href="/all">All time</a></li>
              </ul>
            </details>
          </li>
        </ul>
        <ul>
            <a href="register" role="button" class="outline">Register</a>
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
                <td>{i+1}.</td>
                <td>{record.username}</td>
                <td>{record.score}</td>
            </tr>
        {/each}
    </tbody>
</table>
