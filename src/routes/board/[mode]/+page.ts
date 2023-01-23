import PocketBase from 'pocketbase';
import { PUBLIC_PB_URL } from '$env/static/public';
import { redirect } from '@sveltejs/kit';


/** @type {import('./$types').PageLoad} */
export async function load({params, url}: any) {
    const lb_mode = params.mode;
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

    let filter = '';
    let collection = '';   

    const date_start_week = new Date();
    date_start_week.setDate(date_start_week.getDate() - (date_start_week.getDay() + 6) % 7);
    // date_start_week.setHours(0, 0, 0, 0);
    
    const date_start_month = new Date();
    date_start_month.setDate(1);
    // date_start_month.setHours(0, 0, 0, 0);

    switch (lb_mode) {
        case 'today':
            filter = `updated >= "${new Date().toISOString().split('T')[0]} 00:00:00" && reviews > 0`; // "2021-12-31 00:00:00"
            collection = 'today_leaderboard';
            break;
        case 'week':
            filter = `updated >= "${date_start_week.toISOString().split('T')[0]} 00:00:00" && reviews > 0`; // "2021-12-31 00:00:00"
            collection = 'week_leaderboard';
            break;
        case 'month':
            filter = `updated >= "${date_start_month.toISOString().split('T')[0]} 00:00:00" && reviews > 0`; // "2021-12-31 00:00:00"
            collection = 'month_leaderboard';
            break;
        default:
            // redirect to /
            throw redirect(302, '/');
    }

    const records = await pb.collection(collection).getFullList(200 /* batch size */, {
        sort,
        filter: filter,
        expand: 'user'
    });

    const user: any = pb.authStore.model || null;

    return {
      records,
      user,
      loggedIn,
      lb_mode,
      "sort": sort[1]
    };
}
