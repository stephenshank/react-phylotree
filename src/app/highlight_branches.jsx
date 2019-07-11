import React from "react";

import Phylotree from "./../phylotree.jsx";
import SVG from "./svg.jsx";
import { cd2_relax as newick } from "./data.js";


function HighlightBranches() {
  const url = "https://github.com/d3/d3-scale-chromatic#schemeCategory10";
  return (<div>
    <h1>Highlighted branches</h1>
    <h4>Default</h4>
    <p>Uses <a href={url}>d3.schemeCategory10</a>.</p>
    <SVG>
      <Phylotree
        newick={newick}
        highlightBranches
      />
    </SVG>
    <hr />
    <h4>Custom</h4>
    <p>Requires foreknowledge of annotations.</p>
    <SVG>
      <Phylotree
        newick={newick}
        highlightBranches={{
          Test: "red",
          Reference: "black"
        }}
      />
    </SVG>
  </div>);
}

export default HighlightBranches;
