<script lang="ts">
    // @ts-ignore
    import SvelteHeatmap from 'svelte-heatmap';

    export let user: any;
    export let heatmap_data: any;
    export let your: boolean = true;

    // get medals
    import { getMedals } from '$lib/Medals';
    let medals_promise = getMedals(user?.id);

    const createdDate = new Date(user?.created).toLocaleDateString();

    const year_start = new Date();
    year_start.setMonth(0);
    year_start.setDate(1);
    
    const year_end = new Date();
    year_end.setMonth(11);
    year_end.setDate(31);

    const half_year_end = new Date();
    half_year_end.setMonth(5);
    half_year_end.setDate(30);

    const half_year_start = new Date();
    half_year_start.setMonth(6);
    half_year_start.setDate(1);
</script>

<style>
    #heatmap-desktop {
        display: none;
    }

    @media (min-width: 768px) {
        #heatmap-mobile {
            display: none;
        }
        #heatmap-desktop {
            display: block;
        }
    }

    h1 > svg {
        height: 1.5rem;
        aspect-ratio: 1;
    }

    .medals .gold::before {
        content: "🥇";
    }
    .medals .silver::before {
        content: "🥈";
    }
    .medals .bronze::before {
        content: "🥉";
    }
</style>

<!-- user name -->
<hgroup>
    {#if user}
    <h1>
        {user?.username}
        {#if user?.verified}
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <title>User has verified their email address</title>
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        {:else}
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <title>User hasn't verified their email address yet</title>
            <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        {/if}
    </h1>
    <h3>account created: {createdDate}</h3>
    {:else}
    <h1>Loading...</h1>
    <h3>Loading</h3>
    {/if}
</hgroup>

<!-- user medals -->
<details open>
    <!-- svelte-ignore a11y-no-redundant-roles -->
    <summary role='button'>{ your? "Your": user.name + "'s" } medals</summary>

    {#await medals_promise}
        <p aria-busy="true">Loading medals...</p>
    {:then medals}
    <!-- weekly -->
    {#if medals.week_medals.length > 0}
        <h6>Weekly</h6>
        <ul class="medals">
            {#each medals.week_medals as medal}
                <li class={`${medal.type} ${medal.place}`}>{medal.date} for {medal.type}</li>
            {/each}
        </ul>
    {/if}
    
    <!-- monthly -->
    {#if medals.month_medals.length > 0}
        <h6>Monthly</h6>
        <ul class="medals">
            {#each medals.month_medals as medal}
                <li class={`${medal.type} ${medal.place}`}>{medal.date} for {medal.type}</li>
            {/each}
        </ul>
    {/if}
    {#if medals.month_medals.length == 0 && medals.week_medals.length == 0}
        <p>No medals yet</p>
    {/if}
    {/await}
</details>

<!-- heatmap -->
<details id="heatmap-desktop" open>
    
    {#if heatmap_data != undefined}
        <!-- svelte-ignore a11y-no-redundant-roles -->
        <summary role='button'>{ your? "Your": user.name + "'s" } review heatmap</summary>
        
        <section>
            <SvelteHeatmap
                allowOverflow={true}
                cellGap={5}
                cellRadius={1}
                colors={['#c6e48b', '#7bc96f', '#239a3b', '#196127'].reverse()}
                data={heatmap_data}
                dayLabelWidth={20}
                emptyColor={'#ecedf0'}
                monthGap={20}
                monthLabelHeight={25}
                startDate={year_start}
                endDate={half_year_end}
                view={'monthly'}
                fontColor={'white'}
                fontSize={16}
            />
        </section>

        <SvelteHeatmap
            allowOverflow={true}
            cellGap={5}
            cellRadius={1}
            colors={['#c6e48b', '#7bc96f', '#239a3b', '#196127'].reverse()}
            data={heatmap_data}
            dayLabelWidth={20}
            emptyColor={'#ecedf0'}
            monthGap={20}
            monthLabelHeight={25}
            startDate={half_year_start}
            endDate={year_end}
            view={'monthly'}
            fontColor={'white'}
            fontSize={16}
        />
    {:else}
        <!-- svelte-ignore a11y-no-redundant-roles -->
        <summary role='button'>Review heatmap</summary>
        <p aria-busy="true">Loading heatmap data</p>
    {/if}
</details>

<!-- mobile heatmap -->
<details id="heatmap-mobile" open>

    {#if heatmap_data != undefined}
        <summary>{ your? "Your": user.name + "'s" } review heatmap</summary>
        
            <!-- iterate from start_date every n months -->
            {#each Array.from({length: 4}, (_, i) => new Date(year_start.getFullYear(), year_start.getMonth() + i * 3)) as month}
                <section>
                <SvelteHeatmap
                        allowOverflow={true}
                        cellGap={5}
                        cellRadius={1}
                        colors={['#c6e48b', '#7bc96f', '#239a3b', '#196127'].reverse()}
                        data={heatmap_data}
                        dayLabelWidth={20}
                        emptyColor={'#ecedf0'}
                        monthGap={20}
                        monthLabelHeight={25}
                        startDate={month}
                        endDate={new Date(month.getFullYear(), month.getMonth() + 2)}
                        view={'monthly'}
                        fontColor={'white'}
                        fontSize={16}
                    />
                </section>
            {/each}
    {:else}
        <!-- svelte-ignore a11y-no-redundant-roles -->
        <summary role='button'>Review heatmap</summary>
        <p aria-busy="true">Loading heatmap data</p>
    {/if}
</details>


{#if your}
<!-- user data -->
<details>
    <!-- svelte-ignore a11y-no-redundant-roles -->
    <summary role='button'>User data</summary>

    {#if user?.username != undefined}
        <ul>
            <li>username: {user?.username}</li>
            <li>name: {user?.name}</li>
            <li>e-mail: {user?.email}</li>
            <li>account created: {createdDate}</li>
            <li>user id: {user?.id}</li>
            <li>verified e-mail: {user?.verified}</li>
        </ul>
    {:else}
    Loading user data
    {/if}
</details>
{/if}
