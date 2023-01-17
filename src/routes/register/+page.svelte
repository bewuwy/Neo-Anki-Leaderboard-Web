<title>Register | Neo Anki Leaderboard</title>

<hgroup>
    <h1 class="text-red-500 w-full font-bold text-2xl">Neo Anki Leaderboard</h1>
    <!-- <h2>Register</h2> -->

    <nav>
        <ul>
          <li><strong>Register</strong></li>
        </ul>
        <ul>
            <a href="/" role="button" class="outline">Leaderboard</a>
        </ul>
    </nav>
</hgroup>

<script>
    import PocketBase, { ClientResponseError } from 'pocketbase';
    import { PUBLIC_PB_URL } from '$env/static/public'

    /**
	 * @type {{ valid: any; }}
	 */
    export let form;

    // /** @type {import('./$types').PageData} */
    // export let data;

    /**
	 * @type {boolean}
	 */
    let success;

    /**
	 * @param {Event} event
	 */
    async function handleRegister(event) {

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
            // console.log("e", e);
            console.log("Error creating user in PocketBase");

            return form = {
                valid: false
            };
        }

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
    <input type="password" id="password" name="password" placeholder="Password" aria-invalid={ form?.valid === false || undefined } required>
    </label>

    {#if form?.valid === false}
        <h6 style="color: #e53935;">Couldn't create your account!</h6>
    {/if}

    {#if success}
        <h6 style="color: #43a047;">Account created successfully!</h6>
    {/if}
    
    <button type="submit">Register</button>
</form>
