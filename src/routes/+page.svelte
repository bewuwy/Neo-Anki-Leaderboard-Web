<script>
    /** @type {import('./$types').PageData} */
    export let data;
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>


<!-- create table from leaderboad -->
<table>
    <thead>
        <tr>
            <th>place</th>
            <th>name</th>
            <th>reviews</th>
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
