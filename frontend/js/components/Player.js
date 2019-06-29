import { Component, h } from "preact";
import { connect } from "unistore/preact";
import { actions } from "../store.js";

class Player extends Component {
  static getDerivedStateFromProps(props, state) {
    const { scope } = props;
    if (scope.current_song !== state.current_song) {
      if (state.audio) {
        state.audio.pause();
      }
      if (scope.current_song !== null) {
        state.song = scope.now_playing[scope.current_song];
        state.audio = new Audio(state.song.file);
        state.audio.play();
      } else {
        state.audio = null;
        state.song = null;
      }
      state.current_song = scope.current_song;
      state.percent = 0;
    }

    return state;
  }

  state = {
    audio: null,
    current_song: null,
    percent: 0,
    song: null,
  };

  componentDidMount() {
    this.intervalId = setInterval(this.timer.bind(this), 250);
  }

  componentWillUnmount(){
    clearInterval(this.intervalId);
  }

  onPause(event) {
    event.preventDefault();
    this.audio.pause();
  }

  onPlay(event) {
    event.preventDefault();
    this.audio.play();
  }

  render(props, state) {
    if (!props.scope.token) {
      return null;
    }

    if (!state.song) {
      return (
        <div className="Player"></div>
      );
    }

    const backgroundImage = (state.song.album
      ? `url(${state.song.album.cover})`
      : null);

    return (
      <div className="Player">
        <div className="Player_song">
          <div className="Player_song-cover" style={{ backgroundImage }}></div>
          <div className="Player_song-title">{state.song.name}</div>
          {state.song.album && (
            <div className="Player_song-album">
              <span>{state.song.album.name}</span>
              {state.song.artists && (
                <span> – {state.song.artists.map(artist => artist.name).join(", ")}</span>
              )}
            </div>
          )}
        </div>
        <div className="Player_progress">
          <div className="Player_progress-bar" style={{ width: `${state.percent}%` }}></div>
        </div>
      </div>
    );
  }

  timer() {
    if (this.state.audio && this.state.audio.duration) {
      if (this.state.audio.ended) {
        this.setState({
          audio: null,
          percent: 100,
        });
        this.props.scope.next();
      } else {
        this.setState({
          percent: this.state.audio.currentTime / this.state.audio.duration * 100.0,
        });
      }
    }
  }
}

const PlayerView = connect(["current_song", "now_playing", "token"], actions)(scope => {
  return (
    <Player scope={scope} />
  );
})

export default PlayerView;
