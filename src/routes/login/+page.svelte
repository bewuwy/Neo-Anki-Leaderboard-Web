<script lang="ts">
    import PocketBase, { ClientResponseError } from 'pocketbase';
    import { PUBLIC_PB_URL } from '$env/static/public';

    import toast from "svelte-french-toast";

    import Nav from '$lib/Nav.svelte';

    export let form: { valid: any; };

    let success: boolean;
    $: {
        if (success) {
            setTimeout(() => {
                window.location.href = "/profile";
            }, 1000);
        }
    }

    //! logout if logged in
    const pb = new PocketBase(PUBLIC_PB_URL);

    if (pb.authStore.isValid) {
        pb.authStore.clear();

        toast.success("Logged out successfully");

        // // redirect to home
        // window.location.href = "/";
    }

    async function handleLogin(event: Event) {

        // @ts-ignore
        const data = new FormData(this);
        const username = data.get('username');
        const password = data.get('password');

        try {
            // @ts-ignore
            await pb.collection("users").authWithPassword(username, password);
        } catch (ClientResponseError) {
            console.log("Error logging in");

            success = false;
            toast.error("Invalid username or password");
            return form = {
                valid: false
            };
        }

        success = true;
        toast.success("Logged in successfully");
        return;
    }

    import { MetaTags } from 'svelte-meta-tags';
</script>

<MetaTags
    description="Login to Neo Anki Leaderboard"
    title="Login"
    titleTemplate="%s | Neo Anki Leaderboard"
/>

<Nav subtitle="Login" />

<form method="POST" on:submit|preventDefault={handleLogin}>
    <label for="username">
    Username
    <!-- svelte-ignore a11y-autofocus -->
    <input type="text" id="username" name="username" placeholder="Username" aria-invalid={ form?.valid === false || undefined } required autofocus>
    </label>

    <label for="password">
    Password
    <input type="password" id="password" name="password" placeholder="Password" aria-invalid={ form?.valid === false || undefined } required>
    </label>
    
    <button type="submit">Log in</button>
</form>
