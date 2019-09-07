import { h, render } from 'preact';
import Router from 'preact-router';
import { Provider } from "unistore/preact";
import Login from './views/Login.js';
import Loading from './components/Loading.js';
import Player from './components/Player.js';
import { store } from './store.js';
import AlbumAddSongs from './views/AlbumAddSongs.js';
import AlbumCreate from './views/AlbumCreate.js';
import AlbumDelete from './views/AlbumDelete.js';
import AlbumDetail from './views/AlbumDetail.js';
import { AlbumListConnection } from './views/AlbumList.js';
import ArtistCreate from './views/ArtistCreate';
import ArtistDetail from './views/ArtistDetail.js';
import ArtistList from './views/ArtistList.js';
import NowPlaying from './views/NowPlaying.js';
import SongList from './views/SongList.js';

const Error404 = () => {
  return (
    <h2>Page not found.</h2>
  );
};

render((
  <Provider store={store}>
    <div>
      <Router>
        <AlbumAddSongs path="/albums/:albumId/add-songs/" />
        <AlbumDelete path="/albums/:albumId/delete/" />
        <AlbumDetail path="/albums/:albumId/" />
        <AlbumListConnection path="/albums/" />
        <ArtistDetail path="/artists/:artistId/" />
        <ArtistList path="/artists/" />
        <AlbumCreate path="/create/album/" />
        <ArtistCreate path="/create/artist/" />
        <NowPlaying path="/now-playing/" />
        <SongList path="/" />
        <Login path="/auth/login" />
        <Error404 default />
      </Router>
      <Player />
      <Loading />
    </div>
  </Provider>
), document.getElementById('root'));
