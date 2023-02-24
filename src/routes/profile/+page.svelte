<script lang="ts">
    import PocketBase from 'pocketbase';
    // @ts-ignore
    import { PUBLIC_PB_URL } from '$env/static/public';

    // @ts-ignore
    import Nav from '$lib/Nav.svelte';
    import UserInfo from '$lib/UserInfo.svelte';

    // heatmap data
    export let data: any;
    const heatmap_data = data.heatmap_data;
    
    const pb = new PocketBase(PUBLIC_PB_URL);

    export const user = pb.authStore.model;
</script>


<Nav subtitle="Your profile" />

<UserInfo {data} {user} {heatmap_data} medals={ {} } />
