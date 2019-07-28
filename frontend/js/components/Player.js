import { Howl } from 'howler';
import { Component, h } from "preact";
import { connect } from "unistore/preact";
import IconNext from './IconNext';
import IconPause from './IconPause';
import IconPlay from './IconPlay';
import { actions } from '../store';
import { nextSongFromIndex, previousSongFromIndex } from '../utils';

class Player extends Component {
  static getDerivedStateFromProps(props, state) {
    const { scope } = props;
    if (scope.current_song !== state.current_song) {
      if (state.audio) {
        state.audio.pause();
      }
      if (scope.current_song !== null) {
        state.song = scope.now_playing[scope.current_song];
        state.audio = new Howl({
          src: [state.song.file],
        });
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

  onTrack(event, songIndex) {
    event.preventDefault();
    this.props.scope.track({ songIndex });
  }

  onPause(event) {
    event.preventDefault();
    this.state.audio.pause();
  }

  onPlay(event) {
    event.preventDefault();
    this.state.audio.play();
  }

  onSeek(event) {
    const bounds = event.currentTarget.getBoundingClientRect();
    const percent = (event.clientX - bounds.left) / event.currentTarget.clientWidth;
    const time = this.state.audio.duration() * percent;
    this.state.audio.seek(time);
  }

  render(props, state) {
    const { scope } = props;

    if (!scope.user) {
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
    const isLoading = state.audio.duration() == 0;
    const isPlaying = state.audio.playing();
    const next = nextSongFromIndex(scope.current_song, scope.now_playing, scope.now_playing_removed);
    const previous = previousSongFromIndex(scope.current_song, scope.now_playing, scope.now_playing_removed);

    return (
      <div className="Player">
        {previous && (
          <a className="Player_tracking -previous" onClick={(event) => this.onTrack(event, previous.index)}>
            <div className="Player_tracking-cover" style={{ backgroundImage: previous.song.album ? `url(${previous.song.album.cover})` : null }}></div>
            <IconNext />
          </a>
        )}
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
        {isLoading && (
          <div className="Player_pause -loading">
            <IconPause />
          </div>
        )}
        {!isLoading && isPlaying && (
          <a className="Player_pause" href="#" onClick={(event) => this.onPause(event)}>
            <IconPause />
          </a>
        )}
        {!isLoading && !isPlaying && (
          <a className="Player_play" href="#" onClick={(event) => this.onPlay(event)}>
            <IconPlay />
          </a>
        )}
        <div className="Player_progress" onClick={(event) => this.onSeek(event)}>
          <div className="Player_progress-bar" style={{ width: `${state.percent}%` }}></div>
        </div>
        {next && (
          <a className="Player_tracking -next" onClick={(event) => this.onTrack(event, next.index)}>
            <div className="Player_tracking-cover" style={{ backgroundImage: next.song.album ? `url(${next.song.album.cover})` : null }}></div>
            <IconNext />
          </a>
        )}
      </div>
    );
  }

  timer() {
    if (this.state.audio && this.state.audio.duration()) {
      const seek = this.state.audio.seek();
      if (!this.state.audio.playing() && seek == 0) {
        this.setState({
          audio: null,
          percent: 100,
        });
        this.props.scope.next()
      } else {
        this.setState({
          percent: seek / this.state.audio.duration() * 100.0,
        });
      }
    }
  }
}

const PlayerView = connect(["current_song", "now_playing", "now_playing_removed", "user"], actions)(scope => {
  return (
    <Player scope={scope} />
  );
})

export default PlayerView;
