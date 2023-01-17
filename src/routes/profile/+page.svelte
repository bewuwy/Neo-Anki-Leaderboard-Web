<script>
    import PocketBase from 'pocketbase';
    import { PUBLIC_PB_URL } from '$env/static/public';

    // @ts-ignore
    import Nav from '$lib/Nav.svelte';

    const pb = new PocketBase(PUBLIC_PB_URL);

    export const user = pb.authStore.model;

    // console.log(user);
</script>

<Nav subtitle="Your profile" />

<!-- user data -->
<article aria-busy={user?.username === undefined}>

    {#if user?.username != undefined}
        <h3>User data</h3>
        
        <ul>
            <li>Username: {user?.username}</li>
            <li>Email: {user?.email}</li>    
        </ul>
    {/if}
    {#if user?.username === undefined}
    Loading user data
    {/if}
</article>
