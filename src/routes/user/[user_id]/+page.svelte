<script lang="ts">
    import Nav from "$lib/Nav.svelte";
    import UserInfo from '$lib/UserInfo.svelte';

    // export let user_id: string;
    
    export let data: any;
    const user = data.user_info;
    const heatmap_data = data.heatmap_data;

    // console.log(data.user_info)
</script>

<Nav subtitle={data.user_info.name + "'s profile"} />

<UserInfo {data} {user} {heatmap_data} your={false} />
