import React from "react";

import { line } from "d3-shape";


function Branch(props) {
  const { x_scale, y_scale } = props,
    source_x = x_scale(props.link.source.data.x),
    source_y = y_scale(props.link.source.data.y),
    target_x = x_scale(props.link.target.data.x),
    target_y = y_scale(props.link.target.data.y),
    data = [
      [source_x, source_y],
      [source_x, target_y],
      [target_x, target_y]
    ],
    branch_line = line()
      .x(d=>d[0])
      .y(d=>d[1]);
  return (<path
    className="branch"
    d={branch_line(data)}
  />);
}

export default Branch;
