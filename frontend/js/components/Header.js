import { Component, h } from "preact";
import { route } from "preact-router";
import { connect } from "unistore/preact";
import ContextMenu from "./ContextMenu.js";
import ContextMenuLink from "./ContextMenuLink.js";
import { actions } from "../store.js";

class Header extends Component {
  static getDerivedStateFromProps(props, state) {
    const { scope } = props;
    if (scope.loading_count === 0 && !scope.user && scope.token) {
      scope.userLoadBegin();
      scope.load({
        method: "get",
        onSuccess: scope.userLoadSuccess,
        scope,
        token: scope.token,
        url: "/auth/user/?format=json",
      });
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
    this.props.scope.viewDashboard();
    route("/");
  };

  onLogOut = (event) => {
    event.preventDefault();
    this.props.scope.logout();
  };

  render(props, state) {
    if (!props.scope.token) {
      return null;
    }

    return (
      <header className="Header">
        <nav className="Header_nav">
          <a className="Header_nav-link" href="/" id="HeaderNav_dashboard" onClick={this.onview}>Dashboard</a>
          {props.scope.user && (
            <a className="Header_nav-link-right"
              id="HeaderNav_user"
              href="#"
              onClick={this.onContextMenu}>
              <u>{props.scope.user.username}</u> <span>{state.is_context_menu ? "↑" : "↓"}</span>
            </a>
          )}
        </nav>
        {state.is_context_menu && (
          <ContextMenu right={20} top={30}>
            <ContextMenuLink id="ContextMenu_logout" onClick={this.onLogOut}>Log Out</ContextMenuLink>
          </ContextMenu>
        )}
      </header>
    );
  }
}

const HeaderView = connect(["loading_count", "token", "user"], actions)(scope => {
  return (
    <Header scope={scope} />
  );
})

export default HeaderView;
