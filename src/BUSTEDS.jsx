import React, { Component } from "react";
import { phylotree } from "phylotree";
import { json } from "d3-fetch";
import { saveSvgAsPng as savePNG } from "save-svg-as-png";

import Phylotree, { placenodes_internal } from "./phylotree.jsx";
import { BaseSVGAlignment } from "alignment.js";


function Button(props) {
  return (<button
    type="button"
    className="btn btn-secondary react-phylotree-button"
    data-toggle="tooltip"
    data-placement="top"
    trigger="hover"
    {...props}
  >
    {props.children}
  </button>);
}


class PhylotreeApplication extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tree: null
    };
  }
  componentDidMount() {
    json("data/viz.json")
      .then(data => {
        const newick = data.slac.trees[0].newickString,
          tree = new phylotree(newick);
        placenodes_internal(tree);
        this.setState({
          tree: tree,
          data: data
        });
      });
  }
  toggleDimension(dimension, direction) {
    const new_dimension = this.state[dimension] +
      (direction == "expand" ? 20 : -20),
      new_state = {};
    new_state[dimension] = new_dimension;
    this.setState(new_state);
  }
  savePNG() {
    savePNG(document.getElementById("busteds"), "alignment.png");
  }
  render() {
    const sites = [7, 67, 85, 123],
      phylotree_props = {
        width: 500,
        height: 500,
        tree: this.state.tree
      },
      svg_props = {
        width: phylotree_props.width + 60,
        height: phylotree_props.height,   
      };
    var sequence_data, site_size;
    if(this.state.tree) {
      sequence_data = this.state.tree.node_order.map(node => {
        return {
          header: node,
          seq: this.state.data.slac["branch attributes"]["0"][node]["codon"][0][sites[0]]
        };
      });
      sequence_data.number_of_sequences  = sequence_data.length;
      sequence_data.number_of_sites = 3;
      site_size = phylotree_props.height / this.state.tree.node_order.length;
    } else {
      sequence_data = null; 
    }
    return (<div>
      <h1>BUSTED S</h1>
      <div>
        <label>Sites:</label>
        {sites.map(site => <span key={site}>{site}, </span>)}
        <Button onClick={() => this.savePNG()}>PNG</Button>
      </div>
      <svg {...svg_props} id="busteds">
        <rect
          x={0}
          y={0}
          width={svg_props.width}
          height={svg_props.height}
          fill="white"
        />
        <Phylotree {...phylotree_props}/>
        <BaseSVGAlignment
          translateX={phylotree_props.width}
          sequence_data={sequence_data}
          site_size={site_size}
        />
      </svg>
    </div>);
  }
}

export default PhylotreeApplication;

