import { Component, h } from "preact";
import { route } from "preact-router";
import { connect } from "unistore/preact";
import IconAdd from '../components/IconAdd';
import IconPlay from '../components/IconPlay';
import Loader from '../components/Loader';
import Sidebar from '../components/Sidebar';
import { actions } from "../store.js";

class AlbumCreate extends Component {
  state = {
    artist: null,
    errors: {
      artist: false,
      cover: false,
      name: false,
    },
    cover: null,
    name: "",
  };

  componentDidMount() {
    this.setState({
      artist: null,
      cover: null,
      name: "",
    });
  }

  mutate(event, key) {
    const obj = {};
    obj[key] = (event.target.getAttribute("type") === "file"
      ? (event.target.files.length > 0 ? event.target.files[0] : null)
      : event.target.value);
    this.setState(obj);
  }

  mutateNull(event, key) {
    event.preventDefault();
    const obj = {};
    obj[key] = null;
    this.setState(obj);
  }

  onSubmit = (event) => {
    event.preventDefault();
    const { scope } = this.props;
    const { artist, cover, name } = this.state;

    this.setState({
      errors: {
        artist: !artist,
        name: !name,
      },
    });

    if (!artist || !name) {
      return;
    }

    const data = new FormData();
    data.append("artist", artist);
    data.append("name", name);
    if (cover) {
      data.append("cover", cover);
    }

    scope.load({
      data,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      method: "post",
      onSuccess: (data) => {
        const { id } = data.json.results.album;
        route(`/albums/${id}/`);
      },
      scope,
      url: "/api/albums/create/",
    });
  }

  render(props, state) {
    const { data, is_loading } = props;

    if (data === null || is_loading) {
      return null;
    }

    const { errors } = this.state;
    const mutate = this.mutate.bind(this);
    const mutateNull = this.mutateNull.bind(this);

    return (
      <form className="Form" onSubmit={this.onLogin}>
        <label class={`Input ${errors.name ? "-error": ""}`}>
          <div class="Input_label">Name</div>
          <input className="Input_field"
            name="name"
            onChange={(e) => mutate(e, 'name')}
            placeholder="…"
            value={state.name} />
        </label>
        <label class={`Input ${errors.artist ? "-error": ""}`}>
          <div class="Input_label">Artist</div>
          <div class="Input_select-container">
            <select className="Input_field"
              name="artist"
              onChange={(e) => mutate(e, 'artist')}
              placeholder="…"
            >
              <option value="">Select...</option>
              {data.results.artists.map(artist => (
                <option value={artist.id} selected={state.artist == artist.id}>
                  {artist.name}
                </option>
              ))}
            </select>
            <IconPlay classes="Input_drop-arrow" />
          </div>
        </label>
        <label class={`Input ${errors.cover ? "-error": ""}`}>
          <div class="Input_label">Cover Image</div>
          <div class="Input_file">
            {state.cover && (
              <div>
                <span>{state.cover.name}</span>
                <a href="#" onClick={(e) => mutateNull(e, 'cover')}>
                  <IconAdd />
                </a>
              </div>
            )}
            {!state.cover && (
              <div>Select a file...</div>
            )}
            <input name="cover" onChange={(e) => mutate(e, 'cover')} type="file" />
          </div>
        </label>
        <button className="Button -primary"
          disabled={false}
          onClick={this.onSubmit}>Create</button>
      </form>
    );
  }
}

const AlbumCreateConnection = connect([], actions)(scope => {
  return (
    <div className="Container">
      <Sidebar route="create.albums" />
      <div className="Container_main">
        <Loader url="/api/artists/">
          <AlbumCreate scope={scope} />
        </Loader>
      </div>
    </div>
  );
})

export default AlbumCreateConnection;
