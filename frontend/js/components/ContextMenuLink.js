import React from 'react';

class ContextMenuLink extends React.Component {
  render() {
    return (
      <a className="ContextMenu_link"
        href="#"
        id={this.props.id || false}
        onClick={this.props.onClick}>{this.props.children}</a>
    );
  }
}

export default ContextMenuLink;
