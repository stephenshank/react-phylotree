import React from "react";
import { scaleLinear } from "d3-scale";

import Branch from "./branch.jsx";

import "phylotree/build/phylotree.css";

import "./styles/phylotree.css";

function placenodes(tree) {
  var current_leaf_height = -1,
    unique_id = 0;
  tree.max_x = 0;
  function node_layout(node) {
    if(!node.unique_id) {
      unique_id = node.unique_id = unique_id + 1;
    }
    node.data.abstract_x = node.parent  ?
      +node.data.attribute + node.parent.data.abstract_x :
      0;
    tree.max_x = Math.max(tree.max_x, node.data.abstract_x);
    if(node.children) {
      node.data.abstract_y = node.children.map(node_layout)
        .reduce( (a,b) => a + b, 0) / node.children.length;
    } else {
      current_leaf_height = node.data.abstract_y = current_leaf_height+1;
    }
    return node.data.abstract_y;
  }
  node_layout(tree.nodes);
}


function Phylotree(props) {
  const { tree } = props;
  if (!tree) return <g />;
  placenodes(tree);
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

Phylotree.defaultProps = {
  width: 500,
  height: 500
};

export default Phylotree;
