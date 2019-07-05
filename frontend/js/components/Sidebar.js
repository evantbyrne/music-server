import { Component, h } from "preact";

class Sidebar extends Component {
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
          <a className={`Sidebar_nav-link ${props.route === 'albums' ? '-active' : ''}`} href="/albums/" id="SidbarNav_albums">Albums</a>
          <a className={`Sidebar_nav-link ${props.route === 'now-playing' ? '-active' : ''}`} href="/now-playing/" id="SidbarNav_now-playing">Now Playing</a>
          <a className={`Sidebar_nav-link ${props.route === 'songs' ? '-active' : ''}`} href="/" id="SidbarNav_songs">Songs</a>
          <a className="Sidebar_nav-link" href="#" id="SidbarNav_logout" onClick={this.onLogOut}>Logout</a>
        </nav>
      </aside>
    );
  }
}

export default Sidebar;
