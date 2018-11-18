import React from 'react';
import { Link } from "react-router-dom";
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
    <div id="songs">
      {data.map(song => (
        <div>
          <Link to={`/song/${song.id}`}>{song.name}</Link>
        </div>
      ))}
    </div>
  );
};

export default SongList;
