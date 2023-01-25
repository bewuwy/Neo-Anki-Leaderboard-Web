import PocketBase from 'pocketbase';
import { PUBLIC_PB_URL } from '$env/static/public';
import { getLBRecordsRequest } from '$lib/Board';


/** @type {import('./$types').PageLoad} */
export async function load({ url }: any) {

    const pb = new PocketBase(PUBLIC_PB_URL);
    const loggedIn = pb.authStore.isValid;

    const { sort, filter, collection } = getLBRecordsRequest('today', url.searchParams);
    
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
      "sort": sort[1]
    };
}
