import { h, render } from 'preact';
import Router from 'preact-router';
import { Provider } from "unistore/preact";
import Login from './components/Login.js';
import Loading from './components/Loading.js';
import Player from './components/Player.js';
import Sidebar from './components/Sidebar.js';
import Song from './components/Song.js';
import SongList from './components/SongList.js';
import { store } from './store.js';

const Error404 = () => {
  return (
    <h2>Page not found.</h2>
  );
};

render((
  <div class="Container">
    <Provider store={store}>
      <div>
        <Sidebar />
        <Router>
          <SongList path="/" />
          <Login path="/auth/login" />
          <Song path="/song/:id" />
          <Error404 default />
        </Router>
        <Player />
        <Loading />
      </div>
    </Provider>
  </div>
), document.getElementById('root'));
