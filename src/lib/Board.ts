import { redirect } from "@sveltejs/kit";

export function getLBRecordsRequest(lb_mode: string, urlSearchParams: URLSearchParams) {
    let filter;
    let collection;

    const date_start_week = new Date();
    date_start_week.setDate(date_start_week.getDate() - (date_start_week.getDay() + 6) % 7);
    
    const date_start_month = new Date();
    date_start_month.setDate(1);

    switch (lb_mode) {
        case 'today':
            filter = `updated >= "${new Date().toISOString().split('T')[0]} 00:00:00" && reviews > 0`;
            collection = 'today_leaderboard';
            break;
        case 'week':
            filter = `updated >= "${date_start_week.toISOString().split('T')[0]} 00:00:00" && reviews > 0`;
            collection = 'week_leaderboard';
            break;
        case 'month':
            filter = `updated >= "${date_start_month.toISOString().split('T')[0]} 00:00:00" && reviews > 0`;
            collection = 'month_leaderboard';
            break;
        default:
            // redirect to /
            throw redirect(302, '/');
    }

    //*user filter
    const users_filter_ = urlSearchParams.get('users') || null;
    let users_filter: string[];

    if (users_filter_) {
        users_filter = users_filter_.split(',');
    } else {
        users_filter = [];
    }

    for (let i = 0; i < users_filter.length; i++) {
        if (i === 0)
            filter += ' && (';

        const uid = users_filter[i];

        filter += `user.id ~ "${uid}"`;

        if (i != users_filter.length -1)
            filter += ' || ';
        else
            filter += ")";
    }

    //* sort
    let sort = urlSearchParams.get('sort') || 'r';
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

    return {
        filter,
        collection,
        sort
    };
}
