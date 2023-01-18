import PocketBase from 'pocketbase';
import { PUBLIC_PB_URL } from '$env/static/public';


/** @type {import('./$types').PageLoad} */
export async function load() {

    const pb = new PocketBase(PUBLIC_PB_URL);

    const user = pb.authStore.model || null;

    if (user === null) {
        return null;
    }

    const user_data = await pb.collection('user_data').getOne(user.user_data);

    const reviews = user_data.reviews || {};

    interface HeatmapDay {
        date: Date;
        value: number;
    }

    const heatmap_data: HeatmapDay[] = [];

    for (const date in reviews) {
        heatmap_data.push({
            date: new Date(date),
            value: reviews[date]
        });
    }

    return {
        heatmap_data
    };
}
