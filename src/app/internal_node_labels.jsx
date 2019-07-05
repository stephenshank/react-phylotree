import React from "react";

import Phylotree from "./../phylotree.jsx";
import SVG from "./svg.jsx";

const newick = "((((((HUM,PAN)Node6,GOR)Node5,PON)Node4,GIB)Node3,(MAC,BAB)Node12)Node2,MAR,BUS);";

function InternalNodeLabels() {
  return (<div>
    <h1>Internal Node Labels</h1>
    <SVG>
      <Phylotree
        newick={newick}
        internalNodeLabels
      />
    </SVG>
  </div>);
}

export default InternalNodeLabels;
