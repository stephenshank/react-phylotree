import React from "react";
import { phylotree } from "phylotree"
import { scaleLinear } from "d3-scale";

import Phylotree from "../phylotree.jsx";
import SVG from "./svg.jsx";
import aBSRELData from "./data/hiv1_transmission.fna.ABSREL.json";

function accessor(node) {
  const bl = aBSRELData["branch attributes"]["0"][node.data.name]["Baseline MG94xREV"];
  return bl;
}

function ContinuouslyColored() {
  const size_props = { width: 500, height: 500 },
    newick = aBSRELData.input.trees[0],
    branch_dict = aBSRELData["branch attributes"]["0"],
    color_scale = scaleLinear()
      .domain([0, 2])
      .range(["#000000", "#FF0000"]);
  function branchStyler(branch) {
    const name = branch.name,
      omega = branch_dict[name]["Baseline MG94xREV omega ratio"];
    return {
      stroke: color_scale(omega)
    };
  }
  return (<SVG {...size_props}>
    <Phylotree
      newick={newick}
      {...size_props}
      accessor={accessor}
      branchStyler={branchStyler}
    />
  </SVG>)
}

function ThickBranches() {
  const size_props = { width: 500, height: 500 },
    newick = aBSRELData.input.trees[0],
    branch_dict = aBSRELData["branch attributes"]["0"];
  function branchStyler(branch) {
    const name = branch.name,
      p_value = branch_dict[name]["Corrected P-value"];
    return {
      strokeWidth: p_value < .05 ? 5 : 2
    };
  }
  return (<SVG {...size_props}>
    <Phylotree
      newick={newick}
      {...size_props}
      accessor={accessor}
      branchStyler={branchStyler}
    />
  </SVG>)
}

function StyleBranches() {
  return (<div>
    <h1>Styled branches</h1>
    <h2>Continuously colored</h2>
    <ContinuouslyColored />
    <h2>Thick branches</h2>
    <ThickBranches />
  </div>)
}

export default StyleBranches;
export { ContinuouslyColored, ThickBranches };
