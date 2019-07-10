import React from "react";

import Phylotree from "./../phylotree.jsx";
import SVG from "./svg.jsx";
import { cd2_relax as newick } from "./data.js";


function HighlightBranches() {
  return (<div>
    <h1>Highlighted branches</h1>
    <SVG>
      <Phylotree
        newick={newick}
        highlightBranches
      />
    </SVG>
  </div>);
}

export default HighlightBranches;
