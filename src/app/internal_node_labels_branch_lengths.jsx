import React from "react";

import Phylotree from "./../phylotree.jsx";
import SVG from "./svg.jsx";
import { h3 } from "./data";


function InternalNodeLabelsBranchLengths() {
  const size_props = { width: 900, height: 3500};
  return (<div>
    <h1>Internal Node Labels and Branch Lengths</h1>
    <SVG {...size_props}>
      <Phylotree
        newick={h3}
        {...size_props}
        internalNodeLabels
      />
    </SVG>
  </div>);
}

export default InternalNodeLabelsBranchLengths;

