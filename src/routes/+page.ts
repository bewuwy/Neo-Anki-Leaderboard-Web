import PocketBase from 'pocketbase';
import { PUBLIC_PB_URL } from '$env/static/public';


/** @type {import('./$types').PageLoad} */
export async function load() {
    const pb = new PocketBase(PUBLIC_PB_URL);

    const loggedIn = pb.authStore.isValid;

    const filter = `updated >= "${new Date().toISOString().split('T')[0]} 00:00:00" && reviews > 0`; // "2021-12-31 00:00:00"
    const records = await pb.collection('today_leaderboard').getFullList(200 /* batch size */, {
        sort: '-reviews',
        filter: filter,
        expand: 'user'
    });

    const leaderboard = [];

    let user: any;

    for (let i = 0; i < records.length; i++) {
        const record = records[i];
        user = record.expand.user;
        const username = user.username;
        const user_id = user.id;

        const score = record.reviews || 0;

        leaderboard.push({
            username,
            user_id,
            score,
        });
    }

    user = pb.authStore.model || null;

    return {
      leaderboard,
      user,
      loggedIn
    };
}
