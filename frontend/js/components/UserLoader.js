import { Component, h } from "preact";
import { connect } from "unistore/preact";
import { actions } from "../store.js";

class UserLoader extends Component {

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
}

const UserLoaderConnection = connect(["loading_count", "path", "token", "user"], actions)(scope => {
  return (
    <UserLoader scope={scope} />
  );
})

export default UserLoaderConnection;
