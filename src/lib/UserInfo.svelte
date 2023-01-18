<script lang="ts">
    // @ts-ignore
    import SvelteHeatmap from 'svelte-heatmap';

    export let data: any;
    export let user: any;
    export let heatmap_data: any;
    export let your: boolean = true;

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

<!-- user data -->
<article aria-busy={user?.username === undefined}>

    {#if user?.username != undefined}
        <h3>User data</h3>
        
        <ul>
            {#if your}
            <li>username: {user?.username}</li>
            {/if}
            <li>name: {user?.name}</li>
            {#if your}
            <li>e-mail: {user?.email}</li>
            {/if}
        </ul>
        <details>
            <summary>More info</summary>
            <ul>
                <li>account created: {createdDate}</li>
                <li>user id: {user?.id}</li>
                <li>verified e-mail: {user?.verified}</li>
            </ul>
        </details>
    {:else}
    Loading user data
    {/if}
</article>

<article aria-busy={heatmap_data === undefined}>
    
    {#if heatmap_data != undefined}
        <h3>{ your? "Your": user.name + "'s" } review heatmap</h3>
        
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