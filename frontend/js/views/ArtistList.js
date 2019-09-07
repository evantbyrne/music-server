import { Component, h } from "preact";
import { connect } from "unistore/preact";
import Loader from '../components/Loader';
import Sidebar from '../components/Sidebar';
import UserLoader from '../components/UserLoader';
import { actions } from "../store.js";

class ArtistList extends Component {

  render(props, state) {
    const { data, is_loading, scope } = props;

    if (data === null || is_loading) {
      return null;
    }

    return (
      <div id="artists">
        <div className="ButtonBar -top-bar">
          <a className="Button -right" href="/create/artist/">Create</a>
        </div>
        <div>
          {data.results.artists.map(artist => (
            <a className="Album" href={`/artists/${artist.id}/`} key={`artist-list_${artist.id}`}>
              <div className="Album_main">
                <div className="Album_title">{artist.name}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    );
  }
};

const ArtistListConnection = connect(["loading_count", "user"], actions)(scope => {
  return (
    <div className="Container">
      <Sidebar route="artists" />
      <UserLoader />
      <div className="Container_main">
        <Loader url="/api/artists/">
          <ArtistList scope={scope} />
        </Loader>
      </div>
    </div>
  );
});

export default ArtistListConnection;
