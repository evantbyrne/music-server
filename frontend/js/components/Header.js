import React from "react";
import { connect } from "react-redux";
import ContextMenu from './ContextMenu';
import ContextMenuLink from './ContextMenuLink';
import { load, view } from '../actions/baseActions';

class Header extends React.Component {
  static getDerivedStateFromProps(props, state) {
    if (!props.is_loading && !props.user && props.token) {
      props.loadUser(props.token);
    }

    return state;
  }

  state = {
    is_context_menu: false
  };

  onContextMenu = (event) => {
    event.preventDefault();
    this.setState({
      is_context_menu: !this.state.is_context_menu
    });
  };

  onview = (event) => {
    event.preventDefault();
    this.props.view("/", "VIEW_DASHBOARD");
  }

  onLogOut = (event) => {
    event.preventDefault();
    this.props.logOut(this.props.token);
  };

  render() {
    if (!this.props.token) {
      return null;
    }

    return (
      <header className="Header">
        <nav className="Header_nav">
          <a className="Header_nav-link" href="/" id="HeaderNav_dashboard" onClick={this.onview}>Dashboard</a>
          {this.props.user && (
            <a className="Header_nav-link-right"
              id="HeaderNav_user"
              href="#"
              onClick={this.onContextMenu}>
              <u>{this.props.user.username}</u> <span>{this.state.is_context_menu ? "↑" : "↓"}</span>
            </a>
          )}
        </nav>
        {this.state.is_context_menu && (
          <ContextMenu right={20} top={30}>
            <ContextMenuLink id="ContextMenu_logout" onClick={this.onLogOut}>Log Out</ContextMenuLink>
          </ContextMenu>
        )}
      </header>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    is_loading: state.base.loading_count > 0,
    token: state.base.token,
    user: state.base.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadUser: function(token) {
      dispatch(
        load(
          token,
          "get",
          "/auth/user/?format=json",
          "LOAD_USER_BEGIN",
          "LOAD_USER_SUCCESS"
        )
      );
    },

    logOut: function(token) {
      dispatch(
        load(
          token,
          "get",
          "/auth/logout/?format=json",
          "LOGOUT_BEGIN",
          "LOGOUT_SUCCESS"
        )
      );
    },

    view: function() {
      dispatch(view("/", "VIEW_DASHBOARD"));
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
