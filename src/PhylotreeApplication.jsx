import React, { Component } from "react";
import phylotree from "phylotree";
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
  var icon, style;
  if (props.icon == "expandH") {
    icon = [
      <FontAwesomeIcon key={1} icon={faArrowLeft} />,
      <FontAwesomeIcon key={2} icon={faArrowRight} />,
    ];
    style = {fontSize: 10};
  } else if (props.icon == "compressH") {
    icon = [
      <FontAwesomeIcon key={1} icon={faArrowRight} />,
      <FontAwesomeIcon key={2} icon={faArrowLeft} />,
    ];
    style = {fontSize: 10};
  } else if (props.icon == "expandV") {
    icon = [
      <FontAwesomeIcon key={1} icon={faArrowUp} />,
      <FontAwesomeIcon key={2} icon={faArrowDown} />,
    ];
    style = {fontSize: 10, display: "flex", flexDirection: "column"};
  } else if (props.icon == "compressV") {
    icon = [
      <FontAwesomeIcon key={1} icon={faArrowDown} />,
      <FontAwesomeIcon key={2} icon={faArrowUp} />,
    ];
    style = {fontSize: 10, display: "flex", flexDirection: "column"};
  } else if (props.icon) {
    icon = props.icon;
    style = null;
  } else {
    icon = null,
    style = null;
  }
  return (<button
    onClick={props.onClick}
    type="button"
    className="btn btn-secondary react-phylotree-button"
    style={style}
    data-toggle="tooltip"
    data-placement="top"
    title={props.title}
    trigger="hover"
  >
    {props.label}
    {icon}
  </button>);
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
          <Button
            icon={"expandH"}
            title="Expand horizontally"
            onClick={()=>this.toggleDimension("width", "expand")}
          />
          <Button
            icon={"compressH"}
            title="Compress horizontally"
            onClick={()=>this.toggleDimension("width", "compress")}
          />
          <Button
            icon={"expandV"}
            title="Expand vertically"
            onClick={()=>this.toggleDimension("height", "expand")}
          />
          <Button
            icon={"compressV"}
            title="Compress vertically"
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

