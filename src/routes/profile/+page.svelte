<script lang="ts">
    import PocketBase from 'pocketbase';
    // @ts-ignore
    import { PUBLIC_PB_URL } from '$env/static/public';

    // @ts-ignore
    import Nav from '$lib/Nav.svelte';
    // @ts-ignore
    import SvelteHeatmap from 'svelte-heatmap';

    // heatmap data
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

    export let data: any;
    const heatmap_data = data.heatmap_data;
    
    const pb = new PocketBase(PUBLIC_PB_URL);

    export const user = pb.authStore.model;
</script>


<Nav subtitle="Your profile" />

<!-- user data -->
<article aria-busy={user?.username === undefined}>

    {#if user?.username != undefined}
        <h3>User data</h3>
        
        <ul>
            <li>username: {user?.username}</li>
            <li>e-mail: {user?.email}</li>
        </ul>
        <details>
            <summary>More info</summary>
            <ul>
                <li>user id: {user?.id}</li>
                <li>verified e-mail: {user?.verified}</li>
            </ul>
        </details>
    {/if}
    {#if user?.username === undefined}
    Loading user data
    {/if}
</article>

<article aria-busy={heatmap_data === undefined}>
    
    {#if heatmap_data != undefined}
        <h3>Your review heatmap</h3>
        
        <section>
            <SvelteHeatmap
                allowOverflow={true}
                cellGap={5}
                cellRadius={1}
                colors={['#a1dab4', '#42b6c4', '#2c7fb9', '#263494']}
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
            colors={['#a1dab4', '#42b6c4', '#2c7fb9', '#263494']}
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
    Loading heatmap data
    {/if}
</article>
