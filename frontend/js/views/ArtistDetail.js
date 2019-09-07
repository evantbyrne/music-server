import { Component, h } from "preact";
import { connect } from "unistore/preact";
import { AlbumList } from './AlbumList.js';
import Loader from '../components/Loader';
import Sidebar from '../components/Sidebar';
import UserLoader from '../components/UserLoader';
import { actions } from "../store.js";

class ArtistDetail extends Component {

  render(props, state) {
    const { data, is_loading, scope } = props;

    if (data === null || is_loading) {
      return null;
    }

    const { artist } = data.results;
    const albumListData = {
      results: {
        albums: artist.albums,
      },
    };

    return (
      <div id="artists-detail">
        <div className="Album">
          <div className="Album_main">
            <div className="Album_title">{artist.name}</div>
          </div>
        </div>
        <AlbumList data={albumListData} is_loading={false} scope={scope} />
      </div>
    );
  }
};

const ArtistDetailConnection = connect(["loading_count", "user"], actions)(scope => {
  return (
    <div className="Container">
      <Sidebar route="artists" />
      <UserLoader />
      <div className="Container_main">
        <Loader url={`/api/artists/${scope.artistId}/`}>
          <ArtistDetail scope={scope} />
        </Loader>
      </div>
    </div>
  );
});

export default ArtistDetailConnection;
