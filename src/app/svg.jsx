import React from "react";

function SVG(props) {
  const { width, height, padding } = props,
    new_props = {
      width: width - 2*padding,
      height: height - 2*padding,
      transform: `translate(${padding}, ${padding})`
    };
  return (<svg
    width={width}
    height={height}
    style={{
      borderStyle: props.borderStyle,
      borderWidth: props.borderWidth,
      borderColor: props.borderColor
    }}>
      {React.cloneElement(props.children, new_props)}
    </svg>);
}

SVG.defaultProps = {
  width: 500,
  height: 500,
  padding: 10,
  borderStyle: "solid",
  borderWidth: 1,
  borderColor: "lightgrey"
}

export default SVG;
