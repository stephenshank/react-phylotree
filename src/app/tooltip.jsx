import React from "react";
import { phylotree } from "phylotree"
import { scaleLinear } from "d3-scale";

import Phylotree from "../phylotree.jsx";
import SVG from "./svg.jsx";
import TooltipContainer from "../tooltip_container.jsx";
import aBSRELData from "./data/hiv1_transmission.fna.ABSREL.json";

function TooltipContents(props) {
  return (<TooltipContainer 
    tooltip_width={200}
    tooltip_height={100}
    {...props}
  >
    <rect
      x={0}
      y={0}
      width={200}
      height={100}
      rx={15}
      fill='black'
    />
    <text
      x={100}
      y={50}
      fill="white"
      textAnchor="middle"
    >
      {props.data.name}
    </text>
  </TooltipContainer>);
}

function Tooltip() {
  const size_props = { width: 500, height: 900 };
  return (<SVG {...size_props}>
    <Phylotree
      newick={aBSRELData.input.trees[0]}
      tooltip={TooltipContents}
      {...size_props}
      branchStyler={()=>({strokeWidth:7})}
    />
  </SVG>)
}

function TooltipExample() {
  return (<div>
    <h1>Tooltip</h1>
    <p>Hover over a branch for a description of associated parameters.</p>
    <Tooltip />
  </div>)
}

export default TooltipExample;
export { Tooltip };
