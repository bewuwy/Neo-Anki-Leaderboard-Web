<script lang="ts">
    export let sort: string;
    export let records: any;
    $: records, updateLeaderboard();
    export let user: any;

    let leaderboard: any[] = [];

    function updateLeaderboard() {
        leaderboard = [];

        for (let i = 0; i < records.length; i++) {
            const record = records[i];
            user = record.expand.user;
            const username = user.username;
            const user_id = user.id;
    
            const score = record.reviews || 0;
            let minutes = record.time || 0;
    
            minutes = Math.round(minutes * 10) / 10;

            leaderboard.push({
                username,
                user_id,
                score,
                minutes
            });
        }
    }
</script>

<table role="grid">
    <thead>
        <tr>
            <th>#</th>
            <th>Name</th>
            <th><a href="?sort=r">Reviews</a> {#if sort === 'r'}↓{/if}</th>
            <th><a href="?sort=t">Minutes</a> {#if sort === 't'}↓{/if}</th>
        </tr>
    </thead>
    <tbody>
        {#each leaderboard as record, i}
            <tr>
                <td>{#if record.username === user?.username}<b>{i+1}.</b>{:else}{i+1}.{/if}</td>
                <td>{#if record.username === user?.username}<b><u><a style="color: hsl(205deg, 16%, 77%);" href={ "/user/" + record.user_id }>{record.username}</a></u></b>{:else}<a style="color: hsl(205deg, 16%, 77%);" href={ "/user/" + record.user_id }>{record.username}</a>{/if}</td>
                <td>{#if record.username === user?.username}<b>{record.score}</b>{:else}{record.score}{/if}</td>
                <td>{#if record.username === user?.username}<b>{record.minutes}</b>{:else}{record.minutes}{/if}</td>
            </tr>
        {/each}
    </tbody>
</table>
