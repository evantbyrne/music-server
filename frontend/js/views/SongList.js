import { Component, h } from "preact";
import { connect } from "unistore/preact";
import Loader from '../components/Loader';
import Sidebar from '../components/Sidebar';
import Song from '../components/Song';
import { actions } from "../store.js";
import { currentSongFromIndex } from "../utils.js";

class SongList extends Component {

  onAddNowPlaying(event, song) {
    event.preventDefault();
    this.props.scope.append({
      song,
    });
  }

  onPlay(event, song) {
    event.preventDefault();
    this.props.scope.appendAndPlay({
      song,
    });
  }

  onRemoveCurrentSong(event) {
    event.preventDefault();
    this.props.scope.removeNowPlaying({
      songIndex: this.props.scope.current_song,
    });
    this.props.scope.next();
  }

  render(props, state) {
    const { data, is_loading, scope } = props;

    if (data === null || is_loading) {
      return null;
    }

    const currentSongObject = currentSongFromIndex(scope.current_song, scope.now_playing);

    return (
      <div id="songs">
        {data.map((song, index) => {
          const isPlaying = (currentSongObject ? currentSongObject.id === song.id : false);
          const onAdd = (isPlaying
            ? (event) => this.onRemoveCurrentSong(event)
            : (event) => this.onAddNowPlaying(event, song));

          return (
            <Song
              isPlaying={isPlaying}
              key={`songs.${index}`}
              name={song.name}
              onAdd={onAdd}
              onPlay={(event) => this.onPlay(event, song)}
            />
          );
        })}
      </div>
    );
  }
};

const SongListConnection = connect(["current_song", "now_playing", "token", "user"], actions)(scope => {
  return (
    <div className="Container">
      <Sidebar route="songs" scope={scope} />
      <div className="Container_main">
        <Loader url="/api/songs.json">
          <SongList scope={scope} />
        </Loader>
      </div>
    </div>
  );
});

export default SongListConnection;
