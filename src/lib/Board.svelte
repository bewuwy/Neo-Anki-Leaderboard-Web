<script lang="ts">
    export let sort: string;
    export let records: any;
    $: records, updateLeaderboard();
    export let lb_mode: string;

    import Pocketbase from 'pocketbase';
    import { PUBLIC_PB_URL } from '$env/static/public';
	import { getLBRecords, getLBRecordsRequest } from './Board';

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

    async function changeLBSort(event: Event) {
        const target = event.target as HTMLAnchorElement;    
        sort = target.id.slice(2);

        // update url search params
        const url = new URL(window.location.href);
        url.searchParams.set('sort', sort);

        // window.location.href = url.href;
        window.history.replaceState({}, "", url.href);

        // update leaderboard
        refresh();
    }

    // TODO: trigger leaderboard update on url change
    function refresh() {
        const url = new URL(window.location.href);

        getLBRecords(getLBRecordsRequest(lb_mode, url.searchParams)).then((records_) => {
            records = records_;
        })
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
            <th><a id="s-r" on:click={changeLBSort}>Reviews {#if sort === 'r'}↓{/if}</a></th>
            <th><a id="s-t" on:click={changeLBSort}>Minutes {#if sort === 't'}↓{/if}</a></th>
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
