import React from 'react';

class ContextMenu extends React.Component {
  render() {
    const style = {
      bottom: this.props.bottom || "auto",
      left: this.props.left || "auto",
      right: this.props.right || "auto",
      top: this.props.top || "auto"
    };

    return (
      <div className="ContextMenu" style={style}>{this.props.children}</div>
    );
  }
}

export default ContextMenu;
