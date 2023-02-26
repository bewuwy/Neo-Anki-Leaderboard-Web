<script lang="ts">
    export let sort: string;
    export let records: any;
    $: records, updateLeaderboard();
    export let lb_mode: string;

    //* time_left
    import { getEndTime } from './Board';
    const end_time = getEndTime(lb_mode);

    let time_left: string = '';
    const rtf1 = new Intl.RelativeTimeFormat(undefined, { numeric: 'auto' });
    
    function updateTimer() {
        let hours_left = (end_time.getTime() - Date.now())/1000/60/60;
        hours_left = Math.round(hours_left * 10) / 10;

        if (hours_left <= 1) {
            time_left = rtf1.format(hours_left/60, 'minute');
        } else if (hours_left <= 24) {
            time_left = rtf1.format(hours_left, 'hour');
        } else {
            time_left = rtf1.format(Math.round(hours_left/24), 'day');
        }
    }

    updateTimer();
    setTimeout(updateTimer, 60*10e3);

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
        event.preventDefault();

        const target = event.target as HTMLAnchorElement;    
        sort = target.id.slice(2);

        // update url search params
        const url = new URL(window.location.href);
        url.searchParams.set('sort', sort);

        // window.location.href = url.href;
        window.history.replaceState({}, "", url.href);

        // update leaderboard
        board_refresh();
    }

    // TODO: trigger leaderboard update on url change
    function board_refresh() {
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

    .sort-picked::after {
        margin-left: 5px;
        content: "↓";
    }
</style>

<small data-tooltip={"Resets at " + end_time.toLocaleString() + " in your timezone."}>Resets { time_left }</small>

<figure>
    <table role="grid">
        <thead>
            <tr>
                <th>#</th>
                <th>Name</th>
                <th><a id="s-r" href={ "/board/" + lb_mode + '?sort=r' } on:click={changeLBSort} class:sort-picked={sort === 'r'}>Reviews</a></th>
                <th><a id="s-t" href={ "/board/" + lb_mode + '?sort=t' } on:click={changeLBSort} class:sort-picked={sort === 't'}>Minutes</a></th>
            </tr>
        </thead>
        {#if leaderboard.length == 0}
        <tbody>
            <tr>
                <td colspan="4">No one competed yet in this leaderboard. You have a pretty good chance at taking the first place!</td>
            </tr>
        </tbody>
        {:else}
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
        {/if}
    </table>
</figure>
