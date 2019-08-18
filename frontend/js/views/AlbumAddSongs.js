import { Component, h } from "preact";
import { route } from "preact-router";
import { connect } from "unistore/preact";
import IconAdd from '../components/IconAdd';
import IconPlay from '../components/IconPlay';
import Loader from '../components/Loader';
import Sidebar from '../components/Sidebar';
import { actions } from "../store.js";

class AlbumAddSongs extends Component {
  state = {
    errors: {
      songs: false,
    },
    songs: [null],
  };

  componentDidMount() {
    this.setState({
      songs: [null],
    });
  }

  mutateSong(event, index) {
    const obj = {
      songs: [].concat(this.state.songs),
    };
    obj["songs"][index] = event.target.files.length > 0 ? event.target.files[0] : null;
    if (obj["songs"][obj["songs"].length - 1] !== null) {
      obj["songs"][obj["songs"].length] = null;
    }
    this.setState(obj);
  }

  removeSong(event, index) {
    event.preventDefault();
    const obj = {
      songs: [].concat(this.state.songs),
    };
    obj["songs"][index] = null;
    this.setState(obj);
  }

  onSubmit = (event) => {
    event.preventDefault();
    const { scope } = this.props;
    const { songs } = this.state;

    const data = new FormData();
    for (let i = 0; i < songs.length; i++) {
      if (songs[i] !== null) {
        data.append("songs", songs[i]);
      }
    }

    scope.load({
      data,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      method: "post",
      onSuccess: () => {
        route(`/albums/${scope.albumId}/`);
      },
      scope,
      url: `/api/albums/${scope.albumId}/add-songs/`,
    });
  }

  render(props, state) {
    const { data, is_loading } = props;

    if (data === null || is_loading) {
      return null;
    }

    const { errors } = this.state;
    const mutateSong = this.mutateSong.bind(this);
    const removeSong = this.removeSong.bind(this);

    return (
      <form className="Form" onSubmit={this.onSubmit}>
        {state.songs.map((song, index) => (
          <label class={`Input ${errors.songs ? "-error": ""}`} key={`add-song_${index}`}>
            {index === 0 && (
              <div class="Input_label">MP3</div>
            )}
            <div class="Input_file">
              {song && (
                <div>
                  <span>{song.name}</span>
                  <a href="#" onClick={(e) => removeSong(e, index)}>
                    <IconAdd />
                  </a>
                </div>
              )}
              {!song && (
                <div>Select a file...</div>
              )}
              <input name="song" onChange={(e) => mutateSong(e, index)} type="file" />
            </div>
          </label>
        ))}
        <button className="Button -primary"
          onClick={this.onSubmit}>Upload</button>
      </form>
    );
  }
}

const AlbumAddSongsConnection = connect([], actions)(scope => {
  return (
    <div className="Container">
      <Sidebar route="albums.detail" />
      <div className="Container_main">
        <Loader url={`/api/albums/${scope.albumId}/`}>
          <AlbumAddSongs scope={scope} />
        </Loader>
      </div>
    </div>
  );
})

export default AlbumAddSongsConnection;
