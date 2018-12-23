import Cookies from "js-cookie";

const initialState = {
  error: null,
  loading_count : 0,
  title: null,
  token: Cookies.get("token", null),
  user: null
};

export default function baseReducer(state = initialState, action) {
  switch (action.type) {
    case "AJAX_BEGIN":
      return (function() {
        return Object.assign({}, state, {
          loading_count: state.loading_count + 1
        });
      })();

    case "AJAX_END":
      return (function() {
        return Object.assign({}, state, {
          loading_count: state.loading_count - 1
        });
      })();

    case "AJAX_ERROR":
      return (function() {
        let error = null;
        if (action.error.response.data && action.error.response.data.non_field_errors) {
          error = action.error.response.data.non_field_errors;
        } else {
          error = action.error;
        }
        alert(error);
        console.error("ERROR", error);
        return Object.assign({}, state, {
          error,
          loading_count: state.loading_count - 1
        });
      })();

    case "IS_LOADING":
      return (function() {
        return Object.assign({}, state, {
          loading_count: state.loading_count + (action.is_loading ? 1 : -1)
        });
      })();

    case "LOAD_USER_BEGIN":
      return (function() {
        return Object.assign({}, state, {
          user: null
        });
      })();

    case "LOAD_USER_SUCCESS":
      return (function() {
        return Object.assign({}, state, {
          user: action.json
        });
      })();

    case "LOGIN_SUCCESS":
      return (function() {
        Cookies.set("token", action.json.token);
        return Object.assign({}, state, {
          token: action.json.token
        });
      })();

    case "LOGOUT_SUCCESS":
      return (function() {
        Cookies.remove("token");
        window.location.href = "/";
      })();

    case "VIEW_DASHBOARD":
      return (function() {
        return Object.assign({}, state, {
          title: null
        });
      })();

    case "VIEW_LOGIN":
      return (function() {
        return Object.assign({}, state, {
          loading_count: 0,
          title: "Log In",
          token: null
        });
      })();
  }

  return state;
}
