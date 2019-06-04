import React from "react";

import Phylotree from "./phylotree.jsx";


const example_tree = "((((((HUM,PAN)Node6,GOR)Node5,PON)Node4,GIB)Node3,(MAC,BAB)Node12)Node2,MAR,BUS);";


function Example1() {
  return (<div>
    <h1>Example 1</h1>
    <svg width={500} height={500}>
      <Phylotree newick={example_tree} />
    </svg>
  </div>);
}

export default Example1;

