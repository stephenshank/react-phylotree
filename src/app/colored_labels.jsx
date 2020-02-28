import React from "react";
import { phylotree } from "phylotree"
import { scaleLinear } from "d3-scale";

import Phylotree from "../phylotree.jsx";
import SVG from "./svg.jsx";
import aBSRELData from "./data/hiv1_transmission.fna.ABSREL.json";

const newick = '((((((((((C012-S1_23_1,C012-S1_28_1),((C012-B2_53_1,C012-S1_19_1),C012-B2_79_1)),(((C012-S1_11_1,C012-S1_10_1),C012-S1_9_1),(C012-S1_7_1,C012-S1_8_1))),C012-S1_25_2),(((C012-B2_76_1,C012-B2_75_2),(C012-B2_74_1,C012-S1_26_1)),(((C012-S1_34_1,C012-S1_33_1),(C012-B2_65_1,C012-B2_64_1)),((((C012-S1_13_1,C012-S1_14_1),(C012-B2_37_1,C012-S1_12_1)),C012-S1_32_1),(((C012-B2_45_1,C012-S1_20_1),C012-B2_47_1),C012-S1_22_1))))),((((((((((C012-B2_7_1,C012-B2_9_1),C012-B1_1_1),C012-B2_3_1),((((((C012-B2_25_1,C012-B2_28_1),(C012-B2_22_1,C012-B2_21_1)),C012-B2_30_1),C012-B1_2_1),C012-B2_23_1),((C012-B2_11_1,C012-B2_13_1),C012-B2_14_1))),(C012-B2_1_1,C012-B2_2_1)),C012-B2_33_1),C012-S1_3_1),((C012-S1_6_1,C012-S1_5_1),(C012-B2_36_1,C012-S1_4_1))),((((C012-S1_16_1,C012-B2_52_1),C012-S1_15_1),(((C012-B2_49_1,C012-B2_48_2),C012-S1_18_4),C012-S1_17_2)),C012-B2_81_1)),(C012-B2_54_1,C012-B2_56_1))),((C012-S1_24_1,C012-S1_21_2),C012-S1_29_1)),(C012-B2_70_1,C012-S1_27_1)),C012-B2_72_1),C012-S1_30_1,C012-S1_31_1a)';

function labelStyler(branch) {
  const identifier = branch.name.split('-')[1][0],
    fill = identifier == 'S' ? 'red' : 'blue';
  return { fill };
}

function ColoredLabels() {
  const size_props = { width: 500, height: 900 };
  return (<SVG {...size_props}>
    <Phylotree
      newick={newick}
      {...size_props}
      labelStyler={labelStyler}
    />
  </SVG>)
}

function ColoredLabelsExample() {
  return (<div>
    <h1>Colored Labels</h1>
    <ColoredLabels />
  </div>)
}

export default ColoredLabelsExample;
export { ColoredLabels };
