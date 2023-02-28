<script lang="ts">
    import Nav from "$lib/Nav.svelte";
    import { MetaTags } from 'svelte-meta-tags';
    import Pocketbase from 'pocketbase';
    import { PUBLIC_PB_URL } from '$env/static/public';
    import { goto } from '$app/navigation';
    import toast from 'svelte-french-toast';

    type User = {
        id: string;
        username: string;
    }

    let userSearch: string = "";
    let userFirstMatch: string = "";
    let members: User[] = [];

    const pb = new Pocketbase(PUBLIC_PB_URL);

    function handleSearch(event: KeyboardEvent) {
        if (userSearch.length == 0) {
            userFirstMatch = "";
        }
        else {
            pb.collection("users").getFirstListItem(`username~"${userSearch}"`).then((res: any) => {
                userFirstMatch = res.username;
            }).catch((err: any) => {
                userFirstMatch = "";
            });
        }

        if (event.key === "Enter") {
            // console.log(userSearch);
            getUserID(userSearch);
        }
    }

    function handleSearchButton() {
        getUserID(userSearch);
    }

    function getUserID(username: string) {
        pb.collection("users").getFirstListItem(`username~"${username}"`).then((res: any) => {

            if (members.some((member) => { return member.id == res.id })) {
                toast.error("User already added");
            }
            else {
                members = [...members, { id: res.id, username: res.username }];
                toast.success(`${res.username} added`);
            }
            
            userSearch = "";

        }).catch((err: any) => {
            toast.error("User not found");
        });
    }

    function handleRemove(event: MouseEvent) {
        let id = (event.target as HTMLElement).id;
        // console.log(id);

        members = members.filter((member) => member.id != id);
        toast.success("User removed");
    }

    function handleRemoveKey(event: KeyboardEvent) {
        if (event.key === "Enter") {
            let id = (event.target as HTMLElement).id;
            // console.log(id);

            members = members.filter((member) => member.id != id);
            toast.success("User removed");
        }
    }

    function handleCreate() {
        console.log(members);

        if (members.length == 0) {
            console.log("No members");
            return;
        }

        let new_url = "/board/week?users=" + members.map((member) => member.id).join(",");
        console.log(new_url);

        toast.success("Leaderboard created");

        // navigate to new url
        setTimeout(() => {
            goto(new_url);
        }, 500);
    }
</script>

<style>
    #members > li {
        cursor: pointer;
    }

    #members > li:hover {
        /* stroke through */
        text-decoration: line-through;
    }

    #searchParent {
        display: grid;
        grid-template-columns: 4fr 1fr;
        grid-template-rows: 1fr 1fr;
        grid-column-gap: 1rem;
    }

    #searchParent > #searchInput {
        grid-column: 1 / 3;
        grid-row: 1 / 2;
    }
    #searchParent > button {
        grid-column: 2 / 3;
        grid-row: 2 / 3;
    }
</style>

<MetaTags
    description="Create a custom leaderboard with you and your friends"
    title="Custom leaderboard"
    titleTemplate="%s | Neo Anki Leaderboard"
/>

<Nav subtitle={"Custom leaderboard"} />

<a href="/board/week">← Back to leaderboard</a>
<h3>Create a custom Anki leaderboard</h3>

<h4>Search for users</h4>

<div id="searchParent">
    <input placeholder="Search for an user..." id="searchInput" type="text" on:keyup={handleSearch} bind:value={userSearch}>
    <button on:click={handleSearchButton}>Add</button>
    <input type="text" readonly value={userFirstMatch || "No users found"}>
</div>

<!-- <ul role="listbox">
    <li>bewu</li>
    <li>bewu</li>
    <li>bewu</li>
</ul> -->

<h4>Added members</h4>
{#if members.length == 0}
    <p>No users added yet</p>
{/if}
<ul id="members">
    {#each members as member}
        <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
        <li id={member.id} tabindex="0" on:click={handleRemove} on:keydown={handleRemoveKey}>{member.username}</li>
    {/each}
</ul>

<button on:click={handleCreate}>Create</button>
