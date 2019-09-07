import { Component, h } from "preact";
import { route } from "preact-router";
import { connect } from "unistore/preact";
import Sidebar from '../components/Sidebar';
import { actions } from "../store.js";

class ArtistCreate extends Component {
  state = {
    errors: {
      name: false,
    },
    name: "",
  };

  componentDidMount() {
    this.setState({
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
    const { name } = this.state;

    this.setState({
      errors: {
        name: !name,
      },
    });

    if (!name) {
      return;
    }

    const data = new FormData();
    data.append("name", name);

    scope.load({
      data,
      method: "post",
      onSuccess: (data) => {
        const { id } = data.json.results.artist;
        route(`/artists/${id}/`);
      },
      scope,
      url: "/api/artists/create/",
    });
  }

  render(props, state) {
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
        <button className="Button -primary"
          disabled={false}
          onClick={this.onSubmit}>Create</button>
      </form>
    );
  }
}

const ArtistCreateConnection = connect([], actions)(scope => {
  return (
    <div className="Container">
      <Sidebar route="create.artists" />
      <div className="Container_main">
        <ArtistCreate scope={scope} />
      </div>
    </div>
  );
})

export default ArtistCreateConnection;
