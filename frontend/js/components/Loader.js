import axios from 'axios';
import { cloneElement, Component, h } from "preact";
import { route } from "preact-router";
import { connect } from "unistore/preact";
import { actions } from "../store.js";

class Loader extends Component {
  state = {
    data: null,
    is_loading: false,
    url: null
  };

  componentDidMount() {
    this.fetch();
  }

  componentDidUpdate(prevProps) {
    const { url } = this.props;

    if (url && prevProps.url !== url) {
      this.fetch();
    }
  }

  fetch() {
    const { scope } = this.props;
    let params = {
      method: "GET",
      url: scope.url,
    };

    if (scope.token) {
      params.headers = {
        Authorization: `Token ${scope.token}`,
      };
    }

    this.setState({
      data: null,
      is_loading: true
    });

    axios(params)
      .then(response => {
        if (response.data) {
          this.setState({
            data: response.data,
            is_loading: false
          });
        }
      })
      .catch(error => {
        if (error.response.status === 401) {
          this.props.scope.viewLogin();
          route("/auth/login");
        } else {
          console.error(error);
        }
      });
  }

  render(props, state) {
    const { data, is_loading } = state;
    const { scope } = props;
    const childProps = {
      data,
      is_loading,
      url: scope.url,
    };
    return (
      <div>
        {scope.children.map(child => cloneElement(child, childProps))}
      </div>
    );
  }
}

const LoaderView = connect(["token"], actions)(scope => {
  return (
    <Loader scope={scope} />
  );
})

export default LoaderView;
