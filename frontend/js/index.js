import { h, render } from 'preact';
import Router from 'preact-router';
import { Provider } from "unistore/preact";
import Login from './views/Login.js';
import Loading from './components/Loading.js';
import Player from './components/Player.js';
import UserLoader from './components/UserLoader';
import { store } from './store.js';
import AlbumDetail from './views/AlbumDetail.js';
import AlbumList from './views/AlbumList.js';
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
      <UserLoader />
      <Router>
        <AlbumDetail path="/albums/:albumId/" />
        <AlbumList path="/albums/" />
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
