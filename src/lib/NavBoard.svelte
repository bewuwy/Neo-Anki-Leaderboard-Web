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

      const old_url = new URL(window.location.href);
      const new_url = old_url.origin + new_path + old_url.search;

      // // history replace with new url
      // window.history.pushState({}, "", new_url);

      window.location.href = new_url;
    }
</script>

<style>
  nav .subtitle {
    display: none;
  }

  @media (min-width: 768px) {
    nav .subtitle {
      display: inline-block;
    }
  }
</style>

<hgroup>
    <h1><a href="/" class="contrast">Neo Anki Leaderboard</a></h1>    

    <nav>
        <ul>
          <li class="subtitle"><strong>Leaderboard</strong></li>
          <li>
            <details role="list" dir="rtl">
              <summary aria-haspopup="listbox" role="link">{lb_title}</summary>
              <ul role="listbox" aria-label="leaderboard_mode">
                <li><a id="m-today" href="/board/today" on:click={changeMode}>Today</a></li>
                <li><a id="m-week" href="/board/week" on:click={changeMode}>Week</a></li>
                <li><a id="m-month" href="/board/month" on:click={changeMode}>Month</a></li>
                <!-- <li><a href="/board/all">All time</a></li> -->
              </ul>
            </details>
          </li>
        </ul>
        <ul>
            <li><a href='/login' role="button" class="outline">{ loggedIn? "Logout": "Login" }</a></li>
            <li><a href={ loggedIn? "/profile": "/register" } role="button" class="outline">{ loggedIn? "Profile": "Register" }</a></li>
        </ul>
    </nav>
</hgroup>
