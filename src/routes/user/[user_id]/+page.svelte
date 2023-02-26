<script lang="ts">
    import Nav from "$lib/Nav.svelte";
    import UserInfo from '$lib/UserInfo.svelte';

    // export let user_id: string;
    
    export let data: any;
    const user = data.user_info;
    const heatmap_data = data.heatmap_data;

    // console.log(data.user_info)

    import { MetaTags } from 'svelte-meta-tags';
</script>

<MetaTags
    description={data.user_info.name + "'s Neo Anki Leaderboard profile"}
    title={data.user_info.name + "'s profile"}
    titleTemplate="%s | Neo Anki Leaderboard"
/>

<Nav subtitle={data.user_info.name + "'s profile"} />

<UserInfo {user} {heatmap_data} your={false} />
