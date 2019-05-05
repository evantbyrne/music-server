import { h } from "preact";
import Loader from './Loader';

const SongList = () => {
  return (
    <Loader url="/api/songs.json">
      <SongListLoaded />
    </Loader>
  );
};

const SongListLoaded = (props) => {
  const { data, is_loading } = props;

  if (data === null || is_loading) {
    return null;
  }

  return (
    <div>
      <h2>Songs</h2>
      <div id="songs">
        {data.map(song => (
          <div>
            <a href={`/song/${song.id}`}>{song.name}</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SongList;
