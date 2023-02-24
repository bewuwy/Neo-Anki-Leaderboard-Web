<script lang="ts">
    export let loggedIn: boolean;
    export let lb_mode: string;

    let lb_title: string = lb_mode.charAt(0).toUpperCase() + lb_mode.slice(1);

    function changeMode(event: Event) {
      event.preventDefault();
      const target = event?.target as HTMLAnchorElement;

      let new_path = "";

      switch (target.id) {
        case "m-today":
          new_path = "/board/today";
          break;
        case "m-week":
          new_path = "/board/week";
          break;
        case "m-month":
          new_path = "/board/month";
          break;
        case "m-all":
          new_path = "/board/all";
          break;
      }

      const old_url = window.location.href;
      const new_url = old_url.replace(/\/board\/\w+/, new_path);

      // // history replace with new url
      // window.history.pushState({}, "", new_url);

      window.location.href = new_url;
    }
</script>

<hgroup>
    <h1><a href="/" class="white">Neo Anki Leaderboard</a></h1>
    
    <nav>
        <ul>
          <li><strong>Leaderboard</strong></li>
          <li>
            <details role="list" dir="rtl">
              <summary aria-haspopup="listbox" role="link">{lb_title}</summary>
              <ul role="listbox">
                <li><a id="m-today" on:click={changeMode}>Today</a></li>
                <li><a id="m-week" on:click={changeMode}>Week</a></li>
                <li><a id="m-month" on:click={changeMode}>Month</a></li>
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
