import React from "react";
import text_width from "./text_width";

import { line } from "d3-shape";


function Branch(props) {
  const { xScale, yScale, colorScale, maxBranchWidth, showLabel } = props,
    { source, target } = props.link,
    source_x = xScale(source.data.abstract_x),
    source_y = yScale(source.data.abstract_y),
    target_x = xScale(target.data.abstract_x),
    target_y = yScale(target.data.abstract_y),
    text_label_width = text_width(target.data.name, 14, props.maxLabelWidth),
    tracer_x2 = maxBranchWidth - text_label_width - 5,
    data = [
      [source_x, source_y],
      [source_x, target_y],
      [target_x, target_y]
    ],
    branch_line = line()
      .x(d=>d[0])
      .y(d=>d[1]),
    branch_style = target.data.annotation && colorScale ? {
      stroke: colorScale(target.data.annotation)
    } : undefined;
  return (<g className="node">
    <path
      className="branch"
      d={branch_line(data)}
      style={branch_style}
    />
    {showLabel ? <line
      x1={target_x}
      x2={tracer_x2}
      y1={target_y}
      y2={target_y}
      className="branch-tracer"
    /> : null}
    {showLabel ? <text
      x={maxBranchWidth}
      y={target_y}
      textAnchor="end"
      alignmentBaseline="middle"
      className="label"
    >{target.data.name.slice(0, props.maxLabelWidth)}</text> : null}
  </g>);
}

export default Branch;
