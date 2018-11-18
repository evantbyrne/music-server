import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { view } from '../actions/baseActions';

class Loader extends React.Component {
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
    const { dispatch, url, token } = this.props;
    const params = {
      method: "GET",
      url
    };

    if (token) {
      params.headers = {
        Authorization: `Token ${token}`
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
          dispatch(view("/auth/login", "VIEW_LOGIN"));
        } else {
          console.error(error);
        }
      });
  }

  render() {
    const { data, is_loading } = this.state;
    const { children, url } = this.props;
    const child_props = {
      data,
      is_loading,
      url
    };
    return (
      <React.Fragment>
        {React.Children.map(children, child =>
          React.cloneElement(child, child_props)
        )}
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    token: state.base.token
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Loader);
