import React from "react";
import text_width from "./text_width";

import { line } from "d3-shape";


function Branch(props) {
  const { x_scale, y_scale, max_branch_width } = props,
    { source, target } = props.link,
    source_x = x_scale(source.data.abstract_x),
    source_y = y_scale(source.data.abstract_y),
    target_x = x_scale(target.data.abstract_x),
    target_y = y_scale(target.data.abstract_y),
    text_label_width = text_width(target.data.name, 14),
    tracer_x2 = max_branch_width - text_label_width - 5,
    data = [
      [source_x, source_y],
      [source_x, target_y],
      [target_x, target_y]
    ],
    branch_line = line()
      .x(d=>d[0])
      .y(d=>d[1]);
  return (<g className="node">
    <path
      className="branch"
      d={branch_line(data)}
    />
    {props.show_label && props.leaf ? <line
      x1={target_x}
      x2={tracer_x2}
      y1={target_y}
      y2={target_y}
      className="branch-tracer"
    /> : null}
    {props.show_label && props.leaf ? <text
      x={max_branch_width}
      y={target_y}
      textAnchor="end"
      alignmentBaseline="middle"
      className="label"
    >{target.data.name}</text> : null}
  </g>);
}

export default Branch;
