import { h } from "preact";
import IconAdd from '../components/IconAdd';
import IconPlay from '../components/IconPlay';

const Song = (props) => {
  const isActive = props.isActive || false;
  const isPlaying = props.isPlaying || false;

  return (
    <div className={`Song ${isPlaying ? '-playing' : ''}`}>
      {!isPlaying && (
        <a className="Song_play" onClick={props.onPlay}>
          <IconPlay />
        </a>
      )}
      <a className={`Song_add ${isActive || isPlaying ? '-active' : ''}`} onClick={props.onAdd}>
        <IconAdd />
      </a>
      <div className="Song_title">{props.name}</div>
    </div>
  );
}

export default Song;
