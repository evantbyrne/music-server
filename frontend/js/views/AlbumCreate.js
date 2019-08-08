import { Component, h } from "preact";
import { route } from "preact-router";
import { connect } from "unistore/preact";
import IconPlay from '../components/IconPlay';
import Loader from '../components/Loader';
import Sidebar from '../components/Sidebar';
import { actions } from "../store.js";

class AlbumCreate extends Component {
  state = {
    artist: null,
    errors: {
      artist: false,
      name: false,
    },
    name: "",
  };

  componentDidMount() {
    this.setState({
      artist: null,
      name: "",
    });
  }

  mutate(event, key) {
    const obj = {};
    obj[key] = event.target.value;
    this.setState(obj);
  }

  onSubmit = (event) => {
    event.preventDefault();
    const { scope } = this.props;
    const { artist, name } = this.state;

    this.setState({
      errors: {
        artist: !artist,
        name: !name,
      },
    });

    if (!artist || !name) {
      return;
    }

    const data = {
      artist,
      name,
    };
    scope.load({
      data,
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
      <Sidebar route="upload" />
      <div className="Container_main">
        <Loader url="/api/artists/">
          <AlbumCreate scope={scope} />
        </Loader>
      </div>
    </div>
  );
})

export default AlbumCreateConnection;
