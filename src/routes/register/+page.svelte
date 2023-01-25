<script>
    import PocketBase from 'pocketbase';
    import { PUBLIC_PB_URL } from '$env/static/public';

    // @ts-ignore
    import Nav from '$lib/Nav.svelte';

    /**
	 * @type {{ valid: boolean; reason: String; }}
	 */
    export let form;

    // /** @type {import('./$types').PageData} */
    // export let data;

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

    /**
	 * @param {Event} event
	 */
    async function handleRegister(event) {
        form = {
            valid: true,
            reason: ""
        };

        // @ts-ignore
        const data = new FormData(this);
        const username = data.get('username');
        const email = data.get('email');
        const password = data.get('password');

        const pb = new PocketBase(PUBLIC_PB_URL);

        let user_pb;

        try {
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

            return form = {
                valid: false,
                reason
            };
        }

        // @ts-ignore
        pb.collection("users").authWithPassword(email, password);

        // POST /api/CreateUser
        const res = await fetch('/api/createUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "user_pb_id": user_pb.id
            })
        });

        if (!res.ok) {
            console.log("Error creating user in Neo Anki");
            
            success = false;
            return;
        }

        success = true;
        return;
    }
</script>

<Nav subtitle="Register"/>

<form method="POST" on:submit|preventDefault={handleRegister}>
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

    {#if form?.valid === false}
        <hgroup>
            <h6 style="color: #e53935;">Couldn't create your account!</h6>
            <h6>{form.reason}</h6>
        </hgroup>
    {/if}

    {#if success}
        <h6 style="color: #43a047;">Account created successfully!</h6>
    {/if}
    
    <button type="submit">Register</button>
</form>
