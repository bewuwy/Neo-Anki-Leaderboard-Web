<script>
    import PocketBase, { ClientResponseError } from 'pocketbase';
    import { PUBLIC_PB_URL } from '$env/static/public';

    // @ts-ignore
    import Nav from '$lib/Nav.svelte';

    /**
	 * @type {{ valid: any; }}
	 */
    export let form;

    /**
	 * @type {boolean}
	 */
    let success;
    $: {
        if (success) {
            setTimeout(() => {
                window.location.href = "/";
            }, 1000);
        }
    }

    //! logout if logged in
    const pb = new PocketBase(PUBLIC_PB_URL);

    if (pb.authStore.isValid) {
        pb.authStore.clear();

        // redirect to home
        window.location.href = "/";
    }

    /**
	 * @param {Event} event
	 */
    async function handleLogin(event) {

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
            return form = {
                valid: false
            };
        }

        success = true;
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
    <input type="text" id="username" name="username" placeholder="Username" aria-invalid={ form?.valid === false || undefined } required autofocus>
    </label>

    <label for="password">
    Password
    <input type="password" id="password" name="password" placeholder="Password" aria-invalid={ form?.valid === false || undefined } required>
    </label>

    {#if form?.valid === false}
        <h6 style="color: #e53935;">Invalid user or password!</h6>
    {/if}

    {#if success}
        <h6 style="color: #43a047;">Logged in successfully!</h6>
    {/if}
    
    <button type="submit">Log in</button>
</form>
