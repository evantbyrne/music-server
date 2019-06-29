import axios from 'axios';
import Cookies from "js-cookie";
import { route } from "preact-router";
import createStore from "unistore";

export let store  = createStore({
  current_song: null,
  error: null,
  loading_count : 0,
  now_playing: [],
  title: null,
  token: Cookies.get("token", null),
  user: null
});

export let actions = (store) => ({

  ajaxBegin: (state) => {
    return {
      loading_count: state.loading_count + 1,
    };
  },

  ajaxEnd: (state) => {
    return {
      loading_count: state.loading_count - 1,
    };
  },

  ajaxError: (state, data) => {
    let error = null;
    if (data.error.response.data && data.error.response.data.non_field_errors) {
      error = data.error.response.data.non_field_errors;
    } else {
      error = data.error;
    }
    alert(error);
    console.error("ERROR", error);
    return {
      error,
      loading_count: state.loading_count - 1
    };
  },

  append: (state, data) => {
    let now_playing = state.now_playing;
    now_playing[now_playing.length] = data.song;
    return {
      now_playing,
    };
  },

  appendAndPlay: (state, data) => {
    let now_playing = state.now_playing;
    now_playing[now_playing.length] = data.song;
    return {
      current_song: now_playing.length - 1,
      now_playing,
    };
  },

  isLoading: (state, data) => {
    return {
      loading_count: state.loading_count + (data.is_loading ? 1 : -1),
    };
  },

  load: (state, { data = null, method, onSuccess = null, scope, token = null, url }) => {
    let params = {
      data,
      method,
      url,
    };
  
    if (token) {
      params.headers = {
        Authorization: `Token ${token}`
      };
    }

    scope.ajaxBegin();
    axios(params)
      .then(response => {
        scope.ajaxEnd();
        if (onSuccess) {
          onSuccess({ json: response.data });
        }
      })
      .catch(error => {
        if (error.response.status === 401) {
          scope.ajaxEnd();
          scope.viewLogin();
          route("/auth/login");
        } else {
          scope.ajaxError({ error, });
        }
      });
  },

  loginSuccess: (state, data) => {
    Cookies.set("token", data.json.token);
    return {
      token: data.json.token,
    };
  },

  logout: () => {
    Cookies.remove("token");
    window.location.href = "/";
  },

  next: (state, data) => {
    const current_song = (state.now_playing.length > (state.current_song + 1)
      ? state.current_song + 1
      : state.current_song);
    return {
      current_song,
    };
  },

  userLoadBegin: () => {
    return {
      user: null,
    };
  },

  userLoadSuccess: (state, data) => {
    return {
      user: data.json,
    };
  },

  viewDashboard: () => {
    return {
      title: null,
    };
  },

  viewLogin: () => {
    return {
      loading_count: 0,
      title: "Log In",
      token: null,
    };
  },

});
