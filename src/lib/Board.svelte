<script lang="ts">
    export let sort: string;
    export let records: any;
    $: records, updateLeaderboard();

    import Pocketbase from 'pocketbase';
    import { PUBLIC_PB_URL } from '$env/static/public';

    const pb = new Pocketbase(PUBLIC_PB_URL);
    const user = pb.authStore.model;

    let leaderboard: any[] = [];

    function updateLeaderboard() {
        leaderboard = [];

        for (let i = 0; i < records.length; i++) {
            const record = records[i];
            const username = record.expand.user.username;
            const user_id = record.expand.user.id;
    
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

<style>
    .highlight td {
        font-weight: bold;
    }

    .highlight a {
        text-decoration: underline;
    }
</style>

<table role="grid">
    <thead>
        <tr>
            <th>#</th>
            <th>Name</th>
            <th><a href="?sort=r">Reviews {#if sort === 'r'}↓{/if}</a></th>
            <th><a href="?sort=t">Minutes {#if sort === 't'}↓{/if}</a></th>
        </tr>
    </thead>
    <tbody>
        {#each leaderboard as record, i}
            <tr data-user-id="{ record.user_id }" class:highlight={user != null && user?.id && record.user_id == user?.id} >
                <td>{i+1}.</td>
                <td><a style="color: hsl(205deg, 16%, 77%);" href={ "/user/" + record.user_id }>{record.username}</a></td>
                <td>{record.score}</td>
                <td>{record.minutes}</td>
            </tr>
        {/each}
    </tbody>
</table>
