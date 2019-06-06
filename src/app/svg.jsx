import React from "react";

function SVG(props) {
  return (<svg
    width={props.width}
    height={props.height}
    style={{
      borderStyle: props.borderStyle,
      borderWidth: props.borderWidth,
      borderColor: props.borderColor
    }}>
      {props.children}
    </svg>);
}

SVG.defaultProps = {
  width: 500,
  height: 500,
  borderStyle: "solid",
  borderWidth: 1,
  borderColor: "lightgrey"
}

export default SVG;
