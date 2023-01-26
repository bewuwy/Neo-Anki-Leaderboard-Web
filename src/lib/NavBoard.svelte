<script lang="ts">
    export let loggedIn: boolean;
    export let lb_mode: string;

    let lb_title: string = lb_mode.charAt(0).toUpperCase() + lb_mode.slice(1);
</script>

<hgroup>
    <h1>Neo Anki Leaderboard</h1>
    
    <nav>
        <ul>
          <li><strong>Leaderboard</strong></li>
          <li>
            <details role="list" dir="rtl">
              <summary aria-haspopup="listbox" role="link">{lb_title}</summary>
              <ul role="listbox">
                <li><a id="m-today" href="/board/today">Today</a></li>
                <li><a id="m-week" href="/board/week">Week</a></li>
                <li><a id="m-month" href="/board/month">Month</a></li>
                <!-- <li><a href="/board/all">All time</a></li> -->
              </ul>
            </details>
          </li>
        </ul>
        <ul>
            <li><a href='/login' role="button" class="outline">{ loggedIn? "Logout": "Login" }</a></li>
            <li><a href={ loggedIn? "profile": "register" } role="button" class="outline">{ loggedIn? "Profile": "Register" }</a></li>
        </ul>
    </nav>
</hgroup>
