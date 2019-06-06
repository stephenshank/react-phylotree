import React from "react";

import Phylotree from "./../phylotree.jsx";
import SVG from "./svg.jsx";
import { yokoyama } from "./data.js";


function MWE() {
  return (<div>
    <h1>Minimal Working Example</h1>
    <SVG>
      <Phylotree
        newick={yokoyama}
      />
    </SVG>
  </div>);
}

export default MWE;

