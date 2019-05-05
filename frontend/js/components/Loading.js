import { h } from "preact";
import { connect } from "unistore/preact";
import { actions } from "../store.js";

const LoadingView = connect(["loading_count"], actions)(scope => {
  return scope.loading_count > 0 && (
    <div className="Loading">Loading...</div>
  );
})

export default LoadingView;
