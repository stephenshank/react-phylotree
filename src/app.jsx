import React from "react";
import ReactDOM from "react-dom";
import RBNavbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";

import PhylotreeApplication from "./PhylotreeApplication.jsx";
import MWE from "./app/mwe.jsx";
import Vanilla from "./app/vanilla.jsx";
import NoBranchLengths from "./app/no_branch_lengths.jsx";
import InternalNodeLabels from "./app/internal_node_labels.jsx";
import InternalNodeLabelsBranchLengths from "./app/internal_node_labels_branch_lengths.jsx";
import HighlightBranches from "./app/highlight_branches.jsx";
import StyleBranches from "./app/style_branches.jsx";
import ColoredLabels from "./app/colored_labels.jsx";

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
        <DropdownLink to="/style-branches" header="Style branches" />
        <DropdownLink to="/colored-labels" header="Colored labels" />
      </NavDropdown>
    </Nav>
  </RBNavbar>);
}

function App() {
  return (<BrowserRouter>
    <div>
      <Navbar />
      <div style={{ maxWidth: 1140 }} className="container-fluid">
        <Switch>
          <Route path="/colored-labels">
            <ColoredLabels />
          </Route>
          <Route path="/vanilla">
            <Vanilla />
          </Route>
          <Route path="/no-branch-lengths">
            <NoBranchLengths />
          </Route>
          <Route path="/internal-node-labels">
            <InternalNodeLabels />
          </Route>
          <Route path="/internal-node-labels-branch-lengths">
            <InternalNodeLabelsBranchLengths />
          </Route>
          <Route path="/highlight-branches">
            <HighlightBranches />
          </Route>
          <Route path="/style-branches">
            <StyleBranches />
          </Route>
          <Route path="/mwe">
            <MWE />
          </Route>
          <Route path="/">
            <PhylotreeApplication />
          </Route>
        </Switch>
      </div>
    </div>
  </BrowserRouter>);
}

ReactDOM.render(
  <App />,
  document.body.appendChild(document.createElement("div"))
);

