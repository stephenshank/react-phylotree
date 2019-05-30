import React from "react";
import { scaleLinear } from "d3-scale";
import text_width from "text-width";

import Branch, { Tracer } from "./branch.jsx";

import "phylotree/build/phylotree.css";

import "./styles/phylotree.css";

function placenodes(tree) {
  var current_leaf_height = -1,
    unique_id = 0;
  tree.max_x = 0;
  function node_layout(node) {
    unique_id = node.unique_id = unique_id + 1;
    node.data.x = node.parent  ?
      +node.data.attribute + node.parent.data.x :
      0;
    tree.max_x = Math.max(tree.max_x, node.data.x);
    if(node.children) {
      node.data.y = node.children.map(node_layout)
        .reduce( (a,b) => a + b, 0) / node.children.length;
    } else {
      current_leaf_height = node.data.y = current_leaf_height+1;
    }
    return node.data.y;
  }
  node_layout(tree.nodes);
}

function placenodes_internal(tree) {
  var current_leaf_height = -1,
    unique_id = 0;
  tree.max_x = 0;
  tree.max_y = 0;
  tree.node_order = [];
  function node_layout(node) {
    unique_id = node.unique_id = unique_id + 1;
    node.data.x = node.parent  ?
      node.parent.data.x + 1 :
      0;
    tree.max_x = Math.max(tree.max_x, node.data.x);
    if(!tree.is_leafnode(node)) {
      node.children.forEach(node_layout);
    }
    if(!node.data.y && node.data.name != "root") {
      current_leaf_height = node.data.y = current_leaf_height+1;
      tree.node_order.push(node.data.name);
    }
    if(node.parent && !node.parent.data.y && node.data.name != "root") {
      if(node.parent.data.name != "root") {
        current_leaf_height = node.parent.data.y = current_leaf_height+1;
        tree.node_order.push(node.parent.data.name);
      } 
    }
    tree.max_y = Math.max(tree.max_y, current_leaf_height);
  }
  node_layout(tree.nodes);
  const root = tree.get_node_by_name("root");
  root.data.y = root.children.map(child => child.data.y)
    .reduce((a,b)=>a+b, 0) / root.children.length;
}

function Phylotree(props) {
  const { tree } = props;
  if (!tree) return <g />;
  const text_offset = tree.get_tips()
      .map(node => text_width(node.data.name, { family: "Courier", size: 14 }))
      .reduce((a,b) => Math.max(a,b), 0),
    padded_width = props.width - props.paddingLeft - props.paddingRight,
    padded_height = props.height - props.paddingTop - props.paddingBottom,
    max_x = padded_width - text_offset,
    x_scale = scaleLinear()
      .domain([0, tree.max_x])
      .range([0, max_x]),
    y_scale = scaleLinear()
      .domain([0, tree.max_y])
      .range([0, padded_height]),
    translation = `${props.paddingLeft}, ${props.paddingTop}`,
    tracer_props = {
      x1: x_scale(tree.nodes.data.x),
      x2: padded_width,
      y: y_scale(tree.nodes.data.y)
    };
  return (<g transform={`translate(${translation})`}>
    {tree.links.map(link => {
      const source_id = link.source.unique_id,
        target_id = link.target.unique_id,
        key = source_id + "," + target_id;
      return (<Branch
        key={key}
        x_scale={x_scale}
        y_scale={y_scale}
        link={link}
        width={padded_width}
        leaf={tree.is_leafnode(link.target)}
      />);
    }) }
  </g>);
}

Phylotree.defaultProps = {
  width: 500,
  height: 500,
  paddingTop: 10,
  paddingBottom: 10,
  paddingLeft: 10,
  paddingRight: 10
};

export default Phylotree;
export { placenodes_internal };
