import { Component, h } from "preact";
import { connect } from "unistore/preact";
import IconAdd from './IconAdd';
import IconPlay from './IconPlay';
import Loader from './Loader';
import { actions } from "../store.js";

class SongListLoaded extends Component {

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
      <div class="Container_main" id="songs">
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

const SongList = connect([], actions)(scope => {
  return (
    <Loader url="/api/songs.json">
      <SongListLoaded scope={scope} />
    </Loader>
  );
});

export default SongList;
