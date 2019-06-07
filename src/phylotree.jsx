import React from "react";
import { phylotree } from "phylotree";
import { scaleLinear } from "d3-scale";
import text_width from "./text_width";

import Branch from "./branch.jsx";

import "phylotree/build/phylotree.css";

import "./styles/phylotree.css";

function x_branch_lengths(node) {
  return node.parent ? +node.data.attribute + node.parent.data.abstract_x : 0;
}

function x_no_branch_lengths(node) {
  return node.parent ? node.parent.data.abstract_x + 1 : 0;
}

function placenodes(tree) {
  var current_leaf_height = -1,
    unique_id = 0;
  tree.max_x = 0;
  const has_branch_lengths = Boolean(tree.get_tips()[0].data.attribute),
    x_branch_length = has_branch_lengths ? x_branch_lengths : x_no_branch_lengths;
  function node_layout(node) {
    if(!node.unique_id) {
      unique_id = node.unique_id = unique_id + 1;
    }
    node.data.abstract_x = x_branch_length(node);
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
  tree.max_y = current_leaf_height;
}


function Phylotree(props) {
  var{ tree, newick } = props;
  if (!tree && !newick) {
    return <g />;
  } else if(!tree) {
    tree = new phylotree(newick);
  }
  placenodes(tree);
  const text_offset = props.show_labels ? tree.get_tips()
      .map(node => text_width(node.data.name, 14))
      .reduce((a,b) => Math.max(a,b), 0) : 0,
    padded_width = props.width - props.paddingLeft - props.paddingRight,
    padded_height = props.height - props.paddingTop - props.paddingBottom,
    x_scale = scaleLinear()
      .domain([0, tree.max_x])
      .range([0, padded_width-text_offset]),
    y_scale = scaleLinear()
      .domain([0, tree.max_y])
      .range([0, padded_height]);
  return (<g transform={`translate(${props.paddingLeft}, ${props.paddingTop})`}>
    {tree.links.map(link => {
      const source_id = link.source.unique_id,
        target_id = link.target.unique_id,
        key = source_id + "," + target_id;
      return (<Branch
        key={key}
        x_scale={x_scale}
        y_scale={y_scale}
        link={link}
        max_branch_width={padded_width}
        leaf={tree.is_leafnode(link.target)}
        show_label={props.show_labels}
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
  paddingRight: 10,
  show_labels: true
};

export default Phylotree;
export {
  placenodes
};
