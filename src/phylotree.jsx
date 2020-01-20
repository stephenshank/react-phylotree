import React from "react";
import { phylotree } from "phylotree";
import { scaleLinear, scaleOrdinal } from "d3-scale";
import { schemeCategory10 } from "d3-scale-chromatic";
import _ from "underscore";

import Branch from "./branch.jsx";
import text_width from "./text_width";


function x_branch_lengths(node) {
  return node.parent ? +node.data.attribute + node.parent.data.abstract_x : 0;
}

function x_no_branch_lengths(node) {
  return node.parent ? node.parent.data.abstract_x + 1 : 0;
}

function placenodes(tree, perform_internal_layout) {
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

  function internal_node_layout(node) {
    unique_id = node.unique_id = unique_id + 1;
    node.data.abstract_x = x_branch_length(node);
    tree.max_x = Math.max(tree.max_x, node.data.abstract_x);
    if(!tree.is_leafnode(node)) {
      node.children.forEach(internal_node_layout);
    }
    if(!node.data.abstract_y && node.data.name != "root") {
      current_leaf_height = node.data.abstract_y = current_leaf_height+1;
      tree.node_order.push(node.data.name);
    }
    if(node.parent && !node.parent.data.abstract_y && node.data.name != "root") {
      if(node.parent.data.name != "root") {
        current_leaf_height = node.parent.data.abstract_y = current_leaf_height+1;
        tree.node_order.push(node.parent.data.name);
      } 
    }
    tree.max_y = Math.max(tree.max_y, current_leaf_height);
  }

  if(perform_internal_layout) {
    tree.max_y = 0;
    tree.node_order = [];
    internal_node_layout(tree.nodes);
    const root = tree.get_node_by_name("root");
    root.data.abstract_y = root.children.map(child => child.data.abstract_y)
      .reduce((a,b)=>a+b, 0) / root.children.length;
  } else {
    node_layout(tree.nodes);
    tree.max_y = current_leaf_height;
  }
}


function getColorScale(tree, highlightBranches) {
  if(!highlightBranches) return null;
  if(typeof highlightBranches === "boolean") {
    return tree.parsed_tags && highlightBranches ? 
      scaleOrdinal().domain(tree.parsed_tags).range(schemeCategory10) :
      null;
  }
  const pairs = _.pairs(highlightBranches);
  return scaleOrdinal()
    .domain(pairs.map(p => p[0]))
    .range(pairs.map(p => p[1]));
}


function Phylotree(props) {
  var{ tree, newick } = props;
  if (!tree && !newick) {
    return <g />;
  } else if(!tree) {
    tree = new phylotree(newick);
  }
  if(!props.skipPlacement) {
    placenodes(tree, props.internalNodeLabels);
  }

  function attachTextWidth(node) {
    node.data.text_width = text_width(node.data.name, 14, props.maxLabelWidth);
    if(node.children) node.children.forEach(attachTextWidth);
  }
  attachTextWidth(tree.nodes);
  const padded_width = props.width - props.paddingLeft - props.paddingRight,
    padded_height = props.height - props.paddingTop - props.paddingBottom,
    sorted_tips = tree.get_tips().sort((a,b) => (
      b.data.abstract_x - a.data.abstract_x
    ));
  var rightmost;
  if (!props.showLabels) rightmost = padded_width;
  else {
    for(let i=0; i < sorted_tips.length; i++) {
      let tip = sorted_tips[i];
      rightmost = padded_width - tip.data.text_width;
      let scale = rightmost / tip.data.abstract_x;
      let none_cross = sorted_tips.map(tip => {
        const tip_x = tip.data.abstract_x * scale,
          text_x = padded_width - tip.data.text_width,
          this_doesnt_cross = Math.floor(tip_x) < Math.ceil(text_x);
        return this_doesnt_cross;
      }).every(x => x);
      if(none_cross) break;
    }
  }
  const x_scale = scaleLinear()
      .domain([0, tree.max_x])
      .range([0, rightmost]),
    y_scale = scaleLinear()
      .domain([0, tree.max_y])
      .range([0, padded_height]),
    color_scale = getColorScale(tree, props.highlightBranches);
  return (<g transform={`translate(${props.paddingLeft}, ${props.paddingTop})`}>
    {tree.links.map(link => {
      const source_id = link.source.unique_id,
        target_id = link.target.unique_id,
        key = source_id + "," + target_id,
        show_label = props.internalNodeLabels ||
          (props.showLabels && tree.is_leafnode(link.target));
      return (<Branch
        key={key}
        xScale={x_scale}
        yScale={y_scale}
        colorScale={color_scale}
        link={link}
        showLabel={show_label}
        maxLabelWidth={props.maxLabelWidth}
        paddedWidth={padded_width}
        alignTips={props.alignTips}
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
  showLabels: true,
  skipPlacement: false,
  maxLabelWidth: 20,
  alignTips: "right"
};

export default Phylotree;
export {
  placenodes
};
