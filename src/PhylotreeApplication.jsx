import React, { Component } from "react";
import { phylotree } from "phylotree";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faArrowLeft, faArrowUp, faArrowDown, faArrowRight
} from "@fortawesome/free-solid-svg-icons";
import { text } from "d3-fetch";
import $ from "jquery";

import Phylotree from "./phylotree.jsx";


function placenodes(tree) {
  var current_leaf_height = -1,
    unique_id = 0;
  tree.max_x = 0;
  function node_layout(node) {
    unique_id = node.unique_id = unique_id + 1;
    node.data.x = node.parent  ?
      +node.data.attribute + node.parent.data.x :
      0;
    tree.max_x = Math.max(tree.max_x, node.data.x);
    if(node.children) {
      node.data.y = node.children.map(node_layout)
        .reduce( (a,b) => a + b, 0) / node.children.length;
    } else {
      current_leaf_height = node.data.y = current_leaf_height+1;
    }
    return node.data.y;
  }
  node_layout(tree.nodes);
}

function ButtonGroup(props) {
  return (<div className="btn-group" role="group" aria-label="Button group">
    {props.children}
  </div>);
}

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

function HorizontalExpansionButton(props) {
  return (<Button
    style={{ fontSize: 10 }}
    title="Expand horizontally"
    {...props}
  >
    <FontAwesomeIcon key={1} icon={faArrowLeft} />
    <FontAwesomeIcon key={2} icon={faArrowRight} />
  </Button>);
}

function HorizontalCompressionButton(props) {
  return (<Button
    style={{ fontSize: 10 }}
    title="Compress horizontally"
    {...props}
  >
    <FontAwesomeIcon key={1} icon={faArrowRight} />
    <FontAwesomeIcon key={2} icon={faArrowLeft} />
  </Button>);
}

function VerticalExpansionButton(props) {
  return (<Button
    style={{fontSize: 10, display: "flex", flexDirection: "column"}}
    title="Expand vertically"
    {...props}
  >
    <FontAwesomeIcon key={1} icon={faArrowUp} />
    <FontAwesomeIcon key={2} icon={faArrowDown} />
  </Button>);
}

function VerticalCompressionButton(props) {
  return (<Button
    style={{fontSize: 10, display: "flex", flexDirection: "column"}}
    title="Compress vertically"
    {...props}
  >
    <FontAwesomeIcon key={1} icon={faArrowDown} />
    <FontAwesomeIcon key={2} icon={faArrowUp} />
  </Button>);
}


class PhylotreeApplication extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tree: null,
      width: 500,
      height: 500
    };
  }
  componentDidMount() {
    $(function () {
      $(".react-phylotree-button").tooltip();
    });
    text("data/CD2.new")
      .then(newick => {
        const tree = new phylotree(newick);
        placenodes(tree);
        this.setState({
          tree: tree
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
  render() {
    return (<div style={{display: "flex", flexDirection: "column", alignItems: "flex-start"}}>
      <h1>React Phylotree</h1>
      <div style={{display: "flex", justifyContent: "space-around"}}>
        <ButtonGroup>
          <HorizontalExpansionButton
            onClick={()=>this.toggleDimension("width", "expand")}
          />
          <HorizontalCompressionButton
            onClick={()=>this.toggleDimension("width", "compress")}
          />
          <VerticalExpansionButton
            onClick={()=>this.toggleDimension("height", "expand")}
          />
          <VerticalCompressionButton
            onClick={()=>this.toggleDimension("height", "compress")}
          />
        </ButtonGroup>
      </div>
      <svg width={this.state.width} height={this.state.height}>
        <Phylotree {...this.state}/>
      </svg>
    </div>);
  }
}

export default PhylotreeApplication;

