<script lang="ts">
    import PocketBase from 'pocketbase';
    import { PUBLIC_PB_URL } from '$env/static/public';
    import Nav from '$lib/Nav.svelte';
    import toast from "svelte-french-toast";

    export let form: { valid: boolean; reason: String; };

    let success: boolean;
    $: {
        if (success) {
            setTimeout(() => {
                window.location.href = "/profile";
            }, 1000);
        }
    }

    async function handleRegister(event: Event) {
        form = {
            valid: true,
            reason: ""
        };

        // @ts-ignore
        const data = new FormData(this);
        const username = data.get('username');
        const email = data.get('email')?.toString() || "";
        const password = data.get('password')?.toString() || "";

        const pb = new PocketBase(PUBLIC_PB_URL);

        let user_pb;

        const user_data = {
            username,
            email,
            "emailVisibility": false,
            password,
            "passwordConfirm": password,
            "name": username,
            "user_data": "",
            "user_today": ""
        };
        
        try {

            // create user in PocketBase
            user_pb = await pb.collection("users").create(user_data);
        } catch (ClientResponseError) {
            console.log("Error creating user in PocketBase");
            
            // @ts-ignore
            const error_data = ClientResponseError.data;

            let reason = "Unknown error";

            if (error_data.data.username) {
                reason = error_data.data.username.message;
            }
            if (error_data.data.email) {
                reason = error_data.data.email.message;
            }
            if (error_data.data.password) {
                reason = error_data.data.password.message;
            }

            console.log(error_data);

            toast.error(reason);
            return form = {
                valid: false,
                reason
            };
        }

        // login user in PocketBase
        pb.collection("users").authWithPassword(email, password);

        // send confirmation email
        await pb.collection("users").requestVerification(email);

        success = true;
        toast.success("Registered successfully");
        return;
    }

    import { MetaTags } from 'svelte-meta-tags';
</script>

<MetaTags 
    description="Register for Neo Anki Leaderboard" 
    title="Register"
    titleTemplate="%s | Neo Anki Leaderboard"
/>

<Nav subtitle="Register"/>

<p>Already have an account? <a href="/login">Login here</a></p>

<form method="POST" on:submit|preventDefault={handleRegister}>
    <h2 style="margin: 0">Register</h2>

    <label for="username">
    Username
    <input type="text" id="username" name="username" placeholder="Username" aria-invalid={ form?.valid === false || undefined } required>
    </label>

    <label for="email">Email address</label>
    <input type="email" id="email" name="email" placeholder="Email address" aria-invalid={ form?.valid === false || undefined } required>
    <small>We'll never share your email with anyone else.</small>

    <label for="password">
    Password
    <input type="password" id="password" name="password" placeholder="Password" minlength="8" aria-invalid={ form?.valid === false || undefined } required>
    </label>
    
    <button type="submit">Register</button>
</form>
