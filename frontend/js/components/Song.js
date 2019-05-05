import { h } from "preact";
import Loader from './Loader';

const Song = (props) => {
  return (
    <Loader url={`/api/songs/${props.id}.json`}>
      <SongLoaded />
    </Loader>
  );
};

const SongLoaded = (props) => {
  const { data, is_loading } = props;

  if (data === null || is_loading) {
    return null;
  }

  return (
    <div>
      <h2>{data.name}</h2>
      <div id="song">
        <audio controls src={data.file}></audio>
      </div>
    </div>
  );
};

export default Song;
