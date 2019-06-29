import { Component, h } from "preact";
import { connect } from "unistore/preact";
import { actions } from "../store.js";

class Sidebar extends Component {
  static getDerivedStateFromProps(props, state) {
    const { scope } = props;
    if (scope.loading_count === 0 && !scope.user && scope.token) {
      scope.userLoadBegin();
      scope.load({
        method: "get",
        onSuccess: scope.userLoadSuccess,
        scope,
        token: scope.token,
        url: "/auth/user/?format=json",
      });
    }

    return state;
  }

  onLogOut = (event) => {
    event.preventDefault();
    this.props.scope.logout();
  };

  render(props, state) {
    if (!props.scope.token || !props.scope.user) {
      return null;
    }

    return (
      <aside className="Sidebar">
        <nav className="Sidebar_nav">
          {/*
          <a className="Sidebar_nav-link" href="/albums" id="SidbarNav_albums">Albums</a>
          <a className="Sidebar_nav-link" href="/artists" id="SidbarNav_artists">Artists</a>
          <a className="Sidebar_nav-link" href="/now-playing" id="SidbarNav_now-playing">Now Playing</a>
          */}
          <a className="Sidebar_nav-link -active" href="/" id="SidbarNav_songs">Songs</a>
          <a className="Sidebar_nav-link" href="#" id="SidbarNav_logout" onClick={this.onLogOut}>Logout</a>
        </nav>
      </aside>
    );
  }
}

const SidebarView = connect(["loading_count", "token", "user"], actions)(scope => {
  return (
    <Sidebar scope={scope} />
  );
})

export default SidebarView;
