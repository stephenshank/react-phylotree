import React from "react";

import Phylotree from "./../phylotree.jsx";
import SVG from "./svg.jsx";
import { yokoyama } from "./data.js";


function Vanilla() {
  return (<div>
    <h1>Vanilla</h1>
    <SVG>
      <Phylotree
        newick={yokoyama}
        paddingTop={1}
        paddingBottom={1}
        paddingLeft={0}
        paddingRight={0}
        show_labels={false}
      />
    </SVG>
  </div>);
}

export default Vanilla;
