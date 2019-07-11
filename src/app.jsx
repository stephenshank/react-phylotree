import React from "react";
import ReactDOM from "react-dom";
import RBNavbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { BrowserRouter, Route, Link } from "react-router-dom";

import PhylotreeApplication from "./PhylotreeApplication.jsx";
import MWE from "./app/mwe.jsx";
import Vanilla from "./app/vanilla.jsx";
import NoBranchLengths from "./app/no_branch_lengths.jsx";
import InternalNodeLabels from "./app/internal_node_labels.jsx";
import InternalNodeLabelsBranchLengths from "./app/internal_node_labels_branch_lengths.jsx";
import HighlightBranches from "./app/highlight_branches.jsx";

import "bootstrap/dist/css/bootstrap.min.css";


function DropdownLink(props) {
  return (<NavDropdown.Item as={Link} to={props.to}>
    {props.header}
  </NavDropdown.Item>);
}

function NavLink(props) {
  return (<Nav.Link as={Link} to={props.to}>
    {props.header}
  </Nav.Link>);
}

function Navbar() {
  return (<RBNavbar bg="light">
    <RBNavbar.Brand>
      React Phylotree
    </RBNavbar.Brand>
    <Nav className="mr-auto">
      <NavLink to="/" header="Application" />
      <NavDropdown title="Examples">
        <DropdownLink to="/mwe" header="Minimal working example" />
        <DropdownLink to="/vanilla" header="Vanilla" />
        <DropdownLink to="/no-branch-lengths" header="No branch lengths" />
        <DropdownLink to="/internal-node-labels" header="Internal node labels" />
        <DropdownLink to="/internal-node-labels-branch-lengths" header="Internal node labels (branch lengths)" />
        <DropdownLink to="/highlight-branches" header="Highlighted branches" />
      </NavDropdown>
    </Nav>
  </RBNavbar>);
}

function App() {
  return (<BrowserRouter>
    <div>
      <Navbar />
      <div style={{ maxWidth: 1140 }} className="container-fluid">
        <Route exact path="/" component={PhylotreeApplication} />
        <Route exact path="/mwe" component={MWE} />
        <Route path="/vanilla" component={Vanilla} />
        <Route path="/no-branch-lengths" component={NoBranchLengths} />
        <Route path="/internal-node-labels" component={InternalNodeLabels} />
        <Route path="/internal-node-labels-branch-lengths" component={InternalNodeLabelsBranchLengths} />
        <Route path="/highlight-branches" component={HighlightBranches} />
      </div>
    </div>
  </BrowserRouter>);
}

ReactDOM.render(
  <App />,
  document.body.appendChild(document.createElement("div"))
);

