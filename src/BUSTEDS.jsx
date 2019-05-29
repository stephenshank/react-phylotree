import React, { Component } from "react";
import { phylotree } from "phylotree";
import { json } from "d3-fetch";
import { scaleLinear } from "d3-scale";
import { max } from "d3-array";
import { saveSvgAsPng as savePNG } from "save-svg-as-png";

import Phylotree, { placenodes_internal } from "./phylotree.jsx";
import { BaseSVGAlignment, SitePlotAxis } from "alignment.js";


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


function CodonColumn(props) {
  const codon_sequence_data = props.tree.node_order.map(node => {
    return {
      header: node,
      seq: props.data.slac["branch attributes"]["0"][node]["codon"][0][props.site]
    };
  });
  codon_sequence_data.number_of_sequences  = codon_sequence_data.length;
  codon_sequence_data.number_of_sites = 3;

  const amino_acid_sequence_data = props.tree.node_order.map(node => {
    return {
      header: node,
      seq: props.data.slac["branch attributes"]["0"][node]["amino-acid"][0][props.site]
    };
  });
  amino_acid_sequence_data.number_of_sequences  = amino_acid_sequence_data.length;
  amino_acid_sequence_data.number_of_sites = 1;

  return (<g transform={`translate(${props.translateX}, ${props.translateY})`}>
    <BaseSVGAlignment
      sequence_data={codon_sequence_data}
      site_size={props.site_size}
    />
    <BaseSVGAlignment
      translateX={3*props.site_size+props.site_padding}
      sequence_data={amino_acid_sequence_data}
      site_size={props.site_size}
      amino_acid
    />
    <text
      x={(4*props.site_size+props.site_padding)/2}
      y={props.height + props.codon_label_height/2}
      alignmentBaseline="middle"
      textAnchor="middle"
      fontFamily="Courier"
      fontSize={14}
    >
      Codon {props.site + 1}
    </text>
  </g>);
}

CodonColumn.defaultProps = {
  translateX: 0,
  translateY: 0
};

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
    if(!this.state.tree) return <div/>;
    const phylotree_props = {
        width: 500,
        height: 500,
        tree: this.state.tree
      },
      site_size = phylotree_props.height / this.state.tree.node_order.length,
      site_padding = 5,
      codon_label_height = 30;
    const sites = [7, 67, 85, 123].map(site=>site-1),
      n_sites = sites.length,
      column_padding = 25,
      codon_column_width = 4*site_size+site_padding+column_padding,
      ccw_nopad = 4*site_size + site_padding,
      bar_height = 200,
      svg_props = {
        width: phylotree_props.width + n_sites*codon_column_width,
        height: phylotree_props.height + codon_label_height + bar_height,
      };
    const log_scale = x => Math.log(1+x),
      busted_data = this.state.data.busted["Evidence Ratios"]["constrained"][0]
        .filter((d,i) => sites.indexOf(i) != -1)
        .map(log_scale),
      bustedsrv_data = this.state.data.bustedsrv["Evidence Ratios"]["constrained"][0]
        .filter((d,i) => sites.indexOf(i) != -1)
        .map(log_scale),
      data = busted_data.concat(bustedsrv_data),
      bar_scale = scaleLinear()
        .domain([0, max(data)])
        .range([0, bar_height]),
      bar_width = ccw_nopad/3,
      bar_padding = 2;
    return (<div>
      <h1>BUSTED S</h1>
      <div>
        <label>Sites:</label>
        {sites.map(site => <span key={site}>{site}, </span>)}
        <Button onClick={() => this.savePNG()}>PNG</Button>
      </div>
      <svg {...svg_props} id="busteds" style={{fontFamily: "sans-serif"}}>
        <rect
          x={0}
          y={0}
          width={svg_props.width}
          height={svg_props.height}
          fill="white"
        />
        <g transform={`translate(400, 75)`}>
          <rect x={5} y={10} width={20} height={20} fill="red" />
          <text x={0} y={20} textAnchor="end" alignmentBaseline="middle">No synonymous rate variation</text>
          <rect x={5} y={40} width={20} height={20} fill="blue" />
          <text x={0} y={50} textAnchor="end" alignmentBaseline="middle">Synonymous rate variation</text>
        </g>
        <SitePlotAxis
          data={data}
          axis_label="log(1+evidence ratio)"
          height={bar_height}
          label_width={75}
          translateX={phylotree_props.width-75}
          padding={{ top: 0, right: 0, bottom: 0, left: 0 }}
        />
        {busted_data.map((data, i) => {
          const current_bar_height = bar_scale(data);
          return (<rect
            x={phylotree_props.width + i*codon_column_width + ccw_nopad/2 - bar_width - bar_padding}
            y={bar_height - current_bar_height}
            key={'busted'+i}
            width={bar_width}
            height={current_bar_height}
            fill="red"
          />);
        })}
        {bustedsrv_data.map((data, i) => {
          const current_bar_height = bar_scale(data);
          return (<rect
            x={phylotree_props.width + i*codon_column_width + ccw_nopad/2 + bar_padding}
            y={bar_height - current_bar_height}
            key={'busted'+i}
            width={bar_width}
            height={current_bar_height}
            fill="blue"
          />);
        })}
        <g transform={`translate(0, ${bar_height})`}>
          <Phylotree {...phylotree_props} />
          {sites.map((site, i) => {
            return (<CodonColumn
              site={site}
              translateX={phylotree_props.width + i*codon_column_width}
              site_size={site_size}
              site_padding={site_padding}
              codon_label_height={codon_label_height}
              key={i}
              height={phylotree_props.height}
              {...this.state}
            />);
          }) }
        </g>
      </svg>
    </div>);
  }
}

export default PhylotreeApplication;

