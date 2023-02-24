import PocketBase from 'pocketbase';
import { PUBLIC_PB_URL } from '$env/static/public';


/** @type {import('./$types').PageLoad} */
export async function load({ params }: any) {

    const user_id = params.user_id;

    const pb = new PocketBase(PUBLIC_PB_URL);

    const user_info = await pb.collection('users').getOne(user_id);

    const user_data = await pb.collection('user_data').getOne(user_info.user_data);

    console.log(`owner = "${user_id}"`);

    const user_medals = await pb.collection('medals').getFullList(
        undefined, {
            "filter": `owner = "${user_id}"`
        }
    );
    
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
        params,
        heatmap_data,
        user_info,
        user_medals
    }
}
