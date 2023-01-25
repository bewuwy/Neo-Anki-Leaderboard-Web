import PocketBase from 'pocketbase';
import { PUBLIC_PB_URL } from '$env/static/public';
// import { redirect } from '@sveltejs/kit';
import { getLBRecordsRequest } from '$lib/Board';


/** @type {import('./$types').PageLoad} */
export async function load({params, url}: any) {
    const lb_mode = params.mode;
    
    const pb = new PocketBase(PUBLIC_PB_URL);
    const loggedIn = pb.authStore.isValid;

    const {filter, collection, sort} = getLBRecordsRequest(lb_mode, url.searchParams);

    const records = await pb.collection(collection).getFullList(200 /* batch size */, {
        sort,
        filter,
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
