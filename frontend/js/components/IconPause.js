import { h } from "preact";

const IconPause = (props) => {
  return (
    <svg className={props.classes} width="14px" height="13px" viewBox="0 0 14 13" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <g stroke="none" stroke-width="1" fill-rule="evenodd">
        <g transform="translate(-260.000000, -861.000000)" fill="inherit" id="play-bar">
          <g transform="translate(7.000000, 839.000000)">
            <g transform="translate(245.000000, 13.000000)">
              <g transform="translate(8.000000, 9.000000)">
                <rect x="0" y="0" width="5" height="13"></rect>
                <rect x="9" y="0" width="5" height="13"></rect>
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}

export default IconPause;
