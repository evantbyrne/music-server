import { Component, h } from "preact";
import { route } from "preact-router";
import { connect } from "unistore/preact";
import Loader from '../components/Loader';
import Sidebar from '../components/Sidebar';
import { actions } from "../store.js";

class AlbumDelete extends Component {

  onConfirm = (event) => {
    event.preventDefault();
    const { scope } = this.props;
    scope.load({
      method: "post",
      onSuccess: () => {
        route("/albums/");
      },
      scope,
      url: `/api/albums/${scope.albumId}/delete/`,
    });
  }

  render(props, state) {
    const { data, is_loading, scope } = props;

    if (data === null || is_loading) {
      return null;
    }

    return (
      <div className="Login">
        <form className="Login_container" onSubmit={this.onLogin}>
          <p className="Login_paragraph">Are you sure you want to delete {data.results.album.name}?</p>
          <div className="ButtonBar">
            <a className="Button" href={`/albums/${scope.albumId}/`}>No, Do Not Delete</a>
            <button className="Button -danger -right"
              disabled={false}
              onClick={this.onConfirm}>Yes, Delete</button>
          </div>
        </form>
      </div>
    );
  }
}

const AlbumDeleteConnection = connect([], actions)(scope => {
  return (
    <div className="Container">
      <Sidebar route="upload" />
      <div className="Container_main">
        <Loader url={`/api/albums/${scope.albumId}/`}>
          <AlbumDelete scope={scope} />
        </Loader>
      </div>
    </div>
  );
})

export default AlbumDeleteConnection;
