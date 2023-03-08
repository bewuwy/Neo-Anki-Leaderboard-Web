<script lang="ts">
    import Nav from '$lib/Nav.svelte';
    import { MetaTags } from 'svelte-meta-tags';
    import PocketBase from 'pocketbase';
    import { PUBLIC_PB_URL } from '$env/static/public';
    import toast from "svelte-french-toast";

    export let form = { valid: true };

    const pb = new PocketBase(PUBLIC_PB_URL);

    function handleForgot(event: Event) {
        // @ts-ignore
        const data = new FormData(this);
        const email = data.get('email')?.toString();

        if (!email) {
            return form = {
                valid: false
            };
        }

        pb.collection("users").requestPasswordReset(email).then(() => {
            console.log("Password reset email sent");
            toast.success("Password reset email sent");
        }).catch((err) => {
            console.log("Error sending password reset email");
            toast.error("Error sending password reset email");
            console.log(err);
        });
    }
</script>

<MetaTags
    description="Reset your Neo Anki Leaderboard password"
    title="Forgot password?"
    titleTemplate="%s | Neo Anki Leaderboard"
/>

<Nav subtitle="Forgot password?" />

<form method="POST" on:submit|preventDefault={handleForgot}>
    <label for="email">
    E-mail address
    </label>
    <!-- svelte-ignore a11y-autofocus -->
    <input type="email" id="email" name="email" placeholder="email@example.org" aria-invalid={ form?.valid === false || undefined } required autofocus>
    
    <button type="submit">Reset password</button>
</form>