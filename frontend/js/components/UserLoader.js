import { Component, h } from "preact";
import { connect } from "unistore/preact";
import { actions } from "../store.js";

class UserLoader extends Component {

  static getDerivedStateFromProps(props, state) {
    const { scope } = props;
    if (scope.loading_count === 0 && !scope.user) {
      scope.userLoadBegin();
      scope.load({
        method: "get",
        onSuccess: scope.userLoadSuccess,
        scope,
        url: "/api/auth/user/",
      });
    }

    return state;
  }
}

const UserLoaderConnection = connect(["loading_count", "user"], actions)(scope => {
  return (
    <UserLoader scope={scope} />
  );
})

export default UserLoaderConnection;
