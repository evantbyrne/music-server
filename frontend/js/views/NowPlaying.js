import { Component, h } from "preact";
import { connect } from "unistore/preact";
import Sidebar from '../components/Sidebar';
import Song from '../components/Song';
import UserLoader from '../components/UserLoader';
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
            <Song
              isActive={true}
              isPlaying={scope.current_song === index}
              key={`now-playing.${index}`}
              name={song.name}
              onAdd={(event) => this.onRemoveNowPlaying(event, index)}
              onPlay={(event) => this.onTrack(event, index)}
            />
          )
        })}
      </div>
    );
  }
};

const NowPlayingConnection = connect(["current_song", "now_playing", "now_playing_removed", "user"], actions)(scope => {
  return (
    <div className="Container">
      <Sidebar route="now-playing" />
      <UserLoader />
      <div className="Container_main">
        <NowPlaying scope={scope} />
      </div>
    </div>
  );
});

export default NowPlayingConnection;
