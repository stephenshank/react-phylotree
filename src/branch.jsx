import React from "react";
import text_width from "text-width";

import { line } from "d3-shape";


function Tracer(props) {
  return (<line
    x1={props.x1}
    x2={props.x2}
    y1={props.y}
    y2={props.y}
    className="branch-tracer"
  />);
}


function Branch(props) {
  const { x_scale, y_scale, width } = props,
    { source, target } = props.link,
    source_x = x_scale(source.data.x),
    source_y = y_scale(source.data.y),
    target_x = x_scale(target.data.x),
    target_y = y_scale(target.data.y),
    text_label_width = text_width(
      target.data.name, { family: "Courier", size: 14}
    ),
    tracer_x2 = width - text_label_width - (text_label_width == 0 ? 0 :5),
    data = [
      [source_x, source_y],
      [source_x, target_y],
      [target_x, target_y]
    ],
    branch_line = line()
      .x(d=>d[0])
      .y(d=>d[1]);
  return (<g>
    <path
      className="branch"
      d={branch_line(data)}
    />
    {<Tracer x1={target_x} x2={tracer_x2} y={target_y} />}
    {props.leaf ? <text
      x={width}
      y={target_y}
      textAnchor="end"
      alignmentBaseline="middle"
      className="label"
    >{target.data.name}</text> : null}
  </g>);
}

export default Branch;
export { Tracer };
