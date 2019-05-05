import { h } from 'preact';

const ContextMenu = (props) => {
  const style = {
    bottom: props.bottom || "auto",
    left: props.left || "auto",
    right: props.right || "auto",
    top: props.top || "auto"
  };

  return (
    <div className="ContextMenu" style={style}>{props.children}</div>
  );
}

export default ContextMenu;
