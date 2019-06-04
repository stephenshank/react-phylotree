import React, { Component } from "react";
import { phylotree } from "phylotree";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faArrowLeft, faArrowUp, faArrowDown, faArrowRight,
  faSortAmountUp
} from "@fortawesome/free-solid-svg-icons";
import { text } from "d3-fetch";
import { max } from "d3-array";
import $ from "jquery";

import Phylotree from "./phylotree.jsx";


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


function AscendingSortButton(props) {
  return (<Button
    title="Sort in ascending order"
    {...props}
  >
    <FontAwesomeIcon key={1} icon={faSortAmountUp} flip="vertical"/>
  </Button>);
}


function DescendingSortButton(props) {
  return (<Button
    title="Sort in ascending order"
    {...props}
  >
    <FontAwesomeIcon key={1} icon={faSortAmountUp}/>
  </Button>);
}


function sort_nodes (tree, direction) {
  tree.traverse_and_compute (function (n) {
    var d = 1;
    if (n.children && n.children.length) {
      d += max (n.children, function (d) { return d["count_depth"];});
    }
    n["count_depth"] = d;
  });
  const asc = direction == "ascending";
  tree.resort_children (function (a,b) {
    return (a["count_depth"] - b["count_depth"]) * (asc ? 1 : -1);
  });
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
        this.setState({tree});
      });
  }
  toggleDimension(dimension, direction) {
    const new_dimension = this.state[dimension] +
      (direction == "expand" ? 20 : -20),
      new_state = {};
    new_state[dimension] = new_dimension;
    this.setState(new_state);
  }
  handleSort(direction) {
    const { tree } = this.state;
    sort_nodes(tree, direction);
    this.setState({tree});
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
          <AscendingSortButton
            onClick={()=>this.handleSort("ascending")}
          />
          <DescendingSortButton
            onClick={()=>this.handleSort("descending")}
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

