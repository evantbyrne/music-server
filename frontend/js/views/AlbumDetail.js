import { Component, h } from "preact";
import { connect } from "unistore/preact";
import IconAdd from '../components/IconAdd';
import IconPlay from '../components/IconPlay';
import Loader from '../components/Loader';
import Sidebar from '../components/Sidebar';
import { actions } from "../store.js";

class AlbumDetail extends Component {

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

  onSongAddNowPlaying(event, song) {
    event.preventDefault();
    song["album"] = this.props.data;
    this.props.scope.append({
      song,
    });
  }

  onSongPlay(event, song) {
    event.preventDefault();
    song["album"] = this.props.data;
    this.props.scope.appendAndPlay({
      song,
    });
  }

  render(props, state) {
    const { data, is_loading } = props;

    if (data === null || is_loading) {
      return null;
    }

    const artists = [];
    for (let i = 0; i < data.songs.length; i++) {
      for (let j = 0; j < data.songs[i].artists.length; j++) {
        const artistName = data.songs[i].artists[j].name;
        if (!artists.includes(artistName)) {
          artists[artists.length] = artistName;
        }
      }
    }

    return (
      <div id="albums-detail">
        <div class="Album -detail">
          <div className="Album_cover" style={{ backgroundImage: `url(${data.cover})` }}></div>
          <div className="Album_main">
            <div className="Album_title">{data.name}</div>
            {artists.length > 0 && (
              <div className="Album_meta -artists">{artists.join(", ")}</div>
            )}
          </div>
          <a className="Album_play" onClick={(event) => this.onPlay(event, data)}>
            <IconPlay />
            <span>Play</span>
          </a>
        </div>
        {data.songs.map(song => (
          <div class="Song">
            <a class="Song_play" onClick={(event) => this.onSongPlay(event, song)}>
              <IconPlay />
            </a>
            <a class="Song_add" onClick={(event) => this.onSongAddNowPlaying(event, song)}>
              <IconAdd />
            </a>
            <div class="Song_title">{song.name}</div>
          </div>
        ))}
      </div>
    );
  }
};

const AlbumDetailConnection = connect(["token", "user"], actions)(scope => {
  return (
    <div className="Container">
      <Sidebar route="albums.detail" scope={scope} />
      <div class="Container_main">
        <Loader url={`/api/albums/${scope.albumId}.json`}>
          <AlbumDetail scope={scope} />
        </Loader>
      </div>
    </div>
  );
});

export default AlbumDetailConnection;
