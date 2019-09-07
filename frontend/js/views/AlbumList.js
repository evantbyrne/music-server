import { Component, h } from "preact";
import { connect } from "unistore/preact";
import IconPlay from '../components/IconPlay';
import Loader from '../components/Loader';
import Sidebar from '../components/Sidebar';
import UserLoader from '../components/UserLoader';
import { actions } from "../store.js";

class AlbumList extends Component {

  onPlay(event, album) {
    event.preventDefault();
    event.stopPropagation();
    album.songs.map((song, index) => {
      song["album"] = album;
      if (index === 0) {
        this.props.scope.appendAndPlay({
          song,
        });
      } else {
        this.props.scope.append({
          song,
        });
      }
    });
  }

  render(props, state) {
    const { data, is_loading, scope } = props;

    if (data === null || is_loading) {
      return null;
    }

    return (
      <div id="albums">
        {data.results.albums.map(album => (
          <a className="Album" href={`/albums/${album.id}/`} key={`album-list_${album.id}`}>
            <div className="Album_cover" style={{ backgroundImage: `url(${album.cover})` }}></div>
            <div className="Album_main">
              <div className="Album_title">{album.name}</div>
            </div>
            <a className="Album_play" onClick={(event) => this.onPlay(event, album)}>
              <IconPlay />
              <span>Play</span>
            </a>
          </a>
        ))}
      </div>
    );
  }
};

const AlbumListConnection = connect(["loading_count", "user"], actions)(scope => {
  return (
    <div className="Container">
      <Sidebar route="albums" />
      <UserLoader />
      <div className="Container_main">
        <Loader url="/api/albums/">
          <AlbumList scope={scope} />
        </Loader>
      </div>
    </div>
  );
});

export {
  AlbumList,
  AlbumListConnection,
};
