import axios from 'axios';
import history from '../history';

export function isLoading(is_loading) {
  return {
    is_loading,
    type: 'IS_LOADING',
  };
};

export function load(token, method, url, type_begin = null, type_success = null, type_error = null, data = {}) {
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

  return dispatch => {
    dispatch(loadBegin('AJAX_BEGIN'));
    if (type_begin) {
      dispatch(loadBegin(type_begin));
    }

    return axios(params)
      .then(response => {
        dispatch(loadBegin('AJAX_END'));
        if (type_success) {
          dispatch(loadSuccess(type_success, response.data));
        }
      })
      .catch(error => {
        if (error.response.status === 401) {
          dispatch(loadBegin('AJAX_END'));
          return dispatch(view("/auth/login", "VIEW_LOGIN"));
        }
        dispatch(loadError('AJAX_ERROR', error));
        if (type_error) {
          dispatch(loadError(type_error, error));
        }
      });
  };
}

export function loadBegin(type) {
  return {
    type
  };
}

export function loadSuccess(type, json) {
  return {
    type,
    json
  };
}

export function loadError(type, error) {
  return {
    type,
    error
  };
}

export function view(path, type = 'VIEW') {
  console.log(path, type);
  history.push(path);
  return {
    type
  };
}
