import PocketBase from 'pocketbase';
import { PUBLIC_PB_URL } from '$env/static/public'


/** @type {import('./$types').PageLoad} */
export async function load() { // { params }: any

    const pb = new PocketBase(PUBLIC_PB_URL);

    const todayFilter = `updated >= "${new Date().toISOString().split('T')[0]} 00:00:00"`; // "2021-12-31 00:00:00"
    const records = await pb.collection('today_leaderboard').getFullList(200 /* batch size */, {
        sort: '-reviews',
        filter: todayFilter,
        expand: 'user'
    });

    const leaderboard = [];

    for (let i = 0; i < records.length; i++) {
        const record = records[i];
        const user: any = record.expand.user;
        const username = user.username;

        const score = record.reviews || 0;

        leaderboard.push({
            username,
            score,
        });
    }

    return {
      leaderboard
    };
}
