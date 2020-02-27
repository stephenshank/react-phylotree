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

function StyleBranches() {
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
  return (<div>
    <h1>Styled branches</h1>
    <SVG {...size_props}>
      <Phylotree
        newick={newick}
        {...size_props}
        accessor={accessor}
        branchStyler={branchStyler}
      />
    </SVG>
  </div>)
}

export default StyleBranches;
