import { Component, h } from "preact";
import { connect } from "unistore/preact";
import IconPlay from '../components/IconPlay';
import Loader from '../components/Loader';
import Sidebar from '../components/Sidebar';
import Song from '../components/Song';
import { actions } from "../store.js";
import { artistsFromSongList, currentSongFromIndex } from "../utils.js";

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

  onRemoveCurrentSong(event) {
    event.preventDefault();
    this.props.scope.removeNowPlaying({
      songIndex: this.props.scope.current_song,
    });
    this.props.scope.next();
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
    const { data, is_loading, scope } = props;

    if (data === null || is_loading) {
      return null;
    }

    const artists = artistsFromSongList(data.songs);
    const currentSongObject = currentSongFromIndex(scope.current_song, scope.now_playing);

    return (
      <div id="albums-detail">
        <div className="Album -detail">
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
        {data.songs.map((song, index) => {
          const isPlaying = (currentSongObject ? currentSongObject.id === song.id : false);
          const onAdd = (isPlaying
            ? (event) => this.onRemoveCurrentSong(event)
            : (event) => this.onSongAddNowPlaying(event, song));

          return (
            <Song
              isPlaying={isPlaying}
              key={`songs.${index}`}
              name={song.name}
              onAdd={onAdd}
              onPlay={(event) => this.onSongPlay(event, song)}
            />
          );
        })}
      </div>
    );
  }
};

const AlbumDetailConnection = connect(["current_song", "now_playing", "token", "user"], actions)(scope => {
  return (
    <div className="Container">
      <Sidebar route="albums.detail" scope={scope} />
      <div className="Container_main">
        <Loader url={`/api/albums/${scope.albumId}.json`}>
          <AlbumDetail scope={scope} />
        </Loader>
      </div>
    </div>
  );
});

export default AlbumDetailConnection;
