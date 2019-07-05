import { Component, h } from "preact";
import { connect } from "unistore/preact";
import IconAdd from '../components/IconAdd';
import IconPlay from '../components/IconPlay';
import Sidebar from '../components/Sidebar';
import { actions } from "../store.js";

class NowPlaying extends Component {

  onRemoveNowPlaying(event, songIndex) {
    event.preventDefault();
    this.props.scope.removeNowPlaying({
      songIndex,
    });
    if (this.props.scope.current_song === songIndex) {
      this.props.scope.next();
    }
  }

  onTrack(event, songIndex) {
    event.preventDefault();
    this.props.scope.track({
      songIndex,
    });
  }

  render(props, state) {
    const { scope } = props;

    return (
      <div id="now-playing">
        {scope.now_playing.map((song, index) => {
          if (scope.now_playing_removed.includes(index)) {
            return null;
          }
          return (
            <div className={`Song ${scope.current_song === index ? '-playing' : ''}`} key={`now-playing.${index}`}>
              {scope.current_song !== index && (
                <a class="Song_play" onClick={(event) => this.onTrack(event, index)}>
                  <IconPlay />
                </a>
              )}
              <a className="Song_add -active" onClick={(event) => this.onRemoveNowPlaying(event, index)}>
                <IconAdd />
              </a>
              <div className="Song_title">{song.name}</div>
            </div>
          );
        })}
      </div>
    );
  }
};

const NowPlayingConnection = connect(["current_song", "now_playing", "now_playing_removed", "token", "user"], actions)(scope => {
  return (
    <div className="Container">
      <Sidebar route="now-playing" scope={scope} />
      <div className="Container_main">
        <NowPlaying scope={scope} />
      </div>
    </div>
  );
});

export default NowPlayingConnection;
