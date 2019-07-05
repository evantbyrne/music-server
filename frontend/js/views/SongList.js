import { Component, h } from "preact";
import { connect } from "unistore/preact";
import IconAdd from '../components/IconAdd';
import IconPlay from '../components/IconPlay';
import Loader from '../components/Loader';
import Sidebar from '../components/Sidebar';
import { actions } from "../store.js";

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

  render(props, state) {
    const { data, is_loading } = props;

    if (data === null || is_loading) {
      return null;
    }

    return (
      <div id="songs">
        {data.map(song => (
          <div class="Song">
            <a class="Song_play" onClick={(event) => this.onPlay(event, song)}>
              <IconPlay />
            </a>
            <a class="Song_add" onClick={(event) => this.onAddNowPlaying(event, song)}>
              <IconAdd />
            </a>
            <div class="Song_title">{song.name}</div>
          </div>
        ))}
      </div>
    );
  }
};

const SongListConnection = connect(["token", "user"], actions)(scope => {
  return (
    <div className="Container">
      <Sidebar route="songs" scope={scope} />
      <div class="Container_main">
        <Loader url="/api/songs.json">
          <SongList scope={scope} />
        </Loader>
      </div>
    </div>
  );
});

export default SongListConnection;
