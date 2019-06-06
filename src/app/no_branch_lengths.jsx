import React from "react";

import Phylotree from "./../phylotree.jsx";
import SVG from "./svg.jsx";
import { ksr2 } from "./data.js";


function NoBranchLengths() {
  return (<div>
    <h1>No Branch Lengths</h1>
    <SVG>
      <Phylotree
        newick={ksr2}
      />
    </SVG>
  </div>);
}

export default NoBranchLengths;

