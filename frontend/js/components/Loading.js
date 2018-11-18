import React from 'react';
import { connect } from 'react-redux';

class Loading extends React.Component {
  render() {
    return this.props.is_loading && (
      <div className="Loading">Loading...</div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    is_loading: state.base.loading_count > 0
  };
}

export default connect(
  mapStateToProps,
  null
)(Loading);
