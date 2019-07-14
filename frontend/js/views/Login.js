import { Component, h } from "preact";
import { route } from "preact-router";
import { connect } from "unistore/preact";
import { actions } from "../store.js";

class Login extends Component {
  state = {
    password: "",
    username: "",
  };

  static getDerivedStateFromProps(props, state) {
    if (props.scope.token) {
      props.scope.viewDashboard();
      route("/");
    }

    return state;
  }

  componentDidMount() {
    this.setState({
      password: "",
      username: "",
    });

    if (this.props.scope.loading_count > 0) {
      this.props.scope.isLoading(false);
    }
  }

  mutate(event, key) {
    const obj = {};
    obj[key] = event.target.value;
    this.setState(obj);
  }

  onLogin = (event) => {
    event.preventDefault();
    const { scope } = this.props;
    const data = {
      username: this.state.username,
      password: this.state.password,
    };
    scope.load({
      data,
      method: "post",
      onSuccess: scope.loginSuccess,
      scope,
      url: "/api/token/",
    });
  }

  render(props, state) {
    const mutate = this.mutate.bind(this);

    return (
      <div className="Login">
        <form className="Login_container" onSubmit={this.onLogin}>
          <label class="Input">
            <div class="Input_label">Username</div>
            <input className="Input_field"
              name="username"
              onChange={(e) => mutate(e, 'username')}
              placeholder="…"
              value={state.username} />
          </label>
          <label class="Input">
            <div class="Input_label">Password</div>
            <input className="Input_field"
              name="password"
              onChange={(e) => mutate(e, 'password')}
              placeholder="…"
              type="password"
              value={state.password} />
          </label>
          <button className="Button -primary"
            disabled={false}
            onClick={this.onLogin}>Sign In</button>
        </form>
      </div>
    );
  }
}

const LoginConnection = connect(["loading_count", "token"], actions)(scope => {
  return (
    <Login scope={scope} />
  );
})

export default LoginConnection;
