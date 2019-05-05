import { Fragment, h, render } from 'preact';
import Router from 'preact-router';
import { Provider } from "unistore/preact";
import Header from './components/Header.js';
import Login from './components/Login.js';
import Loading from './components/Loading.js';
import Song from './components/Song.js';
import SongList from './components/SongList.js';
import { store } from './store.js';

const Error404 = () => {
  return (
    <h2>Page not found.</h2>
  );
};

render((
  <Provider store={store}>
    <Fragment>
      <Header />
      <Router>
        <SongList path="/" />
        <Login path="/auth/login" />
        <Song path="/song/:id" />
        <Error404 default />
      </Router>
      <Loading />
    </Fragment>
  </Provider>
), document.getElementById('root'));
