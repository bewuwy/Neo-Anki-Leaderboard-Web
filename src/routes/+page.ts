import PocketBase from 'pocketbase';
import { PUBLIC_PB_URL } from '$env/static/public';


/** @type {import('./$types').PageLoad} */
export async function load({ url }: any) {
    let sort = url.searchParams.get('sort') || 'r';

    switch (sort) {
        case 'r':
            sort = '-reviews';
            break;
        case 't':
            sort = '-time';
            break;
        default:
            sort = '-reviews';
            break;
    }

    const pb = new PocketBase(PUBLIC_PB_URL);

    const loggedIn = pb.authStore.isValid;

    const filter = `updated >= "${new Date().toISOString().split('T')[0]} 00:00:00" && reviews > 0`; // "2021-12-31 00:00:00"
    const records = await pb.collection('today_leaderboard').getFullList(200 /* batch size */, {
        sort,
        filter: filter,
        expand: 'user'
    });

    const user: any = pb.authStore.model || null;

    return {
      records,
      user,
      loggedIn,
      "sort": sort[1]
    };
}
