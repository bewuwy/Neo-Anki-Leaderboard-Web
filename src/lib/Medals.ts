import Pocketbase from 'pocketbase';
import { PUBLIC_PB_URL } from '$env/static/public';


export async function getMedals(user_id: string) {

    const pb = new Pocketbase(PUBLIC_PB_URL);

    const month_medals = await pb.collection('medals').getFullList(
        undefined, {
            "filter": `owner = "${user_id}" && period="month"`
        }
    );

    const week_medals = await pb.collection('medals').getFullList(
        undefined, {
            "filter": `owner = "${user_id}" && period="week"`
        }
    );

    return {
        month_medals,
        week_medals,
    }
}
