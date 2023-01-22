import { json } from '@sveltejs/kit';
import PocketBase from 'pocketbase';
import { PUBLIC_PB_URL } from '$env/static/public'
import { PB_ADMIN_USER, PB_ADMIN_PASSWORD } from '$env/static/private';

 
/** @type {import('./$types').RequestHandler} */
export async function POST({ request }: any) {
  
    const data = await request.json();
    const user_id = data.user_pb_id;

    const pb = new PocketBase(PUBLIC_PB_URL);

    // pb.admins.authWithPassword(PB_ADMIN_USER, PB_ADMIN_PASSWORD);
    // console.log(PB_ADMIN_USER, PB_ADMIN_PASSWORD);
    // console.log(pb.authStore.isValid);

    console.log("user_id", user_id);

    // create user_data
    const user_data_pb = await pb.collection("user_data").create({
        "user": user_id,
    });
    console.log("user_data_pb", user_data_pb);
    
    // create in today_leaderboard
    const user_today_pb = await pb.collection("today_leaderboard").create({
        "user": user_id,
        "reviews": 0,
    });
    console.log("user_today_pb", user_today_pb);

    // create in week_leaderboard
    const user_week_pb = await pb.collection("week_leaderboard").create({
        "user": user_id,
        "reviews": 0,
    });

    // create in month_leaderboard
    const user_month_pb = await pb.collection("month_leaderboard").create({
        "user": user_id,
        "reviews": 0,
    });

    // update user with user_data and user_today
    await pb.collection("users").update(user_id, {
        "user_data": user_data_pb.id,
        "user_today": user_today_pb.id,
        "user_week": user_week_pb.id,
        "user_month": user_month_pb.id,
    });

    return json({"success": true});
}
