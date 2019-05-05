import { h } from 'preact';

const ContextMenuLink = (props) => {
  return (
    <a className="ContextMenu_link"
      href="#"
      id={props.id || false}
      onClick={props.onClick}>{props.children}</a>
  );
}

export default ContextMenuLink;
