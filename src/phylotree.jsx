import React, { Component } from "react";
import { scaleLinear } from "d3-scale";

import Branch from "./branch.jsx";

import "phylotree/phylotree.css";

import "./styles/phylotree.css";

function Phylotree(props) {
  const { tree } = props;
  if (!tree) return <g />;
  const x_scale = scaleLinear()
      .domain([0, tree.max_x])
      .range([1, props.width-1]),
    y_scale = scaleLinear()
      .domain([0, 10])
      .range([1, props.height-1]);
  return (<g>
    {tree.links.map(link => {
      const source_id = link.source.unique_id,
        target_id = link.target.unique_id,
        key = source_id + "," + target_id;
      return (<Branch
        key={key}
        x_scale={x_scale}
        y_scale={y_scale}
        link={link}
      />);
    }) }
  </g>);
}

export default Phylotree;
