import { json } from '@sveltejs/kit';
import PocketBase from 'pocketbase';
import { PUBLIC_PB_URL } from '$env/static/public'
// import { PB_ADMIN_USER, PB_ADMIN_PASSWORD } from '$env/static/private';

 
/** @type {import('./$types').RequestHandler} */
export async function POST({ request }: any) {
  
    const data = await request.json();
    const user_id = data.user_pb_id;

    const pb = new PocketBase(PUBLIC_PB_URL);

    // pb.admins.authWithPassword(PB_ADMIN_USER, PB_ADMIN_PASSWORD);
    // console.log(PB_ADMIN_USER, PB_ADMIN_PASSWORD);
    // console.log(pb.authStore.isValid);

    console.log("createUser: user_id", user_id);

    // create user_data
    const user_data_pb = await pb.collection("user_data").create({
        "user": user_id,
    });

    // update user with user_data and user_today
    await pb.collection("users").update(user_id, {
        "user_data": user_data_pb.id,
    });

    return json({"success": true});
}
