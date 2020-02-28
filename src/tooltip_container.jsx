import React from "react";

function TooltipContainer(props) {
  const {
    width, height, tooltip_width, tooltip_height, x, y, data, children
  } = props,
    correct_x = x < width/2 ? x : x - tooltip_width,
    correct_y = y < height/2 ? y : y - tooltip_height;
  return (<g
    transform={`translate(${correct_x}, ${correct_y})`}
  >
    {children}
  </g>);
}

export default TooltipContainer;
