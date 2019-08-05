import { Component, h } from "preact";

class Sidebar extends Component {
  onLogOut = (event) => {
    event.preventDefault();
    window.location.href = "/auth/logout/";
  };

  render(props, state) {
    return (
      <aside className="Sidebar">
        <nav className="Sidebar_nav">
          <a className={`Sidebar_nav-link ${props.route === 'albums' ? '-active' : ''}`} href="/albums/" id="SidbarNav_albums">Albums</a>
          <a className={`Sidebar_nav-link ${props.route === 'now-playing' ? '-active' : ''}`} href="/now-playing/" id="SidbarNav_now-playing">Now Playing</a>
          <a className={`Sidebar_nav-link ${props.route === 'songs' ? '-active' : ''}`} href="/" id="SidbarNav_songs">Songs</a>
          <a className={`Sidebar_nav-link ${props.route === 'upload' ? '-active' : ''}`} href="/upload/" id="SidbarNav_upload">Upload</a>
          <a className="Sidebar_nav-link" href="/auth/logout/" id="SidbarNav_logout" onClick={this.onLogOut}>Logout</a>
        </nav>
      </aside>
    );
  }
}

export default Sidebar;
